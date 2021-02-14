import { v4 } from 'uuid'
import admin from 'firebase-admin'
import firebase from 'firebase'
import {
  Bucket,
  GenerateSignedPostPolicyV4Options,
} from '@google-cloud/storage'
import { ServiceAccount } from 'firebase-admin/lib/credential'
import {
  firebaseServiceAccount,
  firebaseWebConfig,
  redirectUrl,
} from '../config/firebase'
import { AccountInput, User } from '../__generated__/graphql'
import { CouldNotCreateUserError } from '../errors/GraphQLErrors'

export default class FirebaseService {
  auth!: firebase.auth.Auth
  bucket!: Bucket

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        firebaseServiceAccount as ServiceAccount
      ),
      storageBucket: firebaseWebConfig.storageBucket,
    })
    firebase.initializeApp(firebaseWebConfig)

    this.auth = firebase.auth()
    if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
      this.auth.useEmulator(`http://${firebaseWebConfig.authDomain}`)
    }

    this.bucket = admin.storage().bucket()
  }

  async signUpWithEmailAndPassword(input: AccountInput): Promise<User> {
    const { email, password } = input
    const { user } = await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.auth.sendSignInLinkToEmail(email, {
          url: redirectUrl,
          handleCodeInApp: true,
        })
        return result
      })
      .catch((err) => {
        console.error(err)
        throw new CouldNotCreateUserError()
      })

    if (!user || !user.email) {
      throw new CouldNotCreateUserError()
    }

    return {
      id: user.uid,
      email: user.email,
      iconUrl: user.photoURL,
    }
  }

  async getUploadParams(ext: string) {
    const cfg: GenerateSignedPostPolicyV4Options = {
      expires: Date.now() + 5 * 60 * 1000,
    }

    const filename = `${v4()}.${ext}`
    const [result] = await this.bucket
      .file(filename)
      .generateSignedPostPolicyV4(cfg)
    return result
  }
}
