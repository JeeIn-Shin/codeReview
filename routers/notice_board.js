const express = require('express');
const router = express.Router();
const noticeboard = require('../models/noticeBoard');
const path = require('path');


router.get('/', async(req, res) => {
    let idx = req.query.idx;
    //let compare = Boolean;

    if(!(idx)) {
        // http://localhost:8080/notice
        let data = await noticeboard.getAll();
        res.json(data);
        // await noticeboard.getAll((data) => {
        //     try {
        //         res.json(data);
        //     }
        //     catch(err)  {
        //         console.log("get list err" + err);
        //         res.status(500).json({ message : "Internal server error" });
        //     }
        // })
    }
    else if (idx)  {
        // http://localhost:8080/notice/?idx=
        let data = await noticeboard.getbyIdx(idx);
        res.json(data);
        // await noticeboard.getbyIdx(idx, (data) => {
        //     try {
        //         if(data !== null)   {
        //             if(data.length === 0)
        //                 res.status(404).json({ message : "Not found" });
        //             else
        //                 res.json(data[0]);
        //         }
        //         else if(err !== null)
        //             res.status(500).json({ message : "Internal server error" });
        //     }
        //     catch(err)  {
        //         console.log("get list err" + err);
        //         res.status(500).json({ message : "Internal server error" });
        //     }
        // })
    }
    else
        res.status(501).json({ message : "Not implement" });
})

router.post('/post', async(req, res) => {
    let key = Object.keys(req.query);
    let values = Object.values(req.query);
    
    let compare = Boolean;
    if(key.length === 2 && ([ key[0], key[1] ].toString() === [ 'type', 'idx' ]))
        compare = (values[0].toString() === 'update')
    else if (key.length === 1 && ([ key[0] ].toString() === [ 'type' ]))
        compare = (values[0].toString() === 'create')

    if(key.length === 2 && compare) {
        // http://localhost:8080/notice/post?type=update&idx=
        let updateData = {
            title : req.body.title,
            text : req.body.text,
            date : new Date().toLocaleDateString()
        }
        let data = await noticeboard.modifybyIdx(values[1], updateData);
        res.json(data);
        // await noticeboard.modifybyIdx(values[1], updateData, (data) => {
        //     try {
        //         console.log(data);
        //         res.status(200).json(data);
        //     }
        //     catch(err)  {
        //         console.log("modify router" + err);
        //         res.status(500).json({ message : "Internal server error" });
        //     }
        // })
    }
    else if(key.length === 1 && compare)    {
        // http://localhost:8080/notice/post?type=create
        let inputData = {
            title : req.body.title,
            text : req.body.text,
            date : new Date().toLocaleDateString()
        }
        let data = await noticeboard.postNotice(inputData);
        res.json(data);
        // await noticeboard.postNotice(inputData, (data) => {
        //     try {
        //         console.log(data);
        //         res.json(data);

        //     }
        //     catch(err)  {
        //         console.log("new post router" + err);
        //         res.status(500).json({ message : "Internal server error" });
        //     }
        // })
    }
    else
        res.status(500).json({ message : "Internal server error" });
})

// http://localhost:8080/notice/?idx=
router.delete('/', async(req, res) => {
    let idx = req.query.idx;

    let data = await noticeboard.deleteByIdx(idx);
    if(data.affectedRows === 1)
        res.status(200).json({ message : "successfully delete" });
    else
        res.status(405).json({ message : "Method Not Allowed" });
    // await noticeboard.deleteByIdx(idx, (data) => {
    //     try {
    //         console.log(data);
    //         res.json(data);
    //     }
    //     catch(err)  {
    //         console.log("new post router" + err);
    //         res.status(500).json({ message : "Internal server error" });
    //     }
    // })
})

module.exports = router;