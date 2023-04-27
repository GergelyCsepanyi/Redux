import {createAsyncThunk} from '@reduxjs/toolkit';
import {imageApi} from '../../../services/ImageApi';
import {PhotoModel} from '../../reducers/photosReducer';

export const fetchPhotos = createAsyncThunk<Array<PhotoModel>>(
  'photos/fetchPhotos',
  async (_, thunkApi) => {
    try {
      const response = await imageApi.fetchPhotos();

      return response.map(item => ({
        id: item.id,
        imageUrl: item.urls?.small,
        isLiked: item.liked_by_user,
        profileImageUrl: item.user?.profile_image?.small,
        name: item.user?.name,
        likesCount: item.likes,
      }));
    } catch (error) {
      console.log('fetchPhotos error: ', error);
      return thunkApi.rejectWithValue(error);
    }
  },
);
