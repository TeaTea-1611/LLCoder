import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type CreateExerciseInput = {
  description: Scalars['String'];
  difficulty: Scalars['Float'];
  exp: Scalars['Float'];
  markdown: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['Float'];
  username: Scalars['String'];
};

export type Exercise = {
  __typename?: 'Exercise';
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  difficulty: Scalars['Float'];
  exp: Scalars['Float'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  markdown: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ExerciseResponse = MutationResponse & {
  __typename?: 'ExerciseResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  exercise?: Maybe<Exercise>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ExercisesResponse = MutationResponse & {
  __typename?: 'ExercisesResponse';
  code: Scalars['Float'];
  exercises?: Maybe<Array<Exercise>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmUser: Scalars['Boolean'];
  createExercise: ExerciseResponse;
  createUser: UserResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  resetPassword: UserResponse;
  updateUser: UserResponse;
  uploadAvatar: UserResponse;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationCreateExerciseArgs = {
  data: CreateExerciseInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUploadAvatarArgs = {
  avatar: Scalars['Upload'];
};

export type MutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  me: UserResponse;
  user: UserResponse;
  users: UsersResponse;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateExerciseInput = {
  description: Scalars['String'];
  difficulty: Scalars['Float'];
  exp: Scalars['Float'];
  id: Scalars['ID'];
  markdown: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  nickname: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  dateOfBirth: Scalars['DateTime'];
  exp: Scalars['Float'];
  id: Scalars['ID'];
  lastLogin: Scalars['DateTime'];
  nickname: Scalars['String'];
  role: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = MutationResponse & {
  __typename?: 'UserResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UsersResponse = MutationResponse & {
  __typename?: 'UsersResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  users?: Maybe<Array<User>>;
};

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

type MutationStatus_ExerciseResponse_Fragment = { __typename?: 'ExerciseResponse', code: number, success: boolean, message?: string | null };

type MutationStatus_ExercisesResponse_Fragment = { __typename?: 'ExercisesResponse', code: number, success: boolean, message?: string | null };

type MutationStatus_UserResponse_Fragment = { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null };

type MutationStatus_UsersResponse_Fragment = { __typename?: 'UsersResponse', code: number, success: boolean, message?: string | null };

export type MutationStatusFragment = MutationStatus_ExerciseResponse_Fragment | MutationStatus_ExercisesResponse_Fragment | MutationStatus_UserResponse_Fragment | MutationStatus_UsersResponse_Fragment;

export type UserInfoFragment = { __typename?: 'User', id: string, nickname: string, avatar: string, role: number, exp: number, confirmed: boolean, dateOfBirth: any, lastLogin: any, createdAt: any, updatedAt: any };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
}
    `;
export const MutationStatusFragmentDoc = gql`
    fragment mutationStatus on MutationResponse {
  code
  success
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  nickname
  avatar
  role
  exp
  confirmed
  dateOfBirth
  lastLogin
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    ...mutationStatus
    errors {
      ...fieldError
    }
  }
}
    ${MutationStatusFragmentDoc}
${FieldErrorFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    ...mutationStatus
    errors {
      ...fieldError
    }
  }
}
    ${MutationStatusFragmentDoc}
${FieldErrorFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;