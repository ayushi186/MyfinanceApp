"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import { useLoader } from "../customhooks/hooks";

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const { showLoader, hideLoader } = useLoader();

  const onLogin = async () => {
    showLoader("Signing In..");
    try {
      await axios.post("/api/users/login", user);
      router.push("/profile");
    } catch (error: any) {
      hideLoader();

      toast.error(error.response.data.error);
    } finally {
      hideLoader();
    }
  };
  // const [buttonDisabled, setButtonDisabled] = useState(false);

  // useEffect(() => {
  //   if (user.email.length > 0 && user.password.length > 0) {
  //     setButtonDisabled(false);
  //   } else {
  //     setButtonDisabled(true);
  //   }
  // });
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex justify-between">
        <div className="flex-1 p-[10px] h-max-screen">
          <img
            src="/images/Sidebar.svg"
            alt="sign-in-image"
            className="h-screen"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              height: "100vh",
            }}
          />
        </div>
        <div className="flex justify-center items-center flex-1 p-[50px] ">
          <div className="flex flex-col items-start justify-center  bg-white h-[400px] w-[550px] pl-[50px] rounded-2xl">
            <h1 className="text-left text-gray-900 textpresetBold1 pt-[10px] pb-[60px]">
              Login
            </h1>
            <hr />
            <div className=" flex flex-col w-[90%]">
              <label
                htmlFor="username"
                className="text-gray-500 textpresetBold5">
                Email
              </label>
              <input
                className="p-2 border border-grey-200 rounded-lg mb-4 text-black"
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className=" flex flex-col w-[90%]">
              <label
                htmlFor="username"
                className="text-gray-500 textpresetBold5">
                Password
              </label>
              <input
                className="p-2 border border-grey-200 rounded-lg mb-4 text-black"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <button
              className="textpresetBold4 w-[90%] text-white bg-black p-2 border border-grey-200 rounded-lg mb-4 focus:outline-none focus: border-gray-600"
              onClick={onLogin}>
              Login
            </button>
            <div className="flex mt-[30px] justify-center align-middle items-center w-[100%] textpresetRegular1">
              <p className="text-gray-500">Need to create an account? </p>
              <Link href="/signup" className="underline">
                {" "}
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
