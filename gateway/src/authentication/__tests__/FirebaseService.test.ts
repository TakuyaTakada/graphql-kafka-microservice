import FirebaseService from '../FirebaseService'

test('', async () => {
  const firebase = new FirebaseService()
  const result = await firebase.getUploadParams('png')
  console.log(result)
})
