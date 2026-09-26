import React from "react";

export default function KeyExpertise({ expertise }) {
  if (!expertise || expertise.length === 0) return null;
  return (
    <section>
      <h2>Key Expertise</h2>
      <div className="expertise-grid">
        {expertise.map((item, idx) => (
          <span className="expertise-chip" key={idx}>{item}</span>
        ))}
      </div>
    </section>
  );
}