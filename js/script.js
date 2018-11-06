(function() {
    var Element = {
        PSEUDO_INPUT: document.querySelector('.pseudo-input'),
        NEW_HASHTAG_INPUT: document.querySelector('.new-hashtag')
    };

    var ErrorMessage = {
        SAME_HASHTAG: 'You have already added the same hashtag',
        EMPTY_STRING: 'You can\'t just add an empty string'
    };

    var EMPTY_STRING_REGEXP = /([^\s])/;

    var KEY_CODE_ENTER = 13;

    var hashtags = [];

    var createHashtagSpan = function() {
        var newHashtag = document.createElement('span');
        newHashtag.classList.add('hashtag-wrap');
        newHashtag.textContent = Element.NEW_HASHTAG_INPUT.value;

        Element.PSEUDO_INPUT.insertBefore(newHashtag, Element.NEW_HASHTAG_INPUT);

        var deleteButton = document.createElement('i');
        deleteButton.classList.add('delete', 'delete-button');
        newHashtag.appendChild(deleteButton);
    };

    var addHashtag = function(evt) {
        createHashtagSpan();

        hashtags.push(Element.NEW_HASHTAG_INPUT.value);

        Element.NEW_HASHTAG_INPUT.value = '';
    };

    var removeHashtag = function(evt) {
        if (evt.target.tagName.toLowerCase() == 'i') {
            var thisHashtag = evt.target.parentNode;

            thisHashtag.parentNode.removeChild(thisHashtag);
            hashtags.splice(hashtags.findIndex(function(el) {
                return el == thisHashtag.textContent;
            }), 1);
        }
    };

    var displayError = function(message) {
        alert(message);
    };

    var validateHashtag = function(evt) {
        if (evt.keyCode == KEY_CODE_ENTER) {

            // Check for same hashtag
            if (hashtags.some(function(el) {
                    return el == Element.NEW_HASHTAG_INPUT.value;
                })) {
                return displayError(ErrorMessage.SAME_HASHTAG);
            }

            // Check for pattern
            if (!EMPTY_STRING_REGEXP.test(Element.NEW_HASHTAG_INPUT.value)) {
                return displayError(ErrorMessage.EMPTY_STRING);
            }

            addHashtag();
        }
    };

    Element.NEW_HASHTAG_INPUT.addEventListener('keydown', validateHashtag);
    Element.PSEUDO_INPUT.addEventListener('click', removeHashtag);
})();