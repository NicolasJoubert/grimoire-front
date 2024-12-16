import React, { useState, useEffect } from 'react';
import NoteLink from './NoteLink.js';
import { TbLayoutSidebarRightCollapseFilled } from 'react-icons/tb';
import { useSelector } from 'react-redux';
//ICONES FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function SidebarRight({ toggleSidebarRight }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const currentNote = useSelector((state) => state.currentNote.value);

  // Initialisation de la date sélectionnée
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Notes du jour
  const [notes, setNotes] = useState([]);
  // Mises à jour
  const [updates, setUpdates] = useState([]);
  const token = useSelector((state) => state.user.value.token);

  //Notes du jour
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(backendUrl + `/notes/by/date`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token, date: selectedDate }),
        });

        const data = await response.json();

        if (data.result && data.notes.length > 0) {
          setNotes(data.notes);
        } else {
          setNotes([]);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des notes', err.message);
      }
    };
    fetchNotes();
  }, [selectedDate, currentNote]);

  //Mise a jour
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(backendUrl + `/notes/by/update`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token, date: selectedDate }),
        });

        const data = await response.json();

        if (data.result && data.notes.length > 0) {
          setUpdates(data.notes);
        } else {
          setUpdates([]);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des notes', err.message);
      }
    };
    fetchNotes();
  }, [selectedDate, currentNote]);

  // Nombre de jours dans le mois actuel
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  // Noms des jours de la semaine
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Fonction pour naviguer vers le jour précédent
  const handlePrevDay = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate); // Crée une copie de `prevDate`
      newDate.setDate(newDate.getDate() - 1); // Modifie uniquement la copie
      return newDate; // Retourne la nouvelle date
    });
  };

  // Fonction pour naviguer vers le jour suivant
  const handleNextDay = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate); // Crée une copie de `prevDate`
      newDate.setDate(newDate.getDate() + 1); // Modifie uniquement la copie
      return newDate; // Retourne la nouvelle date
    });
  };

  // Fonction pour sélectionner une date à partir du calendrier
  const handleSelectDate = (day) => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    );
  };

  // Formatage de la date en français
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  //Liste des notes du jour
  const listNote = notes.map((note, index) => (
    <NoteLink key={index} title={note.title} noteId={note.id} />
  ));

  //Liste des notes mise a jour au jour J
  const listUpdatedNote = updates.map((update, index) => (
      <NoteLink key={index} title={update.title} noteId={update.id}/>
    ))
  
  return (
    <div className='h-full w-64 bg-backgroundColor flex flex-col'>
      <div className='flex justify-start'>
        <button className='pt-4 text-darkPurple hover:text-lightPurple transition duration-300 ease-in-out'>
          <TbLayoutSidebarRightCollapseFilled
            size={24}
            onClick={toggleSidebarRight}
          />
        </button>
      </div>

      {/* Header avec navigation entre les jours */}
      <div className='flex items-center justify-center gap-4 mb-4 mt-12'>
        {/* Bouton pour le jour précédent */}
        <button
          onClick={handlePrevDay}
          className='text-black hover:text-darkPurple'
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className='p4 text-darkPurple text-sm hover:text-lightPurple transition duration-300 ease-in-out'
          />
        </button>

        {/* Affichage de la date sélectionnée */}
        <h2 className='text-base font-bold text-darkPurple mb-0'>
          {formatDate(selectedDate)}
        </h2>

        {/* Bouton pour le jour suivant */}
        <button
          onClick={handleNextDay}
          className='text-black hover:text-darkPurple'
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className='p4 text-darkPurple text-sm hover:text-lightPurple transition duration-300 ease-in-out'
          />
        </button>
      </div>

      {/* Section des Notes du jour */}
      <div className='border-b-2 border-solid border-gray pl-4 '>
        <h3 className=' font-bold text-darkPurple'>
          Note{notes.length > 0 && 's'} du jour
        </h3>
        <ul className='list-disc list-inside text-black overflow-y-auto max-h-[100px] mr-4'>
          {/* Affichage de chaque note */}
          {notes.length > 0 ? listNote : 'Aucune note aujourdhui'}
        </ul>
      </div>

      {/* Section des Mises à jour */}

      {updates.length > 0 && (
        <div className='border-b-2 border-solid border-gray pl-4'>
          <h3 className=' font-bold text-darkPurple'>Mise à jour</h3>
          <ul className='list-disc list-inside text-black overflow-y-auto max-h-[125px] mr-4'>
            {/* Affichage de chaque mise à jour */}
            {listUpdatedNote}
          </ul>
        </div>
      )}

      {/* Calendrier */}
      <div className="top-[70%] p-2 absolute w-[19%]">
        {/* Jours de la semaine */}
        <div className='grid grid-cols-7 gap-2 text-center text-sm font-medium'>
          {daysOfWeek.map((day, index) => (
            <div key={index} className='text-black bg-lightPurple rounded'>
              {day}
            </div>
          ))}
        </div>

        {/* Jours du mois */}
        <div className='grid grid-cols-7 gap-2 mt-2'>
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1; // Jour actuel
            const isSelected =
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === selectedDate.getMonth(); // Vérifie si ce jour est sélectionné

            return (
              <button
                key={index}
                onClick={() => handleSelectDate(day)} // Mise à jour de la date sélectionnée
                className={`rounded ${
                  isSelected
                    ? 'bg-darkPurple text-white' // Style du jour sélectionné
                    : 'bg-whitePure text-black hover:bg-lightPurple' // Style des autres jours
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
