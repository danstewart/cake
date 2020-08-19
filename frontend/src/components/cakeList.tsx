import * as React from 'react';
import { ModalState } from './modal';
import { Cake, ICake } from '/components/cake';

interface Props {
	cakes: Array<ICake>;
	reloadCakes(): void;
	updateModal(change: Partial<ModalState>): void;
}

class CakeList extends React.Component<Props> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const renderedCakes = this.props.cakes.map(post => <Cake key={post.id} updateModal={this.props.updateModal} reloadCakes={this.props.reloadCakes} {...post} />);
		return <div className="flex-row">{renderedCakes}</div>;
	}
}

export { CakeList };
