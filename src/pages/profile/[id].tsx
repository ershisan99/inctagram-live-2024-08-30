import { useRouter } from 'next/router'
import {
  useCreatePostMutation,
  useGetUserPostsQuery,
  useGetUserProfileQuery,
  useUploadFileForPostMutation,
} from '@/services/instagram.api'
import { Post } from '@/components/post'
import { useState } from 'react'

export default function UserProfile() {
  const [photoToUpload, setPhotoToUpload] = useState<null | File>(null)
  const [uploadPhoto, { data }] = useUploadFileForPostMutation()
  const [createPost] = useCreatePostMutation()

  console.log(photoToUpload)
  const route = useRouter()
  const userId = route.query.id

  const { data: userProfile, isLoading: isUserProfileLoading } =
    useGetUserProfileQuery(
      {
        id: parseInt(userId as string, 10),
      },
      {
        skip: userId === undefined,
      }
    )
  const { data: userPosts, isLoading: isUserPostsLoading } =
    useGetUserPostsQuery(
      {
        id: parseInt(userId as string, 10),
      },
      {
        skip: userId === undefined,
      }
    )

  if (isUserPostsLoading || isUserProfileLoading) {
    return <div>Loading</div>
  }

  const avatarUrl = userProfile?.avatars?.[0]?.url

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!photoToUpload) {
            return
          }
          uploadPhoto({ file: photoToUpload })
        }}
      >
        <input
          type={'file'}
          onChange={(e) => {
            setPhotoToUpload(e.currentTarget.files?.[0] ?? null)
          }}
        />
        <button>Upload Photo</button>
      </form>
      <hr />
      <hr />
      {data && (
        <div>
          <div>Create post</div>
          <div>
            {data.images.map((img) => (
              <img src={img.url} />
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)

              createPost({
                description: formData.get('description') as string,
                uploadIds: data.images.map((image) => image.uploadId),
              })
            }}
          >
            <input
              type={'text'}
              name='description'
            />
            <button>Create post</button>
          </form>
        </div>
      )}
      <div>{userProfile?.userName}</div>
      <div>{userProfile?.aboutMe}</div>
      {avatarUrl && <img src={avatarUrl} />}
      <ul className={'flex gap-4 flex-wrap'}>
        {userPosts?.items.map((post) => {
          return (
            <li
              className={'w-1/5'}
              key={post.id}
            >
              <Post {...post} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
