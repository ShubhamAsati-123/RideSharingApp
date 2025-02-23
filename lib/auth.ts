"use server";

import { cookies } from "next/headers";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export async function login(username: string, password: string) {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30,
    }),
  });


    // if (!res.ok) {
    //   const errorData = await res.json();
    //   throw new Error(errorData.message || "Login failed");
    // }

    const data = await res.json();

    // Set the token in cookies
    cookies().set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
    });
    cookies().set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, 
    });

    return data;
}


export async function getCurrentUser() {
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return null;
  }

  const res = await fetch("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}


export async function logout() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
}
