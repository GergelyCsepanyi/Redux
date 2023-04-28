import {API_ACCESSTOKEN} from '@env';
import {RequestType, request} from './apiManager';
import Constants from '../assets/Constants';

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
  likePhoto(id: string): Promise<{photo: T}>;
  unlikePhoto(id: string): Promise<{photo: T}>;
  searchPhotos(query: string, orderBy: string): Promise<{results: T[]}>;
}

class ImageApi<T> implements ImageApiInterface<T> {
  async fetchPhotos(
    page: number = Constants.INITIAL_IMAGE_PAGENUMBER,
    orderBy: string = Constants.DEFAULT_PHOTO_ORDER,
  ): Promise<T[]> {
    return request<Array<T>>(RequestType.fetchPhotos, {
      token: ACCESS_TOKEN,
      urlParams: {page, order_by: orderBy},
    });
  }

  async likePhoto(id: string): Promise<{photo: T}> {
    return request<{photo: T}>(RequestType.likePhoto, {
      token: ACCESS_TOKEN,
      params: [`${id}/`],
    });
  }

  async unlikePhoto(id: string): Promise<{photo: T}> {
    return request<{photo: T}>(RequestType.unlikePhoto, {
      token: ACCESS_TOKEN,
      params: [`${id}/`],
    });
  }

  async searchPhotos(
    query: string,
    orderBy: string = Constants.DEFAULT_PHOTO_ORDER,
    page: number = Constants.INITIAL_IMAGE_PAGENUMBER,
  ): Promise<{results: T[]}> {
    return request<{results: T[]}>(RequestType.searchPhotos, {
      token: ACCESS_TOKEN,
      urlParams: {query, page, order_by: orderBy},
    });
  }
}

export const imageApi = new ImageApi<PhotoDataResponse>();
