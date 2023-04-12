self.addEventListener('message', (event) => {
  console.log(`[Message] event: `, event);
  // eslint-disable-next-line no-undef
  clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(event);
    });
  });
});
