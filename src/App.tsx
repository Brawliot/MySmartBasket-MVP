import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Index from "./pages/Index";
import Lists from "./pages/Lists";
import Compare from "./pages/Compare";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Recipes from "./pages/Recipes";
import MyRecipes from "./pages/MyRecipes";
import WeeklyMenu from "./pages/WeeklyMenu";
import Basket from "./pages/Basket";
import Stats from "./pages/Stats";
import Assistant from "./pages/Assistant";
import StoreLocations from "./pages/StoreLocations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/inicio" element={<Index />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/cesta" element={<Basket />} />
          <Route path="/recetas" element={<Recipes />} />
          <Route path="/mis-recetas" element={<MyRecipes />} />
          <Route path="/menu-semanal" element={<WeeklyMenu />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/compare/:storeId" element={<StoreLocations />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/estadisticas" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
