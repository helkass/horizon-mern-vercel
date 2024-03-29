import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cartItems:
      typeof window !== "undefined"
         ? localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : []
         : [],
   cartTotalQuantity: 0,
   cartTotalAmount: 0,
   alert: {
      status: false,
      message: "",
   },
};

export const CartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      add(state, action) {
         const itemIndex = state.cartItems.findIndex(
            (item) => item._id === action.payload._id
         );
         // check if in cart exist the product
         if (itemIndex >= 0) {
            state.cartItems[itemIndex] = {
               ...state.cartItems[itemIndex],
               cartQuantity: state.cartItems[itemIndex].cartQuantity + 1,
            };
         } else {
            const tempProduct = { ...action.payload, cartQuantity: 1 };
            state.cartItems.push(tempProduct);
         }

         state.alert = {
            status: true,
            message: `${action.payload.title} add to cart!`,
         };

         // set total amount all cart items
         state.cartTotalAmount += state.cartItems.map(
            (item) => item.cartQuantity * item.price
         );
         // myCart.push(JSON.stringify(action.payload));
         localStorage.setItem(
            "cart",
            JSON.stringify(state.cartItems, state.cartTotalAmount)
         );
      },
      removeAlert(state) {
         state.alert.status = false;
      },
      remove(state, action) {
         const nextCart = state.cartItems.filter(
            (item) => item._id !== action.payload
         );
         state.cartItems = nextCart;
         localStorage.setItem("cart", JSON.stringify(state.cartItems));
      },
      decreaseCart(state, action) {
         // find the index specifiec for action
         const itemIndex = state.cartItems.findIndex(
            (item) => item._id === action.payload._id
         );

         if (state.cartItems[itemIndex].cartQuantity > 1) {
            state.cartItems[itemIndex].cartQuantity -= 1;
         } else if (state.cartItems[itemIndex].cartQuantity === 1) {
            // remove
            const nextCartItems = state.cartItems.filter(
               (item) => item._id !== action.payload._id
            );

            state.cartItems = nextCartItems;
         }

         localStorage.setItem("cart", JSON.stringify(state.cartItems));
      },
      getTotals(state) {
         let { total, quantity } = state.cartItems.reduce(
            (cartTotal, cartItem) => {
               const { price, cartQuantity } = cartItem;
               const itemTotal = price * cartQuantity;

               cartTotal.total += itemTotal;
               cartTotal.quantity += cartQuantity;

               return cartTotal;
            },
            {
               total: 0,
               quantity: 0,
            }
         );
         state.cartTotalQuantity = quantity;
         state.cartTotalAmount = total;
      },
      removeCarts(state) {
         state.cartItems = [];
         localStorage.removeItem("cart");
      },
   },
});

export const {
   add,
   remove,
   decreaseCart,
   getTotals,
   removeCarts,
   removeAlert,
} = CartSlice.actions;

export default CartSlice.reducer;
