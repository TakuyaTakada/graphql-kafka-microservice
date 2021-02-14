import { ApolloError } from 'apollo-server'

export enum ErrorCode {
  CouldNotCreateUser = 'CouldNotCreateUser',
}

export abstract class BaseGraphQLError extends ApolloError {
  protected constructor(message: string, code: ErrorCode) {
    super(message, code)
  }
}

export class CouldNotCreateUserError extends BaseGraphQLError {
  constructor(message: string | null = null) {
    super(message || 'Could not create user', ErrorCode.CouldNotCreateUser)
  }
}
