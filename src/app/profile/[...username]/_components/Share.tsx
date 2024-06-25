"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
} from "react-share";

export default function Share() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const url =
    "https://nextjs.org/docs/app/building-your-application/routing/parallel-routes";

  const handleOpenShareModal = (e: any) => {
    if (isOpen && e.target !== ref.current) setIsOpen(!isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <button
      ref={ref}
      onClick={(e) => handleOpenShareModal(e)}
      className={`relative rounded-full ${isOpen ? "bg-black text-white" : "bg-light-gray hover:bg-light-gray/80"} px-6 py-3`}
    >
      Share
      {isOpen && (
        <div
          ref={ref}
          className="absolute -bottom-32 right-1/2 min-w-[400px] translate-x-1/2 rounded-lg bg-white p-6 shadow-lg"
        >
          <p className="mb-4 text-center text-black">Let people know</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <FacebookShareButton url={url}>
              <Image
                src="/share-button-icon/facebook.png"
                width={50}
                height={50}
                alt="facebook"
                className="h-10 w-10 cursor-pointer rounded-full transition hover:scale-105"
              />
            </FacebookShareButton>
            <WhatsappShareButton url={url}>
              <Image
                src="/share-button-icon/whatsapp.png"
                width={50}
                height={50}
                alt="whatsapp"
                className="h-10 w-10 cursor-pointer rounded-full transition hover:scale-105"
              />
            </WhatsappShareButton>
            <LinkedinShareButton url={url}>
              <Image
                src="/share-button-icon/linkedIn.png"
                width={50}
                height={50}
                alt="linkedIn"
                className="h-10 w-10 cursor-pointer rounded-full transition hover:scale-105"
              />
            </LinkedinShareButton>
            <TwitterShareButton url={url}>
              <Image
                src="/share-button-icon/x.png"
                width={50}
                height={50}
                alt="x"
                className="h-10 w-10 cursor-pointer rounded-full transition hover:scale-105"
              />
            </TwitterShareButton>
            <TelegramShareButton url={url}>
              <Image
                src="/share-button-icon/telegram.png"
                width={50}
                height={50}
                alt="telegram"
                className="h-10 w-10 cursor-pointer rounded-full transition hover:scale-105"
              />
            </TelegramShareButton>
          </div>
        </div>
      )}
    </button>
  );
}
