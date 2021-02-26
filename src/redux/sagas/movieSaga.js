import { call, put, takeLatest } from 'redux-saga/effects';

function getApi() {
	return fetch('movie.json', {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Accept': 'application/json'
		}
	}).then(response => response.json())
		.catch((error) => { throw error })
}

function* fetchMovies(action) {
	try {
		const movies = yield call(getApi);
		let tempCategory = []
		let tempRating = []
		let tempMovies = movies.filter(item => item.title.toLowerCase().includes(action.search.toLowerCase()));
		if (action.category && action.category.length > 0 ) {
			tempMovies.forEach((item, j) => {
				let isContained = false
				if(action.category.length === 1 && action.category[0].label === 'Any genre'){
					isContained = true
				}
				else{
					if(action.category !== undefined){
						action.category.forEach((mov, i) => {
							if (item.category.toLowerCase() === mov.label.toLowerCase()) {
								isContained = true
							}
						});
					}
				}
				if (isContained) {
					tempCategory.push(item)
				}
			})
		} else {
			tempCategory = tempMovies
		}
		if (action.rating && action.rating.length > 0) {
			tempCategory.forEach((item, j) => {
				let isContained = false
				if(action.rating.length === 1 && action.rating[0].label === 'Any rating'){
					isContained = true;
				}
				else{
					if(action.rating !== undefined)
					{
						action.rating.forEach((rate, i) => {
							let startRate = rate.value;
							let endRate = rate.value + 0.9;
							
							if (item.rating >= startRate && item.rating <= endRate) {
								isContained = true;
							}
						});
					}
				}
				if (isContained) {
					tempRating.push(item)
				}
			})
		} else {
			tempRating = tempCategory
		}
		yield put({ type: 'GET_MOVIES_SUCCESS', movies: tempRating });
	} catch (e) {
		yield put({ type: 'GET_MOVIES_FAILED', message: e.message });
	}
}

function* movieSaga() {
	yield takeLatest('GET_MOVIES_REQUESTED', fetchMovies);
}

export default movieSaga;