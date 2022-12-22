import React from "react";
import RootRouter from "./src/navigation/navigation";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  if (__DEV__) {
    import("./src/utils/ReactotronConfig.js").then(() =>
      console.log("Reactotron Configured")
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootRouter />
      </PersistGate>
    </Provider>
  );
};

export default App;
