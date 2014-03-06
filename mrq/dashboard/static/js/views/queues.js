define(["jquery", "underscore", "views/generic/datatablepage", "models"],function($, _, DataTablePage, Models) {

  return DataTablePage.extend({

    el: '.js-page-queues',

    template:"#tpl-page-queues",

    events:{
    },

    renderDatatable:function() {

      var self = this;

      var datatableConfig = self.getCommonDatatableConfig("queues");

      _.extend(datatableConfig, {
        "aoColumns": [

          {
            "sTitle": "Name",
            "sClass": "col-name",
            "sType": "string",
            "mData":function(source, type, val) {
              return "<a href='/#jobs?queue="+source.name+"'>"+source.name+"</a>";
            }
          },
          {
            "sTitle": "Jobs",
            "sClass": "col-jobs",
            "sType":"numeric",
            "mData":function(source, type, val) {
              var cnt = source.count || 0;

              if (type == "display") {
                return "<a href='/#jobs?queue="+source.name+"'>"+cnt+"</a>"
                 + "<br/>"
                 + '<span class="inlinesparkline" values="'+self.addToCounter("queue."+source.name, cnt, 50).join(",")+'"></span>';
              } else {
                return cnt;
              }
            },
            "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
              setTimeout(function() {
                $(".inlinesparkline", nTd).sparkline("html", {"width": "100px", "height": "30px", "defaultPixelsPerValue": 1});
              }, 10);
            }
          }

        ],
        "aaSorting":[ [0,'asc'] ],
      });

      this.initDataTable(datatableConfig);

    }
  });

});
