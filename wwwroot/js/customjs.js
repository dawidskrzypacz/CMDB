setTimeout(function() {
    // Creating and dispatching a custom event to close the alert
    const closeAlertEvent = new Event('closeAlert');
    window.dispatchEvent(closeAlertEvent);
}, 4000);