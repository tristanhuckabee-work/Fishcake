import { csrfFetch } from "../store/csrf";

export async function login(credential, password) {
  const res = await csrfFetch("/session", {
    method: "POST",
    body: JSON.stringify({ credential, password })
  });

  return res.json();
}

export async function signup(email, firstName, lastName, password, confirm) {
  const res = await csrfFetch("/users", {
    method: "POST",
    body: JSON.stringify( { email, firstName, lastName, password, confirm } )
  });

  return res.json();
}

export async function restoreSession() {
  const res = await fetch("/session", {
    credentials: "include"
  });

  return res.json();
}

export async function logout() {
  const res = await csrfFetch("/session", {
    method: "DELETE"
  });

  return res.json();
}