import { Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Layout = () => {
  return (
    <Box
      padding="20px"
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <nav style={{ marginBottom: '1rem' }}>
        <Box display="flex" justifyContent="space-between">
          <Link to="/" style={{ marginRight: '1rem' }}>
            Home
          </Link>
          <Link to="/selected">
            <FavoriteIcon />
          </Link>
        </Box>
      </nav>
      <Outlet />
    </Box>
  );
};

export default Layout;
