let bodyElement = document.querySelector('body');
let mainElement = document.querySelector('main');

window.addEventListener('resize', function () {
  // 화면 사이즈 변화시 sidebar가 hide이 되는 경우가 있음
  // 그래서 화면이 1200이상이면 자동으로 show로 전환
  if (window.innerWidth > 1200) {
    $('.sidebar').show();
    $('.noshow').hide();
    $('.main').removeClass('main-visible');
  } else {
    $('.noshow').show();
    // 특정 클래스가 있는지 확인
    if (
      bodyElement.classList.contains('chats-tab-open') &&
      !mainElement.classList.contains('main-visible')
    ) {
      $('.sidebar').show();
    } else {
      $('.main').addClass('main-visible');
    }
  }
});

$(document).ready(function () {
  $('.noshow').hide();

  // Main Navigation Tab
  // $("#mainNavTab a").on("click", function (e) {
  //   e.preventDefault();
  //   $(this).tab("show");
  // });
  $('#gotoback').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('calls-tab-open friends-tab-open profile-tab-open');
    $('body').addClass('chats-tab-open');

    // $(".sidebar").show();
    if (window.innerWidth < 1200) {
      $('.sidebar').show();
    }
  });

  // Layout Click Events
  $('#chats-tab').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('calls-tab-open friends-tab-open profile-tab-open');
    $('body').addClass('chats-tab-open');

    // $(".sidebar").show();
    if (window.innerWidth < 1200) {
      $('.main').removeClass('main-visible');
      $('.sidebar').show();
    }
  });

  $('#calls-tab').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('chats-tab-open friends-tab-open profile-tab-open');
    $('body').addClass('calls-tab-open');

    if (window.innerWidth < 1200) {
      $('.main').addClass('main-visible');
      $('.sidebar').hide();
      $('.noshow').show();
    }
  });

  $('#friends-tab').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('calls-tab-open chats-tab-open profile-tab-open');
    $('body').addClass('friends-tab-open');

    if (window.innerWidth < 1200) {
      $('.main').addClass('main-visible');
      $('.sidebar').hide();
      $('.noshow').show();
    }
  });

  $('#profile-tab').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('calls-tab-open friends-tab-open chats-tab-open');
    $('body').addClass('profile-tab-open');

    if (window.innerWidth < 1200) {
      $('.main').addClass('main-visible');
      $('.sidebar').hide();
      $('.noshow').show();
    }
  });

  // noshow js
  $('.chats-tab-show').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('chats-tab-open friends-tab-open profile-tab-open');
    $('body').addClass('calls-tab-open');

    $('.main').removeClass('main-visible');
    $('.sidebar').show();
    $('.noshow').hide();
  });
  $('.calls-tab-show').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('chats-tab-open friends-tab-open profile-tab-open');
    $('body').addClass('calls-tab-open');
  });

  $('.friends-tab-show').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('calls-tab-open chats-tab-open profile-tab-open');
    $('body').addClass('friends-tab-open');
  });

  $('.profile-tab-show').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('calls-tab-open friends-tab-open chats-tab-open');
    $('body').addClass('profile-tab-open');
  });

  // 주석, 게시글 작성 페이지에서 게시판으로 이동
  $('#back').on('click', function (e) {
    e.preventDefault();
    $('#announceWriteBorad').css('display', 'none');
    $('#announceShowBorad').css('display', 'block');

    // $(".sidebar").hide();
  });
  // 게시글 작성 페이지로 이동
  $('#write').on('click', function (e) {
    e.preventDefault();
    $('#announceWriteBorad').css('display', 'block');
    $('#announceShowBorad').css('display', 'none');

    // $(".sidebar").hide();
  });
  // ----------------------------------------------

  //Chat Info
  $('[data-chat-info-toggle]').on('click', function (e) {
    e.preventDefault();
    $('.chat-info').addClass('chat-info-visible');
  });
  $('[data-chat-info-close]').on('click', function (e) {
    e.preventDefault();
    $('.chat-info').removeClass('chat-info-visible');
  });

  $('.contacts-list .contacts-link').on('click', function () {
    $('.main').addClass('main-visible');
  });
  $('.contacts-list .media-link').on('click', function () {
    $('.main').addClass('main-visible');
  });
  $('[data-profile-edit]').on('click', function () {
    $('.main').addClass('main-visible');
  });

  // Toggle chat
  $('[data-close]').on('click', function (e) {
    e.preventDefault();
    $('.main').removeClass('main-visible');
  });

  //Popup Gallery
  $('.chat-content').magnificPopup({
    delegate: 'a.popup-media',
    type: 'image',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
  });

  //Chat Dropdown Filter
  $('[data-chat-filter]').on('click', function () {
    let selectedOption = $(this).data('select');
    $('[data-chat-filter-list]').text($(this).text());
    if (selectedOption === 'all-chats') {
      $('[data-chat-list]')
        .find('li')
        .each(function () {
          $(this).show();
        });
    } else {
      $('[data-chat-list]')
        .find('li')
        .each(function () {
          $(this).hide();
        });
      $('[data-chat-list] li.' + selectedOption).show();
    }
  });

  //Call Dropdown Filter
  $('[data-call-filter]').on('click', function () {
    let selectedOption = $(this).data('select');
    $('[data-call-filter-list]').text($(this).text());
    if (selectedOption === 'all-calls') {
      $('[data-call-list]')
        .find('li')
        .each(function () {
          $(this).show();
        });
    } else {
      $('[data-call-list]')
        .find('li')
        .each(function () {
          $(this).hide();
        });
      $('[data-call-list] li.' + selectedOption).show();
    }
  });

  // Create Group
  // $("#createGroup").modalSteps({
  //    btnNextHtml: "Next",
  //    btnLastStepHtml: "Finish",
  //    disableNextButton: false,
  //    completeCallback: function () {},
  //    callbacks: {},
  //    getTitleAndStep: function () {},
  // });

  // File Input
  $(document).on('change', '.custom-file-input', function (event) {
    $(this).next('.custom-file-label').html(event.target.files[0].name);
  });

  // SVG File Inject
  SVGInject(document.getElementsByClassName('injectable'));

  //Toggle Appbar
  // $("#appNavTab .nav-link").on("click", function () {
  //    $(".backdrop").addClass("backdrop-visible");
  //    $(".appnavbar-content").addClass("appnavbar-content-visible");
  //    $("#appNavTab .nav-link").removeClass("active");
  //    $(".chat-info").removeClass("chat-info-visible");
  // });

  //Backdrop
  $('.backdrop').on('click', function () {
    $('.backdrop').removeClass('backdrop-visible');
    $('.appnavbar-content').removeClass('appnavbar-content-visible');
    $('#appNavTab .nav-link').removeClass('active');
  });

  //App Closer
  $('[data-apps-close]').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('apps-visible');
    $('.appbar').toggleClass('appbar-hidden');
    $('.backdrop').removeClass('backdrop-visible');
  });

  // Appbar toggler
  $('[data-toggle-appbar]').on('click', function (e) {
    e.preventDefault();
    $('.appbar').removeClass('appbar-hidden');
    $('.backdrop').addClass('backdrop-visible');
  });

  // Appcontent Close
  $('[data-appcontent-close]').on('click', function (e) {
    e.preventDefault();
    $('.backdrop').removeClass('backdrop-visible');
    $('.appnavbar-content').removeClass('appnavbar-content-visible');
    $('#appNavTab .nav-link').removeClass('active');
  });

  // Responsive media query to remove appbar in smaller screen on initial load & resize
  function checkSize() {
    if ($(window).width() <= 1200) {
      $('.appbar').addClass('appbar-hidden');
    } else {
      $('.appbar').removeClass('appbar-hidden');
    }
  }
  checkSize();
  $(window).resize(checkSize);

  // Emojione Area
  // $("#messageInput").emojioneArea();
});

const buttonChat = document.getElementById('chats-tab');
const buttonCall = document.getElementById('calls-tab');
const buttonFriend = document.getElementById('friends-tab');
const buttonSetting = document.getElementById('profile-tab');
const tag = document.querySelector('.sidebar');
