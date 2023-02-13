const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUser, getRandomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  for (let i = 0; i < 20; i++) {
    users.push(getRandomUser());
  }

  const thoughts = getRandomThought(users);

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);
// iterate through array of thoughts and find the associated user for each thought 
for (let i = 0; i < thoughts.length; i++) {
    const user = await User.findOne({ username: thoughts[i].username });
    //If the user is found,
    if (user) {
      //check to see if the thought already exists in the database
      const thought = await Thought.findOne({
        thoughtText: thoughts[i].thoughtText,
      });
      //adds the thought to the user's list of thoughts and saves the user.
      if (thought) {
        user.thoughts.push(thought._id);
        await user.save();
      }
    }
  }

// loop through an array of users and randomly assign each user a number of friends. 
for (let i = 0; i < users.length; i++) {
  let numFriends = Math.floor(Math.random() * (users.length - 1) + 1);
  let user = await User.findOne({ username: users[i].username });
  user.friends = [];
  //randomly selects friends from the array of users and adds them to the user's friends list, making sure that the user is not added as a friend to themselves.
  for (let j = 0; j < numFriends; j++) {
    let friend = users[Math.floor(Math.random() * users.length)];
    if (friend._id !== user._id && !user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
    }
  }
  // save user with their new friends list.
  await user.save();
}

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
