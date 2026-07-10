export default {
    name: 'kdCategoryRates',
    title: 'KD Category Rates',
    type: 'document',
    fields: [
        { 
            name: 'category', 
            title: 'Category', 
            type: 'string',
            options: {
                list: ['A', 'B', 'C', 'D']
            }
        },
        { 
            name: 'rates', 
            title: 'Rates by Thickness', 
            type: 'array', 
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'thickness', title: 'Thickness (e.g. 1" and below)', type: 'string' },
                        { name: 'pricePerTon', title: 'Price (RM/Ton)', type: 'number' }
                    ],
                    preview: {
                        select: {
                            title: 'thickness',
                            subtitle: 'pricePerTon'
                        },
                        prepare(selection) {
                            const {title, subtitle} = selection
                            return {
                                title: title,
                                subtitle: `RM ${subtitle} / Ton`
                            }
                        }
                    }
                }
            ]
        }
    ]
};
