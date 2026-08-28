"use client";

import { useState, useEffect } from "react";
import {
  uploadPDF,
  getDocuments,
  deleteDocument,
} from "@/lib/api";

import {
  Upload,
} from "lucide-react";

import {
  useAuth,
} from "@/components/auth/AuthProvider";

export default function UploadBox() {
const {
  loading: authLoading,
  isAuthenticated,
  isGuest,
} = useAuth();

const [docs, setDocs] = useState<any[]>([]);
const [showSignupPrompt, setShowSignupPrompt] =
  useState(false);
const [docsLoading, setDocsLoading] = useState(true);
const [selected, setSelected] = useState<string[]>([]);
const [loading, setLoading] = useState(false);

  const [deleteMode, setDeleteMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

const loadDocs = async () => {
  if (
    authLoading ||
    !isAuthenticated
  ) {
    return;
  }

  try {
    setDocsLoading(true);

    const res =
      await getDocuments();

    setDocs(
      Array.isArray(res?.documents)
        ? res.documents
        : []
    );
  } catch (err) {
    console.error(
      "DOCUMENT LOAD FAILED:",
      err
    );

    setDocs([]);
  } finally {
    setDocsLoading(false);
  }
};
useEffect(() => {
  if (authLoading) {
    return;
  }

  if (!isAuthenticated) {
    setDocs([]);
    setDocsLoading(false);
    return;
  }

  loadDocs();
}, [
  authLoading,
  isAuthenticated,
]);
 const handleFile = async (file: File) => {
  if (!file) return;

  try {
    setLoading(true);

    await uploadPDF(file);

    setToast("Uploaded successfully ✅");

    await loadDocs();

  } catch (err) {

    const error =
      err as Error & {
        code?: string;
        usage?: unknown;
        status?: number;
      };

    if (
      isGuest &&
      error.code ===
        "document_limit_reached"
    ) {
      setShowSignupPrompt(true);
      return;
    }

    console.error(
      "DOCUMENT UPLOAD ERROR:",
      err
    );

    setToast(
      err instanceof Error
        ? err.message
        : "Upload failed ❌"
    );

  } finally {

    setLoading(false);

    setTimeout(() => {
      setToast(null);
    }, 3000);

  }
};

  const toggleSelect = (id: string) => {
    if (!deleteMode) return;

    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleDeleteConfirm = async () => {
  try {

    await Promise.all(
      selected.map((id) =>
        deleteDocument(id)
      )
    );

    setSelected([]);
    setDeleteMode(false);
    setShowConfirm(false);

    setToast("Deleted successfully 🗑️");

    await loadDocs();

  } catch (err) {
    console.error(err);
    setToast("Delete failed ❌");
  }

  setTimeout(() => {
    setToast(null);
  }, 3000);
};

  return (
    <div className="w-full px-3 sm:px-5 lg:px-8 py-4 sm:py-6">

      <div
        className="
          w-full
          max-w-6xl
          mx-auto
          mt-10
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            px-4
            sm:px-6
            py-5
            border-b
            border-white/10
          "
        >

          <div>

            <h1
              className="
                text-2xl
                sm:text-3xl
                font-black
                tracking-tight
              "
            >
              Upload Documents
            </h1>

            <p className="text-sm opacity-60 mt-1">
              Store and manage your study materials
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

<label
  className={`
    px-4
    py-2.5
    rounded-xl
    bg-blue-500
    hover:bg-blue-600
    text-white
    font-bold
    text-sm
    transition
    ${
      loading
        ? "cursor-not-allowed opacity-50"
        : "cursor-pointer"
    }
  `}
            >
              + NEW
<input
  type="file"
  hidden
  disabled={loading}
  onChange={async (e) => {
    const file =
      e.target.files?.[0] as File;

    await handleFile(file);

    e.target.value = "";

  }}
/>
            </label>

            {!deleteMode ? (

              <button
                onClick={() => setDeleteMode(true)}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  font-bold
                  text-sm
                  transition
                "
              >
                DELETE
              </button>

            ) : (

              <>
                <button
                  onClick={() =>
                    setShowConfirm(true)
                  }
                  disabled={!selected.length}
                  className="
                    px-4
                    py-2.5
                    rounded-xl
                    bg-red-600
                    text-white
                    font-bold
                    text-sm
                    disabled:opacity-40
                  "
                >
                  CONFIRM
                </button>

                <button
                  onClick={() => {
                    setDeleteMode(false);
                    setSelected([]);
                  }}
                  className="
                    px-4
                    py-2.5
                    rounded-xl
                    bg-gray-500
                    hover:bg-gray-600
                    text-white
                    font-bold
                    text-sm
                  "
                >
                  CANCEL
                </button>
              </>

            )}

          </div>

        </div>
        {/* TABLE */}

{loading || authLoading ? (
<div className="
    mx-auto
    flex
    min-h-[320px]
    w-full
    max-w-6xl
    items-center
    justify-center
    rounded-2xl
    border
    border-white/10
    bg-white/[0.025]
    p-6
  ">
    <div className="
      flex
      flex-col
      items-center
      gap-4
      text-center
    ">
      <div className="
        h-12
        w-12
        sm:h-14
        sm:w-14
        rounded-full
        border-4
        border-white/10
        border-t-lime-400
        animate-spin
      " />

      <p className="
        text-sm
        sm:text-base
        font-semibold
        opacity-80
      ">
        Uploading document...
      </p>
    </div>
  </div>
) : (
        <div className="p-3 sm:p-6">

          {/* DESKTOP HEADER */}

          <div
            className="
              hidden
              md:grid
              grid-cols-12
              px-4
              pb-3
              mb-3
              text-xs
              uppercase
              tracking-wider
              opacity-50
              border-b
              border-white/10
            "
          >

            {deleteMode && (
              <div className="col-span-1"></div>
            )}

            <div className="col-span-5">
              Document
            </div>

            <div className="col-span-3">
              Size
            </div>

            <div className="col-span-3">
              Preview
            </div>

          </div>

          {/* LIST */}

<div className="
  space-y-3
  mt-4
">
{authLoading || docsLoading ? (
    <div className="
    mx-auto
    flex
    min-h-[220px]
    max-w-6xl
    items-center
    justify-center
    rounded-2xl
    border
    border-white/10
    bg-white/[0.025]
  ">
    <div className="
      flex
      flex-col
      items-center
      gap-3
      text-center
    ">
      <div className="
        h-8
        w-8
        rounded-full
        border-4
        border-white/10
        border-t-lime-400
        animate-spin
      " />

<p className="
  text-sm
  font-medium
  opacity-60
">
  Loading workspace...
</p>
    </div>
  </div>
) : docs.length === 0 ? (
               <div className="
  mx-auto
  w-full
  max-w-6xl
  rounded-2xl
  border
  border-white/10
  bg-white/[0.025]
  px-5
  py-12
  sm:px-8
  sm:py-16
  text-center
">
  <p className="
    text-base
    sm:text-lg
    md:text-xl
    font-bold
    leading-7
    sm:leading-8
    opacity-85
  ">
    UPLOAD DOCUMENTS IN THE UPLOAD PAGE TO START!
  </p>
</div>
            ) : (
              docs.map((d, i) => (

              <div
                key={d._id}
                onClick={() =>
                  toggleSelect(d._id)
                }
                className={`
                  rounded-2xl
                  border
                  border-white/5
                  bg-white/[0.025]
                  hover:bg-white/[0.05]
                  transition-all
                  duration-200
                  p-4

                  ${
                    deleteMode
                      ? "cursor-pointer"
                      : ""
                  }

                  ${
                    selected.includes(d._id)
                      ? "bg-red-400/20 border-red-400/20"
                      : ""
                  }
                `}
              >

                {/* MOBILE */}

                <div className="md:hidden space-y-3">

                  <div className="flex justify-between gap-3">

                    <div className="min-w-0">

                      <div className="font-semibold break-words">
                        {i + 1}.{" "}
                        {d.name || "Untitled.pdf"}
                      </div>

                      <div className="text-xs opacity-60 mt-1">
                        {d.size
                          ? `${(
                              d.size / 1024
                            ).toFixed(1)} KB`
                          : "-"}
                      </div>

                    </div>

                    {deleteMode && (

                      <input
                        type="checkbox"
                        checked={selected.includes(
                          d._id
                        )}
                        readOnly
                      />

                    )}

                  </div>

                  <div className="text-sm opacity-70 break-words">
                    {d.preview?.slice(0, 90) || "-"}
                  </div>

                </div>

                {/* DESKTOP */}

                <div
                  className="
                    hidden
                    md:grid
                    md:grid-cols-12
                    md:items-center
                  "
                >

                  {deleteMode && (

                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selected.includes(
                          d._id
                        )}
                        readOnly
                      />
                    </div>

                  )}

                  <div className="col-span-5 pr-3 font-semibold truncate">
                    {i + 1}.{" "}
                    {d.name || "Untitled.pdf"}
                  </div>

                  <div className="col-span-3 text-sm opacity-80">
                    {d.size
                      ? `${(
                          d.size / 1024
                        ).toFixed(1)} KB`
                      : "-"}
                  </div>

                  <div className="col-span-3 text-sm opacity-70 truncate">
                    {d.preview?.slice(0, 50) || "-"}
                  </div>

                </div>

              </div>

              ))
            )}

          </div>
        </div>
        )}

      </div>

      {/* MODAL */}

      {showConfirm && (

        <div
          className="
            fixed
            inset-0
            bg-black/60
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-sm
              bg-[#111827]
              border
              border-white/10
              rounded-3xl
              p-6
              shadow-2xl
            "
          >

            <h2 className="text-xl font-black mb-2">
              Confirm Delete
            </h2>

            <p className="text-sm opacity-70 mb-6">
              Delete {selected.length} selected file(s)?
            </p>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setShowConfirm(false)
                }
                className="
                  flex-1
                  py-3
                  rounded-xl
                  bg-white/10
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  bg-red-500
                  text-white
                  font-bold
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}
      {/* GUEST SIGNUP LIMIT MODAL */}

      {showSignupPrompt && (
        <div
          className="
            fixed
            inset-0
            z-[9999]

            flex
            items-center
            justify-center

            bg-[var(--bg)]/70
            backdrop-blur-md

            p-4
            sm:p-6
          "
          onClick={() =>
            setShowSignupPrompt(false)
          }
        >
          <div
            className="
              w-full
              max-w-[min(92vw,420px)]

              rounded-3xl

              border
              border-[var(--border)]

              bg-[var(--card)]

              text-[var(--text)]

              p-5
              sm:p-6
              md:p-7

              shadow-2xl

              transition-all
              duration-200
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ICON */}

            <div
              className="
                mx-auto

                flex
                h-14
                w-14
                sm:h-16
                sm:w-16

                items-center
                justify-center

                rounded-2xl

                bg-[var(--primary)]/10

                text-[var(--primary)]
              "
            >
              <Upload
                size={26}
                className="sm:hidden"
              />

              <Upload
                size={30}
                className="hidden sm:block"
              />
            </div>

            {/* TITLE */}

            <h2
              className="
                mt-5

                text-center

                text-lg
                sm:text-xl
                md:text-2xl

                font-black
              "
            >
              Guest Upload Limit Reached
            </h2>

            {/* MESSAGE */}

            <p
              className="
                mt-3

                text-center

                text-sm
                sm:text-base

                leading-6

                opacity-70
              "
            >
              You have reached the document limit
              available in Guest Mode.
              Create a free RecallNova account
              for greater access and higher limits.
            </p>

            {/* ACTIONS */}

            <div
              className="
                mt-6

                flex
                flex-col
                sm:flex-row

                gap-3
              "
            >

              <button
                type="button"
                onClick={() =>
                  setShowSignupPrompt(false)
                }
                className="
                  w-full
                  sm:flex-1

                  rounded-xl

                  border
                  border-[var(--border)]

                  bg-[var(--bg)]

                  px-4
                  py-3

                  text-sm
                  font-semibold

                  text-[var(--text)]

                  transition

                  hover:opacity-80
                  active:scale-[0.98]
                "
              >
                Not now
              </button>

              <a
                href="/signup"
                className="
                  w-full
                  sm:flex-1

                  inline-flex

                  items-center
                  justify-center

                  rounded-xl

                  bg-[var(--primary)]

                  px-4
                  py-3

                  text-sm
                  font-bold

                  text-[var(--bg)]

                  transition

                  hover:opacity-90
                  active:scale-[0.98]
                "
              >
                Sign Up
              </a>

            </div>

          </div>
        </div>
      )}

      {/* TOAST */}

      {toast && (

        <div
          className="
            fixed
            bottom-5
            right-5
            z-50
            px-4
            py-3
            rounded-xl
            bg-black
            text-white
            shadow-xl
            text-sm
          "
        >
          {toast}
        </div>

      )}

    </div>
  );
}