import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">RecallNova</h1>
      <p className="mb-6 text-gray-400 text-center max-w-md">
        Turn your PDFs into AI-powered learning — chat, flashcards, and quizzes.
      </p>

      <div className="flex gap-4">
        <Link
          href="/chat"
          className="bg-white text-black px-6 py-2 rounded"
        >
          Start Chatting
        </Link>

        <Link
          href="/upload"
          className="border border-white px-6 py-2 rounded"
        >
          Upload Docs
        </Link>
      </div>
    </div>
  );
}