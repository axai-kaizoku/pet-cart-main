import React from 'react';
import './styles.css';
import Layout from '../../components/Layout';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import about from '../../assets/homepage/about.jpg';

const About = () => {
	return (
		<Layout>
			<div className="about-page">
				<img
					src={about}
					alt="about"
				/>
				<div className="overlay-text">
					<h1>About Us</h1>
					<div className="about-page-content">
						<div className="site-desc">
							<h2>PetCart: Unleashing Pet Happiness in Every Click!</h2>
							<p>
								PetCart offers a curated selection of premium pet products,
								nutritious food, and accessories. Experience effortless
								shopping, trusted quality, fast delivery, and join a vibrant
								pet-loving community. Your one-stop destination for pet
								happiness!
							</p>
						</div>
						<div className="personal-info">
							<a
								className="github"
								href="//github.com/axai-kaizoku"
								target="_blank"
								rel="noreferrer">
								<GitHubIcon /> axai-kaizoku
							</a>
							<a
								className="linkedin"
								href="//linkedin.com/in/akshay-yelle/"
								target="_blank"
								rel="noreferrer">
								<LinkedInIcon /> akshay-yelle
							</a>
							<a
								className="mail"
								href="mailto:02b3akshay@gmail.com"
								target="_blank"
								rel="noreferrer">
								<EmailIcon /> 02b3akshay@gmail.com
							</a>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default About;
