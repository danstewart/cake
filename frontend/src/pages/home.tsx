import * as React from 'react';
import { CakeList } from '/components/cakeList';
import { CakeForm } from '/components/cakeForm';
import { ICake } from '/components/cake';
import { Modal, ModalState } from '/components/modal';
import config from '/config';

interface State {
	modal: ModalState;
	cakes: Array<ICake>;
}

class Home extends React.Component {
	state: State = {
		cakes: [],
		modal: {
			visible: false,
			header: '',
			renderContent: () => <div />,
			renderFooter: () => <div />,
			close: () => this.updateModal({ visible: false }),
		},
	};

	constructor(props: any) {
		super(props);

		this.fetchCakes = this.fetchCakes.bind(this);
		this.updateModal = this.updateModal.bind(this);
		this.addCake = this.addCake.bind(this);
		this.addCakeBtn = this.addCakeBtn.bind(this);
	}

	componentDidMount() {
		this.fetchCakes();
	}

	render() {
		return (
			<div>
				<br />
				<div className="head level">
					<h1 className="title">Cake</h1>
					<button className="button is-primary" onClick={this.addCakeBtn}>
						Add
					</button>
				</div>

				<hr />

				<CakeList cakes={this.state.cakes} reloadCakes={this.fetchCakes} updateModal={this.updateModal} />
				<Modal {...this.state.modal}></Modal>
			</div>
		);
	}

	fetchCakes() {
		fetch(`${config.api}/cakes`)
			.then(res => res.json())
			.then(json => this.setState({ cakes: json }))
			.catch(console.error);
	}

	updateModal(changes: Partial<ModalState>) {
		let currentState: ModalState = this.state.modal;
		Object.keys(changes).forEach(key => {
			//@ts-ignore
			currentState[key] = changes[key];
		});

		this.setState({ modal: currentState });
	}

	addCake() {
		const fields = {
			cakeName: 'name',
			cakeImgUrl: 'imageUrl',
			cakeComment: 'comment',
			cakeYumFactor: 'yumFactor',
		};

		let newCake: Partial<ICake> = {};
		Object.keys(fields).forEach(field => {
			const el = document.querySelector(`#${field}`) as HTMLInputElement;

			if (el?.value) {
				//@ts-ignore
				newCake[fields[field]] = el.value;
			}
		});

		fetch(`${config.api}/cakes`, {
			method: 'POST',
			body: JSON.stringify(newCake),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(() => {
			this.fetchCakes();
			this.updateModal({ visible: false });
		});
	}

	addCakeBtn() {
		this.updateModal({
			visible: true,
			header: 'Add Cake',
			renderContent: () => <CakeForm {...this.props} />,
			renderFooter: () => {
				const closeModal = () => this.updateModal({ visible: false });
				return (
					<div className="buttons">
						<div className="button is-primary" onClick={this.addCake}>
							Save
						</div>
						<div className="button" onClick={closeModal}>
							Close
						</div>
					</div>
				);
			},
		});
	}
}

export { Home };
