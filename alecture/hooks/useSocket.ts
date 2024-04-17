import io from 'socket.io-client';
import React, { useCallback } from 'react';

const sockets: { [key: string]: SocketIOClient.Socket } = {};
const backUrl = 'http://localhost:3095';
const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  console.log('rerender', workspace);
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }

  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
    });
  }

  sockets[workspace].emit('holle', 'world'); //서버에 hello라는 event이름으로 world라는 data를 보낸다.

  sockets[workspace].on('message', () => {
    console.log(); //서버쪽에서 프론트로 데이터가 오면 message이름에다가 data를 받는 Callback함수이다.
  });

  return [sockets[workspace], disconnect];
};

export default useSocket;
