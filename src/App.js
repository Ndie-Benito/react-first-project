import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/menu';
import './css/app.css';
import Home from './pages/Home';
import TechnoAdd from './pages/TechnoAdd';
import TechnoList from './pages/TechnoList';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './hooks/useLocalStorage'
function App() {

  const [technos, setTechnos] = useState([]);
  const STORAGE_KEY = 'technos'
  const [storeTechnos, setStoredTechnos] = useLocalStorage(STORAGE_KEY, [])


  useEffect(() => {
    console.log('useEffect with[]')
    setTechnos(storeTechnos)
  },[])


  useEffect(() => {
    console.log('useEffect with [technos]')
    setStoredTechnos(technos)
  }, [technos])

  function handleAddTechno(techno) {
    console.log('handleAddTechno', techno)
    setTechnos([...technos, { ...techno, technoid: uuidv4() }])
  }

  function handleDeleteTechno(id) {
    setTechnos(technos.filter((tech) => tech.technoid !== id))
  }

  return (
    <>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<TechnoAdd handleAddTechno={handleAddTechno} />} />
        <Route path='/list' element={<TechnoList technos={technos} handleDeleteTechno={handleDeleteTechno} />} />
      </Routes>

    </>

  );
}

export default App;
