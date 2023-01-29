import axios, { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
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
  setOutOfTokens: (outOfTokens: boolean) => void;
  outOfTokens: boolean;
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
  outOfTokens,
  setOutOfTokens
}: Props) {
  const {
    loginWithRedirect,
    getAccessTokenSilently,
    loginWithPopup,
    user,
    isAuthenticated,
    isLoading,
    logout,
  } = useAuth0();

  

  return (
    <section className="w-full flex flex-col lg:flex-row">
      <div className="flex flex-col gap-4 pt-4 lg:pt-20">
        <div className="flex flex-col md:flex-row justify-center">
          <h1 className="w-fit mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {language["onceUponATime"]}{" "}
          </h1>
          <div className="md:grow"></div>
          <input
            className="mx-4 text-themeAccent bg-transparent border-b-4 border-b-themeSecondary text-center font-title text-lg md:text-2xl"
            placeholder={language["mainCharacter"]}
            value={plot.main_character}
            onChange={(e) => handleMainCharacterChange(e)}
          ></input>
          <h1 className="w-fit hidden md:block mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            ,
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <h1 className="w-fit mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {" "}
            {language["withTheirFriends"]}{" "}
          </h1>
          <div className="md:grow"></div>
          <input
            className="mx-4 text-themeAccent bg-transparent border-b-4 border-b-themeSecondary text-center font-title text-lg md:text-2xl"
            placeholder={language["secondaryCharacters"]}
            value={plot.supporting_characters}
            onChange={(e) => handleSupportingCharacterChange(e)}
          ></input>
          <h1 className="w-fit hidden md:block mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            ,
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <h1 className="w-fit mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {" "}
            {language["against"]}{" "}
          </h1>
          <div className="md:grow"></div>
          <input
            className="mx-4 text-themeAccent bg-transparent border-b-4 border-b-themeSecondary text-center font-title text-lg md:text-2xl"
            placeholder={language["villain"]}
            value={plot.villain}
            onChange={(e) => handleVillainChange(e)}
          ></input>
          <h1 className="w-fit hidden md:block mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            ,
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <h1 className="w-fit mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {" "}
            {language["in"]}{" "}
          </h1>
          <div className="md:grow"></div>
          <input
            className="mx-4 text-themeAccent bg-transparent border-b-4 border-b-themeSecondary text-center font-title text-lg md:text-2xl"
            placeholder={language["detailPlace"]}
            value={plot.details}
            onChange={(e) => handleDetailsChange(e)}
          ></input>
          <h1 className="w-fit hidden md:block mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            ,
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <h1 className="w-fit mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            {" "}
            {language["theme"]}{" "}
          </h1>
          <div className="md:grow"></div>
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

          <h1 className="w-fit hidden md:block mx-auto md:ml-0 text-2xl md:text-5xl text-themeTextSecondary font-title font-semibold">
            .
          </h1>
        </div>
      </div>
      <div className="flex flex-col grow pt-12 lg:pt-0">
        <div className="md:grow flex">
          <span className="hidden xl:block text-[7vw]  h-fit mx-auto -z-10 text-themeShadeText font-theme">
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
            {language["do"]}{" "}
            <button
              className="p-2 text-2xl rounded-sm bg-themeSecondary hover:bg-themeShadeText hover:text-themeSecondary h-fit font-action m-auto cursor-pointer"
              onClick={() => handleLogin()}
            >
              login
            </button>
            {language["toStart"]}
          </span>
        )}
      </div>
    </section>
  );

  async function generateStory() {
    setLoading(true);
    setApiError(false);
    setOutOfTokens(false);
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
      const err = e as AxiosError;
      if(err.response?.status === 402) {
        setOutOfTokens(true);
      }
      
      setApiError(true);
    }
    setLoading(false);
  }

  function parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
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
  async function handleLogin() {
    try {
      const authResult = await loginWithPopup();
      const token = await getAccessTokenSilently({});
      cookies.set("api_token", `Bearer ${token}`);

      const parsedToken = parseJwt(token);
      const userName = parsedToken["https://coralina.app/nickname"];

      try {
        await axios.get(
          import.meta.env.VITE_CORALINA_API_URL + "/user/" + userName,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          }
        );
      } catch (e) {
        await axios.post(
          import.meta.env.VITE_CORALINA_API_URL + "/user" || "",
          {
            user_login: userName,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
}
