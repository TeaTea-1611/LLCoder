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

export type Blog = {
  __typename?: 'Blog';
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  markdown: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type BlogResponse = MutationResponse & {
  __typename?: 'BlogResponse';
  blog?: Maybe<Blog>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateBlogInput = {
  markdown: Scalars['String'];
  title: Scalars['String'];
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
  createBlog: BlogResponse;
  createExercise: ExerciseResponse;
  createUser: UserResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  resetPassword: UserResponse;
  setDarkModeSetting: Scalars['Boolean'];
  setLanguageSetting: Scalars['Boolean'];
  updateUser: UserResponse;
  uploadAvatar: UserResponse;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationCreateBlogArgs = {
  data: CreateBlogInput;
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


export type MutationSetLanguageSettingArgs = {
  language: Scalars['String'];
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

export type PagtinatedBlogs = {
  __typename?: 'PagtinatedBlogs';
  blogs?: Maybe<Array<Blog>>;
  cursor: Scalars['DateTime'];
  hashMore: Scalars['Boolean'];
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  blogs: PagtinatedBlogs;
  me?: Maybe<User>;
  user: UserResponse;
  users: UsersResponse;
};


export type QueryBlogsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateBlogInput = {
  id: Scalars['ID'];
  markdown: Scalars['String'];
  title: Scalars['String'];
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
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  nickname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  darkMode: Scalars['Boolean'];
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  exp: Scalars['Float'];
  id: Scalars['ID'];
  language: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
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

export type BlogInfoFragment = { __typename?: 'Blog', id: string, title: string, markdown: string, createdAt: any, updatedAt: any };

export type BlogMutationResponseFragment = { __typename?: 'BlogResponse', code: number, success: boolean, message?: string | null, blog?: { __typename?: 'Blog', id: string, title: string, markdown: string, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type MutationStatusFragment = { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null };

export type UserInfoFragment = { __typename?: 'User', id: string, nickname: string, avatar: string, role: number, exp: number, confirmed: boolean, dateOfBirth?: any | null, lastLogin?: any | null, darkMode: boolean, language: string, createdAt: any, updatedAt: any };

export type UserMutationResponseFragment = { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, nickname: string, avatar: string, role: number, exp: number, confirmed: boolean, dateOfBirth?: any | null, lastLogin?: any | null, darkMode: boolean, language: string, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type CreateBlogMutationVariables = Exact<{
  data: CreateBlogInput;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog: { __typename?: 'BlogResponse', code: number, success: boolean, message?: string | null, blog?: { __typename?: 'Blog', id: string, title: string, markdown: string, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, nickname: string, avatar: string, role: number, exp: number, confirmed: boolean, dateOfBirth?: any | null, lastLogin?: any | null, darkMode: boolean, language: string, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SetDarkModeSettingMutationVariables = Exact<{ [key: string]: never; }>;


export type SetDarkModeSettingMutation = { __typename?: 'Mutation', setDarkModeSetting: boolean };

export type SetLanguageSettingMutationVariables = Exact<{
  language: Scalars['String'];
}>;


export type SetLanguageSettingMutation = { __typename?: 'Mutation', setLanguageSetting: boolean };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, nickname: string, avatar: string, role: number, exp: number, confirmed: boolean, dateOfBirth?: any | null, lastLogin?: any | null, darkMode: boolean, language: string, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type BlogsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type BlogsQuery = { __typename?: 'Query', blogs: { __typename?: 'PagtinatedBlogs', totalCount: number, cursor: any, hashMore: boolean, blogs?: Array<{ __typename?: 'Blog', id: string, title: string, markdown: string, createdAt: any, updatedAt: any }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, nickname: string, avatar: string, role: number, exp: number, confirmed: boolean, dateOfBirth?: any | null, lastLogin?: any | null, darkMode: boolean, language: string, createdAt: any, updatedAt: any } | null };

export const BlogInfoFragmentDoc = gql`
    fragment blogInfo on Blog {
  id
  title
  markdown
  createdAt
  updatedAt
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
}
    `;
export const BlogMutationResponseFragmentDoc = gql`
    fragment blogMutationResponse on BlogResponse {
  code
  success
  message
  blog {
    ...blogInfo
  }
  errors {
    ...fieldError
  }
}
    ${BlogInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const MutationStatusFragmentDoc = gql`
    fragment mutationStatus on UserResponse {
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
  darkMode
  language
  createdAt
  updatedAt
}
    `;
export const UserMutationResponseFragmentDoc = gql`
    fragment userMutationResponse on UserResponse {
  ...mutationStatus
  user {
    ...userInfo
  }
  errors {
    ...fieldError
  }
}
    ${MutationStatusFragmentDoc}
${UserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const CreateBlogDocument = gql`
    mutation CreateBlog($data: CreateBlogInput!) {
  createBlog(data: $data) {
    ...blogMutationResponse
  }
}
    ${BlogMutationResponseFragmentDoc}`;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBlogMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, options);
      }
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export const SetDarkModeSettingDocument = gql`
    mutation SetDarkModeSetting {
  setDarkModeSetting
}
    `;
export type SetDarkModeSettingMutationFn = Apollo.MutationFunction<SetDarkModeSettingMutation, SetDarkModeSettingMutationVariables>;

/**
 * __useSetDarkModeSettingMutation__
 *
 * To run a mutation, you first call `useSetDarkModeSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDarkModeSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDarkModeSettingMutation, { data, loading, error }] = useSetDarkModeSettingMutation({
 *   variables: {
 *   },
 * });
 */
export function useSetDarkModeSettingMutation(baseOptions?: Apollo.MutationHookOptions<SetDarkModeSettingMutation, SetDarkModeSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDarkModeSettingMutation, SetDarkModeSettingMutationVariables>(SetDarkModeSettingDocument, options);
      }
export type SetDarkModeSettingMutationHookResult = ReturnType<typeof useSetDarkModeSettingMutation>;
export type SetDarkModeSettingMutationResult = Apollo.MutationResult<SetDarkModeSettingMutation>;
export type SetDarkModeSettingMutationOptions = Apollo.BaseMutationOptions<SetDarkModeSettingMutation, SetDarkModeSettingMutationVariables>;
export const SetLanguageSettingDocument = gql`
    mutation SetLanguageSetting($language: String!) {
  setLanguageSetting(language: $language)
}
    `;
export type SetLanguageSettingMutationFn = Apollo.MutationFunction<SetLanguageSettingMutation, SetLanguageSettingMutationVariables>;

/**
 * __useSetLanguageSettingMutation__
 *
 * To run a mutation, you first call `useSetLanguageSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLanguageSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLanguageSettingMutation, { data, loading, error }] = useSetLanguageSettingMutation({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useSetLanguageSettingMutation(baseOptions?: Apollo.MutationHookOptions<SetLanguageSettingMutation, SetLanguageSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetLanguageSettingMutation, SetLanguageSettingMutationVariables>(SetLanguageSettingDocument, options);
      }
export type SetLanguageSettingMutationHookResult = ReturnType<typeof useSetLanguageSettingMutation>;
export type SetLanguageSettingMutationResult = Apollo.MutationResult<SetLanguageSettingMutation>;
export type SetLanguageSettingMutationOptions = Apollo.BaseMutationOptions<SetLanguageSettingMutation, SetLanguageSettingMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
  updateUser(data: $data) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const BlogsDocument = gql`
    query Blogs($limit: Int!, $cursor: String) {
  blogs(limit: $limit, cursor: $cursor) {
    totalCount
    cursor
    hashMore
    blogs {
      id
      title
      markdown
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useBlogsQuery__
 *
 * To run a query within a React component, call `useBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useBlogsQuery(baseOptions: Apollo.QueryHookOptions<BlogsQuery, BlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlogsQuery, BlogsQueryVariables>(BlogsDocument, options);
      }
export function useBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogsQuery, BlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlogsQuery, BlogsQueryVariables>(BlogsDocument, options);
        }
export type BlogsQueryHookResult = ReturnType<typeof useBlogsQuery>;
export type BlogsLazyQueryHookResult = ReturnType<typeof useBlogsLazyQuery>;
export type BlogsQueryResult = Apollo.QueryResult<BlogsQuery, BlogsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;