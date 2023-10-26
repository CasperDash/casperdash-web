import { useEffect, useRef } from 'react';

import { EventName, EventStream } from 'casper-js-sdk';

export const EventStreamScript = () => {
  const ref = useRef<boolean | null>(null);

  useEffect(() => {
    if (ref.current) {
      return;
    }
    const ip = '138.201.51.197';
    const esUrl = `http://${ip}:9999/events/main`;
    const eventStream = new EventStream(esUrl);
    console.log('eventStream: ', eventStream);
    eventStream.start();

    eventStream.subscribe(EventName.DeployProcessed, async (event: any) => {
      console.log('event: ', event);
    });

    ref.current = true;
  }, []);

  return null;
};
