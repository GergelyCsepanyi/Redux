import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {fetchPhotos} from '../actions/async/fetchPhotos';
import {likePhoto} from '../actions/async/likePhoto';
import {unlikePhoto} from '../actions/async/unlikePhoto';
import {searchPhotos} from '../actions/async/searchPhotos';

export type PhotoModel = {
  id: string;
  imageUrl?: string;
  profileImageUrl?: string;
  name?: string;
  isLiked: boolean;
  likesCount: number;
};

interface PhotosState {
  items: Array<PhotoModel>;
  loading: boolean;
  error: string | null;
}

const initialState: PhotosState = {items: [], loading: false, error: null};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<Array<PhotoModel>>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      if (action.meta.arg.concatResult) {
        state.items = state.items.concat(action.payload);
      } else {
        state.items = action.payload;
      }
    });
    builder.addCase(likePhoto.fulfilled, (state, action) => {
      state.items = state.items.filter(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    });
    builder.addCase(unlikePhoto.fulfilled, (state, action) => {
      state.items = state.items.filter(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    });
    builder.addCase(searchPhotos.fulfilled, (state, action) => {
      if (action.meta.arg.concatResult) {
        state.items = state.items.concat(action.payload);
      } else {
        state.items = action.payload;
      }
    });
  },
});

export const {setPhotos} = photosSlice.actions;
export default photosSlice.reducer;
