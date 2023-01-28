import { StoryModel } from "../../models/StoryModel";

type Props = {
  story: StoryModel;
  language: any;
};

export default function Story({ story, language }: Props) {
  return (
    <section className="w-full flex flex-col mt-10">
      <h2 className="text-4xl my-10 text-themeText font-theme">{language["myStory"]}</h2>
      {story.paragraphs.map((paragraph, index) => {
        return (
          <>
            <div className="mb-10">
              <img
                className={`md:w-2/12 ${index % 2 === 0 ? 'md:float-left' : 'md:float-right'} mr-4 mb-2`}
                src={paragraph.image_url}
              />
              <p className="font-theme text-themeText text-xl">{paragraph.text}</p>
            </div>
          </>
        );
      })}
    </section>
  );
}
