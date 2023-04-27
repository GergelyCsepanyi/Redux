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
  likePhoto(id: string): Promise<T>;
  unlikePhoto(id: string): Promise<T>;
}

class ImageApi<T> implements ImageApiInterface<T> {
  async fetchPhotos(page: number = 1): Promise<T[]> {
    return request<Array<T>>(RequestType.fetchPhotos, {
      token: ACCESS_TOKEN,
      urlParams: {page},
    });
  }

  async likePhoto(id: string): Promise<T> {
    return request<T>(RequestType.likePhoto, {
      token: ACCESS_TOKEN,
      params: [`${id}/`],
    });
  }

  async unlikePhoto(id: string): Promise<T> {
    return request<T>(RequestType.unlikePhoto, {
      token: ACCESS_TOKEN,
      params: [`${id}/`],
    });
  }

  async searchPhotos(query: string): Promise<T[]> {
    return request<Array<T>>(RequestType.searchPhotos, {
      token: ACCESS_TOKEN,
      urlParams: {query},
    });
  }
}

export const imageApi = new ImageApi<PhotoDataResponse>();
