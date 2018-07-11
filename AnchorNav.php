<?php
/*
######################################################################
PHP class for Typesetter CMS plugin Anchor Navigation
Author: J. Krausz
Date: 2018-07-09
Version 1.0-b1
######################################################################
*/

defined('is_running') or die('Not an entry point...');

class AnchorNav {

  static function GetHead() {
    global $page, $addonRelativeCode;
    $page->css_user[] = $addonRelativeCode . '/AnchorNav.css';
    $page->head_js[]  = $addonRelativeCode . '/AnchorNav.js';
  }



  static function SectionTypes($section_types){
    $section_types['AnchorNav'] = array();
    $section_types['AnchorNav']['label'] = 'Anchor Navigation';
    return $section_types;
  }



  static function NewSections($links){
    global $addonRelativeCode;
    foreach($links as $key => $section_type_arr){
      if( $section_type_arr[0] == 'AnchorNav' ){
        $links[$key] = array('AnchorNav', $addonRelativeCode . '/icons/section.png');
      }
    }
    return $links;
  }



  static function DefaultContent($default_content, $type){
    if( $type !== 'AnchorNav' ){
      return $default_content;
    }
    global $addonRelativeCode;
    if( $type == 'AnchorNav' ){
      $newSection = array(
      'content'   => '<p>Anchor Navigation will be generated &hellip;</p>'
                   .   '<noscript>'
                   .     '<div class="alert alert-warning">Anchor Navigation: This component requires JavaScript enabled!</div>'
                   .   '</noscript>',
      'attributes' => array(
        'data-navsize'  => 'md',
        'data-navalign' => 'left',
       ),
      'gp_label'  => 'Anchor Navigation',
      'gp_color'  => '#D22814',
      );
    }
    return $newSection;
  }



  static function SaveSection($return, $section, $type){
    global $page;
    if( $type != 'AnchorNav' ){
      return $return;
    }
    // msg('POST = ' . pre($_POST));
    if( !empty($_POST['attributes']) && is_array($_POST['attributes']) ){
      $page->file_sections[$section]['attributes'] = & $_POST['attributes'];
    }
    return true;
  }



  static function InlineEdit_Scripts($scripts, $type){
    if( $type !== 'AnchorNav' ){
      return $scripts;
    }
    global $addonRelativeCode, $addonCodeFolder, $addonFolderName;

    // addon JS Data Object/basepath
    $addonBasePath = (strpos($addonRelativeCode, 'addons/') > 0) 
      ? '/addons/' . $addonFolderName 
      : '/data/_addoncode/' . $addonFolderName;
    echo 'var AnchorNavEditor = { base : "' . $addonBasePath . '" }; ';

    $scripts[] = $addonCodeFolder . '/AnchorNav_edit.js'; 
    return $scripts;
  }

}