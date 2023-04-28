import {createAsyncThunk} from '@reduxjs/toolkit';
import {imageApi} from '../../../services/ImageApi';
import {PhotoModel} from '../../reducers/photosReducer';
import Constants from '../../../assets/Constants';

type SearchPhotosArgType = {
  page?: number;
  query: string;
  orderBy?: string;
  concatResult?: boolean;
};

export const searchPhotos = createAsyncThunk<
  Array<PhotoModel>,
  SearchPhotosArgType
>(
  'photos/searchPhotos',
  async ({page, query, orderBy = Constants.DEFAULT_PHOTO_ORDER}, thunkApi) => {
    try {
      const response = await imageApi.searchPhotos(query, orderBy, page);

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
