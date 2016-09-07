var mongoose = require('mongoose');
var Food = require('./food');

var PartySchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: {
    start: { type: String, required: true },
    end:   { type: String }
  },
  date:    { type: Date,   required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  foodList: {
    // Boolean for choosing this option
    chosen: { type: Boolean, required: true },
    list: [Food.schema]
  },
  playlist: {
    // Boolean for choosing this option
    chosen: { type: Boolean, required: true }
  },
  entertainment: {
    // Boolean for choosing this option
    chosen:   { type: Boolean, required: true },
    category: { type: String }
  },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guests:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},
  { timestamps: true }
);

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

PartySchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

PartySchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};


module.exports = mongoose.model('Party', PartySchema);
