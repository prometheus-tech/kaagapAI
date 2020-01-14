import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Query } from 'react-apollo';
import RESULTS from '../../../graphql/queries/results';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import EmptyResultIllustration from '../../../assets/No_Result.svg';
import LoadingFullScreen from '../../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Grid from '@material-ui/core/Grid';
import ResultsVertTabs from '../../../components/Results/ResultsVertTabs/ResultsVertTabs';
import ResultPaper from '../../../components/UI/ResultPaper/ResultPaper';
import Placeholder from '../../../components/UI/Placeholder/Placeholder';

import KeywordsTabIcon from '../../../assets/KeywordsIcon.svg';
import CategoryTabIcon from '../../../assets/CategoryIcon.svg';
import EmotionsSentimentTabIcon from '../../../assets/EmotionsSentimentIcon.svg';
import EntitiesTabIcon from '../../../assets/EntitiesIcon.svg';

import CustomWordCloud from '../../../components/Results/CustomWordCloud/CustomWordCloud';
import Categories from '../../../components/Results/Categories/Categories';
import EntitiesTable from '../../../components/Results/Entities/EntitiesTable';
import Emotions from '../../../components/Results/Emotions/Emotions';
import Sentiment from '../../../components/Results/Sentiment/Sentiment';
import TextMapper from '../../../components/Results/TextMapper/TextMapper';

const styles = theme => ({
  tabIcon: {
    width: '32px',
    marginRight: theme.spacing.unit * 2
  }
});

class SessionResultsPage extends Component {
  state = {
    tabValue: 0,
    selectedKeyword: null,
    selectedEntity: null
  };

  changeTabValueHandler = (e, value) => {
    if (this.state.tabValue !== value) {
      this.setState({ tabValue: value });
    }
  };

  selectKeywordHandler = keyword => {
    this.setState({ selectedKeyword: keyword });
  };

  selectEntityHandler = entity => {
    this.setState({ selectedEntity: entity });
  };

  render() {
    const { tabValue, selectedKeyword, selectedEntity } = this.state;

    const { session_id, pageTabValueChanged, classes } = this.props;

    const tabsData = [
      {
        label: 'Keywords',
        icon: (
          <img
            src={KeywordsTabIcon}
            alt="Keywords"
            className={classes.tabIcon}
          />
        )
      },
      {
        label: 'Categories',
        icon: (
          <img
            src={CategoryTabIcon}
            alt="Categories"
            className={classes.tabIcon}
          />
        )
      },
      {
        label: 'Entities',
        icon: (
          <img
            src={EntitiesTabIcon}
            alt="Entities"
            className={classes.tabIcon}
          />
        )
      },
      {
        label: 'Emotions and Sentiment',
        icon: (
          <img
            src={EmotionsSentimentTabIcon}
            alt="Emotions"
            className={classes.tabIcon}
          />
        )
      }
    ];

    return (
      <Query
        query={RESULTS}
        variables={{ session_id }}
        fetchPolicy="network-only"
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
            <Auxilliary>
              {data.result ? (
                <Grid container spacing={24}>
                  <Grid item xs={2}>
                    <ResultsVertTabs
                      tabsData={tabsData}
                      currentTabIndex={tabValue}
                      tabValueChanged={this.changeTabValueHandler}
                    />
                  </Grid>
                  {tabValue === 0 && (
                    <Auxilliary>
                      <Grid item xs={6}>
                        <ResultPaper
                          header="Keywords"
                          headerGutter={true}
                          maxHeight="70vh"
                        >
                          <CustomWordCloud
                            keywords={data.result.keywords}
                            keywordSelected={this.selectKeywordHandler}
                          />
                        </ResultPaper>
                      </Grid>
                      {selectedKeyword ? (
                        <Grid item xs={4}>
                          <ResultPaper maxHeight="70vh">
                            <TextMapper
                              sessionIds={[session_id]}
                              mainText={selectedKeyword.text}
                              supportingInfo={[
                                { label: 'Count = ' + selectedKeyword.count },
                                {
                                  label:
                                    'Relevance = ' +
                                    Math.round(
                                      selectedKeyword.relevance * 100
                                    ) /
                                      100
                                }
                              ]}
                              type="session-level"
                              pageTabValueChanged={pageTabValueChanged}
                            />
                          </ResultPaper>
                        </Grid>
                      ) : null}
                    </Auxilliary>
                  )}
                  {tabValue === 1 && (
                    <Grid item xs={10}>
                      <ResultPaper header="Categories" headerGutter={true}>
                        <Categories
                          resultType="Session"
                          categories={data.result.categories}
                        />
                      </ResultPaper>
                    </Grid>
                  )}
                  {tabValue === 2 && (
                    <Auxilliary>
                      <Grid item xs={6}>
                        <ResultPaper
                          header="Entities"
                          headerGutter={true}
                          maxHeight="70vh"
                        >
                          <EntitiesTable
                            resultType="Session"
                            entities={data.result.entities}
                            entitySelected={this.selectEntityHandler}
                          />
                        </ResultPaper>
                      </Grid>
                      {selectedEntity ? (
                        <Grid item xs={4}>
                          <ResultPaper maxHeight="70vh">
                            <TextMapper
                              sessionIds={[session_id]}
                              mainText={selectedEntity.text}
                              supportingInfo={[
                                { label: 'Type = ' + selectedEntity.type },
                                {
                                  label:
                                    'Relevance = ' +
                                    Math.round(selectedEntity.relevance * 100) /
                                      100
                                }
                              ]}
                              type="session-level"
                              pageTabValueChanged={pageTabValueChanged}
                            />
                          </ResultPaper>
                        </Grid>
                      ) : null}
                    </Auxilliary>
                  )}
                  {tabValue === 3 && (
                    <Grid item xs={10}>
                      <ResultPaper
                        header="Emotions and Sentiment"
                        headerGutter={true}
                        contentPadding={true}
                      >
                        <Emotions emotions={data.result.emotions[0]} />
                        <Sentiment sentiment={data.result.sentiment[0]} />
                      </ResultPaper>
                    </Grid>
                  )}
                </Grid>
              ) : (
                <Placeholder
                  illustration={EmptyResultIllustration}
                  alt="No Result"
                  mainText="No document to analyze"
                  subText="Upload documents to this session now"
                />
              )}
            </Auxilliary>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(SessionResultsPage);
