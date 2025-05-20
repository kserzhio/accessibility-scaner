import { LoginForm } from "components/auth/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
      <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white px-10">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold mb-6">Welcome Back</h1>
          <LoginForm />
        </div>
      </div>

      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/images/login-bg.jpg)' }} />
    </div>
  );
}
