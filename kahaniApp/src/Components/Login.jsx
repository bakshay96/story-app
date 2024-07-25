import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
			<form
				onSubmit={handleSubmit}
				className="bg-white dark:bg-gray-800 p-6 rounded shadow-md"
			>
				<h2 className="text-2xl mb-4 text-center text-primary dark:text-secondary">
					Login
				</h2>
				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-300">
						Email
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-300">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-primary text-white p-2 rounded w-full"
				>
					Login
				</button>
				<div>
					<p className="text-blue-500 gap-3 mt-2">
						don't have account a account <a className="text-red-600" href="/register">Click</a>here
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
