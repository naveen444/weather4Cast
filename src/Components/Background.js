import { useEffect, useState } from 'react';

// Image imports
import vectorDesert from '../assets/vectorDesert.jpg';
import vectorHills from '../assets/vectorHills.jpg';
import vectorLandscape from '../assets/vectorLandscape.png';
import vectorLandscapes from '../assets/vectorLandscapes.jpg';
import vectorMountains from '../assets/vectorMountains.jpg';
import vectorSunset from '../assets/vectorSunset.jpg';
import vectorSunset2 from '../assets/vectorSunset2.jpg';
import vectorSunset3 from '../assets/vectorSunset3.jpg';

const images = [
    vectorDesert,
    vectorHills,
    vectorLandscape,
    vectorLandscapes,
    vectorMountains,
    vectorSunset,
    vectorSunset2,
    vectorSunset3,
];

const Background = ({ weather }) => {
	const [background, setBackground] = useState(images[0]); // Start with any default image
	const [nextBackground, setNextBackground] = useState(null);
	const [imageLoaded, setImageLoaded] = useState(false);

	const setRandomBackground = () => {
			const randomImage = images[Math.floor(Math.random() * images.length)];

			// Preload image before setting as background
			const img = new Image();
			img.src = randomImage;

			img.onload = () => {
					setNextBackground(randomImage);
					setImageLoaded(true);

					// After a slight delay, swap images
					setTimeout(() => {
							setBackground(randomImage);
							setNextBackground(null);
							setImageLoaded(false);
					}, 500); // Optional delay for smoother effect
			};
	};

	useEffect(() => {
		if (weather) {
			setRandomBackground();
		}
	}, [weather]);

	return (
		<div style={{ position: 'fixed', height: '100%', width: '100%', top: '0', left: '0', overflow: 'hidden' }}>
			{/* Current background */}
			<div
				style={{
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					opacity: nextBackground ? 0.7 : 1, // Slight dim while loading new one
					transition: 'opacity 0.8s ease-in-out',
					zIndex: 1,
				}}
			/>

			{/* New background fading in */}
			{nextBackground && (
				<div
					style={{
						backgroundImage: `url(${nextBackground})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: imageLoaded ? 1 : 0,
						transition: 'opacity 0.8s ease-in-out',
						zIndex: 2,
					}}
				/>
			)}
		</div>
	);
};

export default Background;
