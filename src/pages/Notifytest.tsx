import React from 'react';
// import WebSocketComponent from '../components/common/WebSokcetComponent';
import * as Dialog from '@radix-ui/react-dialog';
import NotifyContent from '../components/feature/NotifyContent';
import styled from 'styled-components';

function Notifytest() {
  return (
    <>
      <div style={{ fontSize: '40px' }}>Notifytest</div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button>알림</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <NotifyContent />
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default Notifytest;
