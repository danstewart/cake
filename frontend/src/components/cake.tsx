import * as React from 'react';
import { ModalState } from '/components/modal';
import { CakeForm } from '/components/cakeForm';
import config from '/config';

interface ICake {
	id: number;
	name: string;
	comment: string;
	imageUrl: string;
	yumFactor: number;
}

interface Props extends ICake {
	reloadCakes(): void;
	updateModal(change: Partial<ModalState>): void;
}

const defaultImage = 'https://bulma.io/images/placeholders/1280x960.png';

class Cake extends React.Component<Props> {
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
			<div className="card cake-card">
				<div className="card-header">
					<div className="card-header-title">
						<h3 className="title is-4">{this.props.name}</h3>
					</div>
					<div className="card-header-icon">
						<h3 className="subtitle is-6">{this.props.yumFactor}</h3>
					</div>
				</div>
				<div>
					<figure className="image is-4by4">
						<img className="card-image" src={this.props.imageUrl || defaultImage}></img>
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
			this.props.reloadCakes();
			this.props.updateModal({ visible: false });
		});
	}

	delete() {
		fetch(`${config.api}/cakes/${this.props.id}`, { method: 'DELETE' }).then(() => {
			this.props.reloadCakes();
			this.props.updateModal({ visible: false });
		});
	}

	viewBtn() {
		// This request isn't actually needed but felt weird
		// not using it so...
		fetch(`${config.api}/cakes/${this.props.id}`)
			.then(res => res.json())
			.then(json => {
				this.props.updateModal({
					visible: true,
					header: `View | ${this.props.name}`,
					renderContent: () => {
						return <div className="keep-space">{json.comment}</div>;
					},
					renderFooter: () => {
						const closeModal = () => this.props.updateModal({ visible: false });
						return (
							<div className="buttons">
								<div className="button" onClick={closeModal}>
									Close
								</div>
							</div>
						);
					},
				});
			});
	}

	editBtn() {
		this.props.updateModal({
			visible: true,
			header: `Edit | ${this.props.name}`,
			renderContent: () => <CakeForm {...this.props} />,
			renderFooter: () => {
				const closeModal = () => this.props.updateModal({ visible: false });
				return (
					<div className="buttons">
						<div className="button is-primary" onClick={this.edit}>
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

	deleteBtn() {
		this.props.updateModal({
			visible: true,
			header: `Delete | ${this.props.name}`,
			renderContent: () => {
				return <div>Are you sure you want to delete this cake?</div>;
			},
			renderFooter: () => {
				const closeModal = () => this.props.updateModal({ visible: false });
				return (
					<div className="buttons">
						<div className="button is-danger" onClick={this.delete}>
							Confirm
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

export { Cake, ICake };
