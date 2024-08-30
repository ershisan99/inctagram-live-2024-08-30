import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button/button'
import * as SelectPrimitive from '@radix-ui/react-select'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'

export default function Login() {
  return (
    <div className={'gap-4 p-8'}>
      <Select>
        <SelectPrimitive.Trigger asChild>
          <button>
            <SelectValue placeholder='Theme' />
          </button>
        </SelectPrimitive.Trigger>
        <SelectContent>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
