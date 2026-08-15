import {
  apiClient,
} from "./apiClient";

/* ============================================================
   CHAT
   ============================================================ */

export async function getChatSessions() {
  const res = await apiClient(
    "/chat/sessions"
  );

  return res.json();
}

export async function getChat(
  chat_id: string
) {
  const res = await apiClient(
    `/chat/${encodeURIComponent(
      chat_id
    )}`
  );

  return res.json();
}

export async function deleteChat(
  chat_id: string
) {
  const res = await apiClient(
    `/chat/${encodeURIComponent(
      chat_id
    )}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}

export async function sendMessage(
  question: string,
  doc_id?: string,
  chat_id?: string,
  start_page?: number,
  end_page?: number
) {
  const res = await apiClient(
    "/chat/",
    {
      method: "POST",

      body: JSON.stringify({
        question,
        doc_id,
        chat_id,
        start_page,
        end_page,
      }),
    }
  );

  return res.json();
}

/* ============================================================
   DASHBOARD
   ============================================================ */

export async function getDashboard() {
  const res = await apiClient(
    "/dashboard/"
  );

  return res.json();
}

export async function getDashboardStats() {
  const res = await apiClient(
    "/dashboard/"
  );

  return res.json();
}

/* ============================================================
   DOCUMENTS
   ============================================================ */

export async function uploadPDF(
  file: File
) {
  const fd = new FormData();

  fd.append(
    "file",
    file,
    file.name
  );

  const res = await apiClient(
    "/documents/upload",
    {
      method: "POST",
      body: fd,
    }
  );

  return res.json();
}

export async function getDocuments() {
  const res = await apiClient(
    "/documents/"
  );

  return res.json();
}

export async function deleteDocument(
  doc_id: string
) {
  const res = await apiClient(
    `/documents/${encodeURIComponent(
      doc_id
    )}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}

/* ============================================================
   LEARNING
   ============================================================ */

export async function getFlashcards({
  doc_id,
  count = 10,
  topic = "",
  difficulty = "medium",
}: {
  doc_id?: string;
  count?: number;
  topic?: string;
  difficulty?: string;
}) {
  const params =
    new URLSearchParams({
      count: String(count),
      topic,
      difficulty,
    });

  if (doc_id) {
    params.append(
      "doc_id",
      doc_id
    );
  }

  const res = await apiClient(
    `/learning/flashcards?${params.toString()}`
  );

  return res.json();
}

export async function getQuiz({
  doc_id,
  count = 5,
  topic = "",
  difficulty = "medium",
  force_new = false,
}: {
  doc_id?: string;
  count?: number;
  topic?: string;
  difficulty?: string;
  force_new?: boolean;
}) {
  const params =
    new URLSearchParams({
      count: String(count),
      topic,
      difficulty,
      force_new: String(
        force_new
      ),
    });

  if (doc_id) {
    params.append(
      "doc_id",
      doc_id
    );
  }

  const res = await apiClient(
    `/learning/quiz?${params.toString()}`
  );

  return res.json();
}

export async function checkFlashcards(
  doc_id: string
) {
  const res = await apiClient(
    `/learning/flashcards/check?doc_id=${encodeURIComponent(
      doc_id
    )}`
  );

  return res.json();
}

export async function checkQuiz(
  doc_id: string
) {
  const res = await apiClient(
    `/learning/quiz/check?doc_id=${encodeURIComponent(
      doc_id
    )}`
  );

  return res.json();
}

export async function saveQuizProgress(
  data: unknown
) {
  return apiClient(
    "/learning/quiz/progress/save",
    {
      method: "POST",

      body: JSON.stringify(data),
    }
  );
}

export async function getQuizProgress(
  doc_id: string
) {
  const res = await apiClient(
    `/learning/quiz/progress?doc_id=${encodeURIComponent(
      doc_id
    )}`
  );

  return res.json();
}

/* ============================================================
   GOOGLE AUTH
   ============================================================ */

export async function loginWithGoogle(
  googleToken: string,
  timezone?: string
) {
  const res = await apiClient(
    "/auth/google",
    {
      method: "POST",

      skipAuth: true,

      body: JSON.stringify({
        google_token:
          googleToken,
        timezone,
      }),
    }
  );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail ||
        "Google sign-in failed."
    );
  }

  if (!data?.access_token) {
    throw new Error(
      "Authentication succeeded, but no access token was returned."
    );
  }

  localStorage.setItem(
    "recallnova_access_token",
    data.access_token
  );

  return data;
}

/* ============================================================
   EMAIL SIGNUP
   ============================================================ */

export async function signupWithEmail(
  email: string,
  password: string,
  name?: string,
  timezone?: string
) {
  const res = await apiClient(
    "/auth/email/signup",
    {
      method: "POST",

      skipAuth: true,

      body: JSON.stringify({
        email,
        password,
        name,
        timezone,
      }),
    }
  );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail ||
        "Unable to create account."
    );
  }

  return data;
}

/* ============================================================
   EMAIL LOGIN
   ============================================================ */

export async function loginWithEmail(
  email: string,
  password: string
) {
  const res = await apiClient(
    "/auth/email/login",
    {
      method: "POST",

      skipAuth: true,

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail ||
        "Email sign-in failed."
    );
  }

  if (!data?.access_token) {
    throw new Error(
      "Authentication succeeded, but no access token was returned."
    );
  }

  localStorage.setItem(
    "recallnova_access_token",
    data.access_token
  );

  return data;
}

/* ============================================================
   EMAIL VERIFICATION
   ============================================================ */

export async function verifyEmail(
  token: string
) {
  const res = await apiClient(
    "/auth/email/verify",
    {
      method: "POST",

      skipAuth: true,

      body: JSON.stringify({
        token,
      }),
    }
  );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail ||
        "Email verification failed."
    );
  }

  return data;
}

/* ============================================================
   FORGOT PASSWORD
   ============================================================ */

export async function forgotPassword(
  email: string
) {
  const res = await apiClient(
    "/auth/email/forgot-password",
    {
      method: "POST",

      skipAuth: true,

      body: JSON.stringify({
        email,
      }),
    }
  );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail ||
        "Unable to process password reset."
    );
  }

  return data;
}

/* ============================================================
   RESET PASSWORD
   ============================================================ */

export async function resetPassword(
  token: string,
  password: string
) {
  const res = await apiClient(
    "/auth/email/reset-password",
    {
      method: "POST",

      skipAuth: true,

      body: JSON.stringify({
        token,
        password,
      }),
    }
  );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail ||
        "Password reset failed."
    );
  }

  return data;
}