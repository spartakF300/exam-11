const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const config =require('../config');
const Item = require('../model/Item');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});



router.get('/', async (req, res) => {
    let category = null;

    if (req.query.category){
        const item = await Item.find({category: req.query.category})
        return res.send(item)
    }

    try {
        const items = await Item
            .find(category)
            .sort({datetime: -1});


        return res.send(items);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Item
            .findById(req.params.id)
            .populate('user')
            .populate('category');

        return res.send(item);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const itemData = req.body;
    console.log(itemData);
    itemData.user = req.user._id;

    if (req.file) {
        itemData.image = req.file.filename;
    }

    try {
        const item = new Item(itemData);

        await item.save();
        return res.send({message: 'Item added!', item});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id',auth,async (req, res)=>{
   const user = req.user;
    const item = await Item.findOne({_id:req.params.id});
    if(item.user.toString() !== user._id.toString()){
      return   res.status(403).send({message:'error'})
    }
    await Item.findByIdAndDelete({_id:req.params.id});
    res.send({message:'ок'})

});
module.exports= router;