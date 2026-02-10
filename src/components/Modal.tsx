import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10; display: flex; align-items: center; justify-content: center;
`;

const ModalContent = styled.div`
  background: white; padding: 2rem; border-radius: 8px;
  width: 90%; max-width: 500px; z-index: 20;
`;

export default function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <Backdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Backdrop>,
    document.getElementById('modal-root')! // Ensure <div id="modal-root"></div> is in your index.html
  );
}
