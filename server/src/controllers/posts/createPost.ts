import { Request, Response } from "express";
import { IUser } from "../../interfaces/IUser";
import { IMessage } from "../../interfaces/IMessage";
import { IPost } from "../../interfaces/IPost";
import PostRepository from "../../models/repository/posts/PostRepository";
import {
  AgencyRepository,
  TravelerRepository,
} from "../../models/repository/user/";
import Print from "../../utils/Print";

const print = new Print();

export const createPost = async (
  req: Request & { token: string; payload: IUser },
  res: Response
) => {
  const { description, media } = req.body as Omit<
    IPost,
    | "owner"
    | "comments"
    | "amountComments"
    | "amountReactions"
    | "reactions"
    | "creationDate"
  >;
  const { id, userType } = req.payload;

  try {
    const newPost = await PostRepository.createPost(
      {
        description,
        owner: id,
        media,
      },
      userType
    );
    const user = await (userType === "Traveler"
      ? TravelerRepository
      : AgencyRepository
    ).setPost(id, newPost);
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
