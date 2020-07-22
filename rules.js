export const email = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

export const max = (value, limit) => {
     return value <= limit
}

export const min = (value, limit) => {
    return value >= limit
}

export const maxLength = (value, limit) => {
    return value.length <= limit
}

export const minLength = (value, limit) => {
    return value.length >= limit
}