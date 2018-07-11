/*
########################################################################
JS/jQuery for Typesetter CMS plugin Anchor Navigation - editor component
Author: J. Krausz
Date: 2018-07-09
Version 1.0-b1
########################################################################
*/

function gp_init_inline_edit(area_id, section_object) { 

  $gp.LoadStyle( AnchorNavEditor.base + '/AnchorNav_edit.css' );
  gp_editing.editor_tools();

  gp_editor = {

    edit_div            : gp_editing.get_edit_area(area_id),
    save_path           : gp_editing.get_path(area_id),
    destroy             : function(){},
    checkDirty          : function(){ return gp_editor.isDirty; },
    resetDirty          : function(){},
    gp_saveData         : function(){},
    isDirty             : false,

    getOptions         : function(){},
    setOptions         : function(){},

    options             : {
      size  : 'md',
      align : 'left'
    },

    ui                  : { controls : {} }

  };


  gp_editor.gp_saveData = function() {
    section_object.attributes['data-navsize'] = gp_editor.options.size;
    section_object.attributes['data-navalign'] = gp_editor.options.align;
    var attributes = $.param( { attributes : section_object.attributes });
    gp_editor.isDirty = false;
    return attributes;
  }; /* fnc gp_editor.gp_saveData --end */


  gp_editor.getOptions= function(){
    gp_editor.options.size  = gp_editor.edit_div.attr('data-navsize')   || 'md';
    gp_editor.options.align = gp_editor.edit_div.attr('data-navalign')  || 'left';
    console.log("config = ", gp_editor.config);
  }; /* fnc gp_editor.getOptions --end */


  gp_editor.setOptions = function(){
    gp_editor.edit_div.attr('data-navsize', gp_editor.options.size );
    gp_editor.edit_div.attr('data-navalign', gp_editor.options.align );

    var remove_classes = 'pagination-sm pagination-md pagination-lg justify-content-center justify-content-end';
    var add_classes = ' pagination-' + gp_editor.options.size;
    switch( gp_editor.options.align ){
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
    gp_editor.edit_div.find('.pagination')
      .removeClass(remove_classes)
      .addClass(add_classes);
    gp_editor.isDirty = true;
  }; /* fnc gp_editor.setOptions --end */


  /* ----------------------------- */
  /* --- GET DATA FROM SECTION --- */
  /* ----------------------------- */

  gp_editor.getOptions();

  /* --- RENDER EDITOR AREA --- */
  gp_editor.ui.option_area = $('<div id="anchor-nav-editor-options"></div>')
    .prependTo('#ckeditor_controls');

  /* size control */
  gp_editor.ui.controls.size = $(
      '<select class="ckeditor_control">'
    +   '<option value="sm">small</option>'
    +   '<option value="md">medium</option>'
    +   '<option value="lg">large</option>'
    + '</select>')
    .val(gp_editor.options.size);

  gp_editor.ui.controls.size
    .on('input change', function(e){
      gp_editor.options.size = $(this).val();
      gp_editor.setOptions();
    });

  $('<label>Size</label>')
    .prepend(gp_editor.ui.controls.size)
    .appendTo(gp_editor.ui.option_area);


  /* alignment control */
  gp_editor.ui.controls.align = $(
      '<select class="ckeditor_control">'
    +   '<option value="left">left</option>'
    +   '<option value="center">center</option>'
    +   '<option value="right">right</option>'
    + '</select>')
    .val(gp_editor.options.align);

  gp_editor.ui.controls.align
    .on('input change', function(e){
      gp_editor.options.align = $(this).val();
      gp_editor.setOptions();
    });

    $('<label>Alignment</label>')
      .prepend(gp_editor.ui.controls.align)
      .appendTo(gp_editor.ui.option_area);


  // hide ajax overlay
  loaded();

} /* main fnc gp_init_inline_edit --end */
