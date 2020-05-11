'use strict';

// NOTE/HACK: Bad idea to only check first element of child nodes
const getTargetElement = (element, searchChildren) => searchChildren ? element.childNodes[0] : element;

// NOTE/HACK: Provide a more flexible solution to access the target values
const fetchNodeValue   = (element) => element.nodeValue;
const fetchDataValue   = (element) => element.data;
const fetchAltValue    = (element) => element.attributes ? element.getAttribute('alt') : undefined;
const fetchTitleValue  = (element) => element.attributes ? element.getAttribute('title') : undefined;

const valueMapping = {
    'nodeValue' : fetchNodeValue,
    'data'      : fetchDataValue,
    'alt'       : fetchAltValue,
    'title'     : fetchTitleValue,
};

const UPDATE_INTERVAL = 100;
const REPEAT_COUNT = 10;

// This class is a fancy solution to get around the obfuscation from the HTML classes and elements IDs
// by providing a way to search for elements with the power of English :P
class NodeSearcher {
    _populateElements(selector, searchChildren) {
        return [...document.querySelectorAll(selector)]
            .filter(element => !!getTargetElement(element, searchChildren));
    }

    findNodes(selector, searchText, searchMode, searchChildren) {
        const elements = this._populateElements(selector, searchChildren);

        if (searchMode in valueMapping) {
            const fetchValue = valueMapping[searchMode];
            const textElements = elements.filter(element => {
                let textVal = fetchValue(getTargetElement(element, searchChildren));
                if (!textVal)
                    return false;
                if (!!searchText)
                    return RegExp(searchText, "u").test(textVal.trim())
                else
                    return true;
            });
            return textElements;
        } else
        return false;
    }
}

function hideNodes(nodes) {
    for (let node of nodes) {
        node.style.display = 'none';
    }
}

const nodeSearcher = new NodeSearcher();

function hideActiveAgoNodes() {
    const activeNodes = nodeSearcher.findNodes('div', 'Active', 'nodeValue', true);
    hideNodes(activeNodes);
}

function hideSeenByNodes() {
    const seenByNodes = nodeSearcher.findNodes('img', undefined, 'title', false);
    hideNodes(seenByNodes);
}

function hideDeliveryCircleNodes() {
    const sentCircles = nodeSearcher.findNodes('span', 'Sent', 'title', false);
    const deliveredCircles = nodeSearcher.findNodes('span', 'Delivered', 'title', false);
    const deliveryStatusNodes = [...sentCircles, ...deliveredCircles];
    hideNodes(deliveryStatusNodes);
}

// Source: https://stackoverflow.com/a/2956980
function setIntervalForXTimes(callback, delay, maxCount) {
    let count = 0;
    const intervalId = setInterval(function() {
        callback();
        console.log('lol');

        if (++count == maxCount) {
            clearInterval(intervalId);
        }
    }, delay);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'activate-piece-of-mind') {
            chrome.storage.sync.get({
                scanForActiveXAgo: true,
                scanForSeenBy: true,
                scanForDelivery: true
            }, function(items) {
                const { scanForActiveXAgo, scanForSeenBy, scanForDelivery } = items;
                
                if (scanForActiveXAgo)
                    hideActiveAgoNodes();

                // NOTE/HACK: 'Seen By' and delivery statuses are generated everytime you switch to a new person to chat,
                // and sometimes the components won't immediately appear. To get around this, we call the following functions
                // for a set number of times, delaying by a set interval of time. For example, if 'UPDATE_INTERVAL' was 100 (ms)
                // and 'REPEAT_COUNT' is 10, then the function would be called 10 times, delaying every 100 ms.
                if (scanForSeenBy)
                    setIntervalForXTimes(hideSeenByNodes, UPDATE_INTERVAL, REPEAT_COUNT);

                if (scanForDelivery)
                    setIntervalForXTimes(hideDeliveryCircleNodes, UPDATE_INTERVAL, REPEAT_COUNT);
            });
        }
    }
);
