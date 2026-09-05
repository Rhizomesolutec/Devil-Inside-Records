import mongoose, { Schema } from "mongoose";

const CatalogueSchema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        artist: { type: String, required: true },
        type: { type: String, default: "SINGLE" },
        tracks: { type: Schema.Types.Mixed, default: 1 },
        date: { type: String, default: "" },
        duration: { type: String, default: "" },
        cover: { type: String, required: true },
        accent: { type: String, default: "#C81808" },
        tag: { type: String, default: "OUT NOW" },
        description: { type: String, default: "" },
        link: { type: String, default: "" },
        audio: { type: String, default: "" },
        youtubeLink: { type: String, default: "" },
        appleMusicLink: { type: String, default: "" },
        upcoming: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Catalogue =
    mongoose.models.Catalogue || mongoose.model("Catalogue", CatalogueSchema);
