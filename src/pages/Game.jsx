import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import Round from '../components/Round'

export default () => {

  const [roundParams, setRoundParams] = useState({
    round: 1,
    charNum: 2
  });


  const style = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    willChange: 'transform, opacity',
  }


  const transitions = useTransition(roundParams.round, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })


  const handleLevelUp = () => setRoundParams({
    charNum: roundParams.charNum += 2,
    round: roundParams.round += 1
  });


return (
  <div>
    {transitions.map(({ props, key }) => {
      return (
        <animated.div key={key} style={{ ...props, ...style }} >
          <Round roundParams={roundParams} handleLevelUp={handleLevelUp}> </Round>
        </animated.div >
      )
    })}
  </div>
)
}
