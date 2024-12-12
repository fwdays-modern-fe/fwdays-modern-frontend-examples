"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    const token = Math.random().toString(36).substring(2, 15);
    document.cookie = `token=${token}; path=/; max-age=${3600}`;
    router.push("/home");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Увійти</h1>
        <form className="space-y-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="bg-gray-800 text-white"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="bg-gray-800 text-white"
            />
          </div>
          <Button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <span>Відправити</span>
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SignInPage;