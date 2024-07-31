import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  if (session) return null;

  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
