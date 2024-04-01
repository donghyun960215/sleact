import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  WorkspaceWrapper,
  Workspaces,
} from './styles';
import gravatar from 'gravatar';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Menu from '@components/Menu';

const Workspace: FC = ({ children }) => {
  const Channel = loadable(() => import('@pages/Channel'));
  const DirectMessage = loadable(() => import('@pages/DirectMessage'));
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const onLogout = useCallback(() => {
    axios
      .post(
        'http://localhost:3095/api/users/logout',
        {},
        {
          withCredentials: true,
        },
      )
      .then(() => {
        mutate(false, false);
      });
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.email} />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                프로필메뉴
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>MenyScroll</MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel}></Route>
            <Route path="/workspace/dm" component={DirectMessage}></Route>
          </Switch>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
