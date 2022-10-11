import { Request, Response } from "express";
import { Token } from "src/interfaces/Token";
import PostRepository from "../../models/repository/posts/PostRepository";
import Print from "../../utils/Print";
import { IMessage } from "../../interfaces/IMessage";

const print = new Print();

type DeletePostParams = {
  userId: Token;
  postId: Token;
};

export const deletePostByUserId = async (req: Request, res: Response) => {
  const { userId, postId } = req.params;
  try {
    const post = await PostRepository.deleteOne(userId, postId);
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
