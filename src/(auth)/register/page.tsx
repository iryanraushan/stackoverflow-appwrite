import { useAuthStore } from "@/store/Auth";
import { useState } from "react";

const RegisterPage = () => {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //collect data
    const formData = new FormData(event.currentTarget);
    const fistName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    // validate data
    if (!fistName || !lastName || !email || !password) {
      setError(() => "Please fill in all fields");
      return;
    }

    // call the store
    setIsLoading(true);
    setError("");
    const response = await createAccount(
      `${fistName} ${lastName}`,
      email?.toString(),
      password?.toString()
    );
    if (response.error) {
      setError(() => response.error!.message);
    } else {
      const loginResponse = await login(
        email?.toString()!,
        password?.toString()!
      );
      if (loginResponse.error) {
        setError(() => loginResponse.error!.message);
      }
    }
    setIsLoading(false);
  };

  return <div>RegisterPage</div>;
};

export default RegisterPage;
