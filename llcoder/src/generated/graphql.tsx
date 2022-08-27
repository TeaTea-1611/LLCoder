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
  entity: Entity;
  entityId: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type BlogMutationResponse = MutationResponse & {
  __typename?: 'BlogMutationResponse';
  blog?: Maybe<Blog>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Category = {
  __typename?: 'Category';
  exercises: Array<Exercise>;
  id: Scalars['ID'];
  nameEn: Scalars['String'];
  nameVi: Scalars['String'];
};

export type CategoryMutationResponse = MutationResponse & {
  __typename?: 'CategoryMutationResponse';
  category?: Maybe<Category>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  id: Scalars['ID'];
  reactions: Array<Reactions>;
  reactionsCount: Scalars['Float'];
  user: User;
  userId: Scalars['Float'];
};

export type CreateBlogInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type CreateCategoryInput = {
  nameEn: Scalars['String'];
  nameVi: Scalars['String'];
};

export type CreateExerciseInput = {
  categories?: InputMaybe<Array<Scalars['ID']>>;
  difficulty?: InputMaybe<Scalars['Float']>;
  exp?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  text: Scalars['String'];
};

export type Entity = {
  __typename?: 'Entity';
  comments: Array<Comment>;
  entityType: Scalars['String'];
  id: Scalars['ID'];
  reactionsCount: Scalars['Float'];
};

export type Exercise = {
  __typename?: 'Exercise';
  categories: Array<Category>;
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  difficulty: Scalars['Float'];
  exp: Scalars['Float'];
  id: Scalars['ID'];
  name: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type ExerciseMutationResponse = MutationResponse & {
  __typename?: 'ExerciseMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  exercise?: Maybe<Exercise>;
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
  createBlog: BlogMutationResponse;
  createCategory: CategoryMutationResponse;
  createComment?: Maybe<Comment>;
  createExercise: ExerciseMutationResponse;
  editProfile: UserMutationResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserMutationResponse;
  logout: Scalars['Boolean'];
  register: UserMutationResponse;
  resetPassword: UserMutationResponse;
  setDarkModeSetting: Scalars['Boolean'];
  setLanguageSetting: Scalars['Boolean'];
  updateAvatar: UserMutationResponse;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationCreateBlogArgs = {
  data: CreateBlogInput;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateCommentArgs = {
  comment: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationCreateExerciseArgs = {
  data: CreateExerciseInput;
};


export type MutationEditProfileArgs = {
  data: UpdateUserInput;
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


export type MutationUpdateAvatarArgs = {
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

export type PagtinatedExercises = {
  __typename?: 'PagtinatedExercises';
  exercises?: Maybe<Array<Exercise>>;
  totalCount: Scalars['Float'];
};

export type PagtinatedMember = {
  __typename?: 'PagtinatedMember';
  members?: Maybe<Array<User>>;
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  pagtinatedBlogs: PagtinatedBlogs;
  pagtinatedExercises: PagtinatedExercises;
  pagtinatedMember: PagtinatedMember;
  profile: User;
};


export type QueryPagtinatedBlogsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPagtinatedExercisesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryPagtinatedMemberArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryProfileArgs = {
  id: Scalars['Int'];
};

export type Reactions = {
  __typename?: 'Reactions';
  type: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateUserInput = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  nickname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  blogs: Array<Blog>;
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  darkMode: Scalars['Boolean'];
  dob?: Maybe<Scalars['DateTime']>;
  exp: Scalars['Float'];
  id: Scalars['ID'];
  language: Scalars['String'];
  ll?: Maybe<Scalars['DateTime']>;
  nickname: Scalars['String'];
  role: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type BlogInfoFragment = { __typename?: 'Blog', entityId: string, title: string, text: string, createdAt: any, updatedAt: any };

export type BlogMutationResponseFragment = { __typename?: 'BlogMutationResponse', code: number, success: boolean, message?: string | null, blog?: { __typename?: 'Blog', entityId: string, title: string, text: string, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type MutationStatusFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type UserInfoFragment = { __typename?: 'User', id: string, nickname: string, role: number, confirmed: boolean, avatar: string, exp: number, dob?: any | null, darkMode: boolean, language: string, ll?: any | null, createdAt: any, updatedAt: any };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, nickname: string, role: number, confirmed: boolean, avatar: string, exp: number, dob?: any | null, darkMode: boolean, language: string, ll?: any | null, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type CreateBlogMutationVariables = Exact<{
  data: CreateBlogInput;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog: { __typename?: 'BlogMutationResponse', code: number, success: boolean, message?: string | null, blog?: { __typename?: 'Blog', entityId: string, title: string, text: string, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, nickname: string, role: number, confirmed: boolean, avatar: string, exp: number, dob?: any | null, darkMode: boolean, language: string, ll?: any | null, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SetDarkModeSettingMutationVariables = Exact<{ [key: string]: never; }>;


export type SetDarkModeSettingMutation = { __typename?: 'Mutation', setDarkModeSetting: boolean };

export type SetLanguageSettingMutationVariables = Exact<{
  language: Scalars['String'];
}>;


export type SetLanguageSettingMutation = { __typename?: 'Mutation', setLanguageSetting: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, nickname: string, role: number, confirmed: boolean, avatar: string, exp: number, dob?: any | null, darkMode: boolean, language: string, ll?: any | null, createdAt: any, updatedAt: any } | null };

export type PagtinatedBlogsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PagtinatedBlogsQuery = { __typename?: 'Query', pagtinatedBlogs: { __typename?: 'PagtinatedBlogs', totalCount: number, cursor: any, hashMore: boolean, blogs?: Array<{ __typename?: 'Blog', entityId: string, title: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', nickname: string } }> | null } };

export const BlogInfoFragmentDoc = gql`
    fragment blogInfo on Blog {
  entityId
  title
  text
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
    fragment blogMutationResponse on BlogMutationResponse {
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
    fragment mutationStatus on UserMutationResponse {
  code
  success
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  nickname
  role
  confirmed
  avatar
  exp
  dob
  darkMode
  language
  ll
  createdAt
  updatedAt
}
    `;
export const UserMutationResponseFragmentDoc = gql`
    fragment userMutationResponse on UserMutationResponse {
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
export const PagtinatedBlogsDocument = gql`
    query PagtinatedBlogs($limit: Int!, $cursor: String) {
  pagtinatedBlogs(limit: $limit, cursor: $cursor) {
    totalCount
    cursor
    hashMore
    blogs {
      user {
        nickname
      }
      entityId
      title
      text
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __usePagtinatedBlogsQuery__
 *
 * To run a query within a React component, call `usePagtinatedBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePagtinatedBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePagtinatedBlogsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePagtinatedBlogsQuery(baseOptions: Apollo.QueryHookOptions<PagtinatedBlogsQuery, PagtinatedBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PagtinatedBlogsQuery, PagtinatedBlogsQueryVariables>(PagtinatedBlogsDocument, options);
      }
export function usePagtinatedBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PagtinatedBlogsQuery, PagtinatedBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PagtinatedBlogsQuery, PagtinatedBlogsQueryVariables>(PagtinatedBlogsDocument, options);
        }
export type PagtinatedBlogsQueryHookResult = ReturnType<typeof usePagtinatedBlogsQuery>;
export type PagtinatedBlogsLazyQueryHookResult = ReturnType<typeof usePagtinatedBlogsLazyQuery>;
export type PagtinatedBlogsQueryResult = Apollo.QueryResult<PagtinatedBlogsQuery, PagtinatedBlogsQueryVariables>;