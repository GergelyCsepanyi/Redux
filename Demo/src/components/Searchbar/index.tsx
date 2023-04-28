import React, {useEffect, useState, useRef, RefObject} from 'react';
import {SearchBar} from '@rneui/base';
import {SearchBarBaseProps} from '@rneui/base/dist/SearchBar/types';
import styles from './styles';
import Colors from '../../themes/Colors';
import {TextInput} from 'react-native/types';

type SearchBarComponentProps = {
  placeholder: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  onTouchStart: () => void;
  onEndEditing: () => void;
  onClear: () => void;
  onCancel: () => void;
};

const SearchBarComponent = (props: SearchBarComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const searchBarRef = useRef<
    RefObject<SearchBar> & RefObject<SearchBarBaseProps> & RefObject<TextInput>
  >();

  useEffect(() => {
    if (isFocus) {
      searchBarRef?.current?.focus();
    }
  }, [isFocus]);

  return (
    <SearchBar
      containerStyle={[
        styles.searchbarContainerStyle,
        isFocus && {borderColor: Colors.blue},
      ]}
      inputContainerStyle={styles.searchbarInputContainerStyle}
      inputStyle={styles.searchbarInputStyle}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      value={props.value}
      onEndEditing={props.onEndEditing}
      onTouchStart={props.onTouchStart}
      onClear={() => {
        setIsFocus(true);
        props.onClear();
      }}
      onCancel={props.onCancel}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      ref={searchBarRef}
    />
  );
};

export default SearchBarComponent;
