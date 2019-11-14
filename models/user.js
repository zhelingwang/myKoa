const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//define a model
const UserSchema = new Schema({
	name : String,
	phone : Number,
	age : Number
});

//accessing a model
//UserModel = Collection name , 命名会自动转小写并负数化 , UserModel => usermodels
module.exports = mongoose.model('UserModel', UserSchema);