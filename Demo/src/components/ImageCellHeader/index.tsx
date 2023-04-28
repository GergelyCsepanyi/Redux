import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import {Queue} from 'react-native-spacing-system';

export type ImageCellHeaderProps = {
  profileUrl?: string;
  authorName?: string;
};

const ImageCellHeader: React.FC<ImageCellHeaderProps> = (
  props: ImageCellHeaderProps,
) => {
  return (
    <View style={styles.headerContainerStyle}>
      <Image
        style={styles.profileImageStyle}
        source={
          props.authorName
            ? {uri: props.profileUrl}
            : require('../../assets/images/profileImagePlaceholder.jpg')
        }
      />
      <Queue size={10} />
      <Text style={styles.nameTextStyle}>
        {props.authorName ?? 'Incognito'}
      </Text>
    </View>
  );
};

export default ImageCellHeader;
