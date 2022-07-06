import React from 'react'
import splashBackground from '../../assets/img/splashBackground.png'
import rotatingLogo from '../../assets/img/rotatingLogo.gif'

const SplashPage = () => {
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        backgroundImage: `url(${splashBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '324px 298px',
        height: '100vh',
      }}
    >
      <img
        src={rotatingLogo}
        alt="logo"
        sx={{
          mt: '48px',
          width: '40px',
          height: '40px',
        }}
      />
      <div
        sx={{
          mt: '24px',
          fontSize: '24px',
          fontWeight: '600',
          color: '#fff',
        }}
      >
        Keep Your Secrets.
      </div>
      <button
        sx={{
          all: 'unset',
          mt: '52px',
          fontSize: '14px',
          width: '228px',
          height: '40px',
          backgroundColor: '#55ff8a',
          borderRadius: '20px',
          textAlign: 'center',
          ':hover': {
            backgroundColor: '#fff',
          },
        }}
      >
        Get Started
      </button>
      <button
        sx={{
          all: 'unset',
          mt: '24px',
          opacity: '0.5',
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff',
          ':hover': {
            opacity: '1',
          },
        }}
      >
        Login
      </button>
    </div>
  )
}

export default SplashPage
