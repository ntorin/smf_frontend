import { user } from 'helpers/constants';

let BASE_URL = "https://api.citru.me"
let GET = "GET";
let POST = "POST";
let PUT = "PUT";
let PATCH = "PATCH";
let DELETE = "DELETE";
var JSON_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'access-token': '',
    'token-type': '',
    'client': '',
    'expiry': '',
    'uid': '',
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

let CONVERSATION_MESSAGES_POST = (conversation_id, message) => {
    var body = JSON.stringify({
        user_id: user.id,
        conversation_id: conversation_id,
        message: message
    })

    return fetch(
        CONVERSATION_MESSAGES_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let CONVERSATION_MESSAGES_POST_FETCH = (conversation_id, page) => {
    var body = JSON.stringify({
        conversation_id: conversation_id,
        page: page
    })

    return fetch(
        CONVERSATION_MESSAGES_URL + "/fetch",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let CONVERSATION_USERS_URL = BASE_URL + "/conversation_users";

let CONVERSATION_USERS_POST = (conversation_id) => {
    var body = JSON.stringify({
        user_id: user.id,
        conversation_id: conversation_id
    })

    return fetch(
        CONVERSATION_USERS_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let CONVERSATION_USERS_POST_FETCH = (conversation_id, page) => {
    var body = JSON.stringify({
        conversation_id: conversation_id,
        page: page
    })

    return fetch(
        CONVERSATION_USERS_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let CONVERSATION_USERS_PUT_UPDATE = (conversation_user_id, is_muted) => {
    var body = JSON.stringify({
        is_muted: is_muted
    });

    return fetch(
        CONVERSATION_USERS_URL + "/" + conversation_user_id,
        {
            method: PUT,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let CONVERSATIONS_URL = BASE_URL + "/conversations";

let CONVERSATIONS_POST = (name, description, is_group) => {
    var body = JSON.stringify({
        name: name,
        description: description,
        is_group: is_group,
    })

    return fetch(
        CONVERSATIONS_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let CONVERSATIONS_POST_FETCH = (sort_by, query, page) => {
    var body = JSON.stringify({
        user_id: user.id,
        sort_by: sort_by,
        query: query,
        page: page
    })

    return fetch(
        CONVERSATIONS_URL + "/fetch",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let CONVERSATIONS_PUT_UPDATE = (conversation_id, is_muted) => {
    var body = JSON.stringify({
        is_muted: is_muted
    });

    return fetch(
        CONVERSATIONS_URL + "/" + conversation_id,
        {
            method: PUT,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let CREDIT_HISTORIES_URL = BASE_URL + "/credit_histories";

let FEEDS_URL = BASE_URL + "/feeds";

let FEEDS_POST_FETCH = (fetch_type, activity_id, page) => {
    var body = JSON.stringify({
        user_id: user.id,
        fetch_type: fetch_type,
        activity_id: activity_id,
        page: page
    })

    return fetch(
        FEEDS_URL + "/fetch",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let FOLLOWS_URL = BASE_URL + "/follows";

let FOLLOWS_POST = (following_id) => {
    var body = JSON.stringify({
        following_id: following_id,
        follower_id: user.id
    });

    return fetch(
        FOLLOWS_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let FOLLOWS_POST_CHECK_REQUEST = (following_id) => {
    var body = JSON.stringify({
        user_id: user.id,
        following_id: following_id
    })

    return fetch(
        FOLLOWS_URL + '/check_request',
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let FOLLOWS_POST_MY_FOLLOWS = (user_id, page) => {
    var body = JSON.stringify({
        user_id: user_id,
        page: page
    });

    return fetch(
        FOLLOWS_URL + "/my_follows",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let FOLLOWS_DELETE = (follow_id) => {
    return fetch(
        FOLLOWS_URL + '/' + follow_id,
        {
            method: DELETE,
            headers: JSON_HEADERS
        }
    )
}

let FRIENDS_URL = BASE_URL + "/friends";

let FRIENDS_POST_FETCH = (fetch_type, page) => {
    var body = JSON.stringify({
        user_id: user.id,
        fetch_type: fetch_type,
        page: page
    });

    return fetch(
        FRIENDS_URL + "/fetch",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let FRIENDS_POST = (friend_one, friend_two) => {
    var body = JSON.stringify({
        friend_one: friend_one,
        friend_two: friend_two,
        is_accepted: false
    });

    return fetch(
        FRIENDS_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let FRIENDS_POST_ACCEPT_REQUEST = (request_id) => {
    var body = JSON.stringify({
        request_id: request_id
    });
    return fetch(
        FRIENDS_URL + "/accept_request",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let FRIENDS_POST_CHECK_REQUEST = (friend_id) => {
    var body = JSON.stringify({
        user_id: user.id,
        friend_id: friend_id
    })

    return fetch(
        FRIENDS_URL + "/check_request",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let FRIENDS_DELETE = (friend_id) => {
    return fetch(
        FRIENDS_URL + '/' + friend_id,
        {
            method: DELETE,
            headers: JSON_HEADERS
        }
    )
}

let GROUPS_URL = BASE_URL + "/groups";

/**
 * Gets all groups.
 * @param {string} sort_by
 * @param {string} query
 * @param {number} page
 */
let GROUPS_POST_FETCH = (sort_by, query, page) => {

    var body = JSON.stringify({
        sort_by: sort_by,
        query: query,
        page: page
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

let GROUPS_POST_MY_GROUPS = (user_id, page) => {

    var body = JSON.stringify({
        user_id: user_id,
        page: page
    });

    return fetch(
        GROUPS_URL + "/my_groups",
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
 */
let GROUPS_GET_SINGLE = (group_id) => {

    return fetch(
        GROUPS_URL + "/" + group_id,
        {
            method: GET,
            headers: JSON_HEADERS
        }
    ).then((response) => {
        return (response.json());
    });
}


/**
 * Creates a group.
 *
 * @param {string} identifier
 * @param {string} name
 * @param {string} description
 * @param {string} tags
 */
let GROUPS_POST = (identifier, name, description, group_type, tags) => {
    var body = JSON.stringify({
        user_id: user.id,
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

    return fetch(
        GROUPS_URL,
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
 * Deletes a group.
 * @param {number} group_id
 */
let GROUPS_DELETE = (group_id) => {

    return fetch(
        GROUPS_URL + "/" + group_id,
        {
            method: DELETE,
            headers: JSON_HEADERS,
        }
    )
}

let GROUPS_POST_VALIDATE_IDENTIFIER = (identifier) => {
    var body = JSON.stringify({
        identifier: identifier,
    });

    return fetch(
        GROUPS_URL + "/validate_identifier",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let GROUP_USERS_URL = BASE_URL + "/group_users";

let GROUP_USERS_POST = (group_id) => {
    var body = JSON.stringify({
        group_id: group_id,
        user_id: user.id
    });

    return fetch(
        GROUP_USERS_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let GROUP_USERS_POST_FETCH = (group_id, page) => {
    var body = JSON.stringify({
        group_id: group_id,
        page: page
    });

    return fetch(
        GROUP_USERS_URL + "/fetch",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let GROUP_USERS_POST_CHECK_REQUEST = (group_id) => {
    var body = JSON.stringify({
        user_id: user.id,
        group_id: group_id
    })

    return fetch(
        GROUP_USERS_URL + "/check_request",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let GROUP_USERS_PUT_UPDATE = (group_user_id, role, is_banned) => {
    var body = JSON.stringify({
        role: role,
        is_banned: is_banned
    });

    return fetch(
        GROUP_USERS_URL + "/" + group_user_id,
        {
            method: PUT,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let GROUP_USERS_DELETE = (group_user_id) => {
    return fetch(
        GROUP_USERS_URL + "/" + group_user_id,
        {
            method: DELETE,
            headers: JSON_HEADERS,
        }
    )
}

let NOTIFICATIONS_URL = BASE_URL + "/notifications";

let NOTIFICATIONS_POST_FETCH = (page) => {
    var body = JSON.stringify({
        user_id: user.id,
        page: page
    });

    return fetch(
        NOTIFICATIONS_URL + "/fetch",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let POST_LIKES_URL = BASE_URL + "/post_likes";

let POSTS_URL = BASE_URL + "/posts";

/**
 *
 * @param {number} topic_id
 * @param {number} page
 */
let POSTS_POST_FETCH = (topic_id, page) => {
    var body = JSON.stringify({
        topic_id: topic_id,
        page: page
    });

    return fetch(
        POSTS_URL + "/fetch",
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
 * Creates a post.
 * @param {number} group_id
 * @param {number} topic_id
 * @param {string} number
 * @param {boolean} is_op
 * @param {boolean} is_anonymous
 */
let POSTS_POST = (group_id, topic_id, content, is_op, is_anonymous) => {
    var body = JSON.stringify({
        group_id: group_id,
        topic_id: topic_id,
        user_id: user.id,
        content: content,
        is_op: is_op,
        is_anonymous: is_anonymous,
        likes: 0,
        dislikes: 0,
    });

    return fetch(
        POSTS_URL,
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
 * Deletes a post.
 * @param {*} post_id
 */
let POSTS_DELETE = (post_id) => {

    return fetch(
        BASE_URL + "/" + post_id,
        {
            method: DELETE,
            headers: JSON_HEADERS,
        }
    )
}

let REFERRALS_URL = BASE_URL + "/referrals";

let REFERRALS_POST = (referrer_id) => {
    var body = JSON.stringify({
        user_id: user.id,
        referrer_id: referrer_id
    });

    return fetch(
        REFERRALS_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body,
        }
    ).then((response) => {
        return (response.json());
    });
}

let REFERRALS_POST_CHECK_USER = (referrer) => {
    var body = JSON.stringify({
        referrer: referrer_id
    });

    return fetch(
        REFERRALS_URL + "/check_user",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body,
        }
    ).then((response) => {
        return (response.json());
    });
}

let REPORTS_URL = BASE_URL + "/reports";

let REPORTS_POST = (group_id, reported_id, reason, comment) => {
    var body = JSON.stringify({
        group_id: group_id,
        reporter_id: user.id,
        reported_id: reported_id,
        reason: reason,
        comment: comment
    });

    return fetch(
        REPORTS_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}


let TOPICS_URL = BASE_URL + "/topics";

/**
 * Gets topics from a starting index.
 * @param {number} group_id ID of the group that the topics are in
 * @param {string} sort_by sort options: recent,
 * @param {string} query search string; LIKE searches topic names
 * @param {number} page
 */
let TOPICS_POST_FETCH = (group_id, sort_by, pinned, query, page) => {

    var body = JSON.stringify({
        group_id: group_id,
        sort_by: sort_by,
        query: query,
        page: page,
        pinned: pinned,
    });

    return fetch(
        TOPICS_URL + "/fetch",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body,
        }
    ).then((response) => {
        return (response.json());
    });
}

/**
 * Gets a single topic.
 * @param {number} topic_id ID of the topic
 */
let TOPICS_GET_SINGLE = (topic_id) => {

    return fetch(
        TOPICS_URL + "/" + topic_id,
        {
            method: GET,
            headers: JSON_HEADERS
        })
        .then((response) => {
            return (response.json());
        });
}

/**
 * Creates a topic.
 * @param {number} group_id
 * @param {string} title
 * @param {number} topic_type
 * @param {string} tags
 */
let TOPICS_POST = (group_id, title, topic_type, tags) => {
    var body = JSON.stringify({
        group_id: group_id,
        user_id: user.id,
        title: title,
        topic_type: topic_type,
        tags: tags,
    });

    return fetch(
        TOPICS_URL,
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    )
        .then((response) => {
            return (response.json());
        });
}

let TOPICS_PUT_UPDATE = (topic_id, is_pinned, is_locked) => {
    var body = JSON.stringify({
        is_pinned: is_pinned,
        is_locked: is_locked,
    });

    return fetch(
        TOPICS_URL + "/" + topic_id,
        {
            method: PUT,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

/**
 * Deletes a topic.
 * @param {number} topic_id
 */
let TOPICS_DELETE = (topic_id) => {

    return fetch(
        TOPICS_URL + "/" + topic_id,
        {
            method: DELETE,
            headers: JSON_HEADERS,
        }
    )
}

let USERS_URL = BASE_URL + "/users";

let USERS_POST_FETCH = (identifier, name, sort_by, page) => {
    var body = JSON.stringify({
        identifier: identifier,
        name: name,
        sort_by: sort_by,
        page: page
    });

    return fetch(
        USERS_URL + '/fetch',
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let USERS_POST_VALIDATE_IDENTIFIER = (identifier) => {
    var body = JSON.stringify({
        identifier: identifier,
    });

    return fetch(
        USERS_URL + "/validate_identifier",
        {
            method: POST,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let USERS_PUT_UPDATE = (name, blurb, birthday) => {
    var body = JSON.stringify({
        name: name,
        blurb: blurb,
        birthday: birthday,
    });

    return fetch(
        USERS_URL + "/" + user.id,
        {
            method: PUT,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let USERS_PUT_CREATE_IDENTIFIER = (identifier) => {
    var body = JSON.stringify({
        identifier: identifier
    });

    return fetch(
        USERS_URL + "/" + user.id,
        {
            method: PUT,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}

let USERS_PUT_CREATE_NAME = (name) => {
    var body = JSON.stringify({
        name: name
    });

    return fetch(
        USERS_URL + "/" + user.id,
        {
            method: PUT,
            headers: JSON_HEADERS,
            body: body
        }
    ).then((response) => {
        return (response.json());
    });
}



export {
    JSON_HEADERS,

    AUTH_POST,
    AUTH_POST_SIGN_IN,

    CONVERSATION_MESSAGES_POST,
    CONVERSATION_MESSAGES_POST_FETCH,

    CONVERSATION_USERS_POST,
    CONVERSATION_USERS_POST_FETCH,
    CONVERSATION_USERS_PUT_UPDATE,

    CONVERSATIONS_POST,
    CONVERSATIONS_POST_FETCH,
    CONVERSATIONS_PUT_UPDATE,

    FEEDS_POST_FETCH,

    FOLLOWS_POST,
    FOLLOWS_POST_CHECK_REQUEST,
    FOLLOWS_POST_MY_FOLLOWS,
    FOLLOWS_DELETE,

    FRIENDS_POST_FETCH,
    FRIENDS_POST,
    FRIENDS_POST_ACCEPT_REQUEST,
    FRIENDS_POST_CHECK_REQUEST,
    FRIENDS_DELETE,

    GROUP_USERS_POST,
    GROUP_USERS_POST_CHECK_REQUEST,
    GROUP_USERS_POST_FETCH,
    GROUP_USERS_PUT_UPDATE,
    GROUP_USERS_DELETE,

    GROUPS_POST,
    GROUPS_POST_FETCH,
    GROUPS_POST_MY_GROUPS,
    GROUPS_POST_VALIDATE_IDENTIFIER,

    NOTIFICATIONS_POST_FETCH,

    POSTS_POST,
    POSTS_POST_FETCH,
    POSTS_DELETE,

    REPORTS_POST,

    TOPICS_POST,
    TOPICS_POST_FETCH,
    TOPICS_PUT_UPDATE,
    TOPICS_DELETE,

    USERS_POST_FETCH,
    USERS_POST_VALIDATE_IDENTIFIER,
    USERS_PUT_UPDATE,
    USERS_PUT_CREATE_IDENTIFIER,
    USERS_PUT_CREATE_NAME
}
