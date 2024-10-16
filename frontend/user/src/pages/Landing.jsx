import React, { useEffect, useState } from 'react';
import GroundCard from '../components/GroundCard';
import ImageSlider from '../components/ImageSlider';
import '../custom.css';

const getRandomPrice = () => {
    return Math.floor(Math.random() * (1000 - 100 + 1)) + 100; // Random price between 100 and 1000
};

const getRandomImages = () => {
    const images = [
        'https://en.reformsports.com/oxegrebi/2020/09/mini-futbol-sahasi-ozellikleri-ve-olculeri.jpg',
        'https://woxsen.edu.in/uploads/A20240822085112.webp',
        'https://content3.jdmagicbox.com/comp/allahabad/g1/0532px532.x532.171230090605.x2g1/catalogue/kp-ground-tennis-court-2-george-town-allahabad-lawn-tennis-courts-y9zzbfka5w.jpg',
        'https://swastikafilms.com/wp-content/uploads/2022/05/Manicured-lawn-with-cricket-picth-1024x768.jpg',
        // Add more image URLs as needed
    ];
    return images[Math.floor(Math.random() * images.length)]; // Return a random image URL
};

const Landing = () => {
    const [grounds, setGrounds] = useState([]); // Initialize grounds state
    const [centers, setCenters] = useState([]); // Initialize centers state
    const [selectedCenterId, setSelectedCenterId] = useState(''); // Keep track of selected center ID
    const [scrollPosition, setScrollPosition] = useState(0);

    // Fetch centers on component mount
    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/centers');
                const data = await response.json();
                setCenters(data);

                // Set the default selected center ID to the first center if it exists
                if (data.length > 0) {
                    setSelectedCenterId(data[0]._id); // Set the default center ID
                    fetchGrounds(data[0]._id); // Fetch initial grounds for the first center
                }
            } catch (error) {
                console.error('Error fetching centers:', error);
            }
        };

        fetchCenters();
    }, []);

    // Fetch grounds by center ID
    const fetchGrounds = async (centerId) => {
        try {
            const response = await fetch('http://localhost:3000/api/sports/getByCenter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ centerId }),
            });
            const data = await response.json();

            // Add random price and random image to each ground
            const updatedGrounds = data.map(ground => ({
                ...ground,
                price: getRandomPrice(),
                images: [getRandomImages()],
            }));

            setGrounds(updatedGrounds);
        } catch (error) {
            console.error('Error fetching grounds:', error);
        }
    };

    const handleScroll = (direction) => {
        const container = document.getElementById('groundContainer');
        const cardWidth = 350;
        const totalWidth = grounds.length * cardWidth;
        const maxScroll = totalWidth - container.offsetWidth;

        if (direction === 'left') {
            setScrollPosition(Math.max(scrollPosition - container.offsetWidth, 0));
        } else if (direction === 'right') {
            setScrollPosition(Math.min(scrollPosition + container.offsetWidth, maxScroll));
        }
    };

    const handleCityChange = (e) => {
        const selectedCenterId = e.target.value;
        console.log(selectedCenterId);
        if (selectedCenterId) {
            setSelectedCenterId(selectedCenterId); // Update selected center ID
            fetchGrounds(selectedCenterId); // Fetch grounds for the newly selected center
        }
    };

    return (
        <div className="relative">
            <ImageSlider />

            <div className="flex w-full absolute z-10 justify-between mt-40">
                <button onClick={() => handleScroll('left')} className="text-white m-1 rounded-full">
                    <img className='w-10' src="/images/la.svg" alt="left arrow" />
                </button>
                <button onClick={() => handleScroll('right')} className="text-white m-1 rounded-full">
                    <img className='w-10' src="/images/ra.svg" alt="right arrow" />
                </button>
            </div>

            <br />
            <div style={{ float: "right" }} id='city'>
                <label style={{ color: "black", paddingRight: "20px" }}> City: </label>
                <select
                    style={{ border: "2px solid black", marginRight: "50px" }}
                    onChange={handleCityChange}
                >
                    <option value="">All Cities</option>
                    {centers.map(center => (
                        <option key={center._id} value={center._id}>{center.name}</option>
                    ))}
                </select>
            </div>

            <div id="groundContainer" className="flex mx-4 sm:mx-16 my-8 overflow-x-auto justify-between relative">
                <div className="flex justify-between my-5" style={{ transform: `translateX(-${scrollPosition}px)`, transition: 'transform 0.3s' }}>
                    {grounds.map((ground) => {
                        if (selectedCenterId === ground.center._id) { // Use selected center ID for filtering
                            return (
                                <div key={ground._id} className="mr-5">
                                    <GroundCard
                                        id={ground._id}
                                        name={ground.name}
                                        location={ground.center.location}
                                        price={ground.price} // Random price
                                        image={ground.images[0]} // Random image
                                    />
                                </div>
                            );
                        }
                        return null; // Return null if the condition is not met
                    })}
                </div>
            </div>
        </div>
    );
};

export default Landing;