import { getNature } from "./db";

const resolvers = {
    Query: {
        nature: (_) => getNature(),
    },
};

export default resolvers;
