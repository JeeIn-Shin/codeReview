const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const MATCHING = require('../models/matching');
const PRIORITYQUEUE = require('../others/priorityQueue');

// http://localhost:8080/walk-thru
ROUTER.post('/', async (req, res) => {

    let enrollInfo = {
        //ID_PK 부분은 사실 로그인 정보가 들어가야함
        //그러나 지금은 로그인을 구현해두지 않아서 일단 이렇게 해둠
        ID_PK: req.body.ID_PK,
        CREATEDAT: Date.now(),
        POSITION: req.body.POSITION
    }

    await MATCHING.registerQueue(enrollInfo, (err, data) => {
        try {
            res.json(data);
        }
        catch (err) {
            console.error(err);
        }
    })
});

// http://localhost:8080/walk-thru/info?position=
ROUTER.post('/info', async (req, res) => {

    let classification = Object.values(req.query.position);

    //로그인 확인

    // 0이 reviewer
    if (classification === 0) {

        let reviewerAdditionalData = {
            //ID_PK 부분은 로그인 정보가 들어가야함
            ID_PK: req.body.ID_PK,
            MON: req.body.MON,
            TUE: req.body.TUE,
            WED: req.body.WED,
            THURS: req.body.THURS,
            FRI: req.body.FRI
        }

        await MATCHING.setPlan(reviewerAdditionalData, (err, res) => {
            try {
                res.json(data);
            }
            catch (err) {
                console.error(err);
            }
        })
    }
    // 1이 reviewee
    else if (classification === 1) {

        let revieweeAdditionalData = {
            //ID_PK 부분은 로그인 정보가 들어가야함
            ID_PK: req.body.ID_PK,
            MON: req.body.MON,
            TUE: req.body.TUE,
            WED: req.body.WED,
            THURS: req.body.THURS,
            FRI: req.body.FRI,
            LANGUAGE: req.body.LANGUAGE,
            ACTIVITY: req.body.ACTIVITY
        }

        await MATCHING.setPlanAndPrefer(revieweeAdditionalData, (err, res) => {
            try {
                res.json(data);
            }
            catch (err) {
                console.error(err);
            }
        })
    }
    else {
        res.json({
            "code": "400",
            "data": {},
            "msg": "400 Bad Request"
        });
    }
});

// http://localhost:8080/walk-thru/update?position=
ROUTER.put('/update', async (req, res) => {

    //req.query.~ 어떻게 들어오더라?
    // { position : '' } 였던거 같은데
    let classification = Object.values(req.query.position);

    //로그인 확인
    let testRevieweeId = '2071111';
    let testReviewerId = '2072222';

    // 0이 reviewer
    if (classification === 0) {

        let reviewerUpdateData = {
            //ID_PK 부분은 로그인 정보가 들어가야함
            ID_PK: req.body.ID_PK,
            MON: req.body.MON,
            TUE: req.body.TUE,
            WED: req.body.WED,
            THURS: req.body.THURS,
            FRI: req.body.FRI
        }

        await MATCHING.updatePlan(testReviewerId, reviewerUpdateData, (err, res) => {
            try {
                res.json(data);
            }
            catch (err) {
                console.error(err);
            }
        })
    }
    // 1이 reviewee
    else if (classification === 1) {

        let revieweeUpdateData = {
            //ID_PK 부분은 로그인 정보가 들어가야함
            ID_PK: req.body.ID_PK,
            MON: req.body.MON,
            TUE: req.body.TUE,
            WED: req.body.WED,
            THURS: req.body.THURS,
            FRI: req.body.FRI,
            LANGUAGE: req.body.LANGUAGE,
            ACTIVITY: req.body.ACTIVITY
        }

        await MATCHING.updatePlanAndPrefer(testRevieweeId, revieweeUpdateData, (err, res) => {
            try {
                res.json(data);
            }
            catch (err) {
                console.error(err);
            }
        })
    }
    else {
        res.json({
            "code": "400",
            "data": {},
            "msg": "400 Bad Request"
        });
    }
})

// http://localhost:8080/walk-thru/review-groups
ROUTER.post('/review-groups', async(req, res) => {
    //얘네들은 왜 선언한거지?
    // let language = [];
    // let activity = [];

    MATCHING.getRevieweesInfo()
        .then((revieweesResult) => {

            let data = revieweesResult;
            let dataLength = revieweesResult.length - 1; //1
            let count = 0;
            let revieweeInfo = [];

            //생각을 잘못했음 datalength 가 계속 줄어들어야하는데..
            while (count <= dataLength) { // 1, 0
                console.log(dataLength);
                revieweeInfo = data[count];
                // console.log(count);
                // console.log(revieweeInfo.ID_PK);
                
                //
                MATCHING.getReviewersInfo(revieweeInfo)
                .then(async(reviewersList) => {

                    let heap = new PRIORITYQUEUE();
                    let root = null;
                    let data = reviewersList;

                    //1. for문 안에서
                    //2중 for문만이 답인가?????????
                    //[0][1][2] ... 
                    //데이터 맞는지 나중에 검증해야함 아...
                    for(let index = 0; index < data.length; index++) {
                        
                        let weight = 0;
                        let id;
                        
                        for (let key in data[index])    {
                            if (key !== "ID_PK")
                                weight += data[index][key];
                            else {
                                id = data[index][key];
                            }
                        }
                        //2. heap에 넣어야함
                        heap.push(id, weight);

                    }
                    //pop된 값을 다른 테이블에 넣어줘야함 --> 어떤 테이블?
                    //CODEREVIEW_ACT_INFO_TB !!
                    //여기서부터 시작하기
                    root = heap.pop();

                    //데이터 잘 지워짐 ㅇㅋ
                    //다른 문제는 생길게 없을까?
                    await MATCHING.deleteReviewerFromQueue(root.id);
                    await MATCHING.deleteRevieweeFromQueue(revieweeInfo.ID_PK);
                })

                dataLength--;
            }
            res.json("success");
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = ROUTER;