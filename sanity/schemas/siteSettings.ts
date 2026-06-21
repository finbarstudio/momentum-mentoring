import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({
      name: "badgeText",
      title: "Status Badge Text",
      type: "string",
      initialValue: "Registered Provider",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "teamTagline",
      title: "Team Section Tagline",
      type: "string",
    }),
    defineField({
      name: "footerText",
      title: "Footer Commitment Statement",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "ndisLogo", title: "NDIS Logo", type: "image" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
