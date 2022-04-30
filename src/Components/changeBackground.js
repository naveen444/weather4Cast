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
	vectorSunset3
]

function changeBackground() {
	const body = document.body;
	const shuffledImages = images.sort(() => 0.5 - Math.random());
    var selectedImage = Math.floor(Math.random() * shuffledImages.length);
	body.style.backgroundImage = `url(${images[selectedImage]})`;
}

export default changeBackground;