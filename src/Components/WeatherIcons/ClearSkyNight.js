import React from 'react'

const ClearSkyNight = () => {
	return (
		<svg
			version="1.1"
			xmlnsXlink="http://www.w3.org/2000/svg"
			xlinkHref="http://www.w3.org/1999/xlink"
			width="260"
			height="240"
			viewBox="0 0 100 100">
			<defs>
				<filter id="blur" width="200%" height="200%">
					<feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
					<feOffset dx="0" dy="4" result="offsetblur"/>
					<feComponentTransfer>
						<feFuncA type="linear" slope="0.05"/>
					</feComponentTransfer>
					<feMerge> 
						<feMergeNode/>
						<feMergeNode in="SourceGraphic"/> 
					</feMerge>
				</filter>
			</defs>
			<g filter="" id="night" transform='scale(3)'>
				<g transform="translate(5,4)">
					<g className="am-weather-moon-star-1">
						<polygon fill="orange" points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7" stroke="none" strokeMiterlimit="10"/>
					</g>
					<g className="am-weather-moon-star-2">
						<polygon fill="orange" points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7" stroke="none" strokeMiterlimit="10" transform="translate(20,10)"/>
					</g>
					<g className="am-weather-moon">
						<path d="M14.5,13.2c0-3.7,2-6.9,5-8.7c-1.5-0.9-3.2-1.3-5-1.3c-5.5,0-10,4.5-10,10s4.5,10,10,10c1.8,0,3.5-0.5,5-1.3C16.5,20.2,14.5,16.9,14.5,13.2z" fill="orange" stroke="orange" strokeLinejoin="round" strokeWidth="2"/>
					</g>
				</g>
			</g>
		</svg>
	)
}

export default ClearSkyNight;