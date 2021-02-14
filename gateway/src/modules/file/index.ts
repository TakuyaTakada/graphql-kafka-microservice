import 'graphql-import-node'
import { createModule } from 'graphql-modules'
import * as fileType from './file.graphql'
import fileResolvers from './resolver'

const fileModule = createModule({
  id: 'file-service',
  dirname: __dirname,
  typeDefs: fileType,
  resolvers: fileResolvers,
})

export default fileModule
