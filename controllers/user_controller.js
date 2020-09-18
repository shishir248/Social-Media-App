module.exports.profile = function (req, resp) {
  return resp.render("users.ejs", {
    title: "Users",
  });
};

module.exports.post = function (req, resp) {
  console.log("Hi");
};
