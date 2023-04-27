import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {fetchPhotos} from '../actions/async/fetchPhotos';
import {likePhoto} from '../actions/async/likePhoto';
import {unlikePhoto} from '../actions/async/unlikePhoto';
import {searchPhotos} from '../actions/async/searchPhotos';
import {fetchMorePhotos} from '../actions/async/fetchMorePhotos';

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
      state.items = action.payload;
    });
    builder.addCase(fetchMorePhotos.fulfilled, (state, action) => {
      state.items = state.items.concat(action.payload);
    });
    builder.addCase(likePhoto.fulfilled, (state, action) => {
      console.log('like action:', action.payload);

      state.items = state.items.filter(item => {
        if (item.id === action.payload.id) {
          console.log('item.id:', item.id);
          console.log('item.isLiked:', item.isLiked);
          console.log('action.payload.id:', action.payload.id);
          console.log('action.payload.isLiked:', action.payload.isLiked);
          return action.payload;
        }
        return item;
      });
    });
    builder.addCase(unlikePhoto.fulfilled, (state, action) => {
      console.log('unlike action:', action.payload);
      state.items = state.items.filter(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    });
    builder.addCase(searchPhotos.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const {setPhotos} = photosSlice.actions;
export default photosSlice.reducer;
