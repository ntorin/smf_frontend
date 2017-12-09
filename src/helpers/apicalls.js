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
        firstResponse(response);
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
      email: email,
      password: password,
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
        firstResponse(response);
        return (response.json());
    });
}

let BLOCKS_URL = BASE_URL + "/blocks";

let CONVERSATION_MESSAGES_URL = BASE_URL + "/conversation_messages";

let CONVERSATION_USERS_URL = BASE_URL + "/conversation_users";

let CONVERSATIONS_URL = BASE_URL + "/conversations";

let CREDIT_HISTORIES_URL = BASE_URL + "/credit_histories";

let FEEDS_URL = BASE_URL + "/feeds";

let FOLLOWS_URL = BASE_URL + "/follows";

let FOLLOWS_POST = (following_id, follower_id, firstResponse) => {
    var body = JSON.stringify({
        following_id: following_id,
        follower_id: follower_id
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        FOLLOWS_URL,
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

let FRIENDS_URL = BASE_URL + "/friends";

let FRIENDS_FETCH = (user_id, fetch_type, offset, limit, firstResponse) => {
    var body = JSON.stringify({
      user_id: user_id,
      fetch_type: fetch_type,
      offset: offset,
      limit: limit
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        FRIENDS_URL + "/fetch",
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

let FRIENDS_POST = (friend_one, friend_two, firstResponse) => {
    var body = JSON.stringify({
        friend_one: friend_one,
        friend_two: friend_two
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        FRIENDS_URL,
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

let FRIENDS_POST_ACCEPT_REQUEST = (request_id, firstResponse) => {
    var body = JSON.stringify({
      request_id: request_id
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        FRIENDS_URL + "/accept_request",
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


/**
 * Creates a group.
 *
 * @param {number} creator_id
 * @param {string} identifier
 * @param {string} name
 * @param {string} description
 * @param {string} tags
 * @param {*} firstResponse
 */
let GROUPS_POST = (creator_id, identifier, name, description, group_type, tags, firstResponse) => {
    var body = JSON.stringify({
        creator_id: creator_id,
        identifier: identifier,
        name: name,
        description: description,
        group_type: group_type,
        tags: tags,
        member_count: 0,
        topic_count: 0,
        post_count: 0,
        lat: 0.0,
        lng: 0.0
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

let GROUPS_POST_VALIDATE_IDENTIFIER = (identifier, firstResponse) => {
    var body = JSON.stringify({
        identifier: identifier,
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        GROUPS_URL + "/validate_identifier",
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

let GROUP_USERS_URL = BASE_URL + "/group_users";

let GROUP_USERS_POST = (group_id, user_id, firstResponse) => {
    var body = JSON.stringify({
      group_id: group_id,
      user_id: user_id
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        GROUP_USERS_URL,
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



/**
 * Creates a post.
 * @param {number} topic_id
 * @param {number} creator_id
 * @param {string} number
 * @param {boolean} is_op
 * @param {boolean} is_anonymous
 */
let POSTS_POST = (group_id, topic_id, creator_id, content, is_op, is_anonymous, firstResponse) => {
    console.log("connecting to " + POSTS_URL);
    var body = JSON.stringify({
        group_id: group_id,
        topic_id: topic_id,
        creator_id: creator_id,
        content: content,
        is_op: is_op,
        is_anonymous: is_anonymous,
        likes: 0,
        dislikes: 0,
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        POSTS_URL,
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

let REPORTS_URL = BASE_URL + "/reports";

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

/**
 * Creates a topic.
 * @param {number} group_id
 * @param {number} creator_id
 * @param {string} title
 * @param {number} topic_type
 * @param {string} tags
 */
let TOPICS_POST = (group_id, creator_id, title, topic_type, tags, firstResponse) => {
    var body = JSON.stringify({
        group_id: group_id,
        creator_id,
        title: title,
        topic_type: topic_type,
        tags: tags,
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        TOPICS_URL,
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

let USERS_POST_FETCH = (identifier, name, sort_by, offset, limit) => {
    var body = JSON.stringify({
        identifier: identifier,
        name: name,
        sort_by: sort_by,
        offset: offset,
        limit: limit
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        USERS_URL + '/fetch',
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

let USERS_POST_VALIDATE_IDENTIFIER = (identifier) => {
    var body = JSON.stringify({
        identifier: identifier,
    });

    if (firstResponse == null) {
        firstResponse = () => { };
    }

    return fetch(
        USERS_URL + "/validate_identifier",
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


export {
    AUTH_POST,
    AUTH_POST_SIGN_IN,

    FOLLOWS_POST,

    FRIENDS_FETCH,
    FRIENDS_POST,
    FRIENDS_POST_ACCEPT_REQUEST,

    GROUP_USERS_POST,

    GROUPS_POST,
    GROUPS_POST_FETCH,
    GROUPS_POST_VALIDATE_IDENTIFIER,

    POSTS_POST,
    POSTS_POST_FETCH,

    TOPICS_POST,
    TOPICS_POST_FETCH,

    USERS_POST_FETCH,
    USERS_POST_VALIDATE_IDENTIFIER
}
