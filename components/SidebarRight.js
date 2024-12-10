
import React, { useState } from "react";
export default function SidebarRight() {

      // Initialisation de la date sélectionnée (6 Septembre 2025 par défaut)
      const [selectedDate, setSelectedDate] = useState(new Date());
    
      // Notes du jour (changeraient en fonction de votre logique)
      const [notes, setNotes] = useState([
        "Methode map()",
        "String charAt()",
        "Installation React",
      ]);
    
      // Mises à jour (changeraient en fonction de votre logique)
      const [updates, setUpdates] = useState(["HTML : H1", "CSS : Flexbox"]);
    
      // Nombre de jours dans le mois actuel
      const daysInMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ).getDate();
    
      // Noms des jours de la semaine
      const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
    
      // Fonction pour naviguer vers le jour précédent
      const handlePrevDay = () => {
        setSelectedDate(
          (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
        );
      };
    
      // Fonction pour naviguer vers le jour suivant
      const handleNextDay = () => {
        setSelectedDate(
            //setDate met a jour la date 
          (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
        );
      };
    
      // Fonction pour sélectionner une date à partir du calendrier
      const handleSelectDate = (day) => {
        setSelectedDate(
          new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
        );
      };
    
      // Formatage de la date en français
      const formatDate = (date) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("fr-FR", options);
      };
    
      return (
        <div className="h-full w-64 bg-backgroundColor flex flex-col">
            <div className='flex justify-start'>
                <button>
                <img
                    src='show_sidebar_icon.png'
                    alt='showSideBar'
                    className='p-4'
                ></img>
                </button>
            </div>
          {/* Header avec navigation entre les jours */}
          <div className="flex items-center justify-between mb-4">
            {/* Bouton pour le jour précédent */}
            <button
              onClick={handlePrevDay}
              className="text-black hover:text-darkPurple"
            >
              {"<"}
            </button>
    
            {/* Affichage de la date sélectionnée */}
            <h2 className="text-xl font-bold">{formatDate(selectedDate)}</h2>
    
            {/* Bouton pour le jour suivant */}
            <button
              onClick={handleNextDay}
              className="text-black hover:text-darkPurple"
            >
              {">"}
            </button>
          </div>
    
          {/* Section des Notes du jour */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-darkPurple">Note(s) du jour</h3>
            <ul className="list-disc list-inside text-black">
              {/* Affichage de chaque note */}
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
    
          {/* Section des Mises à jour */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-darkPurple">Mise à jour</h3>
            <ul className="list-disc list-inside text-black">
              {/* Affichage de chaque mise à jour */}
              {updates.map((update, index) => (
                <li key={index}>{update}</li>
              ))}
            </ul>
          </div>
    
          {/* Calendrier */}
          <div>
            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="text-black">
                  {day}
                </div>
              ))}
            </div>
    
            {/* Jours du mois */}
            <div className="grid grid-cols-7 gap-2 mt-2">
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1; // Jour actuel
                const isSelected =
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === selectedDate.getMonth(); // Vérifie si ce jour est sélectionné
    
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectDate(day)} // Mise à jour de la date sélectionnée
                    className={`py-2 rounded ${
                      isSelected
                        ? "bg-darkPurple text-white" // Style du jour sélectionné
                        : "bg-whitePure text-black hover:bg-lightPurple" // Style des autres jours
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
    };
    