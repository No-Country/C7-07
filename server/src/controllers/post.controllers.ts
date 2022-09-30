import { Response, Request } from "express";
import { IMessage } from "../interfaces/IMessage";
import { IPost } from "../interfaces/IPost";
import { RequestBody, UrlParams } from "../interfaces/IRequest";
import PostRepository from "../models/repository/posts/PostRepository";
import Print from "../utils";

const print = new Print();

export const createPost = async (req: Request, res: Response) => {
  const { title, description, media } = req.body as RequestBody;
  const { userId } = req.params as UrlParams;
  try {
    const post = await PostRepository.createPost({
      title,
      description,
      reactions: [],
      media,
      owner: userId,
    });
    res.status(200).json({
      message: `Posts Created!`,
      code: 200,
      data: post,
      status: "OK",
    } as IMessage<typeof post>);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: createPost \nContext:</controllers/>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: `Error ocurred.`,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};

export const getAllPostsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params as UrlParams;
  try {
    const posts = await PostRepository.getAllByUserId(userId);
    res.status(200).json({
      message: `Posts founded: ${posts?.length || 0}`,
      code: 200,
      data: posts,
      status: "OK",
    } as IMessage<typeof posts>);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: getAllPostsByUserId \nContext:</controllers/>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: `Error ocurred.`,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { userId, postId } = req.params as UrlParams;
  try {
    let msg = "Post founded!";
    print.blue(`Controller<userId, postId>: ${userId}/${postId}`);
    const post = await PostRepository.getByPostId(userId, postId);
    if (!post) msg = "Not posts founded";
    res.status(200).json({
      message: msg,
      code: 200,
      data: post,
      status: "OK",
    } as IMessage<typeof post>);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: getPostById \nContext:</controllers/>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: `Error ocurred.`,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};

export const editPost = async (req: Request, res: Response) => {
  const { title, description, reactions, media } = req.body as IPost;
  const { postId, userId } = req.params as UrlParams;
  try {
    let msg = "Post founded!";
    const post = await PostRepository.editPost(postId, {
      title,
      description,
      reactions,
      media,
      owner: userId,
    });

    if (!post) msg = "Not posts founded";

    res.status(200).json({
      message: msg,
      code: 200,
      data: post,
      status: "OK",
    } as IMessage<typeof post>);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: editPost \nContext:</controllers/>\n${print.repeat("-", 10)}`
    );
    res.status(500).json({
      message: `Error ocurred.`,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};

export const deletePostByUserId = async (req: Request, res: Response) => {
  const { userId, postId } = req.params as UrlParams;
  try {
    const posts = await PostRepository.deleteOne(userId, postId);
    res.status(200).json({
      message: `Posts founded: ${posts || 0}`,
      code: 200,
      data: posts,
      status: "OK",
    } as IMessage<typeof posts>);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: deletePostByUserId \nContext:</controllers/>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: `Error ocurred.`,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};
