import { apiClient } from "./apiClient";

/* ============================================================
   LEARNING PREFERENCES
============================================================ */

export type LearningPreferences = {
  quizTimer: number;
  quizCount: number;
  flashcardCount: number;
};

const DEFAULT_LEARNING_PREFERENCES: LearningPreferences = {
  quizTimer: 30,
  quizCount: 5,
  flashcardCount: 10,
};

function readNumberSetting(
  key: string,
  fallback: number
) {
  if (
    typeof window === "undefined"
  ) {
    return fallback;
  }

  const raw =
    localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  const value = Number(raw);

  if (
    !Number.isFinite(value) ||
    value < 1
  ) {
    return fallback;
  }

  return value;
}

export function getLearningPreferences(): LearningPreferences {
  return {
    quizTimer:
      readNumberSetting(
        "quiz_timer",
        DEFAULT_LEARNING_PREFERENCES.quizTimer
      ),

    quizCount:
      readNumberSetting(
        "quiz_count",
        DEFAULT_LEARNING_PREFERENCES.quizCount
      ),

    flashcardCount:
      readNumberSetting(
        "flashcard_count",
        DEFAULT_LEARNING_PREFERENCES.flashcardCount
      ),
  };
}

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
    `/chat/${encodeURIComponent(chat_id)}`
  );

  return res.json();
}

export async function deleteChat(
  chat_id: string
) {
  const res = await apiClient(
    `/chat/${encodeURIComponent(chat_id)}`,
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
const data = await res.json();

if (!res.ok) {

  console.error(
    "UPLOAD ERROR RESPONSE:",
    data
  );

  throw new Error(

    typeof data?.detail === "string"
      ? data.detail

      : typeof data?.error === "string"
      ? data.error

      : typeof data?.message === "string"
      ? data.message

      : JSON.stringify(data)
  );
}

  return data;
}

/* ============================================================
   DASHBOARD
============================================================ */

export async function getDashboard() {
  const res = await apiClient(
    "/dashboard/"
  );

  if (!res.ok) {
    throw new Error(
      "Unable to load dashboard."
    );
  }

  return res.json();
}

export async function getDashboardStats() {
  return getDashboard();
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

  const data =
    await res.json().catch(
      () => null
    );

  if (!res.ok) {
    const detail =
      data?.detail;

    let message =
      "Unable to upload document.";

    if (
      typeof detail === "string"
    ) {
      message = detail;
    } else if (
      detail &&
      typeof detail === "object"
    ) {
      message =
        detail.message ||
        detail.code ||
        JSON.stringify(
          detail
        );
    } else if (
      typeof data?.error ===
      "string"
    ) {
      message =
        data.error;
    } else if (
      typeof data?.message ===
      "string"
    ) {
      message =
        data.message;
    }

    const error =
      new Error(message);

    (
      error as Error & {
        code?: string;
        usage?: unknown;
        status?: number;
      }
    ).code =
      detail?.code;

    (
      error as Error & {
        code?: string;
        usage?: unknown;
        status?: number;
      }
    ).usage =
      detail?.usage;

    (
      error as Error & {
        code?: string;
        usage?: unknown;
        status?: number;
      }
    ).status =
      res.status;

    throw error;
  }

  return data;
}

export async function getDocuments() {
  const res = await apiClient(
    "/documents/"
  );

  if (!res.ok) {
    throw new Error(
      "Unable to load documents."
    );
  }

  return res.json();
}

export async function deleteDocument(
  doc_id: string
) {
  const res = await apiClient(
    `/documents/${encodeURIComponent(doc_id)}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail ||
        data?.error ||
        "Unable to delete document."
    );
  }

  return data;
}
/* ============================================================
   USAGE / LIMIT WARNINGS
============================================================ */

export type UsageLimitStatus = {
  used: number;
  daily_used: number;
  monthly_used: number;
  daily_limit: number;
  monthly_limit: number;
  daily_remaining: number;
  monthly_remaining: number;
};

export type UsageWarning = {
  warning: boolean;
  remaining_daily: number;
  remaining_monthly: number;
};

export type UsageStatusResponse = {
  messages: UsageLimitStatus;
  flashcards: UsageLimitStatus;
  quizzes: UsageLimitStatus;
};

export type UsageWarningsResponse = {
  messages: UsageWarning;
  flashcards: UsageWarning;
  quizzes: UsageWarning;
};

export async function getUsageStatus(): Promise<UsageStatusResponse> {
  const res =
    await apiClient(
      "/usage/status"
    );

  const data =
    await res.json().catch(
      () => null
    );

  if (!res.ok) {
    throw new Error(
      data?.detail?.message ||
        data?.detail ||
        "Unable to load usage status."
    );
  }

  return data;
}

export async function getUsageWarnings(): Promise<UsageWarningsResponse> {
  const res =
    await apiClient(
      "/usage/warnings"
    );

  const data =
    await res.json().catch(
      () => null
    );

  if (!res.ok) {
    throw new Error(
      data?.detail?.message ||
        data?.detail ||
        "Unable to load usage warnings."
    );
  }

  return data;
}

/* ============================================================
   LEARNING
============================================================ */

export async function getFlashcards({
  doc_id,
  count,
  topic = "",
  difficulty = "medium",
}: {
  doc_id?: string;
  count?: number;
  topic?: string;
  difficulty?: string;
}) {
  const preferences =
    getLearningPreferences();

  const effectiveCount =
    count ??
    preferences.flashcardCount;

  const params =
    new URLSearchParams({
      count: String(
        effectiveCount
      ),
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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail?.message ||
        data?.detail ||
        "Unable to generate flashcards."
    );
  }

  return data;
}

export async function getQuiz({
  doc_id,
  count,
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
  const preferences =
    getLearningPreferences();

  const effectiveCount =
    count ?? preferences.quizCount;

  const params =
    new URLSearchParams({
      count: String(
        effectiveCount
      ),
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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail?.message ||
        data?.detail ||
        "Unable to generate quiz."
    );
  }

  return data;
}

export async function checkFlashcards(
  doc_id: string
) {
  const res = await apiClient(
    `/learning/flashcards/check?doc_id=${encodeURIComponent(doc_id)}`
  );

  return res.json();
}

export async function checkQuiz(
  doc_id: string
) {
  const res = await apiClient(
    `/learning/quiz/check?doc_id=${encodeURIComponent(doc_id)}`
  );

  return res.json();
}

export async function saveQuizProgress(
  data: unknown
) {
  const res = await apiClient(
    "/learning/quiz/progress/save",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const payload =
      await res.json().catch(
        () => null
      );

    throw new Error(
      payload?.detail ||
        "Unable to save quiz progress."
    );
  }

  return res;
}

export async function getQuizProgress(
  doc_id: string
) {
  const res = await apiClient(
    `/learning/quiz/progress?doc_id=${encodeURIComponent(doc_id)}`
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

  const data = await res.json();

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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail ||
        "Unable to create account."
    );
  }

  if (!data?.access_token) {
    throw new Error(
      "Account was created, but authentication could not be completed."
    );
  }

  localStorage.setItem(
    "recallnova_access_token",
    data.access_token
  );

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

  const data = await res.json();

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
export async function continueAsGuest() {
  const timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  const existingGuestId =
    localStorage.getItem(
      "recallnova_guest_id"
    );

  const res = await apiClient(
    "/auth/guest",
    {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({
        timezone,
        guest_id:
          existingGuestId || undefined,
      }),
    }
  );
console.log(
  "EXISTING GUEST ID BEFORE LOGIN:",
  existingGuestId
);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail ||
        "Unable to start guest session."
    );
  }

  if (!data?.access_token) {
    throw new Error(
      "Guest session could not be created."
    );
  }

  localStorage.setItem(
    "recallnova_access_token",
    data.access_token
  );

  if (data?.user?.id) {
    localStorage.setItem(
      "recallnova_guest_id",
      data.user.id
    );
  }

  return data;
}