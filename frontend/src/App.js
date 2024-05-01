import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rooms from "./components/Rooms";
import Roomdetails from "./components/Roomdetails";
import Search from "./components/Search";
import Header from "./components/Header";


function App() {
  return (
    <Router>
      <Header/>
      
      
      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/search" element={<Search />} />
        <Route path="/room/:roomId" element={<Roomdetails />} />
      </Routes>
    </Router>
  );
}

export default App;
