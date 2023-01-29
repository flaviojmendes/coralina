import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { PlotModel } from "../models/PlotModel";
import { StoryModel } from "../models/StoryModel";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { Comment } from "react-loader-spinner";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import Story from "../components/Story";
import { useParams } from "react-router-dom";
import { en, ptBr } from "../translation/strings";
import { useLocalStorage } from "react-use";

export default function HomePage() {
  let [plot, setPlot] = useState<PlotModel>({});
  const [story, setStory] = useState<StoryModel>();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [appLanguage, setAppLanguage] = useState<any>(en);
  const { language } = useParams<string>();
  const [outOfTokens, setOutOfTokens] = useState(false);
  const [appLanguageStored, setAppLanguageStored] = useLocalStorage(
    "appLanguage",
    "en"
  );
  useEffect(() => {

    if (!language && !appLanguageStored) {
      setAppLanguage(en)
    } else if (language === "pt" || language === "br") {
      setAppLanguage(ptBr);
      setAppLanguageStored("pt")
    } else if (language === 'en') {
      setAppLanguage(en);
      setAppLanguageStored("en");
    }  else if(appLanguageStored === 'pt') {
      setAppLanguage(ptBr);
    }
    
    
  }, []);

  return (
    <MainLayout language={appLanguage}>
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
              language={appLanguage}
              outOfTokens={outOfTokens}
              setOutOfTokens={setOutOfTokens}
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
                {appLanguage["writingStory"]}
              </h3>
              <div className="grow"></div>
            </div>
          )}
          {apiError && (
            <div className="w-full flex mt-20">
              <div className="grow"></div>

              {!outOfTokens && (
                <h3 className="text-xl text-themeAccent font-theme my-auto">
                  {appLanguage["storyError"]}
                </h3>
              )}

              {outOfTokens && (
                <h3 className="text-xl text-themeAccent font-theme my-auto">
                  {appLanguage["outOfTokens"]}
                </h3>
              )}
              <div className="grow"></div>
            </div>
          )}

          {!loading && story && <Story story={story} language={language} />}
        </div>
      </div>
    </MainLayout>
  );
}
