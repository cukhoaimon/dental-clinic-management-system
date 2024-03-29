import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { Panel_employee } from "./features/panel_employee/Panel_employee";
import {Panel} from "./features/panel/Panel";
import { Panel_dentist } from "./features/panel_dentist/Panel_dentist";

import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Bill from "./features/bill_page/Bill";
import MedicalExamination from "./features/medical_examination/MedicalExamination";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // cache will refresh for 60 seconds
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Some route page that just use for admin */}
          </Route>

          <Route path="/" element={<Home />}>
            <Route path="admin" element={<Panel />} />
            <Route path="dentist">
              <Route path="examinations/:id" element={<MedicalExamination />} />
              <Route index element={<Panel_dentist />} />
            </Route>
            <Route path="employee">
              <Route path="bills/:id" element={<Bill />} />
              <Route index element={<Panel_employee />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          {/* Another route add from here */}

          {/* All invalid route will render PageNotFound page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Use for notification */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
