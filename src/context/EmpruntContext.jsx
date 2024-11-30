import  { createContext, useState, useContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const EmpruntContext = createContext();

export const useEmprunt = () => useContext(EmpruntContext);

export const EmpruntProvider = ({ children }) => {
  const [emprunts, setEmprunts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(clearMessage, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  const empruntLivre = (livre) => {
    if (livre.disponible) {
      setEmprunts([...emprunts, { ...livre, disponible: false }]);
      setMessage(`Livre "${livre.titre}" emprunté avec succès`);
    } else {
      setMessage(`Le livre "${livre.titre}" n'est pas disponible`);
    }
  };

  const returnLivre = (id) => {
    const livre = emprunts.find(l => l.id === id);
    if (livre) {
      setEmprunts(emprunts.filter(l => l.id !== id));
      setMessage(`Livre "${livre.titre}" rendu avec succès`);
    } else {
      setMessage("Livre non trouvé dans les emprunts");
    }
  };

  return (
    <EmpruntContext.Provider value={{ emprunts, empruntLivre, returnLivre, message, setMessage, loading, setLoading }}>
      {children}
    </EmpruntContext.Provider>
  );
};

EmpruntProvider.propTypes = {
  children: PropTypes.node.isRequired
};

