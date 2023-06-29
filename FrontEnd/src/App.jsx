import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppRouter } from "./router/AppRouter";
import { Box, Container } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "secondary.main",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth="md"
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "start",
          marginTop: "32px",
        }}
      >
        <AppRouter />
      </Container>
      <Box component="footer" sx={{ p: 2 }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
