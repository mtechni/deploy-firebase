// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/login/login';
import FireStore from './components/firestore/firestore';

function App() {
  const userData = useSelector((state) => state.user.userData);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={userData ? <Navigate to="/app" replace /> : <Login />}
        />
        <Route
          path="/app"
          element={userData ? <FireStore /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
