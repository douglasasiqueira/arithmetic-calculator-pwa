import { PAGES } from "./constants";

export const request = async (
  url: string,
  method: string = "GET",
  body: object = {},
  headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
) => {
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
    credentials: "omit",
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return err;
    });

  return response;
};

export const getAuthRequest = async (url: string, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "omit",
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return err;
    });

  if (response.status == 403) {
    window.location.href = PAGES.login;
  }

  return response;
};

export const postAuthRequest = async (
  url: string,
  token: string,
  body: any
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
    credentials: "omit",
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return err;
    });

  if (response.status == 403) {
    window.location.href = PAGES.login;
  }

  return response;
};

export const deleteAuthRequest = async (url: string, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
    credentials: "omit",
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return err;
    });

  if (response.status == 403) {
    window.location.href = PAGES.login;
  }

  return response;
};
