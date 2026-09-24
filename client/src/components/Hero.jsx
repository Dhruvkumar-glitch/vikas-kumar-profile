import React from "react";

export default function Hero({ profile }) {
  return (
    <header className="hero">
      <div className="hero-inner hero-grid">
        <div>
          <div className="kicker">
            {profile.role?.toUpperCase()} · {profile.company?.toUpperCase()}
          </div>
          <h1>{profile.name}</h1>
          <div className="role">{profile.tagline}</div>
          <p className="hero-bio">{profile.bio}</p>
        </div>
        {profile.photo && (
          <div className="hero-photo-wrap">
            <img className="hero-photo" src={profile.photo} alt={profile.name} />
          </div>
        )}
      </div>
    </header>
  );
}
