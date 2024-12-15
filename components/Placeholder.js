import Image from 'next/image';

export default function Placeholder() {
  return (
    <div className='border-solid border border-black p-3 rounded-lg'>
      <div className='mt-8 flex flex-col justify-center items-center h-[80vh]'>
        <img src='gandalf.png' alt='spellbook' width={300} height={300} />
        <p className='mt-8 text-darkPurple text-lg italic '>
          Il est temps pour toi de créer une note
        </p>
      </div>
    </div>
  );
}
