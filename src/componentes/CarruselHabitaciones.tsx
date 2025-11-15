
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight, FaStar, FaBed } from 'react-icons/fa';
import './CarruselHabitaciones.css';
import { cardData } from './infoRooms';
import { RoomDetail } from './RoomDetail';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
	className?: string;
	style?: React.CSSProperties;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const habitaciones = [
	{
		imagen: 'https://res.cloudinary.com/dfznn7pui/image/upload/v1762430763/habitacion_2_m1j14z.jpg',
		titulo: 'Habitación DOBLE',
		rating: 4.5,
	},
	{
		imagen: 'https://res.cloudinary.com/dfznn7pui/image/upload/v1762430778/habitacion_6_kdylco.jpg',
		titulo: 'Habitación SUITE',
		rating: 5.0,
	},
	{
		imagen: 'https://res.cloudinary.com/dfznn7pui/image/upload/v1762430793/habitacion_1_rbtxef.jpg',
		titulo: 'Habitación FAMILIAR',
		rating: 5.0,
	},
	{
		imagen: 'https://res.cloudinary.com/dfznn7pui/image/upload/v1762430797/habitacion_4_yciotd.jpg',
		titulo: 'Habitación TRIPLE',
		rating: 4.8,
	},
	{
		imagen: 'https://res.cloudinary.com/dfznn7pui/image/upload/v1762631165/Habitacion-9-personas_zyeepv.png',
		titulo: 'Habitación FAMILIAR GRANDE',
		rating: 5.0,
	},
	{
		imagen: 'https://res.cloudinary.com/dfznn7pui/image/upload/v1762430787/habitacion_5_njubuv.jpg',
		titulo: 'Habitación DOBLE SENCILLA',
		rating: 4.2,
	},
];

const PrevArrow = (props: ArrowProps) => {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style }} onClick={onClick}>
			<FaChevronLeft />
		</div>
	);
};

const NextArrow = (props: ArrowProps) => {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style }} onClick={onClick}>
			<FaChevronRight />
		</div>
	);
};

const CarruselHabitaciones: React.FC = () => {
	const [selectedRoom, setSelectedRoom] = useState<any>(null);
	const [slidesToShow, setSlidesToShow] = useState(3);
	const sliderRef = React.useRef<Slider>(null);
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setSlidesToShow(1);
			} else if (width < 1024) {
				setSlidesToShow(2);
			} else {
				setSlidesToShow(3);
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize(); // Ejecuta al montar
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: slidesToShow,
		slidesToScroll: 1,
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
	};
	return (
		<div className="carrusel-habitaciones-container">
			<div className="carrusel-header">
				<div className="carrusel-title-button">
					<FaBed />
					<span>HABITACIONES</span>
				</div>
			</div>
			<Slider ref={sliderRef} {...settings}>
				{habitaciones.map((habitacion, index) => (
					<div key={index} className="habitacion-card">
						<img src={habitacion.imagen} alt={habitacion.titulo} />
						<div className="habitacion-info">
							<div className="habitacion-rating">
								{[...Array(5)].map((_, i) => (
									<FaStar key={i} color={i < Math.floor(habitacion.rating) ? '#ffc107' : '#e4e5e9'} />
								))}
								<span>{habitacion.rating.toFixed(1)}</span>
							</div>
							<h3>{habitacion.titulo}</h3>
							<button
								className="reservar-button"
								onClick={() => {
									const found = cardData.find(c =>
										(habitacion.titulo && c.subtitle && habitacion.titulo.toUpperCase().includes(c.subtitle.toUpperCase())) ||
										c.imageUrl === habitacion.imagen ||
										c.detailImageUrl === habitacion.imagen
									);
									if (found) {
										setSelectedRoom(found);
									} else {
										setSelectedRoom({
											detailImageUrl: habitacion.imagen,
											subtitle: habitacion.titulo.replace(/Habitaci[oó]n\s*/i, '').toUpperCase(),
											services: [],
											price: 0,
										});
									}
								}}
							>
								Reservar
							</button>
						</div>
					</div>
				))}
			</Slider>
			{selectedRoom && (
				<RoomDetail room={selectedRoom} visible={selectedRoom !== null} onHide={() => setSelectedRoom(null)} />
			)}
			<div className="ver-mas-container">
				<Link to="/habitaciones">
					<button className="ver-mas-button">Ver más habitaciones</button>
				</Link>
			</div>
		</div>
	);
};

export default CarruselHabitaciones;