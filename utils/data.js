
const names = [
    "Aaron",
    "Bella",
    "Charlie",
    "Denart",
    "Edwin",
    "Francis",
    "Gerry",
    "Henry",
    "Issac",
    "Jonas",
    "Ken",
    "Laura",
    "Melany",
    "Nancy",
    "Oscar",
    "Paul",
    "Quincy",
    "Rachel",
    "Steven",
    "Timothy",
    "Ulrik",
    "Valerie",
    "Winston",
    "Xander",
    "Yon",
    "Zyon",
];

    const comments = [
    "Last week I discovered Frostgrave.",
    "Find My Phone is a useful app",
    "Learn Piano is not very good for learning Piano",
    "Starbase Defender is a great game, I love it",
    "Tower Defense is okay",
    "Really enjoy spending time with Edward Teddy. ",
    "White Scars are my favorite Warhammer faction",
    "Hello world, this is a comment",
    "Social media is a big waste of time",
    "Notes is my most used app",
    "Messages is open on my computer 24/7",
    "Eagles are jotos",
    "My car is on Fire!",
    "Firefox is great for privacy",
];

    const emails = [
    `supersuper`,
    `master1234`,
    `testingemail`,
    `random_random`,
    `super_random`,
    `uber_random`,
    `wierdly_random`,
    `this_is_random`,
];

  // Get a random item given an array
    const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Gets a random email from emails
    const getRandomEmail = () => `${getRandomArrItem(emails)}@email.com`;

  // Gets a random name for names 
    const getRandomName = () => `${getRandomArrItem(names)}`;

  // Function to generate random thoughts.
    const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
        reactionBody: getRandomArrItem(comments),
        username: getRandomName(),
        });
    }
    return results;
};

  // Export the functions for use in seed.js
    module.exports = { 
    getRandomEmail, 
    getRandomName, 
    getRandomThoughts 
};