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

async function upload(file) {
  const buf = readFileSync(join(ASSETS, file));
  const asset = await client.assets.upload("image", buf, { filename: file });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function run() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error("Set SANITY_API_WRITE_TOKEN in .env.local");
  }
  console.log("Uploading images…");

  // Team headshots
  const lachie = await upload("lPtQHhYwZ9m7iSuRg6JrPIKMOU.png");
  const aryan = await upload("y1xwLfg07gux4gNOCdAtip7DElY.png");
  const andrea = await upload("OGUQIqPx8bENquTHzlADXZTzQ.png");
  const ned = await upload("pDtxC165o0f9FCscciA7lgj9HiU.png");
  const harry = await upload("UrSADaAy7Qiyg1GJM4vAWcSSuPs.png");
  const owen = await upload("uoY4pAEwUPiQzpQWulknSBm2uM.png");
  const junny = await upload("8VVARIsr7g50aJvW07geeiQK0.png");
  const logan = await upload("fOcz1d0GFiUiLt4bWb9aWyOlW4.png");
  const durar = await upload("aMqXFpFgqn4juw5zZ1ipxZmRiQ4.png");

  // Service illustrations
  const illusGroup = await upload("qBMjbvtQSrmTZQjLwalb6fOiqSo.png");
  const illusGoal = await upload("bJNkd0te1agtsu6g0CadBptjs.png");
  const illusOneOnOne = await upload("bLeWVrJ7ZzVc7GPSnUwkbJrWpHQ.png");

  // Success story photos
  const bikePhoto = await upload("289vep1HQVyCdDE8xmATQjAmCZw.png");
  const lPlatePhoto = await upload("VtoOJ2BEovuwlX9CsKHhKNLUt0.png");

  // NDIS logo
  const ndisLogo = await upload("B0jo87FLvVYTrBJcqCC6zOFBnpY.png");

  console.log("Writing documents…");
  const tx = client.transaction();

  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    badgeText: "Registered Provider",
    heroHeadline: "Building identity through choice, voice, and independence.",
    email: "info@momentummentoring.co",
    location: "Plympton, SA, 5038",
    teamTagline: "Let's turn challenges into wins, one goal at a time.",
    footerText:
      "Momentum Mentoring is committed to providing NDIS disability services for younger males in Adelaide, South Australia, and is accessible to people with disabilities.",
    ndisLogo,
  });

  const team = [
    {
      name: "Lachie",
      role: "Co-Director / Service Manager",
      quote: "Motivation is the spark, let's keep it burning.",
      bio: "4.5 years of educational support at Saint John Bosco Primary School.",
      photo: lachie,
    },
    {
      name: "Aryan",
      role: "Co-Director / Business Management",
      quote: "Strong body, sharp mind, steady progress.",
      bio: "Masters in Physiotherapy, with ongoing Neurological Physiotherapy studies.",
      photo: aryan,
    },
    {
      name: "Andrea",
      role: "Mentor",
      quote: "A positive mindset is the first step toward a positive life.",
      bio: "1 year as a Student Support Officer, passionate about wellbeing.",
      photo: andrea,
    },
    {
      name: "Ned",
      role: "Mentor",
      quote: "Whether it's the pool or the peak, I'm here for the climb.",
      bio: "2 years of support work experience.",
      photo: ned,
    },
    {
      name: "Harry",
      role: "Mentor",
      quote:
        "Keep showing up, the best version of you is closer than you think.",
      bio: "Bordertown local studying Secondary PE, Health, and Maths at Flinders University.",
      photo: harry,
    },
    {
      name: "Owen",
      role: "Mentor",
      quote: "Movement and mindset, that's where transformation happens.",
      bio: "2 years travelling and working across Australia and Japan.",
      photo: owen,
    },
    {
      name: "Arjun (Junny)",
      role: "Mentor",
      quote: "Small wins, big goals, one session at a time.",
      bio: "ESO at Sacred Heart Middle School working with Years 7–9.",
      photo: junny,
    },
    {
      name: "Logan",
      role: "Mentor",
      quote: "Get active, feel better, go further.",
      bio: "Passionate about sport and teamwork.",
      photo: logan,
    },
    {
      name: "Jacob",
      role: "Mentor",
      quote: "Every voice deserves to be heard, let's find yours.",
      bio: "Newest team member, based north of Adelaide.",
      photo: null,
    },
    {
      name: "Durar",
      role: "Mentor",
      quote: "Small wins, big goals, one session at a time.",
      bio: "Final-year Speech Pathology student and therapy assistant.",
      photo: durar,
    },
  ];

  team.forEach((m, i) => {
    const doc = {
      _id: `team-${i}`,
      _type: "teamMember",
      order: i,
      name: m.name,
      role: m.role,
      quote: m.quote,
      bio: m.bio,
    };
    if (m.photo) doc.photo = m.photo;
    tx.createOrReplace(doc);
  });

  const services = [
    {
      title: "Group Activities",
      description:
        "Community engagement and active collaboration to bring out the best qualities in every participant.",
      illustration: illusGroup,
    },
    {
      title: "Goal Setting Based Approach",
      description:
        "We consult with clients and families to help each young person fulfil their complete potential.",
      illustration: illusGoal,
    },
    {
      title: "One-on-One Mentoring",
      description:
        "Tailored sessions aligned with NDIS categories 01, 04, 09 and Therapy Assist, drawing on Self Care, Access Community, and Therapy Assist services.",
      illustration: illusOneOnOne,
    },
  ];

  services.forEach((sv, i) => {
    tx.createOrReplace({
      _id: `service-${i}`,
      _type: "service",
      order: i,
      ...sv,
    });
  });

  tx.createOrReplace({
    _id: "story-0",
    _type: "successStory",
    order: 0,
    title: "Riding a Bike",
    clientName: "Abhay",
    story:
      "Abhay achieved bike riding proficiency in approximately one month. He progressed from needing significant support to riding with minimal supervision, and can now ride independently from home to the park and back.",
    photo: bikePhoto,
  });

  tx.createOrReplace({
    _id: "story-1",
    _type: "successStory",
    order: 1,
    title: "Obtaining L Plates",
    clientName: "Jackson",
    story:
      "After celebrating his 16th birthday, Jackson was very keen to sit his learners test at Service SA. After undertaking numerous practice modules, Jackson felt he was ready to have a go at the real thing. We were super proud that he aced the test first go and received his L's straight away. We are now working alongside Jackson to help him build road safety awareness and become a more proficient driver behind the wheel!",
    photo: lPlatePhoto,
  });

  await tx.commit();
  console.log("Seed complete ✅");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
