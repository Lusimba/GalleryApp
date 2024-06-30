"use client"

import { useState } from "react";
import { signIn, signOut, useSession } from 'next-auth/react';

const Login: React.FC = () => {
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    const result = await signIn("google", { redirect: false });
    if (result?.error) {
      setError("Login failed");
      setTimeout(() => setError(""), 3000);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-[#212121] min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-white text-2xl mb-4">Sign In</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleSignIn}
        className="bg-[#D927C7] text-white px-6 py-2 rounded"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;