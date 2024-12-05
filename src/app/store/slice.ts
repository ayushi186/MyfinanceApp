"use client";
import { createSlice } from '@reduxjs/toolkit'
import data from "@/app/data.json";

 
const allTRansactions = data?.transactions

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions : allTRansactions
  },
  reducers: {
  
  }
})

// Action creators are generated for each case reducer function
export const { } = transactionSlice.actions

export default transactionSlice.reducer