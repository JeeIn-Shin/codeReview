let setProfileImage = (imageUpdateValue) => {
    switch(imageUpdateValue)  {
        case 0:
            return '../view/img/profile/0.png';
            break;
        case 1:
            return '../view/img/profile/1.png';
            break;
        case 2:
            return '../view/img/profile/2.png';
            break;
        case 3:
            return '../view/img/profile/3.png';
            break;
        case 4:
            return '../view/img/profile/4.png';
            break;
        case 5:
            return '../view/img/profile/5.png';
            break;
        case 6:
            return '../view/img/profile/6.png';
            break;
    }
}

module.exports = setProfileImage;