const express = require('express');
// const db = require('./../modules/connect-mysql');
const upload = require('./../modules/upload-images');
const Product = require('./../models/Product');
const Member = require('./../models/Member')
const router = express.Router();

// 新增項目
router.post('/', async (req, res) => {
    // req.body.product_id
    // req.body.quantity
    // email, password, mobile, address,birthday
    res.json( await Member.add(req.body.email,req.body.password,req.body.mobile,req.body.address,req.body.birthday));
    // member_sid, name, mobile, orderprice, delivery, receiver, delivery_address, card
});

// 讀取單筆
router.get('/:id',async (req, res) => {
    const output = {
        success: false,
        data: null,
    };
    output.data = await Member.findOne(req.params.id);
    if(output.data){
        output.success = true;
    }
    res.json(output);
} );

// 修改
router.put('/:id', async (req, res) => {
    const output = {
        success: false,
        result: null,
    };
    const p1 = await Member.findOne(req.params.id);
    if(p1){
        output.success = true;
        // console.log(req.body.bookname)
        output.result = await p1.edit(req.body);
        // console.log(output.result)
    }
    res.json(output);
});



module.exports = router;