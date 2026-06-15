const formatDate = (date) => {
    return new Date(date).toLocaleString();
}

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {formatDate, validateEmail};