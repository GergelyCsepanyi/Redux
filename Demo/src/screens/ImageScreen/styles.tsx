import {StyleSheet} from 'react-native';

const ImageScreenStyles = StyleSheet.create({
  additionalViewStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 0,
    paddingTop: 30,
    paddingBottom: 50,
  },
  flatListStyle: {
    flex: 1,
    width: '100%',
  },
  imageContainerStyle: {
    width: '100%',
  },
  emptyContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchbarContainerStyle: {
    width: '100%',
    height: 35,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
  },
  searchbarInputContainerStyle: {
    height: 35,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  searchbarInputStyle: {
    height: 35,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
});

export default ImageScreenStyles;
