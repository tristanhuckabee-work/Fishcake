import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSession } from "./context/SessionContext";
import { Auth } from "./components/form-auth";
import { Splash } from "./components/main-splash";

export default function App() {
  const { user, loaded } = useSession();

  useEffect(() => {
    fetch("/api/restore-csrf", {
      credentials: "include"
    });
  }, []);

  if (!loaded) return <div>Loading...</div>;



  return (
    <Routes>
      <Route path="/" element={user ? <Splash /> : <Auth />} />
    </Routes>
  );
}