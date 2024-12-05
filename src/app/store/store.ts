"use client";
import { configureStore } from '@reduxjs/toolkit'
import transactionReducer from "./slice"

export default configureStore({
  reducer: {
    transactions : transactionReducer
  }
})