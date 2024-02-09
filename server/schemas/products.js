import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'short_description',
            title: 'Short Description',
            type: 'string',
            options: {
                maxLength: 25,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                    title: 'Block',
                    type: 'block',
                    styles: [{title: 'Normal', value: 'normal'}],
                    lists: [{title: 'Bullet', value: 'bullet'}],
                },
            ],
        }),
        defineField({
            name: 'main_image',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: {
                        type: 'category',
                    },
                },
            ],
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [
                {
                    type: 'string',
                },
            ],
        }),
        defineField({
            name: 'quantity_no',
            title: 'Quantity (Enter number eg., 250, 500)',
            type: 'number',
            initialValue: 0,
            validation: (rule) => rule.required().positive(),
        }),
        defineField({
            name: 'quantity_count',
            title: 'Quantity (Select unit eg., mg, gm, etc.)',
            type: 'string',
            options: {
                list: [
                    { title: 'mg', value: 'mg' },
                    { title: 'gm', value: 'gm' },
                    { title: 'kg', value: 'kg' },
                    { title: 'ml', value: 'ml' },
                    { title: 'l', value: 'l' },
                    { title: 'nos.', value: 'nos.' },
                ]
            }
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            initialValue: 0,
            validation: (rule) => rule.required().positive().precision(2),
        }),
        defineField({
            name: 'discount',
            title: 'Discount',
            type: 'number',
            initialValue: 0,
            validation: (rule) => rule.positive().precision(2),
        }),
        defineField({
            name: 'discounted_price',
            title: 'Price after discount',
            type: 'number',
            initialValue: 0,
            description: "Enter price only if you want this to override the initial price",
            validation: (rule) => rule.positive().precision(2),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
    },
});
