<?php
// Get Resolution by id
function get_resolution_by_id($id)
{
    global $db;
    $resolution = $db->select_one('editor_resolutions', '*', ['id' => $id]);
    if (!$resolution) return false;
    $resolution['full_title'] = $resolution['title'] . "(" . $resolution['width'] . ' x ' . $resolution['height'] . ")";
    return $resolution;
}
/* 
    Parse text for add tags
    Example 1:
            syntax: tag_name:classes[inner text]
            example: b:text-success[new value]
    Example 2: 
        Link
            syntax: tag_name:classes[inner text](url)
            example: a:text-info[naxotop](https://naxotop.com/)
    */
function parseMarkDownText($text)
{
    $txt = preg_replace('/(\w+):([\w-]+)?\[([^\]]*)\](\(([^)]+)\))?/mi', '<$1 class="$2" href="$5">$3</$1>', $text);
    $txt = preg_replace('/( href="">)/m', '>', $txt);
    return $txt;
}
