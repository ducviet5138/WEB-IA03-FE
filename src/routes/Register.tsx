import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeZRegister, zRegister } from "../types/schema/register";
import { Stack, TextField, Box, Typography, Button } from "@mui/material";
import { TypeResponse } from "../types/response";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../stores/toastSlice";
import { RootState } from "../stores";

export default function Register() {
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
      const response = await fetch(endpoint + "/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = (await response.json()) as TypeResponse;
      if (responseData.statusCode === 200) {
        dispatch(
          showToast({ message: "Registration successful", status: "success" })
        );
      } else {
        throw new Error(responseData.message);
      }
    } catch (error: any) {
      dispatch(
        showToast({
          message: `Registration failed: ${error.message}`,
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
          Create a new account
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
          Register
        </Button>
      </Stack>
      {toast}
    </Box>
  );
}
