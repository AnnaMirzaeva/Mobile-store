import React, { useEffect, useState } from "react";
import { FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton.js";

import ProductItem from "../../components/shop/ProductItem.js";
import * as cartActions from "../../store/actions/cart.js";

import { SearchBar } from "react-native-elements";
import { View } from "react-native";
import Colors from "../../constants/Colors.js";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const [renderedProducts, updateRenderedProducts] = useState(products);
  const dispatch = useDispatch();

  const [isSearchHidden, updateSearchHidden] = useState(false);
  const [searchValue, updateSearchValue] = useState("");
  const navigation = props.navigation;

  useEffect(() => {
    navigation.setParams({
      isSearchHidden: isSearchHidden,
      updateSearchHidden: updateSearchStyle,
    });
  }, [isSearchHidden]);

  const updateSearchStyle = (option) => {
    updateSearchHidden(option);
  };

  const searchItem = (searchText) => {
    updateSearchValue(searchText);
    updateRenderedProducts(
      products.filter((i) => i.title.includes(searchText))
    );
  };

  const renderSearch = () => {
    return (
      <SearchBar
        containerStyle={{ backgroundColor: "white" }}
        placeholderTextColor={Colors.primary}
        platform={Platform.OS}
        placeholder="Type here to search"
        onChangeText={(searchText) => searchItem(searchText)}
        value={searchValue}
      />
    );
  };

  return (
    <View>
      {isSearchHidden && renderSearch()}
      <FlatList
        data={renderedProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {
              props.navigation.navigate("ProductDetail", {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              });
            }}
            onAddToCart={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        )}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Search"
          iconName="ios-search"
          onPress={() =>
            params.isSearchHidden
              ? params.updateSearchHidden(false)
              : params.updateSearchHidden(true)
          }
        />
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
