import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";

import productsReducer from "./store/reducers/initialState.js";
import cartReducer from "./store/reducers/cart.js";
import ordersReducer from "./store/reducers/orders.js";
import userReducer from "./store/reducers/user.js";

import ProductsNavigator from "./navigation/ShopNavigator.js";

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  user: userReducer
});

const store = createStore(rootReducer);

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <ProductsNavigator />
    </Provider>
  );
}
