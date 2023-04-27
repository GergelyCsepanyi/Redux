import React, {useCallback, useEffect, useState} from 'react';
import {ListRenderItemInfo} from 'react-native/types';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {ImageApiInterface, PhotoDataResponse} from '../../services/ImageApi';
import ImageScreenStyles from './styles';
import ImageCell from '../../components/ImageCell';
import {Stack} from 'react-native-spacing-system';
import BackgroundForm from '../../components/BackgroundForm';
import {PhotoModel} from '../../redux/reducers/photosReducer';
import {imageApi} from '../../services/ImageApi';
import {useAppDispatch, useAppSelector} from '../../hooks/customReduxHooks';
import {fetchPhotos} from '../../redux/actions/async/fetchPhotos';
import {likePhoto} from '../../redux/actions/async/likePhoto';
import {unlikePhoto} from '../../redux/actions/async/unlikePhoto';

export interface ImageScreenState {
  images: Array<PhotoModel>;
  imageApi: ImageApiInterface<PhotoDataResponse>;
}

const RenderItem = (props: {
  itemInfo: ListRenderItemInfo<PhotoModel>;
  images: PhotoModel[];
}) => {
  const {item} = props.itemInfo;
  const {images} = props;

  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [likesCount, setLikesCount] = useState(item.likesCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // setIsLiked(item.isLiked);
    // setLikesCount(item.likesCount);
  }, [images, item.isLiked, item.likesCount]);

  const onToggleLike = () => {
    if (item.isLiked) {
      dispatch(unlikePhoto(item.id)).then(res => {
        if ((res?.payload as PhotoModel).id === item.id) {
          //setLikesCount(currentLikesState => --currentLikesState);
          //setIsLiked(false);
        }
      });
    } else {
      dispatch(likePhoto(item.id)).then(res => {
        if ((res?.payload as PhotoModel).id === item.id) {
          //setLikesCount(currentLikesState => ++currentLikesState);
          //setIsLiked(true);
        }
      });
    }
  };

  return (
    <View style={ImageScreenStyles.imageContainerStyle}>
      <ImageCell
        imageUrl={item.imageUrl}
        headerProps={{
          authorName: item.name,
          profileUrl: item.profileImageUrl,
        }}
        footerProps={{
          isLiked,
          likesCount,
          onToggleLike,
          imageId: item.id,
        }}
      />
    </View>
  );
};

const ListEmptyComponent = () => {
  return (
    <View style={ImageScreenStyles.emptyContainerStyle}>
      <Text style={ImageScreenStyles.emptyTextStyle}>No images yet</Text>
    </View>
  );
};

const ItemSeparatorComponent = () => {
  return <Stack size={20} />;
};

const ImageScreen = () => {
  const [refreshing, setRefreshing] = useState(true);
  const isLoading = useAppSelector(state => state.photos.loading);
  // const [images, setImages] = useState([] as PhotoModel[]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const photos = useAppSelector(state => state.photos.items);

  useEffect(() => {
    console.log('images loading?', isLoading);
  }, [isLoading]);

  // const loadPhotos = useCallback((page: number = 1) => {
  //   imageApi
  //     .fetchPhotos(page)
  //     .then(values => {
  //       // setImages(formatToPhotoModelArray(values));
  //       setRefreshing(false);
  //       setCurrentPage(1);
  //     })
  //     .catch(error => console.log('fetch error: ', error));
  // }, []);

  useEffect(() => {
    dispatch(fetchPhotos())
      .then(() => {
        setRefreshing(false);
      })
      .catch(err => console.log('error: ', err));
  }, [dispatch]);

  // const formatToPhotoModelArray = (
  //   values: PhotoDataResponse[],
  // ): PhotoModel[] => {
  //   return values.map(value => ({
  //     id: value.id,
  //     imageUrl: value.urls?.small,
  //     isLiked: value.liked_by_user,
  //     profileImageUrl: value.user?.profile_image?.small,
  //     name: value.user?.name,
  //     likesCount: value.likes,
  //   }));
  // };

  // const fetchMore = () => {
  //   if (refreshing) {
  //     return;
  //   }
  //   setRefreshing(true);

  //   const nextPage = currentPage + 1;

  //   imageApi.fetchPhotos(nextPage).then(values => {
  //     const newData = formatToPhotoModelArray(values);

  //     setCurrentPage(nextPage);
  //     setRefreshing(false);
  //     setImages(currentData => [...currentData, ...newData]);
  //   });
  // };

  return (
    <BackgroundForm
      additionalViewStyle={ImageScreenStyles.additionalViewStyle}
      backgroundColor="darkslategrey"
      headerProps={{title: 'Images'}}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        keyExtractor={(_, index) => String(index)}
        style={ImageScreenStyles.flatListStyle}
        data={photos}
        renderItem={itemInfo => (
          <RenderItem itemInfo={itemInfo} images={photos} />
        )}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={loadPhotos} />
        // }
        // onEndReached={fetchMore}
        // onEndReachedThreshold={0.1}
      />
    </BackgroundForm>
  );
};

export default ImageScreen;
