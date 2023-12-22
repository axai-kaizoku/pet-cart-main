import React, { useState, useEffect } from 'react';
import './styles.css';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';

// import ScrollCart from '../../components/ScrollCart';
// import ReviewCard from '../../components/ReviewCard';
// import StarRating from '../../components/StarRating';
// import { Link } from 'react-router-dom';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import { Button, Modal, Rating } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';

// const StyledRating = styled(Rating)({
// 	'& .MuiRating-iconFilled': {
// 		color: '#4e97d8',
// 	},
// 	'& .MuiRating-iconHover': {
// 		color: '#88c0e0',
// 	},
// });

const ProductDetails = () => {
	const auth = true;
	const reviews = [];
	const params = useParams();
	const [cart, setCart] = useCart();
	// const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);
	const [product, setProduct] = useState({});

	// initial product
	useEffect(() => {
		if (params?.slug) getProduct();
	}, [params?.slug]);

	// get product func
	const getProduct = async () => {
		try {
			const { data } = await axios.get(
				`/api/v1/product/get-product/${params.slug}`,
			);
			setProduct(data?.product);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Layout>
			<div className="product-details">
				{/* <ScrollCart /> */}
				<div className="inner-container">
					<section>
						<div className="left-container">
							<Link
								id="back-to-cart-btn"
								to="/store">
								Back
							</Link>
							<img
								className="product-img"
								src={`/api/v1/product/product-image/${product._id}`}
								alt="e-commerce"
							/>
						</div>
						<div className="right-container">
							<h1 className="product-name">{product.name}</h1>
							<div className="product-reviews-div">
								<div className="star-rating">{/* <StarRating /> */}</div>
								<p>(1 review)</p>
							</div>
							<p className="product-description">{product.description}</p>
							<div className="right-lower-container">
								<div className="right-lower-container-inner">
									<span>Quantity</span>
									<div className="select-quantity">
										<select
											name=""
											id="select-quantity">
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select>
									</div>
								</div>
								<div className="right-lower-container-price">
									<span className="product-price">${product.price}</span>
									<div className="buy-wishlist-btns">
										<button
											className="add-to-cart-btn"
											onClick={() => {
												setCart([...cart, product]);
												localStorage.setItem(
													'cart',
													JSON.stringify([...cart, product]),
												);
												toast.success('Item added to cart');
											}}>
											Add To Cart
										</button>
										{auth && (
											<button className="add-to-wishlist-btn">
												{/* <BookmarkIcon /> */}
											</button>
										)}
									</div>
								</div>
								<div className="give-product-rating-review">
									<div className="rating-div">
										{/* <Button onClick={handleOpen}>
											<p>Rate or Review Product</p>
										</Button> */}
										{/* <Modal
											open={open}
											onClose={handleClose}
											aria-labelledby="modal-modal-title"
											aria-describedby="modal-modal-description">
											<div className="rating-modal">
												<div className="rating-modal-inner">
													<h4>Product Rating</h4>
													<StyledRating
														icon={<StarIcon fontSize="inherit" />}
														emptyIcon={<StarBorderIcon fontSize="inherit" />}
													/>
													<textarea
														name="review"
														id="review-div"
														cols="30"
														rows="3"></textarea>
													<div className="review-btns">
														<button
															className="close-btn"
															onClick={handleClose}>
															Close
														</button>
														<button type="submit">Submit</button>
													</div>
												</div>
											</div>
										</Modal> */}
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
				{reviews?.length === 0 ? (
					<div className="product-review-section">
						<h2>Reviews</h2>
						<hr />
						<div className="reviews-section">
							{/* <ReviewCard />
							<ReviewCard />
							<ReviewCard /> */}
						</div>
						<></>
					</div>
				) : (
					<div className="product-review-section">
						<h2>No Reviews for the Product</h2>
						<br />
						<h3>Be the first one to review!</h3>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default ProductDetails;
