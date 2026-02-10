import { useSelector } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { type RootState } from '../store/store';

import { 
  Nav, 
  NavContainer, 
  NavLogo, 
  NavMenu, 
  StyledLink, 
  NavButton 
} from './Navigation.styles';

function Navigation() {

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Nav data-name="navigation">
      <NavContainer>
        <NavLogo>
          <StyledLink to="/">MyApp</StyledLink>
        </NavLogo>

        <NavMenu>
          <li><StyledLink to="/">Home</StyledLink></li>
          <li><StyledLink to="/about">About</StyledLink></li>
          {/* Show Dashboard only if logged in */}
          {user && <li><StyledLink to="/dashboard">Dashboard</StyledLink></li>}
          {user && <li><StyledLink to="/expenses">Expenses</StyledLink></li>}
          {user && <li><StyledLink to="/permission">Permission</StyledLink></li>}
          {user && <li><StyledLink to="/rooms">Your Meetings</StyledLink></li>}
          {/* Toggle Login/Logout buttons */}
          {!user ? (
            <li>
              <StyledLink to="/login">
                <NavButton>Login</NavButton>
              </StyledLink>
            </li>
          ) : (
            <li>
              <NavButton $logout onClick={handleLogout}>
                Logout
              </NavButton>
            </li>
          )}         
        </NavMenu>
      </NavContainer>
    </Nav>
  )
}

export default Navigation;
