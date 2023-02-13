const faker = require("faker");

// returns an object containing a randomly generated username and email address using the Faker library.
const getRandomUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
  };
};

// create an array of objects containing a randomly generated thought, a username, and a randomly generated reaction for each user in the users array.
const getRandomThought = (users) => {
  let results = [];
  for (let i = 0; i < users.length; i++) {
    results.push({
      thoughtText: faker.lorem.sentence(),
      username: users[i].username,
      reaction: [...getRandomReaction(users, 3)],
    });
  }
  return results;
};

// creates an array of objects containing a randomly generated reaction body and a randomly selected username from the given users array. The number of objects created is determined by the int parameter.
const getRandomReaction = (users, int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    const randomIndex = Math.floor(Math.random() * users.length);
    results.push({
      reactionBody: faker.lorem.sentence(),
      username: users[randomIndex].username,
    });
  }
  return results;
};

module.exports = { getRandomThought, getRandomUser };
