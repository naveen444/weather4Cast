import axios from "axios";
import swal from "sweetalert";

const clientId = process.env.REACT_APP_API_KEY;

export async function getWeather(city = "london") {

	const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${clientId}`;
	const response = await axios.get(url)
		.catch((error) => {
			if (error.response.status === 404) {
				swal({
					title: "Invalid City Name",
					text: "Please enter a valid city name",
					icon: "error"
				})
			}
		});

	return response;

	// console.log(response.data);
}

export async function getOneCall(lat, lon) {

	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${clientId}`;
	const response = await axios.get(url);

	return response;
}