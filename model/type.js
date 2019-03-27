var mongoose = require('mongoose'),
Schema = mongoose.Schema,
mongoosePaginate = require('mongoose-paginate');

var TypeSchema = new Schema({
  name: String,
  descript: String,
  creator: {type: Schema.Types.ObjectId, ref: 'user'},
  disabled: Boolean,
  createDate: {type: Date, default: Date.now},
  updateTime: {type: Date, default: Date.now}
}, {
  versionKey: false,
  timestamps: { createdAt: 'createDate', updatedAt: 'updateTime' }
});

TypeSchema.plugin(mongoosePaginate);

var Type = mongoose.model('Type', TypeSchema);

module.exports = Type;