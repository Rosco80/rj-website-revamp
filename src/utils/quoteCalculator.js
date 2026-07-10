export function calculateQuote({
  volumeM3,
  species,          // Object from Sanity
  grade,            // 'Standard & Better' or 'Merchandable Grade'
  isS4S,            // boolean
  isKD,             // boolean
  thicknessInches,  // number
  kdRates,          // Array of KD rates for the species' kdCategory
  freightCost,      // Object from Sanity
  settings          // Object from Sanity
}) {
  const { exchangeRate, containerCapacityTon, containerCapacityM3 } = settings;
  const volume = parseFloat(volumeM3) || 0;
  const thickness = parseFloat(thicknessInches) || 1;

  // Container leeway: allow ~5% overfill before recommending a second container
  const containerLeeway = containerCapacityM3 * 1.05; // ~37.8 m³

  // 1. Base Timber Cost
  let baseRate = grade === 'Merchandable Grade' && species.merchandablePrice 
    ? species.merchandablePrice 
    : species.standardPrice;

  let baseTimberCostMYR = volume * baseRate;

  // 2. Processing (S4S)
  let s4sCostMYR = 0;
  if (isS4S && species.s4sAddon) {
    s4sCostMYR = baseTimberCostMYR * (species.s4sAddon / 100);
  }

  // 3. Processing (KD)
  let kdCostMYR = 0;
  let appliedKdRate = 0;
  if (isKD && kdRates && kdRates.length > 0) {
    let matchedRate = kdRates.find(r => {
        const rateThickness = parseFloat(r.thickness) || 1;
        return thickness <= rateThickness;
    });
    if (!matchedRate) {
        matchedRate = kdRates[kdRates.length - 1];
    }
    appliedKdRate = matchedRate.pricePerTon;
    
    const averageDensity = containerCapacityTon / containerCapacityM3; 
    const weightTons = volume * averageDensity;
    kdCostMYR = weightTons * appliedKdRate;
  }

  // 4. Freight Cost — always quote for 1 container
  let singleContainerFreightMYR = 0;
  let recommendedContainers = 1;
  if (freightCost && freightCost.cost40ft) {
    singleContainerFreightMYR = freightCost.cost40ft;

    // Calculate how many containers are actually recommended (with leeway)
    if (volume > containerLeeway) {
      recommendedContainers = Math.ceil(volume / containerCapacityM3);
    }
  }

  const totalCostMYR = baseTimberCostMYR + s4sCostMYR + kdCostMYR + singleContainerFreightMYR;
  const totalCostUSD = totalCostMYR / exchangeRate;

  return {
    baseTimberCostMYR,
    s4sCostMYR,
    kdCostMYR,
    appliedKdRate,
    singleContainerFreightMYR,
    recommendedContainers,
    totalCostMYR,
    totalCostUSD,
    breakdown: {
      volumeM3: volume,
      baseRateMYR: baseRate,
      exchangeRate
    }
  };
}

