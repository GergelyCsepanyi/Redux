import {createAsyncThunk} from '@reduxjs/toolkit';
import {imageApi} from '../../../services/ImageApi';
import {PhotoModel} from '../../reducers/photosReducer';

export const fetchMorePhotos = createAsyncThunk<Array<PhotoModel>, number>(
  'photos/fetchMorePhotos',
  async (page: number = 1, thunkApi) => {
    try {
      const response = await imageApi.fetchPhotos(page);

      return response.map(item => ({
        id: item.id,
        imageUrl: item.urls?.small,
        isLiked: item.liked_by_user,
        profileImageUrl: item.user?.profile_image?.small,
        name: item.user?.name,
        likesCount: item.likes,
      }));
    } catch (error) {
      console.log('fetchMorePhotos error: ', error);
      return thunkApi.rejectWithValue(error);
    }
  },
);
