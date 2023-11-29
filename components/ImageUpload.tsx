// import Image from "next/image";
// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";

// interface DropzoneProps {
//   onChange: (base64: string) => void;
//   label: string;
//   value?: string;
//   disabled?: boolean;
// }

// const ImageUpload: React.FC<DropzoneProps> = ({
//   onChange,
//   label,
//   value,
//   disabled,
// }) => {
//   const [base64, setBase64] = useState(value);

//   const handleChange = useCallback(
//     (base64: string) => {
//       onChange(base64);
//     },
//     [onChange]
//   );

//   const handleDrop = useCallback(
//     (files: any) => {
//       const file = files[0];
//       const reader = new FileReader();
//       reader.onload = (event: any) => {
//         setBase64(event.target.result);
//         handleChange(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     },
//     [handleChange]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     maxFiles: 1,
//     onDrop: handleDrop,
//     disabled,
//     accept: {
//       "image/jpeg": [],
//       "image/png": [],
//     },
//   });

//   return (
//     <div
//       {...getRootProps({
//         className:
//           "w-full p-4  text-center border-2 border-dotted rounded-md border-neutral-700",
//       })}
//     >
//       <input {...getInputProps()} />
//       {base64 ? (
//         <div className="flex items-center justify-center">
//           <Image src={base64} height="100" width="100" alt="Uploaded image" />
//         </div>
//       ) : (
//         <p className="">{label}</p>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;

"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  text?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  text,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value?.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} size="sm">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="sf4vsqtt">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              {text || "Upload Image"}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
