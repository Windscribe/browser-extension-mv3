import './Popup.css';
import { useSelector, useDispatch } from 'state/hooks';
import logo from 'assets/img/logo.svg';
import { increment } from 'state/slices/example';

const Example = () => {
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.example.counter);

	const handleClick = async () => {
		await dispatch(increment());
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Counter value is <code>{counter}</code>
				</p>
				<button className='button' onClick={handleClick}>Test Redux</button>
			</header>
		</div>
	);
};

export default Example;