import {createAsyncThunk} from '@reduxjs/toolkit';
import {imageApi} from '../../../services/ImageApi';
import {PhotoModel} from '../../reducers/photosReducer';

export const unlikePhoto = createAsyncThunk<PhotoModel, string>(
  'photos/unlikePhoto',
  async (id: string, thunkApi) => {
    try {
      const response = await imageApi.unlikePhoto(id);

      return {
        id: response.photo.id,
        imageUrl: response.photo.urls?.small,
        isLiked: response.photo.liked_by_user,
        profileImageUrl: response.photo.user?.profile_image?.small,
        name: response.photo.user?.name,
        likesCount: response.photo.likes,
      };
    } catch (error) {
      console.log('unlikePhoto error: ', error);
      return thunkApi.rejectWithValue(error);
    }
  },
);
