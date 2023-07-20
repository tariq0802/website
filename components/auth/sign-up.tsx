import Link from "next/link";
import SignUpForm from "./sign-up-form";

const SignUp = () => {
  return (
    <div className="container mx-auto flex flex-col space-y-6 sm:w-[450px]">
      <div className="flex flex-col space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
          <p className="text-sm max-w-xs mx-auto">
            By continuing, you are agree to our User Agreement and Privecy
            Policy.
          </p>
        </div>

        {/* sign up form */}
        <SignUpForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          Already have account?{" "}
          <Link
            href="/sign-in"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
