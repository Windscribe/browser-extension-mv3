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

const MAX_TRAIL_SIZE = 50

const CaptchaSlider: ThemeUiElement<CaptchaSliderProps> = ({
  top,
  onComplete,
  width,
  background,
  slider,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(0)
  const [xTrail, setXTrail] = useState<number[]>([])
  const [yTrail, setYTrail] = useState<number[]>([])

  const containerRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef<number>(0)

  // Track image dimensions
  const [dimensions, setDimensions] = useState({
    bg: { width: 0, height: 0 },
    slider: { width: 0, height: 0 },
  })

  const bgRef = useRef<HTMLImageElement>(null)
  const sliderRef = useRef<HTMLImageElement>(null)

  // Load and measure background image
  useEffect(() => {
    if (bgRef.current) {
      const img = new Image()
      img.onload = () => {
        setDimensions(prev => ({
          ...prev,
          bg: {
            width: img.width,
            height: img.height,
          },
        }))
      }
      img.src = background ? `data:image/png;base64,${background}` : BackgroundImage
    }
  }, [background])

  // Load and measure slider image
  useEffect(() => {
    if (sliderRef.current) {
      const img = new Image()
      img.onload = () => {
        setDimensions(prev => ({
          ...prev,
          slider: {
            width: img.width,
            height: img.height,
          },
        }))
      }
      img.src = slider ? `data:image/png;base64,${slider}` : SliderImage
    }
  }, [slider])

  // Calculate scaling based on actual dimensions
  const scale = width / dimensions.bg.width
  const containerHeight = dimensions.bg.height * scale
  const scaledSliderWidth = dimensions.slider.width * scale
  const scaledSliderHeight = dimensions.slider.height * scale

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      let newX = e.clientX - rect.left - offsetRef.current
      newX = Math.max(0, Math.min(newX, width - scaledSliderWidth))
      setPosition(newX)
      setXTrail(prev => [...prev.slice(-MAX_TRAIL_SIZE + 1), Math.round(newX)])
    }

    const handleUp = () => {
      if (isDragging) {
        setIsDragging(false)
        // Convert position back to original scale
        const originalPosition = Math.round(position / scale)
        onComplete(originalPosition, { x: xTrail, y: yTrail })
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
  }, [isDragging, position, xTrail, yTrail, scale, onComplete, scaledSliderWidth, width])

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
          width: `${width}px`,
          height: `${containerHeight}px`,
          overflow: 'hidden',
          borderRadius: '8px',
          userSelect: 'none',
          backgroundColor: 'background',
        }}
      >
        <img
          ref={bgRef}
          src={background ? `data:image/png;base64,${background}` : BackgroundImage}
          alt="CAPTCHA background"
          draggable={false}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        {/* slider */}
        <Box
          sx={{
            position: 'absolute',
            top: `${top * scale}px`,
            left: `${position}px`,
            width: `${scaledSliderWidth}px`,
            height: `${scaledSliderHeight}px`,
            zIndex: 2,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleDown}
        >
          <img
            ref={sliderRef}
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
          width: `${width}px`,
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
        {/* Text overlay */}
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

        {/* Progress bar */}
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

        {/* Slider circle */}
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
