export interface ArticleData {
  title: string;
  description: string;
  body: string;
}

export interface FullArticleData extends ArticleData {
  tagList: string[];
}

export interface Tag {
  value: string;
  id: string;
}

export interface ArticleProps {
  articleTitle: string;
}
