import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./Components/Register";
import { MainRoutes } from "./Routes/MainRoutes";
import { ThemeContext } from "./Context/ThemeContext";
import DarkModeToggle from "./Components/DarkModeToggle";

function App() {
	const [count, setCount] = useState(0);
	const { isDarkMode } = useContext(ThemeContext);

	return (
		<>
			
					<MainRoutes />
				
			
		</>
	);
}

export default App;
