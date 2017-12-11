var verifyToken = require('../auth/authentication');

module.exports = function(router, passport) {

    router.post('/register',
        passport.authenticate('local-signup'),
        function(req, res) {
            res.status(200).json({ user: req.user.email
        });
    });

    router.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user.email
        });
    });

    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user, message: "Welcome!"
        });
    });

    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });



    // ========================Endpoints (move to another file?)=================== //
    
    // ============/projects============ //
    router.route('/projects')
        .get(require('./project').getAll)
        .post(verifyToken, require('./project').addProject) 

    router.route('/projects/:id')
        .get(require('./project').getOne)
        // .delete(require('./project').remove) // We don't need this though (authentification required if we do)
    
    router.route('/projects/:id/popularity')
        .put(require('./project').updatePopularity)

    router.route('/projects/:id/status')
        .put(verifyToken, require('./project').toggleStatus) 

    // ============/tags============ //
    router.route('/tags')
        .get(require('./tag').getAll)
        // .post(require('./tag').post) // IMPORTANT: assume that the only way to connect project & tag is through posting in project (not implemented here)

    router.route('/tags/:id')
        .get(require('./tag').getOne) // Will return the tag and the actual projects (.projects)

    return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}


// ==========Meh========= //
// router.route('/projects/:id')
//     .put(require('./project').update)
    

// router.route('/projects/:id/tags')
//     .get(require('./project').getTags)
//     .post(require('./project').addTags)



// router.route('/tags/:id')
//     .put(require('./tag').update)
//     .delete(require('./tag').remove)