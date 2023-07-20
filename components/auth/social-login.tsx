"use client";

import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was an error",
        description: "There was an error logging in eith google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={loginWithGoogle}
      isLoading={isLoading}
      size="sm"
      variant={"secondary"}
      className="w-full"
    >
      {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
      Google
    </Button>
  );
};

export default SocialLogin;
