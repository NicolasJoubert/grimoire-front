import Image from 'next/image';

export default function Placeholder() {
  return (
    <div className='bg-whitePure p-3 rounded-lg shadow-xl shadow-lightPurple mr-4 ml-4'>
      <div className='mt-8 flex flex-col justify-center items-center h-[78vh]'>
        <img src='gandalf.png' alt='spellbook' width={300} height={300} />
        <p className='mt-8 text-darkPurple text-lg italic '>
          Il est temps pour toi de créer une note
        </p>
      </div>
    </div>
  );
}
