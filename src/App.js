import React, { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import Game from './pages/Game'


export default () => {


  const [charCount, setCharCount] = useState(2);


  const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    willChange: 'transform, opacity',
  }


  const transitions = useTransition(charCount, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  const onClick = useCallback(() => setCharCount(state => (state + 1) % 3), [])


  return (
    <div onClick={onClick}>
      {transitions.map(({ props, key }) => {
        return (
          <animated.div key={key} style={{ ...props, ...style }} >
            <Game page={charCount}> </Game>
          </animated.div >
        )
      })}
    </div>
  )
}
