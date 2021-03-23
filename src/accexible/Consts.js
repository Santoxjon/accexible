export const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const FULLNAME_REGEX = /^[a-zA-Z\u00C0-\u017F\s]+$/;