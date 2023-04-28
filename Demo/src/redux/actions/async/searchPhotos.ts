import {createAsyncThunk} from '@reduxjs/toolkit';
import {imageApi} from '../../../services/ImageApi';
import {PhotoModel} from '../../reducers/photosReducer';
import {DEFAULT_PHOTO_ORDER} from '../../../assets/Constants';

type SearchPhotosArgType = {
  query: string;
  orderBy?: string;
};

export const searchPhotos = createAsyncThunk<
  Array<PhotoModel>,
  SearchPhotosArgType
>(
  'photos/searchPhotos',
  async ({query, orderBy = DEFAULT_PHOTO_ORDER}, thunkApi) => {
    try {
      const response = await imageApi.searchPhotos(query, orderBy);

      return response.results.map(item => ({
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
