import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true }
  },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    label: { type: String, required: true }
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    tagline: { type: String },
    photo: { type: String },
    bio: { type: String },
    about: { type: String },
    experience: [experienceSchema],
    stats: [statSchema],
    services: [serviceSchema],
    contact: {
      email: String,
      phone: String,
      location: String,
      linkedin: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
