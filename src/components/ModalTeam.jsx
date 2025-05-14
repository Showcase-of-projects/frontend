import { useEffect } from "react";
import { Modal as BootstrapModal } from "react-bootstrap";

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <BootstrapModal
      show={open}
      onHide={onClose}
      centered
      dialogClassName="modal-90w" 
      aria-labelledby="contained-modal-title-vcenter"
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title id="contained-modal-title-vcenter">
          Создание команды
        </BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
}
