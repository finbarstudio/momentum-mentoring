import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description:
    "Site-wide text: the hero headline, contact details and footer statement. (The logos, NDIS badge and hero video are fixed brand assets managed in the code, so there's nothing to upload here.)",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "contact", title: "Contact details" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "text",
      rows: 2,
      group: "hero",
      description: "The big teal headline on the homepage.",
      initialValue: "Building identity through choice, voice, and independence.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      group: "contact",
      description: "Shown (and clickable) in the contact section and footer.",
      initialValue: "info@momentummentoring.co",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "contact",
      description: "Address line shown in the contact section and footer.",
      initialValue: "Plympton, SA, 5038.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mapsUrl",
      title: "Google Maps link",
      type: "url",
      group: "contact",
      description: "Where the location text links to.",
      initialValue: "https://maps.google.com/?q=Plympton+SA+5038",
    }),
    defineField({
      name: "contactIntro",
      title: "Contact intro",
      type: "text",
      rows: 3,
      group: "contact",
      description: "The paragraph above the contact form.",
      initialValue:
        "For inquiries, appointments, or to learn more about Momentum Mentoring and NDIS services, fill in the form below, or contact us directly!",
    }),
    defineField({
      name: "footerStatement",
      title: "Footer statement",
      type: "text",
      rows: 5,
      group: "footer",
      description: "The accessibility / NDIS statement in the footer.",
      initialValue:
        "At Momentum Mentoring, we are committed to providing disability services through National Disability Insurance Scheme (NDIS) that includes mentoring for younger males. Based in Adelaide, South Australia, we strive to ensure our website is accessible to people with disabilities. Please note that you are responsible for ensuring that your site's statement meets the requirements of the local laws in your area or region.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
