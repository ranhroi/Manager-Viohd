var imdB = getID('imdB').value.trim(),
    language = getID('language').value.trim(),
    sources = getID('sources').value,
    totals = getID('totals'),
    creatLink = getID('creatLink'),
    searchId = getID('searchId'),
    resultDisplay = getID("result-display"),
    databaseSourcePlayURL = new Firebase("sourcelinks-da636-default-rtdb.firebaseio.com/");


getID('push').onclick = function() {
    if (imdB !== '' && sources !== '' && language !== '') {
        databaseSourcePlayURL.child(imdB).set({
            source: window.btoa(sources.trim()),
            language: language
        });
        databaseSourcePlayURL.child(imdB).on('value', function(snapshot) {
            if (snapshot.val() != null) {
                resultDisplay.innerHTML = `ID : ${imdB} | LANGUAGE : ${snapshot.val().language} | SOURCE : ${snapshot.val().source}`;
                searchId.href = "http://viohd.blogspot.com/search?q=" + imdB;
                toast({
                    msg: 'Success! : Add thành công',
                    type: 'success',
                    dur: toastTime
                })
            } else {
                toast({
                    msg: 'ERROR : không thành công',
                    type: 'error',
                    dur: toastTime
                })
            }
        })
    } else {
        toast({
            msg: 'Error: <strong>' + imdB + '</strong>',
            type: 'error',
            dur: toastTime
        })
    };

}

getID('imdB').onclick = function() {
    databaseSourcePlayURL.child(imdB).on('value', function(snapshot) {
        if (snapshot.val() != null) {
            toast({
                msg: 'warning : ID đã tồn tại',
                type: 'warning',
                dur: toastTime
            })
        } else {
            toast({
                msg: 'ERROR :  ID không tồn tại',
                type: 'error',
                dur: toastTime
            })
        }
    })
}

getID('select').onclick = function() {
    if (imdB) {
        databaseSourcePlayURL.child(imdB).on('value', function(snapshot) {
            if (snapshot.val() != null) {
                getID('language').value = snapshot.val().language;
                var source = snapshot.val().source;
                source = (source.includes('https://') && source.includes('|') || source.includes('http://') && source.includes('|')) ? source : window.atob(source);
                getID('sources').value = source;
                toast({
                    msg: 'Success! : triệu hồi thành công',
                    type: 'success',
                    dur: toastTime
                });
                searchId.href = "http://viohd.blogspot.com/search?q=" + imdB;
            } else {
                toast({
                    msg: 'ERROR : ID không tồn tại',
                    type: 'error',
                    dur: toastTime
                })
            }
        })
    } else {
        toast({
            msg: 'Error: <strong>' + imdB + '</strong>',
            type: 'error',
            dur: toastTime
        })
    };
}

getID('update').onclick = function() {
    if (imdB !== '' && sources !== '' && language !== '') {
        databaseSourcePlayURL.child(imdB).update({
            source: window.btoa(sources.trim()),
            language: language
        })
        databaseURL.child(imdB).once('value', function(snapshot) {
            resultDisplay.innerHTML = `ID : ${imdB} | LANGUAGE : ${snapshot.val().language} | SOURCE : ${snapshot.val().source}`;
            toast({
                msg: 'Success: update thành công',
                type: 'success',
                dur: toastTime
            })
        })
    } else {
        toast({
            msg: 'Error: <strong>' + imdB + '</strong>',
            type: 'error',
            dur: toastTime
        })
    };
}

if (getID('imdB').value.trim()) {
    getID('delete').onclick = function() {
        showModal({
            title: imdB,
            content: `
    <div class="form-group">
        <button class='form-control btn' type="button" onclick='deleteIdSource(${imdB})'>Bạn có chắc chắn muốn xóa nó</button>
    </div>`
        })
    }

    function deleteIdSource(imd) {
        if (imd != '') {
            databaseSourcePlayURL.child(imd).remove();
            getID('imdB').value = '';
            getID('language').value = '';
            getID('sources').value = '';
            toast({
                msg: 'Delete Success!: <strong>' + imd + '</strong>',
                type: 'success',
                dur: toastTime
            })
        } else {
            toast({
                msg: 'Error: No Id <strong>' + imd + '</strong>',
                type: 'error',
                dur: toastTime
            })
        }
    }
}

getID('totals').onclick = function() {
    databaseSourcePlayURL.once('value', function(snapshot) {
        if (totals) {
            totals.innerHTML = snapshot.numChildren()
        };
    })
}
getID('creatLink').onclick = function() {
    var a = '';
    for (i = 1; i < 51; i++) {
        a += i + ';|'
    }
    resultDisplay.innerHTML = '[id]' + a + '[/id]';
    toast({
        msg: 'Add success: <strong>[id]' + a + '[/id]</strong>',
        type: 'success',
        dur: 10000
    })

}