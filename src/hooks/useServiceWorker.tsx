import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    window.onload = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const sw = await navigator.serviceWorker.register(
            '/serviceWorker.js',
            {
              scope: '/sdk',
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
        navigator.serviceWorker.addEventListener('message', () => {
          // console.log(event);
        });
      }
    };
  }, []);
};

export default useServiceWorker;
