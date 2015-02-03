$(function(){
    /**************** Global scope *******************/
    var elementClickEvent = function(element){
        $(element).click(function(e){
            e.stopPropagation();
            if($(this).hasClass("active")){
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
            $(document).one('click', function(event){
                if(!$(event.target).is(element)){
                    $(element).removeClass("active");
                };
            });
        });
    };

    /**************** height fixed for wrapper ********************/
    $(function(){
        var winHeight = 0;

        if(typeof (window.innerWidth) == 'number') {
            //Non IE
            winHeight = window.innerHeight;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)){
            //IE +6
            winHeight = document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            //IE +4
            winHeight = document.body.clientHeight;
        }
        var topHeight = $("#header").height();
        var botHeight = $("#footer").height();
        var wrapperHeight = winHeight-topHeight-botHeight-91;
        $("#wrapper .table-data").height(wrapperHeight);
        //console.log(wrapperHeight);
    });

    /**************** toggle button for sidebar *******************/
    $(document).on('click','#toggle',(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("#wrapper").toggleClass("toggled");
    }));

    /**************** more button on class table-action and current-app on header *******************/
    elementClickEvent(".table-action .action-more");
    elementClickEvent("#header .logo-header .current-app");
    //elementClickEvent("#header .user-header li:first-child");

    /***************** table click on td tag's event *****************/
    $(function(){
        var td = $(".table-data tr td.data-schema-data");

        td.on('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            td.each(function(){
                $(this).removeClass('highlighted')
            });
            $(this).addClass('highlighted');
            var self = $(this);
            var appended = false;
            //get y-position of this
            var y = $(this).parent().children().index(this);
            var th = $(".data-field tr th:eq("+y+")");
            var fieldName = th.children("span.data-schema-name").text();
            var fieldType = th.children("span.data-schema-type").text().toLowerCase();

            if(fieldName !== "objectId") {
                if (y !== null || y !== 'undefined') {
                    self.one('dblclick', function (e) {
                        var text;
                        if (appended === false) {
                            //type string
                            if (fieldType !== 'string') {
                                //remove input if exist
                                self.find("input").remove();
                                text = self.text();
                                //append new input
                                self.append("<input type='text' class='text-editor' value='" + text + "' />");
                            } else if (fieldType === 'string') {
                                self.find("textarea").remove();
                                text = self.text();
                                self.append("<textarea class='text-editor'>" + text + "</textarea>");
                            }
                            appended = true;
                        }
                        $(document).one('click', function (event) {
                            //clicked on outside
                            if (!$(event.target).is(".table-data tr td.data-schema-data")) {
                                var element = $(".table-data tr td.data-schema-data");
                                //remove high lighting
                                self.removeClass("highlighted");
                                var inputValue = null;
                                if (fieldType !== 'string') {
                                    inputValue = self.find("input").val();
                                } else {
                                    inputValue = self.find("textarea").val();
                                }

                                if (inputValue !== 'undefined' || inputValue === null) { //if input value is exists
                                    if (text === inputValue) {  //if data doesn't change
                                        self.empty();
                                        self.append(text);
                                    } else {
                                        //call ajax
                                        console.log("???");
                                    }
                                }
                            }
                        });
                        //console.log(y);
                    });
                }
            }
        });
    });

    /*********************** filter's action **************************/

    /*-----------
    FILTER BUTTON
    -----------*/
    $(function(){
        function appendTRElement(element,id){
            id = id || null;
            var tr = $('<tr><td class="constraint_column"><div class="dropdown"><select class="field"><option value="objectId">objectId</option><option value="username">username</option><option value="email">email</option></select></div></td><td class="constraint_comparator"><div class="dropdown"><select class="op"><option value="equals">equals</option><option value="does not equal">does not equal</option><option value="starts with">starts with</option><option value="exists">exists</option><option value="does not exist">does not exist</option></select></div></td><td class="constraint_value"><input type="text" /></td><td id="'+ id +'" class="constraint_remove"><span class="glyphicon glyphicon-remove filter-close"></span></td></tr>');

            tr.appendTo(element);
        }

        $(document).on('click',".table-action .filter",(function(e){
            e.preventDefault();
            e.stopPropagation();

            if(!$(this).hasClass("active") ){
                $(this).addClass("active");
            }
            $(document).one('click', function(event){
                if(!$(event.target).is('.table-action .filter')){
                    $('.table-action .filter').removeClass("active");
                };
            });
        }));


        $(document).on('mousedown','.filter .add-constrain',function(e){
            e.preventDefault();
            e.stopPropagation();

            if(e.which === 1) {
                appendTRElement($(this).parent().prev().children());
            }
        });

        $(document).on('click','.filter .constraint_remove:not(#unable)',function(e){
            e.preventDefault();
            e.stopPropagation();

            $(this).parent().remove();
        });

        $(document).on('mousedown','.filter .dismiss', function(e){
            e.preventDefault();
            e.stopPropagation();
            if(e.which === 1) {
                $(this).parent().prev().children().children().remove();
                appendTRElement($(this).parent().prev().children(),"unable");
            }
        });
    });
});