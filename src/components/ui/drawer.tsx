import { FC, useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useSwipeable } from "react-swipeable";

interface DrawerProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: FC<DrawerProps> = ({
  show,
  onClose,
  children,
}) => {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  function getIsMobile() {
    return window.innerWidth < 768;
  }
  
  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const [expanded, setExpanded] = useState(false);
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setExpanded(true),
    onSwipedDown: () => setExpanded(false),
    delta: 50,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
  });

  const renderContent = () => (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement={isMobile ? "bottom" : "start"}
    >
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );

  if (!isMobile) {
    return renderContent();
  }

  const collapsedHeight = 300;
  const sheetStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: expanded ? '100vh' : `${collapsedHeight}px`,
    transition: 'height 0.3s ease',
    background: 'white',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
    borderTopLeftRadius: '0.5rem',
    borderTopRightRadius: '0.5rem',
    overflow: 'hidden',
    zIndex: 9999,
  };

  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement={isMobile ? "bottom" : "start"}
    >
      <Offcanvas.Body>
        <div {...swipeHandlers} style={sheetStyle}>
          <div
            style={{
              width: '40px',
              height: '4px',
              background: '#ccc',
              borderRadius: '2px',
              margin: '8px auto',
            }}
          />
          <div style={{ height: '100%', overflowY: 'auto' }}>
            {children}
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
