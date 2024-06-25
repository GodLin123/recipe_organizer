import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';

const Sidebar = () => (
  <Drawer
    variant="permanent"
    anchor="left"
    sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
      },
    }}
  >
    <div>
      <Typography variant="h6" noWrap component="div" sx={{ padding: 2 }}>
        Recipe Organizer
      </Typography>
      <List>
        {['Home', 'Favorites', 'Categories', 'Settings'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  </Drawer>
);

export default Sidebar;
