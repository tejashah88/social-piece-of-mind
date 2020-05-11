function saveOptions() {
    const scanForActiveXAgo   = document.getElementById('scan-active-x-ago-status').checked;
    const scanForSeenBy       = document.getElementById('scan-seen-by-status').checked;
    const scanForDelivery     = document.getElementById('scan-delivery-status').checked;

    chrome.storage.sync.set({
        scanForActiveXAgo,
        scanForSeenBy,
        scanForDelivery
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved!';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        scanForActiveXAgo: true,
        scanForSeenBy: true,
        scanForDelivery: true
    }, function(items) {
        document.getElementById('scan-active-x-ago-status').checked = items.scanForActiveXAgo;
        document.getElementById('scan-seen-by-status').checked = items.scanForSeenBy;
        document.getElementById('scan-delivery-status').checked = items.scanForDelivery;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
