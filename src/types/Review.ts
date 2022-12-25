export type Review = {
  title: string;
  subtitle: string;
  tags: string[];
  body: string;
  personalScore: number;
  overallScore: number;
  comments: [];
  created: Date,
  updated: Date,
  userId: string;
  userName: string;
  userLikes: number;
  userAvatar: string;
  likes: number;
  likesId: string[],
  overallScoresId: string[],
}
