var mongoose = require('mongoose'),
Schema = mongoose.Schema,
mongoosePaginate = require('mongoose-paginate');

var ItemSchema = new Schema({
  status: Boolean, // 状态 已完成，未完成
  title: String,
  descript: String,
  type: {type: Schema.Types.ObjectId, ref: 'type'},
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  plainDate: Date,
  completeDate: Date,
  disabled: Boolean,
  createDate: {type: Date, default: Date.now},
  updateTime: {type: Date, default: Date.now}
}, {
  versionKey: false,
  timestamps: { createdAt: 'createDate', updatedAt: 'updateTime' }
});

ItemSchema.plugin(mongoosePaginate);

var Item = mongoose.model('Item', ItemSchema);

module.exports =  Item;