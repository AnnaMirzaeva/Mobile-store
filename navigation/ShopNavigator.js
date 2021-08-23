import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../views/shop/ProductsOverviewScreen.js";
import ProductDetailScreen from "../views/shop/ProductDetailScreen.js";
import CartScreen from "../views/shop/CartScreen.js";
import OrdersScreen from "../views/shop/OrdersScreen.js";
import Colors from "../constants/Colors.js";
import LogInScreen from "../views/user/LogInScreen.js";
import UserProfileScreen from "../views/user/UserProfileScreen.js";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "OpenSans_300Light",
  },
  headerBackTitleStyle: {
    fontFamily: "OpenSans_300Light",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ProfileNavigator = createStackNavigator(
  {
    UserProfile: UserProfileScreen,
    Login: LogInScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="person-circle-outline"
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    "My Profile": ProfileNavigator,
  },
  {
    contentOptions: {
      itemsContainerStyle: {
        marginVertical: 20,
      },

      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
