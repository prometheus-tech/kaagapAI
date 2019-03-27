import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import Moment from 'react-moment';

const styles = theme => ({
  card: {
    minWidth: 200
  },
  cardActions: {
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end'
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
    marginBottom: theme.spacing.unit * 2
  },
  cardTitle: {
    fontSize: theme.spacing.unit * 2,
    fontWeight: 500
  }
});

function SessionCard({
  session: { session_id, session_name, date_of_session },
  classes
}) {
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <div className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
              <FolderIcon fontSize="large" />
            </Avatar>
          </div>
          <Typography className={classes.cardTitle}>{session_name}</Typography>
          <Typography className={classes.cardSubheader}>
            <Moment format="MMM D, YYYY" withTitle>
              {date_of_session}
            </Moment>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <IconButton>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(SessionCard);
