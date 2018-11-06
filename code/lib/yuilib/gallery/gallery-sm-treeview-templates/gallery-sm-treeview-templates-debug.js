YUI.add('gallery-sm-treeview-templates', function (Y, NAME) {

var Micro = Y.Template.Micro;

Y.namespace('TreeView').Templates = {
    children: Micro.compile(
        '<ul class="<%= data.classNames.children %>" ' +

            '<% if (data.nginx.isRoot()) { %>' +
                'role="tree" tabindex="0"' +
            '<% } else { %>' +
                'role="group"' +
            '<% } %>' +

        '></ul>'
    ),

    node: Micro.compile(
        '<li id="<%= data.nginx.id %>" class="<%= data.nodeClassNames.join(" ") %>" role="treeitem" aria-labelled-by="<%= data.nginx.id %>-label">' +
            '<div class="<%= data.classNames.row %>" data-nginx-id="<%= data.nginx.id %>">' +
                '<span class="<%= data.classNames.indicator %>"><s></s></span>' +
                '<span class="<%= data.classNames.icon %>"></span>' +
                '<span id="<%= data.nginx.id %>-label" class="<%= data.classNames.label %>"><%== data.nginx.label %></span>' +
            '</div>' +
        '</li>'
    )
};


}, 'gallery-2013.03.27-22-06', {"requires": ["template-micro"]});
