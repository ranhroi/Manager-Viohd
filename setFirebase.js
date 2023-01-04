var setFirebase = {
    databaseURL: new Firebase("sourcelinks-da636-default-rtdb.firebaseio.com/"),
    getID: function(a) {
        return document.getElementById(a)
    },
    handleEvents: function() {
        var $this = this,
            imdB, sources, source, language;

        function getElement() {
            imdB = $this.getID("imdB").value.trim();
            sources = $this.getID("sources").value.trim();
            language = $this.getID("imdB").value.trim();
        }

        //get input value
        this.getID("imdB").oninput = function(e) {
            getElement();
            $this.databaseURL.child(imdB).on('value', function(snapshot) {
                if (snapshot.val()) {
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
        };

        //push content source with ID
        this.getID("push").onclick = function(e) {
            getElement();
            if (imdB && sources && language) {
                $this.databaseURL.child(imdB).set({
                    source: window.btoa(sources),
                    language: language
                });
                $this.databaseURL.child(imdB).on('value', function(snapshot) {
                    if (snapshot.val()) {
                        $this.getID("result-display").value = `ID : ${imdB} | LANGUAGE : ${snapshot.val().language} | SOURCE : ${snapshot.val().source}`;
                        $this.getID("searchId").href = "http://viohd.blogspot.com/search?q=" + imdB;
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
            }
        };

        //Select Sources
        this.getID("select").onclick = function(e) {
            getElement();
            if (imdB) {
                $this.databaseURL.child(imdB).on('value', function(snapshot) {
                    if (snapshot.val()) {
                        $this.getID("language").value = snapshot.val().language;
                        source = snapshot.val().source;
                        source = (source.includes('https://') && source.includes('|') || source.includes('http://') && source.includes('|')) ? source : window.atob(source);
                        $this.getID('sources').value = source;
                        toast({
                            msg: 'Success! : triệu hồi thành công',
                            type: 'success',
                            dur: toastTime
                        })
                        $this.getID('searchId').href = "http://viohd.blogspot.com/search?q=" + imdB;
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
            }
        };

        //Update sources
        this.getID("update").onclick = function() {
            getElement();
            if (imdB && sources && language) {
                $this.databaseURL.child(imdB).update({
                    source: window.btoa(sources),
                    language: language
                })
                $this.databaseURL.child(imdB).once('value', function(snapshot) {
                    $this.getID("result-display").value = `ID : ${imdB} | LANGUAGE : ${snapshot.val().language} | SOURCE : ${snapshot.val().source}`;
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

        //Delete ID & Sources
        this.getID("delete").onclick = function() {
            getElement();
            if (imdB) {
                showModal({
                    title: `Delete ID: ${imdB} Data`,
                    content: `<div class="form-group">
                        <button class="form-submit btn" type="button" id="${imdB}">You definitely want to delete ID: ${imdB}</button></div>`,
                })
                jQuery(document).on('click', `#${imdB}`, function() {
                    $this.databaseURL.child(imdB).remove();
                    this.getID('imdB').value = '';
                    this.getID('language').value = '';
                    this.getID('sources').value = '';
                    toast({
                        msg: 'Delete Success!: <strong>' + imdB + '</strong>',
                        type: 'success',
                        dur: toastTime
                    })
                    setTimeout(function() {
                        this.getID('modal').remove()
                    }, 1000)
                })

            } else {
                toast({
                    msg: 'Error: No Id <strong>' + imdB + '</strong>',
                    type: 'error',
                    dur: toastTime
                })
            }
        };

        // Totals Firebase
        this.getID("totals").onclick = function(e) {
            if (e.target) {
                $this.databaseURL.once('value', function(snapshot) {
                    e.target.innerText = snapshot.numChildren()
                })
            }
        }

        //Create code demo
        this.getID("creatLink").onclick = function() {
            var a = '';
            for (i = 1; i < 51; i++) {
                a += i + ';|'
            }
            $this.getID("result-display").value = '[id]' + a + '[/id]';
        };

    },

    start: function() {
        this.getID();
        this.handleEvents()
    }
};
setFirebase.start()