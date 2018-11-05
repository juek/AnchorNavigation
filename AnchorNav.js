/*
######################################################################
JS/jQuery for Typesetter CMS plugin Anchor Navigation
Author: J. Krausz
Date: 2018-07-09
Version 1.0-b1
######################################################################
*/

var AnchorNav = {

  /* config start */
  debug       : false,    // turn on console logging
  softscroll  : true,     // smooth scroll to the target anchor
  scrollspeed : 900,      // scrolling duration in milliseconds
  easing      : 'swing',  // 'linear' or 'swing'
  sethash     : true,     // change the browser's address hash after softscroll
  /* config end */

  anchors : [],

  sections : [],

  content : '',

  init : function(){
    AnchorNav.update();
    if( isadmin ){
      $(document).on('SectionAdded PreviewAdded SectionSorted SectionRemoved PreviewRemoved', AnchorNav.update);
    }
  },

  update : function(){
    var $anchors = $('#gpx_content a[name], #gpx_content a[id]');
    AnchorNav.sections = $('.filetype-AnchorNav');
    AnchorNav.anchors = [];
    $anchors.each( function(){
      var ref = $(this).attr('id') ? $(this).attr('id') : $(this).attr('name');
      var text = $(this).text() != '' ? $(this).text() : ref;
      AnchorNav.anchors.push({
        ref : ref,
        text : text,
      });
    });

    if( !AnchorNav.sections.length ){
      /* DEBUG */ if( AnchorNav.debug ){ console.log('AnchorNav.sections = none found'); }
      return;
    }

    if( !AnchorNav.anchors.length ){
      /* DEBUG */ if( AnchorNav.debug ){ console.log('AnchorNav.anchors = none found'); }
      AnchorNav.content = '<div class="alert alert-warning text-center anchor-navigation-admin-notice">Anchor Navigation: Current page has no anchors</div>';
      AnchorNav.render();
      return;
    }

    /* DEBUG */ if( AnchorNav.debug ){ console.log('AnchorNav.anchors = ', AnchorNav.anchors); }

    AnchorNav.content =   '<nav aria-label="Anchor navigation">';
    AnchorNav.content +=  '<ul class="pagination">';
    $.each(AnchorNav.anchors, function(i, v){
    AnchorNav.content +=  '<li class="page-item"><a class="page-link" href="#' + v.ref + '">' + v.text + '</a></li>';
    });
    AnchorNav.content +=  '</ul></nav>';

    AnchorNav.render();
  },
  
  render : function(section){
    var $which = typeof(section) == 'object' ? section : AnchorNav.sections;

    $which.each(function(){
      var $section = $(this);
      var size = $section.attr('data-navsize') || 'md';
      var align = $section.attr('data-navalign') || 'left';

      var add_classes = 'pagination-' + size;

      switch( align ){
        case 'right':
          add_classes += ' justify-content-end';
          break;
        case 'center':
          add_classes += ' justify-content-center';
          break;
        default:
        case 'left':
          break;
      }
      $section
        .html(AnchorNav.content)
        .find('.pagination')
          .addClass(add_classes)
          .find('a.page-link')
            .on('click', function(e){
              var href = $(this).attr('href');
              $('.filetype-AnchorNav a.page-link[href="' + href + '"]')
                .closest('li.page-item')
                .addClass('active')
                .siblings()
                  .removeClass('active');
              if( AnchorNav.softscroll ){
                e.preventDefault();
                AnchorNav.scrollto(href);
              }
            });

    });
  },

  scrollto : function(href, speed) {
    var speed = typeof(speed) != "undefined" ? speed : AnchorNav.scrollspeed;
    var id_or_name = href.substr(href.lastIndexOf('#') + 1);
    var $id =     $("#" + id_or_name);
    var $name =   $("a[name='" + id_or_name + "']");
    if( $id.length + $name.length < 1 ) {
      /* DEBUG */ if( AnchorNav.debug ){ console.log("No elements with id or name " + id_or_name + " existing -> exit"); }
      return;
    }
    var $scrollTarget = $id.length ? $id.first() : $name.first();
    var scrollTo = $scrollTarget.offset().top;

    // soft scroll animation
    $("html, body").stop().animate(
      { scrollTop : scrollTo + "px" },
      speed,
      AnchorNav.easing,
      function(){
        if( AnchorNav.sethash ){
          // callback -> update browser address bar url
          history.pushState({}, '', href);
        }
      }  
    );
  }


};

$(function(){
  AnchorNav.init();
});

