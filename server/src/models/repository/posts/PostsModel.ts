import { model, Schema } from "mongoose";
import { IPost } from "../../../interfaces/IPost";

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  media: {
    type: String,
  },
  reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

PostSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const PostModel = model<IPost>("Post", PostSchema);
