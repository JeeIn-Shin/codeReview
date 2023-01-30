const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const MATCHING = require('../models/matching');
const PRIORITYQUEUE = require('../others/priorityQueue');

// http://localhost:8080/walk-thru
ROUTER.post('/', async(req, res) => {

    let enrollInfo = {
        //ID_PK 부분은 사실 로그인 정보가 들어가야함
        //그러나 지금은 로그인을 구현해두지 않아서 일단 이렇게 해둠
        ID_PK : req.body.ID_PK,
        CREATEDAT : Date.now(),
        POSITION : req.body.POSITION
    }

    await MATCHING.registerQueue(enrollInfo, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error(err);
        }
    })
});

// http://localhost:8080/walk-thru/plan?position=
ROUTER.post('/plan', async(req, res) => {
    
    let classification = Object.values(req.query.position);

    //로그인 확인
    
    // 0이 reviewer
    if (classification === 0)   {

        let reviewerAdditionalData = {
            //ID_PK 부분은 로그인 정보가 들어가야함
            ID_PK : req.body.ID_PK,
            MON : req.body.MON, 
            TUE : req.body.TUE, 
            WED : req.body.WED, 
            THURS : req.body.THURS, 
            FRI : req.body.FRI
        }

        await MATCHING.setPlan(reviewerAdditionalData, (err, res) => {
            try {
                res.json(data);
            }
            catch(err)  {
                console.error(err);
            }
        })
    }
    // 1이 reviewee
    else if (classification === 1)  {

        let revieweeAdditionalData = {
            //ID_PK 부분은 로그인 정보가 들어가야함
            ID_PK : req.body.ID_PK,
            MON : req.body.MON, 
            TUE : req.body.TUE, 
            WED : req.body.WED, 
            THURS : req.body.THURS, 
            FRI : req.body.FRI,
            LANGUAGE : req.body.LANGUAGE,
            ACTIVITY : req.body.ACTIVITY
        }

        await MATCHING.setPlanAndPrefer(revieweeAdditionalData, (err, res) => {
            try {
                res.json(data);
            }
            catch(err) {
                console.error(err);
            }
        })
    }
    else    {
        res.json({
            "code" : "400",
            "data" : {},
            "msg" : "400 Bad Request"
        });
    }
});

// http://localhost:8080/walk-thru/update?position=
ROUTER.put('/update', async(req, res) => {
    
    //req.query.~ 어떻게 들어오더라?
    // { position : '' } 였던거 같은데
    let classification = Object.values(req.query.position);

    //로그인 확인
    let testRevieweeId = '2071111';
    let testReviewerId = '2072222';
    
    // 0이 reviewer
    if (classification === 0)   {

        let reviewerUpdateData = {
            //ID_PK 부분은 로그인 정보가 들어가야함
            ID_PK : req.body.ID_PK,
            MON : req.body.MON, 
            TUE : req.body.TUE, 
            WED : req.body.WED, 
            THURS : req.body.THURS, 
            FRI : req.body.FRI
        }

        await MATCHING.updatePlan(testReviewerId, reviewerUpdateData, (err, res) => {
            try {
                res.json(data);
            }
            catch(err)  {
                console.error(err);
            }
        })
    }
    // 1이 reviewee
    else if (classification === 1)  {

        let revieweeUpdateData = {
            //ID_PK 부분은 로그인 정보가 들어가야함
            ID_PK : req.body.ID_PK,
            MON : req.body.MON, 
            TUE : req.body.TUE, 
            WED : req.body.WED, 
            THURS : req.body.THURS, 
            FRI : req.body.FRI,
            LANGUAGE : req.body.LANGUAGE,
            ACTIVITY : req.body.ACTIVITY
        }

        await MATCHING.updatePlanAndPrefer(testRevieweeId, revieweeUpdateData, (err, res) => {
            try {
                res.json(data);
            }
            catch(err) {
                console.error(err);
            }
        })
    }
    else    {
        res.json({
            "code" : "400",
            "data" : {},
            "msg" : "400 Bad Request"
        });
    }
})

// http://localhost:8080/walk-thru/review-groups
ROUTER.post('/review-groups', async(req, res) => {
    
    let minHeap = new PRIORITYQUEUE();

        MATCHING.getRevieweesInfo()
        .then((result) => {
            MATCHING.getReviwersInfo(result);
        })
        .catch((err) => {
            console.log(err);
        })
        res.json("success");

})

module.exports = ROUTER;