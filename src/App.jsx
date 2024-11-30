import { EmpruntProvider } from './context/EmpruntContext';
import ListLivre from './components/ListLivre';
import LivresEmpruntes from './components/LivresEmpruntes';

function App() {
  return (
    <EmpruntProvider>
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <ListLivre />
          <LivresEmpruntes />
        </div>
      </div>
    </EmpruntProvider>
  );
}

export default App;

