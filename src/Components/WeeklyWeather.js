import React, { useEffect, useMemo } from 'react';
import { WiDayCloudyWindy } from 'react-icons/wi';
import Loader from './Loader';

import getCurrentWeatherIcon from './getWeatherIcon';
import WeatherDetails from './WeatherDetails';

const WeeklyWeather = ({ weeklyData }) => {

	function degToCompass(num) {
		const val = parseInt((num/22.5)+.5);
		const arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
		return arr[(val % 16)]
	}
    
	// Memoize processed data to avoid unnecessary re-calculations
	const processedWeeklyData = useMemo(() => {
			if (!weeklyData || !weeklyData.length) return [];

			let dailyForecast = {};
			let currentTime = new Date();
			let currentHour = currentTime.getHours(); // Get current hour (0-23)

			weeklyData.forEach((item) => {
				let date = new Date(item.dt * 1000).toISOString().split("T")[0];
				let forecastHour = new Date(item.dt * 1000).getHours(); // Extract forecast hour

				// Initialize day entry if not present
				if (!dailyForecast[date]) {
					dailyForecast[date] = {
							min_temp: item.main.temp, // Initialize min temp
							max_temp: item.main.temp, // Initialize max temp
							feels_like: item.main.feels_like, // Placeholder, will be updated below
							weather: {
									main: item.weather[0].main,
									description: item.weather[0].description,
									icon: item.weather[0].icon,
							},
							humidity: {},
							pressure: {},
							wind_speed: {},
							wind_direction: {},
							closestHour: forecastHour,
							hourDifference: Math.abs(forecastHour - currentHour), // Store the difference from current time
					};
				}

				// Update min/max temperatures
				dailyForecast[date].min_temp = Math.min(dailyForecast[date].min_temp, item.main.temp);
				dailyForecast[date].max_temp = Math.max(dailyForecast[date].max_temp, item.main.temp);

				// Count occurrences for humidity, pressure, wind speed, wind direction
				let humidity = item.main.humidity;
				let pressure = item.main.pressure;
				let windSpeed = item.wind.speed;
				let windDirection = item.wind.deg;

				dailyForecast[date].humidity[humidity] = (dailyForecast[date].humidity[humidity] || 0) + 1;
				dailyForecast[date].pressure[pressure] = (dailyForecast[date].pressure[pressure] || 0) + 1;
				dailyForecast[date].wind_speed[windSpeed] = (dailyForecast[date].wind_speed[windSpeed] || 0) + 1;
				dailyForecast[date].wind_direction[windDirection] = (dailyForecast[date].wind_direction[windDirection] || 0) + 1;

				// If this forecast hour is closer to the current time, update feels_like & weather
				let existingDiff = dailyForecast[date].hourDifference;
				let newDiff = Math.abs(forecastHour - currentHour);

				if (newDiff < existingDiff) {
						dailyForecast[date].feels_like = item.main.feels_like;
						dailyForecast[date].weather = {
								main: item.weather[0].main,
								description: item.weather[0].description,
								icon: item.weather[0].icon,
						};
						dailyForecast[date].closestHour = forecastHour;
						dailyForecast[date].hourDifference = newDiff;
				}
		});

		// Convert object to array & find the most common weather description
		const generatedWeatherData = Object.keys(dailyForecast)
			.map(date => {
				let mostCommon = (obj) => Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
				let mostCommonWeatherKey = mostCommon(dailyForecast[date].weather);

				return {
					date,
					min_temp: Math.round(dailyForecast[date].min_temp),
					max_temp: Math.round(dailyForecast[date].max_temp),
					feels_like: Math.round(dailyForecast[date].feels_like),
					humidity: mostCommon(dailyForecast[date].humidity),
					pressure: mostCommon(dailyForecast[date].pressure),
					wind_speed: mostCommon(dailyForecast[date].wind_speed),
					wind_direction: mostCommon(dailyForecast[date].wind_direction),
					weather: dailyForecast[date].weather,
				}
			});
			
		return generatedWeatherData;
	}, [weeklyData]); // Only recompute if `weeklyData` changes

	return (
		<>
			{processedWeeklyData.length > 0 ? (
					<>
						{processedWeeklyData.map((item, i) => {
							if (i > 0) {
								var date = new Date(item.dt * 1000).toLocaleDateString("en-us", {weekday: "long", month: "long", day: "numeric"});

								return (
									<div  key={i} className='day-wrapper'>
										<div className='d-flex justify-content-between'>
											<div className='date-date w-50'>
												<h5 className='m-0'>{new Date(item.date).toLocaleDateString("en-us", {weekday: "long", month: "long", day: "numeric"})}</h5>
												<h6 className='m-0'>feels like {`${Math.floor(item.feels_like - 273)}`}<span>&#176;</span>C, {item.weather.description}</h6>
											</div>
											<div className='weekly-temp-wrapper'>
												<h5 className='temp m-0'>{`${Math.floor(item.min_temp - 273)}`}<span>&#176;</span> / {`${Math.floor(item.max_temp - 273)}`}<span>&#176;</span>C</h5>
												<h6 className='m-0'>min / max</h6>
											</div>
											{getCurrentWeatherIcon(item.weather.main, item.weather.description, item?.weather.icon)}
										</div>
										{/* <div className='weather-details d-flex flex-wrap justify-content-between'>
											<WeatherDetails name='humidity' icon='humidity' value = {<span>{item?.humidity} %</span>} />
											<WeatherDetails name='wind' icon='wind' value = {<span>{item?.wind_speed} m/s {degToCompass(item?.wind_direction)}</span>} />
											<WeatherDetails name='pressure' icon='pressure' value = {<span>{item?.pressure} hPa</span>} />
										</div> */}
									</div>
								)
							}
						})}
					</>
			)	: (
				<Loader />
			)}
		</>
	)
}

export default WeeklyWeather;