// ConfettiComponent.js
import React from 'react';
import Confetti from 'react-dom-confetti';

const ConfettiComponent = ({ active }) => {
  const config = {
    angle: 136,
    spread: 360,
    startVelocity: 100,
    elementCount: 117,
    dragFriction: 0.59,
    duration: 900,
    stagger: 3,
    width: '12px',
    height: '10px',
    perspective: '1000px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
  };

  return (
    <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Confetti active={active} config={config} />
    </div>
  );
};

export default ConfettiComponent;
