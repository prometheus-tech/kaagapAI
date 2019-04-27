import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Query } from 'react-apollo';
import RESULTS from '../../../graphql/queries/results';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import LoadingFullScreen from '../../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Grid from '@material-ui/core/Grid';
import Keywords from '../../../components/Session/Keywords/Keywords';
import Categories from '../../../components/Session/Categories/Categories';
import EmotionsSentiment from '../../../components/Session/EmotionsSentiment/EmotionsSentiment';
import Entities from '../../../components/Session/Entities/Entities';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import KeywordsIcon from '../../../assets/KeywordsIcon.svg';
import CategoryIcon from '../../../assets/CategoryIcon.svg';
import EmotionsSentimentIcon from '../../../assets/EmotionsSentimentIcon.svg';
import EntitiesIcon from '../../../assets/EntitiesIcon.svg';
import EmptyResults from '../../../components/UI/Placeholder/EmptyResults';

const styles = theme => ({
  tabCon: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: 'rgb(248, 248, 248)',
    position: 'absolute',
    display: 'flex'
  },
  tabIcon: {
    height: '5vh',
    padding: '0'
  },
  textIcon: {
    fontWeight: '300',
    marginTop: theme.spacing.unit * 2
  }
});

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none'
  }
}))(Tabs);

const MyTab = withStyles(theme => ({
  root: {
    padding: '0',
    margin: '0',
    width: '30px',
    backgroundColor: 'rgb(255, 255, 255)'
  },
  selected: {
    color: 'tomato',
    borderRight: '2px solid tomato'
  }
}))(Tab);

function TabContainer(props) {
  return <div>{props.children}</div>;
}

class SessionResultsPage extends Component {
  state = { activeIndex: 0 };

  handleChange = (_, activeIndex) => this.setState({ activeIndex });

  render() {
    const { activeIndex } = this.state;

    const {
      session_id,
      documents,
      contentSessionDocumentDialogOpened,
      classes
    } = this.props;

    return (
      <Query
        query={RESULTS}
        variables={{ session_id }}
        fetchPolicy="network-only"
        errorPolicy="all"
      >
        {({ loading, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          return (
            <Auxilliary>
              {data.result ? (
                <Grid container spacing={16}>
                  <Grid item xs={2}>
                    <div className={classes.tabCon}>
                      <VerticalTabs
                        value={activeIndex}
                        onChange={this.handleChange}
                      >
                        <MyTab
                          label={
                            <div>
                              <img
                                src={KeywordsIcon}
                                alt="Keywords"
                                className={classes.tabIcon}
                              />
                              <Typography className={classes.textIcon}>
                                Keywords
                              </Typography>
                            </div>
                          }
                        />
                        <MyTab
                          label={
                            <div>
                              <img
                                src={CategoryIcon}
                                alt="Category"
                                className={classes.tabIcon}
                              />
                              <Typography className={classes.textIcon}>
                                Categories
                              </Typography>
                            </div>
                          }
                        />
                        <MyTab
                          label={
                            <div>
                              <img
                                src={EntitiesIcon}
                                alt="Keywords"
                                className={classes.tabIcon}
                              />
                              <Typography className={classes.textIcon}>
                                Entities
                              </Typography>
                            </div>
                          }
                        />
                        <MyTab
                          label={
                            <div>
                              <img
                                src={EmotionsSentimentIcon}
                                alt="Keywords"
                                className={classes.tabIcon}
                              />
                              <Typography className={classes.textIcon}>
                                Emotions and Sentiments
                              </Typography>
                            </div>
                          }
                        />
                      </VerticalTabs>
                    </div>
                  </Grid>
                  <Grid xs={10}>
                    {activeIndex === 0 && (
                      <TabContainer>
                        <Keywords
                          keywords={data.result.keywords}
                          documents={documents}
                          contentSessionDocumentDialogOpened={
                            contentSessionDocumentDialogOpened
                          }
                        />
                      </TabContainer>
                    )}
                    {activeIndex === 1 && (
                      <TabContainer>
                        <Categories categories={data.result.categories} />
                      </TabContainer>
                    )}
                    {activeIndex === 2 && (
                      <TabContainer>
                        <Entities
                          entities={data.result.entities}
                          documents={documents}
                          contentSessionDocumentDialogOpened={
                            contentSessionDocumentDialogOpened
                          }
                        />
                      </TabContainer>
                    )}
                    {activeIndex === 3 && (
                      <TabContainer>
                        <EmotionsSentiment
                          emotions={data.result.emotions}
                          sentiment={data.result.sentiment}
                        />
                      </TabContainer>
                    )}
                  </Grid>
                </Grid>
              ) : (
                // </Grid>
                <EmptyResults />
              )}
            </Auxilliary>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(SessionResultsPage);
