import { useDispatch } from 'state/hooks'
import { set, back, type View } from 'state/slices/view'

export function goTo(route: View) {
  const dispatch = useDispatch()
  return () => dispatch(set(route))
}

export function goBack() {
  const dispatch = useDispatch()
  return () => dispatch(back())
}
