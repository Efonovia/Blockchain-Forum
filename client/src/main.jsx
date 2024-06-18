import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./dir/context/userAuth/AuthContext";
import { AuthProvider } from "./dir/context/userAuth/useAuth";

const myQueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={myQueryClient}>
      {/* <AuthContextProvider> */}
        <AuthProvider>
          <App />
        </AuthProvider>
      {/* </AuthContextProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
);
