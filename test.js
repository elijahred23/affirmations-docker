const affirmation = require('./affirmation')

affirmation.addAffirmation("YOU ARE AMAZING");
let affirms = affirmation.readAffirmations();

console.log(affirms);