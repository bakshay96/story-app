import React, { useState } from "react";

import CreateStoryModal from "./CreateStoryModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useSelector } from "react-redux";

const HeroSection = () => {
	const { user, token } = useSelector((state) => state.auth);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const [showAddStoryModel, setShowAddStoryModel] = useState(false);

	const handleAddStoryModel = () => {
		console.log("handle read:");
		setShowAddStoryModel(true);
	};

	const handleGetStarted = () => {
		if (!user) {
			navigate("/login");
		} else {
			setShowModal(true);
		}
	};

	return (
		<section className="bg-background dark:bg-darkBackground p-12 text-center">
			<h2 className="text-4xl mb-4 text-primary dark:text-secondary">
				Collaborative Story Creator
			</h2>
			<p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
				Join us in creating amazing stories together!
			</p>
			{user ? (
				<button
					className="bg-green-500 text-white p-3 mt-6 rounded"
					onClick={handleAddStoryModel}
				>
					Start New Story
				</button>
			) : (
				<button
					onClick={handleGetStarted}
					className="bg-primary text-white p-3 rounded hover:bg-primary-dark"
				>
					Get Started
				</button>
			)}

			{showModal && <CreateStoryModal onClose={() => setShowModal(false)} />}
			{showAddStoryModel && (
				<CreateStoryModal onClose={() => setShowAddStoryModel(false)} />
			)}
		</section>
	);
};

export default HeroSection;
