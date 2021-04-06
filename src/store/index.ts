import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './game';

export default configureStore({
  reducer: {
    game: gameSlice,
  },
});
