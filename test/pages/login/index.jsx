import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/libraries/Recoil";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = styled.div`
  width: 742px;
  height: 802px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  padding: 80px;
  margin-top: 150px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid black;
  margin-bottom: 80px;
`;

const MainTitle = styled.div`
  font-weight: 700;
  font-size: 50px;
  margin-right: 15px;
`;

const SubTitle = styled.div`
  font-weight: 400;
  font-size: 32px;
`;

const Id = styled.input`
  width: 600px;
  height: 77.48px;
  background: #f6f6f6;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 70px;
  font-weight: 400;
  font-size: 18px;
`;

const Pass = styled.input`
  width: 600px;
  height: 77.48px;
  background: #f6f6f6;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 70px;
  font-weight: 400;
  font-size: 18px;
`;

const LoginBtn = styled.button`
  background: #ffe004;
  border-radius: 10px;
  width: 600px;
  height: 88px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 40px;
`;

const Info = styled.div``;

export default function LoginPage() {
  const [, setAccessToken] = useRecoilState(accessTokenState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const router = useRouter();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async () => {
    if (/^\w+@\w+\.\w+$/.test(email) === false) {
      return alert("???????????? ??????????????????!");
    } else if (password === "") {
      return alert("??????????????? ??????????????????!");
    } else {
      try {
        const result = await loginUser({
          variables: {
            email: email,
            password: password,
          },
        });
        const accessToken = result.data.loginUser.accessToken;
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        alert("??????!");
        return router.push("/");
      } catch (error) {
        alert(error);
      }
    }
  };

  const onClickMoveJoin = () => {
    router.push("/join");
  };

  return (
    <Wrapper>
      <Login>
        <Title>
          <MainTitle>?????????</MainTitle>
          <SubTitle>Login</SubTitle>
        </Title>
        <Id onChange={onChangeEmail} placeholder="?????????"></Id>
        <Pass
          onChange={onChangePassword}
          placeholder="????????????"
          type={"password"}
        ></Pass>
        <LoginBtn onClick={onClickLogin}>?????????</LoginBtn>
        <Info>
          ?????? ????????? ????????????????{" "}
          <span onClick={onClickMoveJoin}>????????????????</span>
        </Info>
      </Login>
    </Wrapper>
  );
}
