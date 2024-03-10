import React, { useState } from 'react';
import Modal from '../../../components/modal/Modal';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import styled from 'styled-components';

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const NoteModal = ({ setIsOpen }: ModalProps) => {
  const [noteText, setNoteText] = useState('');
  const onChangeNoteText = (e: React.ChangeEvent<HTMLInputElement>) => setNoteText(e.target.value);

  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <Modal postTitle="쪽지">
      <Container>
        <Textarea
          placeholder="담당자에게 문의 내용을 남기세요."
          value={noteText}
          onChange={onChangeNoteText}
          rows={20}
          maxLength={400}
        />
        <Button size="full" color="primary" onClick={handleSubmit}>
          전송하기
        </Button>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export default NoteModal;
