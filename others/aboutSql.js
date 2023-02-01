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

        // revieweesInfo.forEach((value, index, array) => {
        //     if(typeof(value) === "string")  {
        //         value = value.replace(/,/g, '|');
        //         revieweesInfo = value;
        //     }
        // })
        // foreach는 나쁜건 아닌데, 뭐랄까 index, array를 사용할 게 아니라서 굳이? 오히려 낭비인 느낌

        // for ... of 로는 못하나?
        // for (let scheduleInfo of revieweesInfo) {

        //     if (typeof (scheduleInfo) === "string") {
        //         //교체는 했는데, 교체한 부분을 for 문 밖에서 쓰고싶단 말이지?
        //         //어떻게 할당해줘야할까
        //         scheduleInfo = scheduleInfo.replace(/,/g, '|')
        //     }

        // }


        console.log(revieweesInfo);
    }
}

module.exports = subQuery;
