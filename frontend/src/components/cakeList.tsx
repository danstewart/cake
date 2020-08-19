import * as React from 'react';
import { Cake, ICake } from '/components/cake';
import config from '/config';

interface State {
	cakes: Array<ICake>;
}

class CakeList extends React.Component {
	state: State = {
		cakes: [],
	};

	constructor(props: any) {
		super(props);

		this.fetchCakes = this.fetchCakes.bind(this);
	}

	componentDidMount() {
		this.fetchCakes();
	}

	fetchCakes() {
		fetch(`${config.api}/cakes`)
			.then(res => res.json())
			.then(json => this.setState({ cakes: json }))
			.catch(console.error);
	}

	render() {
		const renderedCakes = this.state.cakes.map(post => <Cake key={post.id} fetchCakes={this.fetchCakes} {...post} />);
		return <div className="flex-row">{renderedCakes}</div>;
	}
}

export { CakeList };
