"use client";

import { useState, useEffect } from "react";
import {
  uploadPDF,
  getDocuments,
  deleteDocument,
} from "@/lib/api";

export default function UploadBox() {
  const [docs, setDocs] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [deleteMode, setDeleteMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadDocs = async () => {
    const res = await getDocuments();
    setDocs(res.documents || []);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleFile = async (file: File) => {
    if (!file) return;

    try {
      setLoading(true);

      await uploadPDF(file);

      setToast("Uploaded successfully ✅");

      await loadDocs();
    } catch (err) {
      console.error(err);
      setToast("Upload failed ❌");
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
              className="
                px-4
                py-2.5
                rounded-xl
                bg-blue-500
                hover:bg-blue-600
                text-white
                font-bold
                text-sm
                cursor-pointer
                transition
              "
            >
              + NEW

           <input
  type="file"
  hidden
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
            {docs.map((d, i) => (

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

            ))}

          </div>

          {loading && (
            <p className="mt-4 text-sm opacity-70">
              Uploading...
            </p>
          )}

        </div>

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