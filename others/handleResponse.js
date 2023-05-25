module.exports = handleResponse = (res, code, statusMsg) => {
    res.status(code).json({ message : statusMsg })
}