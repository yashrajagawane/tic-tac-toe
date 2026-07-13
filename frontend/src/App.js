import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppSettingsProvider } from "@/context/AppSettingsContext";
import Landing from "@/pages/Landing";
import Game from "@/pages/Game";

function App() {
  return (
    <div className="App grain">
      <AppSettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/play" element={<Game />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppSettingsProvider>
    </div>
  );
}

export default App;
