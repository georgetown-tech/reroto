"use client";

import { useState, useCallback, useMemo, ChangeEvent, useEffect } from "react";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import LoadingDots from "@/components/icons/loading-dots";
import MediaPreview from "./media-preview";

export default function FileUploader({
  url,
  setUrl,
}: {
  url: string;
  setUrl: (param: string) => void;
}) {
  const [data, setData] = useState<{
    audio: string | null;
  }>({
    audio: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false); // New state for tracking upload completion

  const [dragActive, setDragActive] = useState(false);
  const [name, setName] = useState("");
  const [mime, setMime] = useState("");

  useEffect(() => {
    let _name = file?.name || "";
    _name = _name.split(".")[0];
    _name = _name.replace(/[\-\_]/g, " ");
    _name = _name
      .split(" ")
      .map((i) => (i[0] || "").toUpperCase() + (i.slice(1) || "").toLowerCase())
      .join(" ");

    setName(_name);
    setMime(file?.type || "");
  }, [file]);

  const onChangeAudio = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0];
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error("File size too big (max 50MB)");
        } else {
          setFile(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, audio: e.target?.result as string }));

            setSaving(true);
            fetch("/api/upload", {
              method: "POST",
              headers: {
                "content-type": file?.type || "application/octet-stream",
              },
              body: file,
            }).then(async (res) => {
              if (res.status === 200) {
                const { url } = await res.json();
                setUrl(url);

                toast(
                  <div className="relative">
                    <div className="p-2">
                      <p className="font-semibold text-gray-900">
                        File uploaded!
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Your file has been uploaded to{" "}
                        <a
                          className="font-medium text-gray-900 underline"
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url}
                        </a>
                      </p>
                    </div>
                  </div>,
                );
                setUploadComplete(true);
              } else {
                const error = await res.text();
                toast.error(error);
              }
              setSaving(false);
            });
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [setData],
  );

  const [saving, setSaving] = useState(false);

  const saveDisabled = useMemo(() => {
    return !data.audio || saving;
  }, [data.audio, saving]);

  return (
    <>
      <input type="hidden" name="fileSrc" value={url} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="mime" value={mime} />
      {uploadComplete && (
        <div className="w-full overflow-hidden rounded-md bg-slate-50">
          <MediaPreview url={url} mime={mime} />
        </div>
      )}
      {!uploadComplete && (
        <div>
          {/* <div className="mb-4 space-y-1">
            <h2 className="text-xl font-semibold">Upload an audio file</h2>
            <p className="text-sm text-gray-500">
              Accepted formats: .mp3, .wav, .ogg
            </p>
          </div> */}
          {!data.audio && (
            <label
              htmlFor="audio-upload"
              className="group relative flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50 "
            >
              <UploadCloud width={22} className="text-gray-500" />
              <p className="mt-2 text-center text-sm text-gray-500">
                Drag and drop or click to upload.
              </p>
              <p className="mt-2 text-center text-sm text-gray-500">
                Max file size: 50MB
              </p>
            </label>
          )}
          {data.audio && (
            <div className="px-auto align-center flex w-full content-center items-center justify-center overflow-hidden rounded-md border bg-gray-50 p-4">
              <LoadingDots color="#808080" />
            </div>
          )}
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="audio-upload"
              name="audio"
              type="file"
              accept="*"
              className="sr-only"
              onChange={onChangeAudio}
            />
          </div>
        </div>
      )}
    </>
  );
}
