import { createSelector } from "@reduxjs/toolkit";

export const selectAuthState = (state) => state.auth;


export const selectToken = createSelector(
    selectAuthState,
    (auth) => auth.token
  );
  
  export const selectUser = createSelector(
    selectAuthState,
    (auth) => auth.user
  );