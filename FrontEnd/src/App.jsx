import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppRouter } from "./router/AppRouter";
import { Box, Container } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Box id="body">
      <Header id="header" />
      <Container id="main" component="main" maxWidth="md">
        <AppRouter />
      </Container>
      <Box component="footer" sx={{ p: 2 }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
