import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import { Switch, Route } from "wouter";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "./lib/protected-route";
import { MainLayout } from "./components/layout/main-layout";
import { logger } from "./lib/services/logger";
import SessionsPage from "@/pages/sessions-page";
import PlayerPage from "@/pages/player-page";
import RecordingPlayer from "@/pages/recording-player";
import SettingsPage from "@/pages/settings-page";
import SensorsPage from "@/pages/sensors-page";
import CamerasPage from "@/pages/cameras-page";

function Router() {
  logger.info("Initializing router");
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute 
        path="/" 
        component={() => (
          <MainLayout>
            <HomePage />
          </MainLayout>
        )} 
      />
      <ProtectedRoute 
        path="/cameras" 
        component={() => (
          <MainLayout>
            <CamerasPage />
          </MainLayout>
        )} 
      />
      <ProtectedRoute 
        path="/sessions" 
        component={() => (
          <MainLayout>
            <SessionsPage />
          </MainLayout>
        )} 
      />
      <ProtectedRoute 
        path="/sessions/:id" 
        component={() => (
          <MainLayout>
            <RecordingPlayer />
          </MainLayout>
        )} 
      />
      <ProtectedRoute 
        path="/player" 
        component={() => (
          <MainLayout>
            <PlayerPage />
          </MainLayout>
        )} 
      />
      <ProtectedRoute 
        path="/settings" 
        component={() => (
          <MainLayout>
            <SettingsPage />
          </MainLayout>
        )} 
      />
      <ProtectedRoute 
        path="/sensors" 
        component={() => (
          <MainLayout>
            <SensorsPage />
          </MainLayout>
        )} 
      />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  logger.info("Application starting");
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;