import { model, Schema } from "mongoose";
import { IPost } from "../interfaces/IPost";

const Post = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  media: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
});

export default model<IPost>("Post", Post);
