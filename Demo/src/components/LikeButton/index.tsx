import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onToggleLike: () => void;
  imageId: string;
}

const LikeButton: React.FC<LikeButtonProps> = (props: LikeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onToggleLike();
      }}
      style={styles.mainContainerStyle}>
      <Image
        source={require('../../assets/images/like.jpeg')}
        style={styles.imageStyle}
      />
      <Text
        style={[styles.textStyle, props.isLiked ? styles.likedTextStyle : {}]}>
        {props.likesCount}
      </Text>
    </TouchableOpacity>
  );
};

export default LikeButton;
