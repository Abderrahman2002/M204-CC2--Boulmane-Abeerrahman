  import { useEmprunt } from '../context/EmpruntContext';
  import { motion } from 'framer-motion';

  const LivresEmpruntes = () => {
    const { emprunts, returnLivre } = useEmprunt();

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          📚 Mes Emprunts
        </h2>
        
        {emprunts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Aucun livre emprunté pour le moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {emprunts.map(livre => (
              <motion.div
                key={livre.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4 flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {livre.titre}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {livre.auteur}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Emprunté le: {new Date(livre.dateEmprunt).toLocaleDateString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => returnLivre(livre.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg
                            hover:bg-indigo-700 transition-colors duration-200
                            flex items-center space-x-2"
                  >
                    <span>Retourner</span>
                    <span>↩️</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default LivresEmpruntes;

