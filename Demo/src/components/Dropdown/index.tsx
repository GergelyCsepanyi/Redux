import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import Colors from '../../themes/Colors';

type DropdownComponentProps = {
  data: DropdownDataFields[];
  handleDropdownChange(value: DropdownDataFields): void;
  value: string;
  label: string;
};

export type DropdownDataFields = {
  label: string;
  value: string;
};

const DropdownComponent = (props: DropdownComponentProps) => {
  const [value, setValue] = useState(props.value);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: Colors.blue}]}>
          {props.label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: Colors.blue}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          props.handleDropdownChange(item);
          setIsFocus(false);
          setValue(item.value);
        }}
      />
    </View>
  );
};

export default DropdownComponent;
