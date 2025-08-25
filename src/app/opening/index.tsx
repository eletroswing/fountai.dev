import './../../App.css'

import { useNavigate } from "react-router";
import { useCallback } from 'react';
import { Pointer } from "@/components/magicui/pointer";
import { MorphingText } from "@/components/magicui/morphing-text";

export default function Page() {
    const navigate = useNavigate();

    const handleShow = useCallback(() => {
        navigate("/home");
    }, [])

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Pointer />
            <MorphingText texts={["", "Are", "You", "Ready?"]} callback={handleShow} />
        </div >
    )
}