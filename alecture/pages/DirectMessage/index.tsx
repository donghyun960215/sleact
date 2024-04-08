import React, { useEffect } from 'react';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { useParams } from 'react-router';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);

  useEffect(() => {
    console.log(myData);
    console.log(userData);
  }, []);

  if (!userData || !myData) {
    return <div>dadasdsada</div>;
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      {/* <ChatList></ChatList> */}
      {/* <ChatBox></ChatBox> */}
    </Container>
  );
};

export default DirectMessage;
