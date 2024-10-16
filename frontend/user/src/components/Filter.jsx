import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const Filter = ({ onFilter, onClear }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [singleDate, setSingleDate] = useState(new Date());
	const [location, setLocation] = useState("All locations");

	const locations = ["All Locations", "Prayagraj", "Mumbai", "Bangalore"]; // Example locations

	const applyFilters = () => {
		console.log(
			"Single Date: ",
			new Date(singleDate).toISOString().slice(0, 10)
		);
		console.log("Location: ", location);

		onFilter({
			date: new Date(singleDate).toISOString().slice(0, 10),
			location,
		});
	};

	const clearAllFilters = () => {
		// Reset all filter states
		setSingleDate(null);
		setLocation("");

		// Call the onClear function to reset filters in parent
		onClear();
	};

	return (
		<div className="relative">
			<button
				className="bg-transparent text-blue-700 font-semibold flex flex-row gap-2 justify-center items-center"
				onClick={() => setShowDropdown(!showDropdown)}
			>
				Filter <FaChevronDown />
			</button>

			{/* Dropdown */}
			{showDropdown && (
				<div className="absolute mt-2 right-0 md:left-0 p-4 bg-white border border-gray-300 rounded-md shadow-lg w-80 z-10">
					{/* Filter by Single Date */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Filter by Single Date
						</label>
						<div className="relative">
							<DatePicker
								selected={singleDate}
								value={singleDate}
								onChange={(date) => setSingleDate(date)}
								placeholderText="Choose Date"
								className="border border-gray-300 p-2 rounded-md w-full"
							/>
							<FaCalendarAlt className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
						</div>
					</div>

					{/* Filter by Location */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Filter by Location
						</label>
						<select
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							className="border border-gray-300 p-2 rounded-md w-full"
						>
							<option value="">Select Location</option>
							{locations.map((loc) => (
								<option key={loc} value={loc}>
									{loc}
								</option>
							))}
						</select>
					</div>

					{/* Apply Button */}
					<div className="flex flex-row gap-2">
						<button
							className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
							onClick={() => {
								applyFilters();
								setShowDropdown(false);
							}}
						>
							Apply Filters
						</button>
						<button
							className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 w-full"
							onClick={() => {
								clearAllFilters();
								setShowDropdown(false);
							}}
						>
							Clear Filters
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Filter;
