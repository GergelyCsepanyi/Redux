import React, {useCallback, useEffect, useState} from 'react';
import {ListRenderItemInfo} from 'react-native/types';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  ImageApi,
  ImageApiInterface,
  PhotoDataResponse,
} from '../../services/ImageApi';
import ImageScreenStyles from './styles';
import ImageCell from '../../components/ImageCell';
import {Stack} from 'react-native-spacing-system';
import BackgroundForm from '../../components/BackgroundForm';
import {PhotoModel, setPhotos} from '../../redux/reducers/photosReducer';
import {useAppDispatch, useAppSelector} from '../../hooks/customReduxHooks';
import {fetchPhotos} from '../../redux/actions/async/fetchPhotos';
import {imageApi} from '../../services/ImageApi';

export interface ImageScreenState {
  images: Array<PhotoModel>;
  imageApi: ImageApiInterface<PhotoDataResponse>;
}

const ImageScreen: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(state => state.photos.items);

  useEffect(() => {
    dispatch(fetchPhotos());
    console.log('photos:');
  }, [dispatch]);

  const renderItem = (itemInfo: ListRenderItemInfo<PhotoModel>) => {
    const {item} = itemInfo;

    return (
      <View style={ImageScreenStyles.imageContainerStyle}>
        <ImageCell
          imageUrl={item.imageUrl}
          headerProps={{
            authorName: item.name,
            profileUrl: item.profileImageUrl,
          }}
        />
      </View>
    );
  };

  const ListEmptyComponent = (
    <View style={ImageScreenStyles.emptyContainerStyle}>
      <Text style={ImageScreenStyles.emptyTextStyle}>No images yet</Text>
    </View>
  );

  const ItemSeparatorComponent = () => <Stack size={20} />;

  return (
    <BackgroundForm
      additionalViewStyle={ImageScreenStyles.additionalViewStyle}
      backgroundColor="darkslategrey"
      headerProps={{title: 'Images'}}>
      <FlatList<PhotoModel>
        keyExtractor={(_, index) => String(index)}
        style={ImageScreenStyles.flatListStyle}
        data={photos}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </BackgroundForm>
  );
};

export default ImageScreen;
