import { useAuthStore } from "@/store/Auth";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //collect data
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // validate data
    if (!email || !password) {
      setError(() => "Please fill in all fields");
      return;
    }

    // call the store
    setIsLoading(true);
    setError("");
    const response = await login(email?.toString()!, password?.toString()!);
    if (response.error) {
      setError(() => response.error!.message);
    }
    setIsLoading(false);
  };

  return <div>LoginPage</div>;
};

export default LoginPage;
