import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";




const App = () => {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Layout/>} />
         <Route path="/" element={<span className="text-4xl">Home Page</span>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;