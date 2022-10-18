import { Schema, model } from "mongoose";
import { ITour } from "src/interfaces/ITour";

const TourSchema = new Schema<ITour>(
  {
    title: {
      type: Schema.Types.String,
    },
    agencies: [{ description: Schema.Types.String, name: Schema.Types.String }],
    experience: [
      {
        whatYouWillDo: [{ type: Schema.Types.String }],
        whatIncludes: [{ type: Schema.Types.String }],
        meetingPoint: Schema.Types.String,
      },
    ],
    days: Schema.Types.Number,
    region: Schema.Types.String,
    country: {
      type: Schema.Types.String,
    },
    description: {
      type: Schema.Types.String,
    },
    personPriceUsd: {
      type: Schema.Types.String,
    },
    stops: [
      {
        number: Schema.Types.String,
        name: Schema.Types.String,
        direction: Schema.Types.String,
        coords: [Schema.Types.Number, Schema.Types.Number],
        height: Schema.Types.Number,
        details: {
          watcher: Schema.Types.Boolean,
          pickUpPoint: Schema.Types.Boolean,
          trekking: Schema.Types.Boolean,
        },
      },
    ],
    mainImages: [Schema.Types.String],
  },
  { versionKey: false }
);

TourSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const TourModel = model<ITour>("Tour", TourSchema);
