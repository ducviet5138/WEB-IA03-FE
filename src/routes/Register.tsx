import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeZRegister, zRegister } from "../types/schema/register";
import { Stack, TextField, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import Toast from "../components/Toast";
import { TypeResponse } from "../types/response";

export default function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TypeZRegister>({
    resolver: zodResolver(zRegister),
    mode: "all",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastStatus, setToastStatus] = useState<"success" | "error">(
    "success"
  );

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
        setToastMessage("Registration successful");
        setToastStatus("success");
      } else {
        throw new Error(responseData.message);
      }
    } catch (error: any) {
      setToastMessage(`Registration failed: ${error.message}`);
      setToastStatus("error");
    }
  };

  const handleCloseToast = () => {
    setToastMessage(null);
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
          {" "}
          Register{" "}
        </Button>
      </Stack>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={handleCloseToast}
          status={toastStatus}
        />
      )}
    </Box>
  );
}
