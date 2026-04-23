function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

export async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] = "application/json";

    const csrfToken = getCookie("XSRF-TOKEN");
    if (csrfToken) {
      options.headers["XSRF-Token"] = csrfToken;
    }
  }

  options.credentials = "include";

  const res = await fetch(url, options);
  return res;
}