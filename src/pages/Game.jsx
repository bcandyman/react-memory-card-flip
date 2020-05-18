import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import Round from '../components/Round'

export default () => {

  const [roundParams, setRoundParams] = useState({
    round: 1,
    params0: {
      charNum: 1
    },
    params1: {
      charNum: 1
    }
  });


  const styles = {
    position: 'absolute',
    width: '100%',
    willChange: 'transform, opacity',
  }


  const transitions = useTransition(roundParams.round, p => p, {
    from: { opacity: 1, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    config: { mass: 10, tension: 50, friction: 40 }
  })

  useEffect(() => {
    // console.log(roundParams);
    console.log('in-useEffect-roundParams');
  }, [roundParams])


  const handleLevelUp = (page) => {
    console.log('in-handleLevelUp2');
    let temp = { ...roundParams, round: roundParams.round + 1 };

    if (page === 0) {
      temp.params1.charNum = temp.params0.charNum + 1
    } else {
      temp.params0.charNum = temp.params1.charNum + 1
    };
    console.log(1);
    // return ()=>{

    // }
    setRoundParams(temp);
    console.log(2);
  }

  const pages = [
    ({ style }) => <animated.div style={{ ...styles, ...style }}>
      <Round roundParams={roundParams.params0} handleLevelUp={() => handleLevelUp(0)} />
    </animated.div>,
    ({ style }) => <animated.div style={{ ...styles, ...style }}>
      <Round roundParams={roundParams.params1} handleLevelUp={() => handleLevelUp(1)} />
    </animated.div>
  ]

  return (
    <>
      {transitions.map(({ item, props, key }) => {

        const Page = pages[item % 2]
        return <Page key={key} style={props} />
      })}
    </>
  )
}
