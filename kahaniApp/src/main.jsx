import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	
		<Provider store={store}>
			<ThemeProvider>
				<BrowserRouter>
					<AuthProvider>
						<App />
						<ToastContainer />
					</AuthProvider>
					<ToastContainer />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	
);
