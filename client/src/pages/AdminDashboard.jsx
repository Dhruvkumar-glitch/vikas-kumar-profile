import React, { useEffect, useState } from "react";
import "../Admin.css";

const emptyProfile = {
  name: "",
  role: "",
  company: "",
  tagline: "",
  photo: "",
  bio: "",
  about: "",
  experience: [],
  services: [],
  stats: [],
  contact: { email: "", phone: "963978097", location: "", linkedin: "" }
};

export default function AdminDashboard() {
  const [token, setToken] = useState(sessionStorage.getItem("adminToken") || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [profile, setProfile] = useState(emptyProfile);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile({ ...emptyProfile, ...data });
        setLoaded(true);
      })
      .catch(() => setStatus("Could not load profile."));
  }, [token]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.message || "Login failed");
        return;
      }
      sessionStorage.setItem("adminToken", data.token);
      setToken(data.token);
    } catch {
      setLoginError("Could not reach server.");
    }
  }

  function logout() {
    sessionStorage.removeItem("adminToken");
    setToken("");
    setLoaded(false);
  }

  function updateField(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
  }

  function handlePhotoFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateField("photo", reader.result); // base64 data URI, stored directly in MongoDB
    };
    reader.readAsDataURL(file);
  }

  function updateContact(field, value) {
    setProfile((p) => ({ ...p, contact: { ...p.contact, [field]: value } }));
  }

  function updateListItem(listName, idx, field, value) {
    setProfile((p) => {
      const list = [...p[listName]];
      list[idx] = { ...list[idx], [field]: value };
      return { ...p, [listName]: list };
    });
  }

  function addListItem(listName, template) {
    setProfile((p) => ({ ...p, [listName]: [...p[listName], template] }));
  }

  function removeListItem(listName, idx) {
    setProfile((p) => {
      const list = [...p[listName]];
      list.splice(idx, 1);
      return { ...p, [listName]: list };
    });
  }

  async function handleSave() {
    setStatus("Saving…");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      if (!res.ok) {
        const data = await res.json();
        setStatus(data.message || "Save failed.");
        return;
      }
      setStatus("Saved! Changes are live on the profile page.");
    } catch {
      setStatus("Could not reach server.");
    }
  }

  if (!token) {
    return (
      <div className="admin-login-wrap">
        <form className="admin-login-box" onSubmit={handleLogin}>
          <h1>Admin Login</h1>
          <p className="admin-sub">Enter the admin password to edit the profile.</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <div className="admin-error">{loginError}</div>}
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }

  if (!loaded) {
    return <div className="admin-loading">Loading profile…</div>;
  }

  return (
    <div className="admin-wrap">
      <div className="admin-topbar">
        <h1>Edit Profile</h1>
        <div>
          <a className="admin-link" href="/" target="_blank" rel="noreferrer">View live page ↗</a>
          <button className="admin-logout" onClick={logout}>Log out</button>
        </div>
      </div>

      <section className="admin-section">
        <h2>Basic Info</h2>
        <label>Name</label>
        <input value={profile.name} onChange={(e) => updateField("name", e.target.value)} />
        <label>Role</label>
        <input value={profile.role} onChange={(e) => updateField("role", e.target.value)} />
        <label>Company</label>
        <input value={profile.company} onChange={(e) => updateField("company", e.target.value)} />
        <label>Tagline</label>
        <input value={profile.tagline} onChange={(e) => updateField("tagline", e.target.value)} />
        <label>Photo</label>
        {profile.photo && <img src={profile.photo} alt="Preview" className="admin-photo-preview" />}
        <input type="file" accept="image/*" onChange={handlePhotoFile} />
        <div className="admin-or">— or paste an image URL —</div>
        <input
          placeholder="https://..."
          value={profile.photo?.startsWith("data:") ? "" : profile.photo}
          onChange={(e) => updateField("photo", e.target.value)}
        />
        <label>Short Bio (shown in hero)</label>
        <textarea rows={3} value={profile.bio} onChange={(e) => updateField("bio", e.target.value)} />
        <label>About (longer summary)</label>
        <textarea rows={4} value={profile.about} onChange={(e) => updateField("about", e.target.value)} />
      </section>

      <section className="admin-section">
        <h2>Contact</h2>
        <label>Email</label>
        <input value={profile.contact.email} onChange={(e) => updateContact("email", e.target.value)} />
        <label>Phone</label>
        <input value={profile.contact.phone} onChange={(e) => updateContact("phone", e.target.value)} />
        <label>Location</label>
        <input value={profile.contact.location} onChange={(e) => updateContact("location", e.target.value)} />
        <label>LinkedIn</label>
        <input value={profile.contact.linkedin} onChange={(e) => updateContact("linkedin", e.target.value)} />
      </section>

      <section className="admin-section">
        <h2>Experience</h2>
        {profile.experience.map((item, idx) => (
          <div className="admin-list-item" key={idx}>
            <label>Title</label>
            <input value={item.title} onChange={(e) => updateListItem("experience", idx, "title", e.target.value)} />
            <label>Duration</label>
            <input value={item.duration} onChange={(e) => updateListItem("experience", idx, "duration", e.target.value)} />
            <label>Description</label>
            <textarea rows={3} value={item.description} onChange={(e) => updateListItem("experience", idx, "description", e.target.value)} />
            <button className="admin-remove" onClick={() => removeListItem("experience", idx)}>Remove</button>
          </div>
        ))}
        <button className="admin-add" onClick={() => addListItem("experience", { title: "", duration: "", description: "" })}>
          + Add Experience
        </button>
      </section>

      <section className="admin-section">
        <h2>Services</h2>
        {profile.services.map((item, idx) => (
          <div className="admin-list-item" key={idx}>
            <label>Title</label>
            <input value={item.title} onChange={(e) => updateListItem("services", idx, "title", e.target.value)} />
            <label>Description</label>
            <textarea rows={2} value={item.description} onChange={(e) => updateListItem("services", idx, "description", e.target.value)} />
            <button className="admin-remove" onClick={() => removeListItem("services", idx)}>Remove</button>
          </div>
        ))}
        <button className="admin-add" onClick={() => addListItem("services", { title: "", description: "" })}>
          + Add Service
        </button>
      </section>

      <section className="admin-section">
        <h2>Highlights (Stats)</h2>
        {profile.stats.map((item, idx) => (
          <div className="admin-list-item admin-list-item-row" key={idx}>
            <div>
              <label>Number</label>
              <input value={item.number} onChange={(e) => updateListItem("stats", idx, "number", e.target.value)} />
            </div>
            <div>
              <label>Label</label>
              <input value={item.label} onChange={(e) => updateListItem("stats", idx, "label", e.target.value)} />
            </div>
            <button className="admin-remove" onClick={() => removeListItem("stats", idx)}>Remove</button>
          </div>
        ))}
        <button className="admin-add" onClick={() => addListItem("stats", { number: "", label: "" })}>
          + Add Stat
        </button>
      </section>

      <div className="admin-save-bar">
        <button className="admin-save" onClick={handleSave}>Save Changes</button>
        {status && <span className="admin-status">{status}</span>}
      </div>
    </div>
  );
}
