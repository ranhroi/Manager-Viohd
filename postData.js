$(document).on('click', '#movie', function() {
    var movieID = $(this).attr('movie'),
        showHtml = '';
    $.getJSON(objTMDb.base_url + '/movie/' + movieID + '?api_key=' + objTMDb.api_key + '&language=' + objTMDb.language() + '&append_to_response=alternative_titles,credits,similar,videos,trailers,images&include_image_language=en,null', function(data) {
        var input_trailer = '';
        $.each(data.trailers.youtube, function(i, item) {
            if (i > 20) return !1;
            input_trailer = item.source == null ? '' : item.source;
        });
        var c = [];
        if (data.production_countries) { data.production_countries.forEach(function(country) { c.push(country.name) }) }
        var cy = c.join(', ');
        var g = [];
        if (data.genres) { data.genres.forEach(function(genre) { g.push(objTMDb.objCategories[genre.id]) }) }
        var gn = g.join(', ');
        var imdbID = data.imdb_id == null ? data.id : data.imdb_id;
        showHtml += `<div dir="ltr" style="text-align: left;" trbidi="on">`
        showHtml += data.poster_path == null ? `
        <img id="mvi-thumb-data" src="._V1_UX350_AL_.jpg"/>` : `
        <img id="mvi-thumb-data" src="${objTMDb.original_img_url + data.poster_path}"/>`;
        var numBack = data.images.backdrops == '' ? '1' : data.images.backdrops;
        for (i = 0; i < numBack.length; i++) {
            showHtml += data.images.backdrops == '' ? `
        <img id="mvi-cover-data" src="._V1_UX900_CR0,0,900,500_AL_.jpg" name="more"/>` : `
        <img id="mvi-cover-data" src="${objTMDb.original_img_url + data.images.backdrops[i].file_path}" name="more"/>`
        }
        showHtml += `
        <div id="mvi-imdb-data">${imdbID}</div>
        <div id="mvi-status-data">[Vietnamese]</div>
        <div id="mvi-desc-data">${data.overview}</div>          
        <div id="mvi-genre-data">${gn}</div>        
        <div id="mvi-actor-data">`;
        for (i = 0; i < data.credits.cast.length; i++) { showHtml += `p_${data.credits.cast[i].id}_${data.credits.cast[i].name}, ` };
        showHtml += `</div>
        <div id="mvi-director-data">`;
        for (i = 0; i < data.credits.crew.length; i++) { if (data.credits.crew[i].department == 'Directing') showHtml += `p_${data.credits.crew[i].id}_${data.credits.crew[i].name}, ` };
        showHtml += `</div>         
        <div id="mvi-country-data">${cy}</div>         
        <div id="mvi-duration-data">${data.runtime} min</div>         
        <div id="mvi-res-data">HD</div>          
        <div id="mvi-year-data">${data.release_date.split('-').shift()}</div>        
        <div id="mvi-collection-data">${data.belongs_to_collection==null?'':'c-'+data.belongs_to_collection.id}</div>         
        <div id="mvi-trailer-data">https://www.youtube.com/watch?v=${input_trailer}</div>
        <div id="mvi-link-data">
        </div>
        </div>`

        for (i = 0; i < data.credits.crew.length; i++) {
            if (data.credits.crew[i].department == 'Directing') showHtml += `p_${data.credits.crew[i].id},`
        };

        for (i = 0; i < data.credits.cast.length; i++) { showHtml += `
                            p_${ data.credits.cast[i].id }, ` };

        showModalText(data.title, showHtml);
    })
});
$(document).on('click', '#tv', function() {
    var tvID = $(this).attr('tv'),
        showHtml = '';
    $.getJSON(objTMDb.base_url + '/tv/' + tvID + '?api_key=' + objTMDb.api_key + '&language=' + objTMDb.language() + '&append_to_response=alternative_titles,credits,similar,videos,trailers,images&include_image_language=en,null', function(data) {
        var input_trailer = '';
        $.each(data.videos.results, function(i, item) {
            if (i > 20) return !1;
            input_trailer = item.key == null ? '' : item.key;
        });
        var c = [];
        if (data.production_countries) { data.production_countries.forEach(function(country) { c.push(country.name) }) }
        var cy = c.join(', ');
        var g = [];
        if (data.genres) { data.genres.forEach(function(genre) { g.push(objTMDb.objCategories[genre.id]) }) }
        var gn = g.join(', ');
        showHtml += `<div dir="ltr" style="text-align: left;" trbidi="on">`
        showHtml += data.poster_path == null ? `
        <img id="mvi-thumb-data" src="._V1_UX350_AL_.jpg"/>` : `
        <img id="mvi-thumb-data" src="${objTMDb.original_img_url + data.poster_path}"/>`;
        var numBack = data.images.backdrops == '' ? '1' : data.images.backdrops;
        for (i = 0; i < numBack.length; i++) {
            showHtml += data.images.backdrops == '' ? `
        <img id="mvi-cover-data" src="._V1_UX900_CR0,0,900,500_AL_.jpg" name="more"/>` : `
        <img id="mvi-cover-data" src="${objTMDb.original_img_url + data.images.backdrops[i].file_path}" name="more"/>`
        }
        showHtml += `
        <div id="mvi-imdb-data">${data.id}</div>
        <div id="mvi-status-data">[Vietnamese]</div>         
        <div id="mvi-desc-data">${data.overview}</div>          
        <div id="mvi-genre-data">${gn}</div>        
        <div id="mvi-actor-data">`;
        for (i = 0; i < data.credits.cast.length; i++) { showHtml += `p_${data.credits.cast[i].id}_${data.credits.cast[i].name}, ` };
        showHtml += `</div>        
        <div id="mvi-director-data">`;
        for (i = 0; i < data.credits.crew.length; i++) { if (data.credits.crew[i].department == 'Directing') showHtml += `p_${data.credits.crew[i].id}_${data.credits.crew[i].name}, ` };
        showHtml += `</div>          
        <div id="mvi-country-data">${cy}</div>          
        <div id="mvi-duration-data">${data.episode_run_time} min</div>         
        <div id="mvi-res-data">HD</div>          
        <div id="mvi-year-data">${data.first_air_date.split('-').shift()}</div>        
        <div id="mvi-collection-data"></div>          
        <div id="mvi-trailer-data">https://www.youtube.com/watch?v=${input_trailer}</div>
        <div id="mvi-link-data">
        </div>
        </div>`

        for (i = 0; i < data.credits.crew.length; i++) {
            if (data.credits.crew[i].department == 'Directing') showHtml += `p_${data.credits.crew[i].id},`
        };

        for (i = 0; i < data.credits.cast.length; i++) { showHtml += `
                            p_${ data.credits.cast[i].id }, ` };

        showModalText(data.name, showHtml);
    })
});


$(document).on('click', '#movieIMDb', function() {
    var imdbID = $(this).attr('movieIMDb')
    showHtml = '';
    $.getJSON(objTMDb.base_uri + '/?i=' + imdbID.trim() + '&type=movie&y=' + objTMDb.year() + '&apikey=' + objTMDb.apiKey, function(data) {
        poster_path = data.Poster == 'N/A' ? objTMDb.poster_no_url : data.Poster;

        showHtml += `<div dir="ltr" style="text-align: left;" trbidi="on">
        <img id="mvi-thumb-data" src="${poster_path}"/>
        <img id="mvi-cover-data" src="" name="more"/>
        
        <div id="mvi-imdb-data">${data.imdbID}</div>

        <div id="mvi-status-data">[Vietnamese]</div>
          
        <div id="mvi-desc-data">${data.Plot}</div>
          
        <div id="mvi-genre-data">${data.Genre}</div>
        
        <div id="mvi-actor-data">${data.Actors}</div>
        
        <div id="mvi-director-data">${data.Director}</div>
          
        <div id="mvi-country-data">${data.Country}</div>
          
        <div id="mvi-duration-data">${data.Runtime}</div>
          
        <div id="mvi-res-data">HD</div>
          
        <div id="mvi-year-data">${data.Year}</div>
        
        <div id="mvi-collection-data"></div>
          
        <div id="mvi-trailer-data">https://www.youtube.com/watch?v=</div>
        <div id="mvi-link-data">
        </div></div>`
        showModalText(data.Title, showHtml);
    })
});