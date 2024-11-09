import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../stores";

export default function Homepage() {
  const email = useSelector((state: RootState) => state.user.email);

  return (
    <>
      <Typography variant="h6">Home Page</Typography>
      {email ? (
        <Typography variant="body1">Welcome, {email}!</Typography>
      ) : (
        <Typography variant="body1">Welcome, Guest!</Typography>
      )}
    </>
  );
}
