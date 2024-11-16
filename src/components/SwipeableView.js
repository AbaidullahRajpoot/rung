// SwipeableView.js
import React, { useState } from 'react';
import './style.css';

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: 'https://www.gstatic.com/webp/gallery/1.jpg',
  },
  {
    label: 'Bird',
    imgPath: 'https://www.gstatic.com/webp/gallery/2.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath: 'https://www.gstatic.com/webp/gallery/3.jpg',
  },
  {
    label: 'Goč, Serbia',
    imgPath: 'https://www.gstatic.com/webp/gallery/4.jpg',
  },
];

function SwipeableView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tutorialSteps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tutorialSteps.length - 1 : prevIndex - 1
    );
  };

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const onMouseDown = (e) => {
    setTouchStart(e.clientX);
    setMouseDown(true);
  };

  const onMouseMove = (e) => {
    if (mouseDown) {
      setTouchEnd(e.clientX);
    }
  };

  const onMouseUp = () => {
    setMouseDown(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="swipeable-view"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} 
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {tutorialSteps.map((step, index) => (
          <div className="slide" key={index}>
            <img src={step.imgPath} alt={step.label} />
            <div className="label">{step.label}</div>
          </div>
        ))}
      </div>
      <div className="indicators">
        {tutorialSteps.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default SwipeableView;
