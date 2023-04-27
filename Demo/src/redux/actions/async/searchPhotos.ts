import {createAsyncThunk} from '@reduxjs/toolkit';
import {imageApi} from '../../../services/ImageApi';
import {PhotoModel} from '../../reducers/photosReducer';

export const searchPhotos = createAsyncThunk<Array<PhotoModel>, string>(
  'photos/searchPhotos',
  async (query: string, thunkApi) => {
    try {
      const response = await imageApi.searchPhotos(query);

      return response.map(item => ({
        id: item.id,
        imageUrl: item.urls?.small,
        isLiked: item.liked_by_user,
        profileImageUrl: item.user?.profile_image?.small,
        name: item.user?.name,
        likesCount: item.likes,
      }));
    } catch (error) {
      console.log('searchPhotos error: ', error);
      return thunkApi.rejectWithValue(error);
    }
  },
);
