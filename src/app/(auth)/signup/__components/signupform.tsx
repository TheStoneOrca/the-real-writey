import Button from "@/components/button";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import reactsecurestorage from "react-secure-storage";

export default function SignUpForm() {
  const { register, handleSubmit } = useForm();
  const [showingPassword, setIfShowingPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const onSubmit = (data: any) => {
    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((result) => {
        if (!result.status) {
          return;
        }

        switch (result.status) {
          case 200:
            reactsecurestorage.setItem("userToken", result.userToken);
            window.location.href = "/";
            break;
          case 500:
            setError("Internal server error");
            break;
          case 404:
            setError("Unexpected error, try again later.");
            break;
          case 409:
            setError("Username or email already in use.");
            break;
        }
      })
    );
  };
  return (
    <div className="w-64 h-72 flex flex-col border items-center text-center border-black rounded-md">
      <div className="w-64 h-12 flex flex-col items-center text-center rounded-md">
        <h1 className="text-2xl">Sign Up</h1>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
        className="justify-center flex flex-col items-center w-full text-center"
      >
        <div className="flex flex-col gap-y-4">
          <input
            className="border border-white border-b-black rounded-sm"
            type="text"
            placeholder="Username"
            {...register("username")}
            required
          />
          <div className="flex border border-white border-b-black gap-x-0">
            <input
              className=" rounded-sm"
              type={showingPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              required
            />
            <button onClick={() => setIfShowingPassword(!showingPassword)}>
              {showingPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <input
            className="border border-white border-b-black rounded-sm"
            type="email"
            placeholder="Email"
            {...register("email")}
            required
          />
          <Button text="Sign Up" onClick={() => {}} fixed={false} />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
}
