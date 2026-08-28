const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

const TOKEN_KEY =
  "recallnova_access_token";

let refreshPromise:
  Promise<boolean> | null = null;

export type ApiClientOptions =
  RequestInit & {
    skipAuth?: boolean;
    skipRefresh?: boolean;
  };

async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise =
    (async () => {
      try {
        const response =
          await fetch(
            `${BASE_URL}/auth/refresh`,
            {
              method: "POST",
              credentials:
                "include",
              cache: "no-store",
              headers: {
                "Content-Type":
                  "application/json",
              },
            }
          );

        if (!response.ok) {
          return false;
        }

        const data =
          await response.json();

        if (!data?.access_token) {
          return false;
        }

        localStorage.setItem(
          TOKEN_KEY,
          data.access_token
        );

        return true;
      } catch (error) {
        console.error(
          "SESSION REFRESH FAILED:",
          error
        );

        return false;
      } finally {
        refreshPromise = null;
      }
    })();

  return refreshPromise;
}

export async function apiClient(
  path: string,
  options: ApiClientOptions = {},
  retry = true
): Promise<Response> {
  const {
    skipAuth = false,
    skipRefresh = false,
    ...requestOptions
  } = options;

  const token =
    typeof window !== "undefined" &&
    !skipAuth
      ? localStorage.getItem(
          TOKEN_KEY
        )
      : null;

  const headers =
    new Headers(
      requestOptions.headers
    );

  if (
    requestOptions.body &&
    !(
      requestOptions.body instanceof
      FormData
    )
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const response =
    await fetch(
      `${BASE_URL}${path}`,
      {
        ...requestOptions,
        headers,
        credentials: "include",
        cache:
          requestOptions.cache ??
          "no-store",
      }
    );

  if (
    response.status === 401 &&
    retry &&
    !skipRefresh &&
    token &&
    path !== "/auth/refresh"
  ) {
    const refreshed =
      await refreshAccessToken();

    if (refreshed) {
      return apiClient(
        path,
        options,
        false
      );
    }

    localStorage.removeItem(
      TOKEN_KEY
    );
  }

  return response;
}

export {
  BASE_URL,
  TOKEN_KEY,
};