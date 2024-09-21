import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accommodationType: '',
  selectedProperty: {},
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setAccommodationType: (state, action) => {
      state.accommodationType = action.payload;
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
  },
});

export const { setAccommodationType, setSelectedProperty } = propertySlice.actions;

export default propertySlice.reducer;
