import { useSelector } from 'state/hooks'
import { Overlay } from '.'

// Is plural form better ? 'OverlaysGenerator' ?
export const OverlayGenerator: React.FC = () => {
  const { templates } = useSelector(s => s.overlay)

  return (
    <>
      {templates.map((template, index) => (
        <Overlay key={template} index={index} template={template} />
      ))}
    </>
  )
}
