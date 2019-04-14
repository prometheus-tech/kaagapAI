import React from 'react';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import Moment from 'react-moment';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ButtonBase from '@material-ui/core/ButtonBase';
import Hidden from '@material-ui/core/Hidden';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    minWidth: 180,
    minHeight: 200,
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    marginTop: '1rem',
    background: '#fff',
    borderRadius: '6px',
    maxWidth: '230px',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
      padding: '0px 0px 0px 0px'
    }
  },
  cardMobile: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    marginTop: '1rem',
    background: '#fff',
    borderRadius: '6px',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)'
  },
  cardActions: {
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  cardContent: {
    textAlign: 'center'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 1,
    padding: '2px 2px 2px 2px',
    fontSize: theme.spacing.unit * 6,
    color: 'white',
    backgroundColor: orange[800]
  },
  cardTitle: {
    fontWeight: '500',
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cardSubheader: {
    fontWeight: '400',
    fontSize: '14px',
    color: theme.palette.grey[600]
  },
  iconAction: {
    '&:hover': {
      color: orange[800]
    }
  },
  buttonBase: {
    display: 'block'
  }
});

function SessionCard({ session, classes, sessionEdited, sessionDeleted }) {
  const CardLink = props => (
    <Link to={'/session/' + session.session_id} {...props} />
  );

  return (
    <div>
      <Hidden smDown>
        <Card className={classes.card}>
          <ButtonBase
            className={classes.buttonBase}
            disableRipple={true}
            disableTouchRipple={true}
            component={CardLink}
          >
            <CardContent className={classes.cardContent}>
              <div className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <FolderIcon fontSize="large" />
                </Avatar>
              </div>
              <Typography
                noWrap
                variant="h6"
                className={classes.cardTitle}
                align="center"
              >
                {session.session_name}
              </Typography>
              <Typography className={classes.cardSubheader}>
                <Moment format="MMM D, YYYY" withTitle>
                  {session.date_of_session}
                </Moment>
              </Typography>
            </CardContent>
          </ButtonBase>
          <CardActions className={classes.cardActions}>
            <IconButton
              disableRipple={true}
              aria-label="Edit"
              className={classes.iconAction}
              onClick={() => {
                sessionEdited(session);
              }}
            >
              <Icon fontSize="small">edit</Icon>
            </IconButton>
            <IconButton
              disableRipple={true}
              aria-label="Archive"
              className={classes.iconAction}
              onClick={() => {
                sessionDeleted(session);
              }}
            >
              <Icon fontSize="small">archive</Icon>
            </IconButton>
          </CardActions>
        </Card>
      </Hidden>
      <Hidden mdUp>
        <ButtonBase
          className={classes.buttonBase}
          disableRipple={true}
          disableTouchRipple={true}
          component={CardLink}
        >
          <CardHeader
            className={classes.cardMobile}
            avatar={
              <div className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <FolderIcon fontSize="large" />
                </Avatar>
              </div>
            }
            action={
              <IconButton style={{ transform: 'rotate(90deg)' }}>
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <Typography
                noWrap
                variant="h6"
                className={classes.cardTitle}
                align="left"
              >
                {session.session_name}
              </Typography>
            }
            subheader={
              <Typography className={classes.cardSubheader}>
                <Moment format="MMM D, YYYY" withTitle>
                  {session.date_of_session}
                </Moment>
              </Typography>
            }
          />
        </ButtonBase>
      </Hidden>
    </div>
  );
}

export default withStyles(styles)(SessionCard);
