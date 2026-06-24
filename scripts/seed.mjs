import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, "..", "public", "assets");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const cache = new Map();
async function img(file) {
  if (!file) return undefined;
  if (cache.has(file)) return cache.get(file);
  const asset = await client.assets.upload("image", readFileSync(join(ASSETS, file)), {
    filename: file,
  });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  cache.set(file, ref);
  return ref;
}

const TEAM = [
  { name: "Lachie", role: "Co-Director / Service Manager", photo: "uoY4pAEwUPiQzpQWulknSBm2uM.png", zoom: 1.05,
    short: "Four and a half years of Educational Support experience at Saint John Bosco Primary School, leading 1:1 and group mentoring across Momentum.",
    full: ["Trained across ASD, ADHD, speech disorders, ODD, PDA, and Trauma.", "Long sporting background in cricket, football, and basketball at high levels, with an active lifestyle to match.", "Co-Director and Service Manager who uses every bit of his experience to help each client reach their specific goals.", "Four and a half years of Educational Support experience at Saint John Bosco Primary School, leading 1:1 and group mentoring across Momentum."] },
  { name: "Aryan", role: "Co-Director / Business Management", photo: "y1xwLfg07gux4gNOCdAtip7DElY.png",
    short: "Holds a Masters of Physiotherapy with ongoing studies in Neurological Physiotherapy, bringing deep expertise in functional movement.",
    full: ["Screens and matches participants with the right mentor to ensure goals are met holistically.", "Met Lachie in 2012 through representative sport and has shared the active lifestyle ever since.", "Combines clinical knowledge with a people-first approach to business management.", "Holds a Masters of Physiotherapy with ongoing studies in Neurological Physiotherapy, bringing deep expertise in functional movement."] },
  { name: "Andrea", role: "Mentor", photo: "aMqXFpFgqn4juw5zZ1ipxZmRiQ4.png",
    short: "Compassionate and bubbly with a year of experience as a Student Support Officer and a strong passion for wellbeing.",
    full: ["Studying a Bachelor of Education (Health and Physical Education) at Flinders University.", "Has played, umpired, and coached basketball and netball, with strong community ties to her hometown of Bordertown.", "Believes motivation is the key to growth and uses her supportive personality to help participants reach their goals.", "Compassionate and bubbly with a year of experience as a Student Support Officer and a strong passion for wellbeing."] },
  { name: "Ned", role: "Mentor", photo: "UrSADaAy7Qiyg1GJM4vAWcSSuPs.png",
    short: "Brings two years of Support Work experience and a real passion for helping clients live as their truest selves.",
    full: ["Currently undertaking a Master's in Psychology at Flinders University, deepening his understanding of mindset and wellbeing.", "Punctual, hardworking, and high-quality in everything he does.", "Combines persistence with genuine support to guide clients in a positive direction.", "Brings two years of Support Work experience and a real passion for helping clients live as their truest selves."] },
  { name: "Harry", role: "Mentor", photo: "gSwMsUjNK2zKjELl4XuKQF8tqdg.png",
    short: "Bordertown local studying at Flinders University to become a secondary PE, Health, and Maths teacher.",
    full: ["Empathetic, personable, and organised, with a natural ability to connect and have a chat.", "Trained as a lifeguard, making him a standout in our hydrotherapy space.", "Loves the outdoors — recently returned from an 11-day trek in Nepal, reaching over 5000m above sea level.", "Bordertown local studying at Flinders University to become a secondary PE, Health, and Maths teacher."] },
  { name: "Owen", role: "Mentor", photo: "pDtxC165o0f9FCscciA7lgj9HiU.png",
    short: "Fresh off two years travelling and working across Australia and Japan, bringing a worldly perspective to the team.",
    full: ["Known for his contagious smile, kind nature, and a soft but motivating touch.", "Has a real talent for pushing people to become the best version of themselves.", "A great worker and an even better human — a massive get for Momentum.", "Fresh off two years travelling and working across Australia and Japan, bringing a worldly perspective to the team."] },
  { name: "Arjun (Junny)", role: "Mentor", photo: "8VVARIsr7g50aJvW07geeiQK0.png",
    short: "Currently working as an ESO at Sacred Heart Middle School with Year 7–9 students across a range of disabilities.",
    full: ["Approachable and respectful, with strong leadership traits built through a big sporting background.", "Studying a double degree in Physiotherapy and Business at UniSA, deepening his understanding of how the body moves best.", "Committed to helping clients use their body actively, safely, and with confidence.", "Currently working as an ESO at Sacred Heart Middle School with Year 7–9 students across a range of disabilities."] },
  { name: "Logan", role: "Mentor", photo: "fOcz1d0GFiUiLt4bWb9aWyOlW4.png", zoom: 1.22, offsetY: 2,
    short: "Driven, hardworking mentor with a deep passion for sport, teamwork, and helping participants tick off their goals.",
    full: ["Represented South Australia in cricket from Under 12 through to Under 19 level.", "Uses a gentle, non-authoritarian approach with strong attention to detail.", "Believes in the power of competition and constant self-improvement, both on and off the field.", "Driven, hardworking mentor with a deep passion for sport, teamwork, and helping participants tick off their goals."] },
  { name: "Jacob", role: "Mentor", photo: "lPtQHhYwZ9m7iSuRg6JrPIKMOU.png", zoom: 1.08,
    short: "The newest member of the Momentum team, based north of Adelaide and a great fit for participants up that way.",
    full: ["Recently took on an SSO role at a local primary school to keep building his skillset.", "Enjoys the gym, soccer, and console gaming, helping mentees see the benefits of staying active.", "Brings fresh energy and a focus on physical wellbeing into every session.", "The newest member of the Momentum team, based north of Adelaide and a great fit for participants up that way."] },
  { name: "Durar", role: "Mentor", photo: "OGUQIqPx8bENquTHzlADXZTzQ.png",
    short: "Final-year Speech Pathology student working as a mentor and therapy assistant, passionate about helping others communicate their best.",
    full: ["Bilingual in English and Arabic (Iraqi dialect), bringing an extra layer of accessibility to her mentoring.", "Holds accreditations in Responding to Abuse and Neglect, Through Their Eyes, and Trauma Informed Care.", "Cooking and sports are her go-to hobbies, with a strong belief that a healthy body supports healthier mental wellbeing.", "Final-year Speech Pathology student working as a mentor and therapy assistant, passionate about helping others communicate their best."] },
];

const SERVICES = [
  { title: "Group Activities", img: "qBMjbvtQSrmTZQjLwalb6fOiqSo.png", desc: "Community engagement and active collaboration to bring out the best qualities in every participant." },
  { title: "Goal Setting Based Approach", img: "bJNkd0te1agtsu6g0CadBptjs.png", desc: "We consult with clients and families to help each young person fulfil their complete potential." },
  { title: "One-on-One Mentoring", img: "bLeWVrJ7ZzVc7GPSnUwkbJrWpHQ.png", desc: "Tailored sessions aligned with NDIS categories 01, 04, 09 and Therapy Assist, drawing on Self Care, Access Community, and Therapy Assist services." },
];

const STORIES = [
  { title: "Riding a Bike", client: "Abhay", img: "289vep1HQVyCdDE8xmATQjAmCZw.png", story: "Abhay achieved bike riding proficiency in approximately one month. He progressed from needing significant support to riding with minimal supervision, and can now ride independently from home to the park and back." },
  { title: "Obtaining L Plates", client: "Jackson", img: "VtoOJ2BEovuwlX9CsKHhKNLUt0.png", story: "After celebrating his 16th birthday, Jackson was very keen to sit his learners test at Service SA. After undertaking numerous practice modules, Jackson felt he was ready to have a go at the real thing. We were super proud that he aced the test first go and received his L's straight away. We are now working alongside Jackson to help him build road safety awareness and become a more proficient driver behind the wheel!" },
];

async function run() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error("Set SANITY_API_WRITE_TOKEN in .env.local before seeding.");
  }
  console.log("Uploading images + writing documents…");
  const tx = client.transaction();

  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    heroHeadline: "Building identity through choice, voice, and independence.",
    email: "info@momentummentoring.co",
    location: "Plympton, SA, 5038.",
    mapsUrl: "https://maps.google.com/?q=Plympton+SA+5038",
    contactIntro: "For inquiries, appointments, or to learn more about Momentum Mentoring and NDIS services, fill in the form below, or contact us directly!",
    footerStatement: "At Momentum Mentoring, we are committed to providing disability services through National Disability Insurance Scheme (NDIS) that includes mentoring for younger males. Based in Adelaide, South Australia, we strive to ensure our website is accessible to people with disabilities. Please note that you are responsible for ensuring that your site's statement meets the requirements of the local laws in your area or region.",
  });

  for (let i = 0; i < TEAM.length; i++) {
    const m = TEAM[i];
    const doc = {
      _id: `team-${i}`,
      _type: "teamMember",
      order: i + 1,
      name: m.name,
      role: m.role,
      shortBio: m.short,
      fullBio: m.full,
      photo: await img(m.photo),
    };
    if (m.zoom) doc.photoZoom = m.zoom;
    if (m.offsetY) doc.photoOffsetY = m.offsetY;
    tx.createOrReplace(doc);
  }

  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    tx.createOrReplace({
      _id: `service-${i}`,
      _type: "service",
      order: i + 1,
      title: s.title,
      description: s.desc,
      illustration: await img(s.img),
    });
  }

  for (let i = 0; i < STORIES.length; i++) {
    const st = STORIES[i];
    tx.createOrReplace({
      _id: `story-${i}`,
      _type: "successStory",
      order: i + 1,
      title: st.title,
      clientName: st.client,
      story: st.story,
      photo: await img(st.img),
    });
  }

  await tx.commit();
  console.log("✅ Seed complete — Sanity now matches the site content.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
