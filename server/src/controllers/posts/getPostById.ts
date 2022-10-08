import { Request, Response } from "express";
import { Token } from "src/interfaces/Token";
import { IMessage } from "src/interfaces/IMessage";
import PostRepository from "../../models/repository/posts/PostRepository";
import Print from "../../utils/Print";

const print = new Print();

type GetPostByIdParams = {
  postId: Token;
  userId: Token;
};

export const getPostById = async (req: Request, res: Response) => {
  const { postId, userId } = req.params as GetPostByIdParams;
  try {
    const post = await PostRepository.getByPostId(userId, postId);
    res.status(200).json({
      code: 200,
      message: "Post founded!",
      data: post,
      status: "OK",
    } as IMessage);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: getAll \nContext:</controllers/>\n${print.repeat("-", 10)}`
    );
    throw error;
  }
};
