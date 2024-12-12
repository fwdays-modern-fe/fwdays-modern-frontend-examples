"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useProfile = () => ({ profile: null, loading: false });

const useAuth = () => {
  const { profile, loading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!profile && !loading) {
      router.push("/sign-in");
    }
  }, [profile, loading, router]);

  return { profile };
};

export const Page = () => {
  const { profile } = useAuth();

  return <p>Username: {profile && profile.name}</p>;
};

export default Page;
