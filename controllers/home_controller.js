/*How to define action 
    module.exports.actionName=function(req,resp){

    };
*/

//Defining an action for home
module.exports.home = function (req, resp) {
  return resp.render("home", {
    title: "Codeial",
  });
};
