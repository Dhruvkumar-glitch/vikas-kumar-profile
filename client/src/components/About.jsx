import React from "react";

export default function About({ about }) {
  if (!about) return null;
  return (
    <section>
      <h2>About</h2>
      <p>{about}</p>
    </section>
  );
}
