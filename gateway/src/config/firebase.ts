import serviceAccount from '../secrets/firebaseServiceAccount.json'

export const firebaseServiceAccount = serviceAccount

export const firebaseWebConfig = {
  apiKey: process.env.FIREBASE_WEB_API_KEY || 'API_KEY',
  authDomain:
    process.env.FIREBASE_AUTH_EMULATOR_HOST ||
    `${firebaseServiceAccount.project_id}.firebaseapp.com`,
  databaseURL: `https://${firebaseServiceAccount.project_id}.firebaseio.com`,
  projectId: firebaseServiceAccount.project_id,
  storageBucket: `${firebaseServiceAccount.project_id}.appspot.com`,
  messagingSenderId: 'SENDER_ID',
  appId: 'gateway',
}

export const redirectUrl =
  process.env.FIREBASE_VERIFY_LINK_REDIRECT_URL || 'http://localhost:4000'
