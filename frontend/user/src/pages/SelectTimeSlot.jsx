import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ImageViewer from 'react-simple-image-viewer';
import toast from 'react-hot-toast';
import axios from 'axios';
import court from '../../../../backend/models/court';

const SlotSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedDate, groundData } = location.state || {};
    const sportId = groundData.id;
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user details from localStorage
    const userId = localStorage.getItem('userId');
    const customerName = localStorage.getItem('username');

    const mockGround = {
        ground_name: groundData.name || 'Football Ground',
        location: groundData.location || 'Civil Lines, Allahabad',
        description: 'A large open field suitable for ' + groundData.name,
        price: groundData.price || 500,
        images: [
            groundData.image || 'https://en.reformsports.com/oxegrebi/2020/09/mini-futbol-sahasi-ozellikleri-ve-olculeri.jpg',
            'https://olympiados.in/wp-content/uploads/2024/01/Football-Pitch-Olympiados-768x432.webp'
        ]
    };

    // Fetch available slots from the API
    useEffect(() => {
        const fetchAvailableSlots = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/bookings/available', {
                    sportId,
                    date: selectedDate
                });

                // Extract and structure slots with courtId
                const slotsData = response.data.map(court => {
                    return court.availableSlots.map(slot => ({
                        courtId: court.courtId,
                        start: slot.start,
                        end: slot.end
                    }));
                }).flat(); // Flatten to get all slots in a single array

                setAvailableSlots(slotsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching available slots:', error);
                toast.error('Failed to load available slots.');
                setLoading(false);
            }
        };

        if (sportId && selectedDate) {
            fetchAvailableSlots();
        }
    }, [sportId, selectedDate]);

    const openImageViewer = (index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    const bookGround = async (e) => {
        e.preventDefault();

        // Ensure a time slot is selected
        if (!selectedTimeSlot) {
            toast.error("Please select a time slot");
            return;
        }

        // Extract courtId and startTime from the selected option
        var [courtId, startTime] = selectedTimeSlot.split(', ');
        courtId = courtId.substring(7);

        try {
            // Make the booking request
            const response = await axios.post('http://localhost:3000/api/bookings/', {
                customerName,
                userId,
                courtId: courtId.replace('Court: ', ''),
                sportId,
                date: selectedDate,
                startTime
            });

            localStorage.setItem("date", selectedDate);

            toast.success(`Ground booked successfully for Mr.${customerName} at ${startTime}`);
            navigate('/bookings');
        } catch (error) {
            console.error('Error booking the ground:', error);
            toast.error('Failed to book the ground. Please try again.');
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen p-4 lg:pt-5">
            <h2 className="text-2xl lg:text-4xl lg:mt-4 lg:ml-4 font-bold mb-4">Select Slot for {mockGround.ground_name}</h2>
            <div className='flex flex-col lg:flex-row'>
                {/* Left Panel: Ground Details */}
                <div className='lg:w-1/2 lg:p-4 mt-8 lg:mt-4'>
                    <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
                        <h1 className='text-xl font-semibold mb-2'>Location</h1>
                        <p className="text-lg mb-2">{mockGround.location}</p>
                    </div>
                    <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
                        <h1 className='text-xl font-semibold mb-2'>About {mockGround.ground_name}</h1>
                        <p className="text-gray-700">{mockGround.description}</p>
                    </div>
                </div>

                {/* Right Panel: Images and Slot Selection */}
                <div className='lg:w-1/2 lg:p-4 mt-8 lg:mt-4'>
                    {/* Images */}
                    <div className='flex flex-col bg-gray-100 border border-gray-300 p-5 rounded-lg justify-center mb-4 shadow-md'>
                        <h1 className='text-xl font-semibold mb-3'>Images</h1>
                        <div className="flex flex-row overflow-scroll">
                            {mockGround.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        onClick={() => openImageViewer(index)}
                                        className="cursor-pointer"
                                        alt={`Image ${index + 1}`}
                                        style={{ maxWidth: '200px', height: '150px', margin: "2px" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slot Selection Form */}
                    <form onSubmit={bookGround} className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
                        {loading ? (
                            <p>Loading available slots...</p>
                        ) : (
                            <div>
                                <label className="block text-gray-700 mb-2">Select Time Slot:</label>
                                {availableSlots.length > 0 ? (
                                    <select
                                        value={selectedTimeSlot}
                                        onChange={handleTimeSlotChange}
                                        className="w-full border border-gray-300 rounded p-2"
                                    >
                                        <option value="">Select a Time Slot</option>
                                        {availableSlots.map((slot, index) => (
                                            <option key={index} value={`Court: ${slot.courtId}, ${slot.start}`}>
                                                Court: {slot.courtId}, {slot.start} - {slot.end}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p>No available slots for the selected date.</p>
                                )}
                            </div>
                        )}
                        <span className='font-semibold'>@ ₹{mockGround.price}/hour</span>
                        <button
                            type='submit'
                            className='bg-gray-900 text-white lg:w-32 px-4 py-2 rounded-lg mb-2'
                            disabled={loading || availableSlots.length === 0}
                        >
                            Book
                        </button>
                    </form>
                </div>
            </div>

            {/* Image Viewer */}
            {isViewerOpen &&
                <ImageViewer
                    src={mockGround.images}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                />
            }
        </div>
    );
}

export default SlotSelection;
