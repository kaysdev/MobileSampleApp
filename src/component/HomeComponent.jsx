import React, { useState } from 'react';
import Movies from './MoviesComponent';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Category from './json/category';
import Rating from './json/rating';

const Home = () => {
	const [search, setSearchTerm] = useState('');
	const [showSuggestions, setSuggestion] = useState(false);
	const [category, setCategory] = useState([]);
	const [rating, setRating] = useState([]);
	const handleChange = event => {
		if (event.target.value.length > 0) {
			setSuggestion(true)
		} else {
			setSuggestion(false)
		}
		setSearchTerm(event.target.value);
	};
	
	const handleRating = option => {
		setSuggestion(false)
		setSearchTerm("")
		setRating(option);
	};

	const handleCategory = option => { 
		setSuggestion(false) 
		setSearchTerm("")
		setCategory(option)
	};

	return (
		<div className="row">
			<div className="col-md-6">
				<input type="text" className="form-control" onChange={handleChange} value={search} style={{ width: '100%' }} />
				{showSuggestions && <Movies search={search} category={category} rating={rating} selectMoview={(text, category, rating) => {
					setSuggestion(false)
					setSearchTerm(text)
					setCategory(category)
					setRating(rating)
				}} />}
			</div>
			<div className="col-md-3 rating-star">
				<ReactMultiSelectCheckboxes 
                  options={Rating} isSearchable={false}
				onChange={handleRating} />
			</div>
			<div className="col-md-3">
				<ReactMultiSelectCheckboxes
                  options={Category} isSearchable={false}
				onChange={handleCategory} />
			</div>
		</div>
	)
}

export default Home;