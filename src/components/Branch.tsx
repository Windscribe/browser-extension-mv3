type Props = {
  if: boolean
  Then: React.ReactNode | React.FC
  Else: React.ReactNode | React.FC
}
const Branch: React.FC<Props> = ({ if: cond, Then, Else }) => {
  return <>{cond ? Then : Else}</>
}

export default Branch
