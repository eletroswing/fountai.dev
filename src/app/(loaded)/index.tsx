import './../../App.css'
import { Outlet } from 'react-router'

import { Pointer } from "@/components/magicui/pointer";
import { DockComponent } from '@/components/dock'
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Particles } from "@/components/magicui/particles";
import { useMemo } from 'react';
import { Meteors } from '@/components/magicui/meteors';

const slugs = [
    "typescript",
    "javascript",
    "dart",
    "react",
    "flutter",
    "android",
    "html5",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "androidstudio",
    "figma",
];

export default function Page() {
    const lightModeIcons = useMemo(() => slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/ffffff`,
    ), [])

    const darkModeIcons = useMemo(() => slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/000000`,
    ), [])

    return (
        <div className='w-full h-screen overflow-hidden relative'>
            {/* <Pointer /> */}

            <div className='relative w-full transition-all duration-1000 ease-in-out'>
                <div className='fixed top-0 left-0 w-full flex justify-center items-end pb-10'>
                    <ScrollProgress />
                </div>
                <div className='fixed bottom-0 left-0 w-full flex justify-center items-end pb-10 z-10'>
                    <DockComponent />
                </div>
                <div className='w-full h-screen relative flex justify-center items-center'>
                    <div className='w-full h-screen absolute top-0 left-0'>
                        <Particles className='absolute top-0 left-0' />
                        <Particles className='absolute top-0 left-0 ' color='#000000' />
                        <Meteors number={10} images={darkModeIcons} className='block dark:hidden' />
                        <Meteors number={10} images={lightModeIcons} className='hidden dark:block' />
                    </div>
                    <div className='h-full w-full'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}