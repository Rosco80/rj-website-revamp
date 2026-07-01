# Automated Quote Engine (PRD / Notes)

## 1. Objective & Goal
To build an automated quoting engine (or quote calculator) that rapidly calculates the cost of customized timber orders. It will ingest base pricing, shipping costs, and dimension constraints to output an instant, accurate proposal for international buyers, reducing manual calculation time.

## 2. Core Pricing & Logistics Data Required
Before building the backend logic, we need to gather and define the following baseline matrix. 

> [!IMPORTANT]
> **Dynamic Variables Architecture**: The system must be designed so that **Timber Market Prices in Malaysia** and **Transportation/Freight Rates** are isolated from the rest of the stable pricing logic. These two elements fluctuate frequently and must be easily updatable (e.g., via a simple config file or admin interface) so the entire quoting process instantly reflects the new rates without touching the core code.

### A. Base Timber Pricing *(Dynamic Variable)*
- **Species Base Rates**: Current Malaysian market price per m³ or ton (Balau, Merbau, Keruing, Teak, Mixed Hardwood). This value will be updated regularly.
- **Grade Premiums**: Percentage or flat rate increase for higher grades (e.g., Select & Better vs. Standard).
- **Processing Add-ons**: 
  - Drying: Air Dried (AD) vs. Kiln Dried (KD).
  - Surfacing: Rough Sawn vs. Surfaced 4 Sides (S4S) vs. Custom Moulding.
- **Dimension Multipliers**: Premium pricing for specific lengths, widths, or highly customized dimensions.

### B. Freight & Shipping Data *(Dynamic Variable)*
- **FOB Malaysia Costs**: Handling, port, MTIB licensing, fumigation, and phytosanitary certification baseline costs.
- **Ocean Freight Estimates**: Current freight rates for 20ft and 40ft containers to key markets (Europe, Middle East, North America, East Asia). This value will be updated regularly.
- **Container Capacity Limits**: The maximum weight (tons) and volume (m³) limit per species for 20ft and 40ft containers. (Heavy hardwoods like Balau typically max out the weight limit long before the volume limit).

### C. Business Logic & Constraints
- **MOQ (Minimum Order Quantity)**: e.g., minimum 1 full 20ft container.
- **Incoterms Supported**: Do you primarily quote FOB (Free on Board) or CIF (Cost, Insurance, and Freight)?
- **Currency**: Primary currency for quoting (e.g., USD, EUR).
- **Standard Lead Times**: Estimated processing and shipping durations to present on the quote.

## 3. System Architecture & Inputs
The engine will need a simple interface (either internal or web-based) capturing the following variables from a client or sales rep:
1. **Target Species & Grade**
2. **Required Dimensions** (Thickness x Width x Length)
3. **Total Volume** (m³ or metric tons)
4. **Processing Type** (Rough Sawn, S4S, KD, etc.)
5. **Destination Port**

## 4. Output
- **Internal Dashboard**: A summary showing the full cost breakdown (Base timber + processing + freight + margin).
- **Client-Facing Output**: An automatically generated professional PDF quote or formatted email containing the final price, validity period, lead time, and payment terms.

---
**Next Actions / Open Questions for R&J Wood Trading:**
- [ ] Provide a rough Excel sheet or list of the base pricing data (Species, Grades, Processing).
- [ ] Provide average FOB and Freight costs for standard destinations.
- [ ] Decide if this tool will be strictly for internal sales use, or embedded directly on the website for clients to use.
