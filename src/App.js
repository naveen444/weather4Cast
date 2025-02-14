import { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';
import WeeklyWeather from './Components/WeeklyWeather';
import { GoSearch } from 'react-icons/go';
import { getOneCall, getWeather } from './Components/api';
import WeatherData from './Components/WeatherData';
import swal from 'sweetalert';
import heart from './assets/heart.png';
import Background from './Components/Background';
import citiesData from './assets/json/countries+states+cities.json';

function App() {

	const [search, setSearch] = useState([]);
	const [debouncedSearch, setDebouncedSearch] = useState(""); // Processed input with delay
	const [searchString, setSearchString] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const [weather, setWeather] = useState(false);
	const [weeklyData, setWeeklyData] = useState('');
	const prevCoords = useRef({ lat: null, lon: null });

	// Create indexed data ONCE when app loads
	const indexedData = useMemo(() => {
		const cityMap = new Map();
		const stateMap = new Map();

		citiesData.forEach(country => {

				country.states.forEach(state => {
						stateMap.set(state.name.toLowerCase(), { name: state.name, code: state.state_code, country: country.iso2, type: "state" });

						state.cities.forEach(city => {
								cityMap.set(city.name.toLowerCase(), {
										name: city.name,
										state: state.name,
										stateCode: state.state_code,
										country: country.name,
										countryCode: country.iso2,
										latitude: city.latitude,
										longitude: city.longitude,
										type: "city",
								});
						});
				});
		});

		return { cityMap, stateMap };
	}, []);
	
	const processLocationData = (query) => {
    if (!query) return []; // Consider trimming the query to prevent accidental spaces affecting results
    
    query = query.toLowerCase();
    let results = [];
    
    // Filter cities, states, and countries where name starts with query
    results.push(...Array.from(indexedData.cityMap.values()).flat().filter(item => item.name.toLowerCase().startsWith(query)));
		results.push(...Array.from(indexedData.stateMap.values()).filter(item => item.name.toLowerCase().startsWith(query)));
    
    return results;
	};

	const searchbar = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		setSearch(inputValue);

		if (!inputValue.trim()) {
			setSuggestions([]);
			return;
		}

		// const results = processLocationData(citiesData, inputValue);

		// setSuggestions(results.slice(0, 5)); // Show top 5 matches
	}

	const fetchWeather = async (e) => {
		e?.preventDefault();
		setSuggestions([]);

		const query = searchString || search;
		if (!query.trim()) return;

		const response = await getWeather(query);
    if (!response) {
			swal({
					title: "Invalid City Name",
					text: "Please enter a valid city name",
					icon: "error",
					closeOnClickOutside: true,
					className: "customAlert",
			});
			return;
    }

    setWeather(response.data);
    setSearchString(false);

		// Fetch OneCall API only if coords change
    const { lat, lon } = response.data.coord;
    if (prevCoords.current.lat !== lat || prevCoords.current.lon !== lon) {
        prevCoords.current = { lat, lon }; // Store latest coords
        handleData(lat, lon);
    }

	}

	const getWeatherData = async () => {
		const resp = await getWeather();
		return resp;
	}

	const handleData = async (lat, lon) => {
		const resp = await getOneCall(lat, lon);

		setWeeklyData(resp.data.list);
	}

  // Handle selecting a city from the suggestions
	const onSelectSuggestion = (selectedItem) => {
		let formattedSearch;

    if (selectedItem.state) {
			formattedSearch = `${selectedItem.name},${selectedItem.stateCode},${selectedItem.countryCode}`;
    } else {
			formattedSearch = `${selectedItem.name},${selectedItem.countryCode}`;
    }

		setSearch(`${selectedItem.name}${selectedItem.state ? `, ${selectedItem.state}` : ''}, ${selectedItem.country}`);
		setSearchString(formattedSearch);
    setSuggestions([]); // Hide suggestions
	};

	// Use useEffect to call fetchWeather after searchString updates
	useEffect(() => {
		if (searchString) {
			fetchWeather(); // Now it runs only when searchString is fully updated
		}
	}, [searchString]); // Runs whenever searchString updates

	useEffect(() => {
		getWeatherData().then((resp) => {
			if (resp?.data?.coord) {
				handleData(resp?.data?.coord?.lat, resp?.data?.coord?.lon);
				setWeather(resp.data);
			}
		}).catch((error) => console.error("Error fetching initial weather:", error));
	}, []);

	// Debounce Effect
	useEffect(() => {
		if (typeof search !== "string" || !search.trim()) {
			setDebouncedSearch(""); // Prevent unnecessary processing
			return;
		}

		const handler = setTimeout(() => {
			setDebouncedSearch(search);
		}, 200); // 300ms delay

		return () => clearTimeout(handler); // Cleanup function to reset timer
	}, [search]); // Runs when `search` changes

	// Fetch Suggestions Based on Debounced Input
	useEffect(() => {
		if (typeof debouncedSearch !== "string" || !debouncedSearch.trim()) {
			setSuggestions([]); // ✅ Clear suggestions if input is empty
			return;
		}
		setSuggestions(processLocationData(debouncedSearch).slice(0, 5));
	}, [debouncedSearch]); // Runs only when debouncedSearch changes

	return (
		<div className="App">
			{/* Background Component */}
			<Background weather={weather} />

			<div className='container glass p-4 pb-2 d-flex flex-column justify-content-center align-items-center gap-3'>
				<div className='container d-flex justify-content-between'>
					<div className='left-container d-flex flex-column'>
						<form onSubmit={fetchWeather} className="search-bar col input-group m-0 mb-3 me-3 p-1 border border-dark rounded-pill">
							<input 
								type="text"
								className="form-control text-dark bg-transparent m-0 p-0 px-4"
								placeholder="Enter any City or State"
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
							{/* Suggestions Dropdown */}
							{suggestions.length > 0 && (
								<ul className="list-group position-absolute w-100 shadow bg-white rounded top-100">
									{suggestions.map((item, index) => (
										<li
											key={index}
											className="list-group-item list-group-item-action"
											onClick={() => onSelectSuggestion(item)}
											style={{ cursor: "pointer" }}
										>
											{item.name}{item.state ? `, ${item.state}` : ''}, {item.country}
										</li>
									))}
								</ul>
							)}
						</form>

						<WeatherData weather={weather} />

					</div>

					<div className='right-container d-flex flex-column'>
						<h3 className='right-title text-center'>Weather Ahead</h3>
						<div className='weekly-wrapper mt-3 mb-0'>
							<WeeklyWeather weeklyData={weeklyData} />
						</div>
					</div>
				</div>
				<div className='dataProvidedBy'>
					<p style={{ margin: '0px' }}>
						Weather data provided by &nbsp;
						<a href="https://openweathermap.org/" target="_blank">
							OpenWeather
							<img src="https://home.openweathermap.org/assets/logo_60x60-0da28d91c6147db3c88ab90ed7fc7e120b1c788508281f0b7eadd108ac68b216.png" alt="OpenWeather" />
						</a>
					</p>
				</div>
			</div>
			<h6 className='owner text-center'>Made with <img src={heart} alt="Love" style={{ width: '20px' }} /> by <a target='_blank' href="https://www.linkedin.com/in/naveenk444/">Naveen</a></h6>
		</div>
	);
}

export default App;
