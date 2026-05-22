import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop and if reduced motion is not preferred
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || prefersReducedMotion) return;

    let requestRef;
    let targetPosition = { x: -100, y: -100 };
    let currentPosition = { x: -100, y: -100 };

    const onMouseMove = (e) => {
      targetPosition = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check what we're hovering over
      const target = e.target;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      
      // If over input, we hide custom cursor (CSS handles showing native cursor)
      if (isInput) {
        setIsVisible(false);
        return;
      } else {
        setIsVisible(true);
      }

      // Text detection
      const isText = window.getSelection().toString().length > 0 || 
                     ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV'].includes(target.tagName) && 
                     target.textContent && target.children.length === 0;
      setIsHoveringText(isText && !isInput);

      // Interactive detection
      const isInteractive = target.closest('button') || target.closest('a') || target.closest('.interactive') || target.tagName === 'BUTTON' || target.tagName === 'A';
      setIsHoveringInteractive(!!isInteractive);
      
      // Drag detection
      setIsDragging(target.closest('[data-draggable="true"]') || document.body.style.cursor === 'grabbing');
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const updatePosition = () => {
      // Lerp for smooth following (0.15s delay equivalent approx)
      currentPosition.x += (targetPosition.x - currentPosition.x) * 0.15;
      currentPosition.y += (targetPosition.y - currentPosition.y) * 0.15;
      
      setPosition({ x: currentPosition.x, y: currentPosition.y });
      requestRef = requestAnimationFrame(updatePosition);
    };
    
    requestRef = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(requestRef);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Compute classes based on state
  let className = "fixed pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 ";
  let style = { 
    left: `${position.x}px`, 
    top: `${position.y}px`,
    transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  if (isClicking) {
    className += "w-[6px] h-[6px] bg-blue-primary rounded-full";
  } else if (isDragging) {
    // Crosshair for drag
    className += "w-8 h-8 rounded-full border-2 border-blue-primary border-dashed bg-blue-glow";
  } else if (isHoveringInteractive) {
    className += "w-8 h-8 rounded-full border-2 border-blue-primary bg-blue-glow";
  } else if (isHoveringText) {
    className += "w-[2px] h-[20px] bg-blue-primary rounded-none";
  } else {
    className += "w-[8px] h-[8px] rounded-full border-[1.5px] border-blue-primary bg-transparent";
  }

  return (
    <div className={className} style={style} aria-hidden="true" />
  );
};

export default CustomCursor;
