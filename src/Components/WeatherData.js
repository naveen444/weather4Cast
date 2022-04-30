import React, { useEffect, useState } from 'react';
import WeatherDetails from './WeatherDetails';
import ClearSkyDay from './WeatherIcons/ClearSkyDay';
import ClearSkyNight from './WeatherIcons/ClearSkyNight';
import FewCloudsDay from './WeatherIcons/FewCloudsDay';
import FewCloudsNight from './WeatherIcons/FewCloudsNight';
import Cloudy from './WeatherIcons/Cloudy';
import BrokenCloudy from './WeatherIcons/BrokenCloudy';
import Thunder from './WeatherIcons/Thunder';
import LightRainDay from './WeatherIcons/LightRainDay';
import LightRainNight from './WeatherIcons/LightRainNight';
import ModerateRainDay from './WeatherIcons/ModerateRainDay';
import ModerateRainNight from './WeatherIcons/ModerateRainNight';
import HeavyIntensityRainDay from './WeatherIcons/HeavyIntensityRainDay';
import HeavyIntensityRainNight from './WeatherIcons/HeavyIntensityRainNight';
import VeryHeavyRain from './WeatherIcons/VeryHeavyRain';
import FreezingRain from './WeatherIcons/FreezingRain';
import VeryHeavyShowerRain from './WeatherIcons/VeryHeavyShowerRain';
import LightSnow from './WeatherIcons/LightSnow';
import HeavySnow from './WeatherIcons/HeavySnow';
import HeavyShowerSnow from './WeatherIcons/HeavyShowerSnow';
import Haze from './WeatherIcons/Haze';
import Loader from './Loader';

import getCurrentWeatherIcon from './getWeatherIcon';

const WeatherData = (props) => {

	const [currentWeatherState, setCurrentWeatherState] = useState(<Cloudy />);
	
	const weather = props.weather;
	let isDay = '';
	let weatherCon = '';
	let weatherCondition = '';

	const getTime = (timeStamp) => {
		return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
	}

	function degToCompass(num) {
		const val = parseInt((num/22.5)+.5);
		const arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
		return arr[(val % 16)]
	}

	if (props.weather) {
		isDay = weather?.weather[0].icon?.includes('d');
	}
	
	useEffect(()=> {
		if (props.weather) {
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
									<p className='date-time mb-0 ms-1'>{props.date}, {props.time}</p>
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
							<WeatherDetails name={isDay ? 'sunset' : 'sunrise' } icon={isDay ? 'sunset' : 'sunrise' } value = {`${getTime(weather?.sys[isDay ? 'sunset' : 'sunrise' ])}`} />
							<WeatherDetails name='humidity' icon='humidity' value = {<span>{weather?.main.humidity} %</span>} />
							<WeatherDetails name='wind' icon='wind' value = {<span>{weather?.wind?.speed} m/s {degToCompass(weather?.wind?.deg)}</span>} />
							<WeatherDetails name='pressure' icon='pressure' value = {<span>{weather?.main?.pressure} hPa</span>} />
							<WeatherDetails name='Dew Point' icon='dew_point' value = {<span>{Math.floor(props.dewPoint - 273)}<span>&#176;</span>C</span>} />
							<WeatherDetails name='Visibility' icon='visibility' value = {<span>{weather.visibility/1000} Km</span>} />
						</div>
					</div>
				:
				<Loader />
			}
			
		</>
	)
}

export default WeatherData;