import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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

export type AllowedSettingValue = {
  __typename?: "AllowedSettingValue";
  caption: Scalars["String"];
  id: Scalars["ID"];
  setting: Setting;
  setting_id: Scalars["String"];
  value: Scalars["String"];
};

export type Blog = {
  __typename?: "Blog";
  confirmed: Scalars["Boolean"];
  content: Scalars["String"];
  created_at: Scalars["DateTime"];
  entity: _Entity;
  id: Scalars["ID"];
  tags: Array<Tag>;
  title: Scalars["String"];
  updated_at: Scalars["DateTime"];
  user: User;
};

export type BlogMutationResponse = MutationResponse & {
  __typename?: "BlogMutationResponse";
  blog?: Maybe<Blog>;
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type Category = {
  __typename?: "Category";
  exercises: Array<Exercise>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type CategoryMutationResponse = MutationResponse & {
  __typename?: "CategoryMutationResponse";
  category?: Maybe<Category>;
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type CommentReaction = {
  __typename?: "CommentReaction";
  comment: EntityComment;
  comment_id: Scalars["Float"];
  type: Scalars["String"];
  user: User;
  user_id: Scalars["Float"];
};

export type CreateBlogInput = {
  content: Scalars["String"];
  tags?: InputMaybe<Array<Scalars["ID"]>>;
  title: Scalars["String"];
};

export type CreateExerciseInput = {
  category_id?: InputMaybe<Scalars["Float"]>;
  content: Scalars["String"];
  difficulty_id?: InputMaybe<Scalars["Float"]>;
  file_input?: InputMaybe<Scalars["String"]>;
  file_output?: InputMaybe<Scalars["String"]>;
  form?: InputMaybe<Array<Scalars["ID"]>>;
  testcase?: InputMaybe<Array<TestcaseInput>>;
  title: Scalars["String"];
  xp?: InputMaybe<Scalars["Float"]>;
};

export type Difficulty = {
  __typename?: "Difficulty";
  id: Scalars["ID"];
  name_en: Scalars["String"];
  name_vi: Scalars["String"];
};

export type EntityComment = {
  __typename?: "EntityComment";
  comment: Scalars["String"];
  created_at: Scalars["DateTime"];
  entity_id: Scalars["Float"];
  id: Scalars["ID"];
  parent?: Maybe<EntityComment>;
  parent_id: Scalars["Float"];
  reactions: Array<CommentReaction>;
  reactions_count: Scalars["Float"];
  replies?: Maybe<Array<EntityComment>>;
  replies_count: Scalars["Float"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["Float"];
};

export type EntityReaction = {
  __typename?: "EntityReaction";
  entity: _Entity;
  entity_id: Scalars["Float"];
  type: Scalars["String"];
  user: User;
  user_id: Scalars["Float"];
};

export type Exercise = {
  __typename?: "Exercise";
  category?: Maybe<Category>;
  confirmed: Scalars["Boolean"];
  content: Scalars["String"];
  created_at: Scalars["DateTime"];
  difficulty?: Maybe<Difficulty>;
  difficulty_id?: Maybe<Scalars["Float"]>;
  entity: _Entity;
  file_input?: Maybe<Scalars["String"]>;
  file_output?: Maybe<Scalars["String"]>;
  form?: Maybe<Array<ExerciseForm>>;
  id: Scalars["ID"];
  testcase: Array<Testcase>;
  title: Scalars["String"];
  updated_at: Scalars["DateTime"];
  user: User;
  xp: Scalars["Float"];
};

export type ExerciseForm = {
  __typename?: "ExerciseForm";
  exercises: Array<Exercise>;
  id: Scalars["ID"];
  name_en: Scalars["String"];
  name_vi: Scalars["String"];
};

export type ExerciseFormMutationResponse = MutationResponse & {
  __typename?: "ExerciseFormMutationResponse";
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  exercise_form?: Maybe<ExerciseForm>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type ExerciseMutationResponse = MutationResponse & {
  __typename?: "ExerciseMutationResponse";
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  exercise?: Maybe<Exercise>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type InfoCreateExercise = {
  __typename?: "InfoCreateExercise";
  categories?: Maybe<Array<Category>>;
  exercises_form?: Maybe<Array<ExerciseForm>>;
};

export type Level = {
  __typename?: "Level";
  level: Scalars["Float"];
  min_xp: Scalars["Float"];
  name_en: Scalars["String"];
  name_vi: Scalars["String"];
};

export type LoginInput = {
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  confirmUser: Scalars["Boolean"];
  createBlog: BlogMutationResponse;
  createCategory: CategoryMutationResponse;
  createExercise: ExerciseMutationResponse;
  createExerciseForm: ExerciseFormMutationResponse;
  editProfile: UserMutationResponse;
  forgotPassword: Scalars["Boolean"];
  login: UserMutationResponse;
  logout: Scalars["Boolean"];
  register: UserMutationResponse;
  resetPassword: UserMutationResponse;
  updateAvatar: UserMutationResponse;
  uploadImage: UploadImageResponse;
};

export type MutationConfirmUserArgs = {
  token: Scalars["String"];
};

export type MutationCreateBlogArgs = {
  data: CreateBlogInput;
};

export type MutationCreateCategoryArgs = {
  name: Scalars["String"];
};

export type MutationCreateExerciseArgs = {
  data: CreateExerciseInput;
};

export type MutationCreateExerciseFormArgs = {
  name_en: Scalars["String"];
  name_vi: Scalars["String"];
};

export type MutationEditProfileArgs = {
  data: UpdateUserInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationResetPasswordArgs = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type MutationUpdateAvatarArgs = {
  avatar: Scalars["Upload"];
};

export type MutationUploadImageArgs = {
  image: Scalars["Upload"];
};

export type MutationResponse = {
  code: Scalars["Float"];
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type PagtinatedBlogs = {
  __typename?: "PagtinatedBlogs";
  blogs?: Maybe<Array<Blog>>;
  cursor: Scalars["DateTime"];
  hashMore: Scalars["Boolean"];
  totalCount: Scalars["Float"];
};

export type PagtinatedExercises = {
  __typename?: "PagtinatedExercises";
  exercises?: Maybe<Array<Exercise>>;
  totalCount: Scalars["Float"];
};

export type PagtinatedMember = {
  __typename?: "PagtinatedMember";
  members?: Maybe<Array<User>>;
  totalCount: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  comments?: Maybe<Array<EntityComment>>;
  exercise?: Maybe<Exercise>;
  infoCreateExercise: InfoCreateExercise;
  me?: Maybe<User>;
  pagtinatedExercises: PagtinatedExercises;
  pagtinatedMember: PagtinatedMember;
  profile: User;
  settings: UserSettings;
};

export type QueryCommentsArgs = {
  entity_id: Scalars["Int"];
};

export type QueryExerciseArgs = {
  id: Scalars["Int"];
};

export type QueryPagtinatedExercisesArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryPagtinatedMemberArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryProfileArgs = {
  id: Scalars["Int"];
};

export type RegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type Role = {
  __typename?: "Role";
  name_en: Scalars["String"];
  name_vi: Scalars["String"];
  value: Scalars["String"];
};

export type Setting = {
  __typename?: "Setting";
  constrained: Scalars["Boolean"];
  description: Scalars["String"];
  id: Scalars["ID"];
};

export type Tag = {
  __typename?: "Tag";
  blogs: Array<Blog>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Testcase = {
  __typename?: "Testcase";
  exercise: Exercise;
  exercise_id: Scalars["Float"];
  id: Scalars["ID"];
  input?: Maybe<Scalars["String"]>;
  output?: Maybe<Scalars["String"]>;
};

export type TestcaseInput = {
  input?: InputMaybe<Scalars["String"]>;
  output?: InputMaybe<Scalars["String"]>;
};

export type UpdateUserInput = {
  dateOfBirth?: InputMaybe<Scalars["DateTime"]>;
  nickname?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
};

export type UploadImageResponse = {
  __typename?: "UploadImageResponse";
  url?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  avatar: Scalars["String"];
  blogs?: Maybe<Array<Blog>>;
  confirmed: Scalars["Boolean"];
  created_at: Scalars["DateTime"];
  date_of_birth?: Maybe<Scalars["DateTime"]>;
  deleted_at?: Maybe<Scalars["DateTime"]>;
  exercises?: Maybe<Array<Exercise>>;
  id: Scalars["ID"];
  last_login?: Maybe<Scalars["DateTime"]>;
  mssv?: Maybe<Scalars["String"]>;
  nickname: Scalars["String"];
  role: Role;
  settings: Array<UserSetting>;
  updated_at: Scalars["DateTime"];
  xp: Scalars["Float"];
  xp_level: Level;
  xp_next_level: Level;
};

export type UserMutationResponse = MutationResponse & {
  __typename?: "UserMutationResponse";
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
  user?: Maybe<User>;
};

export type UserSetting = {
  __typename?: "UserSetting";
  allowed_setting_value: AllowedSettingValue;
  allowed_setting_value_id: Scalars["ID"];
  setting: Setting;
  setting_id: Scalars["ID"];
  user: User;
  user_id: Scalars["ID"];
};

export type UserSettings = {
  __typename?: "UserSettings";
  language?: Maybe<Scalars["String"]>;
  theme?: Maybe<Scalars["String"]>;
};

export type _Entity = {
  __typename?: "_Entity";
  comments: Array<EntityComment>;
  comments_count: Scalars["Float"];
  entity_type: Scalars["String"];
  id: Scalars["ID"];
  reactions: Array<EntityReaction>;
  reactions_count: Scalars["Float"];
};

export type FieldErrorFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
};

export type MutationStatusFragment = {
  __typename?: "UserMutationResponse";
  code: number;
  success: boolean;
  message?: string | null;
};

export type UserInfoFragment = {
  __typename?: "User";
  id: string;
  nickname: string;
  avatar: string;
  mssv?: string | null;
  xp: number;
  date_of_birth?: any | null;
  last_login?: any | null;
  role: { __typename?: "Role"; name_vi: string; name_en: string };
  xp_level: {
    __typename?: "Level";
    level: number;
    min_xp: number;
    name_vi: string;
    name_en: string;
  };
  xp_next_level: {
    __typename?: "Level";
    level: number;
    min_xp: number;
    name_vi: string;
    name_en: string;
  };
  blogs?: Array<{ __typename?: "Blog"; title: string }> | null;
};

export type UserMutationResponseFragment = {
  __typename?: "UserMutationResponse";
  code: number;
  success: boolean;
  message?: string | null;
  user?: {
    __typename?: "User";
    id: string;
    nickname: string;
    avatar: string;
    mssv?: string | null;
    xp: number;
    date_of_birth?: any | null;
    last_login?: any | null;
    role: { __typename?: "Role"; name_vi: string; name_en: string };
    xp_level: {
      __typename?: "Level";
      level: number;
      min_xp: number;
      name_vi: string;
      name_en: string;
    };
    xp_next_level: {
      __typename?: "Level";
      level: number;
      min_xp: number;
      name_vi: string;
      name_en: string;
    };
    blogs?: Array<{ __typename?: "Blog"; title: string }> | null;
  } | null;
  errors?: Array<{
    __typename?: "FieldError";
    field: string;
    message: string;
  }> | null;
};

export type UploadImageMarkDownMutationVariables = Exact<{
  image: Scalars["Upload"];
}>;

export type UploadImageMarkDownMutation = {
  __typename?: "Mutation";
  uploadImage: { __typename?: "UploadImageResponse"; url?: string | null };
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserMutationResponse";
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: "User";
      id: string;
      nickname: string;
      mssv?: string | null;
      avatar: string;
      xp: number;
      role: {
        __typename?: "Role";
        value: string;
        name_vi: string;
        name_en: string;
      };
      xp_level: {
        __typename?: "Level";
        level: number;
        min_xp: number;
        name_vi: string;
        name_en: string;
      };
      xp_next_level: {
        __typename?: "Level";
        level: number;
        min_xp: number;
        name_vi: string;
        name_en: string;
      };
    } | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserMutationResponse";
    code: number;
    success: boolean;
    message?: string | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type ExerciseQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type ExerciseQuery = {
  __typename?: "Query";
  exercise?: {
    __typename?: "Exercise";
    id: string;
    title: string;
    content: string;
    xp: number;
    created_at: any;
    updated_at: any;
    user: { __typename?: "User"; nickname: string; avatar: string };
    entity: {
      __typename?: "_Entity";
      id: string;
      entity_type: string;
      comments_count: number;
      reactions_count: number;
    };
    difficulty?: {
      __typename?: "Difficulty";
      name_vi: string;
      name_en: string;
    } | null;
    category?: { __typename?: "Category"; name: string } | null;
    form?: Array<{
      __typename?: "ExerciseForm";
      name_vi: string;
      name_en: string;
    }> | null;
  } | null;
};

export type InfoCreateExerciseQueryVariables = Exact<{ [key: string]: never }>;

export type InfoCreateExerciseQuery = {
  __typename?: "Query";
  infoCreateExercise: {
    __typename?: "InfoCreateExercise";
    exercises_form?: Array<{
      __typename?: "ExerciseForm";
      id: string;
      name_vi: string;
      name_en: string;
    }> | null;
    categories?: Array<{
      __typename?: "Category";
      id: string;
      name: string;
    }> | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: string;
    nickname: string;
    mssv?: string | null;
    avatar: string;
    xp: number;
    role: {
      __typename?: "Role";
      value: string;
      name_vi: string;
      name_en: string;
    };
    xp_level: {
      __typename?: "Level";
      level: number;
      min_xp: number;
      name_vi: string;
      name_en: string;
    };
    xp_next_level: {
      __typename?: "Level";
      level: number;
      min_xp: number;
      name_vi: string;
      name_en: string;
    };
  } | null;
};

export type PagtinatedExercisesQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type PagtinatedExercisesQuery = {
  __typename?: "Query";
  pagtinatedExercises: {
    __typename?: "PagtinatedExercises";
    totalCount: number;
    exercises?: Array<{
      __typename?: "Exercise";
      id: string;
      title: string;
      content: string;
      xp: number;
      created_at: any;
      updated_at: any;
      entity: {
        __typename?: "_Entity";
        id: string;
        entity_type: string;
        comments_count: number;
        reactions_count: number;
      };
      difficulty?: {
        __typename?: "Difficulty";
        name_vi: string;
        name_en: string;
      } | null;
      category?: { __typename?: "Category"; name: string } | null;
      form?: Array<{
        __typename?: "ExerciseForm";
        name_vi: string;
        name_en: string;
      }> | null;
    }> | null;
  };
};

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
    avatar
    mssv
    xp
    date_of_birth
    last_login
    role {
      name_vi
      name_en
    }
    xp_level {
      level
      min_xp
      name_vi
      name_en
    }
    xp_next_level {
      level
      min_xp
      name_vi
      name_en
    }
    blogs {
      title
    }
  }
`;
export const FieldErrorFragmentDoc = gql`
  fragment fieldError on FieldError {
    field
    message
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
  ${FieldErrorFragmentDoc}
`;
export const UploadImageMarkDownDocument = gql`
  mutation UploadImageMarkDown($image: Upload!) {
    uploadImage(image: $image) {
      url
    }
  }
`;
export type UploadImageMarkDownMutationFn = Apollo.MutationFunction<
  UploadImageMarkDownMutation,
  UploadImageMarkDownMutationVariables
>;

/**
 * __useUploadImageMarkDownMutation__
 *
 * To run a mutation, you first call `useUploadImageMarkDownMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMarkDownMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMarkDownMutation, { data, loading, error }] = useUploadImageMarkDownMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUploadImageMarkDownMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadImageMarkDownMutation,
    UploadImageMarkDownMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UploadImageMarkDownMutation,
    UploadImageMarkDownMutationVariables
  >(UploadImageMarkDownDocument, options);
}
export type UploadImageMarkDownMutationHookResult = ReturnType<
  typeof useUploadImageMarkDownMutation
>;
export type UploadImageMarkDownMutationResult =
  Apollo.MutationResult<UploadImageMarkDownMutation>;
export type UploadImageMarkDownMutationOptions = Apollo.BaseMutationOptions<
  UploadImageMarkDownMutation,
  UploadImageMarkDownMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      ...mutationStatus
      user {
        id
        nickname
        mssv
        role {
          value
          name_vi
          name_en
        }
        avatar
        xp
        xp_level {
          level
          min_xp
          name_vi
          name_en
        }
        xp_next_level {
          level
          min_xp
          name_vi
          name_en
        }
      }
      errors {
        ...fieldError
      }
    }
  }
  ${MutationStatusFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

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
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

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
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
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
  ${FieldErrorFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

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
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const ExerciseDocument = gql`
  query Exercise($id: Int!) {
    exercise(id: $id) {
      id
      user {
        nickname
        avatar
      }
      entity {
        id
        entity_type
        comments_count
        reactions_count
      }
      title
      content
      xp
      difficulty {
        name_vi
        name_en
      }
      category {
        name
      }
      form {
        name_vi
        name_en
      }
      created_at
      updated_at
    }
  }
`;

/**
 * __useExerciseQuery__
 *
 * To run a query within a React component, call `useExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExerciseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExerciseQuery(
  baseOptions: Apollo.QueryHookOptions<ExerciseQuery, ExerciseQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExerciseQuery, ExerciseQueryVariables>(
    ExerciseDocument,
    options
  );
}
export function useExerciseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExerciseQuery,
    ExerciseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExerciseQuery, ExerciseQueryVariables>(
    ExerciseDocument,
    options
  );
}
export type ExerciseQueryHookResult = ReturnType<typeof useExerciseQuery>;
export type ExerciseLazyQueryHookResult = ReturnType<
  typeof useExerciseLazyQuery
>;
export type ExerciseQueryResult = Apollo.QueryResult<
  ExerciseQuery,
  ExerciseQueryVariables
>;
export const InfoCreateExerciseDocument = gql`
  query infoCreateExercise {
    infoCreateExercise {
      exercises_form {
        id
        name_vi
        name_en
      }
      categories {
        id
        name
      }
    }
  }
`;

/**
 * __useInfoCreateExerciseQuery__
 *
 * To run a query within a React component, call `useInfoCreateExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useInfoCreateExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInfoCreateExerciseQuery({
 *   variables: {
 *   },
 * });
 */
export function useInfoCreateExerciseQuery(
  baseOptions?: Apollo.QueryHookOptions<
    InfoCreateExerciseQuery,
    InfoCreateExerciseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    InfoCreateExerciseQuery,
    InfoCreateExerciseQueryVariables
  >(InfoCreateExerciseDocument, options);
}
export function useInfoCreateExerciseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    InfoCreateExerciseQuery,
    InfoCreateExerciseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    InfoCreateExerciseQuery,
    InfoCreateExerciseQueryVariables
  >(InfoCreateExerciseDocument, options);
}
export type InfoCreateExerciseQueryHookResult = ReturnType<
  typeof useInfoCreateExerciseQuery
>;
export type InfoCreateExerciseLazyQueryHookResult = ReturnType<
  typeof useInfoCreateExerciseLazyQuery
>;
export type InfoCreateExerciseQueryResult = Apollo.QueryResult<
  InfoCreateExerciseQuery,
  InfoCreateExerciseQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      nickname
      mssv
      role {
        value
        name_vi
        name_en
      }
      avatar
      xp
      xp_level {
        level
        min_xp
        name_vi
        name_en
      }
      xp_next_level {
        level
        min_xp
        name_vi
        name_en
      }
    }
  }
`;

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
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PagtinatedExercisesDocument = gql`
  query pagtinatedExercises($page: Int, $limit: Int) {
    pagtinatedExercises(page: $page, limit: $limit) {
      totalCount
      exercises {
        id
        entity {
          id
          entity_type
          comments_count
          reactions_count
        }
        title
        content
        xp
        difficulty {
          name_vi
          name_en
        }
        category {
          name
        }
        form {
          name_vi
          name_en
        }
        created_at
        updated_at
      }
    }
  }
`;

/**
 * __usePagtinatedExercisesQuery__
 *
 * To run a query within a React component, call `usePagtinatedExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePagtinatedExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePagtinatedExercisesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePagtinatedExercisesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PagtinatedExercisesQuery,
    PagtinatedExercisesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PagtinatedExercisesQuery,
    PagtinatedExercisesQueryVariables
  >(PagtinatedExercisesDocument, options);
}
export function usePagtinatedExercisesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PagtinatedExercisesQuery,
    PagtinatedExercisesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PagtinatedExercisesQuery,
    PagtinatedExercisesQueryVariables
  >(PagtinatedExercisesDocument, options);
}
export type PagtinatedExercisesQueryHookResult = ReturnType<
  typeof usePagtinatedExercisesQuery
>;
export type PagtinatedExercisesLazyQueryHookResult = ReturnType<
  typeof usePagtinatedExercisesLazyQuery
>;
export type PagtinatedExercisesQueryResult = Apollo.QueryResult<
  PagtinatedExercisesQuery,
  PagtinatedExercisesQueryVariables
>;
