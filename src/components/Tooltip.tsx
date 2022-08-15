// import Tippy from '@tippyjs/react'
// import 'tippy.js/dist/tippy.css'
// import { roundArrow } from 'tippy.js'
// import { Text } from 'theme-ui'

// import { ClassNames } from '@emotion/core'
// import React from 'react'

// const defaultConfig = {
//   arrow: roundArrow,
//   inertia: true,
//   duration: [300, 0],
//   distance: 2,
// }

// const Tooltip = ({ intl, message, maxWidth, ...props }) => (
//   // const tippyBg = `rgba(51, 61, 73, 0.9)`
//   // const extTippyStyling = css`
//   //   background-color: ${tippyBg};
//   //   color: white;
//   //   padding: 3px 6px;
//   //   border-radius: 4px;
//   //   word-break: break-all;
//   //   .tippy-svg-arrow {
//   //     fill: ${tippyBg};
//   //   }
//   // `
//   <Tippy
//     {...defaultConfig}
//     content={
//       <div style={{ maxWidth }}>
//         <Text
//           sx={{
//             fontWeight: 'bold',
//             fontSize: '12px',
//           }}
//         >
//           {message}
//         </Text>
//       </div>
//     }
//     {...props}
//     // className={extTippyStyling}
//   />
// )

// type WithTooltipProps = {
//   tip: string
//   showOnOverflow: boolean
//   show: boolean
//   elWidth: number
//   maxWidth: number
//   children: React.ReactNode
// }

// export const WithTooltip: React.FC<WithTooltipProps> = ({
//   tip = '',
//   showOnOverflow = false,
//   show = false,
//   elWidth,
//   maxWidth,
//   children,
//   ...props
// }) => {
//   // should always show tool tip if tip exists
//   let shouldShowTip = tip?.length > 0 || show
//   if (shouldShowTip && showOnOverflow) {
//     // if overflow bool true, then it should only show if over the max
//     shouldShowTip = elWidth >= maxWidth
//   }

//   return shouldShowTip ? (
//     <Tooltip message={tip} {...props}>
//       {children}
//     </Tooltip>
//   ) : (
//     children
//   )
// }

// export default Tooltip
