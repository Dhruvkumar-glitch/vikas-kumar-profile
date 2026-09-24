import React from "react";

export default function Highlights({ stats }) {
  if (!stats || stats.length === 0) return null;
  return (
    <section>
      <h2>Highlights</h2>
      <div className="stats">
        {stats.map((s, idx) => (
          <div className="stat" key={idx}>
            <div className="num">{s.number}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
