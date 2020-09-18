/*How to define action 
    module.exports.actionName=function(req,resp){

    };
*/

//Defining an action for home
module.exports.home = function (req, resp) {
    resp.send('<h1>Express Controller is running!</h1>')
};