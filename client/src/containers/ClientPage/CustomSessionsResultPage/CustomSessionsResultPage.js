import React, { Component } from 'react';

import CUSTOM_RESULT from '../../../graphql/queries/customSessionResult';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';

import LoadingFullScreen from '../../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Grid from '@material-ui/core/Grid';
import EmotionsTrend from '../../../components/Results/EmotionsTrend/EmotionsTrend';
import SentimentsTrend from '../../../components/Results/SentimentsTrend/SentimentsTrend';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import SelectSessionsDialog from '../../../components/Client/SelectSessionsDialog/SelectSessionsDialog';
import EmptyCustomSessionsResult from '../../../components/UI/Placeholder/EmptyCustomSessionsResult';
import ResultsVertTabs from '../../../components/Results/ResultsVertTabs/ResultsVertTabs';

import KeywordsTabIcon from '../../../assets/KeywordsIcon.svg';
import CategoryTabIcon from '../../../assets/CategoryIcon.svg';
import EntitiesTabIcon from '../../../assets/EntitiesIcon.svg';
import EmotionsTabIcon from '../../../assets/EmotionsSentimentIcon.svg';

import Categories from '../../../components/Results/Categories/Categories';
import ResultPaper from '../../../components/UI/ResultPaper/ResultPaper';
import Emotions from '../../../components/Results/Emotions/Emotions';
import CustomWordCloud from '../../../components/Results/CustomWordCloud/CustomWordCloud';
import EntitiesTable from '../../../components/Results/Entities/EntitiesTable';
import Sentiment from '../../../components/Results/Sentiment/Sentiment';
import TextMapper from '../../../components/Results/TextMapper/TextMapper';

const styles = theme => ({
  tabIcon: {
    width: '32px',
    marginRight: theme.spacing.unit * 2
  }
});

class CustomSessionsResultPage extends Component {
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
    const {
      classes,
      sessions,
      isSelectSessionsDialogOpened,
      selectSessionsDialogOpened,
      selectSessionsDialogClosed,
      checkedSessions,
      analyzedSessions,
      checkSessionsToggled,
      analyzeSessions
    } = this.props;

    const { tabValue, selectedKeyword, selectedEntity } = this.state;

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
        label: 'Emotions',
        icon: (
          <img
            src={EmotionsTabIcon}
            alt="Emotions"
            className={classes.tabIcon}
          />
        )
      },
      {
        label: 'Sentiment',
        icon: (
          <img
            src={EmotionsTabIcon}
            alt="Sentiment"
            className={classes.tabIcon}
          />
        )
      }
    ];

    return (
      <Auxilliary>
        <SelectSessionsDialog
          opened={isSelectSessionsDialogOpened}
          sessions={sessions}
          checkedSessions={checkedSessions}
          checkSessionsToggled={checkSessionsToggled}
          selectSessionsDialogClosed={selectSessionsDialogClosed}
          analyzeSessions={analyzeSessions}
        />
        {analyzedSessions.length > 0 ? (
          <Query
            query={CUSTOM_RESULT}
            variables={{ session_id: analyzedSessions }}
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

              const { customSessionResult } = data;
              const { trend } = customSessionResult;

              return (
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
                            keywords={customSessionResult.keywords}
                            keywordSelected={this.selectKeywordHandler}
                          />
                        </ResultPaper>
                      </Grid>
                      {selectedKeyword ? (
                        <Grid item xs={4}>
                          <ResultPaper maxHeight="70vh">
                            <TextMapper
                              sessionIds={analyzedSessions}
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
                              type="sessions"
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
                          resultType="Custom"
                          categories={customSessionResult.categories}
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
                            resultType="Custom"
                            entities={customSessionResult.entities}
                            entitySelected={this.selectEntityHandler}
                          />
                        </ResultPaper>
                      </Grid>
                      {selectedEntity ? (
                        <Grid item xs={4}>
                          <ResultPaper maxHeight="70vh">
                            <TextMapper
                              sessionIds={analyzedSessions}
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
                              type="sessions"
                            />
                          </ResultPaper>
                        </Grid>
                      ) : null}
                    </Auxilliary>
                  )}
                  {tabValue === 3 && (
                    <Grid item xs={10}>
                      <Grid container spacing={24}>
                        <Grid item xs={12}>
                          <ResultPaper
                            header="Overall Emotions"
                            headerGutter={true}
                            marginBottom={true}
                          >
                            <Emotions emotions={customSessionResult.emotion} />
                          </ResultPaper>
                        </Grid>
                        <Grid item xs={12}>
                          <ResultPaper
                            header="Emotions Trend"
                            headerGutter={true}
                            contentPadding={true}
                          >
                            <EmotionsTrend trend={trend} />
                          </ResultPaper>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  {tabValue === 4 && (
                    <Grid item xs={10}>
                      <ResultPaper
                        header="Sentiments Trend"
                        headerGutter={true}
                        contentPadding={true}
                      >
                        <SentimentsTrend trend={trend} />
                        <Sentiment sentiment={customSessionResult.sentiment} />
                      </ResultPaper>
                    </Grid>
                  )}
                </Grid>
              );
            }}
          </Query>
        ) : (
          <EmptyCustomSessionsResult
            selectSessionsDialogOpened={selectSessionsDialogOpened}
          />
        )}
      </Auxilliary>
    );
  }
}

export default withStyles(styles)(CustomSessionsResultPage);
