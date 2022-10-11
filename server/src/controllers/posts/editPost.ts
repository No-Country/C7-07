import { Request, Response } from "express";
import { IMessage } from "../../interfaces/IMessage";
import { IPost } from "../../interfaces/IPost";
import { IUser } from "../../interfaces/IUser";
import { Token } from "../../interfaces/Token";
import PostRepository from "../../models/repository/posts/PostRepository";
import Print from "../../utils/Print";

const print = new Print();

type EditPost = {
  params: {
    postId: Token;
  };
  body: Omit<IPost, "owner">;
};

export const editPost = async (
  req: Request & { token: string; payload: IUser },
  res: Response
) => {
  const {
    amountComments,
    amountReactions,
    comments,
    description,
    reactions,
    media,
    creationDate,
  } = req.body as EditPost["body"];
  const { id } = req.payload;
  const { postId } = req.params as EditPost["params"];
  try {
    const post = await PostRepository.editPost(postId, {
      amountComments,
      amountReactions,
      comments,
      description,
      reactions,
      media,
      creationDate,
      owner: id,
    });
    res.status(200).json({
      code: 200,
      message: "Post saved!",
      data: post,
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
