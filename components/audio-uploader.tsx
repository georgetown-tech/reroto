"use client";

import { useState, useCallback, useMemo, ChangeEvent } from "react";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import LoadingDots from "@/components/icons/loading-dots";

export default function AudioUploader() {
  const [data, setData] = useState<{
    audio: string | null;
  }>({
    audio: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false); // New state for tracking upload completion

  const [dragActive, setDragActive] = useState(false);

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
      <input type="hidden" name="audioSrc" value={data.audio || ""} />
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
            <div>
              <audio
                controls
                className="w-full overflow-hidden rounded-md"
                style={{ backgroundColor: "#f3f3f3" }}
              >
                <source
                  src={data.audio || ""}
                  type={file?.type || "audio/mp3"}
                />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="audio-upload"
              name="audio"
              type="file"
              accept="audio/*"
              className="sr-only"
              onChange={onChangeAudio}
            />
          </div>
        </div>
      )}
    </>
  );
}
