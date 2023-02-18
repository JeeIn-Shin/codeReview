const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const MATCHING = require('../models/matching');
const PRIORITYQUEUE = require('../others/priorityQueue');
const THINGABOUTSUBQUERY = require('../others/aboutSql');

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
    // 1. 대기열에 등록된 리뷰이 리스트를 가져와서
    MATCHING.getRevieweesInfo()
        .then(async(revieweesResult) => {

            let data = revieweesResult;
            let dataLength = revieweesResult.length - 1; //1
            let count = 0;
            let revieweeInfo = [];
            let root = null;
            let weight = 0;
            //학생 아이디
            let id;

            let MatchedReviewerId;
            let MatchedDateAndTime;

            // 2. 리뷰이 리스트 길이만큼 loop를 돕니다.
            while (count <= dataLength) { // 1, 0

                //수정된 부분
                revieweeInfo = data[dataLength];
                // 3. 리뷰이 리스트에서 0번째 인덱스가 가지고 있는 정보(언어 활동 등)를 토대로 (이하 리뷰이로만 통칭)
                // 4. 대기열에 등록된 리뷰어들을 모두 가져옴
                await MATCHING.getReviewersInfo(revieweeInfo)
                .then(async(reviewersList) => {
                    let heap = new PRIORITYQUEUE();
                    let data = reviewersList;
                    
                    //데이터 맞는지 나중에 검증해야함 아...

                    // 5. 리뷰어 리스트만큼 순회하면서 리뷰이가 가지고 있는 정보와 일치하는 데이터만 합산해서 가중치를 계산함
                    for(let index = 0; index < data.length; index++) {
                        
                        weight = 0;

                        for (let key in data[index])    {
                            if (key !== "ID_PK")
                                weight += data[index][key];
                            else {
                                id = data[index][key];
                            }
                        }
                        //6. 계산된 리뷰어 데이터를 heap에 넣어야함
                        heap.push(id, weight);
                    }                    
                    // 7. 힙으로부터 리뷰이와 가장 잘 맞는 사람(리뷰어 중 가중치가 가장 높은 사람)을 뽑아냄 ==> 이를 리뷰이와 리뷰어를 매칭시켰다고 칭하겠음
                    root = heap.pop();


                    for(let index = 0; index < data.length; index++) {
                        if(root.id === data[index].ID_PK)
                            MatchedReviewerId = data[index];
                    } 

                })

                //////// 왜 어째서 revieweeInfo.ID_PK가 헛돌지.............
                //해결함 revieweeinfo (176번 라인)에서 들어오는 값이 이상하게 오고있어서
                //근데 이렇게 되면 마지막에 들어온 사람대로 되는거 아닌가?
                //그렇다면 데베로부터 값을 받아올때 정렬해서 가져오면 되는거지!


                MatchedDateAndTime = THINGABOUTSUBQUERY.findSameWeekdayAndTimeZoneBetweenMatchedPeople(revieweeInfo, MatchedReviewerId);
                
                console.log(MatchedDateAndTime.weekday.concat(MatchedDateAndTime.time));
                
                let matchingData = {
                    "revieweeId" : revieweeInfo.ID_PK, 
                    "reviewerId" : root.id,
                    "datetime" : MatchedDateAndTime.weekday.concat(MatchedDateAndTime.time[0]),
                    "state" : 0,
                }

                console.log(root.id);
                console.log(revieweeInfo.ID_PK);
                // 8. 매칭된 두 사람(리뷰이와, 리뷰어)은 대기열 목록에서 지워짐
                // 9. 그런 다음 CODEREVIEW_ACT_INFO_TB에 두 사람의 데이터를 집어야함
                await Promise.all([MATCHING.deleteRevieweeFromQueue(revieweeInfo.ID_PK), MATCHING.deleteReviewerFromQueue(root.id), MATCHING.setReviewActInfo(matchingData)])
                .catch((err) => {
                    console.log(err);
                })
                
                dataLength--;
            }
            //대체 얜 뭘 보내한단 말인가?
            //꼭 보내지 않아도 되나?
            //근데 여기서 웹 푸시 알림 같은걸 보내긴 해야하는데...
            //이건 어떻게?
            res.json("success");
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = ROUTER;