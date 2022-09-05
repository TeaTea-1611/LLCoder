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

export type Blog = {
  __typename?: "Blog";
  commentsCount: Scalars["Float"];
  confirmed: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  likes: Array<BlogLike>;
  likesCount: Scalars["Float"];
  tags: Array<BlogTag>;
  text: Scalars["String"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type BlogComment = {
  __typename?: "BlogComment";
  comment: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  parentId?: Maybe<Scalars["ID"]>;
  reactions: Array<BlogCommentReactions>;
  reactionsCount: Scalars["Float"];
  replyCount: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
  user: User;
  userId: Scalars["Float"];
};

export type BlogCommentInput = {
  blogId: Scalars["Int"];
  comment: Scalars["String"];
  parentId?: InputMaybe<Scalars["Int"]>;
};

export type BlogCommentMutationResponse = MutationResponse & {
  __typename?: "BlogCommentMutationResponse";
  code: Scalars["Float"];
  comment?: Maybe<BlogComment>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type BlogCommentReactions = {
  __typename?: "BlogCommentReactions";
  commentId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  type: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  userId: Scalars["ID"];
};

export type BlogLike = {
  __typename?: "BlogLike";
  blog: Blog;
  blogId: Scalars["ID"];
  user: User;
  userId: Scalars["ID"];
};

export type BlogMutationResponse = MutationResponse & {
  __typename?: "BlogMutationResponse";
  blog?: Maybe<Blog>;
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type BlogTag = {
  __typename?: "BlogTag";
  blogs: Array<Blog>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Category = {
  __typename?: "Category";
  exercises: Array<Exercise>;
  id: Scalars["ID"];
  nameEn: Scalars["String"];
  nameVi: Scalars["String"];
};

export type CategoryMutationResponse = MutationResponse & {
  __typename?: "CategoryMutationResponse";
  category?: Maybe<Category>;
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type CreateBlogInput = {
  tags?: InputMaybe<Array<Scalars["ID"]>>;
  text: Scalars["String"];
  title: Scalars["String"];
};

export type CreateCategoryInput = {
  nameEn: Scalars["String"];
  nameVi: Scalars["String"];
};

export type CreateExerciseInput = {
  categories?: InputMaybe<Array<Scalars["ID"]>>;
  difficulty?: InputMaybe<Scalars["Float"]>;
  exp?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  text: Scalars["String"];
};

export type Exercise = {
  __typename?: "Exercise";
  categories: Array<Category>;
  confirmed: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  difficulty: Scalars["Float"];
  exp: Scalars["Float"];
  id: Scalars["ID"];
  name: Scalars["String"];
  text: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user: User;
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

export type LanguageSettingResponse = {
  __typename?: "LanguageSettingResponse";
  language: Scalars["String"];
};

export enum LanguageType {
  En = "en",
  Vi = "vi",
}

export type LoginInput = {
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  confirmUser: Scalars["Boolean"];
  createBlog: BlogMutationResponse;
  createBlogComment: BlogCommentMutationResponse;
  createCategory: CategoryMutationResponse;
  createExercise: ExerciseMutationResponse;
  deleteBlogComment: Scalars["Boolean"];
  editProfile: UserMutationResponse;
  forgotPassword: Scalars["Boolean"];
  likeBlog?: Maybe<Blog>;
  login: UserMutationResponse;
  logout: Scalars["Boolean"];
  reactionCommentBlog?: Maybe<BlogComment>;
  register: UserMutationResponse;
  resetPassword: UserMutationResponse;
  setLanguageSetting: LanguageSettingResponse;
  setThemeSetting: ThemeSettingResponse;
  updateAvatar: UserMutationResponse;
  uploadImage: UploadImageResponse;
};

export type MutationConfirmUserArgs = {
  token: Scalars["String"];
};

export type MutationCreateBlogArgs = {
  data: CreateBlogInput;
};

export type MutationCreateBlogCommentArgs = {
  data: BlogCommentInput;
};

export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};

export type MutationCreateExerciseArgs = {
  data: CreateExerciseInput;
};

export type MutationDeleteBlogCommentArgs = {
  commentId: Scalars["Int"];
};

export type MutationEditProfileArgs = {
  data: UpdateUserInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLikeBlogArgs = {
  blogId: Scalars["Int"];
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationReactionCommentBlogArgs = {
  commentId: Scalars["Int"];
  reactionType: ReactionsType;
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationResetPasswordArgs = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type MutationSetLanguageSettingArgs = {
  languageType: LanguageType;
};

export type MutationSetThemeSettingArgs = {
  themeType: ThemeType;
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

export type PagtinatedComment = {
  __typename?: "PagtinatedComment";
  comments?: Maybe<Array<BlogComment>>;
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
  blog?: Maybe<Blog>;
  blogComments?: Maybe<PagtinatedComment>;
  getRepliesBlog?: Maybe<Array<BlogComment>>;
  me?: Maybe<User>;
  pagtinatedBlogs: PagtinatedBlogs;
  pagtinatedExercises: PagtinatedExercises;
  pagtinatedMember: PagtinatedMember;
  profile: User;
};

export type QueryBlogArgs = {
  id: Scalars["Int"];
};

export type QueryBlogCommentsArgs = {
  blogId: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryGetRepliesBlogArgs = {
  commentId: Scalars["Int"];
};

export type QueryPagtinatedBlogsArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
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

export enum ReactionsType {
  Angry = "angry",
  Care = "care",
  Haha = "haha",
  Like = "like",
  Love = "love",
  Sad = "sad",
  Wow = "wow",
}

export type RegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type ThemeSettingResponse = {
  __typename?: "ThemeSettingResponse";
  theme: Scalars["String"];
};

export enum ThemeType {
  Dark = "dark",
  Light = "light",
}

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
  blogs: Array<Blog>;
  confirmed: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  dob?: Maybe<Scalars["DateTime"]>;
  exercises: Array<Exercise>;
  exp: Scalars["Float"];
  id: Scalars["ID"];
  language: Scalars["String"];
  lastLogin?: Maybe<Scalars["DateTime"]>;
  nickname: Scalars["String"];
  role: Scalars["String"];
  theme: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: "UserMutationResponse";
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
  user?: Maybe<User>;
};

export type BlogInfoFragment = {
  __typename?: "Blog";
  id: string;
  title: string;
  text: string;
  createdAt: any;
  updatedAt: any;
};

export type BlogMutationResponseFragment = {
  __typename?: "BlogMutationResponse";
  code: number;
  success: boolean;
  message?: string | null;
  blog?: {
    __typename?: "Blog";
    id: string;
    title: string;
    text: string;
    createdAt: any;
    updatedAt: any;
  } | null;
  errors?: Array<{
    __typename?: "FieldError";
    field: string;
    message: string;
  }> | null;
};

export type CommentTypeFragment = {
  __typename?: "BlogComment";
  id: string;
  comment: string;
  parentId?: string | null;
  replyCount: number;
  reactionsCount: number;
  createdAt: any;
  updatedAt: any;
  user: { __typename?: "User"; id: string; nickname: string; avatar: string };
  reactions: Array<{
    __typename?: "BlogCommentReactions";
    userId: string;
    type: string;
  }>;
};

export type ReactionsCommentFragment = {
  __typename?: "BlogCommentReactions";
  userId: string;
  type: string;
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
  role: string;
  confirmed: boolean;
  avatar: string;
  exp: number;
  dob?: any | null;
  theme: string;
  language: string;
  lastLogin?: any | null;
  createdAt: any;
  updatedAt: any;
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
    role: string;
    confirmed: boolean;
    avatar: string;
    exp: number;
    dob?: any | null;
    theme: string;
    language: string;
    lastLogin?: any | null;
    createdAt: any;
    updatedAt: any;
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

export type CreateBlogMutationVariables = Exact<{
  data: CreateBlogInput;
}>;

export type CreateBlogMutation = {
  __typename?: "Mutation";
  createBlog: {
    __typename?: "BlogMutationResponse";
    code: number;
    success: boolean;
    message?: string | null;
    blog?: {
      __typename?: "Blog";
      id: string;
      title: string;
      text: string;
      createdAt: any;
      updatedAt: any;
    } | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type SetLanguageSettingsMutationVariables = Exact<{
  languageType: LanguageType;
}>;

export type SetLanguageSettingsMutation = {
  __typename?: "Mutation";
  setLanguageSetting: {
    __typename?: "LanguageSettingResponse";
    language: string;
  };
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
      role: string;
      confirmed: boolean;
      avatar: string;
      exp: number;
      dob?: any | null;
      theme: string;
      language: string;
      lastLogin?: any | null;
      createdAt: any;
      updatedAt: any;
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

export type SetThemeSettingsMutationVariables = Exact<{
  themeType: ThemeType;
}>;

export type SetThemeSettingsMutation = {
  __typename?: "Mutation";
  setThemeSetting: { __typename?: "ThemeSettingResponse"; theme: string };
};

export type BlogQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type BlogQuery = {
  __typename?: "Query";
  blog?: {
    __typename?: "Blog";
    id: string;
    title: string;
    text: string;
    commentsCount: number;
    likesCount: number;
    createdAt: any;
    updatedAt: any;
    user: { __typename?: "User"; id: string; nickname: string; avatar: string };
    tags: Array<{ __typename?: "BlogTag"; name: string }>;
  } | null;
};

export type GetRepliesBlogQueryVariables = Exact<{
  commentId: Scalars["Int"];
}>;

export type GetRepliesBlogQuery = {
  __typename?: "Query";
  getRepliesBlog?: Array<{
    __typename?: "BlogComment";
    id: string;
    comment: string;
    parentId?: string | null;
    replyCount: number;
    reactionsCount: number;
    createdAt: any;
    updatedAt: any;
    user: { __typename?: "User"; id: string; nickname: string; avatar: string };
    reactions: Array<{
      __typename?: "BlogCommentReactions";
      userId: string;
      type: string;
    }>;
  }> | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: string;
    nickname: string;
    role: string;
    confirmed: boolean;
    avatar: string;
    exp: number;
    dob?: any | null;
    theme: string;
    language: string;
    lastLogin?: any | null;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type BlogCommentsQueryVariables = Exact<{
  blogId: Scalars["Int"];
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type BlogCommentsQuery = {
  __typename?: "Query";
  blogComments?: {
    __typename?: "PagtinatedComment";
    totalCount: number;
    cursor: any;
    hashMore: boolean;
    comments?: Array<{
      __typename?: "BlogComment";
      id: string;
      comment: string;
      parentId?: string | null;
      replyCount: number;
      reactionsCount: number;
      createdAt: any;
      updatedAt: any;
      user: {
        __typename?: "User";
        id: string;
        nickname: string;
        avatar: string;
      };
      reactions: Array<{
        __typename?: "BlogCommentReactions";
        userId: string;
        type: string;
      }>;
    }> | null;
  } | null;
};

export type PagtinatedBlogsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type PagtinatedBlogsQuery = {
  __typename?: "Query";
  pagtinatedBlogs: {
    __typename?: "PagtinatedBlogs";
    totalCount: number;
    cursor: any;
    hashMore: boolean;
    blogs?: Array<{
      __typename?: "Blog";
      id: string;
      title: string;
      text: string;
      commentsCount: number;
      likesCount: number;
      createdAt: any;
      updatedAt: any;
      user: {
        __typename?: "User";
        id: string;
        nickname: string;
        avatar: string;
      };
      tags: Array<{ __typename?: "BlogTag"; name: string }>;
    }> | null;
  };
};

export const BlogInfoFragmentDoc = gql`
  fragment blogInfo on Blog {
    id
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
  ${FieldErrorFragmentDoc}
`;
export const CommentTypeFragmentDoc = gql`
  fragment commentType on BlogComment {
    user {
      id
      nickname
      avatar
    }
    id
    comment
    parentId
    replyCount
    reactionsCount
    reactions {
      userId
      type
    }
    createdAt
    updatedAt
  }
`;
export const ReactionsCommentFragmentDoc = gql`
  fragment reactionsComment on BlogCommentReactions {
    userId
    type
  }
`;
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
    theme
    language
    lastLogin
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
export const CreateBlogDocument = gql`
  mutation CreateBlog($data: CreateBlogInput!) {
    createBlog(data: $data) {
      ...blogMutationResponse
    }
  }
  ${BlogMutationResponseFragmentDoc}
`;
export type CreateBlogMutationFn = Apollo.MutationFunction<
  CreateBlogMutation,
  CreateBlogMutationVariables
>;

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
export function useCreateBlogMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBlogMutation,
    CreateBlogMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(
    CreateBlogDocument,
    options
  );
}
export type CreateBlogMutationHookResult = ReturnType<
  typeof useCreateBlogMutation
>;
export type CreateBlogMutationResult =
  Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<
  CreateBlogMutation,
  CreateBlogMutationVariables
>;
export const SetLanguageSettingsDocument = gql`
  mutation SetLanguageSettings($languageType: LanguageType!) {
    setLanguageSetting(languageType: $languageType) {
      language
    }
  }
`;
export type SetLanguageSettingsMutationFn = Apollo.MutationFunction<
  SetLanguageSettingsMutation,
  SetLanguageSettingsMutationVariables
>;

/**
 * __useSetLanguageSettingsMutation__
 *
 * To run a mutation, you first call `useSetLanguageSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLanguageSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLanguageSettingsMutation, { data, loading, error }] = useSetLanguageSettingsMutation({
 *   variables: {
 *      languageType: // value for 'languageType'
 *   },
 * });
 */
export function useSetLanguageSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetLanguageSettingsMutation,
    SetLanguageSettingsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetLanguageSettingsMutation,
    SetLanguageSettingsMutationVariables
  >(SetLanguageSettingsDocument, options);
}
export type SetLanguageSettingsMutationHookResult = ReturnType<
  typeof useSetLanguageSettingsMutation
>;
export type SetLanguageSettingsMutationResult =
  Apollo.MutationResult<SetLanguageSettingsMutation>;
export type SetLanguageSettingsMutationOptions = Apollo.BaseMutationOptions<
  SetLanguageSettingsMutation,
  SetLanguageSettingsMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
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
export const SetThemeSettingsDocument = gql`
  mutation SetThemeSettings($themeType: ThemeType!) {
    setThemeSetting(themeType: $themeType) {
      theme
    }
  }
`;
export type SetThemeSettingsMutationFn = Apollo.MutationFunction<
  SetThemeSettingsMutation,
  SetThemeSettingsMutationVariables
>;

/**
 * __useSetThemeSettingsMutation__
 *
 * To run a mutation, you first call `useSetThemeSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetThemeSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setThemeSettingsMutation, { data, loading, error }] = useSetThemeSettingsMutation({
 *   variables: {
 *      themeType: // value for 'themeType'
 *   },
 * });
 */
export function useSetThemeSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetThemeSettingsMutation,
    SetThemeSettingsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetThemeSettingsMutation,
    SetThemeSettingsMutationVariables
  >(SetThemeSettingsDocument, options);
}
export type SetThemeSettingsMutationHookResult = ReturnType<
  typeof useSetThemeSettingsMutation
>;
export type SetThemeSettingsMutationResult =
  Apollo.MutationResult<SetThemeSettingsMutation>;
export type SetThemeSettingsMutationOptions = Apollo.BaseMutationOptions<
  SetThemeSettingsMutation,
  SetThemeSettingsMutationVariables
>;
export const BlogDocument = gql`
  query Blog($id: Int!) {
    blog(id: $id) {
      id
      user {
        id
        nickname
        avatar
      }
      title
      text
      commentsCount
      likesCount
      tags {
        name
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useBlogQuery__
 *
 * To run a query within a React component, call `useBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBlogQuery(
  baseOptions: Apollo.QueryHookOptions<BlogQuery, BlogQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BlogQuery, BlogQueryVariables>(BlogDocument, options);
}
export function useBlogLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BlogQuery, BlogQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BlogQuery, BlogQueryVariables>(
    BlogDocument,
    options
  );
}
export type BlogQueryHookResult = ReturnType<typeof useBlogQuery>;
export type BlogLazyQueryHookResult = ReturnType<typeof useBlogLazyQuery>;
export type BlogQueryResult = Apollo.QueryResult<BlogQuery, BlogQueryVariables>;
export const GetRepliesBlogDocument = gql`
  query getRepliesBlog($commentId: Int!) {
    getRepliesBlog(commentId: $commentId) {
      user {
        id
        nickname
        avatar
      }
      id
      comment
      parentId
      replyCount
      reactionsCount
      reactions {
        userId
        type
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetRepliesBlogQuery__
 *
 * To run a query within a React component, call `useGetRepliesBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepliesBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepliesBlogQuery({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useGetRepliesBlogQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRepliesBlogQuery,
    GetRepliesBlogQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRepliesBlogQuery, GetRepliesBlogQueryVariables>(
    GetRepliesBlogDocument,
    options
  );
}
export function useGetRepliesBlogLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRepliesBlogQuery,
    GetRepliesBlogQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRepliesBlogQuery, GetRepliesBlogQueryVariables>(
    GetRepliesBlogDocument,
    options
  );
}
export type GetRepliesBlogQueryHookResult = ReturnType<
  typeof useGetRepliesBlogQuery
>;
export type GetRepliesBlogLazyQueryHookResult = ReturnType<
  typeof useGetRepliesBlogLazyQuery
>;
export type GetRepliesBlogQueryResult = Apollo.QueryResult<
  GetRepliesBlogQuery,
  GetRepliesBlogQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...userInfo
    }
  }
  ${UserInfoFragmentDoc}
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
export const BlogCommentsDocument = gql`
  query BlogComments($blogId: Int!, $limit: Int!, $cursor: String) {
    blogComments(blogId: $blogId, limit: $limit, cursor: $cursor) {
      totalCount
      cursor
      hashMore
      comments {
        user {
          id
          nickname
          avatar
        }
        id
        comment
        parentId
        replyCount
        reactionsCount
        reactions {
          userId
          type
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useBlogCommentsQuery__
 *
 * To run a query within a React component, call `useBlogCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogCommentsQuery({
 *   variables: {
 *      blogId: // value for 'blogId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useBlogCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    BlogCommentsQuery,
    BlogCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BlogCommentsQuery, BlogCommentsQueryVariables>(
    BlogCommentsDocument,
    options
  );
}
export function useBlogCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BlogCommentsQuery,
    BlogCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BlogCommentsQuery, BlogCommentsQueryVariables>(
    BlogCommentsDocument,
    options
  );
}
export type BlogCommentsQueryHookResult = ReturnType<
  typeof useBlogCommentsQuery
>;
export type BlogCommentsLazyQueryHookResult = ReturnType<
  typeof useBlogCommentsLazyQuery
>;
export type BlogCommentsQueryResult = Apollo.QueryResult<
  BlogCommentsQuery,
  BlogCommentsQueryVariables
>;
export const PagtinatedBlogsDocument = gql`
  query PagtinatedBlogs($limit: Int!, $cursor: String) {
    pagtinatedBlogs(limit: $limit, cursor: $cursor) {
      totalCount
      cursor
      hashMore
      blogs {
        user {
          id
          nickname
          avatar
        }
        id
        title
        text
        commentsCount
        likesCount
        tags {
          name
        }
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
export function usePagtinatedBlogsQuery(
  baseOptions: Apollo.QueryHookOptions<
    PagtinatedBlogsQuery,
    PagtinatedBlogsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PagtinatedBlogsQuery, PagtinatedBlogsQueryVariables>(
    PagtinatedBlogsDocument,
    options
  );
}
export function usePagtinatedBlogsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PagtinatedBlogsQuery,
    PagtinatedBlogsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PagtinatedBlogsQuery,
    PagtinatedBlogsQueryVariables
  >(PagtinatedBlogsDocument, options);
}
export type PagtinatedBlogsQueryHookResult = ReturnType<
  typeof usePagtinatedBlogsQuery
>;
export type PagtinatedBlogsLazyQueryHookResult = ReturnType<
  typeof usePagtinatedBlogsLazyQuery
>;
export type PagtinatedBlogsQueryResult = Apollo.QueryResult<
  PagtinatedBlogsQuery,
  PagtinatedBlogsQueryVariables
>;
