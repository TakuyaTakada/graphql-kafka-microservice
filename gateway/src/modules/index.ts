import { createApplication } from 'graphql-modules'
import accountModule from './account'

const application = createApplication({
  modules: [accountModule],
})

export default application.createSchemaForApollo()
