import { useState, useEffect } from 'react';
import { fetchLivres } from '../services/api';
import { useEmprunt } from '../context/EmpruntContext';
import Message from './Message';

const ListLivre = () => {
  const [livres, setLivres] = useState([]);
  const { emprunts, empruntLivre, message, loading, setLoading } = useEmprunt();

  useEffect(() => {
    const getLivres = async () => {
      setLoading(true);
      try {
        const data = await fetchLivres();
        // Certains livres sont indisponibles par défaut
        const livresAvecDisponibilite = data.map(livre => ({
          ...livre,
          disponible: livre.disponible ?? true // Si disponible n'est pas défini, le livre est disponible
        }));
        setLivres(livresAvecDisponibilite);
      } catch {
        console.error("Erreur lors du chargement des livres");
      } finally {
        setLoading(false);
      }
    };
    getLivres();
  }, [setLoading]);

  const isEmprunte = (livreId) => {
    // Vérifie si le livre est emprunté OU s'il est indisponible par défaut
    const livre = livres.find(l => l.id === livreId);
    return emprunts.some(emprunt => emprunt.id === livreId) || !livre?.disponible;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {message && <Message text={message} />}
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bibliothèque Numérique
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Découvrez notre collection de livres disponibles
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Titre
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Auteur
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {livres.map((livre, index) => (
                  <tr 
                    key={livre.id}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {livre.titre}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {livre.auteur}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${!isEmprunte(livre.id) 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {!isEmprunte(livre.id) ? 'Disponible' : 'Indisponible'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!isEmprunte(livre.id) ? (
                        <button
                          onClick={() => empruntLivre(livre)}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                                   text-white text-sm font-medium rounded-md transition-colors duration-200"
                        >
                          Emprunter
                          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          Non disponible
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListLivre;

