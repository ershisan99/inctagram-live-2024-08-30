export interface UserProfile {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: string
  aboutMe: string
  avatars: Avatar[]
  createdAt: string
}

export interface Avatar {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export interface MeResponse {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}

export interface LoginArgs {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface GetAllPostsArgs {
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  endCursorPostId?: number
}

export interface GetAllPostsResponse {
  totalCount: number
  pageSize: number
  items: Post[]
  totalUsers: number
}

export interface Post {
  id: number
  userName: string
  description: string
  location?: string | null
  images: Image[]
  createdAt: string
  updatedAt: string
  avatarOwner?: string
  ownerId: number
  owner: Owner
  likesCount: number
  isLiked: boolean
}

export interface Owner {
  firstName: string
  lastName: string
}

export interface Image {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export interface UserPosts {
  totalCount: number
  pageSize: number
  items: Post[]
  totalUsers: number
}

export interface UploadFileResponse {
  images: Image[]
}
