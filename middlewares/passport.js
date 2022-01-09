const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : JWT_ACCESS_SECRET
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload);
        return prisma.user.findUnique({
            where: {
                id: jwtPayload.id
            }
        }).then(user => {
            return cb(null, user);
        }).catch(err => {
            return cb(err);
        });
    }
));