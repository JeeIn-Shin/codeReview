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

// http://localhost:8080/walk-thru/loading
ROUTER.get('/loading', async(req, res) => {
    
    let minHeap = new PRIORITYQUEUE();


    // await MATCHING.getReviewee((err, data) => {
    //     try {
    //         //이게 될리가 없ㄱ잖아요
    //         await MATCHING.getReviewer((err, data) => {

    //         })
    //     }
    //     catch(err)  {
    //         //나중에 수정하기
    //         console.error(err);
    //     }
    // })

    try {
        //근데 이렇게하면 ............ 그... revieweeInfo에 getReviewee 함수의 결과를 넣는게 아니라
        //revieweeInfo는 그냥 getReviewee 함수를 실행시키는 하나의 함수가 되는거 아님? 자스 공부 열심히 할껄
        //근데 나는 함수의 결과값을 가지고 그걸 가공해서 다음 함수의 매개변수로 넣어줘야하는데
        // ?????????????????
        let revieweeInfo = await MATCHING.getReviewee((err, data) => {
            //애초에 두 개의 응답을 보내는건 안되고, -> 에러뜸
            //거기다가 메서드 내에서 선언된 data를 {} 밖에서도 사용할 수 없음 -> 이건 그냥 당연함
            //그럼 {} 안에서 getReviewer 를 선언하는건? -> 될리가 없음 await 한번만.
        })
        // ????????????????????????????????????????????????? 어딜 뜯어고쳐야하는건지도 모르겠음
        
        let test = MATCHING.getReviewee((err, data));
        //아니면 걍 if-else 떡칠? 그래도 되나?
        console.log(test);
        // console.log(revieweeInfo);
        // console.log(reviewerInfo);
    }
    catch(err) {

    }
})


module.exports = ROUTER;