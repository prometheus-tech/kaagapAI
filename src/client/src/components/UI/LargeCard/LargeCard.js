import React from 'react';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    marginTop: '2rem',
    background: '#fff',
    borderRadius: '6px',
    width: '230px',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: `${theme.spacing.unit * 1}px`
    }
  },
  cardContent: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex'
    }
  },
  avatarContainer: {
    display: 'inline-flex',
    justifyContent: 'center',
    margin: '10px auto',
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      margin: '0',
      textAlign: 'left'
    }
  },
  avatar: {
    backgroundColor: grey[500],
    height: '70px',
    width: '70px',
    [theme.breakpoints.down('xs')]: {
      width: '50px',
      height: '50px',
      marginRight: theme.spacing.unit * 2
    }
  },
  cardTextContainer: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
      textAlign: 'left'
    }
  },
  title: {
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '500'
  },
  subtitle: {
    fontWeight: '400',
    fontSize: '14px',
    marginBottom: 0,
    color: theme.palette.grey[600]
  },
  iconHover: {
    '&:hover': {
      color: grey[600]
    }
  },
  buttonBase: {
    display: 'block'
  }
});

function LargeCard(props) {
  const { classes, avatar, title, subtitle, actions = [], color, link } = props;
  const CardLink = props => <Link to={link} {...props} />;

  return (
    <Card className={classes.card}>
      <ButtonBase
        disableRipple={true}
        disableTouchRipple={true}
        component={CardLink}
        className={classes.buttonBase}
      >
        <CardContent className={classes.cardContent}>
          <div className={classes.avatarContainer}>
            <Avatar
              className={classes.avatar}
              style={{ backgroundColor: color }}
            >
              <Icon fontSize="large">{avatar}</Icon>
            </Avatar>
          </div>
          <div className={classes.cardTextContainer}>
            <Typography noWrap variant="h6" className={classes.title}>
              {title}
            </Typography>
            <Typography className={classes.subtitle}>{subtitle}</Typography>
          </div>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {actions.map((action, index) => (
          <Tooltip title={action.name} key={index}>
            <IconButton
              className={classes.iconHover}
              disableRipple={true}
              onClick={e => {
                e.preventDefault();
                action.event();
              }}
            >
              <Icon>{action.icon}</Icon>
            </IconButton>
          </Tooltip>
        ))}
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(LargeCard);
