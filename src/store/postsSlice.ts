import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { Article } from '../api/types';
import postApi from '../api/post';

interface PostsState {
  items: Article[];
  articlesCount: number;
  currentPage: number;
  fullPostItem: Article | null;
}

const initialState: PostsState = {
  items: [],
  articlesCount: 0,
  currentPage: 1,
  fullPostItem: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<{ articles: Article[]; articlesCount: number }>) => {
      state.items = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFullPost: (state, action: PayloadAction<Article>) => {
      state.fullPostItem = action.payload;
    },

    setPostFavorite: (
      state,
      action: PayloadAction<Pick<Article, 'favorited' | 'favoritesCount' | 'slug'>>,
    ) => {
      const { slug, favorited, favoritesCount } = action.payload;
      state.items.forEach((item) => {
        if (item.slug === slug) {
          item.favorited = favorited;
          item.favoritesCount = favoritesCount;
        }
      });
      if (state.fullPostItem?.slug === slug) {
        state.fullPostItem.favorited = favorited;
        state.fullPostItem.favoritesCount = favoritesCount;
      }
    },
  },
});

export const { setPosts, setPage, setPostFavorite, setFullPost } = postsSlice.actions;

export const getFavorite = createAsyncThunk(
  'post/get-favorite',
  async (setLoading: (loading: boolean) => void, thunkAPI) => {
    try {
      const { user, posts } = thunkAPI.getState() as RootState;
      const postData = await postApi((posts.currentPage - 1) * 5);
      const favoritePostData = await postApi(0, user.username);
      thunkAPI.dispatch(setPosts(postData));
      if (user.username) {
        favoritePostData.articles.forEach(({ favoritesCount, slug }) => {
          thunkAPI.dispatch(setPostFavorite({ favorited: true, favoritesCount, slug }));
        });
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  },
);

export const selectPosts = (state: RootState) => state.posts.items;
export const selectFullPost = (state: RootState) => state.posts.fullPostItem;
export const selectPostsCount = (state: RootState) => state.posts.articlesCount;
export const selectCurrentPage = (state: RootState) => state.posts.currentPage;
export default postsSlice.reducer;
