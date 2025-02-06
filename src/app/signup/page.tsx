"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoader } from "../customhooks/hooks";

const userschema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

type IuserFormFields = z.infer<typeof userschema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IuserFormFields>({ resolver: zodResolver(userschema) });
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  const onhandleSubmit: SubmitHandler<IuserFormFields> = async (data) => {
    try {
      showLoader("Singup in process");
      await axios.post("/api/users/signup", data);
      router.push("/login");
    } catch (error: any) {
      setError("email", {
        message: "this email is already taken use another email",
      });

      hideLoader();
    } finally {
      showLoader("Singup done redirecting to login page");
      hideLoader();
    }
  };

  return (
    <>
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
          <form onSubmit={handleSubmit(onhandleSubmit)}>
            <div className="flex flex-col items-start justify-center  bg-white h-[550px] w-[550px] pl-[50px] rounded-2xl">
              <h1 className="text-left text-gray-900 textpresetBold1 pt-[10px] pb-[60px]">
                {isSubmitting ? "Processing" : "Sign up"}
              </h1>
              <hr />

              <div className=" flex flex-col w-[90%] pb-4">
                <label
                  htmlFor="username"
                  className="text-gray-500 textpresetBold5">
                  Name
                </label>
                <input
                  {...register("username", {
                    required: "username is required",
                  })}
                  className="p-2 border border-grey-200 rounded-lg  text-black"
                  type="text"
                  id="username"
                />
                {errors.username && (
                  <div className="text-red-500 textpresetBold5 mb-4">
                    {errors.username.message}
                  </div>
                )}
              </div>
              <div className=" flex flex-col w-[90%] pb-4">
                <label
                  htmlFor="username"
                  className="text-gray-500 textpresetBold5">
                  Email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className="p-2 border border-grey-200 rounded-lg  text-black"
                  type="text"
                  id="email"
                />
                {errors.email && (
                  <div className="text-red-500 textpresetBold5  mb-4">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className=" flex flex-col w-[90%] pb-4">
                <label
                  htmlFor="username"
                  className="text-gray-500 textpresetBold5 ">
                  Create Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="p-2 border border-grey-200 rounded-lg  text-black"
                  type="password"
                  id="password"
                />
                {errors.password && (
                  <div className="text-red-500 textpresetBold5 mb-4">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="textpresetBold4 w-[90%] text-white bg-black p-2 border border-grey-200 rounded-lg mb-4 focus:outline-none focus: border-gray-600">
                Create Account
              </button>
              <div className="flex mt-[30px] justify-center align-middle items-center w-[100%] textpresetRegular1">
                <p className="text-gray-500 pr-[10px]">
                  Already have an account?
                </p>
                <Link href="login" className="underline">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
