const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";
  // 🔥 GET CHAT SESSIONS
export async function getChatSessions() {

  const res = await fetch(
    `${BASE_URL}/chat/sessions?user_id=user1`
  );

  return res.json();
}

// 🔥 GET SINGLE CHAT
export async function getChat(
  chat_id: string
) {

  const res = await fetch(
    `${BASE_URL}/chat/${chat_id}?user_id=user1`
  );

  return res.json();
}


// 🔥 DELETE CHAT
export async function deleteChat(
  chat_id: string
) {

  const res = await fetch(

    `${BASE_URL}/chat/${chat_id}?user_id=user1`,

    {
      method: "DELETE",
    }
  );

  return res.json();
}
// 🔥 CHAT
export async function sendMessage(
  question: string,
  doc_id?: string,
  chat_id?: string,
  focus_mode: string = "balanced"
) {

  const res = await fetch(
    `${BASE_URL}/chat/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
  user_id: "user1",
  question,
  doc_id,
  chat_id,
  focus_mode,
}),
    }
  );

  return res.json();
}
// 🔥 UPLOAD PDF
export async function uploadPDF(file: File) {
  const fd = new FormData();

  fd.append("file", file, file.name); // 🔥 CRITICAL FIX

  const res = await fetch(
    `${BASE_URL}/documents/upload?user_id=user1`,
    {
      method: "POST",
      body: fd,
    }
  );

  return res.json();
}

// 🔥 GET DOCUMENTS
export async function getDocuments() {
  const res = await fetch(
    `${BASE_URL}/documents/?user_id=user1`
  );
  return res.json();
}

// 🔥 DELETE DOC
export async function deleteDocument(doc_id: string) {
  const res = await fetch(
    `${BASE_URL}/documents/${doc_id}?user_id=user1`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}

// 🔥 FLASHCARDS
export async function getFlashcards({
  doc_id,
  count = 10,
  topic = "",
  difficulty = "medium",
}: any) {
  const params = new URLSearchParams({
    user_id: "user1",
    count: String(count),
    topic,
    difficulty,
  });

  if (doc_id) params.append("doc_id", doc_id);

  const res = await fetch(
    `${BASE_URL}/learning/flashcards?${params}`
  );

  return res.json();
}

// 🔥 QUIZ
export async function getQuiz({
  doc_id,
  count = 5,
  topic = "",
  difficulty = "medium",
  force_new = false,   // 🔥 ADD
}: any) {
  const params = new URLSearchParams({
    user_id: "user1",
    count: String(count),
    topic,
    difficulty,
    force_new: String(force_new), // 🔥 ADD
  });

  if (doc_id) params.append("doc_id", doc_id);

  const res = await fetch(
    `${BASE_URL}/learning/quiz?${params}`
  );

  return res.json();
}
export async function checkFlashcards(doc_id: string) {
  const res = await fetch(
    `${BASE_URL}/learning/flashcards/check?user_id=user1&doc_id=${doc_id}`
  );
  return res.json();
}

export async function checkQuiz(doc_id: string) {
  const res = await fetch(
    `${BASE_URL}/learning/quiz/check?user_id=user1&doc_id=${doc_id}`
  );
  return res.json();
} 
// 🔥 QUIZ PROGRESS
export async function saveQuizProgress(data: any) {
  return fetch(`${BASE_URL}/learning/quiz/progress/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getQuizProgress(doc_id: string) {
  const res = await fetch(
    `${BASE_URL}/learning/quiz/progress?user_id=user1&doc_id=${doc_id}`
  );
  return res.json();
}