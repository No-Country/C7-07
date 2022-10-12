import { Schema, model } from "mongoose";
import { IReaction } from "../../../interfaces/IReaction";

const ReactionSchema = new Schema<IReaction>({
  owner: { ref: "User", type: Schema.Types.ObjectId },
  post: { ref: "Post", type: Schema.Types.ObjectId },
});

ReactionSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const ReactionModel = model<IReaction>("Reaction", ReactionSchema);
