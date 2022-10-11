import { Model, PopulateOptions } from "mongoose";
import { IReaction } from "src/interfaces/IReaction";
import { RequestBodyCreatePost } from "src/interfaces/IRequest";
import { IPost } from "../../../interfaces/IPost";
import { IPostsRepository } from "../../../interfaces/IRepository";
import { Token } from "../../../interfaces/Token";
import Print from "../../../utils/Print";
import { PostModel } from "./PostsModel";
const print = new Print();

class PostReposiory implements IPostsRepository {
  private post: Model<IPost> = PostModel;

  async createPost(data: RequestBodyCreatePost): Promise<IPost | null> {
    try {
      const post = new this.post({
        ...data,
        reactions: [],
        comments: [],
        amountComments: 0,
        amountReactions: 0,
        creationDate: new Date(),
      } as IPost & RequestBodyCreatePost);
      await post.save();
      return post;
    } catch (err) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: createPost in PostRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }
  async getAll<Ref, Props extends keyof Ref, Ret = Pick<Ref, Props>>(): Promise<
    IPost<Ret>[] | null
  > {
    try {
      const posts = (await this.post.find().populate([
        {
          path: "owner",
          model: "User",
          select: ["name", "alias"],
        },
        {
          path: "reactions",
          model: "Reaction",
          select: "owner",
        },
      ] as PopulateOptions[])) as IPost<Ret>[];
      return posts;
    } catch (err) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: getAllByUserId in PostRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }

  async getAllByUserId(userId: Token): Promise<IPost[] | null> {
    try {
      const posts = await this.post.find({ owner: userId });
      return posts;
    } catch (err) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: getAllByUserId in PostRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }

  async getByPostId(userId: Token, postId: Token): Promise<IPost | null> {
    try {
      const post = await this.post.findOne({ owner: userId, _id: postId });
      return post;
    } catch (err) {
      print.blue(err);
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: getByPostId in PostRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }

  async editPost(postId: Token, data: IPost): Promise<IPost | null> {
    const { owner, ...postData } = data;
    try {
      const posts = await this.post.findOneAndUpdate(
        { owner, _id: postId },
        postData,
        {
          new: true,
        }
      );
      return posts;
    } catch (err) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: editPost in PostRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }

  async deleteOne(ownerId: Token, postId: Token): Promise<IPost | null> {
    try {
      const post = await this.post.findOneAndDelete({
        owner: ownerId,
        _id: postId,
      });
      return post;
    } catch (error) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: deleteOne in PostRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }

  async setLike(reaction: IReaction): Promise<boolean> {
    try {
      const post = await this.post.findOne({
        id: reaction.post,
        owner: reaction.owner,
      });
      if (!post) throw new Error("");
      if (post.reactions.includes(reaction.id)) {
        const reactionIdx = post.reactions.indexOf(reaction.id);
        post.reactions.splice(reactionIdx);
      } else {
        post.reactions.push(reaction);
      }
      post.amountReactions = post.reactions.length;
      await post.save();
      return true;
    } catch (error) {
      print.red(error);
      return false;
    }
  }
}

export default new PostReposiory();
