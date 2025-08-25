import './index.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion"


import LandingPage from '@/app/(loaded)/landing-page'
import LoadedLayout from '@/app/(loaded)'
import OpeningPage from '@/app/opening'
import BlogPage from '@/app/(loaded)/blog'
import { useEffect, useState } from 'react';
import { SparklesText } from './components/magicui/sparkles-text';
import { AuroraText } from './components/magicui/aurora-text';

const topVariants = {
    initial: { y: "-100%", x: "100%" },
    animate: { y: 0, x: 0 },
    exit: { y: "-100%", x: "100%" }
}

const bottomVariants = {
    initial: { y: "100%", x: "-100%" },
    animate: { y: 0, x: 0 },
    exit: { y: "100%", x: "-100%" }
}

const COURTINE_DELAY = 0.4

function TransitionOverlay({ onMidpoint }: { onMidpoint?: () => void }) {

    const TextComponent = () => (<>
        <SparklesText className='text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl' sparklesCount={3}>
            Fountai
            <AuroraText>.dev</AuroraText>
        </SparklesText>
    </>)

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[100000] pointer-events-none"
            onAnimationComplete={(definition) => {
                if (definition === "animate" && onMidpoint) {
                    onMidpoint()
                }   
            }}
        >
            <div className="absolute inset-0 flex flex-col">
                <motion.div
                    variants={topVariants}
                    transition={{ duration: COURTINE_DELAY, ease: "easeInOut" }}
                    className="w-full h-1/2 bg-purple-800 overflow-hidden relative flex justify-center items-end p-0 m-0 "
                >
                    <div
                        className="text-white text-6xl font-bold relative w-full flex justify-center p-0 m-0"
                    >
                        <h1 className="translate-y-[50%]">
                            <TextComponent />
                        </h1>
                    </div>
                </motion.div>

                <motion.div
                    variants={bottomVariants}
                    transition={{ duration: COURTINE_DELAY, ease: "easeInOut" }}
                    className="w-full h-1/2 bg-purple-800 overflow-hidden relative flex justify-center items-start p-0 m-0"
                >
                    <div
                        className="text-white text-6xl font-bold relative w-full flex justify-center p-0 m-0"
                    >
                        <h1 className="translate-y-[-50%]">
                            <TextComponent />
                        </h1>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            className="w-full h-full z-[100000]"
        >
            {children}
        </motion.div>
    )
}

export default function AppRoutes() {
    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location)
    const [transitioning, setTransitioning] = useState(false)

    useEffect(() => {
        if (location !== displayLocation) {
            setTransitioning(true)
        }
    }, [location, displayLocation])

    return (
        <>
            <AnimatePresence mode="wait">
                {transitioning && (
                    <TransitionOverlay
                        key={"overlay-" + location.pathname}
                        onMidpoint={() => {
                            setDisplayLocation(location)
                            setTimeout(() => setTransitioning(false), 500)
                        }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <Routes location={displayLocation} key={displayLocation.pathname}>
                    <Route index element={<OpeningPage />} />
                    <Route path="home" element={<PageWrapper><LoadedLayout /></PageWrapper>}>
                        <Route index element={<PageWrapper><LandingPage /></PageWrapper>} />
                        <Route path="blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </>
    )
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>,
)
