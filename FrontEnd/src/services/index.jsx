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
}

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
}