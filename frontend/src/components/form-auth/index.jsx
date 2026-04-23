import { Fragment, useState } from "react";
import { login } from "../../api/session";
import { useSession } from "../../context/SessionContext";
import "./index.css";
// ----------------------------------------------------------------------------

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
    <div className="auth-form">
      <h2>LOG-IN</h2>
      <form onSubmit={handleSubmit}>
        <span>
          <h3>email</h3>
          <input placeholder="e-mail" value={credential} onChange={(e) => setCredential(e.target.value)} />
        </span>
        <span>
          <h3>password</h3>
          <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </span>
        <button>Login</button>
      </form>
    </div >
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