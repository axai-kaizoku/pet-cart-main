import React, { useEffect } from 'react';
import './styles.css';
import Layout from '../../components/Layout';
import Banner from '../../components/Banner';
import useCategory from '../../hooks/useCategory';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';

import dog from '../../assets/categories/dogs/dog.jpeg';
import cat from '../../assets/categories/cats/cat.jpeg';
import fish from '../../assets/categories/fish/fish.jpeg';
import hamster from '../../assets/categories/hamsters/hamster.jpeg';
import bird from '../../assets/categories/parrots/parrot.jpeg';
import americanj from '../../assets/homepage/brands/american-j.jpg';

import blue from '../../assets/homepage/brands/blue.jpg';
import fancyFeast from '../../assets/homepage/brands/fancy-feast.jpg';
import greenies from '../../assets/homepage/brands/greenies.jpg';
import hills from '../../assets/homepage/brands/hills.jpg';
import nexgard from '../../assets/homepage/brands/nexgard.jpg';
import nutro from '../../assets/homepage/brands/nutro.jpg';
import purina from '../../assets/homepage/brands/purina.jpg';
import royalCannin from '../../assets/homepage/brands/royal-canin.jpg';
import vibeful from '../../assets/homepage/brands/vibeful.jpeg';

const brands = [
	{
		name: 'American Journey',
		url: americanj,
	},
	{
		name: 'Blue Buffalo',
		url: blue,
	},
	{
		name: 'Fancy Feast',
		url: fancyFeast,
	},
	{
		name: 'Greenies',
		url: greenies,
	},
	{
		name: 'Hills',
		url: hills,
	},
	{
		name: 'Nexgard',
		url: nexgard,
	},
	{
		name: 'Nutro',
		url: nutro,
	},
	{
		name: 'Purina',
		url: purina,
	},
	{
		name: 'Royal Canin',
		url: royalCannin,
	},
	{
		name: 'Vibeful',
		url: vibeful,
	},
];

const Home = () => {
	const [load, setLoad] = useLoad();
	const category = useCategory();

	category.map((c) => {
		if (c.slug === 'dog') {
			c.img = dog;
		}
		if (c.slug === 'cat') {
			c.img = cat;
		}
		if (c.slug === 'hamster') {
			c.img = hamster;
		}
		if (c.slug === 'bird') {
			c.img = bird;
		}
		if (c.slug === 'fish') {
			c.img = fish;
		}
	});

	useEffect(() => {
		setLoad(true);
		const timer = setTimeout(() => {
			setLoad(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Layout title="Home">
			<Banner />
			<Loading isLoading={load} />
			<div className="categories">
				<div className="category-container">
					<div className="category-heading">
						<h2>Shop By Pet</h2>
					</div>
					<div className="categories-section">
						{category.map(({ name, img, slug }, index) => (
							<Link
								id="link"
								to={`/store/category/${slug}`}
								key={index}>
								<div
									key={index}
									className="individual-category">
									<img
										src={img}
										alt={name}
									/>
									<p>{name}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div className="brand-container">
					<div className="brand-heading">
						<h2>Top Brands</h2>
					</div>
					<div className="brands-section">
						{brands.map(({ name, url }, index) => (
							<div
								key={index}
								className="individual-brand">
								<img
									src={url}
									alt={name}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
