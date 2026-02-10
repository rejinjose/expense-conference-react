import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from './firebase';
import { type RootState, type AppDispatch } from './store/store';
import { setUser, clearUser } from './store/authSlice';
import ProtectedRoute from './ProtectedRoutes';
import './App.css';
import Navigation from './navigation/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Permission from './pages/Permission';
import CreateRoom from './pages/rooms/CreateRoom';
import RoomsList from './pages/rooms/RoomsList';
import RoomDetails from './pages/rooms/RoomDetails';
import ActiveRoom from './pages/rooms/ActiveRoom';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function App() {

  const [session, setSession] = useState<{uid: string, email: string | null} | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setSession(null);
        dispatch(clearUser()); // sets isLoading = false
      } else {
        setSession({ uid: firebaseUser.uid, email: firebaseUser.email });
      }
    });

    return unsubscribe;
  }, [dispatch]);


  useEffect(() => {
    if (!session) return;

    const userRef = doc(db, "users", session.uid);

    const unsubscribe = onSnapshot(userRef, (snap) => {
      dispatch(setUser({
        uid: session.uid,
        email: session.email, // No need to look at auth.currentUser!
        role: snap.data()?.role ?? "user",
      }));
    });

    return unsubscribe;
  }, [session, dispatch]);




  // Prevent flicker during initial Firebase auth check
  if (isLoading) return <div>Loading the App...</div>;

  console.log(user);

  return (
    <>
    <BrowserRouter>
      <Navigation />
      <div className='page-wrapper'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Protected Dashboard: Redirect to login if not authenticated */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                {user?.role === 'admin' ? <AdminDashboard /> : <Dashboard />}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/expenses" 
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/permission" 
            element={
              <ProtectedRoute>
                <Permission />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-room" 
            element={
              <ProtectedRoute>
                <CreateRoom />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rooms" 
            element={
              <ProtectedRoute>
                <RoomsList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rooms/:roomId" 
            element={
              <ProtectedRoute>
                <RoomDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rooms/:roomId/permission" 
            element={
              <ProtectedRoute>
                <Permission />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rooms/:roomId/join" 
            element={
              <ProtectedRoute>
                <ActiveRoom />
              </ProtectedRoute>
            } 
          />
          {/* Specific Admin Routes */}
          {/* <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminSettings />
              </ProtectedRoute>
            } 
          />   */}
          {/* Public Login: Redirect to home if already logged in */}
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
