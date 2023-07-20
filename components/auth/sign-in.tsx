import Link from "next/link";
import SignInForm from "./sign-in-form";
import { Icons } from "../icons";

const SignIn = () => {
  return (
    <div className="container mx-auto flex flex-col space-y-6 sm:w-[450px]">
      <div className="flex flex-col space-y-6">
        <div className="text-center">
          <Icons.logo className="mx-auto h-9 w-9 m-2" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm max-w-xs mx-auto">
            By continuing, you are agree to our User Agreement and Privecy
            Policy.
          </p>
        </div>

        <SignInForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          New to Career Guidance? {" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
