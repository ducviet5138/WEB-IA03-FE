import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeZRegister, zRegister } from "../types/schema/register";
import { Stack, TextField, Box, Typography, Button } from "@mui/material";
import { TypeResponse } from "../types/response";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../stores/toastSlice";
import { RootState } from "../stores";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TypeZRegister>({
    resolver: zodResolver(zRegister),
    mode: "all",
  });

  const toast = useSelector((state: RootState) => state.toast.toast);
  const dispatch = useDispatch();

  const onSubmit = async (data: TypeZRegister) => {
    const endpoint = import.meta.env.VITE_ENDPOINT;
    try {
      const response = await fetch(endpoint + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = (await response.json()) as TypeResponse;
      if (responseData.statusCode === 200) {
        dispatch(showToast({ message: "Login successful", status: "success" }));
        localStorage.setItem("token", responseData.data.token);
        window.location.href = "/profile";
      } else {
        throw new Error(responseData.message);
      }
    } catch (error: any) {
      dispatch(
        showToast({
          message: `Login failed: ${error.message}`,
          status: "error",
        })
      );
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ gap: 2, width: "50%" }}>
        <Typography variant="h4" sx={{ marginBottom: "8px" }}>
          Login
        </Typography>
        <TextField
          {...register("email")}
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
      </Stack>
      {toast}
    </Box>
  );
}
