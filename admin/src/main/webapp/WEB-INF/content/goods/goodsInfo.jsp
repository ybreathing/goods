<%--
  Created by IntelliJ IDEA.
  User: zzy
  Date: 2018/8/27
  Time: 23:33
  To change this template use File | Settings | File Templates.
--%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" %>--%>
<%--<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>--%>
<%--<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>--%>
<%--<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>--%>
<%--<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>--%>
<%--<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>--%>
<%--<html>--%>
<%--<head>--%>
<%--<title>商品</title>--%>
<%--</head>--%>
<%--<body>--%>
<%--<div id="login" class="shadow" style="text-align: center;">--%>
<%--<div class="innerDiv">${goods.goodName}的价格为${goods.goodPrice}!</div>--%>
<%--</div>--%>
<%--</body>--%>
<%--</html>--%>


</html>
<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title> 小贷管理系统</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="${path }/bui/assets/css/dpl-min.css" rel="stylesheet" type="text/css"/>
    <link href="${path }/bui/assets/css/bui-min.css" rel="stylesheet" type="text/css"/>
    <link href="${path }/bui/assets/css/main-min.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="${path }/bui/assets/js/bui.js"></script>
    <script type="text/javascript" src="${path }/bui/assets/js/config.js"></script>
    <style type="text/css">
        body {
            overflow: hidden;
        }

        #footer {
            position: fixed;
            bottom: 0; /* 关键 */
            left: 35%;
            font-family: NSimSun;
            font-size: 80%;
            color: #404040;
            height: 20px; /* footer的高度一定要是固定值*/
        }
    </style>
<body>

<div class="header">

    <div class="dl-title">
        <a href="#" title="文档库地址" target="_blank"><!-- 仅仅为了提供文档的快速入口，项目中请删除链接 -->
            <span class="lp-title-port">BUI</span><span class="dl-title-text">前端框架</span>
        </a>
    </div>

    <div class="dl-log">欢迎您，<span class="dl-log-user">**.**@alibaba-inc.com</span><a href="###" title="退出系统"
                                                                                     class="dl-log-quit">[退出]</a>
    </div>
</div>
<div class="content">
    <div class="dl-main-nav">
        <div class="dl-inform">
            <div class="dl-inform-title">贴心小秘书<s class="dl-inform-icon dl-up"></s></div>
        </div>
        <ul id="J_Nav" class="nav-list ks-clear">
            <li class="nav-item dl-selected">
                <div class="nav-item-inner nav-home">首页</div>
            </li>
            <li class="nav-item">
                <div class="nav-item-inner nav-order">客户视图</div>
            </li>
            <li class="nav-item">
                <div class="nav-item-inner nav-inventory">贷款申请</div>
            </li>
            <li class="nav-item">
                <div class="nav-item-inner nav-supplier">统计分析</div>
            </li>
            <li class="nav-item">
                <div class="nav-item-inner nav-marketing">系统设置</div>
            </li>
        </ul>
    </div>
    <ul id="J_NavContent" class="dl-tab-conten">

    </ul>
</div>

<script>
    BUI.use('common/main', function () {
        var config = [{
            id: 'menu',
            homePage: 'code',
            menu: [{
                text: '快捷菜单',
                items: [
                    {id: 'code', text: '首页', href: 'sub_home.jsp', closeable: false},
                    {id: 'main-menu', text: '新增客户', href: 'main/menu.html'},
                    {id: 'second-menu', text: '新增贷款', href: 'main/second-menu.html'},
                    {id: 'dyna-menu', text: '黑名单管理', href: 'main/dyna-menu.html'}
                ]
            }]
        }, {
            id: 'form',
            menu: [{
                text: '表单页面',
                items: [
                    {id: 'code', text: '表单代码', href: 'form/code.html'},
                    {id: 'example', text: '表单示例', href: 'form/example.html'},
                    {id: 'introduce', text: '表单简介', href: 'form/introduce.html'},
                    {id: 'valid', text: '表单基本验证', href: 'form/basicValid.html'},
                    {id: 'advalid', text: '表单复杂验证', href: 'form/advalid.html'},
                    {id: 'remote', text: '远程调用', href: 'form/remote.html'},
                    {id: 'group', text: '表单分组', href: 'form/group.html'},
                    {id: 'depends', text: '表单联动', href: 'form/depends.html'}
                ]
            }, {
                text: '成功失败页面',
                items: [
                    {id: 'success', text: '成功页面', href: 'form/success.html'},
                    {id: 'fail', text: '失败页面', href: 'form/fail.html'}

                ]
            }, {
                text: '可编辑表格',
                items: [
                    {id: 'grid', text: '可编辑表格', href: 'form/grid.html'},
                    {id: 'form-grid', text: '表单中的可编辑表格', href: 'form/form-grid.html'},
                    {id: 'dialog-grid', text: '使用弹出框', href: 'form/dialog-grid.html'},
                    {id: 'form-dialog-grid', text: '表单中使用弹出框', href: 'form/form-dialog-grid.html'}
                ]
            }]
        }, {
            id: 'search',
            menu: [{
                text: '搜索页面',
                items: [
                    {id: 'code', text: '搜索页面代码', href: 'search/code.html'},
                    {id: 'example', text: '搜索页面示例', href: 'search/example.html'},
                    {id: 'example-dialog', text: '搜索页面编辑示例', href: 'search/example-dialog.html'},
                    {id: 'introduce', text: '搜索页面简介', href: 'search/introduce.html'},
                    {id: 'config', text: '搜索配置', href: 'search/config.html'}
                ]
            }, {
                text: '更多示例',
                items: [
                    {id: 'tab', text: '使用tab过滤', href: 'search/tab.html'}
                ]
            }]
        }, {
            id: 'detail',
            menu: [{
                text: '详情页面',
                items: [
                    {id: 'code', text: '详情页面代码', href: 'detail/code.html'},
                    {id: 'example', text: '详情页面示例', href: 'detail/example.html'},
                    {id: 'introduce', text: '详情页面简介', href: 'detail/introduce.html'}
                ]
            }]
        }, {
            id: 'chart',
            menu: [{
                text: '图表',
                items: [
                    {id: 'code', text: '引入代码', href: 'chart/code.html'},
                    {id: 'line', text: '折线图', href: 'chart/line.html'},
                    {id: 'area', text: '区域图', href: 'chart/area.html'},
                    {id: 'column', text: '柱状图', href: 'chart/column.html'},
                    {id: 'pie', text: '饼图', href: 'chart/pie.html'},
                    {id: 'radar', text: '雷达图', href: 'chart/radar.html'}
                ]
            }]
        }];
        new PageUtil.MainPage({
            modulesConfig: config
        });
    });
</script>
<div id="footer" style="text-align:center">
    Copyright &copy2016-2017 经典有爱小帮手信息化系统 版权所有 v1.0.0
</div>
</body>
</html>

