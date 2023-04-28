import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  Text,
} from 'react-native';
import styles from './styles';

interface BackgroundFormProps {
  children: React.ReactNode;
  backgroundColor: string;
  headerProps: {title: string};
  searchbar: JSX.Element;
  dropdown: JSX.Element;

  additionalViewStyle?: StyleProp<ViewStyle>;
}

const BackgroundForm = (props: BackgroundFormProps) => {
  return (
    <SafeAreaView
      style={[
        styles.mainContainerStyle,
        {backgroundColor: props.backgroundColor},
      ]}>
      <View>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.titleStyle}>{props.headerProps.title}</Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.childrenContainerStyle]}>
            <View style={styles.searchbarAndDropdownContainer}>
              <View style={styles.searchbarContainer}>{props.searchbar}</View>
              <View style={styles.dropdownContainer}>{props.dropdown}</View>
            </View>
            {props.children}
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default BackgroundForm;
