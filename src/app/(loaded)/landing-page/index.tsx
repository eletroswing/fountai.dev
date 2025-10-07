import './../../../App.css'

import { useRef } from 'react';

import { AuroraText } from "@/components/magicui/aurora-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Arrow9 from '@/components/icons/arrow9';
import { headings } from '@/utils/constants'

export default function Page() {
  const randomPhrase = useRef(headings[Math.floor(Math.random() * headings.length)])
  return (
    <div className="w-full h-full flex flex-col mt-20 md:mt-0 justify-start md:justify-center items-center">
      <div className='w-full px-10 md:px-0 md:w-[40%] flex flex-col z-10 items-center gap-2'>
        <span className="text-xl font-semibold tracking-tighter w-fit text-start ml-1 md:border rounded-full z-20 p-2 px-4">Hello, I'm Fountai !</span>
        <div className='px-10 py-2 rounded-2xl'>
          <h1 className="text-6xl font-bold tracking-tighter lg:text-7xl w-full text-center">
            <SparklesText className='text-5xl md:text-6xl font-bold tracking-tighter lg:text-7xl whitespace-nowrap' sparklesCount={3}> {randomPhrase.current.title.text} <AuroraText>{randomPhrase.current.title.highlight}</AuroraText></SparklesText>
          </h1>
          <h1 className="text-6xl font-bold tracking-tighter lg:text-7xl w-full text-center">
            <SparklesText className='text-5xl md:text-6xl font-bold tracking-tighter lg:text-7xl whitespace-nowrap' sparklesCount={3}> {randomPhrase.current.subtitle.text} <AuroraText>{randomPhrase.current.subtitle.highlight}</AuroraText></SparklesText>
          </h1>
        </div>
      </div>
      <div className='absolute top-0 right-0 h-[100dvh] md:flex justify-center items-center hidden'>
        <div className='relative w-full h-full'>
          <span className='absolute right-60 top-50 text-3xl whitespace-nowrap architects-daughter-regular -rotate-15'> that's me!</span>
          <Arrow9 className='absolute right-60 scale-50 top-50 rotate-45' />
        </div>
      </div>
      <div className='w-full absolute right-0 bottom-0 flex justify-center md:justify-end'>
        <img src="/me.png" alt="fountai" className="w-[400px]" />
      </div>
    </div>
  )
}