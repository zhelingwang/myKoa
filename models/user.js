const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//define a model
const UserSchema = new Schema({
	name : String,
	phone : String,
	age : Number
});

//accessing a model
//UserModel = Collection name , 命名会自动转小写并负数化 , UserModel => usermodels
module.exports = mongoose.model('UserModel', UserSchema);

//禁用自动转化Collection name , 加上第三个参数即可指定Collection name
//module.exports = mongoose.model('UserModel', UserSchema,'UserModel');


//other ways
/**
 Tank.create({ size: 'small' }, function (err, small) {
		  if (err) return handleError(err);
		  // saved!
	  });

 // or, for inserting large batches of documents
 Tank.insertMany([{ size: 'small' }], function(err) {

		});
 */