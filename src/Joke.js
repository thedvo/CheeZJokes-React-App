import React from 'react';
import './Joke.css';

class Joke extends React.Component {
	constructor(props) {
		super(props);
		this.upVote = this.upVote.bind(this);
		this.downVote = this.downVote.bind(this);
		// when we use event handlers, we lose the context of "this"
		// we bind our instance methods in the constructor to negate this issue
		// Bind will make a duplicate copy of the method where we can solidify the value of "this". The methods will refer to whichever instance of the class is created.
	}

	// instance methods for increment/decrement votes
	upVote() {
		this.props.vote(this.props.id, +1);
	}
	downVote() {
		this.props.vote(this.props.id, -1);
	}

	render() {
		return (
			<div className="Joke">
				<div className="Joke-votearea">
					<button onClick={this.upVote}>
						<i className="fas fa-thumbs-up" />
					</button>

					<button onClick={this.downVote}>
						<i className="fas fa-thumbs-down" />
					</button>

					{this.props.votes}
				</div>

				<div className="Joke-text">{this.props.text}</div>
			</div>
		);
	}
}

export default Joke;

// generally avoid making inline arrow functions because you are making a new function every time a component renders.

// import React from 'react';
// import './Joke.css';

// function Joke({ vote, votes, text, id }) {
// 	const upVote = () => vote(id, +1);
// 	const downVote = () => vote(id, -1);

// 	return (
// 		<div className="Joke">
// 			<div className="Joke-votearea">
// 				<button onClick={upVote}>
// 					<i className="fas fa-thumbs-up" />
// 				</button>

// 				<button onClick={downVote}>
// 					<i className="fas fa-thumbs-down" />
// 				</button>

// 				{votes}
// 			</div>

// 			<div className="Joke-text">{text}</div>
// 		</div>
// 	);
// }

// export default Joke;
