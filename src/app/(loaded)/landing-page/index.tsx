import './../../../App.css'

import { useRef } from 'react';

import { AuroraText } from "@/components/magicui/aurora-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Arrow9 from '@/components/icons/arrow9';
import { headings } from '@/utils/constants'


export default function Page() {
  const randomPhrase = useRef(headings[Math.floor(Math.random() * headings.length)])
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className='w-[40%] flex flex-col'>
        <span className="text-xl font-semibold tracking-tighter w-fit text-start ml-1 border  rounded-full p-2 px-4">Hello, I'm Fountai !</span>
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl w-full text-start">
          <SparklesText className='text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl' sparklesCount={3}> {randomPhrase.current.title.text} <AuroraText>{randomPhrase.current.title.highlight}</AuroraText></SparklesText>
        </h1>
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl w-full text-end">
          <SparklesText className='text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl' sparklesCount={3}> {randomPhrase.current.subtitle.text} <AuroraText>{randomPhrase.current.subtitle.highlight}</AuroraText></SparklesText>
        </h1>
      </div>
      <div className='absolute top-0 right-0 h-screen flex justify-center items-center'>
        <div className='relative w-full h-full'>
          <span className='absolute right-60 top-50 text-3xl whitespace-nowrap architects-daughter-regular -rotate-15'> that's me!</span>
          <Arrow9 className='absolute right-60 scale-50 top-50 rotate-45' />
        </div>
      </div>

      <img src="/me.png" alt="fountai" className="w-1/4 absolute right-0 bottom-0" />
    </div>
  )
}