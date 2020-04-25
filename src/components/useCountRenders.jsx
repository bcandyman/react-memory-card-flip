import { useRef } from 'react';

export default () => {
  const renders = useRef(0);
  console.log('renders: ', renders.current++);
}