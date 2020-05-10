const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  chef: { type: String, required: true },
  avancement: { type: String, required: true },
  blocage: { type: String, required: true },
  
  resteafaire: { type: String, required: true },
  ficheUrl: { type: String, required: true },
  ficheUrlexterne: { type: String, required: true },
  pmo: { type: String, required: true },
  echeance: { type: String, required: true },
  pole: { type: String, required: true },
  structure: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Project', projectSchema);
