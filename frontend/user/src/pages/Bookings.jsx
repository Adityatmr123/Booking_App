import React, { useEffect, useState } from "react";
import { BookingCard } from "../components/GroundCard";
import Filter from "../components/Filter";

const Bookings = () => {
	const [upcomingBookings, setUpcomingBookings] = useState([]);
	const [previousBookings, setPreviousBookings] = useState([]);
	const date = localStorage.getItem("date");

	const userId = localStorage.getItem("userId");
	const username = localStorage.getItem("username");

	const getBookings = async (filteredData) => {
		const selectedDate = filteredData?.date || date; // Get date from filtered data or use current date
		console.log(selectedDate);

		try {
			const response = await fetch(`http://localhost:3000/api/bookings/user/slots`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: userId, date: selectedDate }), // Replace with actual user ID
			});
			const data = await response.json();

			const previous = data.filter((booking) => new Date(booking.date) < new Date());
			setPreviousBookings(previous);

			const upcoming = data.filter((booking) => new Date(booking.date) >= new Date());
			setUpcomingBookings(upcoming);
		} catch (error) {
			console.error("Error fetching bookings:", error);
		}
	};

	const clearBookingFilter = () => {
		setPreviousBookings([]); // Clear the previous bookings
	};

	const clearUpcomingBookingFilter = () => {
		setUpcomingBookings([]); // Clear the upcoming bookings
	};

	useEffect(() => {
		getBookings(); // Fetch bookings on component mount
	}, [date]); // Refetch when date changes

	return (
		<div className="bg-gray-200 min-h-screen p-8">
			<p className="ml-5 md:ml-10 mt-5 mb-10 font-semibold text-3xl text-center md:text-left">
				Here are your bookings, {username}
			</p>

			{/* Date Picker */}
			<div className="mb-5">
				<label htmlFor="date" className="font-bold text-lg">Select Date: </label>
				<input
					type="date"
					id="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					className="border rounded p-2 ml-2"
				/>
			</div>

			<div className="flex justify-between md:justify-normal items-center p-4 md:gap-4">
				<div className="font-bold text-xl text-left">Upcoming Bookings</div>
				<div>
					<Filter
						onFilter={getBookings}
						onClear={clearUpcomingBookingFilter}
					/>
				</div>
			</div>
			<div className="flex flex-col md:flex-row justify-center md:justify-start gap-5">
				{upcomingBookings?.map((booking) => (
					<div key={booking?._id} className="ml-5 md:ml-10 mt-5 mb-16">
						<BookingCard
							id={booking?._id}
							ground={booking?.court.sport} // Assuming sport is the ground name
							date={booking?.date.slice(0, 10)}
							time={`${booking.startTime} - ${booking.endTime}`}
						/>
					</div>
				))}
				{upcomingBookings.length === 0 && (
					<p className="ml-5 md:ml-10 mt-5 mb-16 font-light text-xl text-center md:text-left">
						You don't have any upcoming bookings.
					</p>
				)}
			</div>

			<div className="flex justify-between md:justify-normal items-center p-4 md:gap-4">
				<div className="font-bold text-xl text-left">Previous Bookings</div>
				<div>
					<Filter onFilter={getBookings} onClear={clearBookingFilter} />
				</div>
			</div>
			<div className="flex flex-col md:flex-row justify-center md:justify-start gap-5">
				{previousBookings?.map((booking) => (
					<div key={booking?._id} className="ml-5 md:ml-10 mt-5">
						<BookingCard
							id={booking?._id}
							ground={booking?.court.sport} // Assuming sport is the ground name
							date={booking?.date.slice(0, 10)}
							time={`${booking.startTime} - ${booking.endTime}`}
						/>
					</div>
				))}
				{previousBookings.length === 0 && (
					<p className="ml-5 md:ml-10 mt-5 mb-5 font-light text-xl text-center md:text-left">
						You don't have any previous bookings.
					</p>
				)}
			</div>
		</div>
	);
};

export default Bookings;
