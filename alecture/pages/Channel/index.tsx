import React, { useCallback } from 'react';
import { Container, Header } from './styles';
import { useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';

const Channel = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/channels/${channel}`, fetcher);
  const [chat, onChangChat, setChat] = useInput('');

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(chat);
      console.log('Channel창');
      setChat('');
    },
    [chat],
  );

  if (!userData || !myData) {
    return <div>dadasdsada</div>;
  }

  return (
    <Container>
      <Header>
        <span>{userData.name}</span>
      </Header>
      <ChatList></ChatList>
      <ChatBox chat={chat} onChangChat={onChangChat} onSubmitForm={onSubmitForm}></ChatBox>
    </Container>
  );
};

export default Channel;
