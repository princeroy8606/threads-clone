import { OrganizationSwitcher } from "@clerk/nextjs"
import { SignOutButton, SignedIn } from '@clerk/nextjs'
// import {dark} from '@clerk/theme'

import Image from "next/image"
import Link from "next/link"

function TopBar() {
    return <nav className="topbar">
        <Link href='/' className="flex items-center gap-4">
            <Image src='/assets/logo.svg' alt="logo" width={28} height={28} />
            <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
        </Link>
        <div className="flex items-center gap-1">
            <div className="block md:hidden">
                <SignedIn>
                    <SignOutButton >
                        <div className="flex cursor-pointer">
                            <Image src='/assets/logout.svg' width={24} height={24} alt="logo" />
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
            <OrganizationSwitcher
                appearance={{
                    // add theme here !!
                    elements: {
                        organizationSwitcherTrigger: 'px-4 py-2 text-light-1'
                    }
                }}
            />
        </div>
    </nav>
}

export default TopBar