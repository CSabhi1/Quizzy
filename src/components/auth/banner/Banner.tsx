/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
	BannerContainer,
	BannerHeading,
	SlideContainer,
} from "./Banner.styles";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

declare global {
	interface Window {
		VANTA: any;
	}
}

const sliderContent = [
	{
		title: "Create & Share Quizzes Effortlessly",
		description:
			"Design custom quizzes in minutes and share them instantly with others. No hassle, just fun!",
	},
	{
		title: "Engage & Challenge Participants",
		description:
			"Make learning interactive with exciting quizzes that keep participants engaged and motivated.",
	},
	{
		title: "Track Progress & Improve Knowledge",
		description:
			"Get instant results, analyze performance, and boost your learning experience with real-time insights.",
	},
];

const sliderSettings = {
	dots: true,
	speed: 2000,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	arrows: false,
	fade: true,
	waitForAnimate: true,
};

const Banner: React.FC = () => {
	const [vantaEffect, setVantaEffect] = useState<any | null>(null);
	const vantaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!vantaEffect && vantaRef.current) {
			const effect = window.VANTA?.TOPOLOGY?.({
				el: vantaRef.current,
				mouseControls: true,
				touchControls: true,
				gyroControls: false,
			});

			if (effect) setVantaEffect(effect);
		}

		return () => {
			vantaEffect?.destroy?.();
		};
	}, [vantaEffect]);

	return (
		<BannerContainer ref={vantaRef}>
			<BannerHeading>
				Where Questions Turn Into Challenges And Learning Becomes A Game. Dive
				In And Start Quizzing!
			</BannerHeading>

			<Box sx={{ width: "35vw", alignSelf: "center", marginBottom: 5 }}>
				<Slider {...sliderSettings}>
					{sliderContent.map((slide, index) => (
						<SlideContainer key={index}>
							<Typography color="white" fontSize={20} fontWeight={500}>
								{slide.title}
							</Typography>
							<Typography color="white" fontWeight={300} mt={1}>
								{slide.description}
							</Typography>
						</SlideContainer>
					))}
				</Slider>
			</Box>
		</BannerContainer>
	);
};

export default Banner;
