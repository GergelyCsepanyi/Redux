import React, {useState} from 'react';
import {View} from 'react-native';
import {ListRenderItemInfo} from 'react-native/types';
import {PhotoModel} from '../../redux/reducers/photosReducer';
import {useAppDispatch} from '../../hooks/customReduxHooks';
import {unlikePhoto} from '../../redux/actions/async/unlikePhoto';
import {likePhoto} from '../../redux/actions/async/likePhoto';
import ImageCell from '../ImageCell';
import styles from './styles';

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
    <View style={styles.imageContainerStyle}>
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

export default RenderItem;
