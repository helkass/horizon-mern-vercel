const router = require("express").Router();
const {getAllBlogs, createBlog, getBlogById, deleteBlog} = require("../controller/blogs");
const { verifyToken } = require("../middleware/verifyToken");

router.get('/', getAllBlogs);

router.post('/create', createBlog);

router.get('/:id', getBlogById);

router.delete('/delete/:id', deleteBlog);

module.exports = router;
