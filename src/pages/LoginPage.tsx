import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function LoginPage() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const token = await getAccessTokenSilently({});
        cookies.set("api_token", `Bearer ${token}`);

        try {
          await axios.get(import.meta.env.VITE_CORALINA_API_URL + "/user/" + user?.nickname, {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          });
        } catch (e) {
          await axios.post(
            import.meta.env.VITE_CORALINA_API_URL + "/user" || "",
            {
              user_login: user?.nickname
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: cookies.get("api_token"),
              },
            },
          );
        }
        document.location.href = "/";
      })();
    }
  }, [getAccessTokenSilently, isAuthenticated, user?.email, user?.nickname]);

  return <></>;
}
