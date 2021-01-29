import { configureStore, createSlice } from "@reduxjs/toolkit";

//ACTIONS and ACTION TYPES

// Reducers
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
    filterAll(state, action) {
      state.filteredData.length = 0;
      state.filteredData.push(state.data);
    },
    filterByCategory(state, action) {
      // filter by category
      if (state.activeCategories.includes(action.payload.category)) {
        state.activeCategories.splice(
          state.activeCategories.indexOf(action.payload.category),
          1
        );
      } else {
        state.activeCategories.push(action.payload.category);
      }
      const fdata = state.data.filter((item) =>
        state.activeCategories.includes(item.category)
      );
      state.filteredData.push(...fdata);
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
