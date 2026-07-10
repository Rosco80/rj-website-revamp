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

  // 1. Base Timber Cost
  let baseRate = grade === 'Merchandable Grade' && species.merchandablePrice 
    ? species.merchandablePrice 
    : species.standardPrice;

  let timberCostMYR = volume * baseRate;

  // 2. Processing (S4S)
  if (isS4S && species.s4sAddon) {
    timberCostMYR += timberCostMYR * (species.s4sAddon / 100);
  }

  // 3. Processing (KD)
  let kdCostMYR = 0;
  let appliedKdRate = 0;
  if (isKD && kdRates && kdRates.length > 0) {
    // Determine rate based on thickness
    // Assuming kdRates is sorted by thickness or we find the closest match.
    // For our simplified fallback, we just check if thickness > 1, etc.
    // We will do a simple match: find the first rate where thickness matches, or default to max rate.
    let matchedRate = kdRates.find(r => {
        const rateThickness = parseFloat(r.thickness) || 1;
        return thickness <= rateThickness;
    });
    if (!matchedRate) {
        matchedRate = kdRates[kdRates.length - 1]; // fallback to largest thickness
    }
    appliedKdRate = matchedRate.pricePerTon;
    
    const averageDensity = containerCapacityTon / containerCapacityM3; 
    const weightTons = volume * averageDensity;
    kdCostMYR = weightTons * appliedKdRate;
  }

  // 4. Freight Cost
  let totalFreightMYR = 0;
  let numContainers = 0;
  if (freightCost && freightCost.cost40ft) {
    const weightTons = volume * (containerCapacityTon / containerCapacityM3);
    const containersByVol = volume / containerCapacityM3;
    const containersByWeight = weightTons / containerCapacityTon;
    numContainers = Math.ceil(Math.max(containersByVol, containersByWeight));
    totalFreightMYR = numContainers * freightCost.cost40ft;
  }

  const totalCostMYR = timberCostMYR + kdCostMYR + totalFreightMYR;
  const totalCostUSD = totalCostMYR / exchangeRate;

  return {
    timberCostMYR,
    kdCostMYR,
    appliedKdRate,
    totalFreightMYR,
    numContainers,
    totalCostMYR,
    totalCostUSD,
    breakdown: {
      volumeM3: volume,
      baseRateMYR: baseRate,
      exchangeRate
    }
  };
}
