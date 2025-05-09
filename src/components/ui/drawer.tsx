import { FC } from "react";
import { Offcanvas } from "react-bootstrap";

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
  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement={window.innerWidth < 768 ? "bottom" : "start"}
    >
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};
