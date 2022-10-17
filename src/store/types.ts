import { Article } from '../api/types';

export interface PostsState {
  items: Article[];
  articlesCount: number;
  currentPage: number;
  fullPostItem: Article | null;
}
export interface UserState {
  image: string;
  username: string;
  email: string;
}
