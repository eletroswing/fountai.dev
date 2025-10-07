import './../../App.css'

import { useNavigate } from "react-router";
import { useCallback } from 'react';
import { MorphingText } from "@/components/magicui/morphing-text";

export default function Page() {
    const navigate = useNavigate();

    const handleShow = useCallback(() => {
        navigate("/home");
    }, [])

    return (
        <div className='w-full h-[100dvh] flex justify-center items-center relative'>
            <MorphingText texts={["", "Are", "You", "Ready?"]} callback={handleShow} />
        </div>
    )
}