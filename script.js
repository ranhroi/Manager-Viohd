function getID(a) {
    return document.getElementById(a)
}

function getAll(a) {
    return document.querySelectorAll(a)
};

/*LocalStorage*/
function createStorage(key, type) {
    var storage = JSON.parse(localStorage.getItem(key)) || type;
    var save = function() {
        localStorage.setItem(key, JSON.stringify(storage))
    }
    var obj = {
        all: function() {
            return storage
        },
        get: function(key) {
            return storage[key];
        },
        set: function(key, value) {
            storage[key] = value;
            save()
        },
        remove: function(key) {
            delete storage[key];
            save()
        }
    }
    return obj;
};
jQuery(document).ready(function() {
    var createSettings = createStorage("SETTING_DATA", {}),
        isMenu = false,
        isScheme = false,
        isTheme = 'light',
        isWide = false;

    //Sidebar Menu
    jQuery('.menu-parent').click(function(event) {
        jQuery(this).toggleClass('show');
        if (jQuery(this).hasClass("show")) {
            jQuery('.menu-parent.show').click(function(event) {
                jQuery(this).toggleClass("show")
            })
        }
    });
    jQuery('.menu-parent>a').click(function(event) {
        jQuery('.menu-parent').removeClass('show')
    });

    //Click Button Header
    jQuery(".header-bars").click(function(e) {
        isMenu = !isMenu;
        jQuery(this).attr("data-menu", isMenu)
        jQuery(".sidebar").attr("data-menu", isMenu)
    });

    jQuery("#scheme").click(function(e) {
        isScheme = !isScheme;
        jQuery(".grid").attr("data-style", isScheme);
        createSettings.set('isScheme', isScheme)
    });


    //Min Screen
    jQuery("#toggleScreen").click(function(e) {
        isWide = jQuery('input[name=screen]:checked');
        jQuery(".grid").toggleClass("wide");
        createSettings.set('isWide', !!isWide.val())
    });

    //Tabs
    jQuery(document).on('click', '.tabs-list>li', function(e) {
        jQuery(this).closest('.tabs-list').find('li').removeClass('show');
        jQuery(this).addClass('show');
        var tabId = jQuery(this).attr('data-tab');
        jQuery('.tabs-panel').removeClass('show');
        jQuery('#' + tabId).addClass('show')
    });

    jQuery(document).on('click', 'input[name=theme]', function(e) {
        isTheme = jQuery('input[name=theme]:checked');
        if (isTheme.val() === "light") {
            jQuery("body").attr("class", isTheme.val())
        } else if (isTheme.val() === "dark-blue") {
            jQuery("body").attr("class", isTheme.val())
        } else if (isTheme.val() === "dark") {
            jQuery("body").attr("class", isTheme.val())
        }
        createSettings.set('isTheme', isTheme.val())
    })

    /*load LocalStorage*/
    function loadSettings() {
        isTheme = (createSettings.get("isTheme") === undefined) ? isTheme : createSettings.get("isTheme");
        isScheme = (createSettings.get("isScheme") === undefined) ? isScheme : createSettings.get("isScheme");
        isWide = (createSettings.get("isWide") === undefined) ? isWide : createSettings.get("isWide");
        if (isTheme) {
            jQuery("body").attr("class", isTheme)
            jQuery('#' + isTheme).prop('checked', !0)
        }
        if (isScheme) {
            jQuery(".grid").attr("data-style", isScheme)
        }
        if (isWide) {
            jQuery(".grid").addClass("wide")
            jQuery('#toggleScreen').prop('checked', !0)
        } else {
            jQuery(".grid").addClass("")
        }
    };
    loadSettings()

});

/*Show Modal*/
function showModal({
    title = '',
    content = ''
}) {
    var body = document.querySelector('.grid');
    var modal = document.createElement('div');
    modal.onclick = function(e) {
        if (e.target.closest('.js-close')) {
            modal.remove('.modal')
        }
    }
    modal.className = `modal js-modal`;
    modal.innerHTML = `<div class="modal-container js-container">
        <header class="modal-header">
            <h4 class="modal-heading">${title}</h4>
            <button class="btn js-close" type="button">×</button>
        </header>
        <div class="modal-body">${content}</div>
        <footer class="modal-footer">
            <button class="btn js-close" type="button">Close</button>
        </footer>
    </div>`;
    body.appendChild(modal)
};


function showModalText(h, a) {
    $('.grid').append('<div class="modal js--modal"><div class="modal-container js--container"><header class="modal-header"><h4 class="modal-heading">' + h + '</h4><button class="btn js--close" type="button">X</button></header><div class="modal-body"></div><footer class="modal-footer"><button class="btn js--close" type="button">Close</button></footer></div></div>');
    $('.js--close').click(function() { $('.js--modal').remove() })
    $('.js--modal').click(function() { $('.js--modal').remove() });
    $('.js--container').click(function(event) { event.stopPropagation() })
    document.querySelector('.modal-body').innerText = a;
};

/*Modal player*/
jQuery(document).on('click', '.play-video,.show-image', function(a) {
    var b = jQuery(this).data('src'),
        e = /jpg|png|gif|jpeg|svg|webp|raw|psd/g;
    if (b.includes('youtube.com')) {
        a = b.replace(/\/watch\?v=/gi, "/embed/");
        a = `<div class="player-box">
             <iframe class="player" src="${a}?autoplay=1" frameborder="0" allowfullscreen></iframe>
             </div>`,
            h = `VIDEO`
    } else if (b.includes('dailymotion.com')) {
        a = b.split('/video/')[1];
        a = `<div class="player-box">
             <iframe class="player" src="https://www.dailymotion.com/embed/video/${a}?autoplay=1&api=0&info=0&logo=0&mute=0" frameborder="0" allowfullscreen></iframe>
             </div>`,
            h = `TRAILER`
    } else if (!!b.match(e)) {
        a = `<img class="image-show" src="${b}"></img>`,
            h = `IMAGE`
    } else {
        a = `<div class="player-box"><iframe class="player" src="${b}" frameborder="0" allowfullscreen></iframe> 
        </div>`,
            h = `TRAILER`
    }
    var modal = `<div class="modal js--modal">
    <div class="modal-container js--container">
        <header class="modal-header">
            <h4 class="modal-heading">${h}</h4>
            <button class="btn js--close" type="button">×</button>
        </header>
        <div class="modal-body">${a}</div>
        <footer class="modal-footer">
            <button class="btn js--close" type="button">Close</button>
        </footer>
    </div>
</div>`;

    jQuery('body').append(modal);
    jQuery('.js--close').click(function() {
        jQuery('.js--modal').remove()
    })
    jQuery('.js--modal').click(function() {
        jQuery('.js--modal').remove()
    });
    jQuery('.js--container').click(function(event) {
        event.stopPropagation()
    })
});

/*Toast*/
var toastTime = 5000;

function toast({
    msg = '',
    type = '',
    dur = ''
}) {
    var $toast = document.getElementById('toast');
    if ($toast) {
        var toast = document.createElement('div');
        toast.onclick = function(e) {
            if (e.target.closest('.toast-' + type)) {
                toast.remove('toast')
            }
        }
        setTimeout(function() { toast.remove(toast) }, dur)
        toast.className = `toast toast-${type}`;
        toast.style.animation = `toastMsg ${dur}ms cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards`
        toast.innerHTML = `<div class="toast-msg">${msg}</div>`;
        $toast.appendChild(toast)
    }
}

function itemsMovies({
    id = '',
    poster = '',
    title = '',
    original_title = '',
    release_date = '',
    icon = '',
    type = '',
    column = 'l-2 m-3 s-6'
}) {
    var optionType = (type == 'movie' || type == 'tv') ?
        `<button class="post-overplay isRequest" title="Request ${type}" data-index="${id}" data-type="${type}"></button>` :
        `<button class="post-overplay"><a class="post-overplay-btn" id="${type}" ${type}="${id}" title="Watch ${type}"></a></button>`;
    var show = document.querySelector('#request');
    var item = document.createElement('article');
    item.className = `col ${column}`;
    item.style.animation = 'showMovies linear .5s';
    item.innerHTML = `
    <div class="post">
        <a id="${type}" ${type}="${id}" class="post-link">
            <div class="post-image ${icon}">
                <img src="${poster}" title="${title}" class="post-image-img">
            </div>
            <div class="post-title">
                <h3 class="post-title-en">${title}</h3>
                <h4 class="post-title-vi">${original_title}</h4>
            </div>
        </a>
    </div>
    <div class="post-status">
        <span class="post-status-text">${type} | ${release_date}</span>
    </div>
   ${optionType}`
    show.appendChild(item)
};

function showListProfile({
    profile_id = '',
    profile_name = '',
    profile_charater = '',
    profile_path = '',
    column = 'l-4 m-6 s-12'
}) {
    return `
    <article class="col ${column}">
        <div class="post-item">
            <a  id="person" person="${profile_id}" title="${profile_name} as ${profile_charater}" class="item-link">
                <div class="item-image icon-info">
                    <img src="${profile_path}" class="item-image-img loading">
                </div>
                <div class="item-title">
                    <h3 class="item-title-en">${profile_name}</h3>
                    <h4 class="item-title-vi">${profile_charater}</h4>
                </div>
            </a>
        </div>
        <div class="item-status">
            <span class="item-status-text"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="icon-address-card"><g><path d="M3,3v18h18V3H3z M4.99,20c0.39-2.62,2.38-5.1,7.01-5.1s6.62,2.48,7.01,5.1H4.99z M9,10c0-1.65,1.35-3,3-3s3,1.35,3,3 c0,1.65-1.35,3-3,3S9,11.65,9,10z M12.72,13.93C14.58,13.59,16,11.96,16,10c0-2.21-1.79-4-4-4c-2.21,0-4,1.79-4,4 c0,1.96,1.42,3.59,3.28,3.93c-4.42,0.25-6.84,2.8-7.28,6V4h16v15.93C19.56,16.73,17.14,14.18,12.72,13.93z" class="style-scope yt-icon"></path></g></svg> ${profile_charater.slice(0,18)}</span>
        </div>
        <button class="item-overplay">
            <a href="/search/label/p_${profile_id}" class="item-overplay-btn" title="Info" target="_blank"></a>
        </button>
    </article>`
};

function showListImages({
    image = '',
    imageZoom = '',
    column = 'l-4 m-4 s-6'
}) {
    return `<article class="col ${column}">
    <div class="post media">
        <a class="post-link show-image" data-src="${imageZoom}">
            <div class="post-image icon-info">
                <img src="${image}" class="post-image-img">
            </div>
        </a>
    </div>
    </article>`
};

function showListTrailer({ trailer_key = '', trailer_img = '', trailer_name = '', trailer_type = '', trailer_overview = '', column = 'l-4 m-4 s-6' }) {
    return `<article class="col ${column}">
    <div class="post media">
        <a class="post-link show-image" data-src="${trailer_key}">
            <div class="post-image icon-trailer">
                <img src="${trailer_img}/hqdefault.jpg" class="post-image-img">
            </div>
            <div class="post-title">
                <h3 class="post-title-en">${trailer_name}</h3>
                <h4 class="post-title-vi">${trailer_type}</h4>
            </div>
        </a>
    </div>
    <button class="post-overplay"><a data-src="${trailer_key}" class="post-overplay-btn play-video" title="Watch"></a></button>
</article>`
};


function showListSimilar({ id = '', poster = '', title = '', original_title = '', status = '', type = '', column = 'l-2 m-3 s-6' }) {
    return `<article class="col ${column}">
    <div class="post">
        <a id="${type}" ${type}="${id}" class="post-link">
            <div class="post-image icon-info">
                <img src="${poster}" title="${title}" class="post-image-img">
            </div>
            <div class="post-title">
                <h3 class="post-title-en">${title}</h3>
                <h4 class="post-title-vi">${original_title}</h4>
            </div>
        </a>
    </div>
    <div class="post-status">
        <span class="post-status-text">${type} | ${status}</span>
    </div>
    <button class="post-overplay isRequest" title="Request" data-index="${id}" data-type="${type}"></button>
</article>`
};

function showInfoRequest({
    id = '',
    imdb_id = '',
    poster = '',
    poster_path = '',
    title = '',
    original_title = '',
    trailer = '',
    btn = '',
    overview = '',
    country = '',
    genre = '',
    release = '',
    rating = '',
    runtime = '',
    type = '',
    display = ''
}) {
    release = (release != '') ? `(${release})` : ``;
    return `<div class="information">
   <div class="information-poster checkIMDb${imdb_id}">
      <a class="poster-inner">
      <img src="${poster}" title="${title} (${release})" class="poster">
      </a>
   <button class="form-control isRequest" id="form-${imdb_id}" title="Request" style="${display}" data-index="${id}" data-type="${type}"></button>
   </div>
   <div class="information-banner">
      <h3 class="banner-title" title="${original_title} (${release})">${original_title} ${release}</h3>
      <div class="banner-status">${btn}</div>
      <div class="banner-overview">
         <p class="overview-desc">${overview}</p>
      </div>
   </div>
</div>
<div class="information-content">
   <div class="content-label">
      <h3 class="content-label-icon">
         <svg class="icon-label" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <g>
               <path d="M11.99,1.98C6.46,1.98,1.98,6.47,1.98,12s4.48,10.02,10.01,10.02c5.54,0,10.03-4.49,10.03-10.02S17.53,1.98,11.99,1.98z M8.86,14.5c-0.16-0.82-0.25-1.65-0.25-2.5c0-0.87,0.09-1.72,0.26-2.55h6.27c0.17,0.83,0.26,1.68,0.26,2.55 c0,0.85-0.09,1.68-0.25,2.5H8.86z M14.89,15.5c-0.54,1.89-1.52,3.64-2.89,5.15c-1.37-1.5-2.35-3.25-2.89-5.15H14.89z M9.12,8.45 c0.54-1.87,1.52-3.61,2.88-5.1c1.36,1.49,2.34,3.22,2.88,5.1H9.12z M16.15,9.45h4.5c0.24,0.81,0.37,1.66,0.37,2.55 c0,0.87-0.13,1.71-0.36,2.5h-4.51c0.15-0.82,0.24-1.65,0.24-2.5C16.39,11.13,16.3,10.28,16.15,9.45z M20.29,8.45h-4.38 c-0.53-1.97-1.47-3.81-2.83-5.4C16.33,3.45,19.04,5.56,20.29,8.45z M10.92,3.05c-1.35,1.59-2.3,3.43-2.83,5.4H3.71 C4.95,5.55,7.67,3.44,10.92,3.05z M3.35,9.45h4.5C7.7,10.28,7.61,11.13,7.61,12c0,0.85,0.09,1.68,0.24,2.5H3.34 c-0.23-0.79-0.36-1.63-0.36-2.5C2.98,11.11,3.11,10.26,3.35,9.45z M3.69,15.5h4.39c0.52,1.99,1.48,3.85,2.84,5.45 C7.65,20.56,4.92,18.42,3.69,15.5z M13.09,20.95c1.36-1.6,2.32-3.46,2.84-5.45h4.39C19.08,18.42,16.35,20.55,13.09,20.95z"></path>
            </g>
         </svg>
      </h3>
      <h4 class="content-label-item">${country}</h4>
   </div>
   <div class="content-label">
      <h3 class="content-label-icon">
         <svg class="icon-label" data-name="Layer 1" fill="" id="Layer_1" viewBox="0 0 16 16">
            <path class="cls-1" d="M4,13H2V11H4Zm10-2H6v2h8ZM4,7H2V9H4ZM14,7H6V9h8ZM4,3H2V5H4ZM14,3H6V5h8Z"></path>
         </svg>
      </h3>
      <h4 class="content-label-item">${genre}</h4>
   </div>
   <div class="content-label">
      <h3 class="content-label-icon">
         <svg class="icon-label" viewBox="0 0 48 48">
            <g data-name="Layer 2" id="Layer_2">
               <g data-name="invisible box" id="invisible_box">
                  <rect fill="none" height="48" width="48"></rect>
               </g>
               <g data-name="icons Q2" id="icons_Q2">
                  <path d="M44,8H35V4.1A2.1,2.1,0,0,0,33.3,2,2,2,0,0,0,31,4V8H17V4.1A2.1,2.1,0,0,0,15.3,2,2,2,0,0,0,13,4V8H4a2,2,0,0,0-2,2V42a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V10A2,2,0,0,0,44,8ZM42,40H6V20H42Zm0-24H6V12H42Z"></path>
               </g>
            </g>
         </svg>
      </h3>
      <h4 class="content-label-item">${release}</h4>
   </div>
   <div class="content-label">
      <h3 class="content-label-icon">
         <svg class="icon-label" viewBox="0 0 20 20">
            <rect x="0" fill="none" width="20" height="20"/>
            <g>
               <path d="M10 1L7 7l-6 .75 4.13 4.62L4 19l6-3 6 3-1.12-6.63L19 7.75 13 7zm0 2.24l2.34 4.69 4.65.58-3.18 3.56.87 5.15L10 14.88l-4.68 2.34.87-5.15-3.18-3.56 4.65-.58z"/>
            </g>
         </svg>
      </h3>
      <h4 class="content-label-item">${rating}</h4>
   </div>
   <div class="content-label">
      <h3 class="content-label-icon">
         <svg class="icon-label" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <g>
               <path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"></path>
            </g>
         </svg>
      </h3>
      <h4 class="content-label-item">${runtime}</h4>
   </div>
</div>`
}