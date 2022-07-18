import { useSelector, useDispatch } from 'state/hooks';
import logo from 'assets/img/logo.svg';
import { set, back } from 'state/slices/view';

const ExampleSecond = () => {
	const dispatch = useDispatch();
	const current = useSelector((state) => state.view.current);

	const nextPage = () => {
		dispatch(set('SplashPage'));
	};

	const previousPage = () => {
		dispatch(back());
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Route {current}</p>
				<button className='button' onClick={nextPage}>Next Page</button>
				<button className='button' onClick={previousPage}>Back</button>
			</header>
		</div>
	);
};

export default ExampleSecond;