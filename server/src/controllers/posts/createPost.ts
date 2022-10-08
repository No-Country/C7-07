import { Request, Response } from "express";
import { IMessage } from "../../interfaces/IMessage";
import { IPost } from "../../interfaces/IPost";
import PostRepository from "../../models/repository/posts/PostRepository";
import { UserRepository } from "../../models/repository/user/UserRepository";
import Print from "../../utils/Print";

const print = new Print();
const User = new UserRepository();

export const createPost = async (req: Request, res: Response) => {
  const { description, media } = req.body as Omit<
    IPost,
    | "owner"
    | "comments"
    | "amountComments"
    | "amountReactions"
    | "reactions"
    | "creationDate"
  >;
  const { userId } = req.params;

  try {
    const newPost = await PostRepository.createPost({
      description,
      owner: userId,
      media,
    });
    const user = await User.setPost(
      userId,
      (newPost as IPost & { id: string }).id
    );
    res.status(200).json({
      code: 200,
      message: "Post saved!",
      data: {
        user,
        post: newPost,
      },
      status: "OK",
    } as IMessage);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: getUserByid \nContext:</controllers/user>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: error,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};
