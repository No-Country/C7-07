import { Request, Response } from "express";
import PostRepository from "../../models/repository/posts/PostRepository";
import Print from "../../utils/Print";
import { IMessage } from "../../interfaces/IMessage";
import { IUser } from "../../interfaces/IUser";

const print = new Print();

export const deletePostByUserId = async (
  req: Request & { token: string; payload: IUser },
  res: Response
) => {
  const { id } = req.payload;
  const { postId } = req.params;
  try {
    const post = await PostRepository.deleteOne(id, postId);
    res.status(200).json({
      code: 200,
      status: "OK",
      data: post,
      message: "Post Deleted!",
    } as IMessage);
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
    res.status(200).json({
      code: 200,
      status: "OK",
      data: null,
      message: "Post Deleted!",
    } as IMessage);
  }
};
