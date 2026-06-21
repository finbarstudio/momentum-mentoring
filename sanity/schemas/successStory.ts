import { defineType, defineField } from "sanity";

export default defineType({
  name: "successStory",
  title: "Success Story",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "clientName", title: "Client Name", type: "string" }),
    defineField({ name: "story", title: "Story", type: "text", rows: 6 }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "clientName", media: "photo" } },
});
