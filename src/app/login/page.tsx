"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoader } from "../customhooks/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const uschema = z.object({
  email: z.string().email().nonempty({ message: "Email is required" }),
  password: z.string().min(4, { message: "Password is required" }),
});

type IuserFormFields = z.infer<typeof uschema>;
const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IuserFormFields>({ resolver: zodResolver(uschema) });

  const { showLoader, hideLoader } = useLoader();

  const onLogin: SubmitHandler<IuserFormFields> = async (data) => {
    showLoader("Signing In..");
    try {
      await axios.post("/api/users/login", data);
      router.push("/profile");
    } catch (error: any) {
      if (error.response.data.error === "Password incorrect") {
        setError("password", {
          message: "incorrect password",
        });
      } else {
        setError("email", {
          message: "user doesn't exist",
        });
      }

      hideLoader();
    } finally {
      hideLoader();
    }
  };

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
          <div className="flex flex-col items-start justify-center  bg-white h-[450px] w-[550px] pl-[50px] rounded-2xl">
            <h1 className="text-left text-gray-900 textpresetBold1 pt-[10px] pb-[60px]">
              Login
            </h1>
            <hr />
            <form onSubmit={handleSubmit(onLogin)} className="w-[100%]">
              <div className=" flex flex-col w-[90%] pb-4">
                <label
                  htmlFor="username"
                  className="text-gray-500 textpresetBold5">
                  Email
                </label>
                <input
                  className="p-2 border border-grey-200 rounded-lg  text-black"
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "email is required",
                  })}
                  // value={user.email}
                  // onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                {errors.email && (
                  <div className="text-red-500 textpresetBold5 mb-4">
                    {errors?.email?.message}
                  </div>
                )}
              </div>
              <div className=" flex flex-col w-[90%] pb-4">
                <label
                  htmlFor="password"
                  className="text-gray-500 textpresetBold5">
                  Password
                </label>
                <input
                  className="p-2 border border-grey-200 rounded-lg  text-black"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  // value={user.password}
                  // onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                {errors.password && (
                  <div className="text-red-500 textpresetBold5 mb-4">
                    {errors?.password?.message}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="textpresetBold4 w-[90%] text-white bg-black p-2 border border-grey-200 rounded-lg mb-4 focus:outline-none focus: border-gray-600">
                Login
              </button>
            </form>
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
