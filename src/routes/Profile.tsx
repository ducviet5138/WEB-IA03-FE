import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../stores/toastSlice";
import { TypeResponse } from "../types/response";
import { setValue } from "../stores/userSlice";
import { RootState } from "../stores";

export default function Profile() {
  const email = useSelector((state: RootState) => state.user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfileData = async () => {
      const endpoint = import.meta.env.VITE_ENDPOINT;
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(endpoint + "/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = (await response.json()) as TypeResponse;
        if (
          responseData.statusCode === 200 &&
          responseData.data.email !== email
        ) {
          dispatch(setValue({ email: responseData.data.email }));
        } else {
          throw new Error(responseData.message);
        }
      } catch (error: any) {
        dispatch(
          showToast({
            message: `Failed to fetch profile data: ${error.message}`,
            status: "error",
          })
        );
      }
    };

    fetchProfileData();
  }, [dispatch, email]);

  return (
    <div>
      <Typography variant="h6">Profile Page</Typography>
      {true ? (
        <div>
          <Typography variant="body1">Email: {email}</Typography>
        </div>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
}
