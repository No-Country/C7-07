import { Request, Response } from "express";
import PostRepository from "../../models/repository/posts/PostRepository";
import { UserRepository } from "../../models/repository/user/UserRepository";
import { ReactionRepository } from "../../models/repository/reaction/ReactionRepository";
import { IMessage } from "../../interfaces/IMessage";

const User = new UserRepository();
const Reaction = new ReactionRepository();

export const setLike = async (req: Request, res: Response) => {
  const { userId, postId } = req.params;
  try {
    let reaction = await Reaction.getOne(userId, postId);

    if (!reaction) {
      reaction = await Reaction.create(userId, postId);
    }

    const isLikedPost = await PostRepository.setLike(reaction);
    const isLikedUser = await User.setLike(reaction);
    if (!isLikedPost || !isLikedUser) throw "Error can not like.";
    if (isLikedPost === "remove" && isLikedUser === "remove") {
      await Reaction.deleteOne(userId, postId);
    }
    res.status(200).json({
      code: 200,
      status: "OK",
      data: true,
      message: "Like done!",
    } as IMessage<boolean>);
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "ERROR",
      data: null,
      message: error,
    } as IMessage);
  }
};
