import mongoose from "mongoose";
import dotenv from "dotenv";
import Profile from "./models/Profile.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/vynk_profile";

const sampleData = {
  name: "Vikas Kumar",
  photo: "/vikas-kumar.jpg",
  role: "Deputy General Manager",
  company: "Vynk Parking Solutions",
  tagline: "Business Development & Strategy",
  bio: "Deputy General Manager leading business development and strategic growth at Vynk Parking Solutions. Focused on building strong client relationships and delivering customized parking management solutions across multiple sites.",
  about:
    "Deputy General Manager – Business Development & Strategy, driving revenue growth and expanding business opportunities through strategic client engagement and market expansion initiatives.",
  expertise: [
    "Multi-site parking operations",
    "B2B contract negotiation",
    "Revenue optimization",
    "SLA and quality compliance",
    "Manpower coordination",
    "Vendor management",
    "Parking tech systems (ANPR, ticketing)",
    "Client escalation handling",
    "New site launch and setup"
  ],
  experience: [
    {
      title: "Deputy General Manager — Business Development, Vynk Parking Solutions Pvt. Ltd.",
      duration: "Mar 2026 - Present · Delhi, India",
      description:
        "Leading strategic initiatives to drive revenue growth and expand business opportunities. Responsible for identifying new clients, developing strong business relationships, and managing end-to-end sales processes from lead generation to closure. Actively involved in proposal planning, contract negotiations, and delivering customized parking management solutions to clients. Experienced in handling B2B clients, managing multiple sites, and ensuring seamless coordination between operations and clients for high-quality service delivery. Focused on market expansion, optimizing business strategies, and achieving sustainable growth for the organization."
    },
    {
      title: "Operation & BD Manager, ParkMate In",
      duration: "Jan 2023 - Feb 2026 · Noida, Uttar Pradesh, India",
      description:
        "Managed daily parking operations while driving new business development across multiple sites. Handled client onboarding, site audits, and operational planning to ensure smooth day-to-day functioning. Worked closely with cross-functional teams to improve service quality, resolve on-ground issues, and maintain strong client relationships. Contributed to business growth by identifying new opportunities and supporting the sales pipeline alongside operational responsibilities."
    },
    {
      title: "Operation Executive, Secure Parking",
      duration: "May 2016 - Dec 2022",
      description:
        "Handled on-site parking operations, staff coordination, and day-to-day site management. Ensured smooth execution of processes, maintained service standards, and supported operational efficiency across assigned locations. Built a strong foundation in operations management, client servicing, and team coordination during this tenure."
    }
  ],
  services: [
    {
      title: "Business Development",
      description: "Identifying new clients and growth opportunities across markets."
    },
    {
      title: "Client Relations",
      description: "Building and managing long-term B2B relationships with key accounts."
    },
    {
      title: "Contract Negotiation",
      description: "End-to-end proposal planning and contract closure."
    },
    {
      title: "Multi-Site Operations",
      description: "Coordinating operations and service delivery across multiple parking sites."
    }
  ],
  stats: [
    { number: "10+", label: "Years Experience" },
    { number: "200+", label: "Sites Managed" },
    { number: "10000+", label: "Team Size" }
  ],
  contact: {
    email: "vikasper1987@gmail.com",
    phone: "+91 9891251884",
    location: "Delhi, India",
    linkedin: "linkedin.com/in/vikas-kumar-2a7009128"
  }
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    await Profile.deleteMany({});
    await Profile.create(sampleData);
    console.log("Profile seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
}

seed();