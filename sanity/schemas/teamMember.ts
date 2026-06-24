import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role / title",
      type: "string",
      description: 'e.g. "Mentor" or "Co-Director / Service Manager".',
      validation: (r) => r.required(),
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
      title: "Headshot",
      type: "image",
      options: { hotspot: true },
      description:
        "Portrait headshot. A cut-out on a transparent background looks best. Leave empty if there's no photo yet — the card just shows the name.",
    }),
    defineField({
      name: "shortBio",
      title: "Short bio",
      type: "text",
      rows: 3,
      description: "The one-paragraph summary shown before “Read More”.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fullBio",
      title: "Full bio",
      type: "array",
      of: [{ type: "text", rows: 2 }],
      description:
        "The full bio shown when the card is expanded. Add one block per paragraph (the short bio above is usually the last paragraph).",
    }),
    defineField({
      name: "photoZoom",
      title: "Headshot zoom (advanced)",
      type: "number",
      description:
        "Optional. 1 = default. Use >1 to zoom in if the head looks too small, <1 to zoom out. Leave blank for most people.",
    }),
    defineField({
      name: "photoOffsetY",
      title: "Headshot vertical nudge (advanced)",
      type: "number",
      description:
        "Optional. Percent to nudge the headshot up/down within its frame (e.g. 3). Leave blank for most people.",
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
    select: { title: "name", subtitle: "role", media: "photo", order: "order" },
    prepare: ({ title, subtitle, media, order }) => ({
      title: order != null ? `${order}. ${title}` : title,
      subtitle,
      media,
    }),
  },
});
