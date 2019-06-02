import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Launch = ({
	match: {
		params: { flight_number }
	}
}) => {
	const LAUNCH_QUERY = gql`
		query LaunchQuery($flight_number: Int!) {
			launch(flight_number: $flight_number) {
				flight_number
				mission_name
				launch_year
				launch_success
				launch_date_local
				rocket {
					rocket_id
					rocket_name
					rocket_type
				}
			}
		}
	`;

	flight_number = parseInt(flight_number);

	return (
		<div>
			<h1>Launch</h1>
			<Query query={LAUNCH_QUERY} variables={{ flight_number }}>
				{({ loading, error, data }) => {
					if (loading) return <h4>Loading...</h4>;
					if (error) console.error(error);

					const {
						mission_name,
						launch_year,
						launch_success,
						launch_date_local,
						rocket: { rocket_id, rocket_name, rocket_type }
					} = data.launch;

					return (
						<div>
							<h1 className="display-4 my-3">
								<span className="text-dark" />
								Mission: {mission_name}
							</h1>
							<h4 className="mb-3">Launch Details</h4>
							<ul className="list-group">
								<li className="list-group-item">
									Flight Number: {flight_number}
								</li>
								<li className="list-group-item">Launch Year: {launch_year}</li>
								<li className="list-group-item">
									Launch Success:{' '}
									<span
										className={classNames({
											'text-success': launch_success,
											'text-danger': !launch_success
										})}
									>
										{launch_success ? 'Yes' : 'No'}
									</span>
								</li>
								<li className="list-group-item">
									Launch Date:{' '}
									<Moment format="YYYY//MM/DD">{launch_date_local}</Moment>
								</li>
							</ul>

							<h4 className="my-3">Rocket Details</h4>
							<ul className="list-group">
								<li className="list-group-item">Rocket ID {rocket_id} </li>
								<li className="list-group-item">Rocket Name {rocket_name}</li>
								<li className="list-group-item">Rocket Type: {rocket_type}</li>
							</ul>
							<hr />
							<Link to="/" className="btn btn-secondary">
								Back
							</Link>
						</div>
					);
				}}
			</Query>
		</div>
	);
};

export default Launch;
