function dump_obj(myObject) {  
      var s = "";  
      for (var property in myObject) {  
       s = s + "\n "+property +": " + myObject[property] ;  
      }  
      alert(s);  
    }  
function returnPage(item){
		try{
		//var index = top.topManager._getModuleIndex(item);
        top.topManager._returnModuleSelected(item);
		top.topManager._refleshMenuBar();
		}catch(e){alert(e);}
	}
	
function getDynamicMenuConfig(parentId, parentText,parentRender){
	try{
		
		var config = null;
	//例子
	if(parentId == 'individualApply'){
		config = [
					{
		              text:parentText,
					  homepage:'select_cust',
		              items:[
		                {id:'select_cust',text:'1. 选择客户',href:contextPath+'/individual/applylist',parent:parentId},
					    {id:'cust_base',text:'2. 基本资料',href:contextPath+'/individual/baseadd',parent:parentId},
		                {id:'oper_condition',text:'3. 经济信息',href:contextPath+'/individual/economicsdetail',parent:parentId},
		                {id:'relate_mem',text:'4. 工作信息',href:contextPath+'/individual/workdetail',parent:parentId},
		                {id:'credit_record',text:'5. 信用记录',href:contextPath+'/individual/creditdetail',parent:parentId},
		                {id:'app_loan',text:'6. 申请贷款',href:contextPath+'/individual/intention/add',parent:parentId}
		              ]
		            }
			];
	}
	else if(parentId == 'corporationApply'){
		config = [
					{
		              text:parentText,
					  homepage:'selectCust',
		              items:[
		                {id:'selectCust',text:'1. 选择客户',href:contextPath +'/corporation/applylist',parent:parentId},
		                {id:'corpbaseadd',text:'2. 企业基本信息',href:contextPath+'/corporation/baseadd?',parent:parentId},
		                {id:'bcedit',text:'3. 经营信息',href:contextPath+'/corporation/bcdetail?',parent:parentId},
		                {id:'corporateedit',text:'4. 企业干系人',href:contextPath+'/corporation/cordetail?',parent:parentId},
		                {id:'assetlist',text:'5. 资产信息',href:contextPath+'/corporation/assetlist?',parent:parentId},
		                {id:'executivesedit',text:'6. 高管信息',href:contextPath+'/corporation/excutivedetail?',parent:parentId},
		                {id:'app_loan',text:'7. 申请贷款',href:contextPath+'/corporation/add/business?',parent:parentId}
		              ]
		            }
			];
	}
	else if(parentId == 'addcorporation'){
	  config = [
			{
              text:parentText,
			  homepage:'corpbaseadd',
              items:[
			   {id:'corpbaseadd',text:'1. 企业基本信息',href:contextPath+'/corporation/baseadd?',parent:parentId},
                {id:'bcedit',text:'2. 经营信息',href:contextPath+'/corporation/bcdetail?',parent:parentId},
                {id:'corporateedit',text:'3. 企业干系人',href:contextPath+'/corporation/cordetail?',parent:parentId},
                {id:'assetlist',text:'4. 资产信息',href:contextPath+'/corporation/assetlist?',parent:parentId},
                {id:'executivesedit',text:'5. 高管信息',href:contextPath+'/corporation/excutivedetail?',parent:parentId}
              ]
            }
		];
	}
	else if(parentId == 'addindividual') {
		config = [
					{
		              text:parentText,
					  homepage:'cust_base',
		              items:[
					    {id:'cust_base',text:'1. 基本资料',href:contextPath+'/individual/baseadd?',parent:parentId},
		                {id:'oper_condition',text:'2. 经济信息',href:contextPath+'/individual/economicsdetail?',parent:parentId},
		                {id:'relate_mem',text:'3. 工作信息',href:contextPath+'/individual/workdetail?',parent:parentId},
		                {id:'credit_record',text:'4. 信用记录',href:contextPath+'/individual/creditdetail?',parent:parentId}
		              ]
		            }
				];
	}
	
	
	}catch(e){
		alert(e);
	}
	return config;
}
	
	
define('common/main',['bui/menu','bui/tab','bui/mask'],function(require) {
  //定义全局命名空间
  var PageUtil = BUI.app('PageUtil'),
    Menu = require('bui/menu'),
    Tab = require('bui/tab');
  var Mask = require('bui/mask');
  var fullMask = require('bui/mask');
	

  var CLS_SELECTE = 'dl-selected',//选中的模块样式
      CLS_HIDDEN = 'ks-hidden',//隐藏的模块样式
      CLS_LAST = 'dl-last',//最后一个元素
      CLS_HOVER = 'dl-hover',
      CLS_ITEM = 'nav-item',
      CLS_LEFT_SLIB = 'dl-second-slib',
      CLS_TAB_ITEM = 'dl-tab-item',
      CLS_CALLAPSE = 'dl-collapse',
      CLS_HIDE_CURRENT = 'dl-hide-current',
      ATTTR_INDEX ='data-index',
      WIDTH_ITERM = 145;
	  

  function setTopManager(mainPageObj){
    window.topManager = mainPageObj;
  }
  
  
  
  
  function addSearch(href,search){
    if(href.indexOf('?') !== -1){
      return href + '&' + search;
    }else{
      return href + '?' + search;
    }
  }
  //创建菜单和Tab，并绑定关联,是否收缩，是否有首页
  function tabNav(moduleId,tabConfig,menuConfig,collapsed,homePage){
    var _self =this,
      menu = new Menu.SideMenu(menuConfig),
      tab = new Tab.NavTab(tabConfig),
      menuContainerEl = $(menuConfig.render),
      slibEl = menuContainerEl.next('.' + CLS_LEFT_SLIB + '-con'),
      navContainerEl = menuContainerEl.parents('.'+CLS_TAB_ITEM);
    if(slibEl){
      slibEl.on('click',function(){
        navContainerEl.toggleClass(CLS_CALLAPSE);
      });
      slibEl.parent().height(tabConfig.height);
    }
    if(collapsed){
        navContainerEl.addClass(CLS_CALLAPSE);
    }
    //点击菜单，切换Tab，并刷新
    menu.on('menuclick',function(ev){
	
      var item = ev.item;
      if(item ){
		  //console.log(item);
		if(item.get("shortCut")) {
			top.topManager.openPage({
				id:item.get("id"),
				href : item.get("href"),
				title : item.get("text"),
				moduleId :item.get("module"),
				reload : true 
			});
		}else if(item.get("dynamicTab")){
			//alert(navContainerEl.hasClass(CLS_CALLAPSE));
			if(!navContainerEl.hasClass(CLS_CALLAPSE))
				navContainerEl.toggleClass(CLS_CALLAPSE);
			_self.tab.addTab({id: item.get('id'), title: item.get('text'), href: item.get('href'),closeable : item.get('closeable')},true);
		} else if(item.get("dynamic")){
			//隐藏原来的菜单
			//menuContainerEl.addClass(CLS_HIDDEN);
			//打开动态菜单
			
			createDynamicMenu(item.get('id'),item.get('text'),menuConfig.render,tabConfig);
		}else{
			//正常打开菜单
			_self.tab.addTab({id: item.get('id'), title: item.get('text'), href: item.get('href'),closeable : item.get('closeable')},true);
		}
		
		top.topManager.showFullMask();
      }
      if(top.topManager){
		  top.topManager._refleshMenuBar();
	  }


    });

    //选中的菜单发生改变后，更新链接上的页面编号
    menu.on('itemselected',function(ev){   
      var item = ev.item; 
      if(item){
        setNavPosition(moduleId,item.get('id'));
      }    
      
    });

    //切换Tab激活菜单
    tab.on('activeChange',function(ev){
      var item = ev.item;
	  if(item){
        _self.menu.setSelectedByField(item.get('id'));
      }else{
        _self.menu.clearSelection();
      }
	  
	  /*if(!_self.menu.getSelected()){
		  //动态菜单和主菜单相互切换
		  changeMenu(menuConfig.render);
		  _self.menu.setSelectedByField(item.get('id'));
	  }*/
	  //console.log(navContainerEl);
	  if(!_self.menu.getSelected()){
		  
	  }else if(_self.menu.getSelected().get('dynamicTab') && !navContainerEl.hasClass(CLS_CALLAPSE)){
		  navContainerEl.toggleClass(CLS_CALLAPSE);
	  }else if(!_self.menu.getSelected().get('dynamicTab') && navContainerEl.hasClass(CLS_CALLAPSE)){
		  navContainerEl.toggleClass(CLS_CALLAPSE);
	  }
	  //console.log(item);
	  if(top.topManager){
		  top.topManager._refleshMenuBar({id:item.get('id'),title:item.get('title')});
	  }
    });
	
    _self.tab = tab;
    _self.menu = menu;
    _self.homePage = homePage;
    tab.render();
    menu.render();
    //dump_obj(_self);
  }
 
   //动态创建一个菜单
   function createDynamicMenu(parentId,parentText,parentRender,tabConfig,moduleId){
	   //alert("createDynamicMenu");
	   var moduleId = moduleId || top.topManager._getCurrentModuleId();
	   var module = top.topManager._getModule(moduleId);
	   var render = parentRender+"_"+parentId+"_dynamic";
	   var menuContainerEl = $(render),
		slibEl = menuContainerEl.next('.' + CLS_LEFT_SLIB + '-con'),
		navContainerEl = menuContainerEl.parents('.'+CLS_TAB_ITEM);
	   //查询动态菜单配置项
	   var menuConfig = getDynamicMenuConfig(parentId,parentText,parentRender);
	   //初始化动态菜单
	   if(!$(render).length){
		   $(parentRender).addClass(CLS_HIDDEN);
		   temp =['<div class="dl-second-tree" id="',render.substring(1, render.length),'"></div><div class="', CLS_LEFT_SLIB, '-con"><div class="', CLS_LEFT_SLIB, '"></div>'].join('');		   
		   $(parentRender).after(temp);
	   }else{
		   //切换
		   changeMenu(parentRender);
		   if(menuConfig[0].items[0]){
				var item = menuConfig[0].items[0];
				module.tab.addTab({id: item.id, title: item.text, href: item.href,closeable : item.closeable},true);
			}
		   return;
	   } 
	   
	   var dynamicMenu = new Menu.SideMenu({render:render,items:menuConfig,height:getAutoHeight() - 5});
	   //dump_obj(dynamicMenu.__attrVals);
	
    if(slibEl){
      slibEl.on('click',function(){
        navContainerEl.toggleClass(CLS_CALLAPSE);
      });
      slibEl.parent().height(tabConfig.height);
    }
	
    //点击菜单，切换Tab，并刷新
    dynamicMenu.on('menuclick',function(ev){
      var item = ev.item;
	  //dump_obj(item);
      if(item){
        module.tab.addTab({id: item.get('id'), title: item.get('text'), href: item.get('href'),closeable : item.get('closeable')},true);
      }
      if(top.topManager){
		  top.topManager._refleshMenuBar(item);
	  }
    });

    //选中的菜单发生改变后，更新链接上的页面编号
    dynamicMenu.on('itemselected',function(ev){   
      var item = ev.item; 
      if(item){
        setNavPosition(moduleId,item.get('id'));
      }    
      
    });
	
	//交换对象
	module.dynamicMenu = module.menu;
	module.menu = dynamicMenu;
	
	dynamicMenu.render();
	//dump_obj(module);
	
	if(menuConfig[0].items[0]){
		var item = menuConfig[0].items[0];
		module.tab.addTab({id: item.id, title: item.text, href: item.href,closeable : item.closeable},true);
	}
   }
   
   //隐藏动态菜单，显示主菜单
   function changeMenu(render){
	   var menuContainerEl = $(render);
	   var moduleId = top.topManager._getCurrentModuleId();
	   var module = top.topManager._getModule(moduleId);
	   //动态菜单和主菜单相互切换
	   //try{
		  if(menuContainerEl.hasClass(CLS_HIDDEN)){
			  menuContainerEl.removeClass(CLS_HIDDEN);
			  $('div[id^='+render.substring(1,render.length)+'][id$="_dynamic"]').addClass(CLS_HIDDEN);
			  var temp = module.dynamicMenu;
			  module.dynamicMenu = module.menu;
			  module.menu = temp;
			  
		  }else if($('div[id^='+render.substring(1,render.length)+'][id$="_dynamic"]').hasClass(CLS_HIDDEN)){
			  $('div[id^='+render.substring(1,render.length)+'][id$="_dynamic"]').removeClass(CLS_HIDDEN);
			  menuContainerEl.addClass(CLS_HIDDEN);
			  var temp = module.dynamicMenu;
			  module.dynamicMenu = module.menu;
			  module.menu = temp;
		  }
		  //}catch(e){alert(e.message);}
   }
   
   
  //更改地址栏连接
  function setNavPosition(moduleId,pageId){
    pageId = pageId||'';
    var str = '#'+moduleId;
      
    if(pageId){
      str += '/'+pageId;
    }
    location.hash =str;
  }

  function getNavPositionSetting(){
    var pos = location.hash,
      moduleIndex = 0,
      pageId ='',
      splitIndex = pos.indexOf('/'),
      search = null;
    if(!pos){
      return null;
    }
      
    if(splitIndex >= 0){
      moduleIndex = pos.substring(1,splitIndex);
      pageId = pos.substring(splitIndex + 1);
      search = getParam(pageId);
      if(search){
        pageId = pageId.replace('?'+search,'');
      }
    }else{
      moduleIndex=pos.substring(1);
    }

    return {moduleId : moduleIndex,pageId : pageId,search : search};
  }

  function getParam(pageId){
    var index = pageId.indexOf('?');
    if(index >= 0){
      return pageId.substring(index + 1);
    }
    return null;
  }

  //清理权限系统带来的 “,“引起的Bug
  function initModuleConfig(mconfig){
    if(!$.isArray(mconfig)){
      return;
    }
    var emptyIndex = findEmptyIndex(mconfig);
    while(emptyIndex !== -1){
      mconfig.splice(emptyIndex,1);
      emptyIndex = findEmptyIndex(mconfig);
    }
    return mconfig;
  }

  //查找为空的纪录
  function findEmptyIndex(array){
      var result = -1;
      $.each(array,function(index,item){
        if(item === null || item === undefined){
          result = index;
          return false;
        }
      });
      return result;
    }

  //获取用户工作区域
  function getAutoHeight(){
    var height = BUI.viewportHeight(),
      //subHeight = 80;
	  subHeight = $(".dl-main-nav").height();
    if(height == 0){
      height = document.body.clientHeight;
    }
    //alert("getAutoHeight: " + height);
    return height - subHeight;  
  }

  function findItem(element){
    var el = $(element);
    if (el.hasClass(CLS_ITEM)) {
      return element;
    }
    return el.parent('.' + CLS_ITEM)[0];
  }

  var mainPage = function(config){
     initModuleConfig(config);
	   mainPage.superclass.constructor.call(this,config);
	   this._init();
     setTopManager(this);
 
      
  };

  mainPage.ATTRS = {
    /**
     * 当前模块的索引
     * @type {Number}
     */
    currentModelIndex:{

    },
    hideItmes : {
      value : []
    },
    //隐藏导航项列表
    hideList : {

    },
    /**
     * 模块集合
     * @type {Array}
     */
    modules : {
      value : []
    },
    /**
     * 模块的配置项
     * @type {Array}
     */
    modulesConfig: {

    },
    /**
     * 一级导航的容器
     * @type {jQuery}
     */
    navList : {
      valueFn : function () {
        return $('#J_Nav');// body...
      }
    },
    /**
     * 导航内容的容器
     * @type {jQuery}
     */
    navContent : {
      valueFn : function () {
        return $('#J_NavContent');
      }
    },
    /**
     * 导航项
     * @type {jQuery}
     */
    navItems : {
      valueFn : function () {
        return $('#J_Nav').children('.' + CLS_ITEM);// body...
      }
    },
    navTabs:{
      valueFn : function(){
        return this.get('navContent').children('.'+CLS_TAB_ITEM)
      }
    },
    /**
     * 页面的后缀
     * @type {Object}
     */
    urlSuffix : {
      value : '.html'
    }
  };

  BUI.extend(mainPage,BUI.Base);

  BUI.augment(mainPage,{
    //打开页面
    openPage : function(pageInfo){
      var _self = this,
        moduleId = pageInfo.moduleId || _self._getCurrentModuleId(),
        id = pageInfo.id,
        title = pageInfo.title ||'新的标签页',
        href = pageInfo.href,
        isClose = pageInfo.isClose,
        closeable = pageInfo.closeable,
        reload = pageInfo.reload,
        search = pageInfo.search;

      var module = _self._getModule(moduleId);
      if(module){
        var tab = module.tab,
          menu = module.menu,
          menuItem = menu.getItem(id),
          curTabPage = tab.getActivedItem(),
          sourceId = curTabPage ? curTabPage.get('id') : null,
          moduleIndex = _self._getModuleIndex(moduleId);
        if(moduleId != _self._getCurrentModuleId()){
            _self._setModuleSelected(moduleIndex);
        }
		
        if(menuItem){
			//如果是动态菜单，则要创建动态菜单
          //alert(menuItem.get("dynamic"));
		  if(menuItem.get("dynamicTab")){
			  var menuContainerEl = $('#J_'+moduleId+'Tab'),
				navContainerEl = menuContainerEl.parents('.'+CLS_TAB_ITEM);
			//alert(navContainerEl.hasClass(CLS_CALLAPSE));
			if(!navContainerEl.hasClass(CLS_CALLAPSE))
				navContainerEl.toggleClass(CLS_CALLAPSE);
			tab.addTab({id: menuItem.get('id'), title: menuItem.get('text'), href: menuItem.get('href'),closeable : menuItem.get('closeable')},true);
		  } else if(menuItem.get("dynamic")) {
            //隐藏原来的菜单
            //menuContainerEl.addClass(CLS_HIDDEN);
            //打开动态菜单
              createDynamicMenu(id, menuItem.get("text"), "#J_"+moduleId+'Tree', {render:'',height:getAutoHeight() - 5});
          }else{
              _self._setPageSelected(moduleIndex,id,reload,search);
          }
			
        }else{
            tab.addTab({id: id, title: title, href: href, sourceId: sourceId,closeable: closeable},reload);
			_self._refleshMenuBar({id: id, title: title, href: href, sourceId: sourceId,closeable: closeable});
        }

		if(reload)
			_self.showFullMask();
        if(isClose){
          curTabPage.close();
        }
      }
    },
    //关闭页面
    closePage:function(id,moduleId){
      this.operatePage(moduleId,id,'close');
    },

    //注册监听tag关闭事件， 默认监听当前tag页
    regClosedEvent : function(fn, args){
      var _self = this,
          agrsLength = arguments.length,
          callback = agrsLength>0?arguments[0]:null,
          moduleId = _self._getCurrentModuleId(),
          module = _self._getModule(moduleId),
          tab = module.tab,
          curTabPage = tab.getActivedItem();
      
      curTabPage.on('closed', function(){
        callback.apply(args);
      });

    },

    //关闭当前页面同时打开另一个页面
    closeNopenPage:function(config){
      var _self = this,
          moduleId = _self._getCurrentModuleId(),
          module = _self._getModule(moduleId),
          tab = module.tab,
              curTabPage = tab.getActivedItem();

      curTabPage.on('closed', function(){
        //alert("closed");
        _self.openPage(config);
      });
      curTabPage.close();
    },
      //关闭当前页面同时刷新另一个页面
      closeaAndReloadPage:function(config){
          debugger;
          var _self = this,
              moduleId = _self._getCurrentModuleId(),
              module = _self._getModule(moduleId),
              tab = module.tab,
              curTabPage = tab.getActivedItem();

          curTabPage.on('closed', function(){
              //alert("closed");
              _self.openPage({
                  id: "newPage" + Math.random(),
                  href: config.href,
                  title: config.title,
                  search: config.search,
                  reload: config.reload ? config.reload : false
              });
              _self.operatePage(moduleId, config.id, 'reload');
          });
          curTabPage.close();
      },
    //刷新
    reloadPage : function(id,moduleId){
      this.operatePage(moduleId,id,'reload');
    },
    //更改标题
    setPageTitle : function(title,id,moduleId){
      this.operatePage(moduleId,id,'setTitle',[title]);
    },
    //操作页面
    operatePage : function(moduleId,id,action,args){

      moduleId = moduleId || this._getCurrentModuleId();
      args = args || [];
      var _self = this,
        module = _self._getModule(moduleId);
      if(module){
         var tab = module.tab,
          item = id ? tab.getItemById(id) : tab.getActivedItem();
        if(item && item[action]){
          item[action].apply(item,args);
        }
      }
    },
	
	showFullMask : function(){
	  var el = ".dl-tab-item:not(.ks-hidden) > div > div > div .tab-content:not(div[style='display: none;'])";
	  fullMask = new Mask.LoadMask({
        el : el,
        msg : '请稍候 ....'
      });
	  fullMask.show();
	  
	  $(el + " > iframe").on("load",function(){
		  fullMask.hide();
		  
	  });
	},

    showPartMask : function(el){
      if(!el){
        el = ".dl-tab-item:not(.ks-hidden) > div > div > div .tab-content:not(div[style='display: none;'])";
      }
      fullMask = new Mask.LoadMask({
        el : el,
        msg : '请稍候 ....'
      });
      fullMask.show();

      $(el + " > iframe").on("load",function(){
        fullMask.hide();

      });
    },
  
	hideFullMask : function (){
	  fullMask.hide();
	},
	
	
	
    //创建模块
    _createModule:function(id){
      var _self = this,
        item= _self._getModuleConfig(id),
        modules = _self.get('modules');
      if(!item){
          return null;
      }
      var id =item.id,
      tabId = '#J_'+id+'Tab',
      treeId = '#J_'+id+'Tree';
      module = new tabNav(id,{render:tabId,height:getAutoHeight() - 5},{render:treeId,items:item.menu,height:getAutoHeight() - 5},item.collapsed,item.homePage);
      modules[id]= module;
      return module;
    },
    //隐藏列表
    _hideHideList :function(){
      this.get('hideList').hide();
    },
    _init : function(){
      var _self = this;
      _self._initDom();
      _self._initNavItems();
      _self._initEvent();
	  //dump_obj(_self.get("modulesConfig"));
	  //alert(JSON.stringify(_self.get("modulesConfig")));
    },
    //进行自适应计算
    _initNavItems : function(){

      var _self = this,
        navItems = _self.get('navItems'),
        hideItmes = _self.get('hideItmes');
      //如果不存在导航项，不用进行自适应计算
      if(navItems.length === 0)
      {
        return;
      }
      
      $('<div class="nav-item-mask"></div>').appendTo($(navItems));

      var count =  navItems.length,
        clientWidth = BUI.viewportWidth(),//获取窗口宽度,bengo: marked, 此处应减去logo和登录信息的宽度
        itemWidth = WIDTH_ITERM,
        totalWidth = itemWidth * count,
        showCount = 0;

      //如果导航项总宽度小于用户可视区域，不用进行自适应计算
      if(totalWidth <= clientWidth){
        return;
      }
      
      //初始化dataIndex
      $.each(navItems,function(index,item){
        $(item).attr(ATTTR_INDEX,index);
        $(item).removeClass(CLS_LAST);

      });

      showCount = parseInt(clientWidth / itemWidth);
      var lastShowItem = navItems[showCount - 1];
      _self._setLastItem(lastShowItem);

      hideItmes.push($(lastShowItem).clone()[0]);
      for(var i = showCount; i < count; i++){
        var itemEl = $(navItems[i]),
          cloneItme = null;
        
        cloneItme = itemEl.clone()[0];
        hideItmes.push(cloneItme);
        itemEl.addClass(CLS_HIDDEN);

      }

      _self._initHideList();
      
    },
    _initHideList : function(){
      var _self = this,
        hideList = _self.get('hideList'),
        hideItmes = _self.get('hideItmes');

      if(hideList){
        return;
      }
      
      var template = '<ul class="dl-hide-list ks-hidden"></ul>',
        hideListEl = $(template).appendTo('body');
      hideList = hideListEl;
      $.each(hideItmes,function(index,item){
        $(item).appendTo(hideList);
      });
      _self.set('hideList',hideList);
      _self._initHideListEvent();
    },
    _initHideListEvent:function(){
      var _self = this,
        hideList = _self.get('hideList');

      if(hideList == null){
        return;
      }
        
      hideList.on('mouseleave',function(){
        _self._hideHideList();
      });

      hideList.on('click',function(event){
        var item = findItem(event.target),
          el = null,
          dataIndex = 0;
        if(item){
          el = $(item);
          dataIndex = el.attr(ATTTR_INDEX);
          _self._setModuleSelected(dataIndex);
          _self._hideHideList();
        }
      });
    },
    _initContents : function () {
      var _self = this,
        modulesConfig = _self.get('modulesConfig'),
        navContent = _self.get('navContent');
		
      //清空模块容器
      navContent.children().remove();

      //初始化二级菜单一级Tab
      $.each(modulesConfig,function(index,module){
        var id = module.id,
          temp =['<li class="dl-tab-item ks-hidden"><div class="dl-second-nav" id="dl_',id,'"><div class="dl-second-tree" id="J_',id,'Tree"></div><div class="', CLS_LEFT_SLIB, '-con"><div class="', CLS_LEFT_SLIB, '"></div></div></div><div class="dl-inner-tab" id="J_',id,'Tab"></div></li>'].join('');
        new $(temp).appendTo(navContent);
      });
    },
    _initDom : function(){
      var _self = this;

      _self._initContents();
      _self._initLocation();

    },
    _initEvent : function(){
      var _self = this,
        navItems = _self.get('navItems');
      navItems.each(function(index,item){
        var item = $(item);
        item.on('click',function(){
		 
          var sender =$(this);
		  //alert(sender);
          if(sender.hasClass(CLS_SELECTE)){
            return;
          }
          //sender.addClass(CLS_SELECTE);
          _self._setModuleSelected(index,sender);
		  _self._refleshMenuBar();
        }).on('mouseenter',function(){

          $(this).addClass(CLS_HOVER);
        }).on('mouseleave',function(){
          $(this).removeClass(CLS_HOVER);
        });
      });
      _self._initNavListEvent();
    },
    _initNavListEvent : function(){
      var _self = this,
        hideList = _self.get('hideList'),
        navList = _self.get('navList');

      navList.on('mouseover',function(event){
        var item = findItem(event.target),
          el = $(item),
          offset = null;

        if(el && el.hasClass(CLS_LAST) && hideList){
          offset = el.offset();
          offset.top += 37;
                  
          offset.left += 2;
          _self._showHideList(offset);
        }
      }).on('mouseout',function(event){
        var toElement = event.toElement;
        if(toElement && hideList && !$.contains(hideList[0],toElement) && toElement !== hideList[0]){
          _self._hideHideList();
        }
        
      });
    },
    //初始化选中的模块和页面
    _initLocation :function (){
      //从链接中获取用户定位到的模块，便于刷新和转到指定模块使用
      var _self = this,
        defaultSetting = getNavPositionSetting();
      if(defaultSetting){
        var pageId = defaultSetting.pageId,   //页面编号
          search = defaultSetting.search,
          index = _self._getModuleIndex(defaultSetting.moduleId);   //附加参数

        _self._setModuleSelected(index);
        _self._setPageSelected(index,pageId,true,search);
		//_self._refleshMenuBar();
      }else{
        var currentModelIndex = _self.get('currentModelIndex'),
          moduleId = _self._getModuleId(currentModelIndex);
        if(currentModelIndex == null){
          _self._setModuleSelected(0);
        }else{
          setNavPosition(moduleId);
        }
      }
    },
    //获取模块,如果未初始化则初始化模块
    _getModule : function(id){
      var _self = this,
        module = _self.get('modules')[id];
      if(!module){
          module = _self._createModule(id);
      }
      return module;
    },
    _getModuleIndex : function(id){
      var _self = this,
        result = 0;

      $.each(_self.get('modulesConfig'),function(index,conf){
        if(conf.id === id){
          result = index;
          return false;
        }
      });
      return result;
    },
    _getModuleConfig : function(id){
      var _self = this,
         result =null;
      $.each(_self.get('modulesConfig'),function(index,conf){
        if(conf.id === id){
          result = conf;
          return false;
        }
      });
      return result;
    },
    //获取模块编号
    _getModuleId : function(index){

      var modulesConfig = this.get('modulesConfig');
      if(modulesConfig[index]){
        return modulesConfig[index].id;
      }else{
        return index;
      }
    },
    _getCurrentPageId : function(){
      var _self = this,
        moduleId = _self._getCurrentModuleId(),
        module = _self._getModule(moduleId),
        pageId ='';
      if(module){
        var item = module.menu.getSelected();
        if(item){
          pageId = item.get('id');
        }
      }
      return pageId;
    },
    _getCurrentModuleId : function(){
      return this._getModuleId(this.get('currentModelIndex'));
    },
    //模块是否已经初始化
    _isModuleInitial : function(id){
      return !!this.get('modules')[id];
    },
    //设置最后一个
    _setLastItem : function(item){
      var _self = this,
        lastShowItem = _self.get('lastShowItem');

      if(lastShowItem === item){
        return;
      }
      
      var appendNode = null,
        lastShowItemEl = $(lastShowItem);
        itemEl = $(item);
      if(lastShowItem){
        appendNode = lastShowItemEl.find('.'+CLS_HIDE_CURRENT);
        lastShowItemEl.removeClass(CLS_LAST);
        lastShowItemEl.addClass(CLS_HIDDEN);
      }
      itemEl.addClass(CLS_LAST);
      itemEl.removeClass(CLS_HIDDEN);
      if(!appendNode){
        appendNode = $('<span class="icon icon-white  icon-caret-down '+CLS_HIDE_CURRENT+'">&nbsp;&nbsp;</span>');
      }
      appendNode.appendTo(itemEl.children('.nav-item-inner'));
      _self.set('lastShowItem',item)
    },
    //设置选中的模块
    _setModuleSelected : function(index,sender){
      var _self = this,
        navItems = _self.get('navItems'),
        navTabs = _self.get('navTabs'),
        currentModelIndex = _self.get('currentModelIndex');

      if(currentModelIndex !==index){
        var moduleId = _self._getModuleId(index),
          module = null,
          lastShowItem = _self.get('lastShowItem'),
          isCreated = true;//模块是否已经创建
                    
        if(!_self._isModuleInitial(moduleId)){
          isCreated = false;
        }

        module =  _self._getModule(moduleId);


        sender = sender ||$(_self.get('navItems')[index]); 
        //如果模块隐藏
        if(sender.hasClass(CLS_HIDDEN) && lastShowItem){
          _self._setLastItem(sender[0]);
          _self._setSelectHideItem(index);
        }/**/
        navItems.removeClass(CLS_SELECTE);
        sender.addClass(CLS_SELECTE);
        navTabs.addClass(CLS_HIDDEN);
        $(navTabs[index]).removeClass(CLS_HIDDEN);
      
        currentModelIndex = index;
        _self.set('currentModelIndex',currentModelIndex);
        curPageId = _self._getCurrentPageId();
        setNavPosition(moduleId,curPageId);
                
        if(!curPageId && module.homePage){
            _self._setPageSelected(index,module.homePage);
        }else if(module.homePage){
          _self.reloadPage(module.homePage, moduleId);
        }
      }
    },
	_returnModuleSelected : function(moduleId,sender){
		
      var _self = this,
        navItems = _self.get('navItems'),
        navTabs = _self.get('navTabs'),
        currentModelIndex = _self.get('currentModelIndex');

        var lastShowItem = _self.get('lastShowItem'),
          isCreated = true;//模块是否已经创建
                    
        if(!_self._isModuleInitial(moduleId)){
          isCreated = false;
        }

        module =  _self._getModule(moduleId);


        sender = sender ||$(_self.get('navItems')[currentModelIndex]); 
        //如果模块隐藏
        if(sender.hasClass(CLS_HIDDEN) && lastShowItem){
          _self._setLastItem(sender[0]);
          _self._setSelectHideItem(currentModelIndex);
        }/**/
        navItems.removeClass(CLS_SELECTE);
        sender.addClass(CLS_SELECTE);
        navTabs.addClass(CLS_HIDDEN);
        $(navTabs[currentModelIndex]).removeClass(CLS_HIDDEN);
      
        _self.set('currentModelIndex',currentModelIndex);
        //curPageId = _self._getCurrentPageId();
		if(_self._isDynamicMenuShow()){
			changeMenu("#J_" + moduleId + "Tree");
		}
        var firstPage = module.menu.get("items")[0].items[0].id;
        //alert(module.homePage);   
        if(module.homePage || firstPage){
            _self._setPageSelected(currentModelIndex,module.homePage?firstPage:module.homePage);
			
			curPageId = _self._getCurrentPageId();
			setNavPosition(moduleId,curPageId);
        }
		
    },
	
	_isDynamicMenuShow : function(){
		
		var _self = this;
		
	   var moduleId = _self._getCurrentModuleId();
	   var module = _self._getModule(moduleId);
	   var render = "#J_" + moduleId + "Tree";
	   var menuContainerEl = $(render);
	   //动态菜单和主菜单相互切换
	   //try{
		if(menuContainerEl.hasClass(CLS_HIDDEN)){
			return true;
		}else{
			return false;
		}
	},
	
    _setPageSelected:function(moduleIndex,pageId,isReload,search){
      var _self = this,
        moduleId = _self._getModuleId(moduleIndex)||moduleIndex,
        module = _self._getModule(moduleId);
	
      if(module && pageId){
        module.menu.setSelectedByField(pageId);
        var item = module.menu.getSelected(),
          tab = module.tab,
          href = '',
          suffixIndex = -1;
		
        if(item && item.get('id') === pageId){
          href = item.get('href');
          href = search ? (addSearch(href,search)) : href;
		  
          module.tab.addTab({id: item.get('id'), title: item.get('text'),closeable : item.get('closeable'), href: href},!!isReload);

        }else if(pageId){

          var subDir = pageId.replace('-','/');
          if(subDir.indexOf('/') === -1){
            subDir = moduleId + '/' + subDir;
          }
          /*if((suffixIndex = pageId.indexOf('.')) === -1){
            subDir += _self.get('urlSuffix');
          }*/
          href = search ? (subDir + '?' + search) : subDir;
          tab.addTab({id:pageId,title:'',href:href},!!isReload);
        }
		if(isReload){
			_self.showFullMask();
		}
		
		//_self._refleshMenuBar();
      }
	  _self._refleshMenuBar();
    },
    _showHideList:function(offset){
      var _self = this,
        hideList = _self.get('hideList');

      hideList.css('left',offset.left);
      hideList.css('top',offset.top);
      hideList.show();
    },
    _setSelectHideItem : function (index) {
      var _self = this,
        hideList = _self.get('hideList'),
        hideItmes = _self.get('hideItmes'),
        currentItem = null,
        selectItem = null,
        selectEl = null,
        appendNode = null;
      BUI.each(hideItmes,function(item){
        var itemEl = $(item);
        if(itemEl.attr(ATTTR_INDEX) == index){
          selectItem = item;
        }

        if(itemEl.hasClass(CLS_LAST)){
          currentItem = item;
        }
      });

      if(currentItem !== selectItem){
        if(currentItem){
          appendNode = $(currentItem).find('.dl-hide-current');
          $(currentItem).removeClass(CLS_LAST);
        }
        $(selectItem).addClass(CLS_LAST);
        if(!appendNode){
          appendNode = new Node('<span class="dl-hide-current">&nbsp;&nbsp;</span>');
        }
        selectEl = $(selectItem);
        appendNode.appendTo(selectEl.children('.nav-item-inner'));
        selectEl.prependTo(hideList);
      }

    },
	
	_getParentMenu:function(pageId){
	  var menuItem = null;
	  var _self = this;
	  var moduleId = _self._getCurrentModuleId();
	  var module = _self._getModule(moduleId);

	  for(var i = 0; (i < module.menu.get("items").length) && !menuItem; i++){
		  //dump_obj(module.menu.get("items")[i]);
		  for(var j = 0; j <  module.menu.get("items")[i].items.length; j++){
			  if(module.menu.get("items")[i].items[j].id == pageId){
				  menuItem = module.menu.get("items")[i].text;
				  menuItemId = "item_" + i
				  break;
			  }
		  }
		  
	  } 
	  return [menuItem , menuItemId];
  },
    
	_getModuleText : function(){
      var _self = this,
        navItems = _self.get('navItems');
	  var moduleText;
      //alert(navItems.length);
      navItems.each(function(index,item){
        var item = $(item);
		var sender =$(this);
		//dump_obj(sender.context);
        if(sender.hasClass(CLS_SELECTE)){
            moduleText = sender.context.innerText;
			return;
        }
        
      });
	  return moduleText;
    },
	
	_refleshMenuBar : function(newPage){
		var _self = this,
		moduleId = _self._getCurrentModuleId(),
		module = _self._getModule(moduleId),
		moduleText = _self._getModuleText(),
		item = module.menu.getSelected();
		//console.log(newPage);
	   if(!item && newPage){
		    var pageId = newPage.id,
			//parentInfo = _self._getParentMenu(pageId),
			pageText = newPage.title;
	   }else if(item){
		   var pageId = item.get("id"),
			parentInfo = _self._getParentMenu(pageId),
			pageText = item.get("text");
	   }



		//清空
		$(".menu-nav-bar > span").remove();

        //等module加载完再load
        if(!moduleId){
          return;
        }
		
		//var temp = "<span id='~id~'><a href='javascript:returnPage("+"\""+moduleId+"\""+");'>~text~ </a></span>";
		var temp = "<span id='~id~'><a href='javascript:void();'>~text~ </a></span>";
		var tempSep = "<span> > </span>";
		
		if(moduleText){
			var tempModule = "<span id='"+moduleId+"'><a href='javascript:returnPage("+"\""+moduleId+"\""+");'>"+moduleText+" </a></span>";
			$(".menu-nav-bar").append(tempModule);
			$(".menu-nav-bar").append(tempSep);
		}
		
		//非动态菜单情况下不显示二级菜单
		if(_self._isDynamicMenuShow()){
			if(parentInfo){
				$(".menu-nav-bar").append(temp.replace("~id~",parentInfo[1]).replace("~text~",parentInfo[0]));
				$(".menu-nav-bar").append(tempSep);
			}
		}
		if(pageText){
			$(".menu-nav-bar").append(temp.replace("~id~",pageId).replace("~text~",pageText));
		}
		
	}
	
	   
  });
  
  
  
  
  PageUtil.MainPage = mainPage;

  return mainPage;
});