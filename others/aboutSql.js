//SQL 작성시 필요한 모든 문자열, 혹은 서브쿼리에 대한 함수를 정의하는 곳

const aboutSubQuery = {
    findSameTimeZonePeople: (data) => {
        //key, value 그리고 순서도 보장이 되어야해서 Map을 쓴건데
        //이게 최선일까? ... 이건 나중에 고민해보자
        let revieweesInfo = new Map(Object.entries(data));
        let scheduleInfo = new Map();
        let subquery = [];

        for (let weekday of revieweesInfo.keys()) {
            // map => (string, any)
            // 아니 그래도 any에서 문자열이면 문자열이 될 줄 알았는데...

            //any string 형태로 바꿔주기 위해 '' 추가해줌 아니 근데 이렇게까지 해야해?
            let str = (revieweesInfo.get(weekday)) + '';

            //무조건 , 가 존재한다는 가정 그리고 ,가 들어가있다면 weekday에 대한 정보일 것
            if (str.includes(',') === true) {
                //console.log(`test [${weekday} : ${str}]`);

                str = str.replace(/,/g, '|');
                scheduleInfo.set(weekday, str);
            }
        }

        for (let entries of scheduleInfo)
            subquery.push(`SCHEDULE_TB.${entries[0]} REGEXP ('${entries[1]}')`);
        // OR로 연결되어야함
        subquery = subquery.join(' OR ');

        return subquery;

        //console.log(ScheduleInfo);

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
    },

    findSameWeekdayAndTimeZoneBetweenMatchedPeople: (revieweeData, reviewerData) => {

        let revieweeScheduleInfo = new Map();
        let reviewerScheduleInfo = new Map();
        let revieweeTemp;
        let reviewerTemp;
        let result = {
            weekday : null,
            time : null
        }

        for (let key in revieweeData) {
            if (key == 'MON' || key == 'TUE' || key == 'WED' || key == 'THURS' || key == 'FRI')
                revieweeScheduleInfo.set(key, revieweeData[key])
        }

        for (let key in reviewerData) {
            if (key === 'MON' || key === 'TUE' || key === 'WED' || key === 'THURS' || key === 'FRI')
                reviewerScheduleInfo.set(key, reviewerData[key])
        }

        for (let weekday of revieweeScheduleInfo.keys()) {
            revieweeTemp = revieweeScheduleInfo.get(weekday).split(',');
            reviewerTemp = reviewerScheduleInfo.get(weekday).split(',');

            result.time = revieweeTemp.filter(intersection => reviewerTemp.includes(intersection));
            
            if(result.time.length != 0)   {
                result.weekday = weekday
                return result;
            }
        }
    }
}

module.exports = aboutSubQuery;
