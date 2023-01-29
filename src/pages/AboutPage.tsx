import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Cookies from "universal-cookie";
import { UserModel } from "../models/UserModel";
import { StoryModel } from "../models/StoryModel";
import Modal from "../components/Modal";
import Story from "../components/Story";
import { useParams } from "react-router-dom";
import { en, ptBr } from "../translation/strings";
import { useLocalStorage } from "react-use";
import { RotatingSquare } from "react-loader-spinner";

const cookies = new Cookies();

export default function AboutPage() {
  const [appLanguageStored, setAppLanguageStored] = useLocalStorage(
    "appLanguage",
    "en"
  );
  const [appLanguage, setAppLanguage] = useState<any>(en);
  const { language } = useParams<string>();

  useEffect(() => {
    if (!language && !appLanguageStored) {
      setAppLanguage(en);
    } else if (language === "pt" || language === "br") {
      setAppLanguage(ptBr);
      setAppLanguageStored("pt");
    } else if (language === "en") {
      setAppLanguage(en);
      setAppLanguageStored("en");
    } else if (appLanguageStored === "pt") {
      setAppLanguage(ptBr);
    }
  }, []);

  return (
    <MainLayout language={appLanguage}>
      <div className="w-full flex flex-col gap-2 center px-20">
        <h1 className="text-4xl font-theme text-themeTextSecondary my-10">
          about<span className="text-themeSecondary"> coralina</span>
        </h1>

        <p className="text-themeText font-theme text-2xl ">
          {appLanguage["about"]}
        </p>
        <p className="text-themeText font-theme text-2xl ">
          {appLanguage["about2"]}
        </p>

        <h1 className="text-4xl font-theme text-themeTextSecondary my-10">
          open<span className="text-themeSecondary"> source</span>
        </h1>

        <p className="text-themeText font-theme text-2xl ">
          {appLanguage['openSource']}
        </p>

        <h1 className="text-4xl font-theme text-themeTextSecondary my-10">
          terms<span className="text-themeSecondary"> of use</span>
        </h1>

        <p className="text-themeText font-theme text-2xl ">
          {appLanguage['termsUse']}
        </p>
      </div>
    </MainLayout>
  );
}
