<?php
return [
    'session'                => [
        // SESSION 前缀
        'prefix'         => 'admin',
        // 驱动方式 支持redis memcache memcached
        'type'           => '',
        // 是否自动开启 SESSION
        'auto_start'     => true,
    ],
    'app_debug'              => true,
    // 应用Trace
    'app_trace'              => false,

    'template'               => [
        // 模板引擎类型 支持 php think 支持扩展
        'type'         => 'Think',
        // 模板路径
        'view_path'    => APP_PATH .'course/view/',
        // 模板后缀
        'view_suffix'  => 'php',
        // 模板文件名分隔符
        'view_depr'    => DS,
        // 模板引擎普通标签开始标记
        'tpl_begin'    => '{',
        // 模板引擎普通标签结束标记
        'tpl_end'      => '}',
        // 标签库标签开始标记
        'taglib_begin' => '{',
        // 标签库标签结束标记
        'taglib_end'   => '}',
    ],
    'empty_controller' =>'Index',
    // 视图输出字符串内容替换
    'view_replace_str'       => [
        '{__PUBLIC_PATH}' =>  PUBILC_PATH,                 //public 目录
        '{__STATIC_PATH}' =>  PUBILC_PATH.'static/',       //全局静态目录
        '{__PLUG_PATH}'   =>  PUBILC_PATH.'static/plug/',  //全局静态插件
        '{__ADMIN_PATH}'  =>  PUBILC_PATH.'system/',       //后台目录
        '{__FRAME_PATH}'  =>  PUBILC_PATH.'system/frame/', //后台框架
        '{__MODULE_PATH}' =>  PUBILC_PATH.'system/module/',//后台模块
    ]
];
