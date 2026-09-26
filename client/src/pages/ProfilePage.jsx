import React, { useEffect, useState } from "react";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";
import KeyExpertise from "../components/KeyExpertise.jsx";
import Experience from "../components/Experience.jsx";
import Highlights from "../components/Highlights.jsx";
import Contact from "../components/Contact.jsx";
import ChatWidget from "../components/ChatWidget.jsx";
import "../App.css";

// Fallback data shown if the API/DB isn't running yet, so the page
// still looks right the moment you run `npm run dev` in /client.
const fallbackProfile = {
  name: "Vikas Kumar",
  role: "Deputy General Manager",
  company: "Vynk Parking Solutions",
  tagline: "Business Development & Strategy",
  photo: "/vikas-kumar.jpg",
  bio: "Deputy General Manager leading business development and strategic growth at Vynk Parking Solutions. Focused on building strong client relationships and delivering customized parking management solutions across multiple sites.",
  about:
    "Deputy General Manager – Business Development & Strategy, driving revenue growth and expanding business opportunities through strategic client engagement and market expansion initiatives.",
  expertise: [
    "Multi-Site Parking Operations",
    "B2B Contract Negotiation",
    "Revenue Optimization",
    "SLA & Quality Compliance",
    "Manpower Coordination",
    "Vendor Management",
    "Parking Tech Systems (ANPR, Ticketing)",
    "Client Escalation Handling",
    "New Site Launch & Setup"
  ],
  experience: [
    {
      title: "Deputy General Manager — Business Development, Vynk Parking Solutions Pvt. Ltd.",
      duration: "Present",
      description:
        "Leading strategic initiatives to drive revenue growth and expand business opportunities. Responsible for identifying new clients, developing strong business relationships, and managing end-to-end sales processes from lead generation to closure. Actively involved in proposal planning, contract negotiations, and delivering customized parking management solutions to clients. Experienced in handling B2B clients, managing multiple sites, and ensuring seamless coordination between operations and clients for high-quality service delivery. Focused on market expansion, optimizing business strategies, and achieving sustainable growth for the organization."
    }
  ],
  services: [
    { title: "Business Development", description: "Identifying new clients and growth opportunities across markets." },
    { title: "Client Relations", description: "Building and managing long-term B2B relationships with key accounts." },
    { title: "Contract Negotiation", description: "End-to-end proposal planning and contract closure." },
    { title: "Multi-Site Operations", description: "Coordinating operations and service delivery across multiple parking sites." }
  ],
  stats: [
    { number: "X+", label: "Years Experience" },
    { number: "X", label: "Sites Managed" },
    { number: "X", label: "Team Size" }
  ],
  contact: {
    email: "[email protected]",
    phone: "+91 XXXXX XXXXX",
    location: "Delhi, India",
    linkedin: "linkedin.com/in/[profile]"
  }
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("No profile from API yet");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setUsingFallback(false);
      })
      .catch(() => {
        setUsingFallback(true);
      });
  }, []);

  return (
    <div>
      {usingFallback && (
        <div className="api-note">
          API se data nahi mila — placeholder dikhaya ja raha hai. Backend (server) aur
          MongoDB start karke <code>npm run seed</code> chalayein.
        </div>
      )}
      <Hero profile={profile} />
      <About about={profile.about} />
      <KeyExpertise expertise={profile.expertise} />
      <Services services={profile.services} />
      <Experience items={profile.experience} />
      <Highlights stats={profile.stats} />
      <Contact contact={profile.contact} />
      <footer className="footer">
        © {new Date().getFullYear()} {profile.name} · {profile.company}
      </footer>
      <div style={{ textAlign: "center", padding: "20px" }}>
  <a href="/admin">Admin Login</a>
</div>
      <ChatWidget />
    </div>
  );
}