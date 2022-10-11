import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { IBusiness } from "../../../interfaces/IUser";

const BusinessSchema = new Schema<IBusiness>(
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
      enum: ["traveler", "business"],
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    contacts: [{ type: Schema.Types.String }],
  },
  {
    versionKey: false,
  }
);

BusinessSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
BusinessSchema.plugin(mongooseUniqueValidator);

export const BusinessModel = model<IBusiness>("Agency", BusinessSchema);
