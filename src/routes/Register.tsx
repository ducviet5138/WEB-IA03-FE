import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeZRegister, zRegister } from "../types/schema/register";
import { Stack, TextField, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import Toast from "../components/Toast";

export default function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TypeZRegister>({
    resolver: zodResolver(zRegister),
    mode: "all",
  });

  const [showToast, setShowToast] = useState(false);

  const onSubmit = (data: TypeZRegister) => {
    console.log(data);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack sx={{ gap: 2, width: '50%'}}>
        <Typography variant="h4" sx={{ marginBottom: '8px' }}>Create a new account</Typography>
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
        <Button variant="contained" type="submit" fullWidth onClick={handleSubmit(onSubmit)}> Register </Button>
      </Stack>
      {showToast && <Toast message="Registration successful!" onClose={handleCloseToast} status="error"/>}
    </Box>
  );
}