import { Request, Response } from "express";
import PostRepository from "../../models/repository/posts/PostRepository";
import {
  AgencyRepository,
  TravelerRepository,
} from "../../models/repository/user";
import { ReactionRepository } from "../../models/repository/reaction/ReactionRepository";
import { IMessage } from "../../interfaces/IMessage";
import { IUser } from "../../interfaces/IUser";

const Reaction = new ReactionRepository();

export const setLike = async (
  req: Request & { token: string; payload: IUser },
  res: Response
) => {
  const { id, userType } = req.payload;
  const { postId } = req.params;
  try {
    let reaction = await Reaction.getOne({ userId: id, postId });

    if (!reaction) {
      reaction = await Reaction.create(id, postId);
    }
    const isLikedPost = await PostRepository.setLike(reaction);
    const isLikedUser = await (userType === "Traveler"
      ? TravelerRepository
      : AgencyRepository
    ).setLike(reaction);

    if (!isLikedPost || !isLikedUser) throw "Error can not like.";
    if (isLikedPost === "remove" && isLikedUser === "remove") {
      await Reaction.deleteOne(reaction);
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
