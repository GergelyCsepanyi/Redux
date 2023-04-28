import {StyleSheet} from 'react-native';

const BackgroundFormStyles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  titleContainerStyle: {
    //flex: 1,
    paddingBottom: 10,
  },
  titleStyle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  childrenContainerStyle: {
    // TODO: remove flex and add //height: '100%',
    //flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 0,
    paddingTop: 30,
    paddingBottom: 50,
    //borderWidth: 8,
  },
});

export default BackgroundFormStyles;
