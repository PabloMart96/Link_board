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
}