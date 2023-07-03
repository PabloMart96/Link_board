export const registerUserService = async ({ username, email, password}) => {
    const response = await fetch(`http://localhost:3000/user`, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message);
    }
    return json.access;
};

export const loginUserService = async ({ email, password }) => {
    const response = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.access;
};

export const getMyDataService = async (token) => {
    const response = await fetch(`http://localhost:3000/user/profile`, {
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const getUserService = async (id, token) => {
    const response = await fetch(`http://localhost:3000/user/profile/${id}`, {
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const getLinksByIdService = async (id, token) => {
    const response = await fetch(`http://localhost:3000/user/links/${id}`, {
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const getSingleLinkService = async (id, token) => {
    const response = await fetch(`http://localhost:3000/links/link-detail/${id}`, {
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const getAllLinksService = async (token) => {
    const response = await fetch(`http://localhost:3000/links`, {
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    
    return json.data;
};

export const UpdateUserService = async ({ token, data }) => {
    const response = await fetch(`http://localhost:3000/user/profile`, {
        method: 'PUT',
        headers: {
            Authorization: token,
        },
        body: data,
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.message;
};

export const sendPostService = async ({ token, data }) => {
    const response = await fetch(`http://localhost:3000/links/create`, {
        method: "POST",
        body: data,
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const deletePostService = async ({ id, token }) => {
    const response = await fetch(`http://localhost:3000/links/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
};



