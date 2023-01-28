import axios from "axios";
import { ChangeEvent, useState } from "react";
import { PlotModel } from "../../models/PlotModel";
import { StoryModel } from "../../models/StoryModel";
import Cookies from "universal-cookie";
import { useAuth0 } from "@auth0/auth0-react";

const cookies = new Cookies();

type Props = {
  plot: PlotModel;
  loading: boolean;
  apiError: boolean;
  setApiError: (apiError: boolean) => void;
  setPlot: (plot: PlotModel) => void;
  setStory: (story: StoryModel) => void;
  setLoading: (loading: boolean) => void;
  language: any;
};

export default function Hero({
  setPlot,
  plot,
  loading,
  setStory,
  setLoading,
  apiError,
  setApiError,
  language,
}: Props) {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();

  return (
    <section className="w-full flex flex-col lg:flex-row">
      <div className="flex flex-col gap-4 pt-4 lg:pt-20">
        <div className="flex">
          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {language["onceUponATime"]}{" "}
          </h1>
          <input
            className="mx-4 text-themeAccent bg-transparent border-b-4 border-b-themeSecondary text-center font-title text-lg md:text-2xl"
            placeholder={language["mainCharacter"]}
            value={plot.main_character}
            onChange={(e) => handleMainCharacterChange(e)}
          ></input>
          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            ,
          </h1>
        </div>
        <div className="flex">
          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {" "}
            {language["withTheirFriends"]}{" "}
          </h1>
          <input
            className="mx-4 text-themeAccent bg-transparent border-b-4 border-b-themeSecondary text-center font-title text-lg md:text-2xl"
            placeholder={language["secondaryCharacters"]}
            value={plot.supporting_characters}
            onChange={(e) => handleSupportingCharacterChange(e)}
          ></input>
          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            ,
          </h1>
        </div>
        <div className="flex">
          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {" "}
            {language["against"]}{" "}
          </h1>
          <input
            className="mx-4 text-themeAccent bg-transparent border-b-4 border-b-themeSecondary text-center font-title text-lg md:text-2xl"
            placeholder={language["villain"]}
            value={plot.villain}
            onChange={(e) => handleVillainChange(e)}
          ></input>
          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            ,
          </h1>
        </div>
        <div className="flex">
          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {" "}
            {language["in"]}{" "}
          </h1>
          <input
            className="mx-4 text-themeAccent bg-transparent border-b-4 border-b-themeSecondary text-center font-title text-lg md:text-2xl"
            placeholder={language["detailPlace"]}
            value={plot.details}
            onChange={(e) => handleDetailsChange(e)}
          ></input>
          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            ,
          </h1>
        </div>
        <div className="flex">
          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {" "}
            {language["theme"]}{" "}
          </h1>
          <select
            onChange={(e) => handleThemeChange(e)}
            className="mx-4 text-themeAccent bg-transparent border-b-4 border-b-themeSecondary text-center font-title text-lg md:text-2xl"
          >
            <option selected>{language["select"]}</option>
            <option value="Romance">{language["romance"]}</option>
            <option value="Child">{language["child"]}</option>
            <option value="ScyFy">{language["scyFy"]}</option>
            <option value="Horror">{language["horror"]}</option>
            <option value="Motivational">{language["motivational"]}</option>
          </select>

          <h1 className="w-fit text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            .
          </h1>
        </div>
      </div>
      <div className="flex flex-col grow pt-12 lg:pt-0">
        <div className="md:grow flex">
          <span className="hidden xl:block text-[10vw]  h-fit mx-auto -z-10 text-themeShadeText font-theme">
            coralina
          </span>
        </div>
        {isAuthenticated && (
          <button
            className="p-2 text-2xl rounded-sm bg-themeAccent disabled:bg-themeShadeText disabled:text-themeSecondary h-fit font-action m-auto cursor-pointer"
            onClick={generateStory}
            disabled={
              !plot?.main_character ||
              !plot?.supporting_characters ||
              !plot?.villain ||
              !plot?.theme ||
              loading
            }
          >
            {language["writeMyStory"]}
          </button>
        )}
        {!isAuthenticated && (
          <span className="mx-auto text-2xl text-themeTextSecondary">
            {" "}
            Faça{" "}
            <button
              className="p-2 text-2xl rounded-sm bg-themeSecondary hover:bg-themeShadeText hover:text-themeSecondary h-fit font-action m-auto cursor-pointer"
              onClick={() => loginWithRedirect()}
            >
              login
            </button>
            {" para começar."}
          </span>
        )}
      </div>
    </section>
  );

  async function generateStory() {
    setLoading(true);
    setApiError(false);
    try {
      let plotTemp: PlotModel = Object.assign(new PlotModel(), plot);

      plotTemp.language = language["language"];

      const response = await axios.post<StoryModel>(
        import.meta.env.VITE_CORALINA_API_URL + "/generate",
        plotTemp,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.get("api_token"),
          },
        }
      );
      setStory(response.data);
    } catch (e) {
      setApiError(true);
    }
    setLoading(false);
  }

  function handleMainCharacterChange(e: ChangeEvent<HTMLInputElement>) {
    let plotCopy: PlotModel = Object.assign(new PlotModel(), plot);
    plotCopy.main_character = e.target.value;
    setPlot(plotCopy);
  }

  function handleSupportingCharacterChange(e: ChangeEvent<HTMLInputElement>) {
    let plotCopy: PlotModel = Object.assign(new PlotModel(), plot);
    plotCopy.supporting_characters = e.target.value;
    setPlot(plotCopy);
  }
  function handleVillainChange(e: ChangeEvent<HTMLInputElement>) {
    let plotCopy: PlotModel = Object.assign(new PlotModel(), plot);
    plotCopy.villain = e.target.value;
    setPlot(plotCopy);
  }
  function handleDetailsChange(e: ChangeEvent<HTMLInputElement>) {
    let plotCopy: PlotModel = Object.assign(new PlotModel(), plot);
    plotCopy.details = e.target.value;
    setPlot(plotCopy);
  }
  function handleThemeChange(e: ChangeEvent<HTMLSelectElement>) {
    let plotCopy: PlotModel = Object.assign(new PlotModel(), plot);
    plotCopy.theme = e.target.value;
    setPlot(plotCopy);
  }
}
