import React, { useState, useEffect } from "react";
import { fetchStorie } from "../Api/api"; // Assuming you have an API utility for fetching stories
import StoryCard from "./StoryCard";
import { toast } from "react-toastify";
import SortingAndFiltering from "./SortingAndFiltering";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../Redux/Slices/storySlice";

const StoriesPage = () => {
	const {stories,loading,error} = useSelector((state)=>state.story);
	const { user,token } = useSelector((state) => state.auth);
	
	console.log("story page token and user",token,user)
	console.log("story page",stories,loading,error)
	const dispatch = useDispatch();
	 let [storie] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(6);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOrder, setSortOrder] = useState("latest");
  const [filter,setFilter]=useState("all")
console.log("current storie:",storie)
storie=stories
  useEffect(()=>{
		dispatch(fetchStories(token))
		if(stories.length>0)
		{
			storie=stories;
		}
		console.log("iffect storie",storie)
  },[token,user])
	

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

	// const handleSort = (order) => {
	// 	setSortOrder(order);
	// };

  // const handleFilter = (filter) => {
  //   setFilter(filter);
  // };

	// const filteredStories = stories.filter((story) =>
	// 	story.title.toLowerCase().includes(searchQuery.toLowerCase())
	// );

	// const sortedStories = filteredStories.sort((a, b) => {
	// 	if (sortOrder === "latest") {
	// 		return new Date(b.createdAt) - new Date(a.createdAt);
	// 	} else {
	// 		return new Date(a.createdAt) - new Date(b.createdAt);
	// 	}
	// }).filter((story) => {
  //   if (filter === 'all') return true;
  //   if (filter === 'byMe') return story.creator === 'CurrentUser'; // Replace with actual user check
  //   if (filter === 'byOthers') return story.creator !== 'CurrentUser'; // Replace with actual user check
  //   return true;
  // });

  // const handleFilter = (filter) => {
  //   setFilter(filter);
  // };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  console.log("filter story",storie)
  const filteredStories = storie
    .filter((story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.createdBy.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'latest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    })
    .filter((story) => {
      if (filter === 'all') return true;
      if (filter === 'byMe') return story.createdBy._id === user._id; // Replace with actual user check
      if (filter === 'byOthers') return story.createdBy._id !== user._id; // Replace with actual user check
      return true;
    });

	const paginatedStories = filteredStories.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-4">
				{/* <input
          type="text"
          placeholder="Search stories"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded"
        /> */}
				<div className="relative w-full max-w-md mx-auto">
					<input
						type="text"
						className="w-full py-2 pl-10 pr-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Search stories..."
						onChange={handleSearch}
					/>
					<svg
						className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 18l6-6M10 6l6 6"
						/>
					</svg>
				</div>
				{/* <select
					onChange={(e) => handleSort(e.target.value)}
					value={sortOrder}
					className="p-2 border rounded"
				>
					<option value="latest">Latest</option>
					<option value="oldest">Oldest</option>
				</select> */}
				{/* <div className="flex items-center space-x-4 mb-4">
					<div className="relative inline-block text-left">
						<select
							onChange={(e) => handleSort(e.target.value)}
							className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="latest">Latest</option>
							<option value="oldest">Oldest</option>
						</select>
					</div>
					<div className="relative inline-block text-left">
						<select
							onChange={(e) => onFilter(e.target.value)}
							className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="all">All</option>
							<option value="byMe">By Me</option>
							<option value="byOthers">By Others</option>
						</select>
					</div>
				</div> */}
        <SortingAndFiltering onSort={handleSort} onFilter={handleFilter} />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{paginatedStories.length > 0 ? (
					paginatedStories.map((story) => (
						<StoryCard key={story.id} story={story} />
					))
				) : (
					<p className="text-center col-span-full">No stories found</p>
				)}
			</div>
			<div className="flex justify-center mt-4">
				{Array.from(
					{ length: Math.ceil(filteredStories.length / itemsPerPage) },
					(_, index) => (
						<button
							key={index}
							onClick={() => handlePageChange(index + 1)}
							className={`p-2 border rounded mx-1 ${
								currentPage === index + 1
									? "bg-primary text-white"
									: "bg-white text-primary"
							}`}
						>
							{index + 1}
						</button>
					)
				)}
			</div>
		</div>
	);
};

export default StoriesPage;
