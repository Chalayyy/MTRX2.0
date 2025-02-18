const resolvers = {
    Query: {
      users: () => {
        return [{ id: "hello user" }];
      },
    },
    Mutation: {
      createUser: () => {
        return "new user created";
      },
    },
  };

  export default resolvers;