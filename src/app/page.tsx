"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full flex-col justify-center items-center text-center">
      <h1 className="text-6xl absolute left-72 top-32">Writey</h1>
      <p className="text-2xl absolute left-72 top-48">
        The place to write or read about a bunch of things for free!
      </p>
      <div className="flex gap-x-3 absolute left-72 top-[235]">
        <Button
          fixed
          text="Signup"
          onClick={() => {
            router.push("/signup");
          }}
        />
        <Button
          fixed
          text="Signin"
          onClick={() => {
            router.push("/signin");
          }}
        />
      </div>
    </div>
  );
}
