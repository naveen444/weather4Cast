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

const obj = {
	Clear: {"day" : <ClearSkyDay />, "night": <ClearSkyNight />},
	Clouds: {
		"few clouds": {"day": <FewCloudsDay />, "night": <FewCloudsNight />},
		"scattered clouds": {"day": <Cloudy />, "night": <Cloudy />},
		"broken clouds": {"day": <BrokenCloudy />, "night": <BrokenCloudy />},
		"overcast clouds": {"day": <BrokenCloudy />, "night": <BrokenCloudy />}
	},
	Thunderstorm: <Thunder />,
	Drizzle : <VeryHeavyShowerRain />,
	Rain : {
		"light rain": {"day": <LightRainDay />, "night": <LightRainNight />},
		"moderate rain": {"day": <ModerateRainDay />, "night": <ModerateRainNight />},
		"heavy intensity rain": {"day": <HeavyIntensityRainDay />,"night": <HeavyIntensityRainNight />},
		"very heavy rain": {"day": <VeryHeavyRain />,"night": <VeryHeavyRain />},
		"extreme rain": {"day": <VeryHeavyRain />,"night": <VeryHeavyRain />},
		"freezing rain": {"day": <FreezingRain />,"night": <FreezingRain />},
		"light intensity shower rain": {"day": <VeryHeavyShowerRain />,"night": <VeryHeavyShowerRain />},
		"shower rain": {"day": <VeryHeavyShowerRain />,"night": <VeryHeavyShowerRain />},
		"heavy intensity shower rain": {"day": <VeryHeavyShowerRain /> ,"night": <VeryHeavyShowerRain />},
		"ragged shower rain": {"day": <VeryHeavyShowerRain />,"night": <VeryHeavyShowerRain />},
	},
	Snow: {
		"light snow": <LightSnow />, "Snow": <LightSnow />,
		"Heavy snow": <HeavySnow />, "Sleet": <HeavySnow />,
		"Light shower sleet": <HeavyShowerSnow />, "Shower sleet": <HeavyShowerSnow />,
		"Light rain and snow": <FreezingRain />, "Rain and snow": <FreezingRain />,
		"Light shower snow": <HeavyShowerSnow />,"Shower snow": <HeavyShowerSnow />, 
		"Heavy shower snow": <HeavyShowerSnow />
	},
	Mist: <Haze />, Smoke: <Haze />, Haze: <Haze />,
	Dust: <Haze />, Fog: <Haze />, Sand: <Haze />,
	Ash: <Haze />, Squall: <Haze />, Tornado: <Haze />
}

let weatherCon = '';

export default function getCurrentWeatherIcon(main, description, icon) {

	const weatherIcon = (obj) => {
		for (const key of Object.keys(obj)) {
			if (key === main) {
				if (typeof obj[key][Object.keys(obj[key])[0]] !== 'symbol') {
					weatherIcon(obj[key]);
				}else {
					weatherCon = obj[key];
				}
			} else if (key === description) {
				if (typeof obj[key][Object.keys(obj[key])[0]] !== 'symbol') {
					weatherIcon(obj[key]);
				}else {
					weatherCon = obj[key];
				}
			} else if (key === 'day') {
				if (icon?.includes("d")) {
					weatherCon = obj[key];
				} else {
					continue
				}
			} else if (key === 'night') {
				if (icon?.includes("d")) {
					continue
				} else {
					weatherCon = obj[key];
				}
			} else {
				continue
			}
		}
		return weatherCon;
	}

	const whatIsTheIcon = weatherIcon(obj);

	return whatIsTheIcon;
}