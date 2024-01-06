import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import About from './pages/About';
import Profile from './pages/Profile';
import Workout from './pages/Workout';
import Welcome from './pages/Welcome';
import CreateWorkout from './pages/CreateWorkout';
import UpdateWorkout from './pages/UpdateWorkout';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

// import CreateListing from './pages/CreateListing';
// import UpdateListing from './pages/UpdateListing';
// import Listing from './pages/Listing';
// import Search from './pages/Search';

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

        {/* <Route path='/about' element={<About />} /> */}
        {/* <Route path='/search' element={<Search />} /> */}
        {/* <Route path='/listing/:listingId' element={<Listing />} /> */}

        {/* <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}