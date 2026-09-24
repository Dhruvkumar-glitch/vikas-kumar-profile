import React from "react";

export default function Services({ services }) {
  if (!services || services.length === 0) return null;
  return (
    <section>
      <h2>Services</h2>
      <div className="services-grid">
        {services.map((s, idx) => (
          <div className="service-card" key={idx}>
            <div className="service-title">{s.title}</div>
            <p className="service-desc">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
