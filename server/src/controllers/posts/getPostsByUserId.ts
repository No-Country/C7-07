import { Request, Response } from "express";
import { IMessage } from "src/interfaces/IMessage";
import PostRepository from "../../models/repository/posts/PostRepository";
import Print from "../../utils/Print";

const print = new Print();

export const getAllPostsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const posts = await PostRepository.getAllByUserId(userId);
    res.status(200).json({
      code: 200,
      message: "Post founded!",
      data: posts,
      status: "OK",
    } as IMessage);
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
    throw error;
  }
};
