import React, { useCallback, useEffect } from 'react';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { useParams } from 'react-router';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { IDM } from '@typings/db';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const [chat, onChangChat, setChat] = useInput('');
  const { data: chatData, mutate: mutateChat } = useSWR<IDM[]>( //채팅받아오기
    `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher,
  );

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(chat);
      console.log('DirectMessage창.');
      if (chat?.trim()) {
        axios
          .post(`/api/workspace/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            setChat('');
            mutateChat();
          })
          .catch(console.error);
      }
    },
    [chat],
  );

  if (!userData || !myData) {
    return <div>dadasdsada</div>;
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList></ChatList>
      <ChatBox chat={chat} onChangChat={onChangChat} onSubmitForm={onSubmitForm}></ChatBox>
    </Container>
  );
};

export default DirectMessage;
