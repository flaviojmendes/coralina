import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { PlotModel } from "../models/PlotModel";
import { StoryModel } from "../models/StoryModel";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { Comment } from "react-loader-spinner";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import Story from "../components/Story";

export default function HomePage() {
  let [plot, setPlot] = useState<PlotModel>({});
  const [story, setStory] = useState<StoryModel>();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  return (
    <MainLayout>
      <div className="w-full overflow-hidden p-2">
        <div className="flex flex-col mx-auto bg-storyLight mt-8 rounded-md px-4 md:px-36">
          {
            <Hero
              apiError={apiError}
              setApiError={setApiError}
              plot={plot}
              loading={loading}
              setStory={setStory}
              setPlot={setPlot}
              setLoading={setLoading}
            />
          }
          {loading && (
            <div className="w-full flex mt-20">
              <div className="grow"></div>
              <Comment
                visible={true}
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass=""
                color="#fff"
                backgroundColor="#67eaa2"
              />
              <h3 className="text-xl text-themeText font-theme my-auto">
                escrevendo sua história..(isso pode demorar alguns minutos)
              </h3>
              <div className="grow"></div>
            </div>
          )}
          {apiError && (
            <div className="w-full flex mt-20">
              <div className="grow"></div>
              
              <h3 className="text-xl text-themeAccent font-theme my-auto">
                Desculpe, algo errado ocorreu. Favor tentar novamente.
              </h3>
              <div className="grow"></div>
            </div>
          )}

          {!loading && story && <Story story={story} />}
        </div>
      </div>
    </MainLayout>
  );
}
