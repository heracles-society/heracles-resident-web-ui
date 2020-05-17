import {
  AppBar,
  Toolbar,
  Paper,
  Box,
  Container,
  IconButton,
  makeStyles,
  Drawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import * as React from 'react';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaperAnchorLeft: {
    position: 'absolute',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 3,
    },
  },
}));

export const Page = props => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const classes = useStyles(props);
  const {mainContent, rightContent, navigationContent} = props;
  return (
    <>
      <Container
        maxWidth="lg"
        style={{minHeight: '100%', position: 'relative'}}
        disableGutters
      >
        <Box display="flex" flexDirection="row">
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            style={{padding: 24}}
          >
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  style={{marginLeft: '-18px'}}
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box
              display="flex"
              flexDirection="row"
              flex="1"
              style={{paddingTop: 24}}
            >
              <Box
                display="flex"
                flexDirection="column"
                style={{position: 'relative'}}
                onMouseEnter={() => setDrawerOpen(true)}
                onMouseLeave={() => setDrawerOpen(false)}
              >
                <Drawer
                  variant="permanent"
                  open={drawerOpen}
                  className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen,
                  })}
                  classes={{
                    paperAnchorLeft: classes.drawerPaperAnchorLeft,
                    paper: clsx({
                      [classes.drawerOpen]: drawerOpen,
                      [classes.drawerClose]: !drawerOpen,
                    }),
                  }}
                >
                  <Paper color="primary" style={{flex: 1, overflow: 'hidden'}}>
                    {navigationContent}
                  </Paper>
                </Drawer>
              </Box>
              <Box display="flex" flex="1" style={{paddingLeft: 24}}>
                {mainContent}
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            flexGrow="0"
            flexShrink="0"
            flexBasis="25%"
            alignItems="stretch"
            style={{
              minHeight: '100vh',
            }}
          >
            {rightContent}
          </Box>
        </Box>
      </Container>
    </>
  );
};
