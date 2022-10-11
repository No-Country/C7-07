import { model, Schema } from "mongoose";
import { IPost } from "../../../interfaces/IPost";

const PostSchema = new Schema<IPost>({
  creationDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  media: {
    type: String,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments", default: [] }],
  reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction", default: [] }],
  amountReactions: {
    type: Number,
    default: 0,
  },
  amountComments: {
    type: Number,
    default: 0,
  },
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

PostSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const PostModel = model<IPost>("Post", PostSchema);
