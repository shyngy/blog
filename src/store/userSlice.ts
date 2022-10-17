import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { UserState } from './types';

const initialState: UserState = {
  image: '',
  username: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      const { email, image, username } = action.payload;
      state.email = email;
      state.username = username;
      if (typeof image === 'string') {
        state.image = image;
      }
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
