import 'graphql-import-node'
import { createModule } from 'graphql-modules'
import * as accountType from './account.graphql'
import accountResolvers from './resolver'

const accountModule = createModule({
  id: 'account-service',
  dirname: __dirname,
  typeDefs: accountType,
  resolvers: accountResolvers,
})

export default accountModule
