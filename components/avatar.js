import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import Image from "next/image";



export default function Avatar ({ setAvatarPic }) {
  


    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("isModalOpen", isModalOpen);
    
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="ghost" onClick={() => setIsModalOpen(!isModalOpen)}>
      <div className='flex text-white rounded-md bg-indigo-800 '>
        Choose your Avatar
      </div>
      </Button>
      <Modal title="Avatars" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-center items-center'>
          <Image
          width={110}
          height={130}
          src="/images/HatSorcerer.png"
          onClick={() => setAvatarPic("/images/HatSorcerer.png")}
          alt="Chapeau de Sorcier"
          className="w-1/2 h-[70%] object-contain hover:border-2 hover:border-black hover:cursor-pointer"
          // style={{ width: '50%', height: '70%', objectFit: 'contain' }} 
          />
          <p>Hatty</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <Image
          width={110}
          height={130}
          src="/images/balaiDeSorcerer.png"
          onClick={() => setAvatarPic("/images/balaiDeSorcerer.png")}
          alt="Balai De Sorcière"
          className="w-1/2 h-[70%] object-contain hover:border-2 hover:border-black hover:cursor-pointer"
          // style={{ width: '50%', height: '70%', objectFit: 'contain'  }} 
          />
          <p>Broomy</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <Image
          width={110}
          height={130}
          src="/images/grimoire.png"
          onClick={() => setAvatarPic("/images/grimoire.png")}
          alt="Grimoire"
          className="w-1/2 h-[70%] object-contain hover:border-2 hover:border-black hover:cursor-pointer"
          // style={{ width: '50%', height: '70%', objectFit: 'contain'  }} 
          />
          <p>Booky</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <Image
          width={110}
          height={130}
          src="/images/dragon.png"
          onClick={() => setAvatarPic("/images/dragon.png")}
          alt="Black Dragon"
          className="w-1/2 h-[70%] object-contain hover:border-2 hover:border-black hover:cursor-pointer"
          // style={{ width: '50%', height: '70%', objectFit: 'contain'  }} 
          />
          <p>Dragony</p>
        </div>
      
      </div>
      </Modal>
    </>
  );

}