import React, { useState } from "react";
import { format, getDate } from "date-fns";
import AddLineModal from "./AddLineModal";
import { useDispatch, useSelector } from "react-redux";
import { updateExistingStory } from "../Redux/Slices/storySlice";
import { toast } from "react-toastify";
const ReadStoryModal = ({ story, onClose }) => {
	const {token} =useSelector((state)=>state.auth);
	const [showAddLine, setShowAddLine] = useState(false);
	const [newLine, setNewLine] = useState("");
	const wordLimit = 280;
	const dispatch=useDispatch();
	console.log("story",story)

	const handleAddLineClick = () => {
		setShowAddLine(true);
	};

	const handleSubmit = async () => {
		if (newLine.length > wordLimit) {
			
			toast.error("Line exceeds the word limit");
			return;
		}

		// const updatedStory = {
		// 	...story,
		// 	lines: [...story.lines, newLine],
		// 	lastEditBy: "user-id", // Replace with actual user ID
		// 	lastEditAt: new Date().toISOString(),
		// };

		try {
			//await updateStory(updatedStory); // Assuming updateStory is an API utility for updating storie
			dispatch(updateExistingStory({id:story._id,text:newLine,token})).then((res)=>{
				console.log("update:,",res)
				if(res.payload.satus=="error")
				{
					toast.error(res.payload.message);
				}
				{

					toast.success(res.payload.message);
					dispatch(fetchStories(token));
				}
			});

			onClose();
			
		} catch (error) {
			console.log(error)
			toast.error("Failed to add line");
		}
	};

	return (
		<div className="fixed inset-0 z-50 bg-modalBg flex items-center justify-center">
			<div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-2xl">
				<h3 className="text-lg font-bold mb-4 text-primary dark:text-secondary">
					{story.title}
				</h3>
				<div className="mb-4">
					{story.content.map((line, index) => (
						<p key={index} className="border-y-2 font-sans">
							{line.text}
							<br />
							<span className="flex-col gap-2 text-blue-400">
								<strong>Authore : {line.author}</strong>
							</span>
						</p>
					))}
					<div className="text-sm  dark:text-gray-600 mt-4">
						Last edited at: {`${(new Date(story.updatedAt))}`.split("GMT+0530 (India Standard Time)")}
					</div>
				</div>
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="bg-red-500 text-white p-2 rounded mr-2"
					>
						Back
					</button>
					<button
						onClick={handleAddLineClick}
						className="bg-primary text-white p-2 rounded"
					>
						Add New Line
					</button>
				</div>
				{showAddLine && (
					 <div className="mt-4">
					
					 

					<div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
						
						<textarea
							value={newLine}
							onChange={(e) => setNewLine(e.target.value)}
							placeholder="Write the new line (up to 280 characters)"
							className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white"
							maxLength={wordLimit}
						/>
						<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
							{wordLimit - newLine.length} characters left
						</p>
						<div className="flex justify-end">
							<button
								onClick={() => setShowAddLine(false)}
								className="bg-red-500 text-white p-2 rounded mr-2"
							>
								Cancel
							</button>
							<button onClick={handleSubmit} className="bg-primary text-white p-2 rounded">
								Submit
							</button>
						</div>
					</div>
          </div>
				)}
			</div>
		</div>
	);
};

export default ReadStoryModal;
