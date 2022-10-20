import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { ITraveler } from "../../../interfaces/IUser";

const TravelerSchema = new Schema<ITraveler>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    alias: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
        message: () => `Is not a valid email!`,
      },
      unique: true,
    },

    posts: [{ ref: "Post", type: Schema.Types.ObjectId, default: [] }],
    reactions: [{ ref: "Reaction", type: Schema.Types.ObjectId, default: [] }],
    userType: {
      type: String,
      enum: ["Traveler", "Agency"],
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: ["F", "M", "U"],
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: Schema.Types.String,
    country: Schema.Types.String,
    countriesILike: [{ type: Schema.Types.String }],
  },
  {
    versionKey: false,
  }
);

TravelerSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
TravelerSchema.plugin(mongooseUniqueValidator);

export const TravelerModel = model<ITraveler>("Traveler", TravelerSchema);
