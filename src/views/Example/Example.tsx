import { useSelector, useDispatch } from 'state/hooks'
import logo from 'assets/img/logo.svg'
import { increment } from 'state/slices/example'
import { set, back } from 'state/slices/view'

const Example = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.example.counter)
  const current = useSelector(state => state.view.current)

  const handleClick = async () => {
    await dispatch(increment())
  }

  const nextPage = () => {
    dispatch(set('SplashPage'))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Route {current}</p>
        <p>
          Counter value is <code>{counter}</code>
        </p>
        <button className="button" onClick={handleClick}>
          Test Redux
        </button>
        <button className="button" onClick={nextPage}>
          Next Page
        </button>
      </header>
    </div>
  )
}

export default Example
