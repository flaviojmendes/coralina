import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { FaGithub, FaQuestionCircle, FaUser } from "react-icons/fa";

import Cookies from "universal-cookie";

const cookies = new Cookies();
type Props = {
  children?: React.ReactNode;
  language: any;
};

export default function MainLayout({ children, language }: Props) {
  const {
    loginWithRedirect,
    loginWithPopup,
    getAccessTokenSilently,
    user,
    isAuthenticated,
    isLoading,
    logout,
  } = useAuth0();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex sticky top-0 h-12 w-full bg-themeBackground gap-4 border-b-2 border-b-themeShadeText">
        <a
          href={`/`}
          className="my-auto ml-4 text-themeText font-theme font-semibold text-2xl"
        >
          coralina
        </a>
        <div className="grow"></div>
        <a href={"/en"} className="text-2xl my-auto">🇬🇧</a>
        <div className="w-1 h-full bg-themeShadeText"></div>

        <a href={"/pt"} className="text-2xl my-auto">🇧🇷</a>
        <div className="w-1 h-full bg-themeShadeText"></div>
        <a
          href="/about"
          className="my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary hidden md:block"
        >
          about
        </a>
        <a
          href="/about"
          className="my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary md:hidden block"
        >
          <FaQuestionCircle />
        </a>
        <div className="w-1 h-full bg-themeShadeText"></div>
        <a
          target={"_blank"}
          href="https://github.com/flaviojmendes/coralina"
          className="my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold hover:border-b-2 hover:border-b-themeSecondary hidden md:block"
        >
          github
        </a>
        <a
          target={"_blank"}
          href="https://github.com/flaviojmendes/coralina"
          className="my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold hover:border-b-2 hover:border-b-themeSecondary md:hidden block"
        >
          <FaGithub />
        </a>
        <div className="w-1 h-full bg-themeShadeText"></div>
        {!isAuthenticated && (
          <a
            onClick={() => handleLogin()}
            className="mr-4 my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary"
          >
            login
          </a>
        )}
        {isAuthenticated && (
          <>
            <a
              href={"/profile/"}
              className="mr-4 my-auto cursor-pointer text-themeTextSecondary font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary hidden md:block"
            >
              {user?.name}
            </a>

            <a
              href={"/profile/"}
              className="mr-4 my-auto cursor-pointer text-themeTextSecondary font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary block md:hidden"
            >
              <FaUser />
            </a>
          </>
        )}
      </div>
      <div className="grow">{children}</div>
      <footer className="text-center py-4 w-full text-themeTextSecondary font-theme select-none px-10 xl:px-64 text-red">
        <span className="">{language["createdBy"]} </span>
        <a
          target={"_blank"}
          className="text-themeSecondary hover:underline hover:font-semibold"
          href="https://github.com/flaviojmendes"
        >
          flaviojmendes
        </a>
        {" | "}
        <a href={"/en"}>🇬🇧</a>
        {" | "}

        <a href={"/pt"}>🇧🇷</a>
      </footer>
    </div>
  );

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
