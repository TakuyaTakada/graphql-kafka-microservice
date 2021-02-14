import { Resolvers } from '../../__generated__/graphql'

const fileResolvers: Resolvers = {
  Query: {
    getUploadParams: async (_, { input }, { firebase }) => {
      const { extension } = input
      return await firebase.getUploadParams(extension)
    },
  },
}

export default fileResolvers
