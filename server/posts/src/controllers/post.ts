import { Request, Response } from "express";
import { IPost } from "../interfaces/IPost";
import Post from "../models/Post";

export async function createPost(req: Request, res: Response) {
  try {
    const { body } = req;
    const post = new Post<IPost>(body);
    await post.save();
    res.json({ msg: "Saved" });
  } catch (error) {
    res.json({ msg: error });
  }
}

export async function getPosts(req: Request, res: Response) {
  try {
    const m = await Post.find<Array<IPost>>();
    res.json({ data: m });
  } catch (e) {
    console.log(e);
  }
}
export async function getPostById(req: Request, res: Response) {
  try {
    const m = await Post.find();
    res.json({ data: m });
  } catch (e) {
    console.log(e);
  }
}
