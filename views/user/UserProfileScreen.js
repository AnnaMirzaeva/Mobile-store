import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Platform, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton.js";
import Colors from "../../constants/Colors.js";
import { userInformation } from "../../models/userInformation.js";
import * as userActions from "../../store/actions/user.js";

const UserProfileScreen = (props) => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user.isAuthenticated;
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.Logout());
  }

  const renderView = () => {
    return (
      <View style={styles.userProfileInfo}>
        <View style={styles.userProfileLogin}>
          <Image
            style={styles.loginImage}
            source={require("./../../assets/profile.png")}
          />
          <Text style={styles.userLogin}>{user.userInformation.login}</Text>
        </View>
        <Text style={styles.userEmail}>{user.userInformation.email}</Text>
        <Text style={styles.userFirstName}>
          {user.userInformation.firstName}
        </Text>
        <Text style={styles.userLastName}>{user.userInformation.lastName}</Text>
        <Text style={styles.userAddress}>{user.userInformation.address}</Text>
        <View style={styles.logOutButton}>
          <Button 
            color={Colors.accent} 
            title="Log Out"
            onPress={logout} 
        />
        </View>
      </View>
    );
  };

  if (isAuthenticated) {
    return renderView();
  } else {
    return props.navigation.navigate("Login");
  }
};

UserProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "User Profile",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  userProfileInfo: {
    padding: 15,
    justifyContent: "center",
  },
  userProfileLogin: {
    padding: 30,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginImage: {
    height: 50,
    width: 50,
    marginRight: 15,
  },
  userLogin: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
    color: Colors.primary,
  },
  userEmail: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "#888",
  },
  userFirstName: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "#888",
  },
  userLastName: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "#888",
  },
  userAddress: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "#888",
  },
  logOutButton: {
    padding: 30,
  },
});

export default UserProfileScreen;
