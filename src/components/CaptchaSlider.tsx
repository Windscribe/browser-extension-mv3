import { useState, useRef, useEffect } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import SliderArrow from 'assets/img/sliderArrow.svg'
import SliderImage from 'assets/img/slider.png'
import BackgroundImage from 'assets/img/sliderbg.png'

interface CaptchaSliderProps {
  background?: string
  slider?: string
  top: number
  onComplete: (solution: number, trail: { x: number[]; y: number[] }) => void
  width: number
}

const BG_ORIG_W = 350 // original background width
const BG_ORIG_H = 200 // original background height
const SL_ORIG_SZ = 120 // original slider edge (square)

const MAX_TRAIL_SIZE = 50 // how many points to keep

const getScale = (targetW: number) => {
  const factor = targetW / BG_ORIG_W
  const scale = (v: number) => v * factor
  return { factor, scale }
}

const CaptchaSlider: ThemeUiElement<CaptchaSliderProps> = ({
  top,
  onComplete,
  width, // e.g. <CaptchaSlider width={253} … />
  background,
  slider,
}) => {
  const containerW = width ?? BG_ORIG_W // fall back to full size
  const { factor, scale } = getScale(containerW)
  const containerH = BG_ORIG_H * factor // keep 7 : 4 aspect

  const sliderEdge = scale(SL_ORIG_SZ) // new slider size

  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(0) // slider X
  const [xTrail, setXTrail] = useState<number[]>([])
  const [yTrail, setYTrail] = useState<number[]>([])

  const containerRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef<number>(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      let newX = e.clientX - rect.left - offsetRef.current
      newX = Math.max(0, Math.min(newX, rect.width - sliderEdge))
      setPosition(newX)
      setXTrail(prev => [...prev.slice(-MAX_TRAIL_SIZE + 1), Math.round(newX)])
    }

    const handleUp = () => {
      if (isDragging) {
        setIsDragging(false)
        onComplete(Math.round(position / factor), { x: xTrail, y: yTrail }) // report un-scaled solution
      }
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [isDragging, position, xTrail, yTrail, factor, onComplete, sliderEdge])

  const handleDown = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    offsetRef.current = e.clientX - rect.left - position
    setIsDragging(true)
    setXTrail([])
    setYTrail([])
    e.preventDefault()
  }

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relativeY = e.clientY - rect.top
    setYTrail(prev => [...prev.slice(-MAX_TRAIL_SIZE + 1), Math.round(relativeY)])
  }

  return (
    <Flex
      sx={{
        position: 'relative',
        gap: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      ref={containerRef}
      onMouseMove={handleContainerMouseMove}
    >
      <Box
        sx={{
          position: 'relative',
          width: `${containerW}px`,
          height: `${containerH}px`, // explicit height keeps layout stable
          overflow: 'hidden',
          borderRadius: '8px',
          userSelect: 'none',
          backgroundColor: 'background',
        }}
      >
        <img
          src={background ? `data:image/png;base64,${background}` : BackgroundImage}
          alt="CAPTCHA background"
          draggable={false}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        {/* slider */}
        <Box
          sx={{
            position: 'absolute',
            top: `${scale(top)}px`, // keep 'top' in proportion too
            left: `${position}px`,
            width: `${sliderEdge}px`,
            height: `${sliderEdge}px`,
            zIndex: 2,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleDown}
        >
          <img
            src={slider ? `data:image/png;base64,${slider}` : SliderImage}
            alt="CAPTCHA slider"
            draggable={false}
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          />
        </Box>
      </Box>

      {/* slider track */}
      <Box
        sx={{
          width: `${containerW}px`,
          height: '24px',
          borderRadius: '999px',
          backgroundColor: '#0B0F16',
          position: 'relative',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Text overlay - now behind progress bar */}
        <Box
          sx={{
            ml: '12px',
            position: 'relative',
            width: '100%',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text sx={{ color: 'secondaryText', fontSize: '12px' }}>
            Slide puzzle piece into place
          </Text>
        </Box>

        {/* Progress bar - now above text but below circle */}
        <Box
          sx={{
            position: 'absolute',
            left: '1px',
            top: '1px',
            height: '22px',
            width: `${position + 16}px`,
            backgroundColor: 'neonGreen',
            borderTopLeftRadius: '999px',
            borderBottomLeftRadius: '999px',
            zIndex: 2,
          }}
        />

        {/* Slider circle - stays on top */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '-5px',
            left: `${position}px`,
            width: '32px',
            height: '32px',
            borderRadius: '999px',
            backgroundColor: 'neonGreen',
            boxShadow: '0 0 2px rgba(0,0,0,0.2)',
            cursor: isDragging ? 'grabbing' : 'grab',
            zIndex: 3,
          }}
          onMouseDown={handleDown}
        >
          <SliderArrow />
        </Box>
      </Box>
    </Flex>
  )
}

export default CaptchaSlider
