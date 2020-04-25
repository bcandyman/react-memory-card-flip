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
    justifyContent: 'center',
    alignItems: 'center',
    willChange: 'transform, opacity',
  }


  const transitions = useTransition(roundParams.round, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })


  //TODO: This set rounds is commented for testing.
  const onClick = () => {
    return setRoundParams({
      ...roundParams,
      // round: roundParams.round += 1
    })
  }


  return (
    <div onClick={onClick}>
      {transitions.map(({ props, key }) => {
        return (
          <animated.div key={key} style={{ ...props, ...style }} >
            <Round roundParams={roundParams}> </Round>
          </animated.div >
        )
      })}
    </div>
  )
}
