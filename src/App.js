import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import MainLayout from './components/Layout';
import Home from './Pages/Home';

function App() {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}

export default App;
