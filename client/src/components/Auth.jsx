import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import Toast from "./Toast.jsx";
import { ToastContext } from "../context/ToastContext.jsx";

const Auth = () => {
	// to see whether user is authenticated or not if not then redirect it to '/'
	const { checkAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	// hide and show func for password
    const [showPass, setShowPass] = useState(false);
 	const handleShowPass = () => {
    	setShowPass(!showPass);
  	};

	// states and funcs for walls
	const [authWall, setAuthWall] = useState(false);
	const handleAuthWall = () => {
		setAuthWall(!authWall);
	};
	const [signWall, setSignWall] = useState(false);
	const handleSignWall = () => {
		setSignWall(true);
		setLoginWall(false);
	};
	const [loginWall, setLoginWall] = useState(false);
	const handleLoginWall = () => {
		setLoginWall(true);
		setSignWall(false);
	};

	// handle login/create button
	const handleAuthType = () => {
		if (signWall) {
		handleLoginWall();
		} else {
		handleSignWall();
		}
	};

	const {toast, setToast, showToast} = useContext(ToastContext);

	// handle submit button
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
		const payload = formData;

		const response = await api.post(
			`/auth/${signWall ? `register` : `login`}`,
			payload
		);

		if (response.data){
			setFormData({
			email: "",
			password: "",
			});

			showToast(response.data.message);

			if(response.data.success){
				// backend already created cookie
				await checkAuth();

				// go inside the app
				navigate("/dashboard");
			}
		}}

		catch (err) {
			// shows the error message in toast
			showToast(err.message);
		}
	};

	// initial form data
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

  	// controlled input
	const handleChange = (e) => {
		const {name, value} = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}))
	};

	return (
    <div className="h-screen w-screen relative border flex items-center overflow-hidden justify-center">

		{/* toast component */}
		<Toast toastBlock={toast.visible} toastMessage={toast.message}/>

		{/* login button */}
		<button
			onClick={handleAuthWall}
			className={`text-slate-200 border-2 cursor-pointer border-slate-200 font-mono px-5 py-1 ${authWall ? `hidden` : `block`}`}>
			Login
		</button>

		{/* authwall */}
		<div className={`bg-slate-400/30 ${authWall ? `block` : `hidden`} px-6 py-4 mx-4`}>

			{/* contents of authwall */}
			<button
			type="button"
			className="font-mono text-s cursor-pointer text-gray-400"
			onClick={handleAuthWall}>
				{`<`}
			</button>
			<div className="text-slate-200 font-mono px-5 py-4 text-xl">
				{`${signWall ? `create` : `login`} to continue with Veltro`}
			</div>

			{/* form for auth */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
				{
					signWall ? 
					(
						<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						placeholder="enter your username."
						className="outline-0 py-1 text-slate-300 font-mono"
						/>
					) : null
				}

				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="enter your email."
					className="outline-0 py-1 text-slate-300 font-mono"
				/>

				{/* div containing toggle button and password */}
				<div className="flex justify-between">
					<input
					type={`${showPass ? `text` : `password`}`}
					name="password"
					placeholder="enter your password."
					value={formData.password}
					onChange={handleChange}
					className="outline-0 py-1 text-slate-300 font-mono"
					/>
					<button
					onClick={handleShowPass}
					type="button"
					className="text-slate-400 font-mono cursor-pointer"
					>{`${showPass ? `hide` : `show`}`}</button>
				</div>
				<button
					type="submit"
					className="font-mono text-slate-100 mt-3 py-1 border cursor-pointer">
					{signWall ? `create` : `login`}
				</button>
			</form>

			{/* alternative auth method */}
			<div className="mt-4 flex justify-between">
				<p className="font-mono text-xs text-gray-400">{`${signWall ? `already` : `don't`} have an account?`}</p>
				<button
					type="button"
					className="font-mono text-xs text-gray-200 border cursor-pointer px-4 py-1"
					onClick={handleAuthType}>
						{`${signWall ? `login` : `create`}`}
				</button>
			</div>
		</div>
    </div>
    );
};

export default Auth;