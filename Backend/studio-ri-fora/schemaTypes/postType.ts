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

    /* 🔥 CATEGORY FIELD */
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',

      options: {
        list: [
          {title: 'Women', value: 'Women'},
          {title: 'Kids', value: 'Kids'},
          {title: 'Fragrance', value: 'Fragrance'},
          {title: 'Footwear', value: 'Footwear'},
          {title: 'Men', value: 'Men'},
          {title: 'Accessories', value: 'Accessories'},
        ],

        layout: 'dropdown',
      },

      validation: (rule) => rule.required(),
    }),

    /* 🔥 MULTIPLE IMAGES */
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

    /* 🔥 PRICE */
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

        layout: 'tags',
      },
    }),

    /* 🔥 OLD IMAGE SAFE */
    defineField({
      name: 'image',
      type: 'image',
      hidden: true,
    }),
  ],
})