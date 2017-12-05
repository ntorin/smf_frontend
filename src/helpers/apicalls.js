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
    ).then((response) => {
        firstResponse();
        return (response.json());
    });
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
        email: email,
        password: password,
        password_confirmation: password_confirmation
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(AUTH_URL,
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
 * Gets all groups.
 * @param {string} sort_by 
 * @param {string} query 
 * @param {number} offset 
 * @param {number} limit 
 */
let GROUPS_POST_FETCH = (sort_by, query, offset, limit) => {

    var body = JSON.stringify({
        sort_by: sort_by,
        query: query,
        offset: offset,
        limit: limit,
    });

    return fetch(
        GROUPS_URL + "/fetch",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

/**
 * Gets a single group.
 * @param {*} group_id 
 * @param {*} firstResponse 
 */
let GROUPS_GET_SINGLE = (group_id, firstResponse) => {

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        GROUPS_URL + "/" + group_id,
        {
            method: GET,
            headers: JSON_HEADERS
        }
    ).then((response) => {
        firstResponse();
        return (response.json());
    });
}


let GROUPS_POST = (params, firstResponse) => {
    var body = JSON.stringify({
        params: params,
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        GROUPS_URL,
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

/**
 * Deletes a group.
 * @param {number} group_id
 * @param {*} firstResponse 
 */
let GROUPS_DELETE = (group_id, firstResponse) => {

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        GROUPS_URL + "/" + group_id,
        {
            method: DELETE,
            headers: JSON_HEADERS,
        }
    ).then((response) => {
        firstResponse();
        return (response.json());
    });
}

let NOTIFICATIONS_URL = BASE_URL + "/notifications";

let POST_LIKES_URL = BASE_URL + "/post_likes";

let POSTS_URL = BASE_URL + "/posts";

/**
 * 
 * @param {number} topic_id 
 * @param {number} offset 
 * @param {number} limit 
 * @param {*} firstResponse 
 */
let POSTS_POST_FETCH = (topic_id, offset, limit, firstResponse) => {
    var body = JSON.stringify({
        topic_id: topic_id,
        offset: offset,
        limit: limit
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        POSTS_URL + "/fetch",
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

let POSTS_POST = (firstResponse) => {
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
    ).then((response) => {
        firstResponse();
        return (response.json());
    });
}

/**
 * Deletes a post.
 * @param {*} post_id 
 * @param {*} firstResponse 
 */
let POSTS_DELETE = (post_id, firstResponse) => {

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        BASE_URL + "/" + post_id,
        {
            method: DELETE,
            headers: JSON_HEADERS,
        }
    ).then((response) => {
        firstResponse();
        return (response.json());
    });
}

let PRIVATE_MESSAGES_URL = BASE_URL + "/private_messages";

let REPORTS_URL = BASE_URL + "/reports";

let TOPIC_TAGS_URL = BASE_URL + "/topic_tags";

let TOPICS_URL = BASE_URL + "/topics";

/**
 * Gets topics from a starting index.
 * @param {number} group_id ID of the group that the topics are in
 * @param {string} sort_by sort options: recent,
 * @param {string} query search string; LIKE searches topic names
 * @param {number} offset starting index to pull topics from
 * @param {number} limit amount of topics you want to pull
 * @param {*} firstResponse 
 */
let TOPICS_POST_FETCH = (group_id, sort_by, query, offset, limit) => {

    var body = JSON.stringify({
        group_id: group_id,
        sort_by: sort_by,
        query: query,
        offset: offset,
        limit: limit
    });

    return fetch(
        TOPICS_URL + "/fetch",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body,
        }
    )
        .then((response) => {
            return (response.json());
        }
        );
}

/**
 * Gets a single topic.
 * @param {number} topic_id ID of the topic
 * @param {*} firstResponse 
 */
let TOPICS_GET_SINGLE = (topic_id, firstResponse) => {

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        TOPICS_URL + "/" + topic_id,
        {
            method: GET,
            headers: JSON_HEADERS
        })
        .then((response) => {
            firstResponse();
            return (response.json());
        });
}


let TOPICS_POST = (params, firstResponse) => {
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
 * Deletes a topic.
 * @param {number} topic_id
 * @param {*} firstResponse 
 */
let TOPICS_DELETE = (topic_id, firstResponse) => {

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        TOPICS_URL + "/" + topic_id,
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
    GROUPS_POST_FETCH,
    NOTIFICATIONS_URL,
    POST_LIKES_URL,
    POSTS_URL,
    POSTS_POST_FETCH,
    PRIVATE_MESSAGES_URL,
    REPORTS_URL,
    TOPIC_TAGS_URL,
    TOPICS_URL,
    TOPICS_POST_FETCH,
}