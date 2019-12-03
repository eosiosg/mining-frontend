import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';

type Props = {
    children: React.ReactNode;
    scrollTarget?: HTMLElement | Window | null;
    sides: {
        bottom?: number;
        top?: number;
        left?: number;
        right?: number;
    };
}
export function Sticky(props: Props) {
    const [size, setSize] = useState({height: 0, width: 0});
    const [stuck, setStuck] = useState({
        stuckRight: false,
        stuckLeft: false,
        stuckBottom: false,
        stuckTop: false,
    })
    const stickyDivRef = useRef(null);

    let frameId = 0;
    const handleScroll = () => {
        const { sides } = props;
        const stickyDiv = stickyDivRef.current || null;
        const scrollTarget = props.scrollTarget || window;
        frameId = 0;
    
        if (!stickyDiv) {
          return;
        }
        const scrollRect = (scrollTarget as HTMLElement).getBoundingClientRect ? (scrollTarget as HTMLElement).getBoundingClientRect() : { // scrollTarget is the window
          height: (scrollTarget as Window).innerHeight,
          width: (scrollTarget as Window).innerWidth,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          x: (scrollTarget as Window).scrollX,
          y: (scrollTarget as Window).scrollY,
        };
    
        const boundingStickyRect = (stickyDiv as HTMLElement).getBoundingClientRect();
        
        if (!size.height || !size.width) {
          setSize({
            height: boundingStickyRect.height,
            width: boundingStickyRect.height,
          });
        }
    
        const stickyRect = {
          height: size.height || boundingStickyRect.height,
          width: size.width || boundingStickyRect.width,
          x: boundingStickyRect.left,
          y: boundingStickyRect.top,
        };
    
        if (typeof sides.bottom === 'number') {
          const stuckBottom = stickyRect.y + stickyRect.height > (scrollRect.height + scrollRect.top) - sides.bottom;
          setStuck({ ...stuck, stuckBottom });
        }
    
        if (typeof sides.top === 'number') {
          const stuckTop = stickyRect.y < scrollRect.top + sides.top;
          setStuck({ ...stuck, stuckTop });
        }
    
        if (typeof sides.left === 'number') {
          const stuckLeft = stickyRect.x < scrollRect.left + sides.left;
          setStuck({ ...stuck, stuckLeft });
        }
    
        if (typeof sides.right === 'number') {
          const stuckRight = stickyRect.x + stickyRect.width > (scrollRect.width + scrollRect.left) - sides.right;
          setStuck({ ...stuck, stuckRight });
        }
    }
    const debouncedScroll = () => {
        if (!frameId) {
          const currFrameId = requestAnimationFrame(handleScroll);
          frameId = currFrameId;
        }
    }
    const addEvents = () => {
        const scrollTarget = props.scrollTarget || window;
        if (scrollTarget && stickyDivRef.current) {
          scrollTarget.addEventListener('scroll', debouncedScroll);
        }
    }
    const removeEvents = () => {
        const scrollTarget = props.scrollTarget || window;
    
        if (scrollTarget) {
          scrollTarget.removeEventListener('scroll', debouncedScroll);
        }
    
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
    }
    useEffect(() => {
        addEvents();
        handleScroll();
        return removeEvents;
    },[props.scrollTarget]);
    const render = () => {
        const { children } = props;
        const { stuckBottom, stuckLeft, stuckRight, stuckTop } = stuck;
    
        const stickyModifiers: string[]= [];
    
        // if (stuckBottom) {
        //   stickyModifiers.push('stuck-bottom');
        // }
    
        // if (stuckLeft) {
        //   stickyModifiers.push('stuck-left');
        // }
    
        // if (stuckRight) {
        //   stickyModifiers.push('stuck-right');
        // }
    
        if (stuckTop) {
          stickyModifiers.push(styles.stuckTop);
        }
    
        // const childrenWithStuckProps = React.Children.map(children, (child) => {
        //   const childModifiers = (child.props && child.props.modifiers) || [];
        //   return React.cloneElement(child, { modifiers: [...childModifiers, ...stickyModifiers] });
        // });
    
        return (
          <div
            className={styles.baseClass}
            ref={stickyDivRef}
          >
            {/* {childrenWithStuckProps} */}
            <div className={stickyModifiers.join(' ')}>
                {children}
            </div>
          </div>
        );
    }
    return render();
}


