/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: ReactSVGElement
  export default content
  // import { ReactElement, SVGProps } from 'react'
  // const ReactComponent: (props: SVGProps<SVGElement>) => ReactElement
  // export { ReactComponent }
}

declare module 'assets/*'

declare const COMMIT_HASH: string
declare const UBO_LITE_VERSION: string
declare const UBO_LITE_NAME: string
declare const UBO_LITE_SUBMODULE_COMMIT_HASH: string
