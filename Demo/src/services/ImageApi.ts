import {API_ACCESSTOKEN} from '@env';
import {RequestType, request} from './apiManager';

const ACCESS_TOKEN = API_ACCESSTOKEN;

export type PhotoDataResponse = {
  id: string;
  liked_by_user: boolean;
  likes: number;
  user?: {name: string; profile_image?: {small?: string}};
  urls?: {small: string};
};

export type PhotoLikeResponse<T> = {
  photo: T;
};

export interface ImageApiInterface<T> {
  fetchPhotos(): Promise<Array<T>>;
}

class ImageApi<T> implements ImageApiInterface<T> {
  async fetchPhotos(): Promise<Array<T>> {
    return request<Array<T>>(RequestType.fetchPhotos, {
      token: ACCESS_TOKEN,
    });
  }

  // async fetchPhotos(page: number = 1): Promise<T[]> {
  //   return request<Array<T>>(RequestType.fetchPhotos, {
  //     token: ACCESS_TOKEN,
  //     urlParams: {page},
  //   });
  // }
}

export const imageApi = new ImageApi<PhotoDataResponse>();
