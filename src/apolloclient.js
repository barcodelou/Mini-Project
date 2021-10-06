import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

  import { split, HttpLink } from "@apollo/client";
  import { getMainDefinition } from "@apollo/client/utilities";
  import { WebSocketLink } from '@apollo/client/link/ws';


  const httpLink = new HttpLink({
    uri: "https://shopnnft.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret":
        "NzT2rxvKy49cA50M535bwnoZXm7XQbpRVzZyhwwIJXVyoCZBlKDACA0DzF71rZAj",
    },
  });

  const wsLink = new WebSocketLink({
    uri: "ws://shopnnft.hasura.app/v1/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret":
            "NzT2rxvKy49cA50M535bwnoZXm7XQbpRVzZyhwwIJXVyoCZBlKDACA0DzF71rZAj",
        },
      },
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
  cache: new InMemoryCache(),
  });

  export default client;