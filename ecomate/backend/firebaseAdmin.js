// firebaseAdmin.js
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); // ✅ You'll add this file next

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
