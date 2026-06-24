import { defineType, defineField } from "sanity";

export default defineType({
  name: "successStory",
  title: "Success Story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Riding a Bike".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first (1, 2, 3 …).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "story",
      title: "Story",
      type: "text",
      rows: 6,
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "clientName", media: "photo", order: "order" },
    prepare: ({ title, subtitle, media, order }) => ({
      title: order != null ? `${order}. ${title}` : title,
      subtitle,
      media,
    }),
  },
});
