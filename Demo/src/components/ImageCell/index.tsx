import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import ImageCellHeader, {ImageCellHeaderProps} from '../ImageCellHeader';
import ImageCellFooter, {ImageCellFooterProps} from '../ImageCellFooter';

export type ImageCellProps = {
  headerProps: ImageCellHeaderProps;
  imageUrl?: string;
};

const screenWidth = Dimensions.get('window').width;
const imageHeight = 300;

const ImageCell: React.FC<ImageCellProps> = (props: ImageCellProps) => {
  return (
    <View>
      <Image
        style={styles.imageStyle}
        resizeMode="contain"
        source={{uri: props.imageUrl}}
      />
    </View>
  );
};

export default ImageCell;

const styles = StyleSheet.create({
  footerContainerStyle: {
    height: 26,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageStyle: {
    height: imageHeight,
    width: screenWidth,
  },
});
