import React from "react";

export default function Experience({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <section>
      <h2>Experience</h2>
      {items.map((item, idx) => (
        <div className="exp-item" key={idx}>
          <div className="title">{item.title}</div>
          <div className="meta">{item.duration}</div>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
}
