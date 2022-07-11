import React from 'react';
import { useDispatch, connect } from 'react-redux';

import './Popup.css';
import { RootState } from 'state';
import logo from 'assets/img/logo.svg';
import { increment } from 'state/slices/example';

type ExampleProps = {
	example?: { counter: number; };
};

const Example = (props: ExampleProps) => {
	const dispatch = useDispatch();

	const handleClick = async () => {
		await dispatch(increment());
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Counter value is <code>{props.example?.counter}</code>
				</p>
				<button className='button' onClick={handleClick}>Test Redux</button>
			</header>
		</div>
	);
};

const mapStateToProps = (state: RootState, ownProps: ExampleProps) => ({ example: state.example });

export default connect(mapStateToProps)(Example);