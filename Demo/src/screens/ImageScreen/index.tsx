import React, {useEffect, useState} from 'react';
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
import {useAppDispatch, useAppSelector} from '../../hooks/customReduxHooks';
import {fetchPhotos} from '../../redux/actions/async/fetchPhotos';
import {likePhoto} from '../../redux/actions/async/likePhoto';
import {unlikePhoto} from '../../redux/actions/async/unlikePhoto';
import {searchPhotos} from '../../redux/actions/async/searchPhotos';
import DropdownComponent, {DropdownDataFields} from '../../components/Dropdown';
import {fetchMorePhotos} from '../../redux/actions/async/fetchMorePhotos';
import {
  DEFAULT_PHOTO_ORDER,
  DropdownDataValue,
  INITIAL_IMAGE_PAGENUMBER,
} from '../../assets/constants';
import SearchBarComponent from '../../components/Searchbar';

export interface ImageScreenState {
  images: Array<PhotoModel>;
  imageApi: ImageApiInterface<PhotoDataResponse>;
}

const dropdownDataList: DropdownDataFields[] = [
  {label: 'Latest', value: DropdownDataValue.latest},
  {label: 'Oldest', value: DropdownDataValue.oldest},
  {label: 'Popular', value: DropdownDataValue.popular},
];

const RenderItem = (props: {
  itemInfo: ListRenderItemInfo<PhotoModel>;
  images: PhotoModel[];
}) => {
  const dispatch = useAppDispatch();
  const {item} = props.itemInfo;
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [likesCount, setLikesCount] = useState(item.likesCount);

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
  const dispatch = useAppDispatch();
  const photos = useAppSelector(state => state.photos.items);
  const [refreshing, setRefreshing] = useState(true);
  const [currentPage, setCurrentPage] = useState(INITIAL_IMAGE_PAGENUMBER);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [imagesView, setImagesView] = useState(photos);
  const [orderBy, setOrderBy] = useState(DEFAULT_PHOTO_ORDER as string);

  useEffect(() => {
    dispatch(fetchPhotos({}));
    setRefreshing(true);
  }, [dispatch]);

  useEffect(() => {
    setImagesView(photos);
    setRefreshing(false);
  }, [photos]);

  const onRefresh = () => {
    setRefreshing(true);
    setSearchInputValue('');
    setCurrentPage(INITIAL_IMAGE_PAGENUMBER);
    dispatch(fetchPhotos({orderBy}));
  };

  const fetchMore = () => {
    if (refreshing) {
      return;
    }

    const nextPage = currentPage + 1;
    console.log('currentPAge:', currentPage);

    setRefreshing(true);
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
      dispatch(searchPhotos({query: searchInputValue, orderBy}));
      setRefreshing(true);
    } else {
      dispatch(fetchPhotos({orderBy}));
    }
  };

  const handleDropdownChange = (item: DropdownDataFields) => {
    if (item.value !== orderBy) {
      console.log('Dropdown changed:', item.value);
      setOrderBy(item.value);
      if (searchInputValue !== '') {
        dispatch(searchPhotos({query: searchInputValue, orderBy: item.value}));
      } else {
        dispatch(fetchPhotos({orderBy: item.value}));
      }
    }
  };

  const handleCancel = () => {
    setSearchInputValue('');
    handleEndSearching();
  };

  const handleClear = () => {
    setSearchInputValue('');
    handleStartSearching();
  };

  const renderSearchbar = () => {
    return SearchBarComponent({
      placeholder: 'Search...',
      value: searchInputValue,
      onChangeText: setSearchInputValue,
      onEndEditing: handleEndSearching,
      onTouchStart: handleStartSearching,
      onClear: handleClear,
      onCancel: handleCancel,
    });
  };

  const renderDropdown = () => {
    return DropdownComponent({
      data: dropdownDataList,
      handleDropdownChange,
      label: 'Sort by',
      value: dropdownDataList[0].value,
    });
  };

  return (
    <BackgroundForm
      additionalViewStyle={ImageScreenStyles.additionalViewStyle}
      backgroundColor="darkslategrey"
      headerProps={{title: 'Images'}}
      searchbar={renderSearchbar()}
      dropdown={renderDropdown()}>
      {refreshing ? <ActivityIndicator /> : null}
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
        // onEndReached={({distanceFromEnd}) => {
        //   if (distanceFromEnd >= 0) {
        //     console.log('distanceFromEnd:', distanceFromEnd);
        //     fetchMore();
        //   }
        // }}
        // onEndReachedThreshold={0.1}
      />
    </BackgroundForm>
  );
};

export default ImageScreen;
