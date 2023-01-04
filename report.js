var databaseReportURL = new Firebase("requestmov-c5622-default-rtdb.firebaseio.com/report/");


function removeReport(id) {
    databaseReportURL.child(id).remove();
    jQuery('#' + id).remove();
    report()
}

function report() {
    databaseReportURL.once('value', (snapshot) => {
        var items = snapshot.val(),
            list = '';
        if (items) {
            for (var i in items) {
                list += `<article class="col l-2 m-3 s-6" id="${items[i].id}">
                    <div class="post-item">
                        <a class="item-link">
                            <div class="item-title">
                                <h3 class="item-title-en">${items[i].title}</h3>
                                <h4 class="item-title-vi">${items[i].content}</h4>
                            </div>
                        </a>
                    </div>
                    <div class="item-status">
                        <span class="item-status-text">${items[i].time}</span>
                    </div>
                    <button class="item-wishlist" title="Remove" onclick="removeReport('${items[i].id}')"><svg class='icon-request-times' viewBox='0 0 24 24'>
            <path d='M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z'/>
        </svg></button>
        <button class="item-overplay">
            <a href="${items[i].url}" class="item-overplay-btn" title="Watch post" target="_blank"></a>
        </button>
                </article>`;
            }
            jQuery('#reported').html(list)
        } else {
            jQuery('#reported').html("<p>Chưa có post nào được báo cáo</p>");
        }
    })
}
