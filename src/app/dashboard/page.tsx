"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const [data, setData]: any = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      axios
        // .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/dashboard`, {
        .get("http://localhost:5000/v1/dashboard", {
          headers: { token },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch(() => {
          Cookies.remove("token");
          router.push("/login");
        });
    }
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {data.signature}</p>
      <p>{data.message}</p>
    </div>
  );
};

export default Page;
