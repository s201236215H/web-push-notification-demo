self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var tag = 'hello world';
  var options = {
    body: body,
    tag: tag,
    actions: [{
      "action": "yes",
      "title": "Yes!"
    }, {
      "action": "no",
      "title": "No!"
    }, ]
  }

  if (event.data) {
    const data = event.data.text();
    notificationTitle = 'Received Payload';
    options.body = `Push data: '${dataText}'`;
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag ', event.notification.tag);
  event.notification.close();
  var url = 'https://youtu.be/_dXBibRO0SM';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
