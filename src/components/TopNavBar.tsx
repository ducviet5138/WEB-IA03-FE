import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function TopAppBar() {
  return (
    <Box sx={{ flexGrow: 1, width: "100vw", height: "64px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IA03 - User Registration API with React Frontend
          </Typography>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button color="inherit" href="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
