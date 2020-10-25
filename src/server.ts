import express from "express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import multer from "multer";
import uuidv4 from "uuid";
import path from "path";

import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import { tokenGenerator, verifyToken } from "./auth/authHandlers";
import { GooglePassport } from "./auth/googlePassport";
import { LinkedinPassport } from "./auth/linkedinPassport";
import convertFile from "./convertFile/convertFile";
import { updateLoginPhoto } from "./forms/photo/photo";

import helprs from "./helpers";

import * as jwt from "jsonwebtoken";

import "dotenv/config";
import * as dotenv from "dotenv";
import { Signup, localPassport } from "./auth/localPassport";
import bodyParser from "body-parser";
import { applyResultTransforms } from "graphql-tools";

LinkedinPassport;
GooglePassport;
localPassport;

dotenv.config();
const app = express();
app.use(express.json());
app.use(passport.initialize());

var router = express.Router();

// app.use(helmet());

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(__dirname + "/public"));
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
app.use(logger("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }));

app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  tokenGenerator
);

app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", {
    session: false,
    scope: ["r_emailaddress", "r_liteprofile"],
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
}).single("selectedFile");

interface MulterRequest extends Request {
  file: any;
}
app.post("/photo", (req, res) => {
  upload(req, res, function (err) {
    const base64string = convertFile(req.file.path);

    updateLoginPhoto(req.body.username, base64string);
    if (!err) {
      res.status(200).send({ upload: "success", photo: base64string });
    }
  });
});

app.get(
  "/auth/linkedin/redirect",
  passport.authenticate("linkedin", {
    session: false,
    failureRedirect: "/",
  }),
  tokenGenerator
);

app.post("/auth/signup", Signup);

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  tokenGenerator
);

// app.post(
//   "/login",
//   // wrap passport.authenticate call in a middleware function
//   function (req, res, next) {
//     console.log(req.body);
//     // call passport authentication passing the "local" strategy name and a callback function
//     passport.authenticate("local", function (error, user, info) {
//       // this will execute in any case, even if a passport strategy will find an error
//       // log everything to console
//       console.log(error);
//       console.log(user);
//       console.log(info);

//       if (error) {
//         res.status(401).send(error);
//       } else if (!user) {
//         res.status(401).send(info);
//       } else {
//         next();
//       }

//       res.status(401).send(info);
//     })(req, res);
//   },

//   // function to call once successfully authenticated
//   function (req, res) {
//     res.status(200).send("logged in!");
//   }
// );
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: verifyToken,
  debug: false,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(
    `\nGraphQL Server running on ---> http://localhost:${port}/graphql\n`
  )
);
