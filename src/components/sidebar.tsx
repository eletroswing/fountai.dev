import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

export function AppSidebar({ children }: { children: React.ReactNode }) {
    const [sidebar, setSidebar] = useState<{
        open: boolean,
        show: boolean,
    }>({
        open: true,
        show: false,
    })

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth

            if (windowWidth < 768) {
                setSidebar((prev) => ({ ...prev, open: true, show: true }))
                return 
            } 

            setSidebar((prev) => ({ ...prev, open: true, show: false }))
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])


    return (
        <div className="w-full h-full absolute z-[5]">
            <div className={`w-full h-full flex transition-all duration-300 ease-in-out ${sidebar.open ? "translate-x-0" : "-translate-x-60"}`}>
                <div className="w-60 h-full dark:bg-white/1 bg-black/5 backdrop-blur-lg">
                    {children}
                </div>
                <div className="m-4" onClick={() => setSidebar((prev) => ({ ...prev, open: !prev.open }))}>
                    {
                        sidebar.show && <button className="dark:hover:bg-white/10 hover:bg-black/10 p-2 rounded-md">
                        <Menu />
                    </button>
                    }
                </div>
            </div>
        </div>
    )
}