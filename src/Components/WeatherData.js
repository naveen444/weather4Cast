import React, { useEffect, useState } from 'react';
import WeatherDetails from './WeatherDetails';
import Cloudy from './WeatherIcons/Cloudy';
import Loader from './Loader';
import getCurrentWeatherIcon from './getWeatherIcon';

const WeatherData = (props) => {

	const [currentWeatherState, setCurrentWeatherState] = useState(<Cloudy />);
	const [timeString, setTimeString] = useState('');
	
	const weather = props.weather;
	let isDay = '';
	let weatherCondition = '';

	const getTime = (timeStamp) => {
		return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
	}

	function degToCompass(num) {
		const val = parseInt((num/22.5)+.5);
		const arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
		return arr[(val % 16)]
	}

	const convertToLocalTime = (timezone) => {

		// Get current UTC time
    const utcDate = new Date();

    // Apply timezone offset (seconds → milliseconds)
    const localTime = new Date(utcDate.getTime() + timezone * 1000);

		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		// Extract date components
		const dayName = days[localTime.getUTCDay()];
		const monthName = months[localTime.getUTCMonth()];
		const day = localTime.getUTCDate();
		const year = localTime.getUTCFullYear();

		// Format hours & minutes in 12-hour format
		let hours = localTime.getUTCHours();
		let minutes = localTime.getUTCMinutes();
		const ampm = hours >= 12 ? "pm" : "am";

		hours = hours % 12;
		hours = hours ? hours : 12; // Convert '0' hour to '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;

		return `${dayName} , ${monthName} ${day} ${year}, ${hours}:${minutes} ${ampm}`;
	};

	if (props.weather) {
		isDay = weather?.weather[0].icon?.includes('d');
	}
	
	useEffect(()=> {
		if (props.weather) {
			const localTime = convertToLocalTime(props.weather.timezone);
			setTimeString(localTime);
			weatherCondition = getCurrentWeatherIcon(weather.weather[0].main, weather.weather[0].description, weather?.weather[0].icon);
			setCurrentWeatherState(weatherCondition);
		}
	}, [props.weather]);

	return (
		<>
			{weather 
				? 
					<div className='weather-data-wrapper ms-1 d-flex flex-column justify-content-between'>
						<div className='weather-main d-flex mb-2'>
							<div className='weather-data w-50 d-flex flex-column'>
								<div>
									<p className='date-time mb-0 ms-1'>{timeString}</p>
									<h1 className='location'>{`${weather?.name}, ${weather?.sys?.country}`}</h1>
									<h5 className='mt-2'>{<span>Feels like {Math.floor(weather?.main.feels_like - 273)}<span>&#176;</span>C</span>}, {weather?.weather[0].description}</h5>
								</div>
								<div className='temps d-flex'>
									<div className='Current-temp'>
										<h1 className='temperature'>{`${Math.floor(weather?.main.temp - 273)}`}<span>&#176;</span>C</h1>
									</div>
									<div className='up-down-temp ms-4 d-flex flex-column justify-content-between'>
										<h4 className='upper-temp'>{`${Math.floor(weather?.main.temp_min - 273)}`}<span>&#176;</span>C</h4>
										<h4 className='lower-temp'>{`${Math.floor(weather?.main.temp_max - 273)}`}<span>&#176;</span>C</h4>
									</div>
								</div>
							</div>

							<div className='weather-icon w-50'>
								<div className='icon-wrapper h-100'>
									{/* <img className='weather-icon' src={cloudy} /> */}
									{currentWeatherState}
								</div>
							</div>
						</div>
						<div className='weather-details pt-2 ps-2 d-flex flex-wrap justify-content-between'>
							<WeatherDetails customClass='mt-4' fontSize='fs-6' name={isDay ? 'sunset' : 'sunrise' } icon={isDay ? 'sunset' : 'sunrise' } value = {`${getTime(weather?.sys[isDay ? 'sunset' : 'sunrise' ])}`} />
							<WeatherDetails customClass='mt-4' fontSize='fs-6' name='humidity' icon='humidity' value = {<span>{weather?.main.humidity} %</span>} />
							<WeatherDetails customClass='mt-4' fontSize='fs-6' name='wind' icon='wind' value = {<span>{weather?.wind?.speed} m/s {degToCompass(weather?.wind?.deg)}</span>} />
							<WeatherDetails customClass='mt-4' fontSize='fs-6' name='pressure' icon='pressure' value = {<span>{weather?.main?.pressure} hPa</span>} />
							<WeatherDetails customClass='mt-4' fontSize='fs-6' name='Clouds cover' icon='clouds_cover' value = {<span>{weather?.clouds.all}<span>%</span></span>} />
							<WeatherDetails customClass='mt-4' fontSize='fs-6' name='Visibility' icon='visibility' value = {<span>{weather.visibility/1000} Km</span>} />
						</div>
					</div>
				:
				<Loader />
			}
			
		</>
	)
}

export default WeatherData;