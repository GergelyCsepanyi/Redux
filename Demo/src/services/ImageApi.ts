import {API_ACCESSTOKEN} from '@env';
import {RequestType, request} from './apiManager';
import {
  DEFAULT_PHOTO_ORDER,
  INITIAL_IMAGE_PAGENUMBER,
} from '../assets/constants';

const ACCESS_TOKEN = 'dNOyZuHMQNgn6cG3P8KaGtIPPhiqXk0aDtS4310yhwk';

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
    page: number = INITIAL_IMAGE_PAGENUMBER,
    orderBy: string = DEFAULT_PHOTO_ORDER,
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
    orderBy: string = DEFAULT_PHOTO_ORDER,
  ): Promise<{results: T[]}> {
    console.log(ACCESS_TOKEN);
    return request<{results: T[]}>(RequestType.searchPhotos, {
      token: ACCESS_TOKEN,
      urlParams: {query, order_by: orderBy},
    });
  }
}

export const imageApi = new ImageApi<PhotoDataResponse>();
