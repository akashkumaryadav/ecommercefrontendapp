import { configureStore, createSlice } from "@reduxjs/toolkit";

// cart reducer
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartcount: 0,
    data: [],
  },
  reducers: {
    addToCart(state, action) {
      //TODO:
    },
    removeFromCart(state, action) {
      //TODO:
    },
    clearCart(state, action) {
      //TODO
    },
  },
});

// Reducer product
const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    categories: [],
    activeCategories: [],
    filteredData: [],
    limit: 9,
  },
  reducers: {
    incrementLimit(state, action) {
      state.limit = state.limit + 3;
    },
    decrementLimit(state, action) {
      state.limit = state.limit - 3;
    },
    fetchAllProductSuccess(state, action) {
      // call the  get Product api
      state.data.length = 0;
      state.data.push(...action.payload.data);
    },
    filterByCategory(state, action) {
      // filter by
      if (state.activeCategories.includes(action.payload)) {
        state.activeCategories.splice(
          state.activeCategories.indexOf(action.payload),
          1
        );
      } else {
        state.activeCategories.push(action.payload);
      }
      if (state.activeCategories.length > 0) {
        const fdata = state.data.filter((item) =>
          state.activeCategories.includes(item.category)
        );
        state.filteredData.length = 0;
        state.filteredData.push(...fdata);
      } else {
        state.filteredData.length = 0;
      }
    },
    fetchAllCategorySuccess(state, action) {
      state.categories.length = 0;
      state.categories.push(...action.payload.categories);
    },
  },
});

export const productActions = productSlice.actions;

// STORE
export default configureStore({
  reducer: { products: productSlice.reducer },
});
