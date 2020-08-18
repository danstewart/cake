import * as React from 'react';
import { Cake, ICake } from '/components/cake';

interface State {
	cakes: Array<ICake>;
}

class CakeList extends React.Component {
	state: State = {
		cakes: [],
	};

	componentDidMount() {
		fetch('http://localhost:8000/cakes')
			.then(res => res.json())
			.then(json => this.setState({ cakes: json }))
			.catch(console.error);
	}

	render() {
		const renderedCakes = this.state.cakes.map(post => <Cake key={post.id} {...post} />);
		return <div className="flex-row">{renderedCakes}</div>;
	}
}

export { CakeList };
