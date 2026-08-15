const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

const TOKEN_KEY =
  "recallnova_access_token";

let refreshPromise:
  Promise<boolean> | null = null;

type ApiClientOptions = RequestInit & {
  skipAuth?: boolean;
};

/* ============================================================
   REFRESH ACCESS TOKEN
   ============================================================ */

async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

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

/* ============================================================
   MAIN API CLIENT
   ============================================================ */

export async function apiClient(
  path: string,
  options: ApiClientOptions = {},
  retry = true
): Promise<Response> {
  const {
    skipAuth = false,
    ...requestOptions
  } = options;

  const token =
    typeof window !== "undefined" &&
    !skipAuth
      ? localStorage.getItem(
          TOKEN_KEY
        )
      : null;

  const headers = new Headers(
    requestOptions.headers
  );

  /*
   * Automatically set JSON content type.
   *
   * Do not set this for FormData because
   * the browser must generate the multipart
   * boundary itself.
   */
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

  /*
   * Attach access token only when this
   * request is authenticated.
   */
  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const response = await fetch(
    `${BASE_URL}${path}`,
    {
      ...requestOptions,
      headers,
      credentials: "include",
    }
  );

  /*
   * Access-token expiration.
   *
   * Only retry when:
   * - server returned 401
   * - request had an access token
   * - this is the first attempt
   */
  if (
    response.status === 401 &&
    retry &&
    token
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
  }

  /*
   * Never redirect automatically here.
   *
   * AuthProvider and individual auth pages
   * should decide what to do with failures.
   */
  return response;
}

export {
  BASE_URL,
  TOKEN_KEY,
};