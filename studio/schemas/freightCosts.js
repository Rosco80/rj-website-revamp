export default {
    name: 'freightCosts',
    title: 'Freight Costs (Indicative)',
    type: 'document',
    fields: [
        { name: 'region', title: 'Region (e.g. Europe, US, Africa, Asia)', type: 'string' },
        { name: 'cost40ft', title: '40ft Container Indicative Cost (RM)', type: 'number' },
        { name: 'cost20ft', title: '20ft Container Indicative Cost (RM)', type: 'number', description: 'Optional' }
    ]
};
