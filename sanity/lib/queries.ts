import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "siteSettings"][0]`;

export const teamQuery = groq`*[_type == "teamMember"] | order(order asc){
  _id, name, role, quote, bio, photo
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id, title, description, illustration
}`;

export const storiesQuery = groq`*[_type == "successStory"] | order(order asc){
  _id, title, clientName, story, photo
}`;
