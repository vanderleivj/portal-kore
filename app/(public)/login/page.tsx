import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import { SignInForm } from "./signin-form";
export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="bg-white px-32 py-28 rounded-lg shadow-lg w-full max-w-[719px] max-sm:px-12 max-sm:py-16 max-sm:mx-5">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Koretech Logo" className="h-12" />
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
