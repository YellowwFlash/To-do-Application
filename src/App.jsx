import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateTasks from './components/CreateTasks';
import Home from './components/Home';
import UpdateTasks from './components/UpdateTasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/update/:id' element={<UpdateTasks />}></Route>
        <Route path='/create' element={<CreateTasks />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
