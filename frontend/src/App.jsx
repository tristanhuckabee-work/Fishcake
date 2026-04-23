import { Routes, Route, Navigate } from "react-router-dom";
import {Auth} from "./components/form-auth";
import {Splash} from "./components/main-splash";

export default function App() {
  let isLoggedIn = true;

  return (
    <Routes>
      <Route path="/" element= { isLoggedIn ? <Splash /> : <Auth /> } />
    </Routes>
  );
}