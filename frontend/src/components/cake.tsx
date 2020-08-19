import * as React from 'react';
import { Modal } from '/components/modal';
import config from '/config';

interface ICake {
	id: number;
	name: string;
	comment: string;
	imageUrl: string;
	yumFactor: number;
}

interface Props extends ICake {
	fetchCakes(): void;
}

interface ModalState {
	visible: boolean;
	header: string;
	renderContent(): JSX.Element;
	renderFooter(): JSX.Element;
	close(): void;
}

interface State {
	modal: ModalState;
}

const defaultImage = 'https://bulma.io/images/placeholders/1280x960.png';

class Cake extends React.Component<Props> {
	state: State = {
		modal: {
			visible: false,
			header: '',
			renderContent: () => <div />,
			renderFooter: () => <div />,
			close: () => this.updateModal({ visible: false }),
		},
	};

	constructor(props: Props) {
		super(props);

		this.edit = this.edit.bind(this);
		this.delete = this.delete.bind(this);

		this.viewBtn = this.viewBtn.bind(this);
		this.editBtn = this.editBtn.bind(this);
		this.deleteBtn = this.deleteBtn.bind(this);
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
						<img src={this.props.imageUrl || defaultImage}></img>
					</figure>
				</div>

				<footer className="card-footer">
					<a className="card-footer-item" onClick={this.viewBtn}>
						View
					</a>
					<a className="card-footer-item" onClick={this.editBtn}>
						Edit
					</a>
					<a className="card-footer-item" onClick={this.deleteBtn}>
						Delete
					</a>
				</footer>
				<Modal {...this.state.modal}></Modal>
			</div>
		);
	}

	edit() {
		const fields = {
			cakeName: 'name',
			cakeImgUrl: 'imageUrl',
			cakeComment: 'comment',
			cakeYumFactor: 'yumFactor',
		};

		let changes: Partial<ICake> = {};
		Object.keys(fields).forEach(field => {
			const el = document.querySelector(`#${field}`) as HTMLInputElement;

			if (el?.value) {
				//@ts-ignore
				changes[fields[field]] = el.value;
			}
		});

		fetch(`${config.api}/cakes/${this.props.id}`, {
			method: 'PUT',
			body: JSON.stringify(changes),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(() => {
			this.props.fetchCakes();
			this.state.modal.close();
		});
	}

	delete() {
		fetch(`${config.api}/cakes/${this.props.id}`, { method: 'DELETE' }).then(() => {
			this.props.fetchCakes();
			this.state.modal.close();
		});
	}

	viewBtn() {
		// This request isn't actually needed but felt weird
		// not using it so...
		fetch(`${config.api}/cakes/${this.props.id}`)
			.then(res => res.json())
			.then(json => {
				this.updateModal({
					visible: true,
					header: `View | ${this.props.name}`,
					renderContent: () => {
						return <div>{json.comment}</div>;
					},
					renderFooter: () => {
						return (
							<div className="buttons">
								<div className="button" onClick={this.state.modal.close}>
									Close
								</div>
							</div>
						);
					},
				});
			});
	}

	editBtn() {
		this.updateModal({
			visible: true,
			header: `Edit | ${this.props.name}`,
			renderContent: () => {
				return (
					<div>
						<div className="field">
							<label className="label">Name</label>
							<div className="control">
								<input className="input" id="cakeName" type="text" defaultValue={this.props.name} />
							</div>
						</div>
						<div className="field">
							<label className="label">Image URL</label>
							<div className="control">
								<input className="input" id="cakeImgUrl" type="text" defaultValue={this.props.imageUrl} />
							</div>
						</div>
						<div className="field">
							<label className="label">Comment</label>
							<div className="control">
								<textarea id="cakeComment" className="textarea">
									{this.props.comment}
								</textarea>
							</div>
						</div>
						<div className="field">
							<label className="label">Yum Factor</label>
							<div className="control">
								<div className="select">
									<select id="cakeYumFactor" defaultValue={this.props.yumFactor}>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				);
			},
			renderFooter: () => {
				return (
					<div className="buttons">
						<div className="button is-primary" onClick={this.edit}>
							Save
						</div>
						<div className="button" onClick={this.state.modal.close}>
							Close
						</div>
					</div>
				);
			},
		});
	}

	deleteBtn() {
		this.updateModal({
			visible: true,
			header: `Delete | ${this.props.name}`,
			renderContent: () => {
				return <div>Are you sure you want to delete this cake?</div>;
			},
			renderFooter: () => {
				return (
					<div className="buttons">
						<div className="button is-danger" onClick={this.delete}>
							Confirm
						</div>
						<div className="button" onClick={this.state.modal.close}>
							Close
						</div>
					</div>
				);
			},
		});
	}

	updateModal(changes: Partial<ModalState>) {
		let currentState: ModalState = this.state.modal;
		Object.keys(changes).forEach(key => {
			//@ts-ignore
			currentState[key] = changes[key];
		});

		this.setState({ modal: currentState });
	}
}

export { Cake, ICake };
