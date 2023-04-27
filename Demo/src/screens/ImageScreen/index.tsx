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
import {SearchBar} from '@rneui/base';
import {searchPhotos} from '../../redux/actions/async/searchPhotos';
import DropdownComponent, {DropdownData} from '../../components/Dropdown';
import {fetchMorePhotos} from '../../redux/actions/async/fetchMorePhotos';

export interface ImageScreenState {
  images: Array<PhotoModel>;
  imageApi: ImageApiInterface<PhotoDataResponse>;
}

const dropdownDataList: DropdownData[] = [
  {label: 'Latest', value: 'latest'},
  {label: 'Oldest', value: 'oldest'},
  {label: 'Popular', value: 'popular'},
];

const initialImagePageNumber = 1;

const RenderItem = (props: {
  itemInfo: ListRenderItemInfo<PhotoModel>;
  images: PhotoModel[];
}) => {
  const {item} = props.itemInfo;

  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [likesCount, setLikesCount] = useState(item.likesCount);
  const dispatch = useAppDispatch();

  const onToggleLike = () => {
    if (isLiked) {
      // TODO: in this way, it is slower but it will only update the states if the server process our request
      dispatch(unlikePhoto(item.id)).then(res => {
        if ((res?.payload as PhotoModel).id === item.id) {
          setLikesCount(currentLikesState => --currentLikesState);
          setIsLiked(false);
        }
      });
    } else {
      // TODO: it is faster
      dispatch(likePhoto(item.id));
      setLikesCount(currentLikesState => ++currentLikesState);
      setIsLiked(true);
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
  const [currentPage, setCurrentPage] = useState(initialImagePageNumber);
  const [searchInputValue, setSearchInputValue] = useState('');
  const dispatch = useAppDispatch();
  const photos = useAppSelector(state => state.photos.items);
  const [imagesView, setImagesView] = useState(photos);
  const [orderBy, setOrderBy] = useState(dropdownDataList[0]);

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(initialImagePageNumber);
    dispatch(fetchPhotos(initialImagePageNumber));
  };

  useEffect(() => {
    setImagesView(photos);
    setRefreshing(false);
  }, [photos]);

  // useEffect(() => {
  //   if (searchInputValue === '') {
  //     setImagesView([]);
  //   }
  // }, [searchInputValue]);

  useEffect(() => {
    dispatch(fetchPhotos(initialImagePageNumber));

    setRefreshing(true);
    // .then(() => {
    //   //setImagesView(photos);
    // })
    // .catch(err => console.log('error: ', err));
    // console.log('fetch photos');
    // setImagesView([]);
    // setRefreshing(false);
  }, [dispatch]);

  const fetchMore = () => {
    if (refreshing) {
      return;
    }
    setRefreshing(true);

    const nextPage = currentPage + 1;
    console.log('currentPAge:', currentPage);
    // imageApi.fetchPhotos(nextPage).then(values => {
    //   const newData = formatToPhotoModelArray(values);

    //   setCurrentPage(nextPage);
    //   setRefreshing(false);
    //   setImages(currentData => [...currentData, ...newData]);
    // });

    dispatch(fetchMorePhotos(nextPage));
    setCurrentPage(nextPage);
  };

  const handleStartSearching = () => {
    console.log('start searching');
    setImagesView([]);
  };

  const handleEndSearching = () => {
    console.log('end searching: ', searchInputValue);
    if (searchInputValue !== '') {
      dispatch(searchPhotos(searchInputValue));
      // .then(() =>
      //   setImagesView(photos),
      // );
      setRefreshing(true);
    } else {
      //setImagesView(photos);
      dispatch(fetchPhotos(initialImagePageNumber));
    }
  };

  const handleDropdownChange = (item: DropdownData) => {
    setOrderBy(item);
    console.log('Dropdown changed:', item.value);
    // dispatch with param: order_by=item.value
  };

  return (
    <BackgroundForm
      additionalViewStyle={ImageScreenStyles.additionalViewStyle}
      backgroundColor="darkslategrey"
      headerProps={{title: 'Images'}}>
      {refreshing ? <ActivityIndicator /> : null}
      <SearchBar
        placeholder="Search..."
        onChangeText={setSearchInputValue}
        value={searchInputValue}
        containerStyle={ImageScreenStyles.searchbarContainerStyle}
        inputContainerStyle={ImageScreenStyles.searchbarInputContainerStyle}
        inputStyle={ImageScreenStyles.searchbarInputStyle}
        onEndEditing={handleEndSearching}
        onTouchStart={handleStartSearching}
      />
      <DropdownComponent
        value={dropdownDataList[0].value}
        data={dropdownDataList}
        handleDropdownChange={handleDropdownChange}
      />
      <FlatList
        keyExtractor={(_, index) => String(index)}
        style={ImageScreenStyles.flatListStyle}
        data={imagesView}
        renderItem={itemInfo => (
          <RenderItem itemInfo={itemInfo} images={imagesView} />
        )}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // onEndReached={fetchMore}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd >= 0) {
            console.log('distanceFromEnd:', distanceFromEnd);
            fetchMore();
          }
        }}
        onEndReachedThreshold={1}
        // onEndReachedThreshold={0.1}
      />
    </BackgroundForm>
  );
};

export default ImageScreen;
