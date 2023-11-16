import React from 'react'
import Image from 'next/image'
import {Poppins} from "next/font/google"
const Logo = () => {


// const inter = Poppins({ subsets: ['latin'] })
  return (
    <div className="flex items-center gap-1">
      <Image
        src="/logo-black.png"
        alt="logo"
        width={50}
        height={50}
        className="dark:hidden"
      />
      <Image
        src="/logo-white.png"
        alt="logo"
        width={50}
        height={50}
        className="hidden dark:block"
      />
      <p className="text-foreground font-bold text-lg hidden md:block">AI-Scribe</p>
    </div>
  )
}

export default Logo