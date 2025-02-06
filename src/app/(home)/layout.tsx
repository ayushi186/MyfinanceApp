"use client";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { isMobile } from "react-device-detect";

import toast from "react-hot-toast";
import {
  Overview,
  Transaction,
  Budgets,
  Pots,
  RecurringBills,
  MinimiseNav,
  MaximiseNav,
  Signout,
} from "../components/SVG";
import React, { ReactNode, useState } from "react";
import { useLoader, useUserId } from "../customhooks/hooks";

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
  const { showLoader, hideLoader } = useLoader();
  const { data: username } = useUserId();

  const NavItem = ({ name, path, compName }: IPageType) => {
    return (
      <div>
        <Link
          href={{ pathname: path }}
          onClick={() => {
            showLoader("Loading...");
            setTimeout(() => {
              hideLoader();
            }, 1000);
          }}>
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
    try {
      showLoader("Signing out...");
      await axios.get("/api/users/logout");
    } catch (error: any) {
      hideLoader();
      toast.error(error.message);
    } finally {
      hideLoader();
      router.push("/login");
      toast.success("Successfully loggedout!");
    }
  };
  return (
    <>
      {minimiseMenu === false && !isMobile ? (
        <div className="flex h-[100%]">
          <div className="w-[20%] min-h-screen vertical-navBar first-line:flex-none border-2 border-white-500  bg-black text-white rounded-r-2xl">
            <div className="p-[32px] h-[10%]">
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

              <div className="flex items-center mt-[10rem] pl-5 textpresetBold3 text-grey300">
                <MinimiseNav></MinimiseNav>
                <button
                  onClick={() => {
                    setMinimiseMenu(!minimiseMenu);
                  }}
                  className="p-2 h-100">
                  Minimise menu
                </button>
              </div>
              <div className="flex justify items-center mt-[1rem] pl-5 textpresetBold3">
                <Signout></Signout>
                <button onClick={logout} className="text-grey300 p-2 h-100 ">
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <div className="main-content">
            <div>{children}</div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-[100%]">
            <div className="vertical-navBar flex flex-col w-[100px] border-2 border-white-500  bg-black text-white rounded-r-2xl items-center">
              <div className="p-[32px] h-[10%]">
                <img src="/images/fLogo.svg" alt="finaanceapplogo" />
              </div>
              <div className="flex flex-col items-center justify-between">
                {pages?.map((item: IPageType, idx: number) => (
                  <div className="textpresetBold3" key={idx}>
                    <NavItem
                      path={item.path}
                      compName={item.compName}
                      key={idx}></NavItem>
                  </div>
                ))}
              </div>
              <div>
                <div
                  className="textpresetBold3 pr-5 mt-[10rem] cursor-pointer"
                  onClick={() => {
                    setMinimiseMenu(!minimiseMenu);
                  }}>
                  <MaximiseNav></MaximiseNav>
                </div>
              </div>
              <div
                onClick={logout}
                className="flex justify items-center mt-[1rem] pr-5 textpresetBold3 cursor-pointer">
                <Signout></Signout>
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
