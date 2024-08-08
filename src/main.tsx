import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter } from "react-router-dom"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>,
)
