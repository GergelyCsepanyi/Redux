import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  searchbarContainerStyle: {
    width: '100%',
    height: 45,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: Colors.gray,
    borderWidth: 1,
  },
  searchbarInputContainerStyle: {
    height: 35,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderRadius: 0.1,
    backgroundColor: Colors.white,
  },
  searchbarInputStyle: {
    height: 35,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
});

export default styles;
