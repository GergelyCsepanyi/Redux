import {createAsyncThunk} from '@reduxjs/toolkit';
import {imageApi} from '../../../services/ImageApi';
import {PhotoModel} from '../../reducers/photosReducer';
import Constants from '../../../assets/Constants';

type FetchPhotosArgType = {
  page?: number;
  orderBy?: string;
  concatResult?: boolean;
};

export const fetchPhotos = createAsyncThunk<
  Array<PhotoModel>,
  FetchPhotosArgType
>(
  'photos/fetchPhotos',
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
      console.log('fetchPhotos error: ', error);
      return thunkApi.rejectWithValue(error);
    }
  },
);
