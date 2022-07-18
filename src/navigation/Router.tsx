import { useSelector } from 'state/hooks';
import { type View } from 'state/slices/view';
import * as Views from 'views';

export default () => {
	const currentView: View = useSelector(s => s?.view?.current);
	const View = Views[currentView];
	return View ? <View /> : <p>'Windscribe has encountered a problem. Please try again later.'</p>;
};
