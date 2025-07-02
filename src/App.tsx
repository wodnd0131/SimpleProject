import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import NewIssue from "./pages/NewIssue";
import Documents from "./pages/Documents";
import NewDocument from "./pages/NewDocument";
import Meetings from "./pages/Meetings";
import TeamDashboard from "./pages/TeamDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/SimpleProject">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issues/new" element={<NewIssue />} />
          <Route path="/issues/:number" element={<IssueDetail />} />
          <Route path="/docs" element={<Documents />} />
          <Route path="/docs/new" element={<NewDocument />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/team" element={<TeamDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
