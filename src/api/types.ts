export interface Article {
  slug: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[] | [null];
  favorited: boolean;
  favoritesCount: number;
  author: Author;
  description: string;
}

export interface Author {
  username: string;
  image: string;
  following: boolean;
}

export interface ResponsePostData {
  articles: Article[];
  articlesCount: number;
}
