import { createSelector } from 'reselect';


const selectTeamState = (state) => state.team;
const selectTopicState = (state) => state.topic;


export const selectTeam = createSelector(
  [selectTeamState],
  (teamState) => teamState.team
);

export const selectTeamLoading = createSelector(
  [selectTeamState],
  (teamState) => teamState.loading
);

export const selectTopics = createSelector(
  [selectTopicState],
  (topicState) => topicState?.topics || []
);


export const selectCurrentTopic = state => state.topics.currentTopic;