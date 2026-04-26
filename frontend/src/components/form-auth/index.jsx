import { Fragment, useState, useEffect } from "react";
import { validateFE } from "./validate-auth";
import { login, signup } from "../../api/session";
import { useSession } from "../../context/SessionContext";
import "./index.css";
// ----------------------------------------------------------------------------

function FormError(title, err) {
  if (err) {
    return (
      <h3>
        {title} <span className="form-error">{err.toLowerCase()}</span>
      </h3>
    )
  }
  return <h3>{title}</h3>
}

function LoginForm() {
  const { setUser } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FEErrors = validateFE("L", [email, password]);

    if (Object.keys(FEErrors).length > 0) {
      setErrors(FEErrors);
    } else {
      const data = await login(email, password);
      if (data.errors) {
        setErrors({"email": "invalid credentials"});
      } else {
        setUser(data.user);
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>LOG-IN</h2>
      <form onSubmit={handleSubmit}>
        <span>
          {FormError("email", errors?.email)}
          <input placeholder="e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </span>
        <span>
          {FormError("password", errors?.password)}
          <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </span>
        <button>Login</button>
      </form>
    </div >
  );
};

function SignupForm() {
  const { setUser } = useSession();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FEErrors = validateFE("S", [email, firstName, lastName, password, confirm]);

    if (Object.keys(FEErrors).length > 0) {
      setErrors(FEErrors);
    } else {
      const signupData = await signup(email, firstName, lastName, password);
      if (signupData.errors) {
        setErrors(signupData.errors);
      } else {
        const loginData = await login(email, password);
        setUser(loginData.user);
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>SIGN-UP</h2>
      <form onSubmit={handleSubmit}>
        <span>
          {FormError("first name", errors?.firstName)}
          <input
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
        </span>
        <span>
          {FormError("last name", errors?.lastName)}
          <input
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </span>
        <span>
          {FormError("email", errors?.email)}
          <input
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <span>
          {FormError("password", errors?.password)}
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <span>
          {FormError("confirm password", errors?.confirm)}
          <input
            placeholder="confirm password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </span>
        <button>Sign Up</button>
      </form>
    </div >
  );
};


export function Auth() {
  return (
    <>
      <LoginForm />
      <SignupForm />
    </>
  )
}