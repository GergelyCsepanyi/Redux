import React from 'react';
import ImageScreen from './src/screens/ImageScreen';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <ImageScreen />;
    </Provider>
  );
};

export default App;
