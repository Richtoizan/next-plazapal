"use client";

import { FC, useState } from "react";
import { Button } from "@/ui/Button";
import { signIn } from "next-auth/react";
import { toast } from "@/ui/Toast";

interface SignInButtonProps {}

export const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithCredentials = async () => {
    setIsLoading(true);

    try {
      await signIn("credentials", {
        callbackUrl: `${"/dashboard"}`,
      });
    } catch (error) {
      toast({
        title: "Error signing in",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signInWithCredentials} isLoading={isLoading}>
      Sign In
    </Button>
  );
};

export default SignInButton;
