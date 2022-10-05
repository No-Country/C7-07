import { Model } from "mongoose";
import { IPost } from "../../../interfaces/IPost";
import { IPostsRepository } from "../../../interfaces/IRepository";
import { Token } from "../../../interfaces/Token";
import Print from "../../../utils/Print";
import { PostModel } from "./PostsModel";
const print = new Print();

class PostReposiory implements IPostsRepository {
  private post: Model<IPost>;

  constructor() {
    this.post = PostModel;
  }

  async createPost(data: IPost): Promise<IPost | null> {
    try {
      const post = new this.post(data);
      await post.save();
      return data;
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
      print.blue(`${post}`);
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
    const { owner, reactions, ...postData } = data;
    try {
      const posts = await this.post.findOneAndUpdate({ owner }, postData);
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
}

export default new PostReposiory();
