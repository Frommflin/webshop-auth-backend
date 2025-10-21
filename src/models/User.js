import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  passwordHash: { type: String, required: true },
  address: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },

  // GDPR Article 7 (consent management)
  consents: {
    marketing: { type: Boolean, default: false },
    analytics: { type: Boolean, default: false },
    required: { type: Boolean, default: true } // användarvillkor som du måste acceptera för att skapa ett konto
  },

  // GDPR Article 30 — Consent Logs & Audit Trails
  consentLogs: [consentLogSchema],

  deleted: { type: Boolean, default: false },
  deletedAt: Date
});


// Hashaning
userSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, 12);
};

// GDPR Article 20 — Right to Data Portability:
// ta bort hashiningen innan användren data exporteras
userSchema.methods.toPublicJSON = function() {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

export default mongoose.model('User', userSchema);
