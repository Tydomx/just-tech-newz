const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// importing new package for encrypting passwords
const bcrypt = require('bcrypt');

// create our User model
class User extends Model { 
  // set up method to run on instance data (per user) to check password
  // verify's user password by comparing plaintext and hashed password version
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// define table columns and configuration
User.init(
  {
    id: {
      // use special sequelize datatypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the primary key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    // pass in our imported sequelze connectino (direct connection to our DB)
    sequelize,
    // don't automatically create createAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of db table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the db
    modelName: 'user'
  }
);

module.exports = User;