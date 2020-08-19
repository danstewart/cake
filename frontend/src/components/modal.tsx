import * as React from 'react';

interface Props {
	visible: boolean;
	header: string;
	renderContent(): JSX.Element;
	renderFooter(): JSX.Element;
	close(e: React.MouseEvent): void;
}

interface ModalState {
	visible: boolean;
	header: string;
	renderContent(): JSX.Element;
	renderFooter(): JSX.Element;
	close(): void;
}

class Modal extends React.Component<Props> {
	render() {
		const classes = this.props.visible ? 'modal is-active' : 'modal';

		return (
			<div className={classes}>
				<div className="modal-card">
					<div className="modal-card-head">
						<p className="modal-card-title">{this.props.header}</p>
						<button className="delete" aria-label="close" onClick={this.props.close}></button>
					</div>

					<div className="modal-card-body">{this.props.renderContent()}</div>
					<footer className="modal-card-foot">{this.props.renderFooter()}</footer>
				</div>
			</div>
		);
	}

	close() {}
}

export { Modal, ModalState };
