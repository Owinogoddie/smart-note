import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ClerkLoading, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import SignedIn from '@/components/signed-in'
import HeroImages from '@/components/hero-images'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar-main'

export default function Home() {
  return (
   <>
   <Navbar/>
   <div className=" mx-auto flex flex-col items-center gap-4 justify-center min-h-full max-w-3xl">

<div className="flex items-center gap-1">

      <Image
        src="/logo-black.png"
        alt="logo"
        width={100}
        height={100}
        className="dark:hidden"
      />
      <Image
        src="/logo-black.png"
        alt="logo"
        width={100}
        height={100}
        className="hidden dark:block"
      />
      <p className="text-foreground font-bold text-lg md: text-4xl lg:text-6xl">AI-Scribe</p>
    </div>

      <p className="text-center">An intelligent note-taking-app with AI integration Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, est.
      </p>


      <SignedIn/>
      <HeroImages/>

    </div>
    <Footer/>
   </>
  )
}
