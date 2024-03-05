import React, { useEffect, useState } from 'react';
// import WebSocketComponent from '../components/common/WebSokcetComponent';
import * as Dialog from '@radix-ui/react-dialog';
import NotifyContent from '../components/feature/NotifyContent';
import styled from 'styled-components';
import { Socket, io } from 'socket.io-client';

function Notifytest() {
  const [userId, setUserId] = useState<string | null>(null);
  const ENDPOINT = 'https://buddydoc.site/alarm';
  const socket = io(ENDPOINT);

  socket.on('connect', () => {
    console.log('connected to server');
  });

  socket.on('disconnect', () => {
    console.log('disconnected from server');
  });

  // 로그인 여부확인 및 웹소켓 연결에 필요한 userId확보
  useEffect(() => {
    // 로그인 상태라면 localStorage에서 userId를 가져옴
    if (localStorage.getItem('userId') !== null) {
      setUserId(localStorage.getItem('userId'));
    } else {
      setUserId('');
    }
  }, []);

  return (
    <>
      <div style={{ fontSize: '40px' }}>Notifytest. (userId : {userId})</div>
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
