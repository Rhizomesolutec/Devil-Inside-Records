import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        tag: { type: String, default: "LIVE EVENT" },
        date: { type: String, default: "" },
        dates: { type: [String], default: [] },
        venue: { type: String, default: "" },
        image: { type: String, default: "" },
        ticketUrl: { type: String, default: "" },
        ticketLabel: { type: String, default: "GET TICKETS" },
        placeholder: { type: Boolean, default: false },
        placement: { type: String, enum: ["featured", "mhr-sub"], default: "mhr-sub" },
    },
    { timestamps: true }
);

export const EventModel =
    mongoose.models.Event || mongoose.model("Event", EventSchema);
