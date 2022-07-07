import React from 'react';
import JokeList from './JokeList';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<JokeList />
				{/* <JokeList numJokesToGet={20} /> 
        just using to test if defaultProps works */}
			</div>
		);
	}
}

export default App;

// function App() {
// 	return (
// 		<div className="App">
// 			<JokeList numJokesToGet={10} />
// 		</div>
// 	);
// }

// export default App;
