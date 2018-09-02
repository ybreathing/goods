var accordionOutside = null;
var controlOutside = null;
var menuOutside = null;

var contentTemp = '<iframe id="page_{index}" width="100%" height="100%" frameborder="0" scrolling="no" src="" ></iframe>';
var contentTempFirst = '<iframe id="page_{index}" width="100%" height="100%" frameborder="0" scrolling="no" src="{url_1}" ></iframe>';
var titleTemp = '{title}';
var menuTitleTemp = '<div class="menu-Main" id="{menuId}"><div class="menu-Left">{menuName}</div><div class="menu-Right">' +
    '<img class="yes-hidden" id="yesStatus" src="'+contextPath+'/bui/assets/img/yes16.png"/>' +
    '<img id="noStatus" class="" src="'+contextPath+'/bui/assets/img/alert16.png"/></div></div>';



var menuConfig = [];
var controlConfig = [];
var subMenu = [];
var menuUrl = [];

var fullMask = null;
var partMask = null;

var currentMenuCode = null;
BUI.use(['bui/mask'],function (Mask) {
	partMask = Mask;
	fullMask = new partMask.LoadMask({
        el : 'body',
        msg : '请稍候....'
     });
});



function showFullMask(){
    //alert("showFullMask");
	var index = getCurrentId();
		fullMask = new partMask.LoadMask({
           el : ".x-layout-item-accordion:eq("+index+")",
           msg : '请稍候....'
       });
	fullMask.show();
}

function showPartMask(el){
	var index = getCurrentId();
	 
	if(el != "body"){
		fullMask = new partMask.LoadMask({
           el : el,
           msg : '请稍候....'
		  
       });
	   fullMask.show();
	}else{
		fullMask.show();
	}
}


  
function hideFullMask(){
	var index = getCurrentId();

	fullMask.hide();
}

function initMenu(subMenu,paramStr){
    try{
        if(!paramStr){
            var paramStr = "";
        }
        for (var index = 0; index < subMenu.items.length; index ++){
            var item = subMenu.items[index];
            menuConfig[index] = {
                index : index,
                content : menuTitleTemp.replace("{menuName}",item.text).replace("{menuId}",item.id),
                selected : false
            };
			if(BUI.debug && win.console && win.console.log){
				console.log(menuConfig);
			}
            
            if(index == 0){
                //menuConfig[index].push({selected:true});//["selected"] = true;
                menuConfig[index]["selected"] = true;
                /*controlConfig[index] = {
                    layout : {
                        title : titleTemp.replace("{title}",item.text).replace("{menuId}",item.id)
                    },
                    content : contentTempFirst.replace("{index}",index).replace("{url_1}",item.href + paramStr)
                };*/
            }else{

            }

            controlConfig[index] = {
                layout : {
                    title : titleTemp.replace("{title}",item.text).replace("{menuId}",item.id)
                },
                content : contentTemp.replace("{index}",index)
            };

            //
            menuUrl[menuUrl.length] = item.href + paramStr;
        }

    }catch(e){
		if(BUI.debug && win.console && win.console.log){
				console.log(e.message);
			}
        
    }
}

function getDynamicMenuConfig(parentId, parentText,parentRender){
    try{

        var config = null;
        //例子
        if(parentId == 'individualApply'){
            config = 
					{
		              text:parentText,
					  homepage:'select_cust',
		              items:[
		                {id:'select_cust',text:'1. 选择客户',href:contextPath+'/individual/applylist',parent:parentId},
					    {id:'cust_base',text:'2. 基本资料',href:contextPath+'/individual/baseadd',parent:parentId},
		                {id:'assetlist',text:'3. 资产信息',href:contextPath+'/individual/assetlist',parent:parentId},
		                {id:'attchlist',text:'4. 资料附件',href:contextPath+'/individual/docattchdetail',parent:parentId},
		                {id:'app_loan',text:'5. 申请贷款',href:contextPath+'/individual/intention/add',parent:parentId}
		              ]
		            };
			
        }
        else if(parentId == 'corporationApply'){
            config =
            {
                text:parentText,
                homepage:'selectCust',
                items:[
		                {id:'selectCust',text:'1. 选择客户',href:contextPath +'/corporation/applylist',parent:parentId},
		                {id:'corpbaseadd',text:'2. 企业基本信息',href:contextPath+'/corporation/baseadd',parent:parentId},
		                {id:'corporateedit',text:'3. 联系人资料',href:contextPath+'/corporation/relapersonlist',parent:parentId},
		                {id:'assetlist',text:'4. 资产信息',href:contextPath+'/corporation/assetlist',parent:parentId},
		                {id:'attchlist',text:'5. 资料附件',href:contextPath+'/corporation/docattchdetail',parent:parentId},
		                {id:'app_loan',text:'6. 申请贷款',href:contextPath+'/corporation/add/business',parent:parentId}
		        ]
            };
        }
        else if(parentId == 'addcorporation'){
            config =
            {
                text:parentText,
                homepage:'corpbaseadd',
                items:[
                    {id:'corpbaseadd',text:'1. 企业基本信息',href:contextPath+'/corporation/baseadd',parent:parentId},
                    {id:'corporateedit',text:'2. 联系人资料',href:contextPath+'/corporation/relapersonlist',parent:parentId},
                    {id:'assetlist',text:'3. 资产信息',href:contextPath+'/corporation/assetlist',parent:parentId},
                    {id:'attchlist',text:'4. 资料附件',href:contextPath+'/corporation/docattchdetail',parent:parentId}
                ]
            };
        }else if(parentId == 'addindividual') {
		config = {
		              text:parentText,
					  homepage:'cust_base',
		              items:[
					    {id:'cust_base',text:'1. 基本资料',href:contextPath+'/individual/baseadd',parent:parentId},
		                {id:'assetlist',text:'2. 资产信息',href:contextPath+'/individual/assetlist',parent:parentId},
		                {id:'attchlist',text:'3. 资料附件',href:contextPath+'/individual/docattchdetail',parent:parentId}
		              ]
		            };
		}else if(parentId == 'indiviadualInfo') {
		config = {
		              text:parentText,
					  homepage:'cust_base',
		              items:[
					    {id:'cust_base',text:'1. 基本资料',href:contextPath+'/individual/basedetail',parent:parentId},
		                {id:'assetlist',text:'2. 资产信息',href:contextPath+'/individual/assetlist',parent:parentId},
		                {id:'attchlist',text:'3. 资料附件',href:contextPath+'/individual/docattchdetail',parent:parentId}
		              ]
		            }
		}else if(parentId == 'individualApplyInfo'){
            config =
            {
                text:parentText,
                homepage:'cust_base',
                items:[
                    {id:'cust_base',text:'1. 基本资料',href:contextPath+'/individual/basedetail',parent:parentId},
                    {id:'assetlist',text:'2. 资产信息',href:contextPath+'/individual/assetlist',parent:parentId},
                    {id:'attchlist',text:'3. 资料附件',href:contextPath+'/individual/docattchdetail',parent:parentId},
                    {id:'app_loan',text:'4. 申请贷款',href:contextPath+'/individual/intention/edit',parent:parentId}
                ]
            };
        }else if(parentId == 'individualApplyInfoByName'){
            config =
            {
                text:parentText,
                homepage:'cust_base',
                items:[
                    {id:'cust_base',text:'1. 基本资料',href:contextPath+'/individual/basedetail',parent:parentId},
                    {id:'assetlist',text:'2. 资产信息',href:contextPath+'/individual/assetlist',parent:parentId},
                    {id:'attchlist',text:'3. 资料附件',href:contextPath+'/individual/docattchdetail',parent:parentId},
                    {id:'app_loan',text:'4. 申请贷款',href:contextPath+'/individual/intention/add',parent:parentId}
                ]
            };
        }else if(parentId == 'corporationInfo') {
			config = {
		              text:parentText,
					  homepage:'cust_base',
		              items:[
					    {id:'corpbaseadd',text:'1. 企业基本信息',href:contextPath+'/corporation/basedetail',parent:parentId},
						{id:'corporateedit',text:'2. 联系人资料',href:contextPath+'/corporation/relapersonlist',parent:parentId},
						{id:'assetlist',text:'3. 资产信息',href:contextPath+'/corporation/assetlist',parent:parentId},
						{id:'attchlist',text:'4. 资料附件',href:contextPath+'/corporation/docattchdetail',parent:parentId}
		              ]
		            }
		}else if(parentId == 'corporationApplyInfo'){
            config =
            {
                text:parentText,
                homepage:'corpbaseadd',
                items:[
		                {id:'corpbaseadd',text:'1. 企业基本信息',href:contextPath+'/corporation/basedetail',parent:parentId},
		                {id:'corporateedit',text:'2. 联系人资料',href:contextPath+'/corporation/relapersonlist',parent:parentId},
		                {id:'assetlist',text:'3. 资产信息',href:contextPath+'/corporation/assetlist',parent:parentId},
		                {id:'attchlist',text:'4. 资料附件',href:contextPath+'/corporation/docattchdetail',parent:parentId},
		                {id:'app_loan',text:'5. 申请贷款',href:contextPath+'/corporation/intention/report/edit',parent:parentId}
		        ]
            };
        }else if(parentId == 'corporationApplyInfoByName'){
            config =
            {
                text:parentText,
                homepage:'corpbaseadd',
                items:[
                    {id:'corpbaseadd',text:'1. 企业基本信息',href:contextPath+'/corporation/basedetail',parent:parentId},
                    {id:'corporateedit',text:'2. 联系人资料',href:contextPath+'/corporation/relapersonlist',parent:parentId},
                    {id:'assetlist',text:'3. 资产信息',href:contextPath+'/corporation/assetlist',parent:parentId},
                    {id:'attchlist',text:'4. 资料附件',href:contextPath+'/corporation/docattchdetail',parent:parentId},
                    {id:'app_loan',text:'5. 申请贷款',href:contextPath+'/corporation/add/business',parent:parentId}
                ]
            };
        }
		else{
            config =
            {
                text:parentText,
                homepage:'corpbaseadd',
                items:[
                    {id:'corpbaseadd',text:'1. 企业基本信息',href:'../main/loader.html',parent:parentId},
                    {id:'corporateedit',text:'2. 联系人资料',href:'D:/mLend/hlc-web/src/main/webapp/WEB-INF/content/bui/main/loader.html',parent:parentId},
                    {id:'assetlist',text:'3. 资产信息',href:'D:/mLend/hlc-web/src/main/webapp/WEB-INF/content/bui/main/loader.html',parent:parentId},
                    {id:'executivesedit',text:'4. 高管信息',href:'D:/mLend/hlc-web/src/main/webapp/WEB-INF/content/bui/main/loader.html',parent:parentId}
                ]
            };
        }


    }catch(e){
		if(BUI.debug && win.console && win.console.log){
			console.log(e.message);
		}
    }
    return config;
}

function init(Layout,Menu,Collapsable,menuId,paramStr){
    var accordionLayout = new BUI.Layout.Accordion({duration:0});
    currentMenuCode = menuId;
    subMenu = getDynamicMenuConfig(menuId);
    initMenu(subMenu,paramStr);

    var control = new BUI.Component.Controller({
        width:$("#Content-Main").css("width")-5,
        height:'100%',
        render : '#J_Layout',
        elCls : 'layout-test',
        defaultChildClass : 'controller',
        children : controlConfig,
        plugins : [accordionLayout]
    });
	
	
    control.render();
	//showPartMask(".x-layout-item-accordion:eq(0)");


    var menu = new Menu.Menu({
        render : '#m1',
        width : $("#Content-Left").width() - 2,
        elCls: 'demo-menu',
        children : menuConfig
    });
    menu.render();
    menu.on('itemselected', function(e){
        //dump_obj(e..index);
        if(!e.item){
            //var index = e.index;
            //$(".bui-menu-item:eq("+index+")").addClass("bui-menu-item-selected");
			//menu.setSelected(menu.getItemAt(index));
        }else{
            var index = e.item.get('index');

        }
        //console.log(index);
        //先清空选择
        for(var i = 0 ; i < $(".bui-menu-item").length; i++){
            if(i != index){
                $(".bui-menu-item:eq("+i+")").removeClass("bui-menu-item-selected");
            }

        }
        var sender = $(".x-layout-item-accordion:eq("+index+") > .x-accordion-title");
        //c//onsole.log(sender);
        toggleContent(sender,index);
    });

    //为了关联菜单和tab页面，初始化index
    for(var i = 0 ; i < $(".x-layout-item-accordion").length; i++){
        $(".x-layout-item-accordion:eq("+i+")").attr("index", i);
    }

    $(".x-layout-item-accordion").on("click", function(e){
        var item = $(e.currentTarget);
        var index = item.attr("index");


        //for(var i = 0 ; i < $(".bui-menu-item").length; i++){
        //    $(".bui-menu-item:eq("+i+")").removeClass("bui-menu-item-selected");
        //}
		
		menu.clearSelection();
		
		setTimeout(function(){
		for(var i = 0 ; i < $(".x-layout-item-accordion").length; i++){
                if(!$(".x-layout-item-accordion:eq("+i+")").hasClass("x-collapsed")){
                    $(".bui-menu-item:eq("+i+")").addClass("bui-menu-item-selected");
					menu.setSelected(menu.getItemAt(i));
					setTimeout(adjustHeight,200);
                    //$("html,body").animate({scrollTop:$(".x-layout-item-accordion:eq("+i+")").offset().top},400);
                    break;
                }
            }
		},200);
        //menu.render();
    });

    //初始化高度
    $(".x-accordion-body > div").each(function(i){
        $(this).css({ "height": "100%"});
    });

    accordionOutside = accordionLayout;
    controlOutside = control;
    menuOutside = menu;

    $(window).resize(function(){
        //alert(1);
        menu.render();
        accordionLayout.render();
        control.render();
    });
}

function freshAllContent(){
    showPartMask(".x-layout-item-accordion:eq(0)");
    for(var i = 0 ; i < menuUrl.length; i++){
        $("#page_" + i).attr("src",menuUrl[i]);
    }
    var firstTime = true;
    $("#page_0").on('load',function(){
        if(firstTime){
            adjustHeight();
            firstTime = false;
        }
        hideFullMask();
    });
}

//根据内容调整布局高度
function adjustHeight(){
    //console.log(control);
    //console.log("control::" + control.get("height"));
    var controlHeight = controlOutside.get("height");
    var containtHeight = null;
    var currentFrameHeight = null;
    for(var i = 0 ; i < $(".x-layout-item-accordion").length; i++){
        if(!$(".x-layout-item-accordion:eq("+i+")").hasClass("x-collapsed")){
			//console.log("expand:" + i);
			//$("#x-accordion-body:eq("+i+")").css({height:'100%'});
			controlOutside.set("height" , "100%");
            //containtHeight = $(".x-accordion-body:eq("+i+") > div > iframe").contents().find("body").height();
			//containtHeight = $(".x-accordion-body:eq("+i+") > div > iframe").contents().find("html").height();
            try{
                containtHeight = document.getElementById("page_"+i).contentDocument.body.scrollHeight;
            }catch(e){
                console.log(e.message);
                containtHeight = $(".x-accordion-body:eq("+i+") > div > iframe").contents().find("body").height();
            }

			//containtHeight = document.getElementById("page_"+i).contentWindow.document.documentElement.scrollHeight;
            var loadingFrame = $(".x-accordion-body:eq("+i+") > div > iframe");
            currentFrameHeight = loadingFrame.height();
            console.log("containtHeight::" + containtHeight);
            console.log(":::"+currentFrameHeight);

            if(containtHeight){
                controlOutside.set("height" , containtHeight+$(".x-layout-item-accordion").length*40 + 20);
            }else{
                setTimeout(adjustHeight, 400);
            }



            break;
        }
    }
	//console.log("Content-Main::" + $("#Content-Main").height());
    //console.log("control::" + controlOutside.get("height"));
    $("#m1").pin({containerSelector: "#Content"});
    $("html,body").animate({scrollTop:$(".x-layout-item-accordion:eq("+i+")").offset().top},200);
}

function adjustContentHeight(contentHeight){
	var controlHeight = controlOutside.get("height");
    var containtHeight = null;
    var currentFrameHeight = null;
	//$("html,body").animate({scrollTop:$(".x-layout-item-accordion:eq("+i+")").offset().top},400);
    for(var i = 0 ; i < $(".x-layout-item-accordion").length; i++){
        if(!$(".x-layout-item-accordion:eq("+i+")").hasClass("x-collapsed")){
			var offsetTop = $(".x-layout-item-accordion:eq("+i+")").offset().top;
			//controlOutside.set("height" , "100%");
            //containtHeight = $(".x-accordion-body:eq("+i+") > div > iframe").contents().find("body").height();
            try{
                containtHeight = document.getElementById("page_"+i).contentDocument.body.scrollHeight;
            }catch(e){
                console.log(e.message);
                try{
                    containtHeight = $(".x-accordion-body:eq("+i+") > div > iframe").contents().find("body").height();
                }catch(e){
                    setTimeout(function(){adjustContentHeight(contentHeight)}, 400);
                    //adjustContentHeight(contentHeight);
                }

            }
            var loadingFrame = $(".x-accordion-body:eq("+i+") > div > iframe");
            currentFrameHeight = loadingFrame.height();
            //console.log("containtHeight::" + containtHeight);
            //console.log(":::"+currentFrameHeight);
            var adjuest = controlHeight + containtHeight - currentFrameHeight;
            //console.log("adjuest ]]" + adjuest);
	
            controlOutside.set("height" , containtHeight+$(".x-layout-item-accordion").length*35 + contentHeight);
			//controlOutside.set("height" , controlHeight+contentHeight);
			
			//$("html,body").animate({scrollTop:offsetTop},5);
            break;
        }
    }
    $("#m1").pin({containerSelector: "#Content"});

}

function toggleMenu(index,parem,menuId){
    if(!index){
        for (var i = 0; i < subMenu.items.length; i ++){
            var item = subMenu.items[i];
            if(item.id == menuId){
                index = i;
                break;
            }
        }
    }
	
	if(!menuId){
		var item = subMenu.items[index];
		menuId = item.id;
    }
	
	//menuOutside.fire('itemselected',{index:index});
	menuOutside.clearSelection();
	$(".bui-menu-item:eq("+index+")").addClass("bui-menu-item-selected");
	menuOutside.setSelected(menuOutside.getItemAt(index));
	
    if(index >= 0 && parem && !isFinished(menuId)){
        //如果有参数，则刷新
        var url = $("#page_" + index).attr("src");
        //cut the old parameters
        if(url.indexOf("?")>0){
            url = url.substring(0, url.indexOf("?"));
        }

        $("#page_" + index).attr("src",url+"?"+parem);
        menuUrl[index] = url;
        //document.getElementById('page_' + index).contentWindow.location.reload();
    }else{
       // adjustHeight();
    }
    //setTimeout(adjustHeight,200);
	
}

function getCurrentId(){
	for(var i = 0 ; i < $(".x-layout-item-accordion").length; i++){
		if(!$(".x-layout-item-accordion:eq("+i+")").hasClass("x-collapsed")){
			return i;
        }
    }
	return 0;
}

function setFinished(menuId){
    console.log(menuId);
    if(!menuId){
		var index = getCurrentId();
        console.log(index + "----" + index);
		$(".bui-menu-item:eq("+index+") > div > .menu-Right >  #yesStatus").removeClass("yes-hidden");
        $(".bui-menu-item:eq("+index+") > div > .menu-Right >  #noStatus").addClass("yes-hidden");
    }else{
        //var url = menuId.substring(menuId.indexOf("/"), menuId.length);
        for(var index = 0 ; index < menuUrl.length; index++){
            if(menuUrl[index].indexOf(menuId) >= 0){
                console.log(menuId + "----" + index);
                $(".bui-menu-item:eq("+index+") > div > .menu-Right >  #yesStatus").removeClass("yes-hidden");
                $(".bui-menu-item:eq("+index+") > div > .menu-Right >  #noStatus").addClass("yes-hidden");
                break;
            }
        }
	}
}

function setEdit(menuId){
    if(!menuId){
        var index = getCurrentId();
        $(".bui-menu-item:eq("+index+") > div > .menu-Right >  #noStatus").removeClass("yes-hidden");
        $(".bui-menu-item:eq("+index+") > div > .menu-Right >  #yesStatus").addClass("yes-hidden");
    }else{
        for(var index = 0 ; index < menuUrl.length; index++) {
            if(menuUrl[index].indexOf(menuId) >= 0){
                $(".bui-menu-item:eq("+index+") > div > .menu-Right >  #noStatus").removeClass("yes-hidden");
                $(".bui-menu-item:eq("+index+") > div > .menu-Right >  #yesStatus").addClass("yes-hidden")
                break;
            }
        }
    }
}

function removeFinished(menuId){
	if(!menuId){
		var index = getCurrentId();
		$(".bui-menu-item:eq("+index+") > div > .menu-Right > #yesStatus").addClass("yes-hidden");
    }else{
		$("#" + menuId + " > .menu-Right > #yesStatus").addClass("yes-hidden");
	}
}

function isFinished(menuId){
    if($("#" + menuId + " > .menu-Right > #yesStatus").hasClass("yes-hidden")){
        return false;
    }else{
        return true;
    }
}

function nextStep(param){
	var index = getCurrentId();
	var sum = $(".x-layout-item-accordion").length;
	var nextIndex = (index+1)>=sum?0:index+1;
	
    toggleMenu(nextIndex,param,null);

}

function refleshNextAllPages(param){
	var index = getCurrentId();
	var sum = $(".x-layout-item-accordion").length;
	for(var i = index + 1; i < sum; i++){
		var url = $("#page_" + i).attr("src");
        //cut the old parameters
        if(url.indexOf("?")>0){
            url = url.substring(0, url.indexOf("?"));
        }
        //console.log("url :: "+ url);
        $("#page_" + i).attr("src",url+"?"+param);
        menuUrl[i] = url;
	}
}

function preStep(param){
	var index = getCurrentId();
	var sum = $(".x-layout-item-accordion").length;
	var preIndex = (index-1)>=sum?0:index-1;//index-1;
	//上一步不刷新页面
    toggleMenu(preIndex,null,null);
}

function returnPage(index, param){
	toggleMenu(index,param,null);
}

//刷新本身内容
function refleshContent(url){
	var index = getCurrentId();
    $("#page_" + index).attr("src",url);
	$("#page_" + index).on("load",function(){
		adjustHeight();
		//$("html,body").animate({scrollTop:$(".x-layout-item-accordion:eq("+index+")").offset().top},100);
	});
    menuUrl[index] = url;
    //document.getElementById('page_' + index).contentWindow.location.reload(true);
	//$("#page_" + index).reload();
}

function refleshNextContent(url){
	//console.log("url :: "+ url);
	var index = getCurrentId()+1;
    $("#page_" + index).attr("src",url);
    menuUrl[index] = url;
}

function toggleContent(sender,i){
    var item = accordionOutside.getItemByElement(sender);
	if(!$(".x-layout-item-accordion:eq("+i+")").hasClass("x-collapsed")){
		return;
	}
    accordionOutside.toggleCollapse(item);
	setTimeout(adjustHeight,300);
	$("html,body").animate({scrollTop:sender.offset().top},400);
    //setTimeout(adjustHeight,1000);
    menuOutside.render();
}

function complete() {
	setFinished();
	openPageWithParams('corporationlist',null, 'form',true);
}


function closePage(){
    if(currentMenuCode){
        closeCurrentPage(currentMenuCode);
    }

}