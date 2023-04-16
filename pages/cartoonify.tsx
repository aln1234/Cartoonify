import React from "react";
import "../app/globals.css";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import Toggle from "@/components/Toggle";

import Link from "next/link";
import Header from "../components/Header";
import Image from "next/image";
import { CompareSlider } from "@/components/CompareSlider";
import LoadingDots from "@/components/LoadingDots";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const uploader = Uploader({
  apiKey: "free",
});

const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: { colors: { primary: "#000" } },
};

export default function cartoonify() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
          generateCartoon(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generateCartoon(fileUrl: string) {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });

    let newPhoto = await res.json();
    if (res.status === 504) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast("The Model is booting up. Please wait...");
      setLoading(false);
    }
    if (res.status !== 200) {
      setError(newPhoto);
    } else {
      setRestoredImage(newPhoto);
    }
  }

  return (
    <div className="w-full h-screen">
      <Header />

      <main className="max-w-6xl mx-auto  pt-6 ">
        <ToastContainer />
        <h1 className="text-4xl font-bold text-center">Cartoonify any photo</h1>
        <div className="flex justify-center pt-4 ">
          {" "}
          <Toggle
            className={`${restoredLoaded ? "visible" : "invisible"} mb-6`}
            sideBySide={sideBySide}
            setSideBySide={(newVal) => setSideBySide(newVal)}
          />
        </div>
        {restoredLoaded && sideBySide && (
          <div className="flex justify-center items-center">
            {" "}
            <CompareSlider
              original={originalPhoto!}
              restored={restoredImage!}
            />
          </div>
        )}

        {!originalPhoto && (
          <div className="flex items-center gap-4 pt-6 justify-center">
            <img
              src={"/images/iu.jpeg"}
              alt="in images"
              className="rounded-full object-cover w-[220px]"
            />
            <img
              src={"/images/out.jpg"}
              alt="in images"
              className="rounded-full object-cover w-[230px]"
            />
          </div>
        )}

        <div className="flex items-center justify-center pt-6">
          {!originalPhoto && <UploadDropZone />}

          {originalPhoto && !restoredImage && (
            <Image
              alt="original photo"
              src={originalPhoto}
              width={475}
              height={475}
            />
          )}

          {restoredImage && originalPhoto && !sideBySide && (
            <div className="flex justify-center align-center gap-4">
              <div>
                <h2>Original Photo</h2>
                <Image
                  alt="original photo"
                  src={originalPhoto}
                  className="rounded-2xl"
                  width={475}
                  height={475}
                />
              </div>
              <div>
                <h2 className="mb-1 font-medium text-lg">Restored Photo</h2>
                <a href={restoredImage} target="_blank" rel="noreferrer">
                  <Image
                    alt="restored photo"
                    src={restoredImage}
                    className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in"
                    width={475}
                    height={475}
                    onLoadingComplete={() => setRestoredLoaded(true)}
                  />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2 justify-center pb-6">
          {originalPhoto && !loading && (
            <button
              onClick={() => {
                setOriginalPhoto(null);
                setRestoredImage(null);
                setRestoredLoaded(false);
                setError(null);
              }}
              className="bg-[#e17055] rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-[#fab1a0]"
            >
              Upload New Photo
            </button>
          )}
          {loading && (
            <button
              disabled
              className="bg-black rounded-full items-center text-white font-medium px-4 pt-2 pb-3  mt-8 hover:bg-black/80 w-40"
            >
              <span className="pt-4">
                <LoadingDots color="white" style="large" />
              </span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
