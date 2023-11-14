import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../Redux/user/userSlice";

export default async function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("aesthetic_jwt");

    if (localAuth) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        headers: {
          authorization: `bearer ${localAuth}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            dispatch(
              userLoggedIn({
                token: localAuth,
                data: data,
              })
            );
          }
        })
        .finally(() => {
          setAuthChecked(true);
        });
    }
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
