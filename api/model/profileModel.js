import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    personalInfo: { type: String, required: true },

    beautyPreferences: { type: String, required: true },

    subscription: { type: String, required: true },

    photo: { type: String }, // Add photo field

    dateOfBirth: { type: Date }, // Add date of birth field

    gender: { type: String}, // Add gender field

    location: { type: String }, // Add location field

    bio: { type: String }, // Add bio field

    socialMediaLinks: { type: [String]}, // Add social media links field
    
    interests: { type: [String] }, // Add interests field


}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
