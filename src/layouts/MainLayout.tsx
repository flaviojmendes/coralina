import { useAuth0 } from "@auth0/auth0-react";
import {FaGithub, FaQuestionCircle, FaUser} from "react-icons/fa"

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();

  return (
    <div>
      <div className="flex sticky top-0 h-12 w-full bg-themeBackground gap-4 border-b-2 border-b-themeShadeText">
        <a
          href="/"
          className="my-auto ml-4 text-themeText font-theme font-semibold text-2xl"
        >
          coralina
        </a>
        <div className="grow"></div>
        <a
          href=""
          className="my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary hidden md:block"
        >
          about
        </a>
        <a
          href=""
          className="my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary md:hidden block"
        >
          <FaQuestionCircle/>
        </a>
        <div className="w-1 h-full bg-themeShadeText"></div>
        <a
          href=""
          className="my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold hover:border-b-2 hover:border-b-themeSecondary hidden md:block"
        >
          github
        </a>
        <a
          href=""
          className="my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold hover:border-b-2 hover:border-b-themeSecondary md:hidden block"
        >
          <FaGithub/>
        </a>
        <div className="w-1 h-full bg-themeShadeText"></div>
        {!isAuthenticated && (
          <a
            onClick={() => loginWithRedirect()}
            className="mr-4 my-auto cursor-pointer text-themeText font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary"
          >
            login
          </a>
        )}
        {isAuthenticated && (
          <>
            <a href={"/profile"} className="mr-4 my-auto cursor-pointer text-themeTextSecondary font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary hidden md:block">
              {user?.name}
            </a>

            <a href={"/profile"} className="mr-4 my-auto cursor-pointer text-themeTextSecondary font-theme text-lg hover:font-semibold  hover:border-b-2 hover:border-b-themeSecondary block md:hidden">
              <FaUser/>
            </a>
          </>
        )}
      </div>
      {children}
    </div>
  );
}