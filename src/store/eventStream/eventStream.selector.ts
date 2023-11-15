import { createSelector } from '@reduxjs/toolkit';

import { NAME_SPACE } from './eventStream.slice';
import { AppState } from '..';

// Select connected url
const selectEvents = (state: AppState) => {
  return {
    events: state[NAME_SPACE].events,
  };
};
export const eventsSelector = createSelector(
  selectEvents,
  ({ events }) => events
);
