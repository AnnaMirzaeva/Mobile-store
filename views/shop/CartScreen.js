import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import Colors from "../../constants/Colors.js";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem.js";
import * as cartActions from "../../store/actions/cart.js";
import * as ordersActions from "../../store/actions/orders.js";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const CartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={CartItems.length === 0}
          onPress={() => {
            dispatch(ordersActions.addOrder(CartItems, cartTotalAmount));
          }}
        />
      </View>
      <FlatList
        data={CartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    textShadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
