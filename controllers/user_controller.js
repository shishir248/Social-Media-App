module.exports.profile = function (req, resp) {
    resp.send('<h1>User Profile </h1>');
};

module.exports.post = function (req, resp) {
    console.log('Hi');
}