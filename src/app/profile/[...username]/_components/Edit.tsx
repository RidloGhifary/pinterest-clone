"use client";

import { Toast } from "@/lib/alert";
import { useSession } from "next-auth/react";
import EditForm from "./EditForm";
import { useState } from "react";
import Image from "next/image";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "@/lib/firebase/init";

export default function Edit() {
  const { status, data } = useSession();
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [urlImage, setUrlImage] = useState<any>(null);
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);

  if (status === "loading") {
    return <p>...</p>;
  }

  const handleUploadImage = (e: any) => {
    e.preventDefault();
    setIsUploadLoading(true);

    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      Toast.fire({
        icon: "error",
        title: "File size should not exceed 2 MB",
      });
      setIsUploadLoading(false);
      return;
    }
    setPreviewImage(URL.createObjectURL(file));
    setUrlImage(file);
    setIsUploadLoading(false);
  };

  const storage = getStorage(app, "gs://pinterestclone-7ec03.appspot.com");
  function uploadFileStorage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const metadata = {
        contentType: file.type || "application/octet-stream", // Use file type if available
      };

      const storageRef = ref(storage, `${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (_) => {
          // Track upload progress here if needed
        },
        (error) => {
          console.log("🚀 ~ returnnewPromise ~ error:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });
  }

  const handleSubmitForm = async (values: any) => {
    let profilePictureUrl = data?.user?.image;
    if (urlImage) {
      try {
        profilePictureUrl = await uploadFileStorage(urlImage);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Upload failed",
        });
        return;
      }
    }

    const datas = { email: data?.user?.email, profilePictureUrl, ...values };

    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });

    if (!res.ok) {
      Toast.fire<any>({
        icon: "error",
        title: "Update failed",
      });
      return;
    }

    Toast.fire<any>({
      icon: "success",
      title: "Update successfully",
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg">
        <h2 className="text-left text-5xl font-semibold leading-9 tracking-tight md:text-7xl">
          Edit Profile
        </h2>
        <p className="text-left">
          Keep your profile up to date with your information.
        </p>
        <div className="mt-10 space-y-8">
          <div className="flex items-center gap-6">
            {previewImage ? (
              <Image
                src={previewImage}
                alt="preview-image"
                loading="lazy"
                width={300}
                height={300}
                className="h-20 w-20 rounded-full"
              />
            ) : data?.user?.image ? (
              <Image
                src={data?.user?.image}
                alt="preview-image"
                loading="lazy"
                width={300}
                height={300}
                className="h-20 w-20 rounded-full"
              />
            ) : (
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full bg-light-gray text-4xl`}
              >
                X
              </div>
            )}

            <div>
              <label
                htmlFor="file"
                className="cursor-pointer rounded-full bg-light-gray px-6 py-3 transition hover:bg-light-gray/70"
              >
                Change
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={(e: any) => handleUploadImage(e)}
              />
            </div>
            {isUploadLoading && <span>Loading...</span>}
          </div>
          <EditForm user={data?.user} handleSubmitForm={handleSubmitForm} />
        </div>
      </div>
    </div>
  );
}
