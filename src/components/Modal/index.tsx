import { useState } from "react";
import { StoryModel } from "../../models/StoryModel";

type Props = {
  title: string;
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  story?: StoryModel;
};
export default function Modal({ title, story, isOpen, setIsModalOpen }: Props) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center px-4 py-6 overflow-y-auto">
          <div className="relative bg-themeShadeText w-full  shadow-lg">
            <div className="relative px-6 py-4">
              

              {story?.paragraphs.map((paragraph, index) => {
                return (
                  <>
                    <div className="">
                      <img
                        className={`md:w-2/12 ${
                          index % 2 === 0 ? "md:float-left" : "md:float-right"
                        } mr-4 mb-2`}
                        src={paragraph.image_url}
                      />
                      <p className="font-theme text-themeText text-xl">
                        {paragraph.text}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
            <button
              className="absolute top-0 right-0 p-2"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
