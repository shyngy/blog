import axios from 'axios';
import config, { getCookie } from './config';
import { Article, ResponsePostData } from './types';
import type { FullArticleData } from '../components/Article/types';

const header = () => ({ headers: { authorization: `Bearer ${getCookie('token')}` } });

function postApi(offset = 0, username?: string) {
  const favorited = username ? `&favorited=${username}` : '';
  return axios
    .get<ResponsePostData>(`${config.url}/articles?limit=5&offset=${offset}${favorited}`)
    .then((response) => {
      if (response.status === 401) {
        throw Error('unauthorized');
      }
      return response.data;
    });
}

export function getPostBySlug(slug: string) {
  return axios.get<{ article: Article }>(`${config.url}/articles/${slug}`).then((response) => {
    if (response.status === 401) {
      throw Error('unauthorized');
    }
    return response.data;
  });
}

export function newArticle(body: FullArticleData) {
  return axios
    .post<{ article: Article }>(`${config.url}/articles`, { article: body }, header())
    .then((response) => {
      if (response.status === 401) {
        throw Error('unauthorized');
      }
      return response.data;
    });
}

export function editArticle(body: FullArticleData, slug: string) {
  return axios
    .put<{ article: Article }>(`${config.url}/articles/${slug}`, { article: body }, header())
    .then((response) => {
      if (response.status === 401) {
        throw Error('unauthorized');
      }
      return response.data;
    });
}

export function deleteArticle(slug: string) {
  return axios
    .delete<{ article: Article }>(`${config.url}/articles/${slug}`, header())
    .then((response) => {
      if (response.status === 401) {
        throw Error('unauthorized');
      }
      return response.data;
    });
}

export function favoriteArticle(slug: string) {
  return axios
    .post<{ article: Article }>(`${config.url}/articles/${slug}/favorite`, {}, header())
    .then((response) => {
      if (response.status === 401) {
        throw Error('unauthorized');
      }
      return response.data;
    });
}

export function deleteFavoriteArticle(slug: string) {
  return axios
    .delete<{ article: Article }>(`${config.url}/articles/${slug}/favorite`, header())
    .then((response) => {
      if (response.status === 401) {
        throw Error('unauthorized');
      }
      return response.data;
    });
}

export default postApi;
