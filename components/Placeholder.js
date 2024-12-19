import Image from 'next/image';

export default function Placeholder() {
  return (
    <div className='bg-whitePure border-solid border border-black p-3 rounded-lg'>
      <div className='mt-8 flex flex-col justify-center items-center h-[80vh]'>
      <img src='mage.gif' alt='spellbook' width={550} height={550} />
        <p className='text-darkPurple text-3xl italic '>
          Il est temps pour toi de créer une note
        </p>
      </div>
    </div>
  );
}
