export default {
    name: 'speciesPricing',
    title: 'Species Pricing',
    type: 'document',
    fields: [
        { name: 'species', title: 'Species Name', type: 'string' },
        { name: 'standardPrice', title: 'Standard & Better Price (RM/m³)', type: 'number' },
        { name: 'merchandablePrice', title: 'Merchandable Grade Price (RM/m³)', type: 'number' },
        { name: 's4sAddon', title: 'S4S Add-on Percentage (%)', type: 'number', description: 'Enter as a whole number (e.g. 28 for 28%)' },
        { 
            name: 'kdCategory', 
            title: 'KD Category', 
            type: 'string',
            description: 'Kiln drying category (A, B, C, D) based on Vitrex rates',
            options: {
                list: ['A', 'B', 'C', 'D']
            }
        }
    ]
};
