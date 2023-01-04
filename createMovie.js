jQuery(document).on('click', '#person', function() {
    var personID = $(this).attr('person'),
        numTab = Math.floor(Math.random() * 100),
        poster_path, profile_path, display = 'display:none';
    jQuery.getJSON(`${objTMDb.base_url}/person/${personID}?append_to_response=movie_credits&api_key=${objTMDb.api_key}&language=${objTMDb.language()}`).done(function(data) {
        profile_path = data.profile_path == null ? objTMDb.profile_no_url : objTMDb.poster_url + data.profile_path;
        var showHtml = showInfoRequest({
            id: data.id,
            imdb_id: data.id,
            poster: profile_path,
            poster_path: data.profile_path,
            title: data.name,
            original_title: data.also_known_as,
            trailer: '',
            btn: `<span class="banner-status-item">Person</span>
        <span class="banner-status-item"><a href="${objTMDb.vioHD}/search/label/p_${data.id}" class="" target="_blank">Full Info</a></span>`,
            overview: data.biography,
            country: data.place_of_birth,
            genre: data.known_for_department,
            release: data.birthday,
            rating: data.popularity,
            runtime: data.deathday,
            type: 'person',
            display: display
        });
        showHtml += `<ul class="tabs-list">
    <li class="tabs-item fade show" data-tab="tab-1${numTab}"><a class="tabs-link">Known For Movies</a></li>
    </ul>`;
        showHtml += `<div class="tabs-content">
    <div class="tabs-panel fade show" id="tab-1${numTab}">
    <div class="row">`;
        jQuery.each(data.movie_credits.cast, function(i, item) {
            poster_path = item.poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + item.poster_path;
            original_title = (item.original_title === item.title) ? item.release_date : item.original_title;
            showHtml += showListSimilar({
                id: item.id,
                poster: poster_path,
                title: item.title,
                original_title: original_title,
                status: item.release_date.split('-').shift(),
                type: 'movie',
                column: 'l-3 m-3 s-6'
            })
        });
        showHtml += '</div></div></div>';
        showModal({
            title: data.name,
            content: showHtml
        })
    }).fail(function(jqXHR, textStatus, error) {
        toast({
            msg: `Request Failed: ${textStatus} ${movie}`,
            type: 'error',
            dur: toastTime
        })
    })
});
jQuery(document).on('click', '#movieIMDb', function() {
    var movieID = $(this).attr('movieIMDb'),
        display = $(this).attr('none'),
        poster_path, showHtml = '';
    jQuery.getJSON(`${objTMDb.base_uri}/?i=${movieID}&apikey=${objTMDb.apiKey}&plot=full&r=json`).done(function(data) {
        var c = [];
        if (data.Country) {
            data.Country.split(', ').forEach(function(Country) {
                c.push(`<a href="${objTMDb.vioHD}/search/label/${Country}" target="_blank">${Country}</a>`)
            })
        }
        var cy = c.join(', ');
        var g = [];
        if (data.Genre) {
            data.Genre.split(', ').forEach(function(Genre) {
                g.push(`<a href="${objTMDb.vioHD}/search/label/${Genre}" target="_blank">${Genre}</a>`)
            })
        }
        var gn = g.join(', ');
        poster_path = data.Poster == null ? 'N/A' : data.Poster;
        showHtml += showInfoRequest({
            id: data.imdbID,
            imdb_id: data.imdbID,
            poster: poster_path,
            poster_path: data.Poster,
            title: data.Title,
            original_title: data.Title,
            trailer: '',
            btn: `<span class="banner-status-item">Movie</span>
        <span class="banner-status-item"><a href="${objTMDb.IMDb_url + data.imdbID}" target="_blank">IMDb</a></span>
        <span class="banner-status-item"><a href="${objTMDb.vioHD}/search/label/m-${data.imdbID}" target="_blank">See Full Information</a></span>`,
            overview: data.Plot,
            country: cy,
            genre: gn,
            release: data.Year,
            rating: data.Rated,
            runtime: data.Runtime,
            type: 'movie',
            display: display
        });
        showModal({
            title: data.Title,
            content: showHtml
        });
        CheckIMDb(data.imdbID)
    }).fail(function(jqXHR, textStatus, error) {
        toast({
            msg: `Request Failed: ${textStatus} ${movie}`,
            type: 'error',
            dur: toastTime
        })
    })
});

jQuery(document).on('click', '#movie', function() {
    var movieID = $(this).attr('movie'),
        display = $(this).attr('none'),
        numTab = Math.floor(Math.random() * 100),
        poster_path, backdrops_img, profile_path, watch, showHtml = '';
    jQuery.getJSON(`${objTMDb.base_url}/movie/${movieID}?api_key=${objTMDb.api_key}&language=${objTMDb.language()}&append_to_response=alternative_titles,credits,similar,videos,trailers,images&include_image_language=en,null`).done(function(data) {
        var input_trailer;
        jQuery.each(data.trailers.youtube, function(i, item) {
            if (i > 1) return !1;
            input_trailer = item.source
        });
        var c = [];
        if (data.production_countries) {
            data.production_countries.forEach(function(country) {
                c.push(`<a href="${objTMDb.vioHD}/search/label/${country.name}" target="_blank">${country.name}</a>`)
            })
        }
        var cy = c.join(', ');
        var g = [];
        if (data.genres) {
            data.genres.forEach(function(genre) {
                g.push(`<a href="${objTMDb.vioHD}/search/label/${objTMDb.objCategories[genre.id]}" target="_blank">${objTMDb.objCategories[genre.id]}</a>`)
            })
        }
        var gn = g.join(', ');
        poster_path = data.poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.poster_path;
        var imdbID = data.imdb_id == null ? data.id : data.imdb_id;
        showHtml += showInfoRequest({
            id: data.id,
            imdb_id: imdbID,
            poster: poster_path,
            poster_path: data.poster_path,
            title: data.title,
            original_title: data.original_title,
            trailer: input_trailer,
            btn: `<span class="banner-status-item">Movie</span>
            <span class="banner-status-item"><a href="${objTMDb.IMDb_url + data.imdb_id}" class="" target="_blank">IMDb</a></span>
            <span class="banner-status-item"><a href="${objTMDb.TMDb_movie_url + data.id}" class="" target="_blank">TMDb</a></span>
            <span class="banner-status-item"><a href="${objTMDb.vioHD}/search/label/m-${imdbID}" class="" target="_blank">Full Info</a></span>`,
            overview: data.overview,
            country: cy,
            genre: gn,
            release: data.release_date.split('-').shift(),
            rating: `${data.vote_average} / ${data.vote_count}`,
            runtime: data.runtime,
            type: 'movie',
            display: display
        });

        if (data.belongs_to_collection) {
            var backdrops = data.belongs_to_collection.backdrop_path == null ? objTMDb.backdrops_no_url : `//image.tmdb.org/t/p/w1440_and_h320_multi_faces${data.belongs_to_collection.backdrop_path}`;
            showHtml += `<div class="row collection" data-selection="false">
        <article class="col l-12 m-12 s-12" style="background-image:url(${backdrops})">
        <div class="post-item">
            <a href="${objTMDb.vioHD}/search/label/c-${data.belongs_to_collection.id}" class="item-link">
                <div class="item-image icon-info">
                     <img src="${poster_path}" class="post-image-img">
                </div>
                <div class="item-title">
                    <h3 class="item-title-en">${data.belongs_to_collection.name}</h3>
                    <h4 class="item-title-vi">Collections</h4>
                </div>
            </a>
        </div>

        <div class="item-status">
            <span class="item-status-text">Collections</span>
        </div>
        <button class="item-overplay">
            <a href="${objTMDb.vioHD}/search/label/c-${data.belongs_to_collection.id}" class="item-overplay-btn" target="_blank" title="Watch Now"></a>
        </button>
    </article></div>`
        };

        showHtml += `<ul class="tabs-list">
    <li class="tabs-item fade show" data-tab="tab-1${numTab}"><a class="tabs-link">Cast</a></li>
    <li class="tabs-item" data-tab="tab-2${numTab}"><a class="tabs-link">Crew</a></li>
    <li class="tabs-item" data-tab="tab-3${numTab}"><a class="tabs-link">Images</a></li>
    <li class="tabs-item" data-tab="tab-4${numTab}"><a class="tabs-link">Trailers</a></li>
    <li class="tabs-item" data-tab="tab-5${numTab}"><a class="tabs-link">Recommendations</a></li>
    </ul>`;

        showHtml += `<div class="tabs-content">
    <div class="tabs-panel fade show" id="tab-1${numTab}">
    <div class="row" data-selection="false">`;
        jQuery.each(data.credits.cast, function(i, item) {
            profile_path = item.profile_path == null ? objTMDb.profile_no_url : objTMDb.profile_url + item.profile_path;
            showHtml += showListProfile({
                profile_id: item.id,
                profile_name: item.name,
                profile_charater: item.character,
                profile_path: profile_path,
                column: 'l-12 m-12 s-12'
            })
        });
        showHtml += `</div></div>`;
        showHtml += `<div class="tabs-panel fade" id="tab-2${numTab}">
    <div class="row" data-selection="false">`;
        jQuery.each(data.credits.crew, function(i, item) {
            profile_path = item.profile_path == null ? objTMDb.profile_no_url : objTMDb.profile_url + item.profile_path;
            showHtml += showListProfile({
                profile_id: item.id,
                profile_name: item.name,
                profile_charater: item.department,
                profile_path: profile_path,
                column: 'l-12 m-12 s-12',
            })
        });
        showHtml += `</div></div>`;
        showHtml += `<div class="tabs-panel fade images" id="tab-3${numTab}">
    <div class="row">`;
        jQuery.each(data.images.backdrops, function(i, item) {
            backdrops_img = item.file_path == null ? objTMDb.backdrops_no_url : objTMDb.backdrops_url + item.file_path;
            showHtml += showListImages({
                image: backdrops_img,
                imageZoom: objTMDb.original_img_url + item.file_path,
                column: 'l-4 m-4 s-6',
            })
        });
        jQuery.each(data.images.posters, function(i, item) {
            poster_path = item.file_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + item.file_path;
            showHtml += showListImages({
                image: poster_path,
                imageZoom: objTMDb.original_img_url + item.file_path,
                column: 'l-4 m-4 s-6',
            })
        });
        showHtml += `'</div></div>`;
        showHtml += `<div class="tabs-panel fade trailers" id="tab-4${numTab}">
    <div class="row">`;
        jQuery.each(data.videos.youtube, function(i, item) {
            showHtml += showListTrailer({
                trailer_key: objTMDb.trailer_tube_url + item.key,
                trailer_img: objTMDb.trailer_img_url + item.key,
                trailer_name: item.name,
                trailer_type: item.type,
                trailer_overview: item.overview,
                column: 'l-6 m-6 s-12',
            })
        });
        jQuery.each(data.trailers.youtube, function(i, item) {
            showHtml += showListTrailer({
                trailer_key: objTMDb.trailer_tube_url + item.source,
                trailer_img: objTMDb.trailer_img_url + item.source,
                trailer_name: item.name,
                trailer_type: item.type,
                trailer_overview: item.overview,
                column: 'l-6 m-6 s-12',
            })
        });
        showHtml += `</div></div>`;
        showHtml += `<div class="tabs-panel fade" id="tab-5${numTab}">
    <div class="row">`;
        jQuery.each(data.similar.results, function(i, item) {
            poster_path = item.poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + item.poster_path;
            original_title = (item.original_title === item.title) ? item.release_date : item.original_title;
            showHtml += showListSimilar({
                id: item.id,
                poster: poster_path,
                title: item.title,
                original_title: original_title,
                status: item.release_date.split('-').shift(),
                type: 'movie',
                column: 'l-3 m-3 s-6'
            })
        });
        showHtml += `</div></div>`;
        showModal({
            title: data.title,
            content: showHtml
        });
        CheckIMDb(imdbID)
    }).fail(function(jqXHR, textStatus, error) {
        toast({
            msg: `Request Failed: ${textStatus} ${movie}`,
            type: 'error',
            dur: toastTime
        })
    })
});

jQuery(document).on('click', '#tv', function() {
    var tvID = $(this).attr('tv'),
        display = $(this).attr('none'),
        numTab = Math.floor(Math.random() * 100),
        poster_path, backdrops_img, profile_path, showHtml = '';
    jQuery.getJSON(`${objTMDb.base_url}/tv/${tvID}?api_key=${objTMDb.api_key}&language=${objTMDb.language()}&append_to_response=alternative_titles,credits,similar,videos,trailers,images&include_image_language=en,null`).done(function(data) {
        var input_trailer;
        jQuery.each(data.videos.results, function(i, item) {
            if (i > 1) return !1;
            input_trailer = item.key
        });
        var c = [];
        if (data.production_countries) {
            data.production_countries.forEach(function(country) {
                c.push(`<a href="${objTMDb.vioHD}/search/label/${country.name}" target="_blank">${country.name}</a>`)
            })
        }
        var cy = c.join(', ');
        var g = [];
        if (data.genres) {
            data.genres.forEach(function(genre) {
                g.push(`<a href="${objTMDb.vioHD}/search/label/${objTMDb.objCategories[genre.id]}" target="_blank">${objTMDb.objCategories[genre.id]}</a>`)
            })
        }
        var gn = g.join(', ');
        poster_path = data.poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.poster_path;
        showHtml += showInfoRequest({
            id: data.id,
            imdb_id: data.id,
            poster: poster_path,
            poster_path: data.poster_path,
            title: data.name,
            original_title: data.original_name,
            trailer: input_trailer,
            btn: `<span class="banner-status-item">TV</span>
            <span class="banner-status-item"><a href="${objTMDb.TMDb_tv_url + data.id}" class="" target="_blank">TMDb</a></span>
            <span class="banner-status-item"><a href="${objTMDb.vioHD}/search/label/tv-${data.id}" class="" target="_blank">Full Info</a></span>`,
            overview: data.overview,
            country: cy,
            genre: gn,
            release: `${data.first_air_date} / ${data.last_air_date}`,
            rating: `${data.vote_average} / ${data.vote_count}`,
            runtime: data.episode_run_time,
            type: 'tv',
            display: display
        });
        showHtml += `<ul class="tabs-list">
    <li class="tabs-item fade show" data-tab="tab-1${numTab}"><a class="tabs-link">Cast</a></li>
    <li class="tabs-item" data-tab="tab-2${numTab}"><a class="tabs-link">Crew</a></li>
    <li class="tabs-item" data-tab="tab-3${numTab}"><a class="tabs-link">Images</a></li>
    <li class="tabs-item" data-tab="tab-4${numTab}"><a class="tabs-link">Trailers</a></li>
    <li class="tabs-item" data-tab="tab-5${numTab}"><a class="tabs-link">Seasons</a></li>
    </ul>`;
        showHtml += `<div class="tabs-content">
    <div class="tabs-panel fade show" id="tab-1${numTab}">
    <div class="row" data-selection="false">`;
        jQuery.each(data.credits.cast, function(i, item) {
            profile_path = item.profile_path == null ? objTMDb.profile_no_url : objTMDb.profile_url + item.profile_path;
            showHtml += showListProfile({
                profile_id: item.id,
                profile_name: item.name,
                profile_charater: item.character,
                profile_path: profile_path,
                column: 'l-12 m-12 s-12',
            })
        });
        showHtml += `</div></div>`;
        showHtml += `<div class="tabs-panel fade" id="tab-2${numTab}">
    <div class="row" data-selection="false">`;
        jQuery.each(data.credits.crew, function(i, item) {
            profile_path = item.profile_path == null ? objTMDb.profile_no_url : objTMDb.profile_url + item.profile_path;
            showHtml += showListProfile({
                profile_id: item.id,
                profile_name: item.name,
                profile_charater: item.department,
                profile_path: profile_path,
                column: 'l-12 m-12 s-12',
            })
        });
        showHtml += `</div></div>`;
        showHtml += `<div class="tabs-panel fade" id="tab-3${numTab}">
    <div class="row">`;
        jQuery.each(data.images.backdrops, function(i, item) {
            backdrops_img = item.file_path == null ? objTMDb.backdrops_no_url : objTMDb.backdrops_url + item.file_path;
            showHtml += showListImages({
                image: backdrops_img,
                imageZoom: objTMDb.original_img_url + item.file_path,
            })
        });
        showHtml += `</div></div>`;
        showHtml += `<div class="tabs-panel fade" id="tab-4${numTab}">
    <div class="row">`;
        jQuery.each(data.videos.results, function(i, item) {
            showHtml += showListTrailer({
                trailer_key: objTMDb.trailer_tube_url + item.key,
                trailer_img: objTMDb.trailer_img_url + item.key,
                trailer_name: item.name,
                trailer_type: item.type,
                trailer_overview: item.overview,
            })
        });
        showHtml += `</div></div>`;
        showHtml += `<div class="tabs-panel fade" id="tab-5${numTab}">
    <div class="row">`;
        jQuery.each(data.seasons, function(i, item) {
            poster_path = item.poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + item.poster_path;
            showHtml += showListSimilar({
                id: item.id,
                poster: poster_path,
                title: item.name,
                original_title: item.last_air_date,
                status: item.air_date.split('-').shift(),
                type: 'season',
                column: 'l-3 m-3 s-6',
            })
        });
        showHtml += '</div></div>';
        showModal({
            title: data.name,
            content: showHtml
        });
        CheckIMDb(data.id)
    }).fail(function(jqXHR, textStatus, error) {
        toast({
            msg: `Request Failed: ${textStatus} ${movie}`,
            type: 'error',
            dur: toastTime
        })
    })
});

function CheckIMDb(Id) {
    var a = getID('checkID');
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = `${objTMDb.vioHD}/feeds/posts/default?q=${Id}&max-result=1&alt=json-in-script&callback=checkMovie`;
    a.appendChild(s)
};

function checkMovie(json) {
    var numbeR = (json.feed.entry == undefined) ? 0 : json.feed.entry.length;
    for (var i = 0; i < numbeR; i++) {
        var entry = json.feed.entry[i];
        var n = entry.title.$t;
        var r;
        if (i == numbeR) break;
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') {
                r = entry.link[k].href;
                break
            }
        }

        function vn(n) {
            return -1 != n.indexOf(n) ? n.split("-")[0].replace(/(\[.*?\])/gi, "") : n
        }
        var m = entry.content.$t.match(/<img.*?.id="mvi-thumb-data".src="(.*?)"/)[1],
            m = m.includes('/t/p/original') ? m.replace(/\/t\/p\/original/gi, "/t/p/w220_and_h330_face") : m,
            s = entry.content.$t.match(/\[(.*?)\]/i),
            id = entry.content.$t.match(/\^?<div id=\"mvi-imdb-data\">(.*?)\<\/div>/i)[1];
        jQuery('.checkIMDb' + id).html(`<article class="col">
<div class="post">
    <a href="${r}" class="post-link">
        <div class="post-image icon-overplay">
            <img src="${m}" title="${n}" class="post-image-img">
        </div>
        <div class="post-title">
            <h3 class="post-title-en">${vn(n)}</h3>
        </div>
    </a>
</div>
<div class="post-status">
    <span class="post-status-text">${s[1].slice(0, 3).toUpperCase()}</span>
</div>
<button class="post-overplay">
    <a href="${r}" class="post-overplay-btn" title="Watch"></a>
</button>
</article>`);
        jQuery('#form-' + id).remove()
        jQuery('.checkIMDb' + id).css('padding-bottom', '0%')

    }
};

var databaseRequestURL = new Firebase('requestmov-c5622-default-rtdb.firebaseio.com/requests/');

jQuery(document).on('click', '.isRequest', function(event) {
    if (event.target.closest(".isRequest")) {
        var item = event.target.closest(".isRequest"),
            id = item.dataset.index;
        type = item.dataset.type;
        jQuery(item).attr('title', "already")
        addRequest(id, type)
    }
});

function addRequest(id, type) {
    jQuery.getJSON(`${objTMDb.base_url}/${type}/${id}?api_key=${objTMDb.api_key}&language=${objTMDb.language()}&append_to_response=alternative_titles,credits,similar,videos,trailers,images&include_image_language=en,null`).done(function(data) {
        var poster_path = data.poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.poster_path;
        databaseRequestURL.child(id).set({
            'poster': poster_path,
            'title': data.title,
            'type': type,
            'id': id,
            time: (new Date()).toLocaleDateString("vi-VN")
        })
        toast({
            msg: `The movie you requested has been added`,
            type: 'success',
            dur: toastTime
        })
        getData()
    }).fail(function(jqXHR, textStatus, error) {
        toast({
            msg: `Request Failed: ${textStatus} ${movie}`,
            type: 'error',
            dur: toastTime
        })
    })
}