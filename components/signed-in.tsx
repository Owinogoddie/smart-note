'use client'
import React,{useEffect, useState} from 'react'


import { SignInButton , useAuth } from "@clerk/nextjs";
import { ClerkLoading,ClerkLoaded } from '@clerk/nextjs'

import Spinner from './spinner';
import { Button } from './ui/button';
import Link from 'next/link'
import { ArrowRight } from 'lucide-react';

const SignedIn = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

return(


<>
<ClerkLoading>
        <Spinner/>
</ClerkLoading>

<ClerkLoaded>

{
  isSignedIn ? (
    <Button asChild>
      <Link href="/notes">
        Open workspace
      </Link>
    </Button>
  )
  :
  (
    <SignInButton mode='modal'>
      <Button>
        Get started
        <ArrowRight className='h-4 w-4'/>
      </Button>
    </SignInButton>
  )
}
</ClerkLoaded>


      </>
      )

}

export default SignedIn