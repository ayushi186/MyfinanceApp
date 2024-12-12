import jsondata from "@/app/data.json";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../components/LoaderProvider";
import { trace } from "console";

type IBudgets = {
    username: string | undefined;
    category: string;
    maximum: number;
    theme: string;
  };

 
  
 
export const useTransactions = (select?: any) => useQuery({
    queryKey: ["transactions"],
    queryFn: () => jsondata?.transactions,
    staleTime: Infinity,
    refetchOnMount : false,
    select,
    
  }); 

  export const useRecurringTransactions = () => {
    
    return useTransactions(<trans>(data: trans[]) => data.filter((item : any) =>  item?.recurring === true))
  }

  export const useTotalSumRecTrans = () => {
    return useTransactions(<trans>(data: trans[]) => data.filter((item : any) =>  item?.recurring === true).map((item : any) => item?.amount).reduce((prev, curr) => prev + curr, 0))

  }

  
export const useUserId = () => useQuery({
  queryKey: ["user"],
  queryFn: () =>
    fetch("/api/users/me")
      .then((res) => res?.json())
      .then((promise) => promise.data.username),
  staleTime: Infinity,
});

  export const useBudget = () => useQuery({
    queryKey: ["budget"],
    queryFn: () => axios.get("/api/budgets/getbudget").then((res) => res?.data.data),
    staleTime: 100,
   })

  
   export const usePots = (budget : IBudgets) => useQuery({
    queryKey: ["pots"],
    queryFn: () => axios
    .get("/api/pots/getPots")
    .then((res) => (res?.data?.data)),
    enabled : !!budget,
   })

   export const useLoader = ()=>{
    const context = useContext(LoaderContext);
      if (!context) {
        throw new Error("useLoader must be used within a LoaderProviderContext");
      }
      return context;
  }
  

  