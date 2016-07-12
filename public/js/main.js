var isPushEnabled = false; // Global var for checking permission

window.addEventListener('load', function() {
  var pushButton = document.querySelector('.js-push-button');
  pushButton.addEventListener('click', function() {
    if(isPushEnabled) {
      unsubscribe();
    } else {
      subscribe();
    }
  });

  // Check the support of service worker and then load the serviceWorker in hte background process(register)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(initialiseState);
  } else {
    console.warn('serviceWorker aren\'t supported in this browser.');
  }
});

function initialiseState() {
  // Check the support of notification api
  if(!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.warn('Notification aren\'t supported');
    return;
  }
  // Check the permission of receiving notification
  if(Notification.permission === 'denied') {
    console.warn('The user has blocked notification');
    return;
  }

  // Check the support of push api
  if(!('PushManager' in window)) {
    console.warn('Push messaging isn\'t supported');
    return;
  }

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      var pushButton = document.querySelector('.js-push-button');
      pushButton.disabled = false;

      if(!subscription) {
        // Let the UI enable the push
        return;
      }

      sendSubscriptionToServer(subscription);

      pushButton.textContent = 'Disable the Push Messages';
      isPushEnabled = true
    })
    .catch(function(err) {
      console.warn('Error during getSubscription()', err);
    });
  });
}

function subscribe() {
  var pushButton = document.querySelector('.js-push-button');
  pushButton.disabled = true;
  navigator.serviceWorker.getRegistration().then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
    .then(function(subscription) {
      isPushEnabled = true;
      pushButton.textContent = 'Disable Push Messages';
      pushButton.disabled = false;

      return sendSubscriptionToServer(subscription);
    })
    .catch(function(e) {
      if(Notification.permission === 'denied') {
        console.warn('Permission for Notifications was denied');
        pushButton.disabled = true;
      } else {
        console.error('Unable to subscribe to push.', e);
        pushButton.disabled = false;
        pushButton.textContent = 'Enable Push Messages';
      }
    });
  });
}

//get the registrationId
function sendSubscriptionToServer(subscription) {
  console.log(JSON.stringify(subscription));
  var endpoint = subscription.endpoint;
  if(endpoint.startsWith('https://android.googleapis.com/gcm/send')) {
    endpointParts = endpoint.split('/')
    registrationId  = endpointParts[endpointParts.length - 1]

    console.log('registrationId: ',registrationId);
  }
}

function unsubscribe() {
  var pushButton = document.querySelector('.js-push-button');
  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.getSubscription().then(
      function(pushSubscription) {
        if(!pushSubscription) {
          isPushEnabled = false;
          pushButton.disabled =false;
          pushButton.textContent = 'Enable Push Messages';
          return;
        }

        var subscriptionId = pushSubscription.subscriptionId;

        pushSubscription.unsubscribe().then(function(successful) {
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages';
          isPushEnabled = false;
        }).catch(function(e) {
          console.log('Unsubscription error: ', e);
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages';
        });
      }).catch(function(e) {
        console.error('Error thrown while unsubscribing from push messaging.', e);
      });
  });
}
