import { useSelector } from 'state/hooks'
import { Overlay } from './Overlay'

// Is plural form better ? 'OverlaysGenerator' ?
const OverlayGenerator: React.FC = () => {
  const { templates } = useSelector(s => s.overlay)

  console.log('%c OverlayGenerator ', 'background: #383E49; color: #1ADEAE', templates)

  return (
    <>
      {templates.map((template, index) => (
        <Overlay key={template} index={index} template={template} />
      ))}
    </>
  )
}

export default OverlayGenerator
