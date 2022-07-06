// responsible for importing User model and exporting and object w/ it's property
const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// creating assocations btwn post and user
// user can have many posts, and posts can only belong to a single user
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// relationship of post model to user. 
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// connecting user to vote
Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

// creating a many-to-many associations
// seeing all posts that user has voted on
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});



module.exports = { User, Post, Vote };