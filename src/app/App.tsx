import { useCallback, useState } from "react";
import { ToastContainer } from "@/components/feedback/Feedback";
import { BRAND } from "@/config/brand.config";
import { NoodleSplashScreen } from "@/features/splash/components/NoodleSplashScreen";
import { AppProvider } from "./providers/AppProvider";
import { AppRouter } from "./router";

export function App() {
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      return window.sessionStorage.getItem(BRAND.SPLASH.SESSION_KEY) !== "1";
    } catch {
      return true;
    }
  });

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
    try {
      window.sessionStorage.setItem(BRAND.SPLASH.SESSION_KEY, "1");
    } catch {
      // Ignore sessionStorage errors
    }
  }, []);

  return (
    <AppProvider>
      <NoodleSplashScreen visible={showSplash} onFinish={handleSplashFinish} />
      <AppRouter />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
