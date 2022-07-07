import React from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends React.Component {
	static defaultProps = { numJokesToGet: 10 };

	constructor(props) {
		super(props);
		this.state = { jokes: [] };

		this.generateNewJokes = this.generateNewJokes.bind(this);
		this.vote = this.vote.bind(this);
	}

	// At mount/first render --> getJokes()
	componentDidMount() {
		if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
	}

	// Does not run at first render. Runs after component is updated
	componentDidUpdate() {
		if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
	}

	// make API request to get Jokes
	async getJokes() {
		try {
			let jokes = this.state.jokes;
			let seenJokes = new Set(jokes.map((j) => j.id));

			while (jokes.length < this.props.numJokesToGet) {
				let res = await axios.get('https://icanhazdadjoke.com', {
					headers: { Accept: 'application/json' },
				});
				let { status, ...joke } = res.data;

				if (!seenJokes.has(joke.id)) {
					seenJokes.add(joke.id);

					jokes.push({ ...joke, votes: 0 });
				} else {
					console.log('duplicate found!');
				}
			}
			this.setState({ jokes });
		} catch (e) {
			console.log(e);
		}
	}

	// empties the joke list so you can make a new fresh request
	generateNewJokes() {
		this.setState({ jokes: [] });
	}

	// vote function which will be passed down as a prop to Joke component.
	vote(id, delta) {
		this.setState((state) => ({
			jokes: state.jokes.map((j) =>
				j.id === id ? { ...j, votes: j.votes + delta } : j
			),
		}));
	}

	// renders the list of jokes onto the page
	render() {
		let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

		return (
			<div className="JokeList">
				<button className="JokeList-getmore" onClick={this.generateNewJokes}>
					Get New Jokes
				</button>

				{sortedJokes.map((j) => (
					<Joke
						text={j.joke}
						key={j.id}
						id={j.id}
						votes={j.votes}
						vote={this.vote}
					/>
				))}
			</div>
		);
	}
}

export default JokeList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Joke from './Joke';
// import './JokeList.css';

// function JokeList({ numJokesToGet = 10 }) {
// 	const [jokes, setJokes] = useState([]);

// 	/* get jokes if there are no jokes */

// 	useEffect(
// 		function () {
// 			async function getJokes() {
// 				let j = [...jokes];
// 				let seenJokes = new Set();
// 				try {
// 					while (j.length < numJokesToGet) {
// 						let res = await axios.get('https://icanhazdadjoke.com', {
// 							headers: { Accept: 'application/json' },
// 						});
// 						let { status, ...jokeObj } = res.data;

// 						if (!seenJokes.has(jokeObj.id)) {
// 							seenJokes.add(jokeObj.id);
// 							j.push({ ...jokeObj, votes: 0 });
// 						} else {
// 							console.error('duplicate found!');
// 						}
// 					}
// 					setJokes(j);
// 				} catch (e) {
// 					console.log(e);
// 				}
// 			}

// 			if (jokes.length === 0) getJokes();
// 		},
// 		[jokes, numJokesToGet]
// 	);

// 	/* empty joke list and then call getJokes */

// 	function generateNewJokes() {
// 		setJokes([]);
// 	}

// 	/* change vote for this id by delta (+1 or -1) */

// 	function vote(id, delta) {
// 		setJokes((allJokes) =>
// 			allJokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
// 		);
// 	}

// 	/* render: either loading spinner or list of sorted jokes. */

// 	if (jokes.length) {
// 		let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

// 		return (
// 			<div className="JokeList">
// 				<button className="JokeList-getmore" onClick={generateNewJokes}>
// 					Get New Jokes
// 				</button>

// 				{sortedJokes.map((j) => (
// 					<Joke
// 						text={j.joke}
// 						key={j.id}
// 						id={j.id}
// 						votes={j.votes}
// 						vote={vote}
// 					/>
// 				))}
// 			</div>
// 		);
// 	}

// 	return null;
// }

// export default JokeList;
