// responsible for importing User model and exporting and object w/ it's property
const User = require('./User');
const Post = require('./Post');

// creating assocations btwn post and user
// user can have many posts, and posts can only belong to a single user
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// relationship of post model to user. 
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post };