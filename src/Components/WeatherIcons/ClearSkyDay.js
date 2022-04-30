import React from 'react';
import './IconStyles.css';

const ClearSkyDay = () => {
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
			<g filter="" id="day" transform='scale(3)'>
				<g transform="translate(16,16)">
					<g className="am-weather-sun am-weather-sun-shiny am-weather-easing-ease-in-out">
						<g>
							<line fill="none" stroke="orange" strokeLinecap="round" strokeWidth="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
						</g>
						<g transform="rotate(45)">
							<line fill="none" stroke="orange" strokeLinecap="round" strokeWidth="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
						</g>
						<g transform="rotate(90)">
							<line fill="none" stroke="orange" strokeLinecap="round" strokeWidth="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
						</g>
						<g transform="rotate(135)">
							<line fill="none" stroke="orange" strokeLinecap="round" strokeWidth="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
						</g>
						<g transform="rotate(180)">
							<line fill="none" stroke="orange" strokeLinecap="round" strokeWidth="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
						</g>
						<g transform="rotate(225)">
							<line fill="none" stroke="orange" strokeLinecap="round" strokeWidth="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
						</g>
						<g transform="rotate(270)">
							<line fill="none" stroke="orange" strokeLinecap="round" strokeWidth="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
						</g>
						<g transform="rotate(315)">
							<line fill="none" stroke="orange" strokeLinecap="round" strokeWidth="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
						</g>
					</g>
					<circle cx="0" cy="0" fill="orange" r="5" stroke="orange" strokeWidth="2"/>
				</g>
			</g>
		</svg>
	)
}

export default ClearSkyDay;