export default {
    name: 'quoteSettings',
    title: 'Quote Engine Settings',
    type: 'document',
    fields: [
        { name: 'exchangeRate', title: 'USD to MYR Exchange Rate', type: 'number', description: 'e.g. 4.04' },
        { name: 'containerCapacityTon', title: '40ft Container Capacity (Tons)', type: 'number', description: 'e.g. 26' },
        { name: 'containerCapacityM3', title: '40ft Container Capacity (m³)', type: 'number', description: 'e.g. 36' },
        { name: 'contactEmail', title: 'Contact Email for Quotes', type: 'string', description: 'Email shown in the quote disclaimer' }
    ]
};
