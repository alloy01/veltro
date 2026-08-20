import { Routes, Route } from "react-router-dom";
import Auth from './components/Auth.jsx'
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import { ToastProvider } from "./context/ToastContext.jsx";

const App = () => {
	return (
		<Routes>
			<Route path="/" element = {
				<ToastProvider>
					<Login />
				</ToastProvider>
				} />
			{/* guard the '/dashboard' route by ProtectedRoute element, which checks whether user is valid or not */}
			<Route path="/dashboard" element = {<ProtectedRoute>
				<ToastProvider>
					<Dashboard/>
				</ToastProvider>
			</ProtectedRoute>}
			/>
		</Routes>
	)
}

export default App