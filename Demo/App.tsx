import React from 'react';
import ImageScreen from './src/screens/ImageScreen';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: React.FC<{}> = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ImageScreen />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
