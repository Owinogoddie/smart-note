import React from 'react'
import Image from 'next/image'

const HeroImages = () => {
  return (
    <div className="flex gap-4">
        {/* light */}
        <Image
        src="/light-Blogging-amico.png"
        alt="hero-image"
        width={400}
        height={400}
        className="dark:hidden"
        />
        <Image
        src="/light-Blogging-bro.png"
        alt="hero-image"
        width={400}
        height={400}
        className="hidden md:block dark:hidden"
        />

        {/* dark */}
        <Image
        src="/dark-Blogging-amico.png"
        alt="hero-image"
        width={400}
        height={400}
        className="hidden dark:block"
        />
        <Image
        src="/dark-Blogging-bro.png"
        alt="hero-image"
        width={400}
        height={400}
        className="hidden  dark:block"
        />
    </div>
  )
}

export default HeroImages