// import cookie from "js-cookie";

export const getItem = key => {
    try {
        return JSON.parse(localStorage.getItem(key))
    }
    catch (e) {
       console.log('Error with getting data from localStorage', e)
       return null
    }
}

export const setItem = (key, data) => {
    try {
        // cookie.set(key, JSON.stringify(data),{expires: 1})
        localStorage.setItem(key, JSON.stringify(data))
    }
    catch(e) {
        console.log('Error with setting data to localStorage', e)
    }
}
