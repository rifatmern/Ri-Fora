import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    // 1. THIS IS YOUR SINGLE IMAGE UPGRADE SECTION (Allows multiple uploads cleanly)
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Upload your product photos here.',
    }),

    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // --- NEW E-COMMERCE FIELDS ---
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price (MSRP/Sale)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'inventory',
      title: 'Stock Quantity',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'availableSizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'XS', value: 'xs'},
          {title: 'S', value: 's'},
          {title: 'M', value: 'm'},
          {title: 'L', value: 'l'},
          {title: 'XL', value: 'xl'},
        ],
        layout: 'tags', // Gives a clean visual tag interface in Sanity
      },
    }),

    // 2. KEEPS OLD DATA SAFE IN THE BACKGROUND WITHOUT CAUSING COMPILER ERRORS
    defineField({
      name: 'image',
      type: 'image',
      hidden: true, // Hides it from the UI so your panel stays completely clean
    }),
  ],
})
