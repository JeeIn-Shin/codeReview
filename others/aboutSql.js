//SQL 작성시 필요한 모든 문자열, 혹은 서브쿼리에 대한 함수를 정의하는 곳

const subQuery = {
    findSameTimeZone: (data) => {
        //data의 5부터 9까지의 값을 써야함
        // [
        //   '2071111',
        //   1674642311111,
        //   1,
        //   'C',
        //   'QA',
        //   '1,2,3,4,5,6,7,8,9',
        //   '1,2,3,4,5,6,7,8,9',
        //   '1,2,3,4,5,6,7,8,9',
        //   '1,2,3,4,5,6,7,8,9',
        //   '1,2,3,4,5,6,7,8,9'
        // ]
        let revieweesInfo = Object.values(data);
        let test;

        // revieweesInfo.forEach((value, index, array) => {
        //     if(typeof(value) === "string")  {
        //         value = value.replace(/,/g, '|');
        //         revieweesInfo = value;
        //     }
        // })

        // for ... of 로는 못하나?
        // for (let scheduleInfo of revieweesInfo) {

        //     if (typeof (scheduleInfo) === "string") {
        //         //교체는 했는데, 교체한 부분을 for 문 밖에서 쓰고싶단 말이지?
        //         //어떻게 할당해줘야할까
        //         scheduleInfo = scheduleInfo.replace(/,/g, '|')
        //     }

        // }
        ///흠...

        //이것도 방법이긴한데, 으음.
        // for (let index = 0; index < revieweesInfo.length; index++) {
        //     if(typeof(revieweesInfo[index]) === "string")
        //         revieweesInfo[index] = revieweesInfo[index].replace(/,/g, '|');   
        // }
        
        // for, for...of, foreach의 차이는? 언제 써야 적재적소에 사용했다는 평을 받을 수 있을까?
        // 추가로 map 도



        console.log(revieweesInfo);
    }
}

module.exports = subQuery;
