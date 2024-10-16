import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ImageViewer from 'react-simple-image-viewer';
import toast from 'react-hot-toast';

const GroundDetails = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Access the passed data here
    const groundData = location.state || {}; // Get the data passed from GroundCard

    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [amenities] = useState(['Parking', 'Washroom']);

    const mockGround = {
        ground_name: groundData.name || 'Football Ground',
        location: groundData.location || 'Civil Lines, Allahabad',
        description: 'A large open field suitable for ' + groundData.name,
        price: groundData.price || 500,
        images: [
            groundData.image || 'https://en.reformsports.com/oxegrebi/2020/09/mini-futbol-sahasi-ozellikleri-ve-olculeri.jpg',
            'https://olympiados.in/wp-content/uploads/2024/01/Football-Pitch-Olympiados-768x432.webp'
        ],
    };

    const openImageViewer = (index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate) {
            toast.error("Please select a date");
            return;
        }
        navigate('/select-time-slot', { state: { selectedDate, groundData } });
    };

    return (
        <div className="bg-gray-200 min-h-screen p-4 lg:pt-5">
            <h2 className="text-2xl lg:text-4xl lg:mt-4 lg:ml-4 font-bold mb-4">{mockGround.ground_name}</h2>
            <div className='flex flex-col lg:flex-row'>
                <div className='lg:w-1/2 lg:p-4 mt-8 lg:mt-4'>
                    {/* Display location and other details */}
                    <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
                        <h1 className='text-xl font-semibold mb-2'>Location</h1>
                        <p className="text-lg mb-2">{mockGround.location}</p>
                    </div>
                    <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
                        <h1 className='text-xl font-semibold mb-2'>About {mockGround.ground_name}</h1>
                        <p className="text-gray-700">{mockGround.description}</p>
                    </div>
                    <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center shadow-md'>
                        <h1 className='text-xl font-semibold mb-2'>Amenities</h1>
                        <p className="text-gray-700">{amenities.join(', ')}</p>
                    </div>
                </div>
                <div className='lg:w-1/2 lg:p-4 mt-8 lg:mt-4'>
                    {/* Image viewer */}
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
                    {/* Date selection */}
                    <form onSubmit={handleSubmit} className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Date:</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className='rounded p-2 border border-gray-300 w-full'
                            />
                        </div>
                        <button
                            type='submit'
                            className='bg-gray-900 text-white lg:w-32 px-4 py-2 rounded-lg mb-2'
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>

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

export default GroundDetails;
