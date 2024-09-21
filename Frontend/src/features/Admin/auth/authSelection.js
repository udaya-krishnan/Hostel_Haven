import { createSelector } from "@reduxjs/toolkit";

export const selectAdminState=(state)=>state.admin||{adminToken:null}

export const selectAdminToken=createSelector(
    selectAdminState,
    (admin)=>admin.adminToken
)