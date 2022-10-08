import { Token } from "src/interfaces/Token";
import PostRepository from "../../models/repository/posts/PostRepository";
import Print from "../../utils/Print";

const print = new Print();

type DeletePostParams = {
  userId: Token;
  postId: Token;
};

export const deletePostByUserId = async ({
  postId,
  userId,
}: DeletePostParams) => {
  try {
    const post = await PostRepository.deleteOne(userId, postId);
    return post;
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
    throw error;
  }
};
