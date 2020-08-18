import * as React from 'react';

interface Props {
	header: string;
	content: string;
	footer: any;
	visible: boolean;
	close: Function;
}

class Modal extends React.Component<Props> {
	render() {
		const classes = this.props.visible ? 'modal is-active' : 'modal';
		console.log(classes);

		return (
			<div className={classes}>
				<div className="modal-card">
					<div className="modal-card-head">
						<p className="modal-card-title">{this.props.header}</p>
						<button className="delete" aria-label="close" onClick={this.props.close}></button>
					</div>

					<div className="modal-card-body">{this.props.content}</div>
					<footer className="modal-card-foot">{this.props.footer}</footer>
				</div>
			</div>
		);
	}

	close() {}
}

export { Modal };
