import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/libraries/Recoil";
import { useEffect } from "react";


export default function ApolloSetting(props) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  
  useEffect(() => {
    const myLocalStorageAccessToken = localStorage.getItem("accessToken");
    setAccessToken(myLocalStorageAccessToken || "");
  }, []);


  const uploadLink = createUploadLink({
    uri: "https://backend06.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
