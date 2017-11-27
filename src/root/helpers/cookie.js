

export const getCookie = name => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (2 === parts.length) return parts.pop().split(";").shift();
};

export const eraseCookie = name => {
    document.cookie = name + '=; Max-Age=0'
};

