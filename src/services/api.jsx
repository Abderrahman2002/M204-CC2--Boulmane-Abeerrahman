import axios from 'axios';

export const fetchLivres = async () => {
  try {
    const response = await axios.get('https://gahi-said.com/apis/auteurs.php');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des livres:", error);
    throw error;
  }
};

