import { Schema, model } from "mongoose";

const AgencySchema = new Schema({}, { versionKey: false });

export const AgencyModel = model("Tour", AgencySchema);
