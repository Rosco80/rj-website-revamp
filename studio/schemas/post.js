export default {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'A short summary of the post for the blog grid.',
            validation: Rule => Rule.max(200).required()
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'readTime',
            title: 'Read Time',
            type: 'string',
            description: 'e.g. "5 min read"',
            validation: Rule => Rule.required()
        },
        {
            name: 'externalLink',
            title: 'External Link',
            type: 'url',
            description: 'The link to the full article on the original site.'
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: Rule => Rule.required()
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
            ],
        },
    ],
}
