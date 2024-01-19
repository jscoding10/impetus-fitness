import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Workout from './pages/Workout';
import Welcome from './pages/Welcome';
import CreateWorkout from './pages/CreateWorkout';
import UpdateWorkout from './pages/UpdateWorkout';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/workout' element={<Workout />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/create-workout' element={<CreateWorkout />} />
          <Route path='/update-workout/:workoutId' element={<UpdateWorkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}