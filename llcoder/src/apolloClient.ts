import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Blog } from "./generated/graphql";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          blogs: {
            keyArgs: false,
            merge(existting, incoming) {
              // console.log("existting", existting);
              // console.log("incoming", incoming);
              let _blogs: Blog[] = [];
              if (existting && existting.blogs) {
                _blogs = _blogs.concat(existting.blogs);
              }
              if (incoming && incoming.blogs) {
                _blogs = _blogs.concat(incoming.blogs);
              }
              // console.log({ ...incoming, blogs: _blogs });

              return { ...incoming, blogs: _blogs };
            },
          },
        },
      },
    },
  }),
  credentials: "include",
});
