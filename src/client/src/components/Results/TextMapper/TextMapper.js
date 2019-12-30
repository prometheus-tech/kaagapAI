import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Query } from 'react-apollo';
import TEXT_OCCURRENCES from '../../../graphql/queries/findTextOccurrences';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import grey from '@material-ui/core/colors/grey';
import LoadingFullScreen from '../../UI/LoadingFullScreen/LoadingFullScreen';
import TextAppearance from './TextAppearance/TextAppearance';

const styles = theme => ({
  mapperHeaderContainer: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    borderBottom: '1px solid #e6e6e6'
  },
  headerText: {
    marginBottom: theme.spacing.unit
  },
  chip: {
    marginRight: theme.spacing.unit,
    border: '1px solid' + grey[300],
    fontWeight: 300,
    color: grey[600]
  },
  mapperBodyContainer: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2
  }
});

function TextMapper({
  classes,
  sessionIds,
  mainText,
  supportingInfo,
  type,
  pageTabValueChanged
}) {
  return (
    <Query
      query={TEXT_OCCURRENCES}
      variables={{ text: mainText, session_id: sessionIds }}
      errorPolicy="all"
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <LoadingFullScreen />;
        }

        if (error) {
          return <div />;
        }

        return (
          <div>
            <div className={classes.mapperHeaderContainer}>
              <Typography className={classes.headerText} variant="h5">
                {mainText}
              </Typography>
              {supportingInfo.map(info => (
                <Chip
                  key={mainText + '_' + info.label}
                  variant="outlined"
                  className={classes.chip}
                  label={info.label}
                />
              ))}
            </div>
            <div className={classes.mapperBodyContainer}>
              {data.findTextOccurences.text_appearances.map(textAppearance => (
                <TextAppearance
                  key={textAppearance.appearance_id}
                  text={mainText}
                  textAppearance={textAppearance}
                  type={type}
                  pageTabValueChanged={pageTabValueChanged}
                />
              ))}
            </div>
          </div>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(TextMapper);
