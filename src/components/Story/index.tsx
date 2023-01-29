import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ParagraphModel, StoryModel } from "../../models/StoryModel";

type Props = {
  story: StoryModel;
  language: any;
};

export default function Story({ story, language }: Props) {
  const [imgMap, setImgMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    (async () => {
      story.paragraphs.map(async (paragraph: ParagraphModel) => {
        const image = await fetchImage(paragraph.image_url);
        const url = paragraph.image_url;

        setImgMap({ ...imgMap, ...{ url: image } });
      });
    })();
  }, []);

  async function fetchImage(src: string) {
    try {
      const response = await axios.get(src);
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:;base64,${base64}`;
    } catch (e) {
      const err = e as AxiosError;
      console.log(JSON.stringify(err));
      return "";
    }
  }

  return (
    <section className="w-full flex flex-col mt-10">
      <h2 className="text-4xl my-10 text-themeText font-theme">
        {language["myStory"]}
      </h2>
      {story.paragraphs.map((paragraph, index) => {
        return (
          <>
            <div className="mb-10">
              <img
                className={`md:w-2/12 ${
                  index % 2 === 0 ? "md:float-left" : "md:float-right"
                } mr-4 mb-2`}
                src={"https://coralina.storage.googleapis.com/" + paragraph.image_url.split("/")[paragraph.image_url.split("/").length - 1]}
              />
              <p className="font-theme text-themeText text-xl">
                {paragraph.text}
              </p>
            </div>
          </>
        );
      })}
    </section>
  );
}
