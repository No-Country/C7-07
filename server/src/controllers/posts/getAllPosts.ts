import { Request, Response } from "express";
import { IMessage } from "../../interfaces/IMessage";
import PostRepository from "../../models/repository/posts/PostRepository";
import Print from "../../utils/Print";
import { IUser } from "src/interfaces/IUser";

const print = new Print();

export const getAllPosts = async (_: Request, res: Response) => {
  try {
    const posts = await PostRepository.getAll<IUser, "name" | "id">();
    res.status(200).json({
      code: 200,
      message: `Post founded: ${posts?.length ?? 0} `,
      data: posts,
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
