import { useState, useEffect } from 'react';
import './App.css';
import WeeklyWeather from './Components/WeeklyWeather';
import { GoSearch } from 'react-icons/go';
import { getOneCall, getWeather } from './Components/api';
import WeatherData from './Components/WeatherData';
import swal from 'sweetalert';
import heart from './assets/heart.png';
import changeBackground from './Components/changeBackground';

changeBackground();

function App() {

	const [search, setSearch] = useState([]);
	const [weather, setWeather] = useState(false);
	const [data, setData] = useState({ cdate: '', ctime: '', dewPoint: '' });
	const [weeklyData, setWeeklyData] = useState('')
	
	const searchbar = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	}

	const fetchWeather = async (e) => {
		e.preventDefault();
		changeBackground();
		await getWeather(search).then((resp)=>{
			if (resp === undefined) {
				swal({
					title: "Invalid City Name",
					text: "Please enter a valid city name",
					icon: "error",
					closeOnClickOutside: true,
					className: "customAlert",
				})
			} else{
				setWeather(resp.data)
				handleData(resp?.data?.coord?.lat, resp?.data?.coord?.lon);
			}
		});
	}

	const getWeatherData = async () => {
		const resp = await getWeather();
		return resp;
	}

	const handleData = async (lat, lon) => {
		const resp = await getOneCall(lat, lon);

		setWeeklyData(resp.data.daily);

		const datetime_str = new Date().toLocaleString("en-US", { timeZone: resp.data.timezone });
		let date = new Date(datetime_str);
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		const newdate = days[date.getDay()] + " , " + months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		
		let dewPoint = resp?.data?.current?.dew_point
		setData({cdate: newdate, ctime: strTime, dewPoint: dewPoint});
	}

	useEffect(() => {
		getWeatherData().then((resp) => {
			handleData(resp?.data?.coord?.lat, resp?.data?.coord?.lon);
			setWeather(resp.data)
		});
	}, [])

	return (
		<div className="App">
			<div className='container glass p-4 d-flex justify-content-between'>
				<div className='left-container d-flex flex-column'>
					<form onSubmit={fetchWeather} className="search-bar col input-group m-0 mb-3 me-3 p-1 border border-dark rounded-pill">
						<input 
							type="text"
							className="form-control text-dark bg-transparent m-0 p-0 px-4"
							placeholder="Enter any City, State or Country"
							aria-label="Recipient's username"
							aria-describedby="button-addon"
							onChange={searchbar} 
							value={search} 
						/>
						<button 
							className="search-btn btn btn-transparent py-1 px-2 border-dark rounded-circle" 
							type="submit" 
							id="button-addon" 
						>
							<GoSearch /><span>Search</span>
						</button>
					</form>

					<WeatherData weather={weather} date={data.cdate} time={data.ctime} dewPoint={data.dewPoint} />

				</div>

				<div className='right-container d-flex flex-column'>
					<h2 className='right-title text-center'>Weekly Weather</h2>
					<div className='weekly-wrapper mt-3 mb-0'>
						<WeeklyWeather weeklyData={weeklyData} />
					</div>
				</div>
			</div>
			<h6 className='owner text-center'>Made with <img src={heart} alt="Love" /> by <a href="https://github.com/naveen444">Naveen</a></h6>
		</div>
	);
}

export default App;
