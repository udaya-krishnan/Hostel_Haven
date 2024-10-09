// Selector file: authSelectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectHostAuthState = (state) => state.hostauth || { hostToken: null, host: null };


export const selectHost = createSelector(
    selectHostAuthState,
    (hostAuth) => hostAuth.host
);
