import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Platform, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton.js";
import Colors from "../../constants/Colors.js";
import * as userActions from "../../store/actions/user.js";

const LogInScreen = (props) => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isAuthenticated = user.isAuthenticated;
  const { navigate } = props.navigation;

  const TryToLogin = () => {
    dispatch(userActions.TryToLogin(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("UserProfile");
    }
  });

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        placeholder="Login"
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        secureTextEntry={true}
      ></TextInput>
      <Button color={Colors.accent} title="Log In" onPress={TryToLogin} />
    </View>
  );
};

LogInScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Log In",
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
  input: {
    height: 40,
    margin: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LogInScreen;
