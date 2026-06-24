import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "siteSettings"][0]{
  heroHeadline, email, location, mapsUrl, contactIntro, footerStatement
}`;

export const teamQuery = groq`*[_type == "teamMember"] | order(order asc){
  _id, name, role, shortBio, fullBio, photoZoom, photoOffsetY,
  "photo": photo.asset->url
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id, title, description, "illustration": illustration.asset->url
}`;

export const storiesQuery = groq`*[_type == "successStory"] | order(order asc){
  _id, title, clientName, story, "photo": photo.asset->url
}`;
