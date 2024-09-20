import TimeAgo from 'react-timeago'

type PostProps = {
  images: Array<{ url: string }>
  description: string
  userName: string
  createdAt: string
}

export function Post(post: PostProps) {
  return (
    <div>
      <img
        className={'object-cover size-60'}
        src={post.images[0].url}
        alt={post.description}
      />
      <p>{post.userName}</p>
      <TimeAgo date={new Date(post.createdAt)} />
    </div>
  )
}
