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
ROUTER.post('/review-groups', async (req, res) => {

    let minHeap = new PRIORITYQUEUE();
    let language = [];
    let activity = [];

    MATCHING.getRevieweesInfo()
        .then((result) => {
            let data = result;
            let dataLength = result.length - 1; //1
            let count = 0;
            
            let revieweeInfo = {
                language : [],
                activity : [],
                mon : [],
                tue : [],
                wed : [],
                thrus : [],
                fri : []
            }

            while (count <= dataLength) { //1, 0

                //근데 push로 하면 배열 요소 추가잖아
                //배열 요소를 추가하는 방향으로 꼭 짜야할 필요가 있을까?
                //그냥 값만 넘겨주면 되는건데?
                //어차피 result는 값이 변하지 않잖아.
                //그러게.. 배열 요소를 추가할 필요가 없지
                //자고 일어나서 수정하기
                revieweeInfo.language.push(Object.values(result[count])[3]);
                revieweeInfo.activity.push(Object.values(result[count])[4]);
                revieweeInfo.mon.push(Object.values(result[count])[5]);
                revieweeInfo.tue.push(Object.values(result[count])[6]);
                revieweeInfo.wed.push(Object.values(result[count])[7]);
                revieweeInfo.thrus.push(Object.values(result[count])[8]);
                revieweeInfo.fri.push(Object.values(result[count])[9]);
                // preferInfo.language = Object.values(result[dataLength])[3];
                // preferInfo.activity = Object.values(result[dataLength])[4];

                console.log(revieweeInfo);
                MATCHING.getReviwersInfo(revieweeInfo[count])
                .then
                count++;
            }


        })
        .catch((err) => {
            console.log(err);
        })
    res.json("success");

})

module.exports = ROUTER;