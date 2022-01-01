const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const tokenSchema = mongoose.Schema(
  {
    _id: Number,
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['refresh', 'resetPassword'],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.plugin(AutoIncrement, {id: 'token_id', inc_field: '_id'});
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
