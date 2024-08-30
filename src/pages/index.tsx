import Link from 'next/link'

export default function Home() {
  return (
    <div className={'p-10 flex flex-col gap-4'}>
      <Link href={'/auth'}>auth</Link>
      <Link href={'/auth/login'}>login</Link>
      <Link href={'/auth/sign-up'}>sign-up</Link>
    </div>
  )
}
