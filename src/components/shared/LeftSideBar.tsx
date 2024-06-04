"use client"
import Link from 'next/link'
import Image from 'next/image'
import {sidebarLinks} from '../../constants/index'
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton, SignedIn } from '@clerk/nextjs'


function LeftSideBar() {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-col gap-6 px-6 flex-1">
                {
                    sidebarLinks.map((link) => {
                        const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname === link.route)
                        return (<Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive ? 'bg-primary-500' : ''}`}>
                            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                        </Link>)
                    })
                }
            </div>
            <div className='mt-10 px-6'>
                <SignedIn>
                <SignOutButton signOutOptions={{redirectUrl:'/sign-in'}}>
                    <div className="flex cursor-pointer gap-4 p-4">
                        <Image src='/assets/logout.svg' width={24} height={24} alt="logo" />
                        <p className='text-light-2 max-lg:hidden '>Log out</p>
                    </div>
                </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}

export default LeftSideBar