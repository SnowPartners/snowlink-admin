import { useModalStore } from '@/stores/useModalStore';
import { createPortal } from 'react-dom';

const ModalPortal = () => {
  const { content } = useModalStore();

  if (!content) return null;

  return createPortal(content, document.getElementById('modal-root')!);
};

export default ModalPortal;
