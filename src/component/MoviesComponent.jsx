import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getMovies from '../redux/actions/movies';
import Card from './CardComponent';

const Movies = (props) => {
	const dispatch = useDispatch();
	const movies = useSelector(state => state.movies.movies);
	const loading = useSelector(state => state.movies.loading);
	const error = useSelector(state => state.movies.error);
	useEffect(() => {
		dispatch(getMovies(props.search, props.category, props.rating));
	}, [dispatch, props.search, props.category, props.rating]);

	return (
		<div style={{ border: "1px solid" }}>
			{movies.loading && <p>Loading...</p>}
			{movies.length > 0 && movies.map((movie) => (
				<div onClick={() => props.selectMoview(movie.title, movie.category , movie.rating)} className="movieList" key={movie.title}>
					<Card movie={movie} key={movie.id} />
				</div>

			))}
			{movies.length === 0 && !loading && <p>No movie available!</p>}
			{error && !loading && <p>{error}</p>}
		</div>
	)
}

export default Movies;