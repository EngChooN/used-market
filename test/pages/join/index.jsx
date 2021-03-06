import styled from "@emotion/styled"
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
`

const Join = styled.div`
display: flex;
flex-direction: column;
margin-top: 150px;
box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.07);
border-radius: 10px;
padding: 80px;
`

const Id = styled.input`
width: 786.96px;
height: 64px;
background: #F6F6F6;
border: 1px solid #CCCCCC;
margin-bottom: 30px;
margin-left: 35px;
    font-size: 24px;
`

const Password = styled.input`
width: 786.96px;
height: 64px;
background: #F6F6F6;
border: 1px solid #CCCCCC;
margin-bottom: 30px;
margin-left: 35px;
    font-size: 24px;
`

const RePassword = styled.input`
width: 786.96px;
height: 64px;
background: #F6F6F6;
border: 1px solid #CCCCCC;
margin-bottom: 30px;
margin-left: 35px;
    font-size: 24px;
`

const Name = styled.input`
width: 786.96px;
height: 64px;
background: #F6F6F6;
border: 1px solid #CCCCCC;
margin-left: 35px;
    font-size: 24px;
`

const Btns = styled.div`
display: flex;
justify-content: center;
margin-top: 90px;
`

const JoinBtn = styled.button`
width: 330px;
height: 70px;
background-color: #FFE004;
border: none;
cursor: pointer;
margin-right: 20px;
`

const CancleBtn = styled.button`
width: 330px;
height: 70px;
background-color: #000000;
color: white;
border: none;
cursor: pointer;
`

const Title = styled.div`
display: flex;
align-items: center;
padding-bottom: 30px;
border-bottom: 1px solid black;
margin-bottom: 100px;
`

const MainTitle = styled.div`
font-weight: 700;
font-size: 50px;
margin-right: 20px;
`

const SubTitle = styled.div`
font-weight: 400;
font-size: 32px;
`

const InputWrapper = styled.div`
display: flex;
justify-content: space-between;
    font-weight: 400;
    font-size: 24px;
`

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;


export default function JoinPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [createUser] = useMutation(CREATE_USER);
    const router = useRouter();


    const onClickJoin = async () => {
    if (/^\w+@\w+\.\w+$/.test(email) === false) {
      return alert("???????????? ??????????????????!");
    } else if (name === "") {
      alert("????????? ??????????????????");
    } else if (password === "") {
      alert("??????????????? ??????????????????");
    } else if (rePassword === "" || rePassword !== password) {
      alert("??????????????? ?????? ??????????????????");
    } else {
      try {
        const result = await createUser({
          variables: {
            createUserInput: {
              email: email,
              password: password,
              name: name,
            },
          },
        });
        alert("???????????? ??????!");
        router.push("/login");
      } catch (error) {
        alert(error);
      }
    }
    };
    
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeRePassword = (event) => {
    setRePassword(event.target.value);
  };

    return (
        <Wrapper>
            <Join>
                <Title>
                    <MainTitle>????????????</MainTitle>
                    <SubTitle>Join</SubTitle>
                </Title>
                <InputWrapper>
                    ?????????
                    <Id onChange={onChangeEmail}/>
                </InputWrapper>

                <InputWrapper>
                    ????????????
                    <Password onChange={onChangePassword}/>
                </InputWrapper>

                <InputWrapper>
                    ???????????? ??????
                    <RePassword onChange={onChangeRePassword}/>
                </InputWrapper>

                <InputWrapper>
                    ??????
                    <Name onChange={onChangeName}/>
                </InputWrapper>
                <Btns>
                    <JoinBtn onClick={onClickJoin}>????????????</JoinBtn>
                    <CancleBtn>??????</CancleBtn>
                </Btns>
            </Join>
        </Wrapper>
    )
}