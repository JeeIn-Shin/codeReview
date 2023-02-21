const express = require('express');
const router = express.Router();
const noticeboard = require('../models/noticeBoard');



router.get('/', async(req, res) => {
    let idx = req.query.idx;
    //let compare = Boolean;

    if(!(idx)) {
        // http://localhost:8080/notice
        await noticeboard.getAll((err, data) => {
            try {
                if (data !== null)
                    res.render('notice/list', { noticeList : data });
                else if(err !== null)
                    res.status(500).json({ message : "Internal server error" });
            }
            catch(err)  {
                console.log("get list err" + err);
                res.status(500).json({ message : "Internal server error" });
            }
        })
    }
    else if (idx)  {
        // http://localhost:8080/notice/?idx=
        await noticeboard.getbyIdx((err, data) => {
            try {
                if(data !== null)   {
                    if(data.length === 0)
                        res.status(404).json({ message : "Not found" });
                    else
                        res.render('notice/detail', { noticeById : data[0] });
                }
                else if(err !== null)
                    res.status(500).json({ message : "Internal server error" });
            }
            catch(err)  {
                console.log("get list err" + err);
                res.status(500).json({ message : "Internal server error" });
            }
        })
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
        await noticeboard.modifybyIdx(values[1], updateData, (err, data) => {
            try {
                if(data !== null)   {
                    console.log(data);
                    res.redirect(`/notice/list?idx=${values[1]}`);
                }
                else if(err !== null)    {
                    console.log("update db err" + err);
                    res.status(500).json({ message : "Internal server error" });
                }
            }
            catch(err)  {
                console.log("modify router" + err);
                res.status(500).json({ message : "Internal server error" });
            }
        })
    }
    else if(key.length === 1 && compare)    {
        // http://localhost:8080/notice/post?type=create
        let inputData = {
            title : req.body.title,
            text : req.body.text,
            date : new Date().toLocaleDateString()
        }
        await noticeboard.postNotice(inputData, (err, data) => {
            try {
                if(data !== null)   {
                    console.log(data);
                    res.redirect('back');
                }
                else if(err !== null)    {
                    console.log("create db err" + err);
                    res.status(500).json({ message : "Internal server error" });
                }
            }
            catch(err)  {
                console.log("new post router" + err);
                res.status(500).json({ message : "Internal server error" });
            }
        })
    }
    else
        res.status(500).json({ message : "Internal server error" });
})

// http://localhost:8080/notice/?idx=
router.delete('/', async(req, res) => {
    let idx = req.query.idx;

    await noticeboard.deleteByIdx(idx, (err, data) => {
        try {
            if(data !== null)   {
                console.log(data);
                res.redirect('/notice');
            }
            else if(err !== null)    {
                console.log("delete db err" + err);
                res.status(500).json({ message : "Internal server error" });
            }
        }
        catch(err)  {
            console.log("new post router" + err);
            res.status(500).json({ message : "Internal server error" });
        }
    })
})

module.exports = router;