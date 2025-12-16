import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function FooterBar() {
  return (
    <footer
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
      }}
    >
      <BottomNavigation showLabels sx={{ backgroundColor: '#b7b7b7ff' }}>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </footer>
  );
}
