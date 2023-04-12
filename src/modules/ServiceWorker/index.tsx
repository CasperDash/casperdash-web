import { useEffect } from 'react';

const ServiceWorker = () => {
  useEffect(() => {
    window.onload = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const sw = await navigator.serviceWorker.register(
            'serviceWorker.js',
            {
              scope: '/tabSync/',
            }
          );
          // Registration was successful
          console.log(
            'ServiceWorker registration successful with scope: ',
            sw.scope
          );
        } catch (err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        }
        navigator.serviceWorker.addEventListener('message', (event) => {
          console.log(event);
          // console.log(event.data.value);
        });
      }
    };
  }, []);
};

export default ServiceWorker;
