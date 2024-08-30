import { Button } from './button'
import { Meta, StoryObj } from '@storybook/react'
import Link from 'next/link'
import { useState } from 'react'

const meta = {
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Hello123123',
    title: 'Click to alert hello',
  },
}

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
}

export const AsLink: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
    asChild: true,
    children: <a href={'/'}>GO HOME</a>,
  },
  render: (args) => {
    const [count, setCount] = useState(0)

    return <Button onClick={() => setCount(count + 1)}>{count}</Button>
  },
}
