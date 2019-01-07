const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
type Query {
   info: String!
   feed: [Link!]!
}

type Link {
   id: ID!
   description: String!
   url: String!
}
`

const links = [
   {
      id: 'link-0',
      url: 'www.howtographql.com',
      description: 'GraphQL tutorial'
   }
];

const resolvers = {
   Query: {
      info: () => `This is API for hackernews clone`,
      feed: () => links
   },
   Link: {
      id: parent => parent.id,
      url: parent => parent.url,
      description: parent => parent.description
   }
}

const server = new GraphQLServer({
   typeDefs,
   resolvers
});

server.start(() => console.log('Serwver unning on port 4000'));