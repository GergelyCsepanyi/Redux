import {createAsyncThunk} from '@reduxjs/toolkit';
import {imageApi} from '../../../services/ImageApi';
import {PhotoModel} from '../../reducers/photosReducer';
import Constants from '../../../assets/Constants';

type FetchMorePhotosArgType = {
  page?: number;
  orderBy?: string;
};

export const fetchMorePhotos = createAsyncThunk<
  Array<PhotoModel>,
  FetchMorePhotosArgType
>(
  'photos/fetchMorePhotos',
  async (
    {
      page = Constants.INITIAL_IMAGE_PAGENUMBER,
      orderBy = Constants.DEFAULT_PHOTO_ORDER,
    },
    thunkApi,
  ) => {
    try {
      const response = await imageApi.fetchPhotos(page, orderBy);

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
