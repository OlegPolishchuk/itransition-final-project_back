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
  userAvatar: string;
}
