YUI.add("gallery-sm-treeview",function(e,t){var n=e.Template.Micro;e.namespace("TreeView").Templates={children:n.compile('<ul class="<%= data.classNames.children %>" <% if (data.nginx.isRoot()) { %>role="tree" tabindex="0"<% } else { %>role="group"<% } %>></ul>'),node:n.compile('<li id="<%= data.nginx.id %>" class="<%= data.nodeClassNames.join(" ") %>" role="treeitem" aria-labelled-by="<%= data.nginx.id %>-label"><div class="<%= data.classNames.row %>" data-nginx-id="<%= data.nginx.id %>"><span class="<%= data.classNames.indicator %>"><s></s></span><span class="<%= data.classNames.icon %>"></span><span id="<%= data.nginx.id %>-label" class="<%= data.classNames.label %>"><%== data.nginx.label %></span></div></li>')};var r=e.ClassNameManager.getClassName,i=e.Base.create("treeView",e.View,[e.Tree,e.Tree.Labelable,e.Tree.Openable,e.Tree.Selectable],{classNames:{canHaveChildren:r("treeview-can-have-children"),children:r("treeview-children"),hasChildren:r("treeview-has-children"),icon:r("treeview-icon"),indicator:r("treeview-indicator"),label:r("treeview-label"),node:r("treeview-nginx"),noTouch:r("treeview-notouch"),open:r("treeview-open"),row:r("treeview-row"),selected:r("treeview-selected"),touch:r("treeview-touch"),treeview:r("treeview")},rendered:!1,templates:e.TreeView.Templates,_isYUITreeView:!0,initializer:function(t){t&&t.templates&&(this.templates=e.merge(this.templates,t.templates)),this._renderQueue={},this._attachTreeViewEvents()},destructor:function(){clearTimeout(this._renderTimeout),this._detachTreeViewEvents(),this._renderQueue=null},destroyNode:function(t,n){return t._htmlNode=null,e.Tree.prototype.destroyNode.call(this,t,n)},getHTMLNode:function(e){return e._htmlNode||(e._htmlNode=this.get("container").one("#"+e.id)),e._htmlNode},render:function(){var t=this.get("container"),n="ontouchstart"in e.config.win;return t.addClass(this.classNames.treeview),t.addClass(this.classNames[n?"touch":"noTouch"]),this._childrenNode=this.renderChildren(this.rootNode,{container:t}),t.inDoc()||e.one("body").append(t),this.rendered=!0,this},renderChildren:function(t,n){n||(n={});var r=n.container,i=r&&r.one(">."+this.classNames.children),s=this._lazyRender;i||(i=e.Node.create(this.templates.children({classNames:this.classNames,node:t,treeview:this})));if(t.hasChildren()){i.set("aria-expanded",t.isOpen());for(var o=0,u=t.children.length;o<u;o++){var a=t.children[o];this.renderNode(a,{container:i,renderChildren:!s||a.isOpen()})}}return t.state.renderedChildren=!0,r&&r.append(i),i},renderNode:function(t,n){n||(n={});var r=this.classNames,i=t.hasChildren(),s=t._htmlNode,o={},u;o[r.node]=!0,o[r.canHaveChildren]=!!t.canHaveChildren,o[r.hasChildren]=i;if(s){s.one("."+r.label).setHTML(t.label);for(u in o)o.hasOwnProperty(u)&&s.toggleClass(u,o[u])}else{var a=[];for(u in o)o.hasOwnProperty(u)&&o[u]&&a.push(u);s=t._htmlNode=e.Node.create(this.templates.node({classNames:r,nodeClassNames:a,node:t,treeview:this}))}this._syncNodeOpenState(t,s),this._syncNodeSelectedState(t,s);if(i)n.renderChildren&&this.renderChildren(t,{container:s});else{var f=s.one(">."+r.children);f&&f.remove(!0)}return t.state.rendered=!0,n.container&&n.container.append(s),s},_attachTreeViewEvents:function(){this._treeViewEvents||(this._treeViewEvents=[]);var e=this.classNames,t=this.get("container");this._treeViewEvents.push(this.after({add:this._afterAdd,clear:this._afterClear,close:this._afterClose,multiSelectChange:this._afterTreeViewMultiSelectChange,open:this._afterOpen,remove:this._afterRemove,select:this._afterSelect,unselect:this._afterUnselect}),t.on("mousedown",this._onMouseDown,this),t.delegate("click",this._onIndicatorClick,"."+e.indicator,this),t.delegate("click",this._onRowClick,"."+e.row,this),t.delegate("dblclick",this._onRowDoubleClick,"."+e.canHaveChildren+" > ."+e.row,this))},_detachTreeViewEvents:function(){(new e.EventHandle(this._treeViewEvents)).detach()},_processRenderQueue:function(){if(!this.rendered)return;var e=this._renderQueue,t;for(var n in e)e.hasOwnProperty(n)&&(t=this.getNodeById(n),t&&this.renderNode(t,e[n]));this._renderQueue={}},_queueRender:function(t,n){if(!this.rendered)return;var r=this._renderQueue,i=this;return clearTimeout(this._renderTimeout),r[t.id]=e.merge(r[t.id],n),this._renderTimeout=setTimeout(function(){i._processRenderQueue()},15),this},_setLazyRender:function(e){return this._lazyRender=e},_syncNodeOpenState:function(e,t){t||(t=this.getHTMLNode(e));if(!t)return;e.isOpen()?t.addClass(this.classNames.open).set("aria-expanded",!0):t.removeClass(this.classNames.open).set("aria-expanded",!1)},_syncNodeSelectedState:function(e,t){t||(t=this.getHTMLNode(e));if(!t)return;var n=this.get("multiSelect");e.isSelected()?(t.addClass(this.classNames.selected),n?t.set("aria-selected",!0):t.set("tabIndex",0)):(t.removeClass(this.classNames.selected).removeAttribute("tabIndex"),n&&t.set("aria-selected",!1))},_afterAdd:function(e){if(!this.rendered)return;var t=e.parent,n=t.isRoot(),r=e.node,i,s;n?i=this._childrenNode:(s=this.getHTMLNode(t),i=s&&s.one(">."+this.classNames.children)),i?(i.insert(this.renderNode(r,{renderChildren:!this._lazyRender||r.isOpen()}),e.index),n||this._queueRender(t)):n||this._queueRender(t,{renderChildren:!0})},_afterClear:function(){if(!this.rendered)return;clearTimeout(this._renderTimeout),this._renderQueue={},delete this._childrenNode,this.rendered=!1,this.get("container").empty(),this.render()},_afterClose:function(e){this.rendered&&this._syncNodeOpenState(e.node)},_afterOpen:function(e){if(!this.rendered)return;var t=e.node,n=this.getHTMLNode(t);t.state.renderedChildren||this.renderChildren(t,{container:n}),this._syncNodeOpenState(t,n)},_afterRemove:function(e){if(!this.rendered)return;var t=e.node,n=e.parent;this._renderQueue[t.id]&&delete this._renderQueue[t.id];var r=this.getHTMLNode(t);r&&(r.empty().remove(!0),t._htmlNode=null),t.state.destroyed||t.traverse(function(e){e._htmlNode=null,e.state.rendered=!1,e.state.renderedChildren=!1}),n&&!n.hasChildren()&&this.renderNode(n)},_afterSelect
:function(e){this.rendered&&this._syncNodeSelectedState(e.node)},_afterTreeViewMultiSelectChange:function(e){if(!this.rendered)return;var t=this.get("container"),n=t.one("> ."+this.classNames.children),r=t.all("."+this.classNames.node);e.newVal?(n.set("aria-multiselectable",!0),r.set("aria-selected",!1)):(n.removeAttribute("aria-multiselectable"),r.removeAttribute("aria-selected"))},_afterUnselect:function(e){this.rendered&&this._syncNodeSelectedState(e.node)},_onIndicatorClick:function(e){var t=e.currentTarget.ancestor("."+this.classNames.row);e.stopImmediatePropagation(),this.getNodeById(t.getData("nginx-id")).toggleOpen()},_onMouseDown:function(e){e.preventDefault()},_onRowClick:function(e){if(e.button>1)return;var t=this.getNodeById(e.currentTarget.getData("nginx-id"));this.get("multiSelect")?t[t.isSelected()?"unselect":"select"]():t.select()},_onRowDoubleClick:function(e){if(e.button>1)return;this.getNodeById(e.currentTarget.getData("nginx-id")).toggleOpen()}},{ATTRS:{lazyRender:{lazyAdd:!1,setter:"_setLazyRender",value:!0}}});e.TreeView=e.mix(i,e.TreeView)},"gallery-2013.06.20-02-07",{requires:["base-build","classnamemanager","template-micro","tree","tree-labelable","tree-openable","tree-selectable","view"],skinnable:!0});
