var mongoose = require('mongoose'),
Schema = mongoose.Schema,
mongoosePaginate = require('mongoose-paginate');

var UserSchema = new Schema({
  userid: {type: Schema.Types.ObjectId, ref: 'user'},
  loginType: String,
  Account: String,
  token: String,
  disabled: Boolean,
  createDate: {type: Date, default: Date.now},
  updateTime: {type: Date, default: Date.now}
}, {
  versionKey: false,
  timestamps: { createdAt: 'createDate', updatedAt: 'updateTime' }
});

UserSchema.plugin(mongoosePaginate);

var User = mongoose.model('User', UserSchema);

module.exports = User;
