const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        
        // Create a new user object with the provided email and username
        const newUser = new User({ email, username });
        
        // Log the new user object before registration
        console.log("New User (Before Registration):", newUser);
        
        // Register the new user with Passport Local Mongoose
        const registeredUser = await User.register(newUser, password);
        
        // Continue with login and redirection upon successful registration
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });
    } catch (e) {
        console.error("Signup Error:", e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);
};
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
    };