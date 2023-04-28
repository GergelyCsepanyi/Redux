import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  mainContainerStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    width: '10%',
  },
  imageStyle: {
    height: 40,
    width: 40,
  },
  textStyle: {
    alignSelf: 'center',
    color: Colors.black,
    fontWeight: '400',
  },
  likedTextStyle: {
    fontWeight: 'bold',
  },
});

export default styles;
