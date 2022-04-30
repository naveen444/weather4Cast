import React from 'react';
import './IconStyles.css';

const Haze = () => {
	return (
		<svg
			version="1.1"
			xmlnsXlink="http://www.w3.org/2000/svg"
			xlinkHref="http://www.w3.org/1999/xlink"
			width="260"
			height="240"
			viewBox="0 0 100 100">
			<line className="am-weather-haze-1" fill="none" stroke="#C6DEFF" filter='blur(0.6px)' strokeDasharray="16,16" strokeLinecap="round" strokeWidth="6" x1="40" x2="60" y1="22" y2="22" />
				<line className="am-weather-haze" fill="none" stroke="#C6DEFF" filter='blur(0.6px)' strokeDasharray="16,16" strokeLinecap="round" strokeWidth="6" x1="20" x2="80" y1="30" y2="30" />
				<line className="am-weather-haze-1" fill="none" stroke="#C6DEFF" filter='blur(0.6px)' strokeDasharray="12,12" strokeLinecap="round" strokeWidth="6" x1="10" x2="100" y1="38" y2="38" />
				<line className="am-weather-haze" fill="none" stroke="#C6DEFF" filter='blur(0.6px)' strokeDasharray="14,14" strokeLinecap="round" strokeWidth="6" x1="20" x2="80" y1="46" y2="46" />
				<line className="am-weather-haze-1" fill="none" stroke="#C6DEFF" filter='blur(0.6px)' strokeDasharray="13,13" strokeLinecap="round" strokeWidth="6" x1="10" x2="100" y1="54" y2="54" />
				<line className="am-weather-haze" fill="none" stroke="#C6DEFF" filter='blur(0.6px)' strokeDasharray="16,16" strokeLinecap="round" strokeWidth="6" x1="20" x2="80" y1="62" y2="62" />
				<line className="am-weather-haze-1" fill="none" stroke="#C6DEFF" filter='blur(0.6px)' strokeDasharray="16,16" strokeLinecap="round" strokeWidth="6" x1="40" x2="60" y1="70" y2="70" />
		</svg>
	)
}

export default Haze;