import * as type from '../types';

export default function getMovies(search, category, rating)
{
	return{
		type: type.GET_MOVIES_REQUESTED,
		search: search,
		category: category,
		rating: rating
	}
}