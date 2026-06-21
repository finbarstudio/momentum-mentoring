import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 2 }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
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
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
