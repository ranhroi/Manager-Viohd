
jQuery(document).ready(function() {

    var databaseURL = new Firebase("sourcelinks-da636-default-rtdb.firebaseio.com/");

    var imdB, language, sources, source, totals, creatLink, searchId, result_display;

    function Ready() {
        imdB = getID('imdB').value.trim();
        language = getID('language').value.trim();
        sources = getID('sources').value;
        totals = getID('totals');
        creatLink = getID('creatLink');
        searchId = getAll('.searchId');
        result_display = getID("result_display");
    }
    jQuery(document).on('click', '#push', function() {
        Ready();
        if (imdB !== '' && sources !== '' && language !== '') {
            databaseURL.child(imdB).set({
                source: window.btoa(sources.trim()),
                language: language
            });
            databaseURL.child(imdB).on('value', function(snapshot) {
                if (snapshot.val() != null) {
                    result_display.innerHTML = `ID : ${imdB} | LANGUAGE : ${snapshot.val().language} | SOURCE : ${snapshot.val().source}`;
                    searchId.href = "http://viohd.blogspot.com/search?q=" + imdB;
                    toast({
                        msg: 'Success! : Add thành công',
                        type: 'success',
                       dur:toastTime
                    })
                } else {
                    toast({
                        msg: 'ERROR : không thành công',
                        type: 'error',
                       dur:toastTime
                    })
                }
            })
        } else {
            toast({
                msg: 'Error: <strong>' + imdB + '</strong>',
                type: 'error',
               dur:toastTime
            })
        };
    })

    jQuery(document).on('input', '#imdB', function() {
        Ready();
        databaseURL.child(imdB).on('value', function(snapshot) {
            if (snapshot.val() != null) {
                toast({
                    msg: 'warning : ID đã tồn tại',
                    type: 'warning',
                   dur:toastTime
                })
            } else {
                toast({
                    msg: 'ERROR :  ID không tồn tại',
                    type: 'error',
                   dur:toastTime
                })
            }
        })
    })

    jQuery(document).on('click', '#select', function() {
        Ready();
        if (imdB !== '') {
            databaseURL.child(imdB).on('value', function(snapshot) {
                if (snapshot.val() != null) {
                    getID('language').value = snapshot.val().language;
                    source = snapshot.val().source;
                    source = (source.includes('https://') && source.includes('|') || source.includes('http://') && source.includes('|')) ? source : window.atob(source);
                    getID('sources').value = source;
                    toast({
                        msg: 'Success! : triệu hồi thành công',
                        type: 'success',
                       dur:toastTime
                    })
                    searchId.href = "http://viohd.blogspot.com/search?q=" + imdB;
                } else {
                    toast({
                        msg: 'ERROR : ID không tồn tại',
                        type: 'error',
                       dur:toastTime
                    })
                }
            })
        } else {
            toast({
                msg: 'Error: <strong>' + imdB + '</strong>',
                type: 'error',
               dur:toastTime
            })
        };
    })

    jQuery(document).on('click', '#update', function() {
        Ready();
        if (imdB !== '' && sources !== '' && language !== '') {
            databaseURL.child(imdB).update({
                source: window.btoa(sources.trim()),
                language: language
            })
            databaseURL.child(imdB).once('value', function(snapshot) {
                result_display.innerHTML = `ID : ${imdB} | LANGUAGE : ${snapshot.val().language} | SOURCE : ${snapshot.val().source}`;
                toast({
                    msg: 'Success: update thành công',
                    type: 'success',
                   dur:toastTime
                })
            })
        } else {
            toast({
                msg: 'Error: <strong>' + imdB + '</strong>',
                type: 'error',
               dur:toastTime
            })
        };
    });
    jQuery(document).on('click', '#delete', function() {
        Ready();
        if (imdB !== '') {
            databaseURL.child(imdB).remove();
            getID('imdB').value = '';
            getID('language').value = '';
            getID('sources').value = '';
            toast({
                msg: 'Delete Success!: <strong>' + imdB + '</strong>',
                type: 'success',
               dur:toastTime
            })
        } else {
            toast({
                msg: 'Error: No Id <strong>' + imdB + '</strong>',
                type: 'error',
               dur:toastTime
            })
        }
    });

    jQuery(document).on('click', '#totals', function() {
        Ready();
        databaseURL.once('value', function(snapshot) {
            if (totals) {
                totals.innerHTML = snapshot.numChildren()
            };
        })
    });

    jQuery(document).on('click', '#creatLink', function() {
        Ready();
        var a = '';
        for (i = 1; i < 51; i++) {
            a += i + ';|'
        }
        result_display.innerHTML = '[id]' + a + '[/id]';
        toast({
            msg: 'Add success: <strong>[id]' + a + '[/id]</strong>',
            type: 'success',
           dur:10000
        })

    })

})
