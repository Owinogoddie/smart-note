import React from 'react'
import Logo from './logo'
import { Button } from './ui/button'

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between p-4 md:p-6 sticky bottom-0">
        <Logo/>
        <div className="flex gap-4">
            <Button variant="ghost" className='text-muted-foreground'>Terms and conditions</Button>
            <Button variant="ghost" className='text-muted-foreground'>© 2023 AI-Scribe</Button>
        </div>

    </div>
  )
}

export default Footer