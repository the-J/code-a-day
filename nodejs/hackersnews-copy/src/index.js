const { GraphQLServer } = require('graphql-yoga');

let links = [{
   id: 'link-0',
   url: 'www.howtographql.com',
   description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
   Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => links,
   },
   Mutation: {
      postLink: (parent, args) => {
         const link = {
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
         }

         links.push(link)

         return link
      },
      getLink: (parent, args) => links.find(link => link.id === args.id),
      updateLink: (parent, args) => {
         let index = links.findIndex(link => link.id === args.id);

         if (index > -1) {
            console.log(links[index].url);
            if (args.url) links[index].url = args.url;
            if (args.description) links[index].description = args.description;
         }

         return links[index];
      },
      deleteLink: (parent, args) => {
         let index = links.findIndex(link => link.id === args.id);
         let link = {};

         if (index > -1) {
            link = links[index];
            links.splice(index, 1);
         }

         return link;
      }
   },
}


const server = new GraphQLServer({
   typeDefs: 'src/schema.graphql',
   resolvers
});

server.start(() => console.log('Serwver unning on port 4000'));