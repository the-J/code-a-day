const { GraphQLServer } = require('graphql-yoga');

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
   typeDefs: 'src/schema.graphql',
   resolvers
});

server.start(() => console.log('Serwver unning on port 4000'));