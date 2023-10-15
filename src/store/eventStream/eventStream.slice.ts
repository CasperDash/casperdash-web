import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IEventStream {
  events: any[];
}

export const NAME_SPACE = 'eventStream';

const initialState: IEventStream = {
  events: [],
};

export const eventStreamSlice = createSlice({
  name: NAME_SPACE,
  initialState,
  reducers: {
    pushEvent: (state: IEventStream, action: PayloadAction<any>) => {
      const { payload } = action;
      state.events.push(payload);
    },
    reset: () => initialState,
  },
});

export const { pushEvent } = eventStreamSlice.actions;

export const reducers = {
  [NAME_SPACE]: eventStreamSlice.reducer,
};
