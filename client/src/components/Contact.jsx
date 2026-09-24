import React from "react";

export default function Contact({ contact }) {
  if (!contact) return null;
  return (
    <section>
      <h2>Contact</h2>
      <div className="contact-grid">
        {contact.email && (
          <div>
            <span>Email</span>
            {contact.email}
          </div>
        )}
        {contact.phone && (
          <div>
            <span>Phone</span>
            {contact.phone}
          </div>
        )}
        {contact.location && (
          <div>
            <span>Location</span>
            {contact.location}
          </div>
        )}
        {contact.linkedin && (
          <div>
            <span>LinkedIn</span>
            {contact.linkedin}
          </div>
        )}
      </div>
    </section>
  );
}
