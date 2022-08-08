const res = require('express/lib/response');
const path = require('path');

const controladorAdmin = {

    dashboardUsers: (req, res) =>{
        res.render (path.join(__dirname,"../views/dashboardUsers.ejs"));
    },

    editUser: (req, res) =>{
        res.render (path.join(__dirname,"../views/editUser.ejs"));
    },

    panel: (req, res) =>{
        res.render (path.join(__dirname,"../views/panelAdmin.ejs"));
    }

};

module.exports = controladorAdmin;