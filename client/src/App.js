
import './App.css';
import Auth from './pages/AuthPage/auth';
import ShipsList from './pages/ShipsList/shipsList';

function App() {
  return (
    <div className="App">
      <main className='hero'>
        <div className='container-new'>
          <ShipsList />
        </div>
      </main>
    </div>
  );
}

export default App;
