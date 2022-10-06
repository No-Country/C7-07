type Metadata = {
  creationDate: string;
  likes: number;
  comments: number;
  userLikeIt: boolean;
};

type User = {
  name: string;
  profile: string;
};
export interface IPost {
  user: Partial<User>;
  metadata: Partial<Metadata>;
  desc?: string;
  media?: string;
}
