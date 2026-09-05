import mongoose, { Schema } from "mongoose";

const ArtistSchema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        genre: { type: String, default: "" },
        description: { type: String, default: "" },
        fullDescription: { type: String, default: "" },
        image: { type: String, required: true },
        modalImage: { type: String, required: true },
        socials: {
            instagram: { type: String, default: "" },
            spotify: { type: String, default: "" },
            youtube: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

export const ArtistModel =
    mongoose.models.Artist || mongoose.model("Artist", ArtistSchema);
