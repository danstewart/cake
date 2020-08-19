import * as React from 'react';
import { ICake } from '/components/cake';

interface Props extends ICake {}

class CakeForm extends React.Component<Partial<Props>> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div key={this.props.id}>
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
						<textarea id="cakeComment" className="textarea" defaultValue={this.props.comment}></textarea>
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
	}
}

export { CakeForm };
