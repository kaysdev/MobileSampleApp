import React from 'react';

const Card = (props) => {
	const percent = props.movie.rating*10+'%';
	return(
		<div className="row">
			<div className="col-md-9">
				<div className="card-body">
					<div className="card-title">{props.movie.title}</div>
					<div className="card-title">
						<div className="stars">
							<div className="percent" style={{width: percent}}></div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-3">
				<div className="card-body">
					<div className="card-subtitle mb-2 text-muted">
						{props.movie.category}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card;