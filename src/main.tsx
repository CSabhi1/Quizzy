import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";

import App from "./App.tsx";
import store from "./redux/store.ts";
import theme from "./theme/theme.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</StrictMode>
);
