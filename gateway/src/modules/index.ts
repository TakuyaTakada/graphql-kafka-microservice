import { createApplication } from 'graphql-modules'
import accountModule from './account'
import fileModule from './file'

const application = createApplication({
  modules: [accountModule, fileModule],
})

export default application.createSchemaForApollo()
