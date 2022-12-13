const Item = require("../models/item");

// CREATE ITEM
const createItem = (req, res) => {
    const formData = req.body;

    try {
        Item.create(formData, function(err, data){
            if(err) res.status(400).json({
                status: false,
                message: err.message
            })
            res.status(201).json({
                status: true,
                message: "Item hes been created",
                data: data
            })
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        })
    }
}

// GET ITEMS
const getAllItems = async (req, res) =>{
    try {
        await Item.find().then(response => {
            res.status(200).json({
                status: true,
                messsgae: "GET All Items Success",
                data: response
            })
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        })
    }
}

// GET BLOG BY ID
const getItemById = (req, res) => {
    const id = req.params.id

    try {
        Item.findById(id).then(data => {
            res.status(200).json({
                status: true,
                message: "SUCCESS CALL",
                data: data
            })
        }).catch(err => {
            res.status(404).json({
                status: false,
                message: err.message
            })
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: []
        })
    }
}

const deleteItem = (req, res) => {
    const id = req.params.id;

    try {
        Item.findByIdAndDelete(id).then(() =>{
            res.status(200).json({
                status: true,
                message: "Item has been deleted"
            })
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            mesage: error.message,
            data: []
        })
    }
}


module.exports = {
    createItem,
    getAllItems,
    getItemById,
    deleteItem
}