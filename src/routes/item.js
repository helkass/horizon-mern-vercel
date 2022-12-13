const router = requires("express").Router();
const {getAllItems, createItem, getItemById, deleteItem} = require("../controller/items");

router.get('/', getAllItems);

router.get('/:id', getItemById);

router.post('/create', createItem);

router.delete('/delete/:id', deleteItem);

module.exports = router;