"use client";

import SocialLogins from "./SocialLogins";

import { doCredentialLogin } from "@/app/actions";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  const handleRegisterClick = () => {
    router.push("/register");
  };
  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form
        className="my-5 flex flex-col items-center border p-3 border-black rounded-md"
        onSubmit={onSubmit}
      >
        <div className="my-2">
          <label className="text-black" htmlFor="email">
            Email Address
          </label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label className="text-black" htmlFor="password">
            Password
          </label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-300 mt-4 rounded flex justify-center items-center w-36"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleRegisterClick}
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
        >
          Register
        </button>
      </form>

      <SocialLogins />
    </>
  );
};

export default LoginForm;
