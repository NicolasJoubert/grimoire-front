import { Button, Modal } from 'antd';
import React, { useState } from 'react';



export default function Avatar () {


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
          <img
          src="/images/HatSorcerer.png"
          alt="Chapeau de Sorcier"
          style={{ width: '50%', height: '70%', objectFit: 'contain' }} 
          />
          <p>Hatty</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <img
          src="/images/balaiDeSorcerer.png"
          alt="Balai De Sorcière"
          style={{ width: '50%', height: '70%', objectFit: 'contain'  }} 
          />
          <p>Broomy</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <img
          src="/images/grimoire.png"
          alt="Grimoire"
          style={{ width: '50%', height: '70%', objectFit: 'contain'  }} 
          />
          <p>Booky</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <img
          src="/images/dragon.png"
          alt="Black Dragon"
          style={{ width: '50%', height: '70%', objectFit: 'contain'  }} 
          />
          <p>Dragonny</p>
        </div>
      
      </div>
      </Modal>
    </>
  );

}