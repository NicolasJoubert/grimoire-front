import React from 'react';
import Image from 'next/image';

export default function Avatar(props) {
  return (
    <>
      <div
        className='flex flex-col justify-center items-center cursor-pointer'
        onClick={props.onClick}
      >
        <Image
          className='w-1/2 h-[70%] object-contain hover:border-2 hover:border-black hover:cursor-pointer  rounded-full'
          src={props.src}
          alt={props.alt}
          width={100}
          height={100}
        />

        <p>{props.name}</p>
      </div>
    </>
  );
}
