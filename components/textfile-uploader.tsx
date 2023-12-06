import { useState, useCallback, useMemo, ChangeEvent } from "react";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import LoadingDots from "@/components/icons/loading-dots";

export default function TextFileUploader() {
  const [data, setData] = useState<{
    text: string | null;
  }>({
    text: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [saving, setSaving] = useState(false);

  const onChangeTextFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0];
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error("File size too big (max 50MB)");
        } else {
          setFile(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setSaving(true);
            setData((prev) => ({ ...prev, text: e.target?.result as string }));
            setSaving(false);
          };
          reader.readAsText(file); // Read file as text
        }
      }
    },
    [setData],
  );

  const saveDisabled = useMemo(() => {
    return !data.text || saving;
  }, [data.text, saving]);

  return (
    <>
      <input type="hidden" name="textFileSrc" value={data.text || ""} />
      {!uploadComplete && (
        <div>
          {!data.text && (
            <label
              htmlFor="text-file-upload"
              className="group relative flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
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
          {data.text && (
            <div>
              <textarea
                value={data.text}
                className="mt-2 h-48 w-full resize-none overflow-auto rounded-md border p-2"
                readOnly
              />
            </div>
          )}
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="text-file-upload"
              name="textFile"
              type="file"
              accept="text/*" // Accept text files
              className="sr-only"
              onChange={onChangeTextFile}
            />
          </div>
        </div>
      )}
    </>
  );
}
