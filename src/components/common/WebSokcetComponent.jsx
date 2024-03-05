// import React, { useEffect } from 'react';
// import io from 'socket.io-client';

// const WebSocketComponent = ({ userId }) => {
//   useEffect(() => {
//     const socket = io('https://buddydoc.site:3000'); // Nest.js 서버의 주소로 변경
//     socket.on('connect', () => {
//       console.log('Connected to WebSocket server');
//       // 연결에 성공하면 userId를 서버로 전송하여 웹소켓 연결 요청
//       socket.emit('connectWithUserId', userId);
//     });
//     socket.on('disconnect', () => {
//       console.log('Disconnected from WebSocket server');
//     });
//     socket.on('message', (message) => {
//       console.log('Received message from server:', message);
//       // 서버로부터 메시지를 수신하면 처리할 로직 작성
//     });
//     return () => {
//       socket.disconnect(); // 컴포넌트가 언마운트될 때 웹소켓 연결 해제
//     };
//   }, [userId]);

//   return (
//     <div>
//       <h1>WebSocket Connection</h1>
//     </div>
//   );
// };

// export default WebSocketComponent;
