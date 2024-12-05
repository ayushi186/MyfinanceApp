"use client";
import axios from "axios";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import logo from "/images/Logo.svg";

import toast from "react-hot-toast";
import {
  Overview,
  Transaction,
  Budgets,
  Pots,
  RecurringBills,
  MinimiseNav,
  SmallImage,
} from "../components/SVG";
import { ReactNode, useEffect, useState } from "react";

type IPageType = {
  name?: string;
  path: string;
  compName: ReactNode;
};

export default function NavBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  // array for all the navbar items //Todo : add the path for budget , pots and recurring bills
  const pages = [
    {
      name: "Overview",
      path: "/profile",
      compName: (
        <Overview fill={pathname === "/profile" ? "#277C78" : "#b3b3b3"} />
      ),
    },
    {
      name: "Transaction",
      path: "/transactions",
      compName: (
        <Transaction
          fill={
            pathname === "/transactions" ? "#277C78" : "#b3b3b3"
          }></Transaction>
      ),
    },
    {
      name: "Budgets",
      path: "/budgets",
      compName: (
        <Budgets
          fill={pathname === "/budgets" ? "#277C78" : "#b3b3b3"}></Budgets>
      ),
    },
    {
      name: "Pots",
      path: "/pots",
      compName: (
        <Pots fill={pathname === "/pots" ? "#277C78" : "#b3b3b3"}></Pots>
      ),
    },
    {
      name: "Recurring Bills",
      path: "/reccuringbills",
      compName: (
        <RecurringBills
          fill={
            pathname === "/reccuringbills" ? "#277C78" : "#b3b3b3"
          }></RecurringBills>
      ),
    },
  ];

  const NavItem = ({ name, path, compName }: IPageType) => {
    return (
      <div>
        <Link href={{ pathname: path }}>
          <div
            className={
              (pathname === path ? "active" : "text-grey300") + " flex p-5"
            }>
            {compName}
            <span className="pl-5">{name}</span>
          </div>
        </Link>
      </div>
    );
  };

  const [minimiseMenu, setMinimiseMenu] = useState<boolean>(false);
  const logout = async () => {
    debugger;
    try {
      const res = await axios.get("/api/users/logout");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      router.push("/login");
      toast.success("Successfully loggedout!");
    }
  };
  return (
    <>
      {minimiseMenu === false ? (
        <div className="flex ">
          <div className=" w-[20%] min-h-screen vertical-navBar first-line:flex-none border-2 border-white-500  bg-black text-white rounded-r-2xl">
            <div className="p-[32px]">
              <img src="/images/Logo.svg" alt="finaanceapplogo" />
            </div>
            <div className="flex flex-col h-full textpresetBold3">
              {/* navbar items here */}
              {pages?.map((item: IPageType, idx: number) => (
                <div className="textpresetBold3" key={idx}>
                  <NavItem
                    name={item.name}
                    path={item.path}
                    compName={item.compName}
                    key={idx}></NavItem>
                </div>
              ))}
              <button
                onClick={logout}
                className="p-2 h-100  border border-grey-200 rounded-lg mb-4 focus:outline-none focus: border-gray-600">
                logout
              </button>
              <div className="flex items-center">
                <MinimiseNav></MinimiseNav>
                <button
                  onClick={() => {
                    debugger;
                    setMinimiseMenu(!minimiseMenu);
                  }}
                  className="p-2 h-100">
                  Minimise menu
                </button>
              </div>
            </div>
          </div>

          <div className=" flex w-[80%]">
            <div className="w-full">{children}</div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex">
            <div className=" vertical-navBar flex-none w-[100px] border-2 border-white-500  bg-black text-white rounded-r-2xl">
              <div className="flex flex-col items-center justify-between">
                {pages?.map((item: IPageType, idx: number) => (
                  <div className="textpresetBold3" key={idx}>
                    <NavItem
                      path={item.path}
                      compName={item.compName}
                      key={idx}></NavItem>
                  </div>
                ))}
                <MinimiseNav></MinimiseNav>

                <button
                  onClick={() => {
                    setMinimiseMenu(!minimiseMenu);
                  }}
                  className="p-2 h-100">
                  Minimise menu
                </button>
              </div>
            </div>
            <div className=" flex w-full">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
