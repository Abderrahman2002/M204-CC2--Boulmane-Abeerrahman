// Import des hooks React nécessaires
import  { useState, useEffect } from 'react';
// Import de PropTypes pour la validation des props
import PropTypes from 'prop-types';

// Définition du composant Message qui accepte text et type comme props
// type est optionnel avec 'success' comme valeur par défaut
const Message = ({ text, type = 'success' }) => {
  // État local pour gérer la visibilité du message
  const [visible, setVisible] = useState(true);

  // Effect pour gérer l'auto-disparition du message après 3 secondes
  useEffect(() => {
    // Création d'un timer qui masquera le message
    const timer = setTimeout(() => setVisible(false), 3000);
    // Nettoyage du timer si le composant est démonté
    return () => clearTimeout(timer);
  }, [text]); // Se déclenche quand le texte change

  // Définition des styles pour les différents types de messages
  const styles = {
    // Style pour les messages de succès
    success: {
      container: 'fixed top-4 right-4 flex items-center p-4 bg-white shadow-lg rounded-lg transform transition-all duration-500 ease-in-out',
      icon: '✓',
      iconClass: 'text-green-500 text-xl mr-3',
      border: 'border-l-4 border-green-500'
    },
    // Style pour les messages d'erreur
    error: {
      container: 'fixed top-4 right-4 flex items-center p-4 bg-white shadow-lg rounded-lg transform transition-all duration-500 ease-in-out',
      icon: '✕',
      iconClass: 'text-red-500 text-xl mr-3',
      border: 'border-l-4 border-red-500'
    }
  };

  // Si le message n'est pas visible, ne rien rendre
  if (!visible) return null;

  // Sélection du style en fonction du type
  const currentStyle = styles[type];

  // Rendu du composant
  return (
    <div className={`${currentStyle.container} ${currentStyle.border} ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      {/* Affichage de l'icône */}
      <span className={currentStyle.iconClass}>{currentStyle.icon}</span>
      {/* Affichage du texte du message */}
      <p className="text-gray-700 font-medium">{text}</p>
    </div>
  );
};

// Validation des props avec PropTypes
Message.propTypes = {
  text: PropTypes.string.isRequired, // text est obligatoire et doit être une chaîne
  type: PropTypes.oneOf(['success', 'error']) // type doit être soit 'success' soit 'error'
};

// Export du composant
export default Message;