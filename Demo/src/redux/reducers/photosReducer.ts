import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {fetchPhotos} from '../actions/async/fetchPhotos';

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
  },
});

export const {setPhotos} = photosSlice.actions;
export default photosSlice.reducer;
