const getCartData = () => {
  const currentCart = localStorage.getItem("cartItems");
  if (currentCart == []) {
    return [];
  } else {
    return JSON.parse(currentCart);
  }
};

const getCartTotal = () => {
  const currentTotal = localStorage.getItem("cartTotal");
  if (currentTotal == []) {
    return [];
  } else {
    return JSON.parse(currentTotal);
  }
};

const VALUE = {
  cartTotal: getCartTotal(),
  cartItems: getCartData(),
  searchStatement: "",
  itemQuant: 1,
  updated:false
};
export default function cartReducer(state = VALUE, action) {
  switch (action.type) {
    case "CHG_CART_TOTAL":
      return {
        ...state,
        cartTotal: state.cartTotal + action.payload,
      };

    case "INC_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((product) =>
          product.id === action.payload
            ? { ...product, quant: product.quant + 1 }
            : product
        ),
      };
    case "INC_ITEM_B_CART":
      return {
        ...state,

        itemQuant: state.itemQuant + 1,
      };

    case "DEC_ITEM":
      if (
        state.cartItems.find((item) => item.id === action.payload).quant == 1
      ) {
        return {
          ...state,

          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload
          ),
          cartTotal:
            state.cartTotal -
            state.cartItems.find((item) => item.id === action.payload).cost,
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product.id === action.payload
              ? {
                  ...product,
                  quant: product.quant - 1,
                  cartTotal: Number(state.cartTotal) - Number(product.cost),
                }
              : product
          ),
          // cartTotal:state.cartTotal-
        };
      }

    case "DEC_ITEM_B_CART":
      if (state.itemQuant > 0) {
        return {
          ...state,
          itemQuant: state.itemQuant - 1,
        };
      }

    case "ZERO_QUANT":
      return {
        ...state,
        itemQuant: 1,
      };

    case "ADD_TO_CART":
      if (
        state.cartItems.filter((item) => item.id === action.payload[0].id)
          .length === 0
      ) {
        action.payload.quant = 1;
        state.cartTotal += action.payload[0].cost * action.payload[1];
        action.payload[0].quant = action.payload[1];
        state.cartItems.push(action.payload[0]);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      } else {
        state.cartItems.find(
          (item) => item.id === action.payload[0].id
        ).quant += action.payload[1];
        state.cartTotal += action.payload[0].cost * action.payload[1];
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }

      return {
        ...state,
        cartItems: state.cartItems,
      };

    case "SEARCH":
      state.searchStatement = action.payload;
      return {
        ...state,
        searchStatement: state.searchStatement,
      };
    // case "UPDATE":
    //     state.cartItems = action.payload[0]
    //     console.log(action.payload)
    //     state.cartTotal= action.payload[1]

    //     return {

    //         ...state,

    //         cartItems: state.cartItems,
    //         cartTotal: state.cartTotal

    //     }
    case "UPDATE":
      state.updated = action.payload;
      return {
        ...state,
        updated: state.updated,
      };

    default:
      return state;
  }
}
