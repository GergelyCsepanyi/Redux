import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  titleContainerStyle: {
    paddingBottom: 10,
  },
  titleStyle: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  searchbarAndDropdownContainer: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  searchbarContainer: {
    width: '65%',
    paddingStart: 15,
    justifyContent: 'center',
  },
  dropdownContainer: {
    width: '35%',
    justifyContent: 'center',
  },
  childrenContainerStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 0,
    paddingTop: 5,
    paddingBottom: 50,
  },
});

export default styles;
