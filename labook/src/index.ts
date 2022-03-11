import { app } from "./Data/app";
import UserController from "./Controller/User/UserController";
import PostController from "./Controller/Post/PostController";
import RelationController from "./Controller/Relations/RelationsController";
import LikeController from "./Controller/Like/LikeController";
import CommentController from "./Controller/Comment/CommentController";

const userController = new UserController()
const postController = new PostController()
const relationController = new RelationController()
const likeController = new LikeController()
const commentController = new CommentController()

app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)

app.get("/post/feed", postController.get)
app.get("/post/feed/:type", postController.getPostsByType)
app.post("/post/create", postController.create)
app.get("/post/:id", postController.find)

app.post("/relations/create", relationController.create)
app.delete("/relations/:id", relationController.delete)

app.post("/like", likeController.create)
app.post("/like/:id", likeController.delete)

app.post("/comment", commentController.create)