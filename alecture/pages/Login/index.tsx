import React, { useCallback, useState } from 'react';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from './styles';
import axios from 'axios';
import useInput from '@hooks/useInupt';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  const { data, error } = useSWR('/api/users', fetcher);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [logInError, setLogInError] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post('/api/users/login', { email, password })
        .then(() => {})
        .catch((error) => {
          console.dir(error);
          setLogInError(error.response?.status === 401);
        });
    },
    [email, password],
  );

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="sigup">회원가입하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
