/*
Plugin Name: Our Modal Confirm
Description: This plugin display a modal dialog used for confirm operations like delete, add, or edit among others... 
Author: <a href="mailto:rabartu.soft@gmail.com">RabartuSoft Solutions</a>
License: GPLv2 or later
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

(function($){
        
 /* MODAL CONFIRM CLASS DEFINITION
  * ======================= */  
    var ModalConf = {
        init: function(obj,opts){ 
            $(obj).on('click', '.modal-confirm', function(e){
                e.preventDefault();
                opts = $.extend({}, $.fn.modalconf.defaults, $(this).data('options'));
                $(this).modalconf(ModalConf.show($(this),opts));
            });
            
        },
        hide : function(obj,opts){           
            var $modal = $('.modconf');
            
            $modal.css('top',-500);
            
            $('#modconf-overlay').fadeOut(opts.fxSpeed,function(){
                $('#modconf-overlay').remove();
                $modal.remove();
            });
           
        },
        show : function(obj,opts){
            var content, title;
            
            if (opts.contentText === '')
                content = $(obj).data('content');
            else
                content = opts.contentText;
            
            if (opts.titleText === '')
                title   = $(obj).data('title');
            else
                title   = opts.titleText;
            
            
            var $modal=$('<div class="modconf">'), 
                $modalTitle=$('<div class="modconf-title">');
            
            $modalTitle.css({
                
            'color': '#666666',            
            'border-bottom': '1px solid rgb(229, 229, 229)',
            'display': 'block'
                
            });
            
            $modal.css({
            
                'width': opts.width,
                'line-height': '20px',
                'height': 'auto',
                'max-height': opts.height,
                'border': '1px solid rgba(0, 0, 0, 0.2)',
                'position': 'fixed',
                'top': '0%',
                'left': '0%',               
                'border-radius': opts.borderRadius,
                'box-shadow': '0px 5px 15px rgba(0, 0, 0, 0.5)',
                'background': opts.background,   
                'color': opts.color,
                'display': 'none',
                'z-index': '99999',
                '-webkit-transition': 'top '+opts.fxSpeed/1000+'s ease-in-out',
                     '-moz-transition': 'top '+opts.fxSpeed/1000+'s ease-in-out',
                       '-o-transition': 'top '+opts.fxSpeed/1000+'s ease-in-out',
                          'transition': 'top '+opts.fxSpeed/1000+'s ease-in-out'
                    
                    
            });
            
            var $title = $('<span>'+title+'</span>');
            var $closebtn = $('<button class="modconf-close"> '+opts.closeText+' </button>');
            
            $title.css({
                'display': 'inline-block',  
                'padding': '10px'
            });
            
            $closebtn.css({
                'float': 'right',
                'font-size': '21px',
                'font-weight': 'bold',
                'line-height': '1',
                'color': 'rgb(0, 0, 0)',
                'text-shadow': '0px 1px 0px rgb(255, 255, 255)',
                'opacity': '0.2',
                'padding': '5px',
                'margin-right': '5px',
                'cursor': 'pointer',
                'background': 'none repeat scroll 0% 0% transparent',
                'border': '0px none'
            });
            
            $closebtn.hover(
                function(){
                    $closebtn.css({opacity: 1});
                },
                function(){
                    $closebtn.css({opacity: 0.2});                   
            });
            
            $modalTitle.append($title);
            $modalTitle.append($closebtn);
         
            $modal.append($modalTitle);
            
            var $modalContent=$('<div class="modconf-body">');
            $modalContent.css({
                'padding': '10px',
				'height': 'auto',
				'overflow': 'auto'
            });
            console.log($(obj)[0].offsetTop);
            var mh = $(window).height()*(parseInt(opts.height))/100-200;
            $modalContent.append('<div style="max-height: '+mh+'px;overflow-y:auto">'+content+'</div>');

            $modal.append($modalContent);
            
            var $modalFooter = $('<div class="modconf-footer"></div>');
            $modalFooter.css({
                'color': '#666666',
                'margin-bottom': 0,
                'padding': '12px 13px 13px',
                'text-align': 'right',
                'border-top':' 1px solid rgb(229, 229, 229)'
            });

            var $btnConfirm = $('<a href="#" >'+opts.confirmText+'</a>').addClass(opts.btnConfirmClass), 
            $btnCancel= $('<a href="#" >'+opts.cancelText+'</a>').css({'margin-left':'5px'}).addClass(opts.btnCancelClass);
            
            if (opts.btnConfirmClass === ''){
                $btnConfirm.css({

                    'display': 'inline-block',
                    'padding': '6px 12px',
                    'margin-bottom': 0,
                    'text-decoration': 'none',
                    'font-size': '14px',
                    'font-weight': 'normal',
                    'line-height': 1.428571429,
                    'text-align': 'center',
                    'white-space': 'nowrap',
                    'vertical-align': 'middle',
                    'cursor': 'pointer',
                    'border': '1px solid transparent',
                    'border-radius': '4px',
                    '-webkit-user-select': 'none',
                       '-moz-user-select': 'none',
                        '-ms-user-select': 'none',
                         '-o-user-select': 'none',
                            'user-select': 'none',

                    'color': '#ffffff',
                    'background-color': '#428bca',
                    'border-color': '#357ebd'

                });
    
                $btnConfirm.hover(
                    function(){
                        $btnConfirm.css({
                            'color': '#ffffff',
                            'background-color': '#3276b1',
                            'border-color': '#285e8e',
                        });
                    },
                    function(){
                        $btnConfirm.css({
                            'color': '#ffffff',
                            'background-color': '#428bca',
                            'border-color': '#357ebd'
                        });                   
                });
            }
     
            $btnConfirm.on('click',function(e){
                e.preventDefault();
                var args = opts.confirmArgs;
                switch ( opts.confirmType )  // types url , form 
                {
                  case "url":
                    window.location = args ;
                    break;
                  case "form":
                    $(args).submit() ; 
                    break;
                  case "callback":
                    args = args.split(";");
                    window[args[0]](args);
                    break;
                }
                 $(this).modalconf(ModalConf.hide($(this),opts));
            });
            
            if (opts.btnConfirmClass === ''){
                $btnCancel.css({

                    'display': 'inline-block',
                    'padding': '6px 12px',
                    'margin-bottom': 0,
                    'text-decoration': 'none',
                    'font-size': '14px',
                    'font-weight': 'normal',
                    'line-height': 1.428571429,
                    'text-align': 'center',
                    'white-space': 'nowrap',
                    'vertical-align': 'middle',
                    'cursor': 'pointer',
                    'border': '1px solid transparent',
                    'border-radius': '4px',
                    '-webkit-user-select': 'none',
                       '-moz-user-select': 'none',
                        '-ms-user-select': 'none',
                         '-o-user-select': 'none',
                            'user-select': 'none',

                    'color': '#333333',
                    'background-color': '#ffffff',
                    'border-color': '#cccccc'

                });
    
                $btnCancel.hover(
                    function(){
                        $btnCancel.css({
                            'color': '#333333',
                            'background-color': '#ebebeb',
                            'border-color': '#adadad'
                        });
                    },
                    function(){
                        $btnCancel.css({
                            'color': '#333333',
                            'background-color': '#ffffff',
                            'border-color': '#cccccc'
                        });                   
                });
            }
            
            
            $btnCancel.on('click',function(e){
                e.preventDefault();
                $(this).modalconf(ModalConf.hide($(this),opts));
            });
            
            $modalFooter.append($btnConfirm).append($btnCancel)
            
            
            $modal.append($modalFooter);
            var $objOverlay=$('<div id="modconf-overlay" style=" z-index: 99998">').css({
                opacity: opts.overlayOpacity,
                display: 'none',
                position: 'fixed',
                background: '#000',
                height: '100%',
                width: '100%',
                top: '0',
                left: '0'
            });
            
            $objOverlay.on('click',function(){
                if(opts.hideOnClick){
                    $(this).modalconf(ModalConf.hide($(this),opts));
                }                 
            });
            
            $('body').append($objOverlay);

            
            $objOverlay.fadeIn(opts.fxSpeed,function(){
                $('body').append($modal);

                $modal.css('display','block');

                $modal.css('top',$(window).height()/2 - parseInt($modal.css('height'))/2);                        
                $modal.css('left',$(window).width()/2 - parseInt($modal.css('width'))/2);

                $('.modconf-close').on('click', function(e){
                    e.preventDefault();
                    $(this).modalconf(ModalConf.hide($(this),opts));
                });    
            });
        }
    };


 /* MODAL CONFIRM PLUGIN DEFINITION
  * ======================= */
 
  $.fn.modalconf = function (options, params) {
    if (typeof options === 'string'){
        var par = $.extend({}, $.fn.modalconf.defaults, params);
        return ModalConf[options]($(this),par);
    }
    var opts = $.extend({}, $.fn.modalconf.defaults, options);
    return this.each(function() {
        ModalConf.init($(this),opts);
    });
  };
  
  // MODAL PLUGIN DEFAULT OPTIONS
    $.fn.modalconf.defaults = {
        fxSpeed: 500,
        hideOnClick: true,
        
        confirmType: 'url',
        confirmArgs: '',
        
        titleText: '',
        contentText: '',        
        closeText: '×',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        
        overlayOpacity: 0.8,
        width: '60%',
        height: '40%',
        borderRadius: '6px',
        background:'#FFFFFF',
        color:'#666',
        
        btnCloseClass:'',
        btnConfirmClass:'',        
        btnCancelClass: ''
    };

 /* MODAL DATA-API
  * ============== */
  
$(window).load(function(){    
    $(document).modalconf();
});
})(jQuery);