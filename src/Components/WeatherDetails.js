import React from 'react';
import sunset from '../assets/Icons/sunset.png';
import sunrise from '../assets/Icons/sunrise.png';
import humidity from '../assets/Icons/humidity.png';
import wind from '../assets/Icons/wind.png';
import pressure from '../assets/Icons/pressure.png';
import clouds_cover from '../assets/Icons/clouds_cover.png';
import visibility from '../assets/Icons/visibility.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const WeatherDetails = ({
	customClass = '',
	name,
	icon,
	value,
	fontSize = ''
}) => {

	const weatherInfoIcons = {
		sunset: <img src={sunset} />,
		sunrise: <img src={sunrise} />,
		humidity: <img src={humidity} />,
		wind: <img src={wind} />,
		pressure: <img src={pressure} />,
		clouds_cover: <img src={clouds_cover} />,
		visibility: <img src={visibility} />
	};

	const tooltipContent = {
		sunset: "Sunset is defined as the instant in the evening under ideal meteorological conditions, with standard refraction of the Sun's rays, when the upper edge of the sun's disk is coincident with an ideal horizon.",
		sunrise: "Sunrise is defined as the instant in the morning under ideal meteorological conditions, with standard refraction of the Sun's rays, when the upper edge of the sun's disk is coincident with an ideal horizon.",
		humidity: "Humidity is a measure of the amount of water vapor in the air. Relative humidity measures the amount of water in the air in relation to the maximum amount of water vapor (moisture). This is relative humidity.",
		wind: "Wind is air in motion. It is produced by the uneven heating of the earth's surface by the sun. Since the earth's surface is made of various land and water formations, it absorbs the sun's radiation unevenly. Two factors are necessary to specify wind: speed and direction.",
		pressure: "Atmospheric pressure refers to the weight of the air. High pressure means the air is heavy, and it sinks. Sinking air makes the environment very stable. Under high pressure you can generally expect sunny skies and calm weather. Low pressure is what causes active weather.",
		clouds_cover: "Cloud cover refers to the fraction of the sky covered by clouds at a given time and location. It is measured in percentage (%), where: 0% means a clear sky, 100% means a completely overcast sky.",
		visibility: "Visibility is a measure of the horizontal opacity of the atmosphere at the point of observation and is expressed in terms of the horizontal distance at which a person should be able to see and identify:"
	}

	const weathericon = weatherInfoIcons[icon];

	return (
		<div className={`wd-item text-center mb-0 d-flex align-items-center ${customClass}`}>
			<Tippy placement='top-end' animation='scale' content={`${tooltipContent[icon]}`}>
				<div className='wd-icon d-flex align-items-center justify-content-center'>
					{weathericon}
				</div>
			</Tippy>
			<div className='wd-title ms-3'>
				<h6 className={`value m-0 ${fontSize}`}>{value}</h6>
				<h6 className={`title m-0 ${fontSize}`}>{name}</h6>
			</div>
		</div>
	)
}

export default WeatherDetails;