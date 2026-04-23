import { useState } from "react";
import { login } from "../../api/session";
import { useSession } from "../../context/SessionContext";

function LoginForm() {
  const { setUser } = useSession();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(credential, password);
    setUser(data.user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={credential} onChange={(e) => setCredential(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
};

function SignupForm() {
  return <div>SIGNUP</div>
}

export function Auth() {
  return (
    <>
      <LoginForm />
      <SignupForm />
    </>
  )
}