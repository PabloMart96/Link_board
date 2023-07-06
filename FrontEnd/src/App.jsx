import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppRouter } from "./router/AppRouter";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to bottom, #134e5e, #71b280)',
        minHeight: "100vh",
        position: 'relative',
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
          margin: '2rem',
        }}
      >
        <AppRouter />
      </Container>
      <Box component="footer" sx={{ position: 'absolute', bottom: 0, padding: 2, background: 'transparent' }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
