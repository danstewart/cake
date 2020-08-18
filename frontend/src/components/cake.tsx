import * as React from 'react';
import { Modal } from './modal';

interface Props {
	id: number;
	name: string;
	comment: string;
	imageUrl: string;
	yumFactor: number;
}

class Cake extends React.Component<Props> {
	state = {
		modal: {
			visible: false,
			header: '',
			content: '',
			footer: '',
			close: () => {},
		},
	};

	constructor(props: Props) {
		super(props);
		this.view = this.view.bind(this);
		this.edit = this.edit.bind(this);
		this.delete = this.delete.bind(this);
	}

	render() {
		return (
			<div className="card" style={{ width: '400px', height: '400px' }}>
				<div className="card-header">
					<div className="card-header-title">
						<h3 className="title is-4">{this.props.name}</h3>
					</div>
					<div className="card-header-icon">
						<h3 className="subtitle is-6">{this.props.yumFactor}</h3>
					</div>
				</div>
				<div className="card-image">
					<figure className="image is-4by4">
						<img src="https://bulma.io/images/placeholders/1280x960.png"></img>
					</figure>
				</div>

				<footer className="card-footer">
					<a className="card-footer-item" onClick={this.view}>
						View
					</a>
					<a className="card-footer-item" onClick={this.edit}>
						Edit
					</a>
					<a className="card-footer-item" onClick={this.delete}>
						Delete
					</a>
				</footer>
				<Modal {...this.state.modal}></Modal>
			</div>
		);
	}

	view() {
		// TODO
		this.setState({
			modal: {
				visible: true,
				header: this.props.name,
				footer: '',
				content: this.props.comment,
				close: () => this.setState({ modal: { visible: false } }),
			},
		});
	}

	edit() {
		// TODO
		this.setState({
			modal: {
				visible: true,
				header: this.props.name,
				footer: '',
				content: this.props.comment,
				close: () => this.setState({ modal: { visible: false } }),
			},
		});
	}

	delete() {
		// TODO
		this.setState({
			modal: {
				visible: true,
				header: this.props.name,
				footer: '',
				content: this.props.comment,
				close: () => this.setState({ modal: { visible: false } }),
			},
		});
	}
}

export { Cake, Props as ICake };
