import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Cookies from "universal-cookie";
import { UserModel } from "../models/UserModel";
import { StoryModel } from "../models/StoryModel";
import Modal from "../components/Modal";
import Story from "../components/Story";

const cookies = new Cookies();

export default function ProfilePage() {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();

  const [userData, setUserData] = useState<UserModel>();
  const [stories, setStories] = useState<StoryModel[]>();
  const [selectedStory, setSelectedStory] = useState<StoryModel>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (user) {
        const response = await axios.get(
          import.meta.env.VITE_CORALINA_API_URL + "/user/" + user?.nickname,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          }
        );

        setUserData(response.data);

        const storiesResponse = await axios.get(
          import.meta.env.VITE_CORALINA_API_URL + "/stories/" + user?.nickname,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          }
        );

        setStories(storiesResponse.data);
      }
    })();
  }, [user]);

  return (
    <MainLayout>
      <div className="w-full flex flex-col gap-2  center">
        <h1 className="text-themeTextSecondary text-5xl font-theme mx-auto mt-2">
          {user?.name}
        </h1>
        <div className="flex m-auto gap-2">
          <span className="text-xl text-themeSecondary font-theme font-semibold">
            Tokens:{" "}
          </span>
          <span className="text-xl text-themeTextSecondary font-theme">
            {userData?.tokens}{" "}
          </span>
        </div>
        <button
          className="bg-themeAccent w-fit mx-auto p-2 font-action mt-6"
          onClick={() => logout()}
        >
          Logout
        </button>

        {!selectedStory && (
          <>
            <h2 className="text-4xl text-themeText font-theme mx-auto mt-10">
              Minhas Histórias
            </h2>

            <div className="flex flex-wrap w-full md:px-12 gap-4 justify-center pt-8 mb-20">
              {stories?.map((story) => {
                return (
                  <div className="lg:w-1/4 md:w-1/3 w-full flex flex-col border-2 gap-2 border-themeSecondary">
                    <img src={story.paragraphs[0].image_url} />
                    <p className="text-lg text-themeText font-theme">
                      {story.paragraphs[0].text.substring(0, 140) + " [...]"}
                    </p>
                    <div className="grow"></div>
                    <span
                      className="text-md font-action text-themeTextSecondary text-right hover:underline hover:font-semibold cursor-pointer"
                      onClick={() => handleSelectStory(story)}
                    >
                      Ver história completa
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {selectedStory && (
          <div className="flex flex-col mb-20">
            <Story story={selectedStory} />
            <button onClick={() => setSelectedStory(undefined)} className="bg-themeTextSecondary w-fit mx-auto p-2 font-action mt-6">
              Ver Todas as Histórias
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );

  function handleSelectStory(story: StoryModel) {
    setSelectedStory(story);
    setIsModalOpen(true);
  }
}
