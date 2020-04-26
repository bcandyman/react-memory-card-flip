import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import Round from '../components/Round'

export default () => {

  const [roundParams, setRoundParams] = useState({
    round: 1,
    charNum: 1
  });


  const style = {
    position: 'absolute',
    width:'100%',
    willChange: 'transform, opacity',
  }


  const transitions = useTransition(roundParams.round, p => p, {
    from: { opacity: 1, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    config: { mass: 10, tension: 50, friction: 40 }
  })


  const handleLevelUp = () => setRoundParams({
    charNum: roundParams.charNum += 1,
    round: roundParams.round += 1
  });


return (
  <>
    {transitions.map(({ props, key }) => {
      return (
        <animated.div key={key} style={{ ...props, ...style }} >
          <Round roundParams={roundParams} handleLevelUp={handleLevelUp}> </Round>
        </animated.div >
      )
    })}
  </>
)
}
