let BASE_URL = "http://ec2-18-220-137-59.us-east-2.compute.amazonaws.com"
let GET = "GET";
let POST = "POST";
let PUT = "PUT";
let PATCH = "PATCH";
let DELETE = "DELETE";
let JSON_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

let TEMPLATE = (params, firstResponse) => {
    var body = JSON.stringify({
        params: params,
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        BASE_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    )
        .then((response) => {
            firstResponse();
            return (response.json());
        }
        );
}

/**
 * 
 */
let AUTH_URL = BASE_URL + "/auth"

/**
 * For registering a new user.
 * @param {string} email 
 * @param {string} password 
 * @param {string} password_confirmation 
 * @param {function} firstResponse 
 * @returns object with user data
 */
let AUTH_POST = (email, password, password_confirmation, firstResponse) => {
    var body = JSON.stringify({

    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(AUTH_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }).then((response) => {
            firstResponse();
            return (response.json());
        });
}

/**
 * For signing in a current user.
 * @param {string} email 
 * @param {string} password 
 * @param {function} firstResponse 
 * @returns object with user data
 */
let AUTH_POST_SIGN_IN = (email, password, firstResponse) => {
    var body = JSON.stringify({

    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        AUTH_URL + "/sign_in",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        firstResponse();
        return (response.json());
    });
}

let BLOCKS_URL = BASE_URL + "/blocks";

let CONVERSATION_USERS_URL = BASE_URL + "/conversation_users";

let CONVERSATIONS_URL = BASE_URL + "/conversations";

let CREDIT_HISTORIES_URL = BASE_URL + "/credit_histories";

let FEEDS_URL = BASE_URL + "/feeds";

let FOLLOWS_URL = BASE_URL + "/follows";

let FRIENDS_URL = BASE_URL + "/friends";

let GROUP_TAGS_URL = BASE_URL + "/group_tags";

let GROUPS_URL = BASE_URL + "/groups";

/**
 * Deletes a group.
 * @param {*} firstResponse 
 */
let GROUPS_DELETE = (firstResponse) => {

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        GROUPS_URL + "/delete",
        {
            method: DELETE,
            headers: JSON_HEADERS,
        }
    )
        .then((response) => {
            firstResponse();
            return (response.json());
        }
        );
}

let NOTIFICATIONS_URL = BASE_URL + "/notifications";

let POST_LIKES_URL = BASE_URL + "/post_likes";

let POSTS_URL = BASE_URL + "/posts";

let PRIVATE_MESSAGES_URL = BASE_URL + "/private_messages";

let REPORTS_URL = BASE_URL + "/reports";

let TOPIC_TAGS_URL = BASE_URL + "/topic_tags";

let TOPICS_URL = BASE_URL + "/topics";

let USERS_URL = BASE_URL + "/users";


export {
    AUTH_URL,
    AUTH_POST,
    AUTH_POST_SIGN_IN,

    BLOCKS_URL,
    CONVERSATION_USERS_URL,
    CONVERSATIONS_URL,
    CREDIT_HISTORIES_URL,
    FEEDS_URL,
    FOLLOWS_URL,
    FRIENDS_URL,
    GROUP_TAGS_URL,
    GROUPS_URL,
    NOTIFICATIONS_URL,
    POST_LIKES_URL,
    POSTS_URL,
    PRIVATE_MESSAGES_URL,
    REPORTS_URL,
    TOPIC_TAGS_URL,
    TOPICS_URL,
}