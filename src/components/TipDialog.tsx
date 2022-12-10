import React, { useEffect, useState } from 'react';
import { a, useSpring } from 'react-spring';

const TipDialog = () => {
  const [active, setActive] = useState(false);
  const [unMountToolTip, setUnMountToolTip] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  const overlaySpring = useSpring({
    opacity: active ? 1 : 0
  });

  const dialogSpring = useSpring({
    opacity: active ? 1 : 0,
    transform: active ? 'translateY(0%)' : 'translateY(100%)'
  });

  const handleCloseDialog = () => {
    setActive(false);
    setTimeout(() => {
      setUnMountToolTip(true);
    }, 1000);
  };

  return (
    <>
      {unMountToolTip ? null : (
        <a.div
          style={overlaySpring}
          className="overlay"
          onClick={handleCloseDialog}
        >
          <a.div style={dialogSpring} className="dialog">
            <div className="tip-container">
              <span className="tip">
                <p>
                  Press the <span className="tip-highlight">'Enter'</span> to
                  get a random cocktail
                </p>
                <p>
                  Press the <span className="tip-highlight">'spacebar'</span> to
                  show drink history
                </p>
              </span>
              <span>Happy drinkin&apos;! 🍸</span>
              <span className="close-button" onClick={handleCloseDialog}>
                X
              </span>
            </div>
          </a.div>
        </a.div>
      )}
    </>
  );
};

export default TipDialog;
