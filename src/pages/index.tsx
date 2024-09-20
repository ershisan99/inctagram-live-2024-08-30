import Link from 'next/link'
import { useGetAllPublicPostsQuery } from '@/services/instagram.api'
import { useState } from 'react'
import TimeAgo from 'react-timeago'
import { Post } from '@/components/post'

export default function Home() {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const { data, isLoading, isError } = useGetAllPublicPostsQuery({
    pageSize: 4,
    sortBy: 'userName',
    sortDirection: sortDirection,
  })

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Error!</h1>
  }

  if (!data) {
    return null
  }

  return (
    <div className={'p-10 flex flex-col gap-4 bg-'}>
      <header className={'flex gap-3'}>
        <Link href={'/auth'}>auth</Link>
        <Link href={'/auth/login'}>login</Link>
        <Link href={'/auth/sign-up'}>sign-up</Link>
      </header>
      <section>Registered Users: {data.totalUsers}</section>
      <select
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value as any)}
      >
        <option value={'asc'}>asc</option>
        <option value={'desc'}>desc</option>
      </select>
      <section>
        <ul className={'flex gap-4 flex-wrap'}>
          {data.items.map((post) => {
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
      </section>
    </div>
  )
}
