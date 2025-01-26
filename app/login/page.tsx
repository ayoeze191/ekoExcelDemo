"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AxiosInstance } from "axios";
import { axiosInstance } from "../axios/axios";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const andlesubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/login", { email, password });
      const token = response.data.data.token;
      localStorage.setItem("authToken", token);
      setIsLoading(false);
      router.push("/");

      toast({
        title: "Success",
        description: "You have successfully logged in.",
      });
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password.",
      });
      console.error("Error during login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  //   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  //     event.preventDefault();
  //     setIsLoading(true);
  //     const formData = new FormData(event.currentTarget);
  //     const email = formData.get("email") as string;
  //     const password = formData.get("password") as string;
  //     const data = {
  //       email,
  //       password,
  //     };
  //     // try {
  //     const response = await axios.post("localhost:3000/login/", data);
  //     console.log(response);
  //     // Assuming the token is returned in the response data
  //     // const token = response.data.token;

  //     // // Store the token in localStorage
  //     // localStorage.setItem("authToken", token);

  //

  //     // Here you might want to redirect the user or update the app state
  //     // For example: router.push('/dashboard');
  //     // } catch (error) {
  //     //   console.log(error);
  //     //
  //   }

  return (
    <div className="mx-auto max-w-sm space-y-6 p-4">
      <div className="flex flex-col items-center justify-center bg-background p-4">
        <div className="relative h-16 w-16">
          <Image
            src="/ubc.webp"
            alt="Company Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={andlesubmit}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
          <div className="text-center text-sm">
            <a href="#" className="text-primary hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
