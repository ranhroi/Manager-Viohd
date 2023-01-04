var objTMDb = {
    objCountries: { 'US': 'United States', 'VN': 'Vietnam', 'CN': 'China', 'HK': 'Hong Kong', 'TW': 'Taiwan', 'KR': 'Korean', 'JP': 'Japan', 'TH': 'Thailand', 'IT': 'Italy' },
    objLanguages: { 'en-US': 'English', 'vi-VN': 'Vietnamese', 'zh-CN': 'Chinese', 'zh-HK': 'Hong Kong', 'zh-TW': 'Taiwan', 'ko-KR': 'Korean', 'ja-JP': 'Japan', 'th-TH': 'Thailand', 'it-IT': 'Italian', 'de-DE': 'German', 'hi-IN': 'Hindi', 'id-ID': 'Indonesian', 'ms-MY': 'Malay', 'ru-RU': 'Russian' },
    objCategories: { '0': 'Genres', 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western", 10759: "Action & Adventure", 10762: "Kids", 10763: "News", 10764: "Reality", 10765: "Sci-Fi & Fantasy", 10766: "Soap", 10767: "Talk", 10768: "War & Politics" },
    getID: function(a) {
        return jQuery("#" + a).val()
    },
    type: function() {
        return this.getID("types")
    },
    language: function() {
        return this.getID("languages")

    },
    country: function() {
        return this.getID("country");

    },
    genre: function() {
        return this.getID("category");

    },
    year: function() {
        return this.getID("years");

    },
    checks: function() {
        return this.getID("discover");

    },
    IMDb: function() {
        return this.getID("IMDb");

    },
    credits: function() {
        return this.getID("Credits");

    },
    castCrew: function() {
        return this.getID("CastCrew");

    },
    databaseRequestURL: new Firebase('requestmov-c5622-default-rtdb.firebaseio.com/requests/'),
    apiKey: '89a9f57d',
    api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
    base_url: 'https://api.themoviedb.org/3',
    base_uri: 'https://www.omdbapi.com',
    poster_url: 'https://image.tmdb.org/t/p/w220_and_h330_face',
    poster_no_url: 'https://pvttn70.files.wordpress.com/2020/10/img.png',
    backdrops_url: 'https://image.tmdb.org/t/p/w533_and_h300_bestv2',
    backdrops_no_url: 'https://pvttn70.files.wordpress.com/2020/10/img.png',
    original_img_url: 'https://image.tmdb.org/t/p/original',
    profile_url: 'https://image.tmdb.org/t/p/w138_and_h175_face',
    profile_no_url: 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB466677935_.png',
    trailer_img_url: 'https://i.ytimg.com/vi/',
    Watch_url: '',
    trailer_tube_url: 'https://www.youtube.com/watch?v=',
    IMDb_url: 'https://www.imdb.com/title/',
    TMDb_movie_url: 'https://www.themoviedb.org/movie/',
    TMDb_tv_url: 'https://www.themoviedb.org/tv/',
    Google_url: 'https://www.google.com/search?q='
};
jQuery(document).on('click', '#submit', function(validate) {
    validate = Validate();
    jQuery('#request').html(validate)
    if (validate.length == 0) { CallAPI(1) }
});
jQuery(document).on('input', '#input', function(validate) {
    validate = Validate();
    jQuery('#request').html(validate)
    if (validate.length == 0) { CallAPI(1) }
});

jQuery(document).on('change', 'select', function(validate) {
    validate = Validate();
    jQuery('#request').html(validate)
    if (validate.length == 0) { CallAPI(1) }
});

for (i = 2022; i >= 1910; i--) { $('#years').append(`<option>${i}</option>`) };
var arrayCountries = Object.keys(objTMDb.objCountries),
    arrayLanguage = Object.keys(objTMDb.objLanguages),
    arrayCategories = Object.keys(objTMDb.objCategories),
    resultLanguage = '',
    resultCountry = '',
    resultGenre = '';
arrayCountries.forEach(function(i) {
    resultCountry += `<option value="${i}">${objTMDb.objCountries[i]}</option>`;
    getID('country').innerHTML = resultCountry
})
arrayLanguage.forEach(function(i) {
    resultLanguage += `<option value="${i}">${objTMDb.objLanguages[i]}</option>`;
    getID('languages').innerHTML = resultLanguage
});
arrayCategories.forEach(function(i) {
    resultGenre += `<option value="${i}">${objTMDb.objCategories[i]}</option>`;
    getID('category').innerHTML = resultGenre
});
var groupDiscover = getID("discover"),
    groupTypes = getID('group-types'),
    groupIMDb = getID('group-IMDb'),
    groupCountry = getID('group-country'),
    groupCategory = getID('group-category'),
    groupLanguages = getID('group-languages'),
    groupYears = getID('group-years'),
    groupInput = getID('group-input'),
    groupTyOp = getAll('#group-types option');

groupDiscover.addEventListener('change', function() {
    if (this.value === 'country') {
        groupTyOp[2].style.display = 'none';
        groupTyOp[3].style.display = 'none';
        groupTypes.style.display = 'block';
        groupCountry.style.display = 'block';
        groupCategory.style.display = 'none';
        groupLanguages.style.display = 'block';
        groupYears.style.display = 'block';
        groupInput.style.display = 'none';
        groupIMDb.style.display = 'none'
    } else if (this.value === 'queryAll') {
        groupTyOp[2].style.display = 'block';
        groupTyOp[3].style.display = 'none';
        groupTypes.style.display = 'block';
        groupCountry.style.display = 'none';
        groupCategory.style.display = 'none';
        groupLanguages.style.display = 'block';
        groupYears.style.display = 'block';
        groupInput.style.display = 'block';
        groupIMDb.style.display = 'none'
    } else if (this.value === 'queryIMDb') {
        groupTyOp[2].style.display = 'block';
        groupTyOp[3].style.display = 'none';
        groupTypes.style.display = 'none';
        groupCountry.style.display = 'none';
        groupCategory.style.display = 'none';
        groupLanguages.style.display = 'none';
        groupYears.style.display = 'block';
        groupInput.style.display = 'block';
        groupIMDb.style.display = 'block'
    } else if (this.value === 'day' || this.value === 'week' || this.value === 'popular' || this.value === 'top_rated' || this.value === 'upcoming' || this.value === 'now_playing') {
        groupTyOp[2].style.display = 'block';
        groupTyOp[3].style.display = 'none';
        groupTypes.style.display = 'block';
        groupCountry.style.display = 'none';
        groupCategory.style.display = 'none';
        groupLanguages.style.display = 'block';
        groupYears.style.display = 'none';
        groupInput.style.display = 'none';
        groupIMDb.style.display = 'none'
    } else if (this.value === 'ID') {
        groupTyOp[2].style.display = 'block';
        groupTyOp[3].style.display = 'block';
        groupTypes.style.display = 'block';
        groupCountry.style.display = 'none';
        groupCategory.style.display = 'none';
        groupLanguages.style.display = 'block';
        groupYears.style.display = 'none';
        groupInput.style.display = 'block';
        groupIMDb.style.display = 'none'
    }
});

function CallAPI(page) {
    jQuery(document).ajaxStart(function() { jQuery('.loadings').show() });
    jQuery(document).ajaxStop(function() { jQuery('.loadings').hide() })
    var poster_path, profile_path, movie, ids;
    if (objTMDb.checks() === 'queryAll' || objTMDb.checks() === 'queryIMDb') {
        movie = (jQuery('#input').val() === '') ? '► Enter Search Text' : jQuery('#input').val().trim()
    } else if (objTMDb.checks() === 'ID') {
        ids = (jQuery('#input').val() === '') ? '► Enter Search Text' : jQuery('#input').val().trim()
    }

    function notify(a, b, c) {
        c = (objTMDb.objCountries[b] == undefined) ? b : objTMDb.objCountries[b];
        var notify = getID('notification');
        notify.innerHTML = `<h4 class="notify-msg">Results found ${a} ${c}</h4>`
    }
    if (objTMDb.checks() === 'ID') {
        jQuery.getJSON(`${objTMDb.base_url}/${objTMDb.type()}/${jQuery('#input').val().trim()}?api_key=${objTMDb.api_key}&language=${objTMDb.language()}`, function(data) {
            if (objTMDb.type() === 'movie') {
                poster_path = data.poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.poster_path;
                original_title = (data.original_title === data.title) ? data.release_date : data.original_title;
                itemsMovies({
                    id: data.id,
                    poster: poster_path,
                    title: data.title,
                    original_title: original_title,
                    release_date: data.release_date.split('-').shift(),
                    icon: 'icon-info',
                    type: objTMDb.type()
                })
            } else if (objTMDb.type() === 'tv') {
                poster_path = data.poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.poster_path;
                original_title = (data.original_name === data.name) ? data.first_air_date : data.original_name;
                itemsMovies({
                    id: data.id,
                    poster: poster_path,
                    title: data.name,
                    original_title: original_title,
                    release_date: data.first_air_date.split('-').shift(),
                    icon: 'icon-info',
                    type: objTMDb.type()
                })
            } else if (objTMDb.type() === 'collection') {
                for (var i = 0; i < data.parts.length; i++) {
                    itemsMovies({
                        id: data.parts[i].id,
                        poster: objTMDb.poster_url + data.parts[i].poster_path,
                        title: data.parts[i].title,
                        original_title: data.parts[i].original_title,
                        release_date: data.parts[i].release_date,
                        icon: 'icon-info',
                        type: 'movie'
                    })
                }
            } else if (objTMDb.type() === 'person') {
                poster_path = data.profile_path == null ? objTMDb.profile_no_url : objTMDb.profile_url + data.profile_path;
                itemsMovies({
                    id: data.id,
                    poster: poster_path,
                    title: data.name,
                    original_title: data.known_for_department,
                    release_date: data.known_for_department,
                    icon: 'icon-info',
                    type: objTMDb.type()
                })
            }
        }).done(function() {
            notify('ID:', ids);
            toast({
                msg: `Request Failed ID: ${ids}`,
                type: 'success',
                dur: toastTime
            })
        }).fail(function(jqXHR, textStatus, error) {
            toast({
                msg: 'Request Failed: ' + textStatus,
                type: 'error',
                dur: toastTime
            })
        })
    } else if (objTMDb.checks() === 'country') {
        notify(objTMDb.type().toUpperCase(), 'Country: ' + objTMDb.objCountries[objTMDb.country()]);
        jQuery.getJSON(`${objTMDb.base_url}/discover/${objTMDb.type()}?certification_${objTMDb.checks()}=${objTMDb.country()}&certification=R&sort_by=vote_average.desc&primary_release_year=${objTMDb.year()}&first_air_date_year=${objTMDb.year()}&api_key=${objTMDb.api_key}&language=${objTMDb.language()}&page=${page}}`).done(function(data) {
            for (i = 0; i < data.results.length; i++) {
                if (objTMDb.type() === 'movie') {
                    poster_path = data.results[i].poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.results[i].poster_path;
                    original_title = (data.results[i].original_title === data.results[i].title) ? data.results[i].release_date : data.results[i].original_title;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: poster_path,
                        title: data.results[i].title,
                        original_title: original_title,
                        release_date: data.results[i].release_date.split('-').shift(),
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                } else if (objTMDb.type() === 'tv') {
                    poster_path = data.results[i].poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.results[i].poster_path;
                    original_title = (data.results[i].original_name === data.results[i].name) ? data.results[i].first_air_date : data.results[i].original_name;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: poster_path,
                        title: data.results[i].name,
                        original_title: original_title,
                        release_date: data.results[i].first_air_date.split('-').shift(),
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                }
            }
            Paging(data.total_pages, data.page, data.total_results, objTMDb.type().toUpperCase() + ' Country: ' + objTMDb.objCountries[objTMDb.country()])
        }).fail(function(jqXHR, textStatus, error) {
            toast({
                msg: `Request Failed: ${error } ${textStatus}`,
                type: 'error',
                dur: toastTime
            })
        })
    } else if (objTMDb.checks() === 'day' || objTMDb.checks() === 'week') {
        notify(objTMDb.type().toUpperCase(), 'Trending: ' + objTMDb.checks());
        jQuery.getJSON(`${objTMDb.base_url}/trending/${objTMDb.type()}/${objTMDb.checks()}?api_key=${objTMDb.api_key}&language=${objTMDb.language()}&include_adult=true&page=${page}`).done(function(data) {
            for (i = 0; i < data.results.length; i++) {
                if (objTMDb.type() === 'movie') {
                    poster_path = data.results[i].poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.results[i].poster_path;
                    original_title = (data.results[i].original_title === data.results[i].title) ? data.results[i].release_date : data.results[i].original_title;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: poster_path,
                        title: data.results[i].title,
                        original_title: original_title,
                        release_date: data.results[i].release_date.split('-').shift(),
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                } else if (objTMDb.type() === 'tv') {
                    poster_path = data.results[i].poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.results[i].poster_path;
                    original_title = (data.results[i].original_name === data.results[i].name) ? data.results[i].first_air_date : data.results[i].original_name;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: poster_path,
                        title: data.results[i].name,
                        original_title: original_title,
                        release_date: data.results[i].first_air_date.split('-').shift(),
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                } else if (objTMDb.type() === 'person') {
                    profile_path = data.results[i].profile_path == null ? objTMDb.profile_no_url : objTMDb.poster_url + data.results[i].profile_path;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: profile_path,
                        title: data.results[i].name,
                        original_title: data.results[i].known_for_department,
                        release_date: data.results[i].known_for_department,
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                }
            }
            Paging(data.total_pages, data.page, data.total_results, objTMDb.type().toUpperCase() + ' Trending: ► ' + objTMDb.checks())
        }).fail(function(jqXHR, textStatus, error) {
            toast({
                msg: `Request Failed: ${error} ${textStatus}`,
                type: 'error',
                dur: toastTime
            })
        })
    } else if (objTMDb.checks() === 'top_rated' || objTMDb.checks() === 'popular' || objTMDb.checks() === 'now_playing' || objTMDb.checks() === 'upcoming' || objTMDb.checks() === 'latest') {
        notify(objTMDb.type().toUpperCase(), ': ' + objTMDb.checks());
        jQuery.getJSON(`${objTMDb.base_url}/${objTMDb.type()}/${objTMDb.checks()}?api_key=${objTMDb.api_key}&language=${objTMDb.language()}&include_adult=true&page=${page}`).done(function(data) {
            for (i = 0; i < data.results.length; i++) {
                if (objTMDb.type() === 'movie') {
                    poster_path = data.results[i].poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.results[i].poster_path;
                    original_title = (data.results[i].original_title === data.results[i].title) ? data.results[i].release_date : data.results[i].original_title;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: poster_path,
                        title: data.results[i].title,
                        original_title: original_title,
                        release_date: data.results[i].release_date.split('-').shift(),
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                } else if (objTMDb.type() === 'tv') {
                    poster_path = data.results[i].poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.results[i].poster_path;
                    original_title = (data.results[i].original_name === data.results[i].name) ? data.results[i].first_air_date : data.results[i].original_name;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: poster_path,
                        title: data.results[i].name,
                        original_title: original_title,
                        release_date: data.results[i].first_air_date.split('-').shift(),
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                } else if (objTMDb.type() === 'person') {
                    profile_path = data.results[i].profile_path == null ? objTMDb.profile_no_url : objTMDb.poster_url + data.results[i].profile_path;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: profile_path,
                        title: data.results[i].name,
                        original_title: data.results[i].known_for_department,
                        release_date: data.results[i].known_for_department,
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                }
            }
            Paging(data.total_pages, data.page, data.total_results, objTMDb.type().toUpperCase() + ' ► ' + objTMDb.checks())
        }).fail(function(jqXHR, textStatus, error) {
            toast({
                msg: `Request Failed: ${error} ${textStatus}`,
                type: 'error',
                dur: toastTime
            })
        })
    } else if (objTMDb.checks() === 'queryAll') {
        notify(objTMDb.type().toUpperCase(), ': ' + movie);
        jQuery.getJSON(`${objTMDb.base_url}/search/${objTMDb.type()}?api_key=${objTMDb.api_key}&language=${objTMDb.language()}&query=${jQuery('#input').val().trim()}&year=${objTMDb.year()}&first_air_date_year=${objTMDb.year()}&include_adult=true&page=${page}`).done(function(data) {
            for (var i = 0; i < data.results.length; i++) {
                if (objTMDb.type() === 'movie') {
                    poster_path = data.results[i].poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.results[i].poster_path;
                    original_title = (data.results[i].original_title === data.results[i].title) ? data.results[i].release_date : data.results[i].original_title;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: poster_path,
                        title: data.results[i].title,
                        original_title: original_title,
                        release_date: data.results[i].release_date.split('-').shift(),
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                } else if (objTMDb.type() === 'tv') {
                    poster_path = data.results[i].poster_path == null ? objTMDb.poster_no_url : objTMDb.poster_url + data.results[i].poster_path;
                    original_title = (data.results[i].original_name === data.results[i].name) ? data.results[i].first_air_date : data.results[i].original_name;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: poster_path,
                        title: data.results[i].name,
                        original_title: original_title,
                        release_date: data.results[i].first_air_date.split('-').shift(),
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                } else if (objTMDb.type() === 'person') {
                    profile_path = data.results[i].profile_path == null ? objTMDb.profile_no_url : objTMDb.poster_url + data.results[i].profile_path;
                    itemsMovies({
                        id: data.results[i].id,
                        poster: profile_path,
                        title: data.results[i].name,
                        original_title: data.results[i].known_for_department,
                        release_date: data.results[i].known_for_department,
                        icon: 'icon-info',
                        type: objTMDb.type()
                    })
                }
            }
            Paging(data.total_pages, data.page, data.total_results, objTMDb.type().toUpperCase() + ': Title ► ' + movie)
        }).fail(function(jqXHR, textStatus, error) {
            toast({
                msg: `Request Failed: ${textStatus} ${movie}`,
                type: 'error',
                dur: toastTime
            })
        })
    } else if (objTMDb.checks() === 'queryIMDb') {
        notify(objTMDb.type().toUpperCase(), ':' + movie);
        jQuery.getJSON(`${objTMDb.base_uri}/?${objTMDb.IMDb()}=${jQuery('#input').val().trim()}&type=movie&y=${objTMDb.year()}&apikey=${objTMDb.apiKey}&page=${page}`).done(function(data) {
            if (!data.Error) {
                if (objTMDb.IMDb() === 's') {
                    for (i = 0; i < data.Search.length; i++) {
                        poster_path = data.Search[i].Poster == 'N/A' ? objTMDb.poster_no_url : data.Search[i].Poster;
                        itemsMovies({
                            id: data.Search[i].imdbID,
                            poster: poster_path,
                            title: data.Search[i].Title,
                            original_title: data.Search[i].Type,
                            release_date: data.Search[i].Year,
                            icon: 'icon-info',
                            type: 'movieIMDb'
                        })
                    }
                    Paging(data.totalResults ? Math.ceil(data.totalResults / 10) : 0, page, data.totalResults, objTMDb.type().toUpperCase() + ' Title ► ' + movie)
                } else if (objTMDb.IMDb() === 'i' || objTMDb.IMDb() === 't') {
                    poster_path = data.Poster == 'N/A' ? objTMDb.poster_no_url : data.Poster;
                    itemsMovies({
                        id: data.imdbID,
                        poster: poster_path,
                        title: data.Title,
                        original_title: data.Type,
                        release_date: data.Year,
                        icon: 'icon-info',
                        type: 'movieIMDb'
                    })
                    Paging(1, 1, 1, objTMDb.type().toUpperCase())
                }
            } else if (data.Error) {
                toast({
                    msg: `Request Failed:${data.Error}`,
                    type: 'error',
                    dur: toastTime
                })
            }
        }).fail(function(jqXHR, textStatus, error) {
            toast({
                msg: `Request Failed: ${textStatus} ${movie}`,
                type: 'error',
                dur: toastTime
            })
        })
    }
    getID('control-pagination').innerHTML = `<span id='totalPages'></span>
                             <div class='pagination' id="paGina">
                             <button class='form-control prev' id='prev'>Prev</button>
                             <input class='form-control center' id='pages' type='hidden'/>
                             <button class='form-control next' id='next'>Next</button>
                         </div>`;
}

function Validate() {
    var errorMessage = '';
    if (jQuery('').val() == '') { errorMessage += `<h4 class="notify-msg">► Enter Search Text</div>` }
    return errorMessage
}

function Paging(total, page, results, title) {
    getID('paGina').style.display = 'flex';
    var prev = getID('prev');
    var next = getID('next');
    count = page;
    next.onclick = function() {
        count += 1;
        CallAPI(count)
    };
    count = page;
    prev.onclick = function() {
        if (count > 1) {
            count -= 1;
            CallAPI(count)
        }
    };
    getID('pages').value = count;
    var totalP = getID('totalPages')
    totalP.innerHTML = `${page} / ${total} | ${results}`;
    if (page < 2 && page == 1) {
        prev.style.display = 'none'
    } else if (page > 1) { prev.style.display = 'block'; }
    if (total !== 0) {
        toast({
            msg: `${title} Page ${page}`,
            type: 'success',
            dur: toastTime
        })
    } else {

        toast({
            msg: 'Warning Check Enter Text',
            type: 'warning',
            dur: toastTime
        })
    }
}
jQuery(document).on('change', '#pages', function() { CallAPI(jQuery('#pages').val()) });

function removeItem(id) {
    objTMDb.databaseRequestURL.child(id).remove();
    jQuery('#' + id).remove();
    getData()
}

function getData() {
    objTMDb.databaseRequestURL.on('value', (snapshot) => {
        var items = snapshot.val(),list = '',none = 'display:none';
        if (document.location.pathname.includes('createMovie') || document.location.pathname.includes('index')) {
            if (items) {
                for (var i in items) {
                    list += `<article class="col l-2 m-3 s-6" id="${items[i].id}">
                    <div class="post">
                        <a  id="${items[i].type}" ${items[i].type}="${items[i].id}" none="${none}" class="post-link">
                            <div class="post-image icon-info">
                                <img src="${items[i].poster}" title="${items[i].title}" class="post-image-img">
                            </div>
                            <div class="post-title">
                                <h3 class="post-title-en">${items[i].title}</h3>
                                <h4 class="post-title-vi">${items[i].time}</h4>
                            </div>
                        </a>
                    </div>
                    <div class="post-status">
                        <span class="post-status-text">${items[i].type}</span>
                    </div>
                    <button class="post-wishlist" title="Remove" onclick="removeItem(${items[i].id})"><svg class='icon-request-times' viewBox='0 0 24 24'>
            <path d='M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z'/>
        </svg></button>
                    <button class="post-overplay">
                        <a none="${none}" id="${items[i].type}" ${items[i].type}="${items[i].id}" class="post-overplay-btn" title="Watch Info"></a>
                    </button>
                </article>`;

                };
                jQuery('#requested').html(list),
                    jQuery('.totalRequested').html((snapshot.numChildren() > 0) ? snapshot.numChildren() + ` Requested Movies` : ``);
            } else {
                jQuery('.totalRequested').text(`No Movies`)
                jQuery('#requested').html("<p>Chưa có phim nào được thêm vào yêu cầu</p>");

            }
        }
    })
}
setTimeout(function() {
    getData()
}, 5000)
