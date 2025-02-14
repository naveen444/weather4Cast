import axios from "axios";
import swal from "sweetalert";

const clientId = process.env.REACT_APP_API_KEY;

export async function getWeather(city = "Delhi") {

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${clientId}`;
	const response = await axios.get(url)
		.catch((error) => {
			if (error.response.status === 404) {
				swal({
					title: "Invalid City, State Name",
					text: "Please enter a valid city or state name",
					icon: "error"
				})
			}
		});

	return response;

}

export async function getOneCall(lat, lon) {

	// https://api.openweathermap.org/data/2.5/forecast?q=Delhi&APPID=415711cc93f283732eb8673164284706
	const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${clientId}`;
	const response = await axios.get(url);
	
	return response;
}