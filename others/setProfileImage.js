let setProfileImage = (imageUpdateValue) => {
    switch(imageUpdateValue)  {
        case "0":
            return '../public/assets/img/profile1.png';
            break;
        case "1":
            return '../public/assets/img/profile2.png';
            break;
        case "2":
            return '../public/assets/img/profile3.png';
            break;
        case "3":
            return '../public/assets/img/profile4.png';
            break;
    }
}

module.exports = setProfileImage;