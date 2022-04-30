import React from 'react';
import { WiDayCloudyWindy } from 'react-icons/wi';
import Loader from './Loader';

import getCurrentWeatherIcon from './getWeatherIcon';

const WeeklyWeather = (props) => {

	let dataObject = '';
	let weeklyData = props.weeklyData;

	return (
		<>
			{weeklyData
				?
					<div>
						{weeklyData.slice(1).map((item,i) => {
							var date = new Date(item.dt * 1000).toLocaleDateString("en-us", {weekday: "long", month: "long", day: "numeric"});
							return (
								<div className='day-wrapper d-flex justify-content-between' key={i}>
									<div className='date-date w-50'>
										<h5 className='m-0'>{date}</h5>
										<h6 className='m-0'>feels like {`${Math.floor(item.temp.day - 273)}`}<span>&#176;</span>C, {item.weather[0].description}</h6>
									</div>
									<div className='weekly-temp-wrapper'>
										<h5 className='temp m-0'>{`${Math.floor(item.temp.min - 273)}`}<span>&#176;</span> / {`${Math.floor(item.temp.max - 273)}`}<span>&#176;</span>C</h5>
										<h6 className='m-0'>min / max</h6>
									</div>
										{getCurrentWeatherIcon(item.weather[0].main, item.weather[0].description, item?.weather[0].icon)}
								</div>
							)
						})}
					</div>
				:
				<Loader />
			}
		</>
	)
}

export default WeeklyWeather;