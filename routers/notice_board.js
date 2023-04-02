const express = require('express');
const router = express.Router();
const noticeboard = require('../models/notice_board');


router.get('/', async(req, res) => {
    let idx = req.query.idx;
    let data;
    if(!(idx)) {
        // http://localhost:8080/notice
        data = await noticeboard.getAll();
        res.json(data);
    }
    else if (idx)  {
        // http://localhost:8080/notice/?idx=
        data = await noticeboard.getbyIdx(idx);
        if(data.length === 0)
            res.status(404).json({ message : "Not found" });
        else
            res.json(data);
    }
    else
        res.status(501).json({ message : "Not implement" });
})

// http://localhost:8080/notice/post
router.post('/post', async(req, res) => {

    let inputData = {
        title : req.body.title,
        details : req.body.details,
        date : new Date().toLocaleDateString(),
        writer : 'admin'
    }
    let data = await noticeboard.postNotice(inputData);

    if(data.affectedRows === 1)
        res.json(data);
    else
        res.status(500).json({ message : "Internal Server Error"});
})

// http://localhost:8080/notice/post?idx=
router.put('/post', async(req, res) => {
    let idx = req.query.idx;
    let updateData;
    let data;

    if(!(idx))
        res.status(500).json({ message : "Internal server error" });
    else   {
        updateData = {
            title : req.body.title,
            details : req.body.details,
            date : new Date().toLocaleDateString()
        }
        data = await noticeboard.modifybyIdx(idx, updateData);

        if(data.affectedRows === 0)
            res.status(500).json({ message : "Internal Server Error"});
        else
            res.json(data);
    }
})

// http://localhost:8080/notice/?idx=
router.delete('/', async(req, res) => {
    let idx;
    let data;
    
    idx = req.query.idx;
    data = await noticeboard.deleteByIdx(idx);
    
    if(data.affectedRows === 1)
        res.status(200).json({ message : "successfully delete" });
    else
        res.status(405).json({ message : "Method Not Allowed" });
})

module.exports = router;