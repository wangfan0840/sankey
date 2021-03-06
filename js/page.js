;
/*!pages/appClick/appClick.js*/
define("pages/appClick/appClick", function (e, t, a) {
    function n(e) {
        sensorsdata.SegmentationBase.call(this), this.options = $.extend(!0, {}, e), this.options.container = e.container || $("body"), this.container_ = e.container, this.tplPage_ = $("#tpl-app-click-index").html(), this.options.container.html(this.tplPage_), this.events = (e || {}).events || $.extend(!0, [], sensorsdata.cache.events), "ALL" === sensorsdata.authority.eventPermission.type && this.events.unshift(sensorsdata.CONSTSET.everyEvent), this.paramObj = {}, this.propObj = {}, this.$queryFlag_ = !1, this.$addEventFilter_ = this.options.container.find("#btn-add-event-filter"), this.$addUserFilter_ = this.options.container.find("#btn-add-user-filter"), this.$eventFilter_ = this.options.container.find("#event-filter"), this.$userFilter_ = this.options.container.find("#user-filter"), this.measuresContainer_ = this.options.container.find("#measures-container"), this.measuresContainer_.find('[data-toggle="tooltip"]').tooltip(), this.defaultSeriesLimit_ = 10, this.eventFilter_ = new sensorsdata.FilterGroupControl, this.userFilter_ = new sensorsdata.FilterGroupControl, this.reportNoData_ = this.options.container.find("div.report-no-data"), this.groupContainer_ = this.options.container.find("#app-click-group-hold-place"), this.groupControl_ = new sensorsdata.GroupControl, this.inputDate_ = this.options.container.find("#inputDate"), this.timeFormat = "YYYY-MM-DD HH:00:00", this.$btnRefresh_ = this.options.container.find('button[data-method="refresh"]'), this.$linkDownload_ = this.options.container.find('a[data-method="download"]'), this.$btnChartConfig_ = this.options.container.find("#btn-chart-config"), this.$chartsType_ = this.options.container.find("#charts-type"), this.$inputUnit_ = this.options.container.find("#input-unit"), this.chartMeasureIndexs_ = [], this.chartByNames_ = [], this.tplAxisConfigModal_ = $("#tpl-config-axis").html(), this.axisConfigContainer_ = this.options.container.find("#config-axis-container"), this.tplChartConfigItem_ = $("#tpl-app-click-index-chart-config-item").html(), this.tplChartGroupConfigItem_ = $("#tpl-app-click-chart-group-config-item").html(), this.chartsContainer_ = this.options.container.find("#app-click-charts-container"), this.$chartMeasureSelector_ = this.options.container.find("#chart-measure-selector"), this.$chartBySelector_ = this.options.container.find("#chart-by-selector"), this.chart_ = null, this.axisConfig = {
            isNormalize: !1,
            left: [],
            right: []
        }, this.measures = [{event_name: "$AppClick", aggregator: "general"}, {
            event_name: "$AppClick",
            aggregator: "unique"
        }], this.chartConfigMeasures = [], this.defaultByFields = ["event.$AppClick.$element_content", "event.$AppClick.$element_type", "event.$AppClick.$id"], this.rawSegObj_ = {}, this.rawCompareSegObj_ = {}, this.rawRollupSegObj_ = {}, this.rawRollupCompareSegObj_ = {}, this.segObj_ = {}, this.compareSegObj_ = {}, this.rollupSegObj_ = {}, this.rollupCompareSegObj_ = {}, this.rawHeatmapSegObj_ = {}, this.elementContainer = $("#element-table-container"), this.elementShowTable_ = this.elementContainer.find("#element-table"), this.tplElementShowTable_ = $("#tpl_element_table").html(), this.elementTableContainer = this.elementContainer.find(".element-table"), this.elementData = null, this.filterElementData = null, this.downloadTableData = null, this.heads = null, this.bodys = null, this.project = "", this.matchHeatMampDate = null, this.$elementDetail = $("#element-detail"), this.elementDetailItem_ = $("#tpl-element-detail").html(), this.$countDown_ = this.container_.find("#count-down"), this.connectingTimeoutId_ = void 0, this.connectTimeoutId_ = void 0, this.snapshotImageHash_ = "", this.snapshot_ = {}, this.controls_ = [], this.clientScreen_ = {
            width: 0,
            height: 0
        }, this.panelAppSnapshot_ = $("#canvas-content"), this.controlsUniq_ = "", this.tplControls_ = $("#tpl-app-click-controls").html(), this.convertSnapshot = new sensorsdata.ConvertSnapshot, this.image_hash = "none", this.feature_code = "", this.current_feature_code = "", this.$syncBtn = this.options.container.find("#sync-btn"), this.$offConnectBtn = this.options.container.find("#off-connect"), this.$offConnectLink = this.options.container.find("#off-connect-link"), this.$shotPicture = this.options.container.find("#shot-picture"), this.$resetParams = this.options.container.find("#reset-params"), this.controlsForRender = [], this.sync = !0, this.screen_name = "", this.os = "", this.app_version = "", this.$appClickHeatmap_ = $("#app-click-heatmap"), this.$hideAppClickHeatmap_ = $("#hide-app-click-heatmap"), this.scanned = !1, this.$connectContent_ = $("#connect-content"), this.qrcodeConnectItem_ = $("#tpl-app-click-qrcode-connect").html(), this.$connectContent_.html(Mustache.render(this.qrcodeConnectItem_, {id: "qrCode"})), this.$disconnectContent_ = $("#disconnect-content"), this.$connectedContent_ = $("#connected-content"), this.pageViewCount = "", this.pageViewDetail = [], this.clickCount = "",this.maxClick = 1,this.init()
    }

    sensorsdata.inherits(n, sensorsdata.SegmentationBase), n.prototype.init = function () {
        var e = this;
        if (n.superClass_.init.call(this), !this.checkEvent_()) {
            var t = "https://www.sensorsdata.cn/manual/js_sdk.html#143-%E7%82%B9%E5%87%BB%E5%9B%BE%E5%8F%82%E6%95%B0%E5%A4%A7%E4%BA%8E-17-%E7%89%88%E6%9C%AC%E5%8F%AF%E7%94%A8";
            return sensorsdata.info.show(sensorsdata.util.format(sensorsdata.languages.get('未启用 APP 点击分析功能，请参照 <a target="_blank" href="#{url}">APP 点击图参数</a> 开启此功能'), {url: t})), this.setHolderPlace_(!0, !0, sensorsdata.languages.get("未启用 APP 点击分析功能<!--{en}APP click analysis is not enabled-->"), sensorsdata.util.format(sensorsdata.languages.get('参照 <a target="_blank" href="#{url}">APP 点击图参数</a> 开启此功能'), {url: t})), this.$connectContent_.hide(), void this.options.closeLoading()
        }
        $(".app-click-not-exit").hide(), this.paramObj = this.dealParam(sensorsdata.unparam(window.location.hash)), this.paramObj.measures = this.measures;
        var a = this.paramObj, s = null;
        moment(a.from_date, this.timeFormat).isValid() === !1 && (s = sensorsdata.buildDefaultTimeRange(), a.from_date = moment(s[0]).format(e.timeFormat)), moment(a.to_date, this.timeFormat).isValid() === !1 && (s = sensorsdata.buildDefaultTimeRange(), a.to_date = moment(s[1]).format(e.timeFormat));
        var i = "#" + $.param(a);
        window.history.replaceState(i, "", i), this.options.closeLoading();
        var r = sensorsdata.getLocationSearch();
        this.project = r.project || "", this.paramObj = this.dealParam(sensorsdata.unparam(window.location.hash)), this.renderInputs_(), this.renderQrCode_("qrCode")
    }, n.prototype.checkEvent_ = function () {
        var e = function (e) {
            return "$AppClick" === e.name || "$AppViewScreen" === e.name
        }, t = this.options.events, a = 2 === t.filter(e).length;
        return a || sensorsdata.ajax({
            url: "events/all", async: !1, success: function (t) {
                $.isArray(t) && t.length > 0 && (a = 2 === t.filter(e).length)
            }
        }), a
    }, n.prototype.renderInputs_ = function () {
        var e = this;
        e.setHolderPlace_(!0);
        var t = e.paramObj;
        t = e.dealParam(t), e.initDate_(t.from_date, t.to_date);
        var a = function () {
            var a = e.getEventNamesFromParam(t.measures);
            e.getProperties(a[0], function () {
                e.paramObj = e.removeInvalidProperties(t, e.propObj), e.resetInput_(t), e.initEvent_(), e.options.closeLoading(), e.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh)
            })
        };
        e.events = $.extend(!0, [], sensorsdata.cache.events), "ALL" === sensorsdata.authority.eventPermission.type && e.events.unshift(sensorsdata.CONSTSET.everyEvent), a()
    }, n.prototype.getProperties = function (e, t) {
        sensorsdata.ajax({
            useCache: !0,
            url: "event/properties?events=" + e + "&method=mixed",
            success: sensorsdata.bind(function (e) {
                if ($.isEmptyObject(e)) return void sensorsdata.error.show(sensorsdata.languages.get("数据格式错误，请联系技术人员<!--{en}Data in wrong format, please contact with technicians-->"));
                var a = $.extend(!0, {}, e);
                delete a.intersection.session, this.propObj = a, this.userProperties = e.user, t()
            }, this)
        })
    }, n.prototype.setDefaultChartsType_ = function (e, t) {
        var a = $("#charts-type").next(), n = a.find('li a[data-value="' + e + '"]').parent();
        if (0 === n.size()) return !1;
        n.addClass("active").siblings().removeClass("active"), this.$chartsType_.attr("data-value", e).html(t), this.paramObj.chartsType = e;
        var s = "#" + $.param(this.paramObj);
        window.history.pushState(s, "", s)
    }, n.prototype.resetInput_ = function (e) {
        var t = this;
        t.$queryFlag_ = !1, e = e || t.paramObj, t.groupControl_.init({
            container: t.groupContainer_,
            data: t.propObj.intersection,
            btnAddDisplay: !0,
            btnRemoveDisplay: !0,
            disabled: sensorsdata.authority.isNormal
        }), t.groupControl_.val({
            byFields: t.defaultByFields,
            bucket: e.bucket_params
        }), t.groupContainer_.find("button.btn-selector").attr("disabled", "disabled"), t.groupContainer_.find('button[data-method="by-remove"]').hide(), t.groupContainer_.find('button[data-method="by-add"]:last-child').hide(), t.eventFilter_.init({
            container: t.$eventFilter_,
            propertyObj: {event: t.propObj.intersection.event},
            disabled: sensorsdata.authority.isNormal
        }), t.eventFilter_.val({}), t.userFilter_.init({
            container: t.$userFilter_,
            propertyObj: {user: t.propObj.intersection.user},
            disabled: sensorsdata.authority.isNormal
        }), t.userFilter_.val({})
    }, n.prototype.initDate_ = function () {
        var e = this, t = this.paramObj, a = {};
        a.startDate = moment(t.from_date, this.timeFormat), a.endDate = moment(t.to_date, this.timeFormat), a.showCompare = !1, a.chosenLabel = t.rangeText, a.rangeLimit = sensorsdata.CONSTSET.dateRangeLimit[t.unit], a.showHour = !("hour" !== t.unit && "minute" !== t.unit || t.compare_from_date || t.compare_to_date), a.allowRelative = !0, sensorsdata.initDateRangeInput(this.inputDate_, a), this.inputDate_.unbind("apply.daterangepicker").bind("apply.daterangepicker", function () {
            e.prevQuery_()
        }), this.inputDate_.tooltip().unbind("truncate.daterangepicker").bind("truncate.daterangepicker", function () {
            var t = e.$inputUnit_.attr("data-value"), a = sensorsdata.CONSTSET.dateRangeLimit[t];
            sensorsdata.info.show("minute" === t ? sensorsdata.util.format(sensorsdata.languages.get("按分钟查看，时间范围一次最多展示 #{limit} 天<!--{en}View by minute, display up to  #{limit} days in the time range-->"), {limit: a}) : "hour" === t ? sensorsdata.util.format(sensorsdata.languages.get("按小时查看，时间范围一次最多展示 #{limit} 天<!--{en}View by minute, display up to  #{limit} days in the time range-->"), {limit: a}) : sensorsdata.util.format(sensorsdata.languages.get("时间范围一次最多展示 #{limit} 天<!--{en}Display up to  #{limit} days in the time range-->"), {limit: a}))
        })
    }, n.prototype.initEvent_ = function () {
        var e = this, t = e.paramObj;
        this.options.container.find("#bookmark-save-bar [data-toggle=tooltip]").tooltip(), this.$btnRefresh_.unbind("click").bind("click", function () {
            var t = e.$addEventFilter_.prop("disabled");
            return t ? !1 : (sensorsdata.disableReportAjaxCache(), void e.getPageView_())
        }), this.$linkDownload_.unbind("click").bind("click", function () {
            var t = e.$addEventFilter_.prop("disabled");
            if (t) return !1;
            if (!e.$linkDownload_.data("table-update")) return !0;
            var a = sensorsdata.languages.get("没有查找到数据<!--{en}No data was found-->"), n = e.downloadTableData.heads,
                s = e.downloadTableData.bodys, i = [];
            if (n && s) {
                var r = [];
                n.map(function (e) {
                    r.push(e.value)
                }), a = r.join(",") + "\r\n", s.map(function (e) {
                    r = [], e.first && r.push({value: e.first}), e.second && r.push({value: e.second}), e.third && r.push({value: e.third}), e.customer && r.push({value: e.customer}), r.push({value: e.general}, {value: e.unique}, {value: e.clickRate}, {value: e.clickRatio}), i.push(r)
                })
            }
            var o = {heads: n, rows: i},
                c = sensorsdata.languages.get("APP 点击分析<!--{en}APP Click Analysis-->") + "_" + e.inputDate_.val() + "_SensorsAnalytics";
            return sensorsdata.table2csv(o, c), !0
        }), e.$addEventFilter_.unbind("click").bind("click", function () {
            e.eventFilter_.addFilter()
        }), e.$addUserFilter_.unbind("click").bind("click", function () {
            e.userFilter_.addFilter()
        }), e.eventFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(function () {
            $(".not-match").show(), e.prevQuery_()
        }, e)), e.userFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(e.prevQuery_, e)), this.groupControl_.bindEvent("valueChangedEvent", function () {
            var t = e.groupControl_.getValue_().byFields, a = sensorsdata.languages.get("饼图<!--{en}Pie graph-->"),
                n = sensorsdata.languages.get("线图<!--{en}Line graph-->");
            0 === t.length ? e.setDefaultChartsType_("line", n) : e.setDefaultChartsType_("pie", a), e.prevQuery_()
        }), e.options.container.find('span[data-method="toggle-measures"]').unbind("click.toggle").bind("click.toggle", function () {
            $(this).toggleClass("icon-chart-collapse"), $(this).toggleClass("icon-chart-expand"), e.options.container.find(".report-ops").toggle($(this).hasClass("icon-chart-collapse"))
        });
        var a = this.$btnChartConfig_.next(".config");
        this.$btnChartConfig_.unbind("click").bind("click", function () {
            if (a.toggle().is(":visible")) {
                var t = e.paramObj, n = e.buildMeasureNames(!1), s = $.extend(!0, [], e.measures).map(function (t, a) {
                        return t.index = a, t.name = n[a], t.checked = e.chartMeasureIndexs_.indexOf(a) >= 0, t
                    }), i = sensorsdata.languages.get("App元素点击的点击率<!--{en}Click through rate of App elements-->"),
                    r = sensorsdata.languages.get("App元素点击的点击比<!--{en}Click ratio of App element Click -->");
                e.nullPageView || s.push({
                    event_name: "clickRate",
                    aggregator: "clickRate",
                    index: 2,
                    name: i,
                    checked: e.chartConfigMeasures[2]
                }), s.push({
                    event_name: "clickRatio",
                    aggregator: "clickRatio",
                    index: 3,
                    name: r,
                    checked: e.chartConfigMeasures[3]
                });
                var o = {items: s, isMeasure: !0, chartType: "line" === t.chartsType || "column" === t.chartsType};
                e.$chartMeasureSelector_.html(Mustache.render(e.tplChartConfigItem_, o)), e.$chartMeasureSelector_.children().find('button[data-method="config-axis"]').unbind("click.config-axis").bind("click.config-axis", function () {
                    var a = $.extend(!0, [], t.measures).map(function (t, a) {
                        return t.index = a, t.name = n[a], t.right = -1 !== e.axisConfig.right.indexOf(a), t.left = !t.right, t.checked = e.chartMeasureIndexs_.indexOf(a) >= 0, t
                    }), s = {
                        items: a,
                        isNormalize: e.axisConfig.isNormalize,
                        truncated: !!e.rawSegObj_.truncated,
                        rows: e.rawSegObj_.num_rows
                    };
                    e.axisConfigContainer_.html(Mustache.render(e.tplAxisConfigModal_, s)), e.axisConfigContainer_.modal("show"), e.axisConfigContainer_.on("shown.bs.modal", function () {
                        e.initAxisModalEvents_()
                    })
                });
                var c = e.$chartMeasureSelector_.find(":radio");
                if ("line" === t.chartsType && e.chartMeasureIndexs_.length >= 3 && c.not(":checked").prop("disabled", !0), $("#chart-measure-selector").find(':radio[data-checked="true"]').prop("checked", "checked"), c.bind("change", function () {
                    var t = e.paramObj, a = $(this).prop("checked"), n = parseInt($(this).val(), 10);
                    e.chartConfigMeasures = [], e.chartConfigMeasures[n] = a, e.chartsContainer_.removeClass("no-display"), e.chartMeasureIndexs_ = [n], e.chart_ && (e.chart_.show(e.chartByNames_, e.chartMeasureIndexs_, e.axisConfig), e.updateReportName_()), "line" === t.chartsType && (c.filter(":checked").size() >= 3 ? c.not(":checked").prop("disabled", !0) : c.prop("disabled", !1))
                }), !$.isArray(t.by_fields) || 0 === t.by_fields.length) return void e.$chartBySelector_.html(sensorsdata.languages.get("无分组<!--{en}No group-->"));
                if (!$.isEmptyObject(e.segObj_)) {
                    var l = 0, d = e.segObj_.rows.map(function (t, a) {
                        var n = e.chartByNames_.indexOf(t.name) >= 0;
                        return l += n ? 1 : 0, {index: a, name: t.name, checked: n}
                    });
                    d.unshift({
                        index: -1,
                        name: sensorsdata.languages.get("全选<!--{en}Select all-->"),
                        checked: d.length === l
                    });
                    var h = {
                        items: $.extend(!0, [], d),
                        isMeasure: !1,
                        truncated: e.rawSegObj_.truncated,
                        rows: e.rawSegObj_.num_rows
                    };
                    e.$chartBySelector_.html(Mustache.render(e.tplChartGroupConfigItem_, h));
                    var p = e.$chartBySelector_.find(":checkbox");
                    1 === p.size() && p.prop("disabled", !0), p.unbind("change").bind("change", function () {
                        var t = $(this).prop("checked"), a = parseInt($(this).val(), 10);
                        if (-1 === a) e.chartByNames_ = t ? e.segObj_.rows.map(function (e) {
                            return e.name
                        }) : []; else {
                            var n = e.segObj_.rows[a].name;
                            if (t) e.chartByNames_.push(n); else {
                                var s = e.chartByNames_.indexOf(n);
                                e.chartByNames_.splice(s, 1)
                            }
                        }
                        if (e.chartsContainer_.toggleClass("no-display", 0 === e.chartByNames_.length), e.chartByNames_.length > 0 ? e.chart_.show(e.chartByNames_, e.chartMeasureIndexs_, e.axisConfig) : (e.chart_.destroyAll(), e.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("请选择需要在图中展示的分组<!--{en}Please select the groups that need to be displayed in the chart-->"))), -1 === a) p.prop("checked", t); else {
                            var i = p.not('[value="-1"]'), r = i.size() === i.filter(":checked").size();
                            p.filter('[value="-1"]').prop("checked", r)
                        }
                    }), 1 === t.measures.length && e.segObj_.rows.length > 1 && (a.find("ul#chart-by-selector").show().siblings("ul").hide(), a.find('[data-for="#chart-by-selector"]').addClass("selected").siblings().removeClass("selected"))
                }
            }
        }), a.find(".sa-tab div").unbind("click").bind("click", function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            var e = $(this).attr("data-for");
            $(e).show().siblings("ul").hide()
        }), this.$inputUnit_.saDropdown({
            value: t.unit, onSelected: function (t) {
                var a = !("hour" !== t && "minute" !== t || e.paramObj.compare_from_date || e.paramObj.compare_to_date),
                    n = e.inputDate_.data("daterangepicker");
                n.setRangeLimit(sensorsdata.CONSTSET.dateRangeLimit[t]), n.setHourDisplay(a), e.prevQuery_()
            }
        }), this.$chartsType_.saDropdown({
            value: t.chartsType, onSelected: function (t) {
                if (t !== e.paramObj.chartsType) {
                    if ("line" === t && e.chartMeasureIndexs_.length > 3) for (var a = e.chartMeasureIndexs_.splice(3), n = 0, s = a.length; s > n; n++) e.$chartMeasureSelector_.find(':radio[value="' + a[n] + '"]').prop("checked", !1);
                    e.renderCharts_(t), e.paramObj.chartsType = t;
                    var i = "#" + $.param(e.paramObj);
                    window.history.pushState(i, "", i)
                }
            }
        }), $(window).off("unload.appClick").on("unload.appClick", sensorsdata.bind(this.savePageStatus_, this)), $(window).off("resize.appClick").on("resize.appClick", function () {
            e.chart_ && e.chart_.resize()
        }), $("body").unbind("click.appClick").bind("click.appClick", function (t) {
            var a = $(t.target || t.srcElement).parents("div.chart-config:first");
            0 === a.size() && e.$btnChartConfig_.next(".config").hide()
        }), this.elementTableContainer.on("click", "thead th[data-sort]", function () {
            e.sortElementData_($(this))
        }), this.elementTableContainer.on("click", "a[data-method=download-viewtree]", function () {
            saveTextAs($(this).prev().html() + "\n\n" + JSON.stringify(e.snapshot_), "app点击图诊断信息" + (new Date).valueOf() + ".txt")
        });
        var n = null;
        this.elementContainer.on("keyup", "#element_filter_input", function () {
            var t = $(this), a = $.trim(t.val());
            t.data("inputVal") && t.data("inputVal") === a || (t.data("inputVal", a), n && clearTimeout(n), n = setTimeout(function () {
                e.searchElementData_(a)
            }, 500))
        }), this.$syncBtn.on("click", function () {
            if (!e.$offConnectBtn.prop("disabled")) {
                var t = $(this).hasClass("switch-on");
                t ? ($(this).removeClass("switch-on").addClass("switch-off"), e.sync = !1, window.clearTimeout(e.connectTimeoutId_)) : ($(this).removeClass("switch-off").addClass("switch-on"), e.sync = !0, e.connected_())
            }
        }), this.$offConnectBtn.on("click", function () {
            e.disConnect_()
        }), this.$offConnectLink.on("click", function () {
            sensorsdata.popover({
                ele: $(this),
                placement: "bottom",
                showNow: !0,
                footer: $("#tpl_popover_footer_state_3").html(),
                content: sensorsdata.languages.get('<p style="width:160px;margin:0;">确定断开连接吗？</p><p style="margin:0;color:#B2B0BB;font-size:13px;">分析条件和结果将被清除</p><!--{en}<p style="width:160px;margin:0;">Are you sure to disconnect?</p><p style="margin:0;color:#B2B0BB;font-size:13px;">The analysis conditions and results will be removed</p>-->'),
                success: function () {
                    e.disConnectLink_()
                }
            }), sensorsdata.languages.update()
        }), this.$shotPicture.on("click", function (t) {
            t.preventDefault(), $("body, html").css({overflow: "hidden"});
            var a = $("#hide-canvas-content");
            a.show(), e.renderHeatmapPicture_(e.snapshot_.screenshot, e.controls_), html2canvas(a[0], {
                allowTaint: !0,
                taintTest: !1,
                onrendered: function (e) {
                    a.hide();
                    var t = e.toDataURL("image/png"), n = document.createElement("a");
                    $(n).attr("href", t), n.download = "img.png", document.body.appendChild(n), n.click(), $(n).remove(), $("body, html").css("overflow", "visible")
                }
            })
        }), this.$resetParams.on("click", function () {
            e.pageChange_()
        });
        var s = function (e) {
            for (var t = e.offsetLeft, a = e.offsetParent; null !== a;) t += a.offsetLeft, a = a.offsetParent;
            return t + e.clientWidth
        }, i = function (e) {
            for (var t = e.offsetTop, a = e.offsetParent; null !== a;) t += a.offsetTop, a = a.offsetParent;
            return t
        };
        this.panelAppSnapshot_.delegate("span[data-control-path]", "mouseover", function () {
            var t = $(this), a = this;
            e.matchHeatMampDate.map(function (n) {
                if (t.attr("data-control-path") === n.path) {
                    var r = i(a) + $(a).height() / 2 - 46, o = s(a) - $(a).width() / 2 + 6, c = n.general,
                        l = n.dataIndex, d = c / e.pageViewCount, h = (c / e.clickCount).toFixed(2);
                    d = d > 1 ? 100 : (100 * d).toFixed(2);
                    var p = {general: c, index: l, clickRate: d, clickRatio: h};
                    return e.$elementDetail.html(Mustache.render(e.elementDetailItem_, p)), isNaN(l) ? e.$elementDetail.find("a[data-method=searchUserList]").css({color: "#999"}) : e.$elementDetail.find("a[data-method=searchUserList]").unbind("click").bind("click", sensorsdata.bind(e.searchHeatmpUserList_, e)), void e.$elementDetail.css({
                        top: r,
                        left: o
                    }).show()
                }
            })
        });
        var r = function (e, t) {
            for (var a = e.relatedTarget ? e.relatedTarget : "mouseout" === e.type ? e.toElement : e.fromElement; a && a !== t;) a = a.parentNode;
            return a !== t
        };
        this.$elementDetail.mouseout(function (t) {
            return t = t || window.event, r(t, this) ? void e.$elementDetail.hide() : !1
        })
    }, n.prototype.updateReportName_ = function () {
        var e = this.buildMeasureNames(!1), t = this.chartMeasureIndexs_[0];
        this.options.container.find("#reportName").text(e[t])
    }, n.prototype.buildParamObj_ = function (e) {
        var t = this.groupControl_.val(), a = this.eventFilter_.val(), n = this.userFilter_.val(), s = {
            measures: [],
            unit: this.$inputUnit_.attr("data-value"),
            filter: a,
            user_filter: n,
            by_fields: t.byFields,
            bucket_params: t.bucket,
            chartsType: this.$chartsType_.attr("data-value")
        };
        s.measures = e || this.measures;
        var i = "hour" === s.unit || "minute" === s.unit ? this.timeFormat : sensorsdata.CONSTSET.dateFormat;
        s.rangeText = this.inputDate_.data("daterangepicker") && this.inputDate_.data("daterangepicker").chosenLabel, s.from_date = this.inputDate_.data("startDate").format(i), s.to_date = this.inputDate_.data("endDate").format(i), delete s.compare_from_date, delete s.compare_to_date;
        var r = this.paramObj[sensorsdata.CONSTSET.bookmarkId];
        return r && (s[sensorsdata.CONSTSET.bookmarkId] = r), this.dealParam(s)
    }, n.prototype.unload = function () {
        var e = this;
        e.checkEvent_() && (e.sync = !1, window.clearTimeout(e.connectingTimeoutId_), window.clearTimeout(e.connectTimeoutId_)), this.savePageStatus_(), this.options.container.find("[data-toggle=tooltip]").tooltip("destroy"), $("body").unbind("click.appClick"), sensorsdata.form.removeChildrenError(this.measuresContainer_), $(window).off("unload.appClick"), $(window).off("resize.appClick")
    }, n.prototype.savePageStatus_ = function () {
        var e = {
            chartByNames: this.chartByNames_,
            byFields: (this.paramObj.by_fields || []).join(),
            tableType: this.paramObj.tType,
            ratioActive: this.paramObj.ratio
        };
        sensorsdata.localStorage.setItem(this.pageName, JSON.stringify(e))
    }, n.prototype.renderQrCode_ = function (e) {
        var t = this, a = new QRCode(document.getElementById(e), {width: 110, height: 110, correctLevel: 1}),
            n = JSON.parse(sensorsdata.sessionStorage.getItem("feature_code")), s = "";
        if (n) var i = n.feature_code, r = (new Date).getTime() - n.setTime < 36e5;
        sensorsdata.ajax({
            type: "post",
            url: "heat_map/feature_code",
            showLoader: !1,
            success: sensorsdata.bind(function (e) {
                var a = location.origin, o = e.feature_code;
                t.current_feature_code = o, n && r ? o = i : sensorsdata.sessionStorage.removeItem("feature_code"), t.feature_code = o, s = a + "/h5/appealApp/index.html?feature_code=" + o
            }, this)
        }).then(function () {
            sensorsdata.ajax({
                type: "get", url: "heat_map/scheme", showLoader: !1, success: function (e) {
                    var n = e.scheme, i = t.project;
                    s += "&protocal=" + n + "&project=" + i, a.makeCode(s), t.applyConnectApp_()
                }
            })
        })
    }, n.prototype.applyConnectApp_ = function () {
        var e = $("#count-down"), t = 1200;
        e.data("last-seconds", t), e.html(t + "s");
        var a = this, n = function () {
            var t = e.data("last-seconds");
            e.html(t + "s"), 0 >= t && (e.html("等待..."), window.clearTimeout(e.data("interval-id")), window.clearTimeout(a.connectingTimeoutId_)), e.data("last-seconds", --t)
        }, s = window.setInterval(n, 1e3);
        e.data("interval-id", s), n(), this.connecting_()
    }, n.prototype.connecting_ = function () {
        var e = this, t = 1e3, a = function () {
            sensorsdata.ajax({
                url: "heat_map/scanning",
                showLoader: !1,
                data: {feature_code: e.feature_code},
                error: function (e) {
                    var t = {success: !1, fail_reason: e.status, time_consuming: ""};
                    sensorsdata.track("app_click_analytics_scanning_qrcode", t)
                },
                success: function (t) {
                    var a = t.scanned;
                    e.scanned = a, a ? (e.time_consuming_scan = (new Date).valueOf(), e.sync = !0, e.$countDown_.html("扫描成功~"), window.clearTimeout(e.$countDown_.data("interval-id")), void 0 !== e.connectingTimeoutId_ && (window.clearTimeout(e.connectingTimeoutId_), e.connectingTimeoutId_ = void 0), e.$connectContent_.find(".connect").remove(), e.$connectContent_.addClass("connecting"), e.$disconnectContent_.find(".connect").remove(), e.$disconnectContent_.addClass("connecting"), e.connected_()) : e.feature_code !== e.current_feature_code && (sensorsdata.sessionStorage.removeItem("feature_code"), e.feature_code = e.current_feature_code, $("#qrCode").empty(), e.renderQrCode_("qrCode"))
                },
                complete: function () {
                    var n = e.$countDown_.data("last-seconds");
                    n > 0 && !e.scanned && (e.connectingTimeoutId_ = window.setTimeout(a, t))
                }
            })
        };
        a()
    }, n.prototype.connected_ = function () {
        var e = this;
        e.$offConnectBtn.removeAttr("disabled"), e.$syncBtn.removeClass("switch-off").addClass("switch-on"), e.$queryFlag_ = !0;
        var t = 1e3, a = "heat_map/screenshot?project=" + e.project, n = function () {
            var s = {feature_code: e.feature_code, image_hash: e.image_hash};
            sensorsdata.ajax({
                type: "post",
                url: a,
                showLoader: !1,
                dataType: "json",
                data: JSON.stringify(s),
                error: function (e) {
                    var t = {success: !1, fail_reason: e.status, time_consuming: ""};
                    sensorsdata.track("app_click_analytics_scanning_qrcode", t)
                },
                success: function (t) {
                    var a = t.need_refresh, n = t;
                    if (n.os) {
                        var s = e.time_consuming_scan;
                        if (s) {
                            e.time_consuming_scan = "", s = s ? 100 * Math.ceil(((new Date).valueOf() - s) / 100) : "";
                            var i = {time_consuming: s, success: !0};
                            sensorsdata.track("app_click_analytics_scanning_qrcode", i)
                        }
                        e.$connectContent_.hide(), e.$connectedContent_.show(), e.$disconnectContent_.hide(), $(".phone-content").show(), e.$addUserFilter_.removeAttr("disabled"), e.$addEventFilter_.removeAttr("disabled"), e.groupContainer_.find('.group-control-item:last-child button[data-method="by-add"]').removeAttr("style")
                    }
                    if (a) {
                        var r = {feature_code: e.feature_code, setTime: (new Date).getTime()};
                        sensorsdata.sessionStorage.setItem("feature_code", JSON.stringify(r)), e.convertRenderApp_(n)
                    }
                },
                complete: function () {
                    e.sync && (e.connectTimeoutId_ = window.setTimeout(n, t))
                }
            })
        };
        n()
    }, n.prototype.disConnect_ = function () {
        var e = this, t = e.feature_code;
        e.resetInput_(), e.$elementDetail.hide(), e.$syncBtn.removeClass("switch-on").addClass("switch-off"), e.$offConnectBtn.attr("disabled", "disabled"), e.$disconnectContent_.removeClass("connecting").html(Mustache.render(e.qrcodeConnectItem_, {id: "rerender-qrCode"})), e.sync = !1, window.clearTimeout(e.connectTimeoutId_), e.sync = !1, sensorsdata.ajax({
            type: "delete",
            url: "heat_map/stop_sync",
            data: t,
            success: sensorsdata.bind(function () {
                e.image_hash = "none"
            }, this)
        }), $(".phone-content").hide(), e.$disconnectContent_.show(), e.renderQrCode_("rerender-qrCode")
    }, n.prototype.disConnectLink_ = function () {
        var e = this, t = e.feature_code;
        sensorsdata.sessionStorage.removeItem("feature_code"), e.resetInput_(), e.$elementDetail.hide(), e.$connectedContent_.hide(), e.$connectContent_.show(), e.$connectContent_.removeClass("connecting").html(Mustache.render(e.qrcodeConnectItem_, {id: "rerender-qrCode"})), e.sync = !1, window.clearTimeout(e.connectTimeoutId_), e.sync = !1, sensorsdata.ajax({
            type: "delete",
            url: "heat_map/stop_sync",
            data: t,
            success: sensorsdata.bind(function () {
                e.image_hash = "none"
            }, this)
        }), $(".phone-content").hide(), e.$disconnectContent_.show(), e.renderQrCode_("rerender-qrCode")
    }, n.prototype.convertRenderApp_ = function (e) {
        var t = this, a = e.os, n = "", s = "", i = [];
        if (t.screen_name !== e.screen_name && (t.screen_name = e.screen_name, t.os = e.os, t.app_version = e.app_version, t.pageChange_()), $("#phone-os").html(a), $("#app-version").html(e.app_version), "IOS" === a.toLocaleUpperCase()) {
            n = e.gzip_payload, s = n.image_hash, t.image_hash = s;
            var r = n.serialized_objects.objects.filter(function (e) {
                return e.id === n.serialized_objects.rootObject
            })[0], o = n.serialized_objects.objects.filter(function (e) {
                return e.id === r.properties.screen.values[0].value
            })[0];
            t.clientScreen_.width = o.properties.bounds.values[0].value.Width, t.clientScreen_.height = o.properties.bounds.values[0].value.Height, i = t.convertSnapshot.convertIOSToControls_(n), t.snapshotImageHash_ = s, t.snapshot_ = n
        } else {
            n = e.gzip_payload.activities[e.gzip_payload.activities.length - 1], s = n.image_hash, t.image_hash = s;
            var c = n.serialized_objects.objects.filter(function (e) {
                return 0 === e.classes.indexOf("com.android.internal.policy.impl.PhoneWindow.DecorView") || 0 === e.classes.indexOf("com.android.internal.policy.PhoneWindow.DecorView") || e.classes.indexOf("com.android.internal.policy.impl.MultiPhoneWindow.MultiPhoneDecorView")
            })[0];
            t.clientScreen_.width = c.width, t.clientScreen_.height = c.height, i = t.convertSnapshot.convertAndroidToControls_(n, t.clientScreen_.width, t.clientScreen_.height), t.snapshotImageHash_ = s, t.snapshot_ = n
        }
        t.renderApp_(n.screenshot, i)
    }, n.prototype.pageChange_ = function () {
        var e = this;
        $(".not-match").hide(), e.$appClickHeatmap_.empty();
        var t = e.paramObj.filter || {}, a = e.propObj.intersection ? e.propObj.intersection.event : [];
        e.eventFilter_.init({
            container: e.$eventFilter_,
            propertyObj: {event: a},
            disabled: sensorsdata.authority.isNormal
        });
        var n = sensorsdata.findProperty("$screen_name", {event: sensorsdata.cache.eventProperties}),
            s = $.isEmptyObject(n) || n.has_dict ? "equal" : "contain";
        t = {
            conditions: [{
                field: "event.$AppClick.$screen_name",
                "function": s,
                params: [e.screen_name]
            }, {
                field: "event.$AppClick.$os",
                "function": "equal",
                params: [e.os]
            }, {field: "event.$AppClick.$app_version", "function": "equal", params: [e.app_version]}]
        }, e.eventFilter_.val(t), e.getPageView_()
    }, n.prototype.renderHeatmapPicture_ = function (e, t) {
        var a = this, n = parseInt(this.clientScreen_.width, 10), s = parseInt(this.clientScreen_.height, 10),
            i = $("#hide-canvas-snapshot");
        $("#hide-canvas-content").css({width: n, height: s});
        var r = new Image;
        r.onload = function () {
            i.attr("width", n), i.attr("height", s), a.$hideAppClickHeatmap_.width(n), a.$hideAppClickHeatmap_.height(s), i[0].getContext("2d").drawImage(r, 0, 0, r.width, r.height, 0, 0, n, s), a.$hideAppClickHeatmap_.empty();
            var e = easyHeatmap.create({
                container: document.querySelector("#hide-app-click-heatmap"),
                xField: "x",
                yField: "y",
                wField: "width",
                hField: "height"
            }), o = [], c = a.rawHeatmapSegObj_;
            "{}" !== JSON.stringify(c) && (o = a.convertElementData_(c).bodys);
            var l = a.convertHeatmapData_(t, o).filter(function (e) {
                return e.value > 0
            }), d = {max: a.maxClick, blur: 100, data: l};
            e.setData(d)
        }, r.src = "data:image/jpeg;base64," + e
    }, n.prototype.renderApp_ = function (e, t) {
        var a = parseInt(this.clientScreen_.width, 10), n = this, s = $("#canvas-content").width(),
            i = JSON.stringify(t);
        i !== n.controlsUniq_ && n.panelAppSnapshot_.find("span[data-control-path]").remove();
        var r = $("#canvas-snapshot"), o = new Image;
        o.onload = function () {
            var e = r.width() / o.width;
            if (r.attr("width", o.width * e), r.attr("height", o.height * e), n.$appClickHeatmap_.width(o.width * e), n.$appClickHeatmap_.height(o.height * e), r[0].getContext("2d").drawImage(o, 0, 0, o.width, o.height, 0, 0, o.width * e, o.height * e), i !== n.controlsUniq_) {
                e = 1, a > s && (e = r.width() / a), n.controls_ = t, n.controlsUniq_ = i;
                var c = t.map(function (t) {
                    var a = $.extend(!0, {}, t);
                    return a.x *= e, a.y *= e, a.width *= e, a.height *= e, a
                });
                n.controlsForRender = c, n.renderHeatmap_(c)
            }
        }, r.css("width", a > s ? s : a), o.src = "data:image/jpeg;base64," + e
    }, n.prototype.prevQuery_ = function () {
        if (sensorsdata.cache.config.auto_refresh) {
            var e = this.buildParamObj_(), t = JSON.stringify(this.paramObj) !== JSON.stringify(e);
            t && this.$queryFlag_ && this.getPageView_()
        }
    }, n.prototype.getPageView_ = function (e, t) {
        this.time_consuming = (new Date).valueOf(), this.matchHeatMampDate = [], this.pageViewCount = "", this.pageViewDetail = [], this.rawSegObj_ = {}, this.rawCompareSegObj_ = {}, this.rawRollupSegObj_ = {}, this.rawRollupCompareSegObj_ = {}, this.segObj_ = {}, this.compareSegObj_ = {}, this.rollupSegObj_ = {}, this.rollupCompareSegObj_ = {}, this.rawHeatmapSegObj_ = {};
        var a = [{event_name: "$AppViewScreen", aggregator: "general"}];
        $.isEmptyObject(e) && (e = this.buildParamObj_(a)), this.paramObj = e;
        var n = sensorsdata.findProperty("$screen_name", {event: sensorsdata.cache.eventProperties}),
            s = $.isEmptyObject(n) || n.has_dict ? "equal" : "contain", i = {
                conditions: [{
                    field: "event.$AppViewScreen.$screen_name",
                    "function": s,
                    params: [this.screen_name]
                }, {
                    field: "event.$AppViewScreen.$os",
                    "function": "equal",
                    params: [this.os]
                }, {field: "event.$AppViewScreen.$app_version", "function": "equal", params: [this.app_version]}],
                relation: "and"
            }, r = "events/report/?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || "");
        this.use_cache = sensorsdata.AJAX_CONST.reportAjaxCache;
        var o = this.clearAjaxData(e);
        o.by_fields = [], o.detail_and_rollup = !0, o.filter = i, sensorsdata.reportAjax({
            queueEnable: !0,
            queueKey: "POST-" + r,
            url: r,
            showLoader: !1,
            method: "POST",
            data: o,
            complete: sensorsdata.bind(function () {
                $.isFunction(t) && t()
            }, this),
            error: function (e) {
                var t = {success: !1, fail_reason: e.status, time_consuming: "", use_cache: !!this.use_cache};
                sensorsdata.track("app_click_analytics", t)
            },
            success: sensorsdata.bind(function (e) {
                var t = function (e) {
                    return $.isEmptyObject(e) || $.isEmptyObject(e.rollup_result) || !$.isArray(e.rollup_result.rows) || 0 === e.rollup_result.rows.length || $.isEmptyObject(e.detail_result) || !$.isArray(e.detail_result.rows) || 0 === e.detail_result.rows.length
                }, a = {}, n = {};
                this.nullPageView = !1, !$.isArray(e) || t(e[0]) || t(e[1]) ? t(e) ? this.nullPageView = !0 : (a = $.extend(!0, {}, e.rollup_result), n = $.extend(!0, {}, e.detail_result), this.pageViewCount = a.rows[0].values[0][0], this.pageViewDetail = n.rows[0].values) : (a = $.extend(!0, {}, e[0].rollup_result), n = $.extend(!0, {}, e[0].detail_result), this.pageViewCount = a.rows[0].values[0][0], this.pageViewDetail = n.rows[0].values), this.getAppClick_()
            }, this)
        })
    }, n.prototype.getAppClick_ = function (e, t) {
        $.isEmptyObject(e) && (e = this.buildParamObj_()), this.paramObj = e;
        var a = "#" + $.param(e);
        window.location.hash !== a && window.history.pushState(a, "", a);
        var n = "events/report/?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || ""), s = this.clearAjaxData(e);
        s.detail_and_rollup = !0, sensorsdata.reportAjax({
            queueEnable: !0,
            queueKey: "POST-" + n,
            url: n,
            method: "POST",
            data: s,
            complete: sensorsdata.bind(function () {
                this.options.closeLoading(), $.isFunction(t) && t()
            }, this),
            error: function (e) {
                var t = {success: !1, fail_reason: e.status, time_consuming: "", use_cache: !!this.use_cache};
                sensorsdata.track("app_click_analytics", t)
            },
            success: sensorsdata.bind(function (t) {
                var a = function (e) {
                    return $.isEmptyObject(e) || $.isEmptyObject(e.rollup_result) || !$.isArray(e.rollup_result.rows) || 0 === e.rollup_result.rows.length || $.isEmptyObject(e.detail_result) || !$.isArray(e.detail_result.rows) || 0 === e.detail_result.rows.length
                };
                if (!$.isArray(t) || a(t[0]) || a(t[1])) {
                    if (a(t)) return this.chartsContainer_.hide(), this.elementContainer.hide(), this.$appClickHeatmap_.empty(), this.options.container.find(".page-part-h-split").hide(), void this.setHolderPlace_(!0);
                    this.rawSegObj_ = $.extend(!0, {}, t.detail_result), this.rawSegObj_ = this.convertChartsData_(this.rawSegObj_, "values", !0), this.rawRollupSegObj_ = $.extend(!0, {}, t.rollup_result), this.rawRollupSegObj_ = this.convertChartsData_(this.rawRollupSegObj_, "values"), this.segObj_ = this.convertAjaxModel(t.detail_result), this.segObj_ = this.convertChartsData_(this.segObj_, "data", !0), this.rollupSegObj_ = this.convertAjaxModel(t.rollup_result), this.rollupSegObj_ = this.convertChartsData_(this.rollupSegObj_, "data"), this.showElementData_()
                } else this.rawSegObj_ = $.extend(!0, {}, t[0].detail_result), this.rawRollupSegObj_ = $.extend(!0, {}, t[0].rollup_result), this.segObj_ = this.convertAjaxModel(t[0].detail_result), this.rollupSegObj_ = this.convertAjaxModel(t[0].rollup_result), this.rawRollupCompareSegObj_ = $.extend(!0, {}, t[1].rollup_result), this.rawCompareSegObj_ = $.extend(!0, {}, t[1].detail_result), this.compareSegObj_ = this.convertAjaxModel(t[1].detail_result), this.rollupCompareSegObj_ = this.convertAjaxModel(t[1].rollup_result), this.showElementData_();
                this.nullPageView && sensorsdata.info.show(sensorsdata.languages.get("APP 当前页面未记录到 $AppViewScreen 事件，未展示点击率<!--{en}App current page is not recorded on the $AppViewScreen event, the click rate is not displayed-->")), this.getHeatmap_(e), this.renderChartHtml_(), this.updateReportName_()
            }, this)
        })
    }, n.prototype.getHeatmap_ = function (e, t) {
        var a = this.time_consuming, n = {success: !0};
        this.rawHeatmapSegObj_ = {}, $.isEmptyObject(e) && (e = this.buildParamObj_()), this.paramObj = e;
        var s = "#" + $.param(e);
        window.location.hash !== s && window.history.pushState(s, "", s);
        var i = "events/report/?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || ""), r = this.clearAjaxData(e);
        r.by_fields = ["event.$AppClick.$element_selector"], r.detail_and_rollup = !0, sensorsdata.reportAjax({
            queueEnable: !0,
            queueKey: "POST-" + i,
            url: i,
            showLoader: !1,
            method: "POST",
            data: r,
            complete: sensorsdata.bind(function () {
                this.options.closeLoading(), $.isFunction(t) && t()
            }, this),
            error: function (e) {
                n.fail_reason = e.status, n.time_consuming = "", n.use_cache = !!this.use_cache, sensorsdata.track("app_click_analytics", n)
            },
            success: sensorsdata.bind(function (e) {
                a = a ? 100 * Math.ceil(((new Date).valueOf() - a) / 100) : "", n.time_consuming = a, n.use_cache = !!this.use_cache, sensorsdata.track("app_click_analytics", n);
                var t = function (e) {
                    return $.isEmptyObject(e) || $.isEmptyObject(e.rollup_result) || !$.isArray(e.rollup_result.rows) || 0 === e.rollup_result.rows.length || $.isEmptyObject(e.detail_result) || !$.isArray(e.detail_result.rows) || 0 === e.detail_result.rows.length
                };
                if (!$.isArray(e) || t(e[0]) || t(e[1])) {
                    if (t(e)) return;
                    this.rawHeatmapSegObj_ = $.extend(!0, {}, e.rollup_result)
                } else this.rawHeatmapSegObj_ = $.extend(!0, {}, e[0].rollup_result);
                this.renderHeatmap_(this.controlsForRender)
            }, this)
        })
    }, n.prototype.renderHeatmap_ = function (e) {
        var t = this;
        t.$elementDetail.hide(), t.$appClickHeatmap_.empty();
        var a = easyHeatmap.create({
            container: document.querySelector("#app-click-heatmap"),
            xField: "x",
            yField: "y",
            wField: "width",
            hField: "height"
        }), n = [], s = t.rawHeatmapSegObj_;
        "{}" !== JSON.stringify(s) && (n = t.convertElementData_(s).bodys);
        var i = t.convertHeatmapData_(e, n).filter(function (e) {
            return e.value > 0
        }), r = {max: t.maxClick, blur: 100, data: i};
        a.setData(r)
    }, n.prototype.convertHeatmapData_ = function (e, t) {
        var a = this, n = [], s = 0, i = [];
        e.map(function (e, r) {
            var o = e.path, c = e.width || 1, l = e.height || 1, d = !0;
            n[r] = {
                x: Math.ceil(e.x + c / 2),
                y: Math.ceil(e.y + c / 2),
                height: Math.ceil(l),
                width: Math.ceil(c)
            }, t.map(function (t) {
                if (a.convertSnapshot.hasPath(o, t[0])) {
                    var c = t.general, l = t.index, h = !0;
                    i.length > 0 ? (i.map(function (e) {
                        e.path === o && (c += e.general, l = e.dataIndex + "," + l, e.general = c, e.dataIndex = l, h = !1)
                    }), h && i.push($.extend(!0, e, {
                        path: o,
                        general: c,
                        dataIndex: l
                    }))) : i.push($.extend(!0, e, {
                        path: o,
                        general: c,
                        dataIndex: l
                    })), n[r].value = c, c > s && (s = c), d = !1
                } else d && (n[r].value = 0)
            })
        }), 0 === s && (n = []), this.maxClick = s, a.matchHeatMampDate = i;
        var r = Mustache.render(a.tplControls_, {controls: i});
        return a.panelAppSnapshot_.append(r), n
    }, n.prototype.renderChartHtml_ = function () {
        if (this.setHolderPlace_(!0, !1), 0 === this.chartByNames_.length) this.chartByNames_ = this.segObj_.rows.slice(0, this.defaultSeriesLimit_).map(function (e) {
            return e.name
        }); else {
            var e = [], t = this.segObj_.rows.map(function (e) {
                return e.name
            });
            this.chartByNames_.map(function (a) {
                t.indexOf(a) >= 0 && e.push(a)
            }), this.chartByNames_ = 0 === e.length ? t.slice(0, this.defaultSeriesLimit_) : e
        }
        this.renderCharts_(this.$chartsType_.attr("data-value"))
    }, n.prototype.renderCharts_ = function (e) {
        var t = this;
        if (!$.isEmptyObject(t.segObj_)) {
            t.chartsContainer_.removeClass("no-display").show(), t.$btnChartConfig_.removeClass("disabled").tooltip("destroy");
            var a = t.paramObj;
            a.measures.push({event_name: "$AppClick", aggregator: "clickRate"}, {
                event_name: "$AppClick",
                aggregator: "clickRatio"
            }), a.unit = a.unit || "day";
            var n = this.buildMeasureNames(!1), s = this.buildMeasureUnits(), i = {
                container: t.chartsContainer_,
                queryData: a,
                segObj: t.segObj_,
                compareSegObj: t.compareSegObj_,
                measureNames: n,
                measureUnits: s
            };
            if (t.chartMeasureIndexs_.length > 0) {
                if (t.chartMeasureIndexs_ = t.chartMeasureIndexs_.filter(function (e) {
                    return e < a.measures.length
                }), t.chartMeasureIndexs_.length < 1 && t.chartMeasureIndexs_.length < a.measures.length) {
                    for (var r = 0; r < a.measures.length && (-1 === t.chartMeasureIndexs_.indexOf(r) && t.chartMeasureIndexs_.push(r), 1 !== t.chartMeasureIndexs_.length); r++) ;
                    t.chartMeasureIndexs_.sort()
                }
            } else t.chartMeasureIndexs_ = a.measures.map(function (e, t) {
                return t
            }), t.chartMeasureIndexs_.splice(1);
            switch (e) {
                case"line":
                    var o = Math.ceil(this.defaultSeriesLimit_ / t.chartMeasureIndexs_.length);
                    this.chartByNames_.splice(o), this.chart_ = new sensorsdata.SegmentationLineChart(i), this.chart_.show(t.chartByNames_, t.chartMeasureIndexs_, t.axisConfig);
                    break;
                case"column":
                    this.chart_ = new sensorsdata.SegmentationColumnChart(i), this.chart_.show(t.chartByNames_, t.chartMeasureIndexs_, t.axisConfig);
                    break;
                case"pie":
                    if (!((this.paramObj.by_fields || []).length > 0)) return this.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("饼图只适用于有分组的查询<!--{en}Pie charts apply only to grouped queries-->")), void this.$btnChartConfig_.addClass("disabled");
                    i.segObj = this.rollupSegObj_, i.compareSegObj = this.rollupCompareSegObj_, this.chart_ = new sensorsdata.SegmentationPieChart(i), this.chart_.show(this.chartByNames_, this.chartMeasureIndexs_, this.axisConfig);
                    break;
                case"stack":
                    if (this.chartMeasureIndexs_.length > 1) this.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("只支持单指标累积图<!--{en}Single index cumulative graphs only-->")); else {
                        var c = i.queryData.measures[0].aggregator;
                        if ("general" !== c && "SUM" !== c) this.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("不支持当前指标累积图,只支持总次数和数值属性总和<!--{en}The current index cumulative graph is not supported, and only the total number of times and the sum of the numerical properties are supported-->")); else {
                            var l = i,
                                d = !$.isEmptyObject(l.compareSegObj) && $.isArray(l.compareSegObj.series) && l.compareSegObj.series.length > 0 && $.isArray(l.compareSegObj.rows) && l.compareSegObj.rows.length > 0;
                            if (d) return void this.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("不支持对比时间区间下的累积图<!--{en}Cumulative graphs under contrast time ranges are not supported-->"));
                            this.chart_ = new sensorsdata.SegmentationStackChart(i), this.chart_.show(this.chartByNames_, this.chartMeasureIndexs_, this.axisConfig)
                        }
                    }
                    break;
                default:
                    sensorsdata.error.show(sensorsdata.languages.get("不支持展示此类型的图<!--{en}This type of graph is not supported for display-->"))
            }
        }
    }, n.prototype.convertChartsData_ = function (e, t, a) {
        var n = this, s = 0, i = [], r = n.pageViewCount, o = n.pageViewDetail;
        if (a) {
            s = 0;
            var c = !0;
            e.rows.map(function (e) {
                for (var a = e[t].length, n = 0; a > n; n++) {
                    c && i.push(0);
                    var s = e[t][n], r = s[0];
                    i[n] += r
                }
                c = !1
            }), e.rows.map(function (e) {
                e[t].map(function (e, t) {
                    var a = o[t] ? o[t][0] : 1;
                    a = 0 === a ? 1 : a;
                    var n = e[0] / a, s = 0 === e[0] ? 0 : (e[0] / i[t]).toFixed(2);
                    n = n > 1 ? 100 : (100 * n).toFixed(2), e.push(parseFloat(n), parseFloat(s))
                })
            })
        } else s = 0, e.rows.map(function (e) {
            var a = e[t][0], n = a[0];
            s += n
        }), e.rows.map(function (e) {
            e[t].map(function (e) {
                var t = e[0] / r, a = (e[0] / s).toFixed(2);
                t = t > 1 ? 100 : (100 * t).toFixed(2), e.push(parseFloat(t), parseFloat(a))
            })
        });
        return e
    }, n.prototype.showElementData_ = function (e, t, a) {
        var n = this;
        t ? n.showTableContent_(e, t, a) : (n.elementData = n.convertElementData_().bodys, n.showTableContent_(!0, n.elementData, a))
    }, n.prototype.showTableContent_ = function (e, t, a) {
        var n = this, s = $("#element_table_none_state");
        "object" != typeof t || t.glist || (t.glist = t);
        var i = {};
        if (i = t.glist ? t.glist : t, $.isArray(i) && 0 === i.length) return s.show(), void this.elementShowTable_.hide();
        s.hide(), this.elementShowTable_.show(), a || (a = n.convertElementData_().heads, n.heads = a, i = i.map(function (e) {
            var t = e.general / n.pageViewCount;
            return t = t > 1 ? 100 : (100 * t).toFixed(2), {
                index: e.index,
                first: e[0],
                second: e[1],
                third: e[2],
                customer: e[3],
                general: e.general,
                unique: e.unique,
                clickRate: parseFloat(t),
                clickRatio: parseFloat((e.general / n.clickCount).toFixed(2))
            }
        }));
        var r = {hlist: a, glist: i};
        n.bodys = i, n.elementShowTable_.find('[data-toggle="tooltip"]').tooltip("destroy"), n.renderElementTable_(e, r), $("#user_profile_total").html(i.length)
    }, n.prototype.convertElementData_ = function (e) {
        var t, a = this, n = e || a.rawRollupSegObj_, s = this.paramObj, i = [], r = [],
            o = ["first", "second", "third", "customer"], c = sensorsdata.CONSTSET.unknownByValue;
        s.by_fields.map(function (e, n) {
            var s = sensorsdata.findProperty(e, a.propObj.intersection) || {};
            "$element_selector" === s.name && (t = n), i.push({value: s.cname, name: o[n]})
        });
        var l = 0;
        n.rows.map(function (e, a) {
            var n = {};
            e.by_values.map(function (e, a) {
                n[a] = e || c, a === t && (n[a] = "<span>" + n[a] + '</span> <a data-method="download-viewtree">下载诊断信息</a>')
            });
            var s = e.values[0], i = s[0];
            n.general = i, n.unique = s[1], n.index = a, r.push(n), l += i
        }), a.clickCount = l, i.push({value: "点击次数", name: "general", sortMethod: "descend"}, {
            value: "用户数",
            name: "unique"
        }, {value: "点击率", name: "clickRate"}, {value: "点击比", name: "clickRatio"});
        var d = {heads: i, bodys: r};
        return d
    }, n.prototype.renderElementTable_ = function (e, t) {
        var a = 10, n = this, s = t, i = t.glist, r = sensorsdata.bind(function (e, a) {
            e -= 1;
            var r = i.slice(e, a);
            n.$linkDownload_.data("table-update", !0), n.downloadTableData = {heads: t.hlist, bodys: r};
            var o = Mustache.render(n.tplElementShowTable_, {
                glist: r,
                hlist: t.hlist,
                data_sort_0: s.data_sort_0,
                data_sort_1: s.data_sort_1
            });
            n.elementShowTable_.html(o).find("button").prop("disabled", !sensorsdata.authority.isAdmin), n.elementShowTable_.find("td").map(function (e, t) {
                $(t).show(), "" === $(t).html() && $(t).remove()
            }), sensorsdata.languages.update(), n.elementContainer.show(), n.options.container.find(".page-part-h-split").show(), n.elementShowTable_.find('[data-toggle="tooltip"]').tooltip()
        }, this);
        0 === i.length ? (n.elementContainer.html(""), n.elementContainer.find("#element-table-pagination").html("").hide()) : i.length <= a ? (n.elementContainer.find("#element-table-pagination").html("").hide(), r(1, i.length)) : sensorsdata.pagination({
            tableElement: n.elementContainer.find("#element-table-pagination").show(),
            totalItems: i.length,
            pageItems: 10,
            clickHandle: sensorsdata.bind(function (e) {
                r(e.range[0], e.range[1])
            }, this)
        }), sensorsdata.languages.update(), n.elementShowTable_.find("span[data-method=user-list]").unbind("click").bind("click", sensorsdata.bind(n.searchUserList_, n))
    }, n.prototype.searchElementData_ = function (e) {
        function t(t) {
            return -1 !== t[0].indexOf(e) || -1 !== t[1].indexOf(e)
        }

        this.filterElementData = $.grep(this.elementData, function (e) {
            return t(e)
        }), this.showElementData_(!0, {glist: this.filterElementData})
    }, n.prototype.sortElementData_ = function (e) {
        var t = e.attr("data-sort"), a = e.attr("data-flag"), n = $("#element-table th"), s = n.index(e),
            i = e.find(".icon-ascending-order"), r = e.find(".icon-descending-order"), o = "data_sort_" + a, c = null,
            l = this.heads, d = {};
        l.map(function (e) {
            e.sortMethod = ""
        }), "" === t || "ascend" === t ? (n.find("span").hide(), r.show(), l[s].sortMethod = "descend", n.removeAttr("data-sort"), e.attr("data-sort", "descend"), c = sensorsdata.seniorSort(this.bodys, a), d[o] = "descend") : "descend" === t && (n.find("span").hide(), i.show(), l[s].sortMethod = "ascend", n.removeAttr("data-sort"), e.attr("data-sort", "ascend"), c = sensorsdata.seniorSort(this.bodys, a).reverse(), d[o] = "ascend"), d.glist = c, this.showElementData_(!0, d, l)
    }, n.prototype.searchUserList_ = function (e) {
        var t = this, a = $(e.target || e.srcElement), n = t.paramObj, s = $(a).parents("tr").data("index");
        n.measures = [t.measures[1]], n.slice_date = null, n.slice_by_values = this.rawRollupSegObj_.rows[s].by_values, n.detail = !0, n.rollup_date = !0, $(a).createUserListPanel({queryData: n})
    }, n.prototype.searchHeatmpUserList_ = function (e) {
        var t = this, a = $(e.target || e.srcElement), n = t.paramObj, s = $(a).data("index");
        n.measures = [t.measures[1]], n.by_fields = ["event.$AppClick.$element_selector"], n.slice_date = null, n.slice_by_values = this.rawHeatmapSegObj_.rows[s].by_values, n.detail = !0, n.rollup_date = !0, t.options.initPage("/app-click/users/#" + $.param(n))
    }, a.exports = n
});
;
/*!pages/authManage/authManage.js*/
define("pages/authManage/authManage", function (t, e, a) {
    function n(t) {
        this.para = t, this.para.container.html($("#tpl_auth_manage").html()), this.eleContainerAccount = $("#auth_manage_account"), this.eleContainerGrant = $("#auth_manage_grant"), this.eleAccountContainerCreate = $("#auth_manage_account_create"), this.eleContainerGrantEdit = $("#auth_manage_grant_edit"), this.eleContainerAnalytics = $("#auth_manage_ananlytics"), this.eleContainerAnalyticsEdit = $("#auth_manage_ananlytics_edit"), this.eleAccountTableCreate = this.eleAccountContainerCreate.find(".auth-manage-table-create tbody"), this.eleGrantEditContent = this.eleContainerGrantEdit.find(".auth-grant-edit-content"), this.eleTabs = this.para.container.find("#auth_manage_tabs"), this.btnAccountMore = this.eleAccountContainerCreate.find(".btn-auth-more-account"), this.btnAccountConfirm = this.eleAccountContainerCreate.find(".btn-auth-create-account"), this.btnAccountCancel = this.eleAccountContainerCreate.find(".btn-auth-cancel-account"), this.eleAccountTableContainer = this.eleContainerAccount.find(".auth-account-table"), this.eleGrantTableContainer = this.eleContainerGrant.find(".auth-grant-table"), this.eleAnalyticsTableContainer = this.eleContainerAnalytics.find(".auth-analytics-table"), this.eleGrantTableEdit = this.eleContainerGrantEdit.find(".auth-grant-edit-table"), this.eleAnalyticsTableEdit = this.eleContainerAnalyticsEdit.find(".auth-analytics-eidt-table"), this.tplAccountTable = $("#tpl_auth_manage_account_table").html(), this.tplAccountTableCreate = $("#tpl_auth_manage_create_table").html(), this.tplGrantTable = $("#tpl_auth_manage_grant_table").html(), this.tplGrantTableEdit = $("#tpl_auth_manage_grant_table_edit").html(), this.tplAnalyticsTable = $("#tpl_auth_manage_analytics_table").html(), this.tplAnalyticsTableEdit = $("#tpl_auth_manage_analytics_table_edit").html(), this.tplAnalyticsSelect = $("#tpl_auth_manage_analytics_multiselect").html(), this.tplNoAnaAccount = $("#tpl_no_ana_acount").html(), this.inputAuthAccount = this.eleContainerAccount.find(".events-manage-head-filter"), this.inputAuthGrantEdit = this.eleContainerGrantEdit.find(".events-manage-head-filter"), this.inputAuthGrant = this.eleContainerGrant.find(".events-manage-head-filter"), this.inputAuthAnalytics = this.eleContainerAnalytics.find(".events-manage-head-filter"), this.init()
    }

    n.prototype = {
        constructor: n, showSuggestView: function (t, e) {
            var a = new RegExp(t, "i"), n = null;
            "grant" === e ? (n = $.grep(this.dataGrantInfo, function (t) {
                return a.test(t.name) ? !0 : !1
            }), this.showAuthGrant(n)) : "analytics" === e ? (n = $.grep(this.dataAnalyticsInfo, function (t) {
                return a.test(t.username) ? !0 : !1
            }), this.renderPage(n)) : "grantEdit" === e ? (n = $.grep(this.dataAccountInfo, function (t) {
                return a.test(t.username) ? !0 : !1
            }), this.showAuthGrantEditTable(null, n)) : "account" === e && (n = $.grep(this.dataAccountInfo, function (t) {
                return a.test(t.username) ? !0 : !1
            }), this.showAuthAccount(n))
        }, tableSort: function (t, e) {
            var a = null, n = null;
            t.name ? (a = t.flag, n = t.name) : (a = t.attr("data-sort"), n = t.attr("data-flag"));
            var s = {};
            "" === a || "descend" === a ? (this.dataAccountInfo = sensorsdata.seniorSort(this.dataAccountInfo, n).reverse(), s[n] = "ascend") : "ascend" === a && (this.dataAccountInfo = sensorsdata.seniorSort(this.dataAccountInfo, n), s[n] = "descend"), e ? this.showAuthGrantEditTable(null, null, s) : this.showAuthAccount(null, s)
        }, getAuthAccount: function () {
            this.inputAuthAccount.val(""), this.eleContainerAccount.show(), this.eleContainerGrant.hide(), this.eleAccountContainerCreate.hide(), this.eleContainerGrantEdit.hide(), this.eleContainerAnalytics.hide(), this.eleContainerAnalyticsEdit.hide();
            var t = this;
            this.ajaxAccountInfo(function (e) {
                t.dataAccountInfo = e.users, t.dataRoles = e.roles, t.tableSort({flag: "", name: "username"})
            })
        }, ajaxAccountInfo: function (t) {
            var e = null, a = null, n = function () {
                e && a && t({users: e, roles: a})
            };
            sensorsdata.ajax({
                url: sensorsdata.api.get("account"), success: function (t) {
                    e = $.grep(t, function (t) {
                        return "undefined" != typeof t.username
                    }), n()
                }
            }), sensorsdata.ajax({
                url: sensorsdata.api.get("roles"), success: function (t) {
                    a = t || [], n()
                }
            })
        }, getAuthGrant: function () {
            this.inputAuthGrant.val(""), this.inputAuthGrantEdit.val(""), this.eleContainerAccount.hide(), this.eleContainerGrantEdit.hide(), this.eleContainerGrant.show(), this.eleAccountContainerCreate.hide(), this.eleContainerAnalytics.hide(), this.eleContainerAnalyticsEdit.hide();
            var t = this;
            sensorsdata.ajax({
                url: "dashboards?detail=true", success: function (e) {
                    e = e || [], e = $.grep(e, function (t) {
                        return sensorsdata.authority.userId === t.user_id
                    }), $.each(e, function (t, e) {
                        1 === e.is_public ? (e.role_fix = sensorsdata.languages.get("全部可见<!--{en}All visible-->"), e.role_number_fix = 1, e.role_rang_fix = sensorsdata.languages.get("所有人<!--{en}Everyone-->")) : 0 === e.share ? (e.role_fix = sensorsdata.languages.get("仅自己可见<!--{en}Only visible to you-->"), e.role_number_fix = 0, e.role_rang_fix = sensorsdata.languages.get("只有自己<!--{en}Only myself-->")) : (e.role_rang_fix = '<a href="javascript:;" class="auth-grant-user-edit-range"><span class="auth-grant-edit-user-nums">' + ("undefined" == typeof e.share ? sensorsdata.languages.get("0人<!--{en}0 people-->") : e.share + sensorsdata.languages.get("人<!--{en}People-->")) + '</span><span class="icon-edit"></span></a>', e.role_number_fix = 2, e.role_fix = sensorsdata.languages.get("部分可见<!--{en}Partially visible-->"))
                    }), t.dataGrantInfo = e, t.showAuthGrant(e)
                }
            })
        }, getAnalytics: function () {
            this.inputAuthGrantEdit.val(""), this.inputAuthAnalytics.val(""), this.eleContainerAccount.hide(), this.eleContainerGrantEdit.hide(), this.eleContainerGrant.hide(), this.eleAccountContainerCreate.hide(), this.eleContainerAnalytics.show(), this.eleContainerAnalyticsEdit.hide();
            var t = this;
            sensorsdata.ajax({
                url: "account", success: function () {
                }
            }).then(function (e) {
                var a = $.grep(e, function (t) {
                    return "undefined" != typeof t.username && 1 === t.role
                });
                sensorsdata.ajax({
                    url: "events/all", success: function (e) {
                        var n = [];
                        a.forEach(function (t) {
                            var a = {};
                            a.id = t.id, a.username = t.username, a.virtual = e.filter(function (t) {
                                return t.virtual === !0
                            }), a.normal = e.filter(function (t) {
                                return t.virtual === !1
                            }), a.event_permission = t.event_permission, n.push(a)
                        }), t.dataAnalyticsInfo = n, t.renderPage(n)
                    }
                })
            })
        }, renderSelect: function (t, e) {
            var a = e.event_permission.events;
            t.eventDropdown("destroy").eventDropdown({
                eventNames: a,
                multiple: !0,
                nonSelectedText: sensorsdata.languages.get("任意事件<!--{en}$Anything-->"),
                multiselectOption: {
                    includeSelectAllOption: !0, buttonText: function (t) {
                        var e = "";
                        return e = t.length ? sensorsdata.util.format(sensorsdata.languages.get("#{length} 个<!--{en}#{length} items-->"), {length: t.length}) : sensorsdata.languages.get("任意事件<!--{en}$Anything-->")
                    }, nonSelectedText: sensorsdata.languages.get("任意事件<!--{en}$Anything-->")
                },
                onChange: function () {
                    t.parents("tr:first").find("#editOk").removeAttr("disabled")
                }
            })
        }, renderPage: function (t) {
            var e = sensorsdata.CONSTSET.paginationSize, a = this, n = $("#auth_ananlytics_table_none_state"),
                s = sensorsdata.bind(function (e, n) {
                    e -= 1;
                    var s = t.slice(e, n);
                    a.eleAnalyticsTableContainer.html(Mustache.render(a.tplAnalyticsTable, s)), s.forEach(function (t) {
                        var e = a.eleAnalyticsTableContainer.find("tr[data-id=" + t.id + "] .auth-grant-table-edit");
                        a.renderSelect(e, t)
                    })
                }, this);
            if (0 === t.length) {
                if (!$.trim(a.inputAuthAnalytics.val())) return n.hide(), a.eleContainerAnalytics.html(a.tplNoAnaAccount), void a.eleContainerAnalytics.find("#table-pagination").html("").hide();
                n.show()
            }
            t.length <= e ? (a.eleContainerAnalytics.find("#table-pagination").html("").hide(), s(1, t.length)) : sensorsdata.pagination({
                tableElement: a.eleContainerAnalytics.find("#table-pagination").show(),
                totalItems: t.length,
                pageItems: 10,
                clickHandle: sensorsdata.bind(function (t) {
                    s(t.range[0], t.range[1])
                }, this)
            })
        }, showAuthGrant: function (t) {
            var e = this, a = {};
            a.glist = t;
            var n = $("#auth_grant_table_none_state");
            $.isArray(a.glist) && 0 === a.glist.length ? n.show() : n.hide();
            var s = Mustache.render(e.tplGrantTable, a);
            e.eleGrantTableContainer.html(s), $("#auth_grant_total_users").html(a.glist.length)
        }, showAuthAccount: function (t, e) {
            t = t || this.dataAccountInfo;
            var a = {}, n = {};
            this.dataRoles.forEach(function (t) {
                n[t.id] = t
            }), a.roles = this.dataRoles, a.glist = t, a.not_self = function () {
                return "admin" === this.username || this.id === sensorsdata.authority.userId ? !1 : !0
            }, a.not_admin = function () {
                return "admin" !== this.username
            }, a.not_admin_self = function () {
                return "admin" !== this.username || "admin" === this.username && "admin" === sensorsdata.authority.userName
            }, a.role_fix = function () {
                return n[this.real_role_id] && n[this.real_role_id].name
            }, e && $.extend(a, e);
            var s = this;
            this.eleContainerAccount.show(), this.eleAccountContainerCreate.hide();
            var i = $("#events_meta_table_none_state");
            s.eleAccountTableContainer.html(""), $.isArray(a.glist) && 0 === a.glist.length ? i.show() : i.hide();
            var r = Mustache.render(s.tplAccountTable, a);
            s.eleAccountTableContainer.html(r), sensorsdata.pagination({
                pageItems: 30,
                tableElement: this.eleContainerAccount,
                renderAll: function () {
                    return s.eleContainerAccount.find("table tbody tr")
                }
            }), $("#auth_account_total_users").html(a.glist.length)
        }, getDashUser: function (t, e) {
            var a = this;
            sensorsdata.ajax({
                url: "dashboards/" + t + "/users", success: function (t) {
                    var n = {};
                    $.isArray(t) && t.length > 0 && $.each(t, function (t, e) {
                        n[e.id] = !0
                    }), a.dataDashUser = n, e(n)
                }
            })
        }, showAuthGrantEditTable: function (t, e, a) {
            var n = {}, s = this, i = {};
            this.dataRoles.forEach(function (t) {
                i[t.id] = t
            }), t = t || this.dataDashUser, e = e || this.dataAccountInfo, a && $.extend(n, a), n.glist = $.grep(e, function (t) {
                return t.id !== sensorsdata.authority.userId
            }), n.is_exist = function () {
                return this.id in t
            }, n.role_fix = function () {
                return i[this.real_role_id] && i[this.real_role_id].name
            };
            var r = Mustache.render(this.tplGrantTableEdit, n);
            this.eleGrantTableEdit.html(r), sensorsdata.pagination({
                pageItems: 30,
                tableElement: this.eleGrantEditContent,
                renderAll: function () {
                    return s.eleGrantEditContent.find("table tbody tr")
                }
            })
        }, showAuthGrantEdit: function (t, e) {
            this.eleContainerGrant.hide(), this.eleContainerGrantEdit.show(), this.dataDashId = t;
            var a = this;
            $("#auth_grant_edit_dash_name").text(e), this.getDashUser(this.dataDashId, function (t) {
                this.dataDashUser = t, a.dataAccountInfo ? a.tableSort({
                    flag: "",
                    name: "username"
                }, !0) : a.ajaxAccountInfo(function (t) {
                    a.dataAccountInfo = t.users, a.dataRoles = t.roles, a.tableSort({flag: "", name: "username"}, !0)
                })
            })
        }, showAuthAccountCreate: function () {
            this.eleContainerAccount.hide(), this.eleAccountContainerCreate.show(), this.eleAccountTableCreate.html("")
        }, addAuthAccountCreate: function () {
            var t = $(Mustache.render(this.tplAccountTableCreate, {
                roles: this.dataRoles,
                randomPWD: sensorsdata.getRandomCharacter(6).join("")
            })).hide();
            this.eleAccountTableCreate.append(t);
            var e = this;
            t.fadeIn(), t.find(".auth-account-table-create-username").off("keyup").on("keyup", function () {
                e.verifyUsername($(this))
            }), t.find(".auth-account-table-create-pwd").off("keyup").on("keyup", function () {
                e.verifyPwd($(this))
            })
        }, verifyUsername: function (t) {
            var e = t.val().trim();
            if (sensorsdata.cache.config.username_must_be_email === !0) {
                if (!sensorsdata.CONSTSET.emailReg.test(e)) return sensorsdata.form.addError(t, sensorsdata.languages.get("必须是邮箱<!--{en}Must be a mail format-->"), !0), !1
            } else if (!/^\w+$/.test(e)) return sensorsdata.form.addError(t, sensorsdata.languages.get("只能包含字母、数字、下划线<!--{en}Can only contain letters, numbers and underscores-->"), !0), !1;
            return e.length < 2 || e.length > 40 ? (sensorsdata.form.addError(t, sensorsdata.languages.get("必须大于 2 位，小于 40 位<!--{en}Must be greater than 2 bits, less than 40 bits-->"), !0), !1) : (sensorsdata.form.removeError(t), !0)
        }, verifyPwd: function (t) {
            var e = t.val().trim();
            return e.length < 6 || e.length > 20 ? (sensorsdata.form.addError(t, sensorsdata.languages.get("必须大于 6 位，小于 20 位<!--{en}Must be greater than 6 bits, less than 20 bits-->"), !0), !1) : (sensorsdata.form.removeError(t), !0)
        }, saveAuthAccountCreate: function () {
            var t = this, e = [], a = !1, n = this.eleAccountTableCreate.find("tr");
            if (0 === n.length) return sensorsdata.info.show(sensorsdata.languages.get("请至少添加一个账号<!--{en}Please add at least one account-->")), !1;
            if (n.each(function (n, s) {
                var i = $(s).find(".auth-account-table-create-username"),
                    r = $(s).find(".auth-account-table-create-role"), o = $(s).find(".auth-account-table-create-pwd");
                t.verifyUsername(i) && t.verifyPwd(o) ? e.push({
                    username: i.val().trim(),
                    role: r.val().trim(),
                    password: o.val().trim()
                }) : a = !0
            }), a) return !1;
            var s = {success: !0, user_role: ""};
            sensorsdata.ajax({
                url: "account",
                data: JSON.stringify(e),
                contentType: "application/json",
                type: "put",
                showCommonError: !1,
                success: function () {
                    e.map(function (t) {
                        s.username = t.username, s.user_role = t.role, sensorsdata.track("create_user", s)
                    }), sensorsdata.info.show(sensorsdata.languages.get("创建账号成功<!--{en}Successfully create the account-->")), t.getAuthAccount()
                },
                error: function (t) {
                    e.map(function (e) {
                        s.username = e.username, s.success = !1, s.fail_reason = t.status, s.user_role = e.role, sensorsdata.track("create_user", s)
                    }), sensorsdata.error.show(400 === t.status ? sensorsdata.languages.get("用户名不合法<!--{en}User name is invalid-->") : 409 === t.status ? sensorsdata.languages.get("用户名已存在<!--{en}User name exists-->") : sensorsdata.languages.get("创建失败<!--{en}Creation failure-->"))
                }
            })
        }, checkToShow: function () {
            this.dataHash = sensorsdata.unparam(location.hash);
            var t = this.dataHash.type;
            sensorsdata.authority.isAdmin ? t = t || "account" : sensorsdata.authority.isAnalyst && (t = "grant", this.eleTabs.find('li[data-type="account"]').hide(), this.eleTabs.find('li[data-type="analytics"]').hide()), "grant" === t ? (this.eleTabs.find('li[data-type="grant"]').addClass("on"), this.eleTabs.find('li[data-type="account"]').removeClass("on"), this.eleTabs.find('li[data-type="analytics"]').removeClass("on"), this.getAuthGrant()) : "account" === t ? (this.eleTabs.find('li[data-type="grant"]').removeClass("on"), this.eleTabs.find('li[data-type="analytics"]').removeClass("on"), this.eleTabs.find('li[data-type="account"]').addClass("on"), this.getAuthAccount()) : "analytics" === t && (this.eleTabs.find('li[data-type="grant"]').removeClass("on"), this.eleTabs.find('li[data-type="account"]').removeClass("on"), this.eleTabs.find('li[data-type="analytics"]').addClass("on"), this.getAnalytics())
        }, events_: function () {
            var t = this;
            this.eleTabs.on("click", "li", function () {
                return $(this).hasClass("on") ? !1 : (window.history.pushState("auth-type", "", "#type=" + $(this).attr("data-type")), void t.reload())
            }), $("#auth_account_create_btn").on("click", function () {
                t.showAuthAccountCreate(), t.addAuthAccountCreate()
            }), this.btnAccountMore.on("click", function () {
                t.addAuthAccountCreate()
            }), this.btnAccountConfirm.on("click", function () {
                t.saveAuthAccountCreate()
            }), this.btnAccountCancel.on("click", function () {
                t.showAuthAccount()
            }), this.eleAccountTableCreate.on("click", ".btn-auth-table-create-delete", function () {
                $(this).closest("tr").remove()
            }), this.eleAccountTableContainer.on("click", ".auth-manage-table-edit-role", function () {
                t.selectIsSelecting && t.selectIsSelecting.is(":visible") && t.selectIsSelecting.hide().prev().show(), t.selectIsSelecting = $(this).hide().next().show(), t.selectIsSelecting.get(0).selectedIndex = 0
            }), this.eleAccountTableContainer.on("change", ".auth-manage-table-edit-role-select", function () {
                var e = $(this), a = Number(e.val()), n = Number(e.attr("data-selected"));
                if (-1 === a || n === a) e.hide().prev().show(); else {
                    var s = $(this).closest("tr").attr("data-id");
                    sensorsdata.ajax({
                        url: "account/" + s,
                        data: JSON.stringify({role: a}),
                        contentType: "application/json",
                        type: "post",
                        success: function () {
                            t.getAuthAccount()
                        }
                    })
                }
            }), this.eleAnalyticsTableContainer.on("click", "button.analytics", function (e) {
                sensorsdata.track("auth_analyst");
                var a = $(e.target || e.srcElement), n = a.attr("data-id"),
                    s = a.parents("tr:first").find(".auth-grant-table-edit").data("selected-event"),
                    i = {type: "", events: []}, r = $("#" + n).find("option").size();
                s.length === r ? (i.type = "ALL", i.events = []) : (i.type = "ALLOW", i.events = s), sensorsdata.ajax({
                    url: "account/event_permission/" + n,
                    data: JSON.stringify(i),
                    type: "post",
                    success: function () {
                        a.attr("disabled", "disabled"), t.dataAnalyticsInfo.map(function (t) {
                            t.id === Number(n) && (t.event_permission = i)
                        })
                    }
                })
            }), this.eleAccountTableContainer.on("click", ".btn-auth-account-reset-delete", function () {
                var e = $(this).closest("tr");
                sensorsdata.popover({
                    ele: $(this),
                    showNow: !0,
                    footer: $("#tpl_popover_footer_state_3").html(),
                    content: sensorsdata.languages.get("确认删除吗？该账号创建的数据概览，书签和漏斗也会被删除。<!--{en}Confirm delete? The account created by the account dashboard, bookmarks and funnel will also be deleted.-->"),
                    success: function () {
                        sensorsdata.ajax({
                            url: "account/" + e.attr("data-id"), type: "delete", success: function () {
                                t.getAuthAccount()
                            }
                        })
                    }
                }), sensorsdata.languages.update()
            }), this.eleAccountTableContainer.on("click", ".btn-auth-account-reset-pwd", function () {
                $(this).hide().next().show().find("input").focus()
            }), this.eleAccountTableContainer.on("click", ".btn-auth-account-reset-pwd-cancel", function () {
                $(this).closest("td").find(">div").hide().prev("a").show()
            }), this.eleAccountTableContainer.on("click", ".btn-auth-account-reset-pwd-confirm", function () {
                var e = $(this).closest("tr").attr("data-id"), a = $(this).closest("td").find("input"), n = $(this);
                t.verifyPwd(a) && sensorsdata.ajax({
                    url: "account/" + e,
                    data: JSON.stringify({password: a.val().trim()}),
                    contentType: "application/json",
                    type: "post",
                    isEncrypt: !0,
                    success: function () {
                        sensorsdata.info.show(sensorsdata.languages.get("重置密码成功<!--{en}Successfully reset password -->")), n.closest("td").find(">div").hide().prev("a").show()
                    }
                })
            }), this.eleAccountTableContainer.on("click", "thead th[data-sort]", function () {
                t.tableSort($(this))
            }), this.eleGrantTableEdit.on("click", "thead th[data-sort]", function () {
                t.tableSort($(this), !0)
            }), this.eleAnalyticsTableContainer.on("click", "thead th[data-sort]", function () {
                t.tableSort($(this), !0)
            });
            var e = null;
            this.inputAuthAccount.on("keyup", function () {
                var a = $(this), n = $.trim(a.val());
                a.data("inputVal") && a.data("inputVal") === n || (a.data("inputVal", n), e && clearTimeout(e), e = setTimeout(function () {
                    t.showSuggestView(n, "account")
                }, 500))
            });
            var a = null;
            this.eleGrantEditContent.on("keyup", ".events-manage-head-filter", function () {
                var n = $(this), s = $.trim(n.val());
                n.data("inputVal") && n.data("inputVfal") === s || (n.data("inputVal", s), a && clearTimeout(e), a = setTimeout(function () {
                    t.showSuggestView(s, "grantEdit")
                }, 500))
            });
            var n = null;
            this.inputAuthGrant.on("keyup", function () {
                var e = $(this), a = $.trim(e.val());
                e.data("inputVal") && e.data("inputVal") === a || (e.data("inputVal", a), n && clearTimeout(n), n = setTimeout(function () {
                    t.showSuggestView(a, "grant")
                }, 500))
            });
            var s = null;
            this.inputAuthAnalytics.on("keyup", function () {
                var e = $(this), a = $.trim(e.val());
                e.data("inputVal") && e.data("inputVal") === a || (e.data("inputVal", a), s && clearTimeout(s), s = setTimeout(function () {
                    t.showSuggestView(a, "analytics")
                }, 500))
            }), this.eleGrantTableContainer.on("change", ".auth-grant-edit-select", function () {
                var e = $(this), a = Number(e.val()), n = Number(e.attr("data-role")), s = {},
                    i = $(this).closest("tr").attr("data-id"), r = $(this).closest("tr").attr("data-name");
                sensorsdata.track("auth_dashboard", {auth_type: e.find("option:checked").text()}), 2 === a ? 2 === n ? t.showAuthGrantEdit(i, r) : sensorsdata.ajax({
                    url: "dashboards/" + i,
                    data: JSON.stringify({is_public: 0}),
                    contentType: "application/json",
                    type: "post",
                    success: function () {
                        t.showAuthGrantEdit(i, r)
                    }
                }) : n === a || -1 === a ? e.closest(".auth-grant-table-edit").hide().prev().show() : (s = 1 === a ? {is_public: 1} : {
                    is_public: 0,
                    share: 0
                }, sensorsdata.ajax({
                    url: "dashboards/" + i,
                    data: JSON.stringify(s),
                    contentType: "application/json",
                    type: "post",
                    success: function () {
                        t.getAuthGrant()
                    }
                }))
            }), this.eleGrantTableContainer.on("click", ".events-manage-edit-btn", function () {
                t.selectIsSelecting && t.selectIsSelecting.is(":visible") && t.selectIsSelecting.closest(".auth-grant-table-edit").hide().prev().show(), t.selectIsSelecting = $(this).hide().next().show().find(".auth-grant-edit-select"), t.selectIsSelecting.get(0).selectedIndex = 0
            }), this.eleGrantTableEdit.on("change", ".input-auth-grant-edit-checked input", function () {
                sensorsdata.ajax($(this).is(":checked") ? {
                    url: "dashboards/" + t.dataDashId + "/users/" + $(this).closest("tr").attr("data-id"),
                    type: "put"
                } : {
                    url: "dashboards/" + t.dataDashId + "/users/" + $(this).closest("tr").attr("data-id"),
                    type: "delete"
                })
            }), this.eleAnalyticsTableEdit.on("change", ".input-auth-grant-edit-checked input", function () {
                sensorsdata.ajax($(this).is(":checked") ? {
                    url: "dashboards/" + t.dataDashId + "/users/" + $(this).closest("tr").attr("data-id"),
                    type: "put"
                } : {
                    url: "dashboards/" + t.dataDashId + "/users/" + $(this).closest("tr").attr("data-id"),
                    type: "delete"
                })
            }), $("#btn_auth_manage_grant_edit_back").on("click", function () {
                t.getAuthGrant()
            }), this.eleGrantTableContainer.on("click", ".auth-grant-user-edit-range", function () {
                var e = $(this).closest("tr").attr("data-id"), a = $(this).closest("tr").attr("data-name");
                t.showAuthGrantEdit(e, a)
            }), "admin" === sensorsdata.authority.userName && sensorsdata.ajax({
                url: "account/token",
                success: function (t) {
                    "object" == typeof t && t.token && ($("#auth_manage_view_api_token").show(), sensorsdata.popover({
                        ele: $("#auth_manage_view_api_token"),
                        template: null,
                        placement: "left",
                        content: sensorsdata.util.format(sensorsdata.languages.get(' <span class="text-info">您的 API Secret 是:<br/><input class="text-info" style="width:100%;" type="text" value="#{token}"></span><br/><span class="text-warning" style="font-size: 12px;">注: 修改 admin 密码会导致 API Secret 变化</span><!--{todo}-->'), {token: t.token})
                    }))
                }
            })
        }
    }, n.prototype.init = function () {
        this.para.closeLoading(), this.checkToShow(), this.events_()
    }, n.prototype.unload = function () {
    }, n.prototype.reload = function () {
        this.checkToShow()
    }, a.exports = n
});
;
/*!pages/channelManage/channelManage.js*/
define("pages/channelManage/channelManage", function (e, n, a) {
    function t(e) {
        this.queryParams = sensorsdata.unparam(window.location.hash), this.options = e, this.$container = e.container, this.channelSupportedList = [], this.campaignsList = [], this.init(), sensorsdata.languages.update()
    }

    var i = e("components/model/properties"), s = e("components/model/channel"),
        l = e("components/basicTable/basicTable"), o = e("components/tableFilterPanel/tableFilterPanel"),
        r = e("components/channel/shortLinkAnalysisForm/shortLinkAnalysisForm"),
        d = e("components/channel/buildSuccessPage/buildSuccessPage"),
        c = e("components/channel/buildShortLinkForm/buildShortLinkForm"),
        p = e("components/channel/batchBuildLinkForm/batchBuildLinkForm"),
        m = e("components/channel/showLinkDetail/showLinkDetail"), h = {
            container: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<div id="channelManage">\n  <div class="top-bar">\n    <ul class="panel-list-btn">\n      <li class="active" data-link="link-manage">渠道链接<!--{en}Channel Links--></li>\n      <li data-link="activity-manage">活动管理<!--{en}Activity management--></li>\n      <li data-link="doc-manage">渠道管理<!--{en}Channel management--></li>\n    </ul>\n    <a href="#" data-method="short-link-analysis">\n      <span class="icon-link"></span>\n      <span>短链解析<!--{en}Short link analysis--></span>\n    </a>\n  </div>\n  <div class="channel-manage">\n    <div class="panel-list">\n      <div class="link-manage">\n        <div class="channel-tool-bar">\n          <span class="links-table-row-num">共<span></span>项<!--{en}<span></span> in total--></span>\n          <div>\n            <span data-toggle="tooltip" data-original-title="导出表格" data-lang-data-original-title="<!--{en}Export table-->" data-method="export"><span class="icon-download"></span></span><!--\n          --><div class="common-select border links-table-order">\n              <select>\n                <option value="1">创建时间升序<!--{en}Create time in ascending order--></option>\n                <option value="-1">创建时间降序<!--{en}Create time in descending order--></option>\n                <option value="2">更新时间升序<!--{en}Update the time ascending order--></option>\n                <option value="-2" selected="selected">更新时间降序<!--{en}Update the time descending order--></option>\n              </select>\n            </div><!--\n          --><div class="search-links">\n              <input class="common-input global-filter" type="text" placeholder="搜索链接">\n              <span class="icon-search"></span>\n              <span class="icon-remove"></span>\n            </div><!--\n          --><div class="dropdown">\n              <button type="button" class="dropdown-toggle btn btn-primary" data-toggle="dropdown">\n                <span class="icon-add"></span>\n                <span>新建链接<!--{en}Create new link--></span>\n              </button>\n              <ul class="dropdown-menu pull-right" role="menu">\n                <li>\n                  <a data-method="build-short-link" data-value="build-short-link">\n                    <span class="add"><span class="icon-add"></span></span>\n                    <span>新建链接<!--{en}Create new link--></span>\n                  </a>\n                </li>\n                <li>\n                  <a data-method="batch-build-short-link" data-value="batch-build-short-link">\n                    <span class="add"><span class="icon-add"></span></span>\n                    <span>批量新建<!--{en}Batch creation--></span>\n                  </a>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n        <div class="channel-delete-tool-bar">\n          <span data-method="delete-select-item">\n            <span class="icon-delete"></span>\n          </span>\n          <span>选择<span class="select-num"> </span>项</span>\n          <button class="btn btn-default" data-method="select-cancel">取消<!--{en}Cancel--></button>\n        </div>\n        <div class="common-table links-table-container"></div>\n      </div>\n      <div class="activity-manage">\n        <div class="channel-tool-bar">\n          <span class="campaign-table-row-num">共<span></span>项</span>\n        </div>\n        <div class="common-table campaign-table-container"></div>\n      </div>\n      <div class="doc-manage"></div>\n    </div>\n  </div>\n</div>'
                }, useData: !0
            }), emptyTable: Handlebars.template({
                1: function (e) {
                    return "    <div>" + this.escapeExpression(this.lambda(e, e)) + "</div>\n"
                }, compiler: [6, ">= 2.0.0-beta.1"], main: function (e, n, a, t) {
                    var i, s, l, o = n.helperMissing, r = "function",
                        d = '<div class="empty-table">\n  <img src="/res/img/' + this.escapeExpression((s = null != (s = n.img || (null != e ? e.img : e)) ? s : o, typeof s === r ? s.call(e, {
                            name: "img",
                            hash: {},
                            data: t
                        }) : s)) + '.png">\n  <div>\n';
                    return s = null != (s = n.tip || (null != e ? e.tip : e)) ? s : o, l = {
                        name: "tip",
                        hash: {},
                        fn: this.program(1, t, 0),
                        inverse: this.noop,
                        data: t
                    }, i = typeof s === r ? s.call(e, l) : s, n.tip || (i = n.blockHelperMissing.call(e, i, l)), null != i && (d += i), d + "  </div>\n</div>"
                }, useData: !0
            }), docManage: Handlebars.template({
                1: function (e, n, a, t) {
                    var i, s = n.helperMissing, l = "function", o = this.escapeExpression;
                    return '  <div data-method="view-doc" data-wiki-path="' + o((i = null != (i = n.name || (null != e ? e.name : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "name",
                        hash: {},
                        data: t
                    }) : i)) + '" class="item" data-toggle="tooltip" data-original-title="' + o((i = null != (i = n.cname || (null != e ? e.cname : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "cname",
                        hash: {},
                        data: t
                    }) : i)) + '">\n    <div class="background" style="background-image: url(\'/res/img/channel/' + o((i = null != (i = n.name || (null != e ? e.name : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "name",
                        hash: {},
                        data: t
                    }) : i)) + '.png?__sprite\')"></div>\n    <div class="channel-name">' + o((i = null != (i = n.cname || (null != e ? e.cname : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "cname",
                        hash: {},
                        data: t
                    }) : i)) + "</div>\n  </div>\n"
                }, compiler: [6, ">= 2.0.0-beta.1"], main: function (e, n, a, t) {
                    var i, s, l,
                        o = '<div class="info">主流平台，全面覆盖<!--{en}Mainstream platform, comprehensive coverage--></div>\n<div class="doc-container">\n';
                    return s = null != (s = n.data || (null != e ? e.data : e)) ? s : n.helperMissing, l = {
                        name: "data",
                        hash: {},
                        fn: this.program(1, t, 0),
                        inverse: this.noop,
                        data: t
                    }, i = "function" == typeof s ? s.call(e, l) : s, n.data || (i = n.blockHelperMissing.call(e, i, l)), null != i && (o += i), o + "</div>\n"
                }, useData: !0
            }), linkName: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function (e, n, a, t) {
                    var i, s = n.helperMissing, l = "function", o = this.escapeExpression;
                    return '  <span class="link-name" data-originname=' + o((i = null != (i = n.name || (null != e ? e.name : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "name",
                        hash: {},
                        data: t
                    }) : i)) + " data-id=" + o((i = null != (i = n.id || (null != e ? e.id : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "id",
                        hash: {},
                        data: t
                    }) : i)) + ">" + o((i = null != (i = n.name || (null != e ? e.name : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "name",
                        hash: {},
                        data: t
                    }) : i)) + '</span>\n  <span data-method="edit-link-name" class="icon-edit"></span>\n'
                }, useData: !0
            }), checkbox: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function (e, n, a, t) {
                    var i, s = n.helperMissing, l = "function", o = this.escapeExpression;
                    return '<label class="common-checkbox check-' + o((i = null != (i = n.name || (null != e ? e.name : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "name",
                        hash: {},
                        data: t
                    }) : i)) + '">\n  <input value="' + o((i = null != (i = n.data || (null != e ? e.data : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "data",
                        hash: {},
                        data: t
                    }) : i)) + '" name="' + o((i = null != (i = n.name || (null != e ? e.name : e)) ? i : s, typeof i === l ? i.call(e, {
                        name: "name",
                        hash: {},
                        data: t
                    }) : i)) + '" type="checkbox"/>\n  <span class="checkbox-icon"></span>\n</label>'
                }, useData: !0
            }), slidePgaeContent: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function (e, n, a, t) {
                    var i;
                    return '<div class="channel-panel ' + this.escapeExpression((i = null != (i = n.className || (null != e ? e.className : e)) ? i : n.helperMissing, "function" == typeof i ? i.call(e, {
                        name: "className",
                        hash: {},
                        data: t
                    }) : i)) + '">\n</div>'
                }, useData: !0
            }), unknown: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<span class="unknown">未填写</span>'
                }, useData: !0
            }), operation: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function (e, n, a, t) {
                    var i, s, l = this.lambda, o = this.escapeExpression;
                    return '<span data-toggle="tooltip" data-original-title="跳转事件分析，查看链接效果" data-method="analysis" class="disabled icon-nav-event-analysis" data-type="link" data-campaign="' + o(l(null != (i = null != e ? e.parameters : e) ? i.utm_campaign : i, e)) + '" data-source="' + o(l(null != (i = null != e ? e.parameters : e) ? i.utm_source : i, e)) + '" data-medium="' + o(l(null != (i = null != e ? e.parameters : e) ? i.utm_medium : i, e)) + '" data-term="' + o(l(null != (i = null != e ? e.parameters : e) ? i.utm_term : i, e)) + '" data-content="' + o(l(null != (i = null != e ? e.parameters : e) ? i.utm_content : i, e)) + '"></span>\n<span class="icon-delete" data-id="' + o((s = null != (s = n.id || (null != e ? e.id : e)) ? s : n.helperMissing, "function" == typeof s ? s.call(e, {
                        name: "id",
                        hash: {},
                        data: t
                    }) : s)) + '" data-method="delete-item"></span>'
                }, useData: !0
            }), del: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<div class="popover">\n    <div class="arrow"></div>\n    <h2 class="popover-title"></h2>\n    <div class="popover-content"></div>\n    <div class="popover-content-footer clearfix">\n      <div class="popover-footer-right">\n        <button type="button" class="pop-is-cancel btn-link">取消<!--{en}Cancel--></button>\n        <button type="button" class="pop-is-success btn btn-primary">确定<!--{en}Ok--></button>\n      </div>\n    </div>\n  </div>'
                }, useData: !0
            })
        }, u = {
            table: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<table class="display nowrap" width="100%">\n  <thead>\n  </thead>\n  <tbody>\n  </tbody>\n</table>\n'
                }, useData: !0
            }), header: Handlebars.template({
                1: function (e) {
                    return '  <th class="sortable"><span>' + this.escapeExpression(this.lambda(e, e)) + '</span><span class="icon_selector"></span></th>\n'
                }, compiler: [6, ">= 2.0.0-beta.1"], main: function (e, n, a, t) {
                    var i;
                    return "<tr>\n" + (null != (i = n.each.call(e, null != e ? e.header : e, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, t, 0),
                        inverse: this.noop,
                        data: t
                    })) ? i : "") + "</tr>\n"
                }, useData: !0
            }), body: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return ""
                }, useData: !0
            })
        }, g = {
            table: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<table class="display nowrap" width="100%">\n  <thead>\n  </thead>\n  <tbody>\n  </tbody>\n</table>\n'
                }, useData: !0
            }), header: Handlebars.template({
                1: function (e, n, a, t) {
                    var i, s, l, o = n.helperMissing, r = "function", d = n.blockHelperMissing,
                        c = '  <th class="sortable" style="width: ' + this.escapeExpression((s = null != (s = n.width || (null != e ? e.width : e)) ? s : o, typeof s === r ? s.call(e, {
                            name: "width",
                            hash: {},
                            data: t
                        }) : s)) + '">\n    <span>' + (null != (s = null != (s = n.html || (null != e ? e.html : e)) ? s : o, i = typeof s === r ? s.call(e, {
                            name: "html",
                            hash: {},
                            data: t
                        }) : s) ? i : "") + "</span>\n";
                    return s = null != (s = n.tip || (null != e ? e.tip : e)) ? s : o, l = {
                        name: "tip",
                        hash: {},
                        fn: this.program(2, t, 0),
                        inverse: this.noop,
                        data: t
                    }, i = typeof s === r ? s.call(e, l) : s, n.tip || (i = d.call(e, i, l)), null != i && (c += i), s = null != (s = n.search || (null != e ? e.search : e)) ? s : o, l = {
                        name: "search",
                        hash: {},
                        fn: this.program(4, t, 0),
                        inverse: this.noop,
                        data: t
                    }, i = typeof s === r ? s.call(e, l) : s, n.search || (i = d.call(e, i, l)), null != i && (c += i), c + '    <span class="icon_selector"></span>\n  </th>\n'
                }, 2: function (e) {
                    return '    <span class="icon-help" data-toggle="tooltip" data-original-title="' + this.escapeExpression(this.lambda(e, e)) + '" data-placement="right"></span>\n'
                }, 4: function (e) {
                    return '    <span class="icon-filter-set" data-method="filter" data-type="' + this.escapeExpression(this.lambda(e, e)) + '"></span>\n'
                }, compiler: [6, ">= 2.0.0-beta.1"], main: function (e, n, a, t) {
                    var i;
                    return "<tr>\n" + (null != (i = n.each.call(e, null != e ? e.header : e, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, t, 0),
                        inverse: this.noop,
                        data: t
                    })) ? i : "") + "</tr>\n"
                }, useData: !0
            }), body: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return ""
                }, useData: !0
            })
        };
    t.prototype = {
        filterParams: {sort_type: -2}, eventsProp: {}, init: function () {
            this.initLayout(), this.getChannelSupported(), this.initEvents()
        }, unload: function () {
            this.linksTableInstance && this.linksTableInstance.destroy(), this.campaignTableInstance && this.campaignTableInstance.destroy(), this.tableFilterPanel && this.tableFilterPanel.destroy(), this.linkDetail && this.linkDetail.destroy(), this.$container.find('[data-toggle="tooltip"]').tooltip("destroy"), $(window).off("resize.channelManage")
        }, initLayout: function () {
            this.$container.html(h.container()), this.options.closeLoading(), this.renderCampaigns()
        }, initSlidePgae: function () {
            var e = this;
            if (!this.slidePgae) {
                var n = sensorsdata.createSlidePage();
                n.on("save", function () {
                    this.hide()
                }), n.on("cancel", function () {
                    this.hide()
                }), n.on("hide", function () {
                    sensorsdata.form.removeChildrenError(this.$container), e.batchBuildLink && (e.batchBuildLink.destroy(), e.batchBuildLink = null)
                }), this.slidePgae = n
            }
        }, initEvents: function () {
            var e = this, n = this.$container;
            this.initSlidePgae(), $(window).off("resize.channelManage").on("resize.channelManage", function () {
                setTimeout(function () {
                    e.filterLinks({}), e.fixedChannelSupported()
                }, 0)
            }), n.find(".links-table-order select").multiselect({
                enableFiltering: !1,
                enableCaseInsensitiveFiltering: !1,
                onChange: function (n) {
                    var a = n.val();
                    e.filterParams.sort_type = a, e.filterLinks(e.filterParams)
                }
            }), n.delegate(".global-filter", "keyup", function () {
                var a = $(this), t = e.inter, i = n.find(".search-links .icon-remove"), s = $.trim(a.val());
                a.data("inputVal") && a.data("inputVal") === s || (a.data("inputVal", s), s ? i.show() : i.hide(), t && clearTimeout(t), e.inter = setTimeout(function () {
                    var n = s ? [s] : [];
                    e.filterLinks({global_filter: n})
                }, 500))
            }), n.find(".search-links .icon-remove").on("click.removeSearch", function () {
                n.find(".global-filter").val(""), $(this).hide(), e.filterLinks({global_filter: []})
            }), n.find(".links-table-container").on("page.dt", function () {
                e.resetLinksTableSelect()
            }), n.find(".panel-list-btn [data-link]").off("click.changePanel").on("click.changePanel", function () {
                $(this).siblings().removeClass("active"), $(this).addClass("active");
                var n = $(this).attr("data-link") || "empty";
                $("." + n).siblings().hide(), $("." + n).show(), "link-manage" === n && e.filterLinks({})
            }), n.delegate("[data-method]", "click", function (n) {
                n.preventDefault();
                var a = n.$target = $(this);
                e.handler(a.attr("data-method"), n)
            }), n.delegate('.links-table-container .DTFC_RightWrapper [data-toggle="tooltip"]', "mouseover", function () {
                $(this).tooltip({container: ".links-table-container"}).tooltip("show")
            }), n.undelegate('.check-all [name="all"]', "click.checkAll").delegate('.check-all [name="all"]', "click.checkAll", function () {
                $(this).attr("checked") ? ($(this).removeAttr("checked"), n.find("input[name=id]").removeAttr("checked"), n.find(".channel-tool-bar").show(), n.find(".channel-delete-tool-bar").hide()) : ($(this).attr("checked", "true"), n.find(".DTFC_LeftBodyWrapper input[name=id]").attr("checked", "true"), n.find(".channel-tool-bar").hide(), n.find(".channel-delete-tool-bar").show());
                var e = n.find("input[name=id][checked]").length;
                n.find(".select-num").html(e)
            }), n.undelegate('.check-id [name="id"]', "click.checkId").delegate('.check-id [name="id"]', "click.checkId", function () {
                $(this).attr("checked") ? ($(this).removeAttr("checked"), n.find("input[name=all]").removeAttr("checked"), 0 === n.find("input[name=id][checked]").length && (n.find(".channel-tool-bar").show(), n.find(".channel-delete-tool-bar").hide())) : ($(this).attr("checked", "true"), n.find("input[name=id]").length === n.find("input[name=id][checked]").length && n.find("input[name=all]").attr("checked", "true"), n.find(".channel-tool-bar").hide(), n.find(".channel-delete-tool-bar").show()), n.find(".select-num").html(n.find("input[name=id][checked]").length)
            }), n.delegate(".common-table tbody tr", "mouseover", function () {
                var e = $(this), a = e[0].rowIndex;
                $.isNumeric(a) && ($(this).addClass("hover-row"), n.find(".links-table-container tbody tr:nth-of-type(" + a + ")").addClass("hover-row"))
            }), n.delegate(".common-table tbody tr", "mouseout", function () {
                n.find(".hover-row").removeClass("hover-row")
            }), n.delegate(".link-name", "keydown", function (e) {
                var n = $(this), a = Number(e.keyCode);
                return 13 === a ? (n.blur(), !1) : 27 === a ? (n.text(n.attr("data-originname")), n.attr("contenteditable", !1), !1) : void 0
            }), n.delegate(".link-name", "blur", function () {
                var e = $(this), n = e.text().trim();
                e.scrollLeft(0), e.attr("contenteditable", !1);
                var a = e.attr("data-id");
                if (!a) return sensorsdata.info.show({
                    content: sensorsdata.languages.get("请尝试刷新页面并重试<!--{en}Please try refreshing the page and retry.-->"),
                    duration: 2e3
                });
                if (!n) return e.text(e.attr("data-originname")), sensorsdata.info.show({
                    content: sensorsdata.languages.get("请输入链接名称<!--{en}Please input the link name-->"),
                    duration: 2e3
                });
                if (n !== e.attr("data-originname")) {
                    e.attr("data-originname", n);
                    var t = {name: n};
                    s.setLinkName(a, t, function () {
                        sensorsdata.success.show({content: "更改成功<!--{todo}-->", duration: 2e3})
                    })
                }
            })
        }, handler: function (e, n) {
            var a = n.$target, t = this, i = this.$container;
            if (!a.hasClass("disabled")) switch (e) {
                case"short-link-analysis":
                    this.slidePgae.setTitle('<span class="icon-link"></span> 短链解析'), this.slidePgae.setContent(h.slidePgaeContent({className: "short-link-analysis-content"})), r.create({container: $(".short-link-analysis-content")}), this.slidePgae.show();
                    break;
                case"export":
                    this.downloadLinks();
                    break;
                case"delete-select-item":
                    sensorsdata.popover({
                        ele: a,
                        container: t.$container,
                        placement: "bottom",
                        showNow: !0,
                        template: h.del(),
                        content: sensorsdata.languages.get("确定删除选中项吗?<!--{en}Are you sure you want to delete selected items?-->"),
                        successAfter: function () {
                            var e = [], n = i.find("input[name=id][checked]");
                            n.each(function (n, a) {
                                var t = $(a);
                                e.push(Number(t.val()))
                            }), s.del(e, function () {
                                sensorsdata.success.show({
                                    content: sensorsdata.languages.get("删除成功<!--{en}Delete successfully-->"),
                                    duration: 2e3
                                }), t.filterLinks({}), t.renderCampaigns()
                            })
                        }
                    });
                    break;
                case"delete-item":
                    var l = [a.attr("data-id")];
                    sensorsdata.popover({
                        ele: a,
                        container: t.$container,
                        placement: "bottom",
                        showNow: !0,
                        template: h.del(),
                        content: sensorsdata.languages.get("确定删除这一条吗?<!--{en}Are you sure you want to delete this item?-->"),
                        successAfter: function () {
                            s.del(l, function () {
                                sensorsdata.info.show({
                                    content: sensorsdata.languages.get("删除成功<!--{en}Delete successfully-->"),
                                    duration: 2e3
                                }), t.filterLinks({}), t.renderCampaigns(), a.parents("tr").remove()
                            })
                        }
                    });
                    break;
                case"build-short-link":
                    this.slidePgae.setTitle('<span class="icon-link"></span> 创建渠道链接'), this.slidePgae.setContent(h.slidePgaeContent({className: "build-short-link-content"}));
                    var d = c.create({
                        container: $(".build-short-link-content"),
                        campaignsList: t.campaignsList,
                        channelSupportedList: t.channelSupportedList
                    });
                    d.on("cancel", function () {
                        t.slidePgae.hide()
                    }), d.on("create", function (e) {
                        t.showSuccessPage(e)
                    }), this.slidePgae.show();
                    break;
                case"batch-build-short-link":
                    this.slidePgae.setTitle('<span class="icon-link"></span> 批量创建渠道链接'), this.slidePgae.setContent(h.slidePgaeContent({className: "batch-build-short-link-content"})), this.batchBuildLink = p.create({container: $(".batch-build-short-link-content")}), this.batchBuildLink.on("cancel", function () {
                        t.slidePgae.hide()
                    }), this.batchBuildLink.on("create", function (e) {
                        t.showSuccessPage(e)
                    }), this.slidePgae.show();
                    break;
                case"analysis":
                    var m = {$utm_campaign: a.attr("data-campaign")};
                    "link" === a.attr("data-type") && (m.$utm_source = a.attr("data-source"), m.$utm_medium = a.attr("data-medium"), m.$utm_term = a.attr("data-term"), m.$utm_content = a.attr("data-content"));
                    var u = [];
                    for (var g in t.eventsProp) u.push({event_name: g, aggregator: "general"});
                    u.map(function (e) {
                        var n = [], a = {}, i = t.eventsProp[e.event_name];
                        for (var s in m) i[s] && (a = m[s] ? {
                            field: "event." + e.event_name + "." + s,
                            "function": "equal",
                            params: [m[s]]
                        } : {field: "event." + e.event_name + "." + s, "function": "isEmpty"}, n.push(a));
                        e.filter = {conditions: n}, n.length > 1 && (e.filter.relation = "and")
                    });
                    var f = "#" + $.param({unit: "day", measures: u, rangeText: "今日"}),
                        b = location.origin + "/segmentation/" + location.search + f;
                    window.open(b, "channelAnalysis");
                    break;
                case"select-cancel":
                    i.find("input[checked]").removeAttr("checked"), i.find(".channel-delete-tool-bar").hide(), i.find(".channel-tool-bar").show();
                    break;
                case"filter":
                    t.linkDetail && t.linkDetail.hide();
                    var v = a.attr("data-type"), k = [], y = [], _ = t.filterParams;
                    "channel_type_ids" === v ? (k = t.channelSupportedList.filter(function (e) {
                        return e.is_show
                    }).map(function (e) {
                        return {
                            value: e.id,
                            name: e.cname,
                            checked: _.channel_type_ids && _.channel_type_ids.indexOf(e.id + "") >= 0
                        }
                    }), y = _.cname) : "campaign_filter" === v ? (k = t.campaignsList.map(function (e) {
                        return {
                            value: e.campaign_name,
                            name: e.campaign_name,
                            checked: _.campaign_filter && _.campaign_filter.indexOf(e.campaign_name) >= 0
                        }
                    }), y = _.campaign_filter) : "device_type_filter" === v && (k = [{
                        value: "通用",
                        name: "通用"
                    }, {value: "iOS", name: "iOS"}, {value: "Android", name: "Android"}].map(function (e) {
                        return e.checked = _.device_type_filter && _.device_type_filter.indexOf(e.name) >= 0, e
                    })), this.tableFilterPanel = o.create({
                        ele: a, data: k, type: v, searchFun: function (e) {
                            t.filterLinks(e)
                        }
                    });
                    break;
                case"edit-link-name":
                    var w = a.prev(".link-name");
                    if (w.attr("contenteditable", !0), !w.length) return;
                    if (w[0].focus(), w.scrollLeft(9999), window.getSelection) {
                        var C = window.getSelection();
                        C.selectAllChildren(w[0]), C.collapseToEnd()
                    }
                    break;
                case"view-doc":
                    var L = sensorsdata.CONSTSET.channelDocument + a.attr("data-original-title");
                    window.open(L, "channelDocument")
            }
        }, getAnalysisParams: function () {
            var e = this, n = sensorsdata.cache.eventsMap, a = function (e) {
                var n = ["$utm_campaign", "$utm_source", "$utm_medium", "$utm_term", "$utm_content"], a = {},
                    t = e.intersection.event;
                return t.map(function (e) {
                    n.indexOf(e.name) > -1 && (a[e.name] = e.name)
                }), a
            }, t = ["$pageview", "AppInstall"];
            t.map(function (t) {
                n[t] && i.getEventsProp([t], function (n) {
                    var i = a(n);
                    $.isEmptyObject(i) || e.$container.find('[data-method="analysis"]').removeClass("disabled"), e.eventsProp[t] = i
                })
            })
        }, showSuccessPage: function (e) {
            var n = this;
            n.slidePgae.setContent(h.slidePgaeContent({className: "build-short-link-success"}));
            var a = d.create({container: $(".build-short-link-success"), data: e.data});
            a.on("cancel", function () {
                n.slidePgae.hide()
            }), n.slidePgae.on("hide", function () {
                this.$container.find(".build-short-link-success").length > 0 && (n.filterLinks({}), n.renderCampaigns())
            })
        }, downloadLinks: function () {
            var e = this.filterParams, n = sensorsdata.api.get("channelCsv"),
                a = sensorsdata.languages.get("渠道链接<!--{todo}-->");
            sensorsdata.download(n, e, a)
        }, setFilter: function () {
            var e = this.$container, n = this.filterParams;
            $.isEmptyObject(n.channel_type_ids) ? e.find('[data-method="filter"][data-type="channel_type_ids"]').removeClass("active") : e.find('[data-method="filter"][data-type="channel_type_ids"]').addClass("active"), $.isEmptyObject(n.device_type_filter) ? e.find('[data-method="filter"][data-type="device_type_filter"]').removeClass("active") : e.find('[data-method="filter"][data-type="device_type_filter"]').addClass("active"), $.isEmptyObject(n.campaign_filter) ? e.find('[data-method="filter"][data-type="campaign_filter"]').removeClass("active") : e.find('[data-method="filter"][data-type="campaign_filter"]').addClass("active")
        }, filterLinks: function (e) {
            var n = $.extend(this.filterParams, e);
            this.filterParams = n, this.resetLinksTableSelect(), this.renderLinks(this.filterParams)
        }, getChannelSupported: function () {
            var e = this;
            s.getChannelSupported(function (n) {
                e.channelSupportedList = n, e.renderLinks(e.filterParams), e.renderChannelSupported(n)
            })
        }, renderChannelSupported: function (e) {
            this.$container.find(".doc-manage").html(h.docManage({
                length: e.length,
                data: e
            })), this.$container.find('.doc-manage [data-toggle="tooltip"]').tooltip(), this.fixedChannelSupported()
        }, fixedChannelSupported: function () {
            var e = this.$container.find(".doc-manage").width(), n = 210 * parseInt(e / 210) + "px";
            this.$container.find(".doc-container").css("width", n)
        }, resetLinksTableSelect: function () {
            var e = this.$container;
            e.find("input[checked]").removeAttr("checked"), e.find(".channel-tool-bar").show(), e.find(".channel-delete-tool-bar").hide()
        }, renderLinks: function (e) {
            var n = this, a = {img: "nodata", tip: [sensorsdata.languages.get("没有找到符合条件的渠道链接<!--{todo}-->")]};
            $.isEmptyObject(e.campaign_filter) && $.isEmptyObject(e.channel_type_ids) && $.isEmptyObject(e.device_type_filter) && $.isEmptyObject(e.global_filter) && (a.img = "empty", a.tip = [sensorsdata.languages.get("还未创建渠道链接<!--{todo}-->"), sensorsdata.languages.get("点击上方新建按钮创建你的第一个链接<!--{todo}-->")]);
            var t = [{
                width: "16px",
                data: "id",
                html: h.checkbox({data: "all", name: "all"})
            }, {html: sensorsdata.languages.get("链接名称<!--{todo}-->")}, {
                html: sensorsdata.languages.get("渠道类型<!--{todo}-->"),
                search: "channel_type_ids"
            }, {
                html: sensorsdata.languages.get("设备类型<!--{todo}-->"),
                search: "device_type_filter"
            }, {html: sensorsdata.languages.get("链接<!--{todo}-->")}, {
                html: sensorsdata.languages.get("所属活动<!--{todo}-->"),
                tip: "广告系列名称 utm_campaign",
                search: "campaign_filter"
            }, {
                html: sensorsdata.languages.get("广告来源<!--{todo}-->"),
                tip: "广告系列来源 utm_source"
            }, {
                html: sensorsdata.languages.get("广告媒介<!--{todo}-->"),
                tip: "广告系列媒介 utm_medium"
            }, {
                html: sensorsdata.languages.get("关键词<!--{todo}-->"),
                tip: "广告系列字词 utm_term"
            }, {
                html: sensorsdata.languages.get("广告内容<!--{todo}-->"),
                tip: "广告系列内容 utm_content"
            }, {html: sensorsdata.languages.get("操作<!--{en}Operate-->")}];
            s.getChannelLinks(e, function (e) {
                var i = e.detail_result || [];
                n.channelLinks = i, n.$container.find(".links-table-row-num span").html(e.total_rows);
                var s = {
                    container: n.$container.find(".links-table-container"),
                    tpl: g,
                    dataTableOption: {
                        language: {
                            emptyTable: h.emptyTable(a),
                            info: "当前展示 _START_ - _END_ 行",
                            infoEmpty: ""
                        },
                        ordering: !1,
                        iDisplayLength: 20,
                        fixedColumns: {leftColumns: 2, rightColumns: 1},
                        scrollX: !0,
                        columns: [{
                            targets: 0, data: "id", render: function (e) {
                                return e ? h.checkbox({data: e, name: "id"}) : ""
                            }
                        }, {
                            targets: 1, data: "name", width: "200px", render: function (e, n, a) {
                                return e ? h.linkName({name: e, id: a.id}) : ""
                            }
                        }, {
                            targets: 2, data: "channel_id", render: function (e) {
                                if (e || 0 === e) {
                                    var a = n.channelSupportedList.filter(function (n) {
                                        return n.id === e
                                    });
                                    return a[0] ? a[0].cname : e
                                }
                                return ""
                            }
                        }, {targets: 3, data: "device_type"}, {
                            targets: 4,
                            data: "channel_id",
                            width: "60px",
                            render: function (e, n, a, t) {
                                return e || 0 === e ? '<span data-row="' + t.row + '" data-method="showLink" class="icon-link"></span>' : ""
                            }
                        }, {
                            targets: 5, data: "parameters", render: function (e) {
                                return e ? e.utm_campaign || h.unknown({empty: "" === e.utm_campaign}) : h.unknown()
                            }
                        }, {
                            targets: 6, data: "parameters", render: function (e) {
                                return e ? e.utm_source || h.unknown({empty: "" === e.utm_source}) : h.unknown()
                            }
                        }, {
                            targets: 7, data: "parameters", render: function (e) {
                                return e ? e.utm_medium || h.unknown({empty: "" === e.utm_medium}) : h.unknown()
                            }
                        }, {
                            targets: 8, data: "parameters", render: function (e) {
                                return e ? e.utm_term || h.unknown({empty: "" === e.utm_term}) : h.unknown()
                            }
                        }, {
                            targets: 9, data: "parameters", render: function (e) {
                                return e ? e.utm_content || h.unknown({empty: "" === e.utm_content}) : h.unknown()
                            }
                        }, {
                            targets: 10, data: "id", render: function (e, n, a) {
                                return e ? h.operation(a) : ""
                            }
                        }],
                        columnDefs: [{
                            targets: "_all", render: function (e) {
                                return e ? e : h.unknown({empty: "" === e})
                            }
                        }]
                    },
                    data: {header: {header: t}, body: i},
                    customDrawCallback: function () {
                        n.setLinksMethod(0 !== i.length);
                        var e = n.$container.find(".dataTables_scrollBody");
                        n.$container.find(".DTFC_LeftWrapper").toggleClass("decorate-shadow", e.find("table").width() > e.width()), n.$container.find(".DTFC_RightWrapper").toggleClass("decorate-shadow", e.find("table").width() > e.width()), n.getAnalysisParams(), n.setFilter(), n.$container.find('.links-table-container th [data-toggle="tooltip"]').tooltip(), n.$container.find('[data-method="showLink"]').on("click", function () {
                            var e = $(this), a = e.attr("data-row"), t = n.channelLinks[a];
                            n.linkDetail = m.create({ele: e, data: t, channelSupportedList: n.channelSupportedList})
                        }), n.$container.find(".dataTables_scrollBody").scroll(function () {
                            n.tableFilterPanel && n.tableFilterPanel.hide(), n.linkDetail && n.linkDetail.hide()
                        })
                    }
                };
                0 === i.length && (s.dataTableOption.fixedColumns = !1, s.dataTableOption.scrollX = !1), n.linksTableInstance = l.create(s)
            })
        }, setLinksMethod: function (e) {
            var n = this.$container, a = this.filterParams, t = !0;
            e ? n.find(".links-table-container").removeClass("empty") : n.find(".links-table-container").addClass("empty"), $.isEmptyObject(a.campaign_filter) && $.isEmptyObject(a.channel_type_ids) && $.isEmptyObject(a.device_type_filter) && $.isEmptyObject(a.global_filter) && (t = !1), e = e || t, n.find('[data-method="filter"]').toggle(e), n.find('[data-method="export"]').toggle(e), n.find(".links-table-order").toggle(e), n.find(".search-links").toggle(e)
        }, renderCampaigns: function () {
            var e = this;
            s.getChannelCampaigns(function (n) {
                var a = n || [];
                e.campaignsList = a, e.$container.find(".campaign-table-row-num span").html(a.length);
                var t = {
                    container: e.$container.find(".campaign-table-container"),
                    tpl: u,
                    dataTableOption: {
                        language: {
                            emptyTable: h.emptyTable({
                                img: "empty",
                                tip: [sensorsdata.languages.get("还没有活动<!--{todo}-->")]
                            }), info: "当前展示 _START_ - _END_ 行", infoEmpty: ""
                        },
                        iDisplayLength: 20,
                        order: [[2, "desc"]],
                        columns: [{
                            targets: 0, data: "campaign_name", orderable: !1, render: function (e) {
                                return e ? e : h.unknown({empty: "" === e})
                            }
                        }, {targets: 1, data: "branch_num"}, {targets: 2, data: "latest_use_time"}, {
                            targets: 3,
                            data: "campaign_name",
                            orderable: !1,
                            width: "60px",
                            render: function (e) {
                                return e || "" === e ? '<span data-toggle="tooltip" data-original-title="跳转事件分析，查看链接效果" data-method="analysis" class="disabled icon-nav-event-analysis" data-campaign="' + e + '"></span>' : h.unknown()
                            }
                        }],
                        columnDefs: [{
                            targets: "_all", render: function (e) {
                                return e ? e : h.unknown({empty: "" === e})
                            }
                        }]
                    },
                    data: {
                        header: {header: [sensorsdata.languages.get("活动名称<!--{todo}-->"), sensorsdata.languages.get("链接数量<!--{todo}-->"), sensorsdata.languages.get("最后创建时间<!--{todo}-->"), sensorsdata.languages.get("分析<!--{todo}-->")]},
                        body: a
                    },
                    customDrawCallback: function () {
                        e.$container.find('.campaign-table-container [data-toggle="tooltip"]').tooltip()
                    }
                };
                0 === a.length && (t.dataTableOption.ordering = !1), e.campaignTableInstance = l.create(t)
            })
        }
    }, a.exports = t
});
;
/*!pages/clustering/clustering.js*/
define("pages/clustering/clustering", function (e, a, n) {
    var t = e("components/clustering/head/head"), d = e("components/clustering/body/body"), i = Handlebars.template({
        compiler: [6, ">= 2.0.0-beta.1"], main: function () {
            return '<div class="module-no-authority">\n  <div>\n    <div class="icon"><img src="/res/img/teamwork.png"></div>\n    <p class="msg">访问权限限制</p>\n    <p>请联系账号管理员</p>\n  </div>\n</div>'
        }, useData: !0
    });
    n.exports = function (e) {
        var a = e.container;
        if (a.html(Handlebars.template({
            compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                return '<div id="clustering">\n  <div data-placeholder="header"></div>\n  <div data-placeholder="body"></div>\n</div>'
            }, useData: !0
        })), e.closeLoading(), sensorsdata.authority.isNormal) return void a.html(i());
        var n = t.create({placeholder: a.find("[data-placeholder=header]")}),
            o = d.create({placeholder: a.find("[data-placeholder=body]")});
        this.unload = function () {
            n && $.isFunction(n.destroy) && n.destroy(), o && $.isFunction(o.destroy) && o.destroy()
        }
    }
});
;
/*!pages/clustering/detail.js*/
define("pages/clustering/detail", function (t, a, e) {
    var n = t("components/model/apppush"), i = t("components/model/clustering"),
        s = t("components/clusteringDetail/preprocessor/preprocessor"),
        o = t("components/clusteringDetail/breadcrumbsNav/breadcrumbsNav"),
        r = t("components/clusteringDetail/head/head"), d = t("components/clusteringDetail/headline/headline"),
        l = t("components/clusteringDetail/number/number"), u = t("components/clusteringDetail/chart/chart"),
        c = t("components/clusteringDetail/table/table"), h = t("components/clustering/editor/editor"),
        p = t("components/router/router"), f = {
            NOTALLOWED: "notallowed",
            DISABLED: "disabled",
            ALY_NOTSELF: "analyst-notself",
            TABLE_DISPLAY: 20,
            README: "https://sensorsdata.cn/2.1/manual/user_segmentation.html#2-基准时间"
        }, g = {
            detail: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<div id="clustering-detail" class="clustering-detail">\n  <div data-placeholder="breadcrumbsNav"></div>\n  <div data-placeholder="headline"></div>\n  <div data-placeholder="number"></div>\n  <div data-placeholder="header"></div>\n  <div data-placeholder="chart"></div>\n  <div data-placeholder="table"></div>\n</div>'
                }, useData: !0
            })
        }, m = [{value: [0, 1], text: sensorsdata.languages.get("规则创建<!--{todo}-->")}, {
            value: [2],
            text: sensorsdata.languages.get("结果创建<!--{todo}-->")
        }, {value: [5, 6], text: sensorsdata.languages.get("上传创建<!--{todo}-->")}, {
            value: [7],
            text: sensorsdata.languages.get("SQL 创建<!--{todo}-->")
        }];
    e.exports = function (t) {
        var a = this, e = t.container;
        this.id = parseInt(sensorsdata.unparam(window.location.hash).id), this.clusters = [], this.csvData = [], this.userName = sensorsdata.authority.userName, this.isAnalyst = sensorsdata.authority.isAnalyst, this.isNormal = sensorsdata.authority.isNormal, this.authorityType = "", e.html(g.detail()), this.breadcrumbsNav = o.create({container: e}), this.hd = r.create({
            container: e,
            data: {cname: "-", create_time: "-", type: "-", count: "-"}
        }), this.headline = d.create({
            container: e,
            data: {cname: "-", create_time: "-", type: "-", count: "-"}
        }), this.queryParams = {
            id: this.id,
            from_date: "",
            to_date: "",
            order: "desc"
        }, $.extend(!0, this.queryParams, this.hd.getParams()), h.off("editor.copy").on("editor.copy", function (t) {
            $.extend(!0, a.copy_cluster, t), h.show(a.copy_cluster, a.clusters, function (t) {
                a.copy_cluster = null, i.add(t, function (t) {
                    t.error || (sensorsdata.success.show(sensorsdata.languages.get("创建成功<!--{todo}-->")), i.run(t.id, t.base_time))
                })
            })
        }), i.getDetail(this.id, function (t) {
            a.detailData = t, a.detailData && a.detailData.last_partition && a.hd && (a.hd.refresh(a.detailData), a.headline.refresh(a.detailData), a.headline.off("edit").on("edit", function () {
                a.detailData && (a.copy_cluster = {
                    name: a.detailData.name,
                    cname: a.detailData.cname,
                    type: a.detailData.type,
                    last_partition: {app_push_list: a.detailData.last_partition.app_push_list || []},
                    scheduler: 0 === a.detailData.type ? {running: !0} : $.extend(!0, {}, a.detailData.scheduler),
                    content: $.extend(!0, {}, a.detailData.content)
                }), h.show(a.detailData, a.clusters, function (t) {
                    i.set(t, function (t) {
                        t.error || sensorsdata.success.show(sensorsdata.languages.get("修改成功<!--{todo}-->"))
                    })
                })
            }), a.headline.off("delete").on("delete", function () {
                i.del(a.id, function (t) {
                    t.error || (sensorsdata.success.show(sensorsdata.languages.get("删除成功<!--{en}Delete Success-->")), p.nav("/clustering/"))
                })
            }), a.headline.off("pause").on("pause", function () {
                i.pauseScheduler(a.id, function () {
                    sensorsdata.success.show(sensorsdata.languages.get("已暂停执行分群<!--{en}Paused execution clustering-->")), a.headline.setPopover({running: !1})
                })
            }), a.headline.off("start").on("start", function () {
                i.startScheduler(a.id, function () {
                    sensorsdata.success.show(sensorsdata.languages.get("已启动执行分群<!--{en}Start execution clustering-->")), a.headline.setPopover({running: !0})
                })
            }), a.headline.off("download").on("download", function () {
                a.downloadCsv()
            }), a.headline.off("compute").on("compute", function () {
                var t = a.detailData.last_partition.base_time;
                sensorsdata.info.show(sensorsdata.languages.get("已发起执行，待执行成功后，会整体覆盖之前数据<!--{en}Execution has been initiated and the prior data will be covered after successful execution-->")), i.run(a.id, t)
            }), a.hd.off("change.dateinput").on("change.dateinput", function (t) {
                t.id = a.id, i.trigger("update", t)
            }), (a.isNormal || a.isAnalyst && a.userName !== t.user_name) && (a.authorityType = f.ALY_NOTSELF, a.headline.setToolbar_({
                download: "show",
                refresh: f.NOTALLOWED,
                pause: f.NOTALLOWED,
                "delete": f.NOTALLOWED
            }), a.hd.off("pause").off("start").off("compute")), a.app_push_list_cname = [], n.get(function (n) {
                n.map(function (e) {
                    -1 !== t.last_partition.app_push_list.indexOf(e.id) && a.app_push_list_cname.push(e.cname)
                }), a.nb = l.create({
                    container: e,
                    data: {
                        running: a.detailData.scheduler.running,
                        count: "number" == typeof a.detailData.last_partition.count ? a.detailData.last_partition.count : "-",
                        finished_time: a.detailData.last_partition.finished_time,
                        info: [{
                            key: sensorsdata.languages.get("类型<!--{todo}-->"), value: m.filter(function (t) {
                                return t.value.indexOf(a.detailData.type) > -1
                            })[0].text, name: "cluster-type"
                        }, {
                            key: sensorsdata.languages.get("计算周期<!--{todo}-->"),
                            value: 1 === a.detailData.type || 6 === a.detailData.type || 7 === a.detailData.type ? "例行 按天" : "单次",
                            name: "update-type",
                            isTooltip: !0,
                            tooltip: {data_original_title: 1 === a.detailData.type || 6 === a.detailData.type || 7 === a.detailData.type ? '<a href="' + f.README + '" target="_blank">什么是基准时间</a>' : '<a href="' + f.README + '" target="_blank">什么是基准时间</a>'}
                        }, {
                            key: sensorsdata.languages.get("创建者<!--{todo}-->"),
                            value: a.detailData.user_name || "-",
                            name: "user-name"
                        }, {
                            key: sensorsdata.languages.get("推送平台<!--{todo}-->"),
                            value: $.isEmptyObject(a.detailData.last_partition.app_push_list) ? "-" : a.app_push_list_cname,
                            name: "app-push-list"
                        }],
                        status: a.detailData.last_partition.status
                    }
                })
            })), i.trigger("done.getDetail")
        }), i.off("done.getDetail").on("done.getDetail", function () {
            i.getPartitions({id: a.id, order: "desc"}, function (n) {
                if (t.closeLoading(), n.total > 0 && (a.hd.setParams({
                    from_date: n.result[n.total - 1].base_time,
                    to_date: n.result[0].base_time
                }), $.extend(!0, a.queryParams, a.hd.getParams())), a.detailData && a.detailData.last_partition) {
                    var o = n;
                    s.process({clusterData: a.detailData, partitionData: n, type: "column"}, function (t) {
                        a.chart = u.create({
                            container: e,
                            data: t,
                            type: "column",
                            status: a.detailData.scheduler.running,
                            partitionData: o,
                            clusterData: a.detailData,
                            authority: a.authorityType
                        }), a.chart.off("query").on("query", function (t) {
                            var e = {
                                id: a.detailData.id,
                                filter: {
                                    conditions: [{
                                        "function": "isTrue",
                                        field: "user." + a.detailData.name + "@" + moment(t.base_time).valueOf()
                                    }], relation: "and"
                                },
                                type: a.detailData.type
                            };
                            p.nav("/clustering/cluster-detail/users/#" + $.param(e))
                        }), a.chart.off("download").on("download", function (t) {
                            var e = {id: a.detailData.id, name: a.detailData.name, base_time: t.base_time};
                            i.download(e, sensorsdata.languages.get("用户分群_分群结果_用户列表_SensorsAnalytics<!--{todo}-->"))
                        }), a.chart.off("update").on("update", function (t) {
                            sensorsdata.info.show(sensorsdata.languages.get("已发起执行，待执行成功后，会整体覆盖之前数据<!--{en}Execution has been initiated and the prior data will be covered after successful execution-->")), i.run(a.id, t.base_time)
                        }), a.chart.off("showTip").on("showTip", function () {
                            $("body").off("click.hideChartTip").on("click.hideChartTip", function (t) {
                                t.stopPropagation(), a.chart.hideTip()
                            })
                        }), a.chart.off("hideTip").on("hideTip", function () {
                            $("body").off("click.hideChartTip")
                        })
                    }), 0 === parseInt(n.total) && a.chart && a.chart.renderBlank(), s.process({
                        clusterData: a.detailData,
                        partitionData: n,
                        type: "table"
                    }, function (t) {
                        t.authority = a.authorityType, a.tb = c.create({
                            container: e,
                            data: t,
                            customDrawCallback: function () {
                                "undefined" != typeof a.tb && (a.tb.getCurrentData() || []).length > f.TABLE_DISPLAY && a.tb.$container.find(".dataTables_paginate").css({
                                    opacity: 1,
                                    "pointer-events": "auto"
                                })
                            }
                        }), a.tb.off("refresh").on("refresh", function (t) {
                            i.run(a.id, t.base_time)
                        }), a.tb.off("download").on("download", function (t) {
                            var e = {id: a.detailData.id, name: a.detailData.name, base_time: t.base_time};
                            i.download(e, sensorsdata.languages.get("用户分群_分群结果_用户列表_SensorsAnalytics<!--{todo}-->"))
                        }), a.tb.off("count").on("count", function (t) {
                            var e = {
                                id: a.detailData.id,
                                filter: {
                                    conditions: [{
                                        "function": "isTrue",
                                        field: "user." + a.detailData.name + "@" + moment(t.base_time).valueOf()
                                    }], relation: "and"
                                },
                                type: a.detailData.type
                            };
                            p.nav("/clustering/cluster-detail/users/#" + $.param(e))
                        }), a.setCsvData()
                    })
                }
                i.off("update").on("update", function (t) {
                    if ("undefined" != typeof t && !$.isEmptyObject(t) && t.id === a.id && (i.getDetail(a.id, function (t) {
                        !$.isEmptyObject(t) && a.hd && (a.hd.refresh(t), a.headline.refresh(t)), !$.isEmptyObject(t) && a.nb && t && t.last_partition && a.nb.refresh(t)
                    }), !$.isEmptyObject(t) && a.chart && a.tb && a.hd)) {
                        a.hd.setParams(a.hd.getParams().rangeText ? {rangeText: a.hd.getParams().rangeText} : {
                            from_date: $.isEmptyObject(t.last_partition) ? t.from_date : "",
                            to_date: $.isEmptyObject(t.last_partition) ? t.to_date : t.last_partition.base_time
                        }), $.extend(!0, a.queryParams, a.hd.getParams());
                        var n = $.extend(!0, a.queryParams, t);
                        $.isEmptyObject(t.last_partition) || (n.start = f.START, n.count = f.LIMIT_COUNT), i.getPartitions(n, function (t) {
                            var n = t;
                            n && n.total > 0 ? (s.process({
                                clusterData: a.detailData,
                                partitionData: n,
                                type: "column"
                            }, function (t) {
                                a.chart.refresh({
                                    container: e.find("chart-container"),
                                    data: t,
                                    partitionData: n,
                                    clusterData: a.detailData,
                                    type: "column",
                                    status: a.detailData.scheduler.running
                                })
                            }), s.process({clusterData: a.detailData, partitionData: t, type: "table"}, function (t) {
                                a.tb.update(t)
                            })) : (a.chart.refresh({
                                container: e.find("chart-container"),
                                data: "",
                                type: "column",
                                partitionData: n,
                                clusterData: a.detailData,
                                status: a.detailData.scheduler.running
                            }), a.tb.update({data: [], total: 0})), a.setCsvData()
                        })
                    }
                })
            })
        }), i.getList(function (t) {
            a.clusters = t.result
        }), i.on("partition.change", function (t) {
            t.id === a.id && i.trigger("update", a.detailData), "succeed" === t.status || "failed" === t.status ? (a.chart && a.chart.hideTip(), a.headline && a.headline.setToolbar_({download: "show"})) : "computing" === t.status && a.headline && a.headline.setToolbar_({download: f.DISABLED})
        }), i.on("rule.change", function (t) {
            "del" !== t.action && "upload" !== t.action && i.getDetail(parseInt(t.id), function (t) {
                a.detailData = t, i.trigger("update", t)
            })
        }), $(window).off("resize.cluster").on("resize.cluster", function () {
            a.chart && $.isFunction(a.chart.resize) && a.chart.resize()
        }), this.setCsvData = function () {
            if (this.tb) {
                var t = this.tb.getCurrentData(["base_time", "finished_time", "count"]);
                if (!$.isEmptyObject(t)) {
                    this.csvData = [];
                    for (var a = 0, e = t.length; e > a; a++) {
                        var n = [];
                        for (var i in t[a]) {
                            var s = {};
                            s.value = t[a][i], n.push(s)
                        }
                        this.csvData.push(n)
                    }
                }
            }
        }, this.downloadCsv = function () {
            var t = [];
            t = this.csvData && 0 !== this.csvData.length ? [{
                isHead: !0,
                value: sensorsdata.languages.get("计算基准时间<!--{todo}-->")
            }, {value: sensorsdata.languages.get("最后计算时间<!--{todo}-->")}, {value: sensorsdata.languages.get("分群人数<!--{todo}-->")}] : [{value: sensorsdata.languages.get("没有查找到数据<!--{en}No data was found-->")}];
            var a = {heads: t, rows: this.csvData}, e = "";
            if (this.tb && $.isFunction(this.tb.getCurrentData)) {
                var n = "finished_time", i = this.tb.getCurrentData([n]), s = i[0][n].slice(0, 10),
                    o = i[i.length - 1][n].slice(0, 10);
                e = s.toString() === o.toString() ? s + "_" : o + "至" + s + "_"
            }
            var r = (this.detailData.cname || "分群") + "_" + (e || "") + "SensorsAnalytics";
            sensorsdata.table2csv(a, r)
        }, this.unload = function () {
            this.headline && $.isFunction(this.headline.destroy) && (this.headline.destroy(), this.headline = null), this.hd && $.isFunction(this.hd.destroy) && (this.hd.destroy(), this.hd = null), this.nb && $.isFunction(this.nb.destroy) && (this.nb.destroy(), this.nb = null), this.chart && $.isFunction(this.chart.destroy) && (this.chart.destroy(), this.chart = null), this.tb && $.isFunction(this.tb.destroy) && (this.tb.destroy(), this.tb = null), $(window).off("resize.cluster")
        }
    }
});
;
/*!pages/dashboard/dashboard.js*/
define("pages/dashboard/dashboard", function (t, i, e) {
    function s(t) {
        b[this.__id__ = d.guid()] = {}, this.queryParams = sensorsdata.unparam(window.location.hash), this.container = t.container, this.dashboardCount = 0, this.isEmail_ = !!t.isEmail_, this.config = {};
        var i = this, e = Number(this.queryParams.dashid);
        a.checkId(e, function (e) {
            b[i.__id__] && (t.closeLoading(), e ? (i.initLayout(), i.initModel()) : i.renderError(1))
        })
    }

    var d = t("components/util/util"), a = t("components/model/dashboards").dashboardModel,
        o = t("components/model/bookmarks"), n = t("components/model/dashboardWidget"),
        r = t("components/model/dashboard.chart"), h = t("components/charts/normal/normal"),
        l = t("components/dashboardTopbar/dashboardTopbar"), c = {"/behavior-path/": !0, "/interval/": !0},
        g = t("components/dashboardNoResult/dashboardNoResult"),
        u = t("components/dashboardConfigPanel/dashboardConfigPanel"),
        f = {"/utm/": t("components/widgetUTMConfig/container/container")}, _ = {
            container: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<div id="dashboard">\n  <!-- 添加一个空header，app做兼容 -->\n  <div data-placeholder="app-compatible"></div>\n  <div data-placeholder="header"></div>\n  <div class="bd"></div>\n</div>\n'
                }, useData: !0
            }), error: Handlebars.template({
                1: function (t, i, e, s) {
                    var d;
                    return '  <p class="no-has">不存在 ID 为 <strong>' + this.escapeExpression((d = null != (d = i.dashid || (null != t ? t.dashid : t)) ? d : i.helperMissing, "function" == typeof d ? d.call(t, {
                        name: "dashid",
                        hash: {},
                        data: s
                    }) : d)) + "</strong> 的概览页</p>\n"
                }, compiler: [6, ">= 2.0.0-beta.1"], main: function (t, i, e, s) {
                    var d;
                    return null != (d = i["if"].call(t, null != t ? t.isNoHas : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(1, s, 0),
                        inverse: this.noop,
                        data: s
                    })) ? d : ""
                }, useData: !0
            })
        }, b = {};
    s.prototype = {
        renderError: function (t) {
            switch (t) {
                case 1:
                    this.container.html(_.error({isNoHas: !0, dashid: this.queryParams.dashid}))
            }
        }, initLayout: function () {
            this.container.html(_.container()), this.$bd = this.container.find(".bd"), this.toolbar = l.create({
                id: this.queryParams.dashid,
                placeholder: this.container.find("[data-placeholder=header]"),
                onPolicyRefresh: d.bind(function (t) {
                    this.refreshWidgets(t, !0)
                }, this),
                onDeepRefresh: d.bind(function () {
                    this.refreshWidgets(!1, !1)
                }, this),
                onRefresh: d.bind(function () {
                    this.refreshWidgets()
                }, this),
                onSetTime: d.bind(this.refreshWidgets, this),
                onRemoveConfig: d.bind(this.resetWidgets, this),
                onAddWidget: d.bind(this.addWidget, this),
                getAddableBookmarks: d.bind(this.getAddableBookmarks, this),
                isEmail_: this.isEmail_,
                dashboardConfig: this.config
            }), $(window).off("resize.dashboard").on("resize.dashboard", d.bind(function () {
                var t = b[this.__id__].widgets;
                (b[this.__id__].widgetIds || []).forEach(function (i) {
                    var e = t[i].view || {};
                    $.isFunction(e.resize) && e.resize()
                })
            }, this))
        }, initLoaderFinishLog: function (t) {
            if (-1 !== window.location.search.indexOf("f=email")) var i = this, e = window.setInterval(function () {
                t === i.dashboardCount && ($("#dashboard .rate-rectangle").css("background", "#04CB94"), console.log("==Sensors Analytics Email Render Success=="), window.clearInterval(e))
            }, 1e3)
        }, initModel: function () {
            b[this.__id__].widgets = {}, b[this.__id__].widgetIds = [], this.widgetModel = n.createProxy(this.queryParams.dashid);
            var t = (new Date).valueOf();
            this.widgetModel.getList(d.bind(function (i) {
                t = 100 * Math.ceil(((new Date).valueOf() - t) / 100);
                var e = {
                    success: !0,
                    dashboard_id: this.queryParams.dashid,
                    dashboard_name: this.toolbar.name || "",
                    time_consuming: t
                };
                sensorsdata.track("dashboard_browse", e), this.config = i.config, this.toolbar.setConfig(this.config), b[this.__id__] && (this.isShareDash = sensorsdata.authority.userId !== i.user_id, this.isShareDash && this.destroySortable(), this.toolbar.setShare(this.isShareDash), b[this.__id__].widgetMetas = i.items, this.initWidgets(i.items), this.widgetModel.on("add", d.bind(this.handleAddWidget, this)), this.widgetModel.on("del", d.bind(this.handleDelWidget, this)), this.widgetModel.on("set", d.bind(this.handleSetWidget, this)))
            }, this), !1)
        }, initWidgets: function (t) {
            if (this.toolbar.setContainWidget(!!t.length), !t.length) return void(this.noResult = g.create(this.$bd, this.queryParams.dashid, this.isShareDash, this.toolbar.options.onAddWidget));
            var i = b[this.__id__].widgets, e = b[this.__id__].widgetIds;
            t.forEach(d.bind(function (t) {
                var s = this.createWidget(t);
                i[t.bookmark.id] = s, e.push(t.bookmark.id)
            }, this)), this.initLoaderFinishLog(t.length), this.isShareDash || this.createSortable()
        }, createWidget: function (t) {
            console.log(t);
            var i = this, e = r.create({bookmark: t.bookmark, config: t.config}), s = Number(this.queryParams.dashid),
                d = h.create({
                    isShareDash: this.isShareDash,
                    dashid: s,
                    container: this.$bd,
                    meta: e.getMeta(),
                    onMessage: sensorsdata.bind(this.handleWidgetMessage, this)
                });
            return e.get(this.lastRefreshOptions, function (t) {
                d.update(t), d.updateTime = e.getUpdateTime(t)
            }), e.on("update", function (t) {
                d.update(t), d.updateTime = e.getUpdateTime(t)
            }), e.on("error", function (t) {
                d.update({error: t})
            }), e.on("clean", function () {
                d.clean()
            }), e.on("destroy", function () {
                d.destroy()
            }), d.on("done", function () {
                i.dashboardCount++
            }), {model: e, view: d}
        }, handleWidgetMessage: function (t) {
            if (t && t.data) switch (t.action) {
                case"del":
                    this.delWidget(t.data.id);
                    break;
                case"set":
                    this.setWidget(t.data.id);
                    break;
                case"set-size":
                    this.setWidgetSize(t.data.id, t.data.size);
                    break;
                case"filter":
                    this.widgetDataFilter(t.data);
                    break;
                case"changeTab":
                    this.widgetChangeTab(t.data.id, t.tabName, t.isShareDash);
                    break;
                case"useCache":
                    this.widgetDataCanUseCache(t.data)
            }
        }, addWidget: function (t) {
            if ($.isNumeric(t)) {
                var i = this;
                return void o.get(t, function (t) {
                    i.addWidget(t)
                })
            }
            if ("/segmentation/" !== t.type) return void this.widgetModel.add({bookmark: t});
            var e = this.widgetModel;
            (f[t.type] || u).show({widget: {bookmark: t}}, function (t) {
                e.add(t)
            })
        }, delWidget: function (t) {
            this.widgetModel.del(t)
        }, setWidget: function (t) {
            var i = this.widgetModel;
            i.get(t, function (t) {
                (f[t.bookmark.type] || u).show({widget: t}, function (t) {
                    i.set(t)
                })
            })
        }, setWidgetSize: function (t, i) {
            var e = b[this.__id__].widgets[t];
            e && (this.widgetModel.set({
                id: t,
                config: {size: i}
            }, {isTrigger: !1}), e.model.update({config: {size: i}}, !1), e.view.update({size: i}))
        }, widgetDataFilter: function (t) {
            var i = b[this.__id__].widgets[t.id];
            if (i) {
                var e = {filter: t};
                i.model.update(this.lastRefreshOptions ? $.extend(!0, {}, this.lastRefreshOptions, e) : e)
            }
        }, widgetDataCanUseCache: function (t) {
            var i = b[this.__id__].widgets[t.id];
            i && i.model.refresh($.extend(!0, {}, this.lastRefreshOptions, t))
        }, widgetChangeTab: function (t, i, e) {
            var s = b[this.__id__].widgets[t];
            s && (e || (this.widgetModel.set({
                id: t,
                config: {tab_name: i}
            }, {isTrigger: !1}), s.model.update({config: {tab_name: i}}, !1)), s.view.update({tab_name: i}))
        }, handleAddWidget: function (t) {
            this.addPreprocess();
            var i = b[this.__id__].widgets, e = b[this.__id__].widgetIds, s = this.createWidget(t.widget),
                d = t.widget.bookmark.id;
            i[d] = s, e.push(d), document.documentElement.scrollTop = document.body.scrollHeight
        }, addPreprocess: function () {
            !b[this.__id__].widgetIds.length && this.noResult && (this.noResult.destroy(), this.noResult = null, this.toolbar.setContainWidget(!0))
        }, handleDelWidget: function (t) {
            var i = b[this.__id__].widgets[t.widget.id], e = b[this.__id__].widgetIds;
            delete b[this.__id__].widgets[t.widget.id], b[this.__id__].widgetIds = e.filter(function (i) {
                return i !== t.widget.id
            }), i.model.destroy(), this.delPostprocess()
        }, delPostprocess: function () {
            b[this.__id__].widgetIds.length || this.noResult || (this.noResult = g.create(this.$bd, null, !1, this.toolbar.options.onAddWidget), this.toolbar.setContainWidget(!1))
        }, handleSetWidget: function (t) {
            var i = b[this.__id__].widgets[t.widget.id];
            i.model.update(this.lastRefreshOptions ? $.extend(!0, {}, this.lastRefreshOptions, t.widget) : t.widget)
        }, createSortable: function () {
            var t = this;
            this.sortable = Sortable.create($("#dashboard .bd")[0], {
                animation: 300,
                handle: ".widget-topbar",
                scrollSensitivity: 200,
                scrollSpeed: 10,
                scroll: !0,
                onEnd: function () {
                    t.updateOrders()
                }
            })
        }, destroySortable: function () {
            this.sortable && this.sortable.destroy()
        }, updateOrders: function () {
            var t = this.widgetModel, i = [];
            $("#dashboard .bd").find(">.widget-container").each(function (t, e) {
                i.push($(e).data("widgetid"))
            }), t.sort(i, function (t) {
                console.log("更新 widget 顺序", t)
            })
        }, refreshWidgets: function (t, i) {
            var e = b[this.__id__].widgets;
            "object" === $.type(t) && (this.lastRefreshOptions = t);
            var s = $.extend(!0, {}, this.lastRefreshOptions, i === !1 ? {useCache: !1} : {});
            for (var d in e) e.hasOwnProperty(d) && e[d].model.refresh(s)
        }, resetWidgets: function () {
            this.lastRefreshOptions = null, this.refreshWidgets()
        }, getAddableBookmarks: function (t) {
            var i = this;
            o.getList(function (e) {
                i.widgetModel.getList(function (i) {
                    var s = [], d = i.items, a = {};
                    $.isArray(d) && d.length > 0 && $.each(d, function (t, i) {
                        "object" == typeof i && i.bookmark.id && (a[i.bookmark.id] = !0)
                    }), $.each(e, function (t, i) {
                        if (!c[t]) {
                            var e = {};
                            e.glistType = sensorsdata.CONSTSET.urlMap[t], e.glistOrder = sensorsdata.CONSTSET.urlMapOrder[t], e.glistRows = i, $.each(i, function (t, e) {
                                e.timeFix = sensorsdata.BookmarkSave.buildTimeText(e), e.id in a && delete i[t]
                            }), e.glistRows = $.map(i, function (t) {
                                return t
                            }), $.isArray(e.glistRows) && e.glistRows.length > 0 && s.push(e)
                        }
                    }), s = sensorsdata.seniorSort(s, "glistOrder").reverse(), t(s)
                })
            })
        }, unload: function () {
            var t = b[this.__id__];
            if (t) {
                $(window).off("resize.dashboard"), this.destroySortable();
                var i = t.widgets;
                if (i) for (var e in i) i[e].model.destroy();
                this.widgetModel && this.widgetModel.destroy(), this.toolbar && this.toolbar.destroy(), delete b[this.__id__]
            }
        }
    }, e.exports = s
});
;
/*!pages/funnel/funnel.js*/
define("pages/funnel/funnel", function (e, t, n) {
    function a(e) {
        sensorsdata.BasePage.call(this), this.options = e, this.options.container = e.container || $("body"), this.state = this.options.state || {}, this.tplPage_ = sensorsdata.languages.replace($("#tpl-funnel-index").html()), this.options.container.html(this.tplPage_), this.bookmarkToolbar = {}, this.inputDate_ = this.options.container.find("#inputDate"), this.funnelSelector = this.options.container.find("#select-funnel"), this.pageName = window.location.pathname, this.allFunnels = null, this.defaultConfig_ = {
            measures: ["conversion_rate"],
            groups: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            step: "$ALL",
            type: "percent"
        }, this.defaultWindowTimeRelation = {
            "-1": sensorsdata.languages.get("当天<!--{todo}-->"),
            5: sensorsdata.languages.get("5分钟<!--{en}5 minutes-->"),
            60: sensorsdata.languages.get("1小时<!--{en}1 hour-->"),
            1440: sensorsdata.languages.get("24小时<!--{en}1 day-->"),
            10080: sensorsdata.languages.get("7天<!--{en}7 days-->"),
            20160: sensorsdata.languages.get("14天<!--{en}14 days-->"),
            43200: sensorsdata.languages.get("30天<!--{en}30 days-->"),
            86400: sensorsdata.languages.get("60天<!--{en}60 days-->"),
            129600: sensorsdata.languages.get("90天<!--{en}90 days-->"),
            259200: sensorsdata.languages.get("180天<!--{en}180 days-->")
        }, this.funnelFilterControl = new sensorsdata.FilterGroupControl, this.btnAddFunnelFilter_ = this.options.container.find("#btnAddFilter"), this.groupControl_ = new sensorsdata.GroupControl, this.overViewData = null, this.presentState = null, this.tplFunnelSelector = $("#tpl-select-funnel").html(), this.tplFunnelArrow = $("#tpl-funnel-arrow").html(), this.tplTable_ = $("#tpl-funnel-table").html(), this.tplGroupEvent = $("#tpl_filter_group_events_list").html(), this.tplMeasureSelector = $("#tpl-measure-selector").html(), this.trendFunnelContainer = this.options.container.find("#trendFunnels"), this.funnelContainer = this.options.container.find("#funnelContainer"), this.tableContainer = this.options.container.find("#table-container"), this.mainFunnelContainer = this.options.container.find("#singleContainer"), this.chartContainer = this.options.container.find("#chartContainer"), this.funnelFilterContainer = this.options.container.find("#funnel-filter-container"), this.funnelGroupContainer = this.options.container.find("#funnel-group"), this.$paginationContainer_ = this.options.container.find("#table-pagination"), this.tplFunnelEdit = $("#fu_cface_tpl").html(), this.btnToolBar_ = this.options.container.find("#btn-toolbar"), this.btnChartConfig_ = this.btnToolBar_.find('button[data-method="chart-config"]'), this.tplOverviewConfig_ = $("#tpl-funnel-chart-config").html(), this.groups = [0], this.editFloatContainer = this.options.container.find("#editFloatContainer"), this.currentState = "trends", this.measures = [], this.lineChart = null, this.selectedFunnelId = null, this.tableData_ = {}, this.reportLoading = new r({
            container: this.trendFunnelContainer.parent(),
            needHideDom: [this.tableContainer.parent()]
        }), this.init()
    }

    var s = e("components/bookmarkToolbar/bookmarkToolbar"), r = e("components/reportLoading/reportLoading"),
        o = e("components/util/util");
    sensorsdata.inherits(a, sensorsdata.BasePage), a.prototype.init = function () {
        a.superClass_.init.call(this), this.paramObj_ = this.dealParam(sensorsdata.unparam(window.location.hash));
        var e = $.extend(!0, {}, this.paramObj_), t = "#" + $.param(e);
        window.history.replaceState(t, "", t);
        var n = this, r = e[sensorsdata.CONSTSET.bookmarkId], o = this.state;
        this.bookmarkToolbar = s.create({
            dashid: o.dashid,
            fromDashboard: "dashboard" === o.from && !!o.dashid,
            showSaveAndAdd: "dashboard" === o.from && "add" === o.action && !!o.dashid,
            samplingDisplay: !0,
            samplingFactor: e.sampling_factor,
            onBookmarkAdded: sensorsdata.bind(function (e) {
                this.paramObj_[sensorsdata.CONSTSET.bookmarkId] = e.id
            }, this),
            onBookmarkNameChanged: sensorsdata.bind(function () {
                this.updateReportName_(this.bookmarkToolbar.bookmark)
            }, this),
            onRefreshClick: sensorsdata.bind(function (e) {
                var t = sensorsdata.buildTimeRanges();
                n.inputDate_.data("daterangepicker").updateRanges(t), n.paramObj_ = n.buildParamObj_(), n.getChartData(n.paramObj_, function () {
                    n.checkConfig(n.paramObj_.config), n.renderFunnelProcess(n.paramObj_.config, n.currentState), n.renderChartConfig_(n.paramObj_.config), n.renderTable(), n.updateHash(n.paramObj_), $.isFunction(e) && e()
                })
            }, this),
            onDownloadClick: sensorsdata.bind(function () {
                var e = $.extend(!0, {}, n.paramObj_),
                    t = (this.bookmarkToolbar.bookmark.id && this.bookmarkToolbar.bookmark.name + "_") + sensorsdata.languages.get("漏斗分析<!--{en}FunnelAnalysis--->") + "_" + n.inputDate_.val() + "_SensorsAnalytics",
                    a = "funnels/report/csv?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || "");
                sensorsdata.log(a, e, t), sensorsdata.download(a, e, t)
            }, this),
            sessionDropdownDisplay: !1,
            container: $("#bookmark-save-bar"),
            bookmarkid: r,
            params: this.paramObj_,
            type: this.pageName
        }), this.refreshFunnelSelector(this.paramObj_.funnel_id, !1), this.options.closeLoading()
    }, a.prototype.hasID = function (e, t) {
        return e.filter(function (e) {
            return String(e.id) === String(t)
        })
    }, a.prototype.dealParam = function (e) {
        var t = $.extend(!0, {}, e), n = sensorsdata.buildDefaultTimeRange();
        t.hasOwnProperty("from_date") || (t.from_date = moment(n[0]).format(sensorsdata.CONSTSET.dateFormat)), t.hasOwnProperty("to_date") || (t.to_date = moment(n[1]).format(sensorsdata.CONSTSET.dateFormat)), $.isArray(t.bucket_param) ? t.bucket_param = sensorsdata.buildBucketPopoverValue(t.bucket_param) : delete t.bucket_param, "boolean" != typeof t.extend_over_end_date && (t.extend_over_end_date = "false" === t.extend_over_end_date ? !1 : !0), t.config = $.extend(!0, {}, t.config), t.config.groups = $.isArray(t.config.groups) && 0 !== t.config.groups.length ? t.config.groups.map(function (e) {
            return parseInt(e, 10)
        }) : this.defaultConfig_.groups, t.config.step = t.config.step || this.defaultConfig_.step, t.config.type = t.config.type || this.defaultConfig_.type;
        var a = o.getTimeRange(t.rangeText, !1);
        return t.rangeText && !$.isEmptyObject(a) && (t.from_date = a.from_date, t.to_date = a.to_date), t.state ? this.currentState = t.state : t.state = this.currentState, t.filter = sensorsdata.FilterGroupControl.dealCompatible(e.filter), $.isEmptyObject(t.filter) || !$.isArray(t.filter_field_steps) ? delete t.filter_field_steps : t.filter_field_steps = t.filter_field_steps.map(function (e) {
            return "" === e ? -1 : parseInt(e, 10)
        }), t.by_field_step && $.isNumeric(t.by_field_step) ? t.by_field_step = parseInt(t.by_field_step, 10) : delete t.by_field_step, t
    }, a.prototype.initInputDate_ = function () {
        var e = this, t = sensorsdata.CONSTSET, n = this.paramObj_, a = {};
        a.startDate = moment(n.from_date || moment(), t.dateFormat), a.endDate = moment(n.to_date || moment().subtract("1", "days"), t.dateFormat), a.chosenLabel = n.rangeText, a.timeExtend = {
            isLimit: !n.extend_over_end_date,
            text: sensorsdata.languages.get("限制窗口期在时间区间内<!--{en}Limit the window period to the time range-->"),
            tooltip: sensorsdata.languages.get("将首步骤之后的步骤的发生时间限定在时间区间内<!--{en}Please limit the occurrence time of the step after the first step to the time range-->")
        }, a.allowRelative = !0, sensorsdata.initDateRangeInput(this.inputDate_, a), this.inputDate_.unbind("apply.daterangepicker").bind("apply.daterangepicker", function () {
            e.prevQuery_(), e.setDateTooltip_()
        }), this.setDateTooltip_()
    }, a.prototype.setDateTooltip_ = function () {
        var e = parseInt(this.funnelSelector.find("li.active input").data("converttime"), 10),
            t = sensorsdata.languages.get("第一个步骤发生的时间区间，<!--{en}The time range of the occurrence time of the first step-->");
        if (this.paramObj_.extend_over_end_date) {
            var n = moment(this.paramObj_.to_date, sensorsdata.CONSTSET.dateFormat).add(e, "minute"),
                a = "YYYY-MM-DD HH:mm";
            e % 1440 === 0 ? a = "YYYY-MM-DD" : e % 60 === 0 && (a = sensorsdata.languages.get("YYYY-MM-DD HH点<!--{en}YYYY-MM-DD HH minute-->")), n.isAfter(moment()) && (n = moment()), t += sensorsdata.languages.get("后续步骤发生时间被延展到<!--{en}The occurrence time of subsequent steps is extended to-->") + n.format(a)
        } else t += sensorsdata.languages.get("后续步骤发生时间被限制在此时间区间<!--{en}The occurrence time of subsequent steps is limited to the time range-->");
        this.inputDate_.is("[data-original-title]") ? this.inputDate_.attr("data-original-title", t) : this.inputDate_.tooltip({title: t})
    }, a.prototype.updateHash = function (e) {
        var t = "#" + $.param(e);
        window.history.pushState(t, "", t)
    }, a.prototype.renderFunnelProcess = function (e, t) {
        var n = this, a = n.formatViewDataByGroup(e);
        switch (a = $.extend(!0, {}, a, {isSingle: !0}), t || (t = "overview"), n.btnToolBar_.find('[data-method="' + t + '"]').addClass("active").siblings().removeClass("active"), t) {
            case"overview":
                n.mainFunnelContainer.html(Mustache.render(n.tplFunnelArrow, a)), n.mainFunnelContainer.show(), n.trendFunnelContainer.hide();
                break;
            case"trends":
                var s = $.extend(!0, {}, {array: a.array[0]}, {isSingle: !1, compare: !1, state: !0});
                n.mainFunnelContainer.hide(), n.trendFunnelContainer.show(), n.funnelContainer.html(Mustache.render(n.tplFunnelArrow, s)), n.funnelContainer.find("svg").attr("class", ""), n.funnelContainer.find('svg[data-step="' + e.step + '"]').attr("class", "active"), n.chartContainer.html(""), n.drawLineChart(n.chartContainer, e), n.funnelContainer.unbind("click.process").bind("click.process", function (e) {
                    var t = $(e.target || e.srcElement);
                    if (t.is("svg") || (t = t.parents("svg:first")), t.length) {
                        if (t.attr("class")) return;
                        n.funnelContainer.find("svg").attr("class", ""), t.attr("class", "active");
                        var a = t.attr("data-step");
                        n.paramObj_.config.step = a, n.paramObj_.config.measures = n.defaultConfig_.measures, n.paramObj_.config.type = n.defaultConfig_.type, n.checkConfig(n.paramObj_.config), n.updateHash(n.paramObj_), n.renderChartConfig_(n.paramObj_.config), n.drawLineChart(n.chartContainer, n.paramObj_.config), n.renderTable()
                    }
                })
        }
    }, a.prototype.converMedianTime = function (e) {
        e = Number(e);
        var t = null;
        switch (!0) {
            case 60 > e:
                t = e + sensorsdata.languages.get("秒<!--{en}seconds-->");
                break;
            case e >= 60 && 3600 > e:
                t = Math.floor(e / 60) + sensorsdata.languages.get("分钟<!--{en}minutes-->");
                break;
            case e >= 3600 && 86400 > e:
                t = (e / 3600).toFixed(1) + sensorsdata.languages.get("小时<!--{en}hours-->");
                break;
            case e >= 86400:
                t = (e / 86400).toFixed(1) + sensorsdata.languages.get("天<!--{en}days-->");
                break;
            default:
                t = e
        }
        return String(t).replace(/\.0/, "")
    }, a.prototype.checkConfig = function (e) {
        var t = this, n = e.groups;
        if (("undefined" == typeof n || $.isArray(n) && 0 === n.length) && (n = this.defaultConfig_.groups), n = n.filter(function (e) {
            return e = parseInt(e, 10), e < t.overViewData.by_values.length
        }), 0 === n.length && (n = this.defaultConfig_.groups), e.groups = "overview" === this.currentState ? n.slice(0, 2) : n, e.groups = e.groups.map(function (e) {
            return parseInt(e, 10)
        }), $.isNumeric(e.step)) {
            var a = parseInt(e.step, 10);
            e.step = a < t.overViewData.funnel_detail[0].steps.length - 1 ? a : "$ALL"
        } else e.measures = $.isArray(e.measures) && e.measures.length > 0 && $.isNumeric(e.measures[0]) ? e.measures.map(function (e) {
            return parseInt(e, 10)
        }) : ["conversion_rate"];
        return t.paramObj_.config = e, e
    }, a.prototype.drawLineChart = function (e, t) {
        var n = this;
        this.lineChart && this.lineChart.hasOwnProperty("isDisposed") && !this.lineChart.isDisposed() && this.lineChart.dispose(), this.lineChart = echarts.init(e[0]);
        var a = $.extend({}, !0, t), s = {
            tooltip: {trigger: "axis"},
            legend: {bottom: 60, padding: 5, data: []},
            xAxis: {type: "category", boundaryGap: !0, data: [], splitLine: {show: !1}},
            yAxis: {},
            series: []
        }, r = this.overViewData.date_list.slice(1);
        s.xAxis.data = r.map(function (e) {
            return "$ALL" !== e ? sensorsdata.formatTime(e, "day", !1) : void 0
        });
        var o = null;
        switch (t.type) {
            case"percent":
                o = function (e) {
                    $.isArray(e) && (e = e[0]);
                    var t = r[e.dataIndex] ? sensorsdata.formatTime(r[e.dataIndex], "day", !0) : e.name || "-";
                    return t + "</br>" + sensorsdata.echarts.truncateLabel(e.seriesName, 50) + "：" + sensorsdata.formatNumber(e.value) + "%"
                }, s.yAxis.axisLabel = {
                    formatter: function (e) {
                        return e + "%"
                    }
                };
                break;
            case"time":
                o = function (e) {
                    $.isArray(e) && (e = e[0]);
                    var t = r[e.dataIndex] ? sensorsdata.formatTime(r[e.dataIndex], "day", !0) : e.name || "-";
                    return t + "</br>" + sensorsdata.echarts.truncateLabel(e.seriesName, 50) + "：" + n.converMedianTime(e.value)
                }, s.yAxis.axisLabel = {
                    formatter: function (e) {
                        var t = "";
                        return t = e > 1e3 ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K" : sensorsdata.formatNumber(e), t + sensorsdata.languages.get("秒<!--{en}second-->")
                    }
                };
                break;
            case"number":
                o = function (e) {
                    $.isArray(e) && (e = e[0]);
                    var t = r[e.dataIndex] ? sensorsdata.formatTime(r[e.dataIndex], "day", !0) : e.name || "-";
                    return t + "</br>" + sensorsdata.echarts.truncateLabel(e.seriesName, 50) + "：" + sensorsdata.formatNumber(e.value) + sensorsdata.languages.get("人<!--{en}People-->")
                }
        }
        s.tooltip = {
            trigger: "axis", formatter: function (e) {
                return sensorsdata.echarts.wrapTriangleTooltip(o(e))
            }, axisPointer: {lineStyle: {width: 0}}, position: function (e, t, a) {
                return sensorsdata.echarts.lineTooltipPosition(n.lineChart, e, t, a, o)
            }
        }, $.isNumeric(a.step) ? (a.step = parseInt(a.step, 10), a.measures.forEach(function (e) {
            a.groups.forEach(function (t) {
                var r = sensorsdata.trimConstHtml(n.labelByValues[parseInt(t, 10)].cname);
                s.legend.data.push({name: r + "", icon: "roundRect"});
                for (var o = {
                    name: r + "",
                    type: "line",
                    data: [],
                    showAllSymbol: !0,
                    symbol: "circle",
                    symbolSize: 8
                }, i = 1; i < n.overViewData.funnel_detail.length; i++) {
                    var l = n.overViewData.funnel_detail[i], u = l.overview[t];
                    $.isArray(u) && u.length > 1 ? "conversion_rate" === e ? o.data.push(-1 === u[a.step + 1].conversion_rate ? "-" : u[a.step + 1].conversion_rate) : "median" === e ? o.data.push(-1 === l.steps[a.step].rows[t].median_converted_time ? "-" : l.steps[a.step].rows[t].median_converted_time) : "wastage_user" === e ? o.data.push(-1 === l.steps[a.step].rows[t].wastage_user ? "-" : l.steps[a.step].rows[t].wastage_user) : (e = parseInt(e, 10), o.data.push(-1 === l.overview[t][e].converted_user ? "-" : l.overview[t][e].converted_user)) : o.data.push(0)
                }
                s.series.push(o)
            })
        })) : a.measures.forEach(function (e) {
            a.groups.forEach(function (t) {
                var a = sensorsdata.trimConstHtml(n.labelByValues[parseInt(t, 10)].cname);
                s.legend.data.push({name: a + "", icon: "roundRect"});
                for (var r = {
                    name: a + "",
                    type: "line",
                    data: [],
                    showAllSymbol: !0,
                    symbol: "circle",
                    symbolSize: 8
                }, o = 1; o < n.overViewData.funnel_detail.length; o++) {
                    var i = n.overViewData.funnel_detail[o], l = i.overview[t];
                    $.isArray(l) && l.length > 1 ? "conversion_rate" === e ? r.data.push(-1 === l[l.length - 1].completion_rate ? "-" : l[l.length - 1].completion_rate) : (e = parseInt(e, 10), r.data.push(-1 === l[e + 1].conversion_rate ? "-" : l[e + 1].conversion_rate)) : r.data.push(0)
                }
                s.series.push(r)
            })
        }), s = $.extend(!0, {}, s, sensorsdata.echarts.option), s.yAxis.splitNumber = 5, s.yAxis.scale = !0, s.dataZoom = [], this.lineChart.setOption(s);
        var i;
        switch (a.measures[0]) {
            case"conversion_rate":
                i = sensorsdata.languages.get("转化率(%)<!--{en}Conversion rate(%)-->");
                break;
            case"median":
                i = sensorsdata.languages.get("转化时间中位数<!--{en}Median of conversion time-->");
                break;
            case"wastage_user":
                i = sensorsdata.languages.get("流失用户<!--{en}Loss of users-->");
                break;
            default:
                i = n.btnToolBar_.find('#chart-measure-selector input[type="radio"]:checked').next("span").text()
        }
        i = n.btnToolBar_.find('#chart-measure-selector input[type="radio"]:checked').next("span").text(), this.chartContainer.find("div:first-child").before(Mustache.render($("#tpl-chart-title").html(), {title: i}))
    }, a.prototype.initEvents_ = function () {
        var e = this;
        this.options.container.find("#sa_fu_btn_main").unbind("click.create").bind("click.create", function () {
            e.appendCreate()
        }), sensorsdata.cache.config.auto_refresh || $("#funnel_manual_query_btn").show().unbind("click.query").bind("click.query", function () {
            e.paramObj_ = e.buildParamObj_(), e.getChartData(e.paramObj_, function () {
                e.checkConfig(e.paramObj_.config), e.renderFunnelProcess(e.paramObj_.config, e.currentState), e.renderChartConfig_(e.paramObj_.config), e.renderTable(), e.updateHash(e.paramObj_)
            })
        }), this.groupControl_.bindEvent("valueChangedEvent", sensorsdata.bind(function () {
            this.paramObj_.config.groups = this.defaultConfig_.groups, this.prevQuery_()
        }, this)), this.bookmarkToolbar.on("updateSampling", function (t) {
            $.extend(!0, e.paramObj_, t), e.prevQuery_()
        }), this.bookmarkToolbar.on("updateParams", function (t) {
            t.dashboard_cache_policy ? e.paramObj_.dashboard_cache_policy = t.dashboard_cache_policy : delete e.paramObj_.dashboard_cache_policy
        }), this.funnelFilterControl.bindEvent("valueChangedEvent", sensorsdata.bind(this.prevQuery_, this)), this.btnAddFunnelFilter_.unbind("click.filter").bind("click.filter", function () {
            e.funnelFilterControl.addFilter()
        }), this.tableContainer.unbind("mouseover", '[data-toggle="tooltip"]').bind("mouseover", '[data-toggle="tooltip"]', function (e) {
            var t = $(e.target || e.srcElement);
            t.data("bs.tooltip") || t.tooltip().tooltip("show")
        }), this.options.container.find('div.btn-group[data-role="state"]').unbind("click.toggle").bind("click.toggle", function (t) {
            var n = $(t.srcElement || t.target);
            if (!n.hasClass("active")) {
                var a = n.attr("data-method");
                n.addClass("active"), n.siblings().removeClass("active"), e.currentState = a, e.paramObj_.state = a, "overview" === a && e.paramObj_.config.groups.length > 2 && (e.paramObj_.config.groups = e.paramObj_.config.groups.slice(0, 2));
                var s = {groups: e.paramObj_.config.groups, step: "$ALL", type: "percent"};
                e.paramObj_.config = $.extend(!0, {}, e.paramObj_.config, s), e.checkConfig(e.paramObj_.config), e.updateHash(e.paramObj_), e.renderFunnelProcess(e.paramObj_.config, e.currentState), e.renderChartConfig_(e.paramObj_.config), e.renderTable()
            }
        }), $("body").unbind("click.funnel").bind("click.funnel", function (t) {
            var n = $(t.target || t.srcElement).parents("div.chart-config:first");
            0 === n.size() && e.btnToolBar_.find('button[data-method="chart-config"]').next(".config").hide()
        }), $(window).on("resize.funnel", function () {
            "trends" === e.currentState && e.lineChart && e.lineChart.resize()
        }), $("#funnelContainer").delegate("span[data-method=user-list]", "click.userList", function () {
            var t = $(this), n = null;
            n = $.extend(!0, {}, e.paramObj_), delete n.rangeText;
            var a = !1, s = parseInt(t.attr("data-index"), 10);
            if (n.slice_step = s, n.slice_wastage_user = a, n.detail = !0, n.by_field) switch (e.labelByValues[0].name) {
                case null:
                    n.slice_by_value = sensorsdata.CONSTSET.unknownByValueText;
                    break;
                case"":
                    n.slice_by_value = sensorsdata.CONSTSET.emptyStringByValueText;
                    break;
                default:
                    n.slice_by_value = e.labelByValues[0].name
            } else n.slice_by_value = null;
            $(t).createUserListPanel({queryData: n})
        }), this.tableContainer.unbind("click.user").bind("click.user", function (t) {
            var n = $(t.target || t.srcElement);
            n.attr("data-method") || (n = n.parents("[data-method]:first"));
            var a = n.attr("data-method"), s = null, r = null;
            switch (a) {
                case"toggle-row":
                    if (r = n.attr("data-by-index"), n.hasClass("icon-collapse-right")) {
                        s = e.renderRowData(e.overViewData, r);
                        var o = Mustache.render($("#tpl-insert-table-row").html(), s), i = n.parents("tr:first");
                        $(o).insertAfter(i)
                    } else e.tableContainer.find('tr[data-inserted-row="' + r + '"]').remove();
                    n.attr("class", n.hasClass("icon-expand-down") ? "icon-collapse-right" : "icon-expand-down");
                    break;
                case"user-list":
                    var l = "funnels/user/list/csv";
                    s = $.extend(!0, {}, e.paramObj_), delete s.rangeText;
                    var u = !1, d = parseInt(n.attr("data-row-index"), 10), c = n.attr("data-date");
                    if (s.slice_end_date = null, c && (s.extend_over_end_date || (s.slice_end_date = s.to_date), s.from_date = c, s.to_date = c), s.slice_step = d, "trends" === e.currentState && (n.hasClass("dropped-user") && (u = !0, s.slice_step = e.paramObj_.config.step), "$ALL" === s.config.step && "0" === n.attr("data-row-index") && (s.slice_step = e.funnelProps.step_name.length - 1)), s.slice_wastage_user = u, s.detail = !0, s.by_field) switch (r = parseInt(n.attr("data-by-index"), 10), e.labelByValues[r].name) {
                        case null:
                            s.slice_by_value = sensorsdata.CONSTSET.unknownByValueText;
                            break;
                        case"":
                            s.slice_by_value = sensorsdata.CONSTSET.emptyStringByValueText;
                            break;
                        default:
                            s.slice_by_value = e.labelByValues[r].name
                    } else s.slice_by_value = null;
                    var p = sensorsdata.languages.get("漏斗分析-用户明细-<!--{en}Funnel analysis- User detail-->") + $("#funnel_data_range_pick").val();
                    sensorsdata.log(l, s, p), $(n).createUserListPanel({queryData: s})
            }
        })
    }, a.prototype.initFloatEvents = function () {
        var e = this;
        e.editFloatContainer.unbind("click.funnel").bind("click.funnel", function (t) {
            var n = $(t.target || t.srcElement), a = n.attr("data-method");
            switch (a || (n = n.parents("[data-method]"), a = n.attr("data-method")), a) {
                case"add-filter":
                    var s = e.editFloatContainer.find('[data-method="relate-props"]').hasClass("on");
                    e.filters.addFilterEvent({}, {}, s), e.reCountNumber();
                    break;
                case"fu_cface_cancel":
                    e.closeFloat();
                    break;
                case"fu_cface_save":
                    e.saveFunnel();
                    break;
                case"fu_cface_save_as":
                    e.saveAsFunnel();
                    break;
                case"fu-cface-del":
                    e.deleteFunnel(n);
                    break;
                case"condition-remove":
                    e.reCountNumber();
                    break;
                case"step-remove":
                    e.reCountNumber();
                    break;
                case"edit-step-name":
                    var r = n.closest(".events-manage-filter-group");
                    r.find(".funnel-filter-group-input-custom-name").css({display: "inline-block"}), n.hide();
                    break;
                case"funnel-time":
                    e.editFloatContainer.unbind("change.custom").bind("change.custom", function () {
                        "custom" === $(this).find("option:selected").attr("value") ? ($("#fu_cface_covert_time_custom_input").closest("div").css({display: "inline-block"}), setTimeout(function () {
                            $("#fu_cface_covert_time_custom_input").focus()
                        }, 500)) : $("#fu_cface_covert_time_custom_input").closest("div").css({display: "none"})
                    });
                    break;
                case"relate-props":
                    n.toggleClass("on"), e.filters.toggleRelationField(n.hasClass("on"))
            }
        })
    }, a.prototype.renderFunnelSelector = function () {
        var e = this;
        this.funnelSelector.html(Mustache.render(this.tplFunnelSelector, this.ownFunnels));
        var t = this.funnelSelector.find("select");
        t.multiselect("destroy").multiselect({
            includeSelectAllOption: !1,
            filterBehavior: "both",
            selectAllText: sensorsdata.languages.get("选择全部<!--{en}Select all-->"),
            nSelectedText: sensorsdata.languages.get("个<!--{en} items-->"),
            allSelectedText: sensorsdata.languages.get("选择全部<!--{en}All-->"),
            nonSelectedText: sensorsdata.languages.get("请选择漏斗<!--{en}Please select funnel-->"),
            filterPlaceholder: sensorsdata.languages.get("搜索<!--{en}Search-->"),
            onChange: function (t) {
                e.selectedFunnelId = $(t).val(), e.updateReportName_(), e.paramObj_.config = e.defaultConfig_, e.getPropsByFunnelId(e.selectedFunnelId).then(function () {
                    e.renderGroupControl(), e.renderFunnelFilter({}), e.setDateTooltip_(), e.prevQuery_(), e.toggleDisabledStatus(!1), e.funnelSelector.find("button").text($(t).text())
                })
            },
            onDropdownShow: function () {
                e.funnelSelector.find("ul li a span.icon-edit").unbind("click").bind("click", function (t) {
                    var n = $(t.target || t.srcElement), a = n.prev("label").find("input"), s = a.attr("data-id");
                    return e.presentState = s, e.getFunnelById(e.appendEdit, e, s), t.preventDefault(), !1
                })
            },
            templates: {li: '<li><a><label style="width: calc(100% - 24px);"></label><span style="margin-top: -24px; margin-right: 5px;" data-toggle="tooltip" data-placement="right" title="编辑" class="pull-right icon-edit"></span></a></li>'}
        }), t.multiselect("select", e.paramObj_.funnel_id), sensorsdata.authority.isNormal && this.funnelSelector.find("input, button, select").attr("disabled", !0)
    }, a.prototype.toggleDisabledStatus = function (e) {
        var t = this;
        t.funnelFilterContainer.find('button, input, select, span[data-role="remove"]').attr("disabled", !!e), t.btnAddFunnelFilter_.attr("disabled", !!e)
    }, a.prototype.refreshFunnelSelector = function (e, t) {
        var n = this;
        t && (delete n.paramObj_.filter, delete n.paramObj_.by_field, delete n.paramObj_.bucket_param, n.paramObj_.config = n.defaultConfig_), n.paramObj_.funnel_id = e;
        var a = $.extend(!0, {}, n.paramObj_);
        $.isArray(sensorsdata.cache.events) && 0 !== sensorsdata.cache.events.length ? this.getAllFunnels().then(function () {
            var t = n.hasID(n.allFunnels, n.paramObj_.funnel_id), s = n.hasID(n.ownFunnels, n.paramObj_.funnel_id),
                r = !!n.ownFunnels.length || t.length && n.paramObj_.bookmarkid;
            n.options.container.find("#bookmark-save-bar").toggle(!!r), n.options.container.find("#funnel_state_empty").toggle(!r), n.options.container.find("#funnel_state_empty_funnel").toggle(!r), n.options.container.find("#funnel_state_empty_event").toggle(!1), n.options.container.find("section.funnel-ops").toggle(!!r), n.options.container.find("section.funnel-container").toggle(!!r), r ? (n.options.container.find(".report-no-data").hide(), n.paramObj_.funnel_id && (s.length || t.length) || (n.paramObj_.funnel_id = n.ownFunnels[0].id, n.bookmarkToolbar.setParams({data: n.paramObj_}, "init"), e && sensorsdata.error.show("指定的漏斗已经不存在，已重新跳转")), n.selectedFunnelId = n.paramObj_.funnel_id, n.renderFunnelSelector(), n.getPropsByFunnelId(n.paramObj_.funnel_id).then(function () {
                var e = !s.length && t.length && (n.paramObj_.bookmarkid || sensorsdata.authority.isAnalyst);
                n.removeInvalidConditions(), e && n.funnelSelector.find("button").html(t[0].name), n.toggleDisabledStatus(e && sensorsdata.authority.isNormal), n.renderGroupControl(n.paramObj_.by_field_step, n.paramObj_.by_field, n.paramObj_.bucket_param), n.renderFunnelFilter(n.paramObj_, e && sensorsdata.authority.isNormal), n.initInputDate_(), n.initEvents_(), n.updateReportName_(n.bookmarkToolbar.bookmark || {}), n.getChartData(n.paramObj_, function () {
                    n.checkConfig(n.paramObj_.config), n.renderChartConfig_(n.paramObj_.config), n.renderFunnelProcess(n.paramObj_.config, n.currentState), n.renderTable(), JSON.stringify(a) !== JSON.stringify(n.paramObj_) && n.updateHash(n.paramObj_)
                })
            })) : n.options.container.find("#sa_fu_btn").unbind("click.create").bind("click.create", function () {
                n.appendCreate()
            })
        }) : (n.options.container.find("#funnel_state_empty").show(), n.options.container.find("#funnel_state_empty").show()), sensorsdata.authority.isNormal && this.options.container.find("#sa_fu_btn_main").attr("disabled", !0)
    }, a.prototype.renderChartConfig_ = function (e) {
        var t = this, n = function (e, t) {
            return e.some(function (e) {
                return String(e.name) === String(t.measures[0])
            })
        }, a = t.labelByValues.map(function (t) {
            var n = !1;
            return -1 !== e.groups.indexOf(t.index) && (n = !0), $.extend(!0, {}, t, {checked: n})
        }), s = {measures: null, step: e.step}, r = "overview" === this.currentState;
        switch (this.btnToolBar_.find("div.chart-config").html(Mustache.render($("#tpl-toolbar-config").html(), r)), this.btnToolBar_.find("ul.config #chart-by-selector").html(Mustache.render(this.tplOverviewConfig_, {
            groups: a,
            isCompare: r,
            groupShow: a.length > 1
        })), this.currentState) {
            case"overview":
                s.measures = t.formatMeasures(t.overViewData), this.btnToolBar_.find("ul.config #chart-measure-selector").html(Mustache.render(this.tplMeasureSelector, s)).find("input").attr("checked", !0);
                var o = 2 === e.groups.length && "overview" === t.currentState;
                o ? t.btnToolBar_.find('li.config-item input[type="checkbox"]:not(:checked)').attr("disabled", !0) : t.btnToolBar_.find('li.config-item input[type="checkbox"]').attr("disabled", !1);
                break;
            case"trends":
                s.measures = t.formatMeasures(t.overViewData, e.step);
                var i = n(s.measures, e) ? e.measures[0] : s.measures[0].name;
                this.btnToolBar_.find("ul.config #chart-measure-selector").html(Mustache.render(this.tplMeasureSelector, s)).find('input[type="radio"][data-index="' + i + '"]').attr("checked", !0)
        }
        var l = this.btnToolBar_.find('button[data-method="chart-config"]').next("ul.config");
        this.btnToolBar_.find('button[data-method="chart-config"]').unbind("click.config").bind("click.config", function () {
            !l.toggle().is(":visible")
        }), this.measures = s.measures, this.btnToolBar_.find('li.config-item input[type="checkbox"]').on("change.group", function () {
            var e = t.getChartConfig_(), n = 2 === e.groups.length && "overview" === t.currentState;
            n ? t.btnToolBar_.find('li.config-item input[type="checkbox"]:not(:checked)').attr("disabled", !0) : t.btnToolBar_.find('li.config-item input[type="checkbox"]').attr("disabled", !1), 0 === e.groups.length && sensorsdata.info.show("overview" === t.currentState ? sensorsdata.languages.get("默认选择2个分组进行对比<!--{en}Default select 2 groups for comparison-->") : sensorsdata.languages.get("默认展示最多10个分组<!--{en}Default display up to 10 groups -->")), t.paramObj_.config = t.checkConfig(e), t.updateHash(t.paramObj_), t.paramObj_.config.groups.forEach(function (e) {
                t.btnToolBar_.find('input[type="checkbox"][data-index="' + e + '"]').prop("checked", !0)
            }), "trends" === t.currentState ? t.drawLineChart(t.chartContainer, t.paramObj_.config) : (t.renderFunnelProcess(t.paramObj_.config, t.currentState), t.renderTable())
        }), this.btnToolBar_.find('li.config-item input[type="radio"]').on("change.measure", function () {
            var e = t.getChartConfig_();
            t.paramObj_.config = e, t.updateHash(t.paramObj_), t.renderFunnelProcess(t.paramObj_.config, t.currentState)
        }), this.btnToolBar_.find("ul.config").unbind("click.config").bind("click.config", function (e) {
            var t = $(e.target || e.srcElement), n = null;
            t.attr("data-for") && (n = t.attr("data-for"), $(n).show(), $(n).siblings("ul").hide(), t.toggleClass("selected"), t.siblings("div[data-for]").removeClass("selected"))
        })
    }, a.prototype.removeInvalidConditions = function () {
        var e = this, t = $.extend(!0, {}, this.paramObj_), n = parseInt(this.paramObj_.funnel_id, 10),
            a = this.allFunnels.filter(function (e) {
                return String(e.id) === String(n)
            })[0];
        if (a) {
            if (!$.isEmptyObject(this.paramObj_.filter) && $.isArray(t.filter.conditions)) {
                var s = [];
                t.filter.conditions = t.filter.conditions.filter(function (n, a) {
                    if (!n.field) return !1;
                    var r = n.field.split("."), o = r[0], i = r[r.length - 1], l = "";
                    if ("user" !== o) {
                        var u = r[1];
                        return l = e.funnelProps[o].filter(function (e) {
                            return e.event_name === u && e.name === i && t.filter_field_steps[a] === e.funnel_step
                        }), l.length ? (s.push(l[0].funnel_step), !0) : (sensorsdata.info.show(sensorsdata.util.format(sensorsdata.languages.get("属性 #{field} 已经不存在，已从过滤中删除<!--{en}Property#{field} does not exist, and has been deleted from the filter-->"), {field: n.field})), !1)
                    }
                    return l = e.funnelProps[o].filter(function (e) {
                        return e.name === i
                    }), l.length ? (s.push(l[0].funnel_step), !0) : void sensorsdata.info.show(sensorsdata.util.format(sensorsdata.languages.get("属性 #{field} 已经不存在，已从过滤中删除<!--{en}Property#{field} does not exist, and has been deleted from the filter-->"), {field: n.field}))
                }), 0 === t.filter.conditions.length ? (t.filter = {}, t.filter_field_steps = []) : t.filter_field_steps = s
            }
            this.paramObj_ = t
        }
    }, a.prototype.getChartConfig_ = function () {
        var e = {measures: [], groups: [], step: "$ALL", type: "number"},
            t = this.btnToolBar_.find('ul.funnel-config #chart-measure-selector input[type="radio"]:checked'),
            n = t.attr("data-index");
        return e.measures.push(n), e.type = t.attr("data-type") || "percent", e.step = this.btnToolBar_.find('ul.funnel-config #chart-measure-selector input[type="radio"]:checked').attr("data-step"), this.btnToolBar_.find('ul.funnel-config #chart-by-selector input[type="checkbox"]:checked').each(function (t, n) {
            e.groups.push(parseInt($(n).attr("data-index"), 10))
        }), 0 === e.groups.length && (e.groups = [0]), e
    }, a.prototype.formatMeasures = function (e, t) {
        var n = [], a = 0;
        if ("$ALL" === t) for (n.push({
            name: "conversion_rate",
            cname: sensorsdata.languages.get("总转化情况<!--{en}Conversion rate-->"),
            index: "conversion_rate",
            dataType: "percent"
        }), a = 0; a < e.funnel_detail[0].steps.length - 1; a++) n.push({
            name: a,
            cname: sensorsdata.util.format(sensorsdata.languages.get("第 #{step} 步<!--{en}Conversion of step #{step}-->"), {step: a + 1}),
            index: a,
            dataType: "percent"
        }); else $.isNumeric(t) ? (t = sensorsdata.toNumber(t), n.push({
            name: e.event_names[t],
            cname: this.funnelProps.step_name[t] + sensorsdata.languages.get("用户数(人)<!--{en}Number of users(people)-->"),
            index: t,
            dataType: "number"
        }), n.push({
            name: "conversion_rate",
            cname: sensorsdata.util.format(sensorsdata.languages.get("第 #{step} 步转化率(%)<!--{en}Step#{step} conversion rate(%)-->"), {step: t + 1}),
            index: "conversion_rate",
            dataType: "percent"
        }), n.push({
            name: "wastage_user",
            cname: sensorsdata.languages.get("流失用户(人)<!--{en}Loss of users(people)-->"),
            index: "wastage_user",
            dataType: "number"
        }), n.push({
            name: "median",
            cname: sensorsdata.languages.get("转化时间中位数<!--{en}Median of conversion time-->"),
            index: "median",
            dataType: "time"
        }), n.push({
            name: e.event_names[t + 1],
            cname: this.funnelProps.step_name[t + 1] + sensorsdata.languages.get("用户数(人)<!--{en}Number of users(people)-->"),
            index: t + 1,
            dataType: "number"
        })) : n.push({
            name: "conversion_rate",
            cname: sensorsdata.languages.get("转化率(%)<!--{en}Conversion rate(%)-->"),
            index: "conversion_rate",
            dataType: "percent"
        });
        return n
    }, a.prototype.renderFunnelFilter = function (e, t) {
        var n = this;
        if (n.funnelFilterContainer.html(""), n.funnelFilterControl.init({
            container: n.funnelFilterContainer,
            propertyObj: {event: n.funnelProps.event, user: n.funnelProps.user},
            disabled: sensorsdata.authority.isNormal || t,
            showPropertyHelp: !0
        }), !$.isEmptyObject(e.filter)) {
            var a = $.extend(!0, {}, e.filter), s = e.filter_field_steps || [];
            s.length === a.conditions.length && a.conditions.map(function (t, n) {
                t.field = e.filter_field_steps[n] + "." + t.field
            }), n.funnelFilterControl.val(a)
        }
        sensorsdata.authority.isNormal && n.btnAddFunnelFilter_.attr("disabled", !0)
    }, a.prototype.renderGroupControl = function (e, t, n) {
        if (this.funnelGroupContainer.html(""), this.groupControl_.init({
            container: this.funnelGroupContainer,
            data: {event: this.funnelProps.event, user: this.funnelProps.user},
            disabled: sensorsdata.authority.isNormal,
            btnAddDisplay: !1,
            showPropertyHelp: !0
        }), t) {
            t = e >= -1 ? e + "." + t : t;
            var a = {};
            a[t] = n, this.groupControl_.val({byFields: [t], bucket: a})
        } else this.groupControl_.val({byFields: null, bucket: null})
    }, a.prototype.getPropsByFunnelId = function (e) {
        var t = this;
        return sensorsdata.ajax({
            url: "funnels/funnel/" + e + "/properties", success: function (e) {
                t.funnelProps = e
            }
        })
    }, a.prototype.getChartData = function (e, t) {
        var n = (new Date).valueOf(), a = this, s = $.extend(!0, {}, e);
        this.bookmarkToolbar.setParams({data: e}), delete s.rangeText;
        var r = "funnels/funnel/" + s.funnel_id + "/report?bookmarkId=" + (this.paramObj_[sensorsdata.CONSTSET.bookmarkId] || "");
        this.paramObj_.sampling_factor && (s.sampling_factor = sensorsdata.BookmarkSave.dealSamplingValue(this.paramObj_.sampling_factor)), delete s.config;
        var o = {success: !0, use_cache: !!s.use_cache, analytical_model: "漏斗模型"};
        this.handleLoading(s, t), sensorsdata.reportAjax({
            isAsync: !0,
            queueEnable: !0,
            url: r,
            data: s,
            type: "post",
            contentType: "application/json",
            errorFunc: function (e, t, n) {
                return a.reportLoading.closeLoading(), o.success = !1, o.fail_reason = e.status, o.time_consuming = "", sensorsdata.track("funnel_analytics", o), 410 === e.status ? !1 : void n(e, t)
            },
            success: function (e) {
                a.reportLoading.closeLoading("success"), n = 100 * Math.ceil(((new Date).valueOf() - n) / 100), o.time_consuming = n, sensorsdata.track("funnel_analytics", o), a.overViewData = e, a.bookmarkToolbar.setRefresh(e);
                var s = sensorsdata.findProperty(a.paramObj_.by_field, [a.funnelProps]);
                a.labelByValues = a.overViewData.by_values.map(function (e, t) {
                    var n = "";
                    return n = null === e ? sensorsdata.CONSTSET.unknownByValue : "" === e ? sensorsdata.CONSTSET.emptyStringByValue : "$ALL" === e ? sensorsdata.languages.get("总体<!--{en}Overall-->") : sensorsdata.formatByValue(e, s.data_type, a.paramObj_.bucket_param), {
                        cname: n,
                        name: e,
                        index: t
                    }
                }), a.drawConvertTimeTip(a.overViewData), !0 === e.truncated && sensorsdata.info.show(sensorsdata.languages.get("分组值过多，仅显示部分分组，完整数据请通过 API 获取<!--{en}There are to many group clustering value, and only display part of the group,please get the full data through API.-->")), $.isFunction(t) && t()
            }
        })
    }, a.prototype.formatViewDataByGroup = function (e) {
        var t = this, n = e.groups, a = [];
        n.forEach(function (e, n) {
            var s = parseInt(e, 10);
            if (-1 !== s) {
                var r = {};
                r.overview = t.overViewData.funnel_detail[0].overview[s], r.by_values = t.labelByValues[s] && t.labelByValues[s].cname, r.steps = t.overViewData.funnel_detail[0].steps.map(function (e, n) {
                    var a = {};
                    return a.conversion_rate = -1 === r.overview[n].conversion_rate ? "-" : r.overview[n].conversion_rate + "%", n > 0 && (a.prev_rate = -1 === r.overview[n - 1].completion_rate ? "-" : r.overview[n - 1].completion_rate + "%"), a.format_user = sensorsdata.formatNumber(-1 === r.overview[n].converted_user ? 0 : r.overview[n].converted_user), e.rows[s] && (a.rows = $.extend(!0, {}, e.rows[s]), a.rows.conversion_rate = -1 === a.rows.conversion_rate ? "-" : a.rows.conversion_rate + "%"), a.step = n, a.stepIndex = n + 1, $.isArray(t.funnelProps.step_name) && t.funnelProps.step_name[n] && (a.event_name = t.funnelProps.step_name[n]), a
                }), r.completion_rate = -1 === r.overview[r.overview.length - 1].completion_rate ? "-" : r.overview[r.overview.length - 1].completion_rate + "%", n > 0 && (r.line = !0), r.event_names = t.overViewData.event_names, a.push(r)
            }
        });
        var s = {array: a, compare: a.length > 1};
        return s
    }, a.prototype.getFunnelById = function (e, t, n) {
        return sensorsdata.ajax({
            url: "funnels/funnel/" + n, success: function (n) {
                e.call(t, n)
            }
        })
    }, a.prototype.drawConvertTimeTip = function (e) {
        var t = this.funnelSelector.find("li.active input").data("converttime"),
            n = this.hasID(this.allFunnels, this.paramObj_.funnel_id),
            a = this.hasID(this.ownFunnels, this.paramObj_.funnel_id);
        a.length || 1 !== n.length || (t = n[0].max_convert_time), t in this.defaultWindowTimeRelation ? t = this.defaultWindowTimeRelation[t] : Number(t) % 1440 === 0 ? t = Number(t) / 1440 + sensorsdata.languages.get("天<!--{en}day-->") : Number(t) % 60 === 0 ? t = Number(t) / 60 + sensorsdata.languages.get("小时<!--{en}Hour-->") : t += sensorsdata.languages.get("分钟<!--{en}Minute-->"), $("#funnel_datepick_convert_time_content").html(t);
        var s = "",
            r = -1 === e.funnel_detail[0].steps[0].converted_user ? "-" : e.funnel_detail[0].steps[0].converted_user,
            o = -1 === e.funnel_detail[0].completion_rate ? "-" : e.funnel_detail[0].completion_rate + "%";
        s = e && $.isArray(e.event_names) && $.isArray(e.funnel_detail) && $.isArray(e.funnel_detail[0].steps) && e.funnel_detail[0].steps[0] && e.funnel_detail[0].completion_rate && t ? this.inputDate_.val() + sensorsdata.languages.get("进行<!--{en}did-->") + (sensorsdata.findEventCname(e.event_names[0], sensorsdata.cache.events) || e.event_names[0]) + sensorsdata.languages.get("的<!--{en}of-->") + r + sensorsdata.languages.get("人中<!--{en}among people-->") + o + sensorsdata.languages.get("在<!--{en}During-->") + t + sensorsdata.languages.get("内完成了漏斗转化<!--{en}complete funnel conversion -->") : sensorsdata.languages.get("该漏斗第一步到最后一步的最长间隔时间为<!--{en}The longest interval between the first and last steps of the funnel is-->") + t, $("#funnel_datepick_convert_time_tooltip").attr("data-original-title", s).tooltip("destroy").tooltip()
    }, a.prototype.getAllFunnels = function () {
        var e = this;
        return sensorsdata.ajax({
            url: "funnels", data: {limit: 1e3}, success: function (t) {
                e.allFunnels = t, e.ownFunnels = e.allFunnels.filter(function (e) {
                    return e.access
                })
            }
        })
    }, a.prototype.formatNumber = function (e, t) {
        return -1 === e ? "-" : "percent" === t ? sensorsdata.formatNumber(e, !1, !0) : "number" === t ? sensorsdata.formatNumber(e) : "time" === t ? this.converMedianTime(e) : e
    }, a.prototype.renderRowData = function (e, t) {
        var n = this, a = {rows: [], by_index: t}, s = [], r = $.extend(!0, {}, this.paramObj_.config), o = r.step;
        return e.funnel_detail.forEach("$ALL" === o && "trends" === n.currentState ? function (r, o) {
            0 !== o && (s.push({isHead: !0, toggle: !1, isRollUp: !1}), s.push({
                isHead: !1,
                groupName: sensorsdata.formatTime(e.date_list[o], "day"),
                isRollUp: !1
            }), n.measures.forEach(function (a) {
                var i = {isHead: !1, isRollUp: !0, isUser: !0, by_index: t, date: e.date_list[o], rowIndex: 0};
                if ("conversion_rate" === a.index) {
                    var l = r.overview[t];
                    i.conversion_rate = n.formatNumber(l[l.length - 1].completion_rate, "percent"), i.converted_user = n.formatNumber(l[l.length - 1].converted_user, "number")
                } else $.isNumeric(a.index) && (a.index = parseInt(a.index, 10), i.rowIndex = a.index + 1, $.isArray(r.steps) && r.steps.length > 1 ? (i.conversion_rate = n.formatNumber(r.steps[a.index].rows[t].conversion_rate, "percent"), i.converted_user = n.formatNumber(r.steps[a.index].rows[t].converted_user, "number")) : (i.conversion_rate = sensorsdata.formatNumber(0, !1, !0), i.converted_user = sensorsdata.formatNumber(0)));
                i.empty_block = "-" === i.converted_user, s.push(i)
            }), a.rows.push(s), s = [])
        } : $.isNumeric(o) ? function (r, i) {
            0 !== i && (s.push({isHead: !0, toggle: !1, isRollUp: !1}), s.push({
                isHead: !1,
                groupName: sensorsdata.formatTime(e.date_list[i], "day"),
                isRollUp: !1
            }), n.measures.forEach(function (a) {
                var l = {isHead: !1, isRollUp: !0, isUser: !0, by_index: t, date: e.date_list[i], rowIndex: a.index};
                switch (a.index) {
                    case"conversion_rate":
                        l.conversion_rate = n.formatNumber(r.steps[o].rows[t].conversion_rate, "percent");
                        break;
                    case"median":
                        l.median_converted_time = n.formatNumber(r.steps[o].rows[t].median_converted_time, "time");
                        break;
                    case"wastage_user":
                        l.wastage_user = n.formatNumber(r.steps[o].rows[t].wastage_user, "number"), l.isUser = !0, l.isWastage = !0;
                        break;
                    default:
                        $.isNumeric(a.index) && (a.index = parseInt(a.index, 10), l.converted_user = n.formatNumber(r.overview[t][a.index].converted_user, "number"), l.isUser = !0)
                }
                ("-" === l.converted_user || "-" === l.wastage_user) && (l.empty_block = !0), s.push(l)
            }), a.rows.push(s), s = [])
        } : function (r, o) {
            0 !== o && (s.push({isHead: !0, toggle: !1, isRollUp: !1}), s.push({
                isHead: !1,
                groupName: sensorsdata.formatTime(e.date_list[o], "day"),
                isRollUp: !1
            }), e.funnel_detail[0].steps.forEach(function (a, i) {
                var l = {
                    isHead: !1,
                    isRollUp: !0,
                    isUser: !0,
                    by_index: t,
                    converted_user: n.formatNumber(r.overview[t][i].converted_user, "number"),
                    conversion_rate: n.formatNumber(r.overview[t][i].conversion_rate, "percent"),
                    date: e.date_list[o],
                    rowIndex: i
                };
                ("-" === l.converted_user || "-" === l.conversion_rate) && (l.empty_block = !0), s.push(l)
            }), a.rows.push(s), s = [])
        }), a
    }, a.prototype.renderTableDataBak = function (e) {
        var t = this, n = {};
        n.by_value = !1, n.completion_rate = e.funnel_detail[0].completion_rate, n.by_values = e.by_values, n.event_names = e.event_names, n.overview = e.funnel_detail[0], n.heads = [], n.rows = [];
        var a = $.extend(!0, {}, this.paramObj_.config), s = a.step, r = [];
        if ("$ALL" === s && "trends" === t.currentState) e.by_values.forEach(function (e, a) {
            r.push({isHead: !0, toggle: !0, by_index: a}), r.push({
                isHead: !0,
                groupName: t.labelByValues[a].cname,
                isRollUp: !1,
                by_index: a
            });
            var s = n.overview.overview[a];
            t.measures.forEach(function (e) {
                var n = {isHead: !1, isRollUp: !0, isUser: !0, by_index: a, rowIndex: 0};
                "conversion_rate" === e.index ? (n.conversion_rate = t.formatNumber(s[s.length - 1].completion_rate, "percent"), n.converted_user = t.formatNumber(s[s.length - 1].converted_user, "number")) : $.isNumeric(e.index) && (e.index = parseInt(e.index, 10), n.rowIndex = e.index + 1, n.conversion_rate = t.formatNumber(s[e.index + 1].conversion_rate, "percent"), n.converted_user = t.formatNumber(s[e.index + 1].converted_user, "number")), n.empty_block = "-" === n.converted_user, r.push(n)
            }), n.rows.push(r), r = []
        }), n.heads = $.extend(!0, [], this.measures), n.heads.unshift({}), n.heads.unshift({isRollUp: !1}), n.head = n.heads.map(function (e, t) {
            return t > 0 && (e.isHead = !0, e.isRollUp = !0), e
        }); else if ($.isNumeric(s)) {
            s = parseInt(s, 10);
            var o = n.overview.steps;
            e.by_values.forEach(function (e, a) {
                r.push({isHead: !0, toggle: !0, by_index: a}), r.push({
                    isHead: !0,
                    groupName: t.labelByValues[a].cname,
                    isRollUp: !1,
                    by_index: a
                }), t.measures.forEach(function (e) {
                    var i = {isHead: !1, isRollUp: !0, isUser: !0, by_index: a, rowIndex: e.index};
                    switch (e.index) {
                        case"conversion_rate":
                            i.conversion_rate = t.formatNumber(o[s].rows[a].conversion_rate, "percent");
                            break;
                        case"median":
                            i.median_converted_time = t.formatNumber(o[s].rows[a].median_converted_time, "time");
                            break;
                        case"wastage_user":
                            i.wastage_user = t.formatNumber(o[s].rows[a].wastage_user, "number"), i.isUser = !0, i.isWastage = !0;
                            break;
                        default:
                            $.isNumeric(e.index) && (e.index = parseInt(e.index, 10), i.converted_user = t.formatNumber(n.overview.overview[a][e.index].converted_user, "number"), i.isUser = !0)
                    }
                    r.push(i)
                }), n.rows.push(r), r = []
            }), n.heads = $.extend(!0, [], this.measures), n.heads.unshift({}), n.heads.unshift({}), n.head = n.heads.map(function (e, t) {
                return t > 0 && (e.isHead = !0, e.isRollUp = !0), e
            })
        } else n.steps = e.funnel_detail[0].steps, n.heads = e.event_names.map(function (e, n) {
            return {
                isRollUp: !0,
                cname: t.funnelProps.step_name[n] || sensorsdata.findEventCname(e, sensorsdata.cache.events) || e
            }
        }), n.heads.unshift({}), n.heads.unshift({}), t.paramObj_.config.groups.forEach(function (e) {
            r.push({isHead: !0, toggle: !0, by_index: e}), r.push({
                groupName: t.labelByValues[e].cname,
                isHead: !0,
                isRollUp: !1,
                by_index: e
            }), n.steps.forEach(function (a, s) {
                r.push({
                    isHead: !1,
                    isRollUp: !0,
                    isUser: !0,
                    converted_user: t.formatNumber(n.overview.overview[e][s].converted_user, "number"),
                    conversion_rate: t.formatNumber(n.overview.overview[e][s].conversion_rate, "percent"),
                    by_index: e,
                    rowIndex: s
                })
            }), n.rows.push(r), r = []
        });
        return n
    }, a.prototype.appendCreate = function () {
        var e = this;
        sensorsdata.maskLayer.show(), sensorsdata.maskLayer.maskEle.click(function () {
            e.closeFloat()
        });
        var t = {title: sensorsdata.languages.get("创建漏斗<!--{en}Create funnel-->"), del: !1};
        e.editFloatContainer.html(Mustache.render(e.tplFunnelEdit, t)), e.editFloatContainer.find('[data-toggle="tooltip"]').tooltip(), e.filters = new sensorsdata.FilterGroupEventList({
            container: $("#fu_cface_filter"),
            type: "funnel",
            tpl: $("#tpl_funnel_filter_group_events_list").html(),
            events: sensorsdata.cache.events
        }), e.initFloatEvents(), $("html, body").css("overflow", "hidden"), e.editFloatContainer.css({
            width: 800,
            right: -800,
            display: "block"
        }).animate({right: 0}, function () {
            e.editFloatContainer.find("span.icon-help").tooltip("destroy").tooltip(), e.filters.addFilterEvent({}, {}, !1), e.filters.addFilterEvent({}, {}, !1), $("html, body").css("overflow", "auto"), e.reCountNumber(), e.sortable()
        }), e.presentState = "create"
    }, a.prototype.appendEdit = function (e) {
        var t = this, n = {title: sensorsdata.languages.get("编辑漏斗<!--{en}Edit the funnel-->"), del: !0},
            a = e.steps.filter(function (e) {
                return e.relevance_field
            }).length > 1;
        sensorsdata.maskLayer.show(), sensorsdata.maskLayer.maskEle.click(function () {
            t.closeFloat()
        });
        var s = Mustache.render(t.tplFunnelEdit, $.extend({}, n, e));
        if ($("html, body").css("overflow", "hidden"), t.editFloatContainer.html(s).css({
            width: 800,
            right: -800,
            display: "block"
        }).animate({right: 0}, function () {
            t.editFloatContainer.find('[data-method="relate-props"]').toggleClass("on", a), sensorsdata.popover({
                ele: t.editFloatContainer.find("span.icon-card"),
                template: $("#tpl-creator-info-tip").html(),
                html: !0,
                content: Mustache.render($("#tpl-creator-info-content").html(), e),
                placement: "right",
                container: t.editFloatContainer,
                trigger: "hover"
            }), t.editFloatContainer.find("span.icon-help").tooltip("destroy").tooltip(), t.editFloatContainer.find('[data-toggle="tooltip"]').tooltip(), t.filters = new sensorsdata.FilterGroupEventList({
                container: t.editFloatContainer.find("#fu_cface_filter"),
                type: "funnel",
                tpl: $("#tpl_funnel_filter_group_events_list").html(),
                events: sensorsdata.cache.events
            }), $("html, body").css("overflow", "auto"), t.filters.setData(e.steps, function () {
                t.filters.toggleRelationField(a), t.reCountNumber(), t.sortable()
            })
        }), t.initFloatEvents(), t.defaultWindowTimeRelation[e.max_convert_time + ""]) $("#fu_cface_covert_time").val(e.max_convert_time + ""); else {
            if ($("#fu_cface_covert_time").val("custom"), $("#fu_cface_covert_time_custom_input").closest("div").css({display: "inline-block"}), Number(e.max_convert_time) % 1440 === 0) return $("#fu_cface_covert_time_custom_input").val(Number(e.max_convert_time) / 1440), $("#fu_cface_covert_time_custom_select").val(String(1440)), !1;
            if (Number(e.max_convert_time) % 60 === 0) return $("#fu_cface_covert_time_custom_input").val(Number(e.max_convert_time) / 60), $("#fu_cface_covert_time_custom_select").val(String(60)), !1;
            $("#fu_cface_covert_time_custom_input").val(e.max_convert_time), $("#fu_cface_covert_time_custom_select").val(String(1))
        }
    }, a.prototype.sortable = function () {
        var e = this;
        Sortable.create($("#fu_cface_filter").get(0), {
            onSort: function () {
                e.reCountNumber()
            }, animation: 200, handle: ".fu-filter-pos"
        })
    }, a.prototype.reCountNumber = function () {
        $("#fu_cface_filter .events-manage-filter-group").each(function (e, t) {
            var n = $(t).find(".fu-filter-pos");
            1 >= e ? $(t).find(".events-manage-filter-group-head .btn.remove").hide() : $(t).find(".events-manage-filter-group-head .btn.remove").show(), n.length > 0 ? n.html(e + 1) : $(t).find(".events-manage-filter-group-head").prepend('<div class="fu-filter-pos">' + (e + 1) + "</div>")
        })
    }, a.prototype.saveFunnel = function () {
        var e = (new Date).valueOf(), t = {operation_type: "", success: !0}, n = this, a = this.buildFunnelOption();
        a && ("create" === this.presentState ? (t.operation_type = "新建", sensorsdata.ajax({
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(a),
            type: "post",
            url: "funnels/funnel",
            error: function (e) {
                t.success = !1, t.fail_reason = e.status, t.time_consuming = "", sensorsdata.track("funnel_analytics_operation", t)
            },
            success: function (a) {
                e = 100 * Math.ceil(((new Date).valueOf() - e) / 100), t.time_consuming = e, sensorsdata.track("funnel_analytics_operation", t), n.closeFloat(), "object" == typeof a && a.id && (n.refreshFunnelSelector(a.id, !0), sensorsdata.success.show(sensorsdata.languages.get("漏斗创建成功<!--{en}Create the funnel successfully-->")))
            }
        })) : (t.operation_type = sensorsdata.languages.get("编辑<!--{en}Edit-->"), sensorsdata.ajax({
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(a),
            type: "post",
            url: "funnels/funnel/" + this.presentState,
            error: function (e) {
                t.success = !1, t.fail_reason = e.status, t.time_consuming = "", sensorsdata.track("funnel_analytics_operation", t)
            },
            success: function (a) {
                e = 100 * Math.ceil(((new Date).valueOf() - e) / 100), t.time_consuming = e, sensorsdata.track("funnel_analytics_operation", t), "object" == typeof a && a.id && n.refreshFunnelSelector(a.id, !1), n.closeFloat()
            }
        })))
    }, a.prototype.saveAsFunnel = function () {
        var e = (new Date).valueOf(), t = this, n = this.buildFunnelOption(), a = {operation_type: "", success: !0};
        n && (a.operation_type = "另存为", sensorsdata.ajax({
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(n),
            type: "post",
            url: "funnels/funnel",
            isCommonError: !1,
            error: function (e) {
                var t = e.responseJSON && e.responseJSON.error, n = t ? {
                    content: t,
                    duration: 2e3
                } : {
                    content: sensorsdata.languages.get("请求失败<!--{en}Request failed-->"),
                    isclose: !0,
                    autohide: !1,
                    errorDetail: "url=funnels/funnel"
                };
                a.success = !1, a.fail_reason = e.status, a.time_consuming = "", sensorsdata.track("funnel_analytics_operation", a), sensorsdata.error.show(n)
            },
            success: function (n) {
                e = 100 * Math.ceil(((new Date).valueOf() - e) / 100), a.time_consuming = e, sensorsdata.track("funnel_analytics_operation", a), t.closeFloat(), "object" == typeof n && n.id && (t.refreshFunnelSelector(n.id, !0), sensorsdata.success.show(sensorsdata.languages.get("漏斗创建成功<!--{en}Create the funnel successfully-->")))
            }
        }))
    }, a.prototype.deleteFunnel = function (e) {
        var t = (new Date).valueOf(), n = this,
            a = Mustache.render($("#tpl_delete_funnel_content").html(), $("#fu_cface_name").attr("data-name"));
        sensorsdata.popover({
            ele: e,
            showNow: !0,
            footer: $("#tpl_popover_footer_state_3").html(),
            content: a,
            success: function () {
                n.closeFloat();
                var e = {operation_type: sensorsdata.languages.get("删除<!--{en}Delete-->"), success: !0};
                sensorsdata.ajax({
                    type: "delete", url: "funnels/funnel/" + n.presentState, error: function (t) {
                        e.success = !1, e.fail_reason = t.status, e.time_consuming = "", sensorsdata.track("funnel_analytics_operation", e)
                    }, success: function () {
                        t = 100 * Math.ceil(((new Date).valueOf() - t) / 100), e.time_consuming = t, sensorsdata.track("funnel_analytics_operation", e), n.refreshFunnelSelector(null, !1)
                    }
                })
            }
        })
    }, a.prototype.buildFunnelOption = function () {
        var e = $.trim($("#fu_cface_name").val()), t = $("#fu_cface_covert_time").val(), n = this.filters.getData(),
            a = null, s = this.editFloatContainer.find('[data-method="relate-props"]').hasClass("on");
        if ("custom" === t) {
            if (a = this.customTime(), "number" != typeof a) return sensorsdata.error.show(a), !1;
            t = String(a)
        }
        if ("" === e) return sensorsdata.error.show(sensorsdata.languages.get("漏斗名字不能为空<!--{en}The name of the funnel can not be null-->")), !1;
        var r = this.editFloatContainer.find('.events-manage-prop-relation-content:visible > [data-id="relation-props-select"] > select option:selected').filter(function (e, t) {
            return "none" !== $(t).val()
        });
        if (s) {
            if (r.length < 2) return sensorsdata.error.show(sensorsdata.languages.get("请至少关联 2 个属性<!--{en}Please link at least 2 properties-->")), !1;
            var o = $(r[0]), i = r.filter(function (e, t) {
                return o.attr("data-type") === $(t).attr("data-type")
            });
            if (i.length !== r.length) return sensorsdata.error.show(sensorsdata.languages.get("关联属性类型必须一致<!--{en}The type of the associated properties must be consistent-->")), !1
        }
        return n = n.filter(function (e) {
            return "object" != typeof e ? !1 : "$Anything" !== e.event_name
        }), !$.isArray(n) || n.length < 2 || n.length > 32 ? (sensorsdata.error.show(sensorsdata.languages.get("漏斗步骤数只能是2到32个<!--{en}The number of the steps of the funnel must be 2 to 32-->")), !1) : {
            name: e,
            max_convert_time: t,
            steps: n
        }
    }, a.prototype.customTime = function () {
        var e = [1, 5256e3], t = $("#fu_cface_covert_time_custom_input").val(),
            n = $("#fu_cface_covert_time_custom_select option:selected").val();
        if (t = t.replace(/^\s+/, "").replace(/\s+$/, ""), $("#fu_cface_covert_time_custom_input").val(t), !/^\d+$/.test(t)) return sensorsdata.languages.get("您输入的自定义窗口期数据只能是数字<!--{en}The custom window period can only be number-->");
        var a = Number(t) * Number(n);
        return a >= e[0] && a <= e[1] ? a : sensorsdata.languages.get("自定义窗口期时间范围，1分钟到10年<!--{en}Time range of custom window period, 1minute to 10 years-->")
    }, a.prototype.closeFloat = function () {
        var e = this;
        $("html,body").css("overflow", "hidden"), e.editFloatContainer.animate({right: -800}, function () {
            $("html,body").css("overflow", "auto"), $(this).hide()
        }), sensorsdata.maskLayer.hide()
    }, a.prototype.buildParamObj_ = function () {
        var e = $.extend(!0, {}, this.paramObj_);
        e.from_date = this.inputDate_.data("startDate").format(sensorsdata.CONSTSET.dateFormat), e.to_date = this.inputDate_.data("endDate").format(sensorsdata.CONSTSET.dateFormat), e.extend_over_end_date = !this.inputDate_.data("isLimit"), e.rangeText = this.inputDate_.data("daterangepicker") && this.inputDate_.data("daterangepicker").chosenLabel;
        var t = this.groupControl_.val(), n = t.byFields || [], a = t.bucket || {};
        if (1 === n.length) {
            var s = n[0].split(".");
            e.by_field_step = parseInt(s.shift(), 10), e.by_field = s.join("."), e.bucket_param = a[n[0]]
        } else delete e.by_field_step, delete e.by_field, delete e.bucket_param;
        var r = this.funnelFilterControl.val();
        return $.isEmptyObject(r) ? (delete e.filter, delete e.filter_field_steps) : (e.filter = r, e.filter_field_steps = r.conditions.map(function (e) {
            var t = e.field.split("."), n = parseInt(t.shift(), 10);
            return e.field = t.join("."), n
        })), e.funnel_id = this.selectedFunnelId, e.sampling_factor = this.bookmarkToolbar.getSamplingValue(), e
    }, a.prototype.renderTable = function () {
        var e = this, t = e.renderTableDataBak(e.overViewData);
        this.tableData_ = t;
        var n = function (n, a) {
            var s = {heads: t.heads, rows: t.rows.slice(n, a)};
            e.tableContainer.html("");
            var r = Mustache.render(e.tplTable_, s);
            e.tableContainer.html(r)
        }, a = t.rows.length, s = sensorsdata.CONSTSET.paginationSize;
        this.$paginationContainer_.html(""), 0 === a ? (this.tableContainer.html(""), this.$paginationContainer_.hide()) : s >= a ? n(0, a) : sensorsdata.pagination({
            pageItems: s,
            tableElement: e.tableContainer,
            paginationElement: e.$paginationContainer_,
            totalItems: a,
            clickHandle: sensorsdata.bind(function (e) {
                n(e.range[0] - 1, e.range[1])
            }, this),
            updateHeader: sensorsdata.bind(function (e) {
                e.find("table thead.header-copy").remove(), e.find("table").fixedHeader()
            }, this)
        }), e.tableContainer.find("table").fixedHeader()
    }, a.prototype.updateReportName_ = function (e) {
        var t = $.trim(this.funnelSelector.find("select option:selected").html()) + sensorsdata.languages.get("转化漏斗<!--{en}Conversion Funnel-->");
        e && e.id && e.name && (t = e.name), this.options.container.find("#reportName").text(t), this.bookmarkToolbar.setDialogName(t)
    }, a.prototype.prevQuery_ = function (e) {
        var t = this.buildParamObj_();
        if (sensorsdata.cache.config.auto_refresh) {
            var n = this, a = JSON.stringify(this.paramObj) !== JSON.stringify(t);
            n.paramObj_ = t, a && n.getChartData(n.paramObj_, function () {
                n.checkConfig(n.paramObj_.config), n.renderFunnelProcess(n.paramObj_.config, n.currentState), n.renderChartConfig_(n.paramObj_.config), n.renderTable(), n.updateHash(n.paramObj_), $.isFunction(e) && e()
            })
        }
    }, a.prototype.reload = function () {
        window.location.pathname === this.pageName && this.init()
    }, a.prototype.unload = function () {
        $("body").off("click.funnel"), $(window).off("resize.funnel"), this.options.container.find('[data-toggle="tooltip"]').tooltip("destroy"), this.bookmarkToolbar.destroy(), this.inputDate_ && this.inputDate_.data("daterangepicker") && (this.inputDate_.tooltip("destroy"), this.inputDate_.data("daterangepicker").remove())
    }, a.prototype.handleLoading = function (e, t) {
        var n = parseInt(e.sampling_factor, 10) || 64;
        this.reportLoading.options.sampling_factor = n, 64 === n ? (this.reportLoading.options.quickType = "sampling_factor", this.reportLoading.options.openQuickQuery = function () {
            e.sampling_factor = this.paramObj_.sampling_factor = 16, this.reportLoading.options.sampling_factor = e.sampling_factor, this.bookmarkToolbar.samplingSlider_ && this.bookmarkToolbar.samplingSlider_.setValue(4, !0, !0), this.getChartData(e, t)
        }.bind(this)) : this.reportLoading.options.quickType = "none", this.reportLoading.showLoading()
    }, n.exports = a
});
;
/*!pages/import/import.js*/
define("pages/import/import", function (t, o, n) {
    function e(t) {
        this.options = t, this.options.container = t.container || $("body"), this.pageName = window.location.pathname, this.tplPage_ = $("#tpl-no-data-import").html(), this.options.container.html(this.tplPage_), this.tplCopy_ = $("#tpl-no-data-import-copy").html(), this.copyBtnSelector_ = ".sa-data-import [data-clipboard-text]", this.copyBtn_ = this.options.container.find(this.copyBtnSelector_), this.init_()
    }

    e.prototype.init_ = function () {
        this.initEvents_(), this.getConfig()
    }, e.prototype.showTooltip = function (t, o) {
        t.tooltip({container: "body", placement: "bottom", title: o, trigger: "hover"}).tooltip("show")
    }, e.prototype.showPopover = function (t) {
        t.popover({
            trigger: "manual",
            container: t.parents("#import-copy-panel"),
            placement: "bottom",
            title: sensorsdata.languages.get("手动复制<!--{en}Manual copy-->"),
            html: !0,
            content: '<input value="' + t.attr("data-clipboard-text") + '"/>'
        }).on("shown.bs.popover", function () {
            var o = t.attr("aria-describedby");
            $("#" + o).find("input").focus().select()
        }).popover("show")
    }, e.prototype.initEvents_ = function () {
        var t = this;
        $("body").bind("click.importpage", function (o) {
            var n = $(o.target || o.srcElement), e = n.parents("#import-copy-panel");
            if (0 === e.size()) t.copyBtn_.popover("hide"); else if (n.attr("id")) for (var a = n.attr("id"), i = t.options.container.find('button[id!="' + a + '"]'), r = 0, s = i.size(); s > r; r++) i.eq(r).popover("hide")
        }), t.copyBtn_.unbind("mouseleave.importpage").bind("mouseleave.importpage", function () {
            $(this).tooltip("destroy")
        })
    }, e.prototype.getConfig = function () {
        var t = this;
        sensorsdata.ajax({
            url: "common/import/config", data: {url: location.href}, complete: function () {
                t.options.closeLoading()
            }, success: function (o) {
                function n(t) {
                    var n = "https://www.sensorsdata.cn/tools/code_auto/?data=";
                    return o.code_type = t, n + encodeURIComponent(JSON.stringify(o))
                }

                if ($.isEmptyObject(o)) return sensorsdata.log(sensorsdata.languages.get("请求数据接入地址失败<!--{en}Request data access address failed-->")), !1;
                var e = o.http_data_url, a = o.https_data_url, i = (o.http_data_url || o.https_data_url) + "debug",
                    r = [];
                sensorsdata.cache.project.name && r.push("project=" + sensorsdata.cache.project.name), o.super_token && r.push("token=" + o.super_token), e && (e += "sa", t.options.container.find(".http-address").show()), a && (a += "sa", t.options.container.find(".https-address").show()), r.length > 0 && (e += "?" + r.join("&"), a += "?" + r.join("&"), i += "?" + r.join("&")), t.options.container.find('[data-link-type="web"]').prop("href", n("web")), t.options.container.find('[data-link-type="android"]').prop("href", n("android")), t.options.container.find('[data-link-type="ios"]').prop("href", n("ios")), t.options.container.find("#code-import-data-address").attr("data-clipboard-text", e), t.options.container.find("#code-import-data-address-https").attr("data-clipboard-text", a), t.options.container.find("#vtrack-import-data-address").attr("data-clipboard-text", e), t.options.container.find("#vtrack-import-data-address-https").attr("data-clipboard-text", a), sensorsdata.ajax({
                    type: "get",
                    url: "heat_map/scheme",
                    success: function (o) {
                        var n = o.scheme;
                        t.options.container.find("#vtrack-app-click-scheme").attr("data-clipboard-text", n)
                    }
                }), t.copyBtn_.removeAttr("disabled"), t.options.container.find("#check_url").attr("href", i), t.options.container.find("#private_url").toggle(-1 === location.hostname.indexOf("cloud.sensorsdata.cn"));
                var s = new Clipboard(t.copyBtnSelector_);
                s.on("success", function (o) {
                    t.showTooltip($(o.trigger), sensorsdata.languages.get("复制成功！<!--{en}Copy successful!-->"))
                }), s.on("error", function (o) {
                    t.showPopover($(o.trigger))
                })
            }
        })
    }, e.prototype.unload = function () {
        this.copyBtn_.unbind("mouseleave.importpage"), $("body").unbind("click.importpage")
    }, n.exports = e
});
;
/*!pages/segmentation/segmentation.js*/
define("pages/segmentation/segmentation", function (e, t, a) {
    function s(e) {
        sensorsdata.SegmentationBase.call(this), this.options = $.extend(!0, {}, e), this.options.container = e.container || $("body"), this.state = this.options.state || {}, this.tplPage_ = $("#tpl-segmentation-index").html(), this.options.container.html(this.tplPage_), this.tplMeasureLine_ = $("#tpl-segmentation-index-measure-line").html(), this.tplMeasureItem_ = $("#tpl-segmentation-index-measure-item").html(), this.tplChartConfigItem_ = $("#tpl-segmentation-index-chart-config-item").html(), this.groupContainer_ = this.options.container.find("#segmentation-group-hold-place"), this.filterContainer_ = this.options.container.find("#filter-hold-place"), this.measuresContainer_ = this.options.container.find("#measures-container"), this.measuresContainer_.find('[data-toggle="tooltip"]').tooltip(), this.$btnQuery_ = this.options.container.find("#btn-query"), this.chartsContainer_ = this.options.container.find("#chartsContainer"), this.$btnChartConfig_ = this.options.container.find("#btn-chart-config"), this.$chartMeasureSelector_ = this.options.container.find("#chart-measure-selector"), this.$chartBySelector_ = this.options.container.find("#chart-by-selector"), this.$tableConfig_ = this.options.container.find(".table-config"), this.tableContainer_ = this.options.container.find("#table-container"), this.reportNoData_ = this.options.container.find("div.report-no-data"), this.btnAddFilter_ = this.options.container.find("#btnAddFilter"), this.chartsType_ = this.options.container.find("#charts-type"), this.inputUnit_ = this.options.container.find("#input-unit"), this.inputDate_ = this.options.container.find("#inputDate"), this.UNIT = {
            minute: sensorsdata.languages.get("按分钟<!--{en}By minute-->"),
            hour: sensorsdata.languages.get("按小时<!--{en}By hour-->"),
            day: sensorsdata.languages.get("按天<!--{en}By day-->"),
            week: sensorsdata.languages.get("按周<!--{en}By week-->"),
            month: sensorsdata.languages.get("按月<!--{en}By month-->")
        }, this.measureFunctions_ = sensorsdata.CONSTSET.measureFunctions, this.filterControl_ = new sensorsdata.FilterGroupControl, this.groupControl_ = new sensorsdata.GroupControl, this.table_ = null, this.rawSegObj_ = {}, this.rawCompareSegObj_ = {}, this.rawRollupSegObj_ = {}, this.rawRollupCompareSegObj_ = {}, this.segObj_ = {}, this.compareSegObj_ = {}, this.rollupSegObj_ = {}, this.rollupCompareSegObj_ = {}, this.chart_ = null, this.bookmarkToolbar = {}, this.activeHourRanges_ = [sensorsdata.languages.get("今日<!--{en}Today-->"), sensorsdata.languages.get("昨日<!--{en}Yesterday-->")], this.selectedSession_ = {}, this.defaultSeriesLimit_ = 10, this.chartMeasureIndexs_ = [], this.chartByNames_ = [], this.tplAxisConfigModal_ = $("#tpl-config-axis").html(), this.axisConfigContainer_ = this.options.container.find("#config-axis-container"), this.axisConfig = {
            isNormalize: !1,
            left: [],
            right: []
        }, this.reportLoading = new o({
            container: this.chartsContainer_,
            needHideDom: [this.$tableConfig_, this.tableContainer_],
            quickType: "",
            approx: ""
        }), this.init()
    }

    var n = e("components/util/util"), i = e("components/model/bookmarks"),
        r = e("components/bookmarkToolbar/bookmarkToolbar"), o = e("components/reportLoading/reportLoading");
    sensorsdata.inherits(s, sensorsdata.SegmentationBase), s.prototype.init = function () {
        s.superClass_.init.call(this);
        var e = this;
        this.$btnQuery_.toggle(sensorsdata.cache.config.auto_refresh === !1);
        var t = sensorsdata.unparam(window.location.hash), a = this.dealParam(t), o = n.getTimeRange(a.rangeText, !1);
        if (a.rangeText && !$.isEmptyObject(o)) {
            var d = "hour" === a.unit || "minute" === a.unit,
                l = d ? sensorsdata.CONSTSET.timeFormat : sensorsdata.CONSTSET.dateFormat;
            if (d) {
                var h = moment(a.from_date).hour(), u = moment(a.to_date).hour() || 23;
                a.from_date = moment(o.from_date).hour(h).format(l), a.to_date = moment(o.to_date).hour(u).format(l)
            } else a.from_date = moment(o.from_date).format(l), a.to_date = moment(o.to_date).format(l)
        }
        this.paramObj = a, this.axisConfig.isNormalize = a.axis_config.isNormalize ? a.axis_config.isNormalize : !1, this.axisConfig.left = a.axis_config.left ? a.axis_config.left : [], this.axisConfig.right = a.axis_config.right ? a.axis_config.right : [];
        var m = a[sensorsdata.CONSTSET.bookmarkId];
        if (m) {
            var c = "segmentation-widget-" + m;
            this.chartByNames_ = JSON.parse(sensorsdata.localStorage.getItem(c)) || []
        }
        if (0 === this.chartByNames_.length) {
            var p = this.getPageStatusItem_("byFields") || "";
            p === (a.by_fields || []).join() && (this.chartByNames_ = this.getPageStatusItem_("chartByNames") || [])
        }
        var g = this.state;
        if (this.bookmarkToolbar = r.create({
            dashid: g.dashid,
            fromDashboard: "dashboard" === g.from && !!g.dashid,
            showSaveAndAdd: "dashboard" === g.from && "add" === g.action && !!g.dashid,
            widgetConfigDisplay: !0,
            samplingDisplay: !0,
            algDropdownDisplay: !0,
            samplingFactor: this.paramObj.sampling_factor,
            algDropdownValue: a.approx,
            onBookmarkAdded: sensorsdata.bind(function (e) {
                this.paramObj[sensorsdata.CONSTSET.bookmarkId] = e.id
            }, this),
            onBookmarkNameChanged: sensorsdata.bind(function () {
                this.updateReportName_(this.bookmarkToolbar.bookmark)
            }, this),
            onAlgChanged: sensorsdata.bind(function (e) {
                this.paramObj.approx = e, sensorsdata.cache.config.auto_refresh && this.getSeg_({})
            }, this),
            onRefreshClick: sensorsdata.bind(function (e) {
                this.reviewDateRange_(), this.getSeg_({}, e)
            }, this),
            onDownloadClick: sensorsdata.bind(function () {
                this.download()
            }, this),
            downloadTip: sensorsdata.languages.get("下载数据 csv<!--{en}Download CSV-->"),
            container: $("#bookmark-save-bar"),
            bookmarkid: m,
            params: this.paramObj,
            type: this.pageName
        }), m) i.get(m, function (t) {
            var s = n.json.parse(t && t.config), i = n.json.parse(t && t.data);
            if (s.measureIndexs && (e.chartMeasureIndexs_ = s.measureIndexs), s.byFields && (e.chartByNames_ = s.byFields), i.rangeText && i.compare_from_date && i.compare_to_date) {
                var r = {
                    compareKey: s.compareKey,
                    from_date: i.from_date,
                    to_date: i.to_date,
                    compare_from_date: i.compare_from_date,
                    compare_to_date: i.compare_to_date
                }, o = n.getTimeRange(i.rangeText, !0, r);
                !$.isEmptyObject(o) && o.compare_from_date && o.compare_to_date && (e.paramObj.compare_from_date = o.compare_from_date, e.paramObj.compare_to_date = o.compare_to_date)
            }
            var d = "#" + $.param(e.paramObj);
            window.history.replaceState(d, "", d), e.renderInputs_(!!a.session_name)
        }); else {
            var f = "#" + $.param(e.paramObj);
            window.history.replaceState(f, "", f), this.renderInputs_(!!a.session_name)
        }
    }, s.prototype.initSessionDropDown_ = function (e) {
        var t = this, a = $(".session-dropdown");
        a.toggleClass("disabled", sensorsdata.authority.isNormal).show().prev().show(), a.find("button").toggleClass("disabled", sensorsdata.authority.isNormal), sensorsdata.ajax({
            useCache: !0,
            url: "sessions/all",
            success: function (s) {
                $.isArray(s) || (s = []), a.find("button").saDropdown({
                    value: e ? "session" : "event",
                    onSelect: function () {
                        return 0 === s.length && sensorsdata.info.show({
                            content: sensorsdata.languages.get('请先在“元数据”中创建 Session<!--{en}Please create Session in "metadata"-->'),
                            duration: 2e3
                        }), s.length > 0
                    },
                    onSelected: function (e) {
                        t.paramObj.measures = [], t.renderInputs_("session" === e), t.updateReportName_(t.bookmarkToolbar.bookmark)
                    }
                })
            }
        })
    }, s.prototype.renderInputs_ = function (e) {
        var t = this.paramObj, a = this, s = function () {
            t = a.dealParam(t);
            var e = a.getEventNamesFromParam(t.measures);
            a.getProperties(e, function (e) {
                a.propObj = $.extend(!0, {}, e), a.paramObj = a.removeInvalidProperties(t, a.propObj), a.initInput_(t), a.initEvents_(), sensorsdata.cache.config.auto_refresh === !0 ? a.getSeg_(t) : a.options.closeLoading(), a.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh)
            })
        };
        e ? this.getSessions(function (e) {
            if (e.length > 0) {
                var n = e.filter(function (e) {
                    return e.name === t.session_name
                })[0];
                n || (t.session_name = e[0].name, n = e[0]), this.selectedSession_ = n, a.events = $.extend(!0, [], sensorsdata.cache.events).filter(function (e) {
                    return n.event_list.indexOf(e.name) >= 0
                }), "ALL" === sensorsdata.authority.eventPermission.type && a.events.unshift(sensorsdata.CONSTSET.everyEvent), a.events.unshift(sensorsdata.CONSTSET.sessionGeneral), a.events[0].cname = n.cname
            } else this.selectedSession_ = [];
            s()
        }) : (delete t.session_name, a.events = $.extend(!0, [], sensorsdata.cache.events), "ALL" === sensorsdata.authority.eventPermission.type && a.events.unshift(sensorsdata.CONSTSET.everyEvent), s())
    }, s.prototype.unload = function () {
        this.table_ && $.isFunction(this.table_.unload) && this.table_.unload(), this.savePageStatus_(), this.bookmarkToolbar.destroy(), this.options.container.find("[data-toggle=tooltip]").tooltip("destroy"), $("body").unbind("click.segmentation"), sensorsdata.form.removeChildrenError(this.measuresContainer_), $(window).off("unload.segmentation"), $(window).off("resize.segmentation"), this.inputDate_ && this.inputDate_.data("daterangepicker") && (this.inputDate_.tooltip("destroy"), this.inputDate_.data("daterangepicker").remove())
    }, s.prototype.reload = function () {
        window.location.pathname === this.pageName && (this.paramObj = this.dealParam(sensorsdata.unparam(window.location.hash)), this.renderInputs_(!!this.paramObj.session_name))
    }, s.prototype.initInput_ = function (e) {
        this.renderMeasures_(this.sessions, e), this.reCountNumber(), this.groupControl_.init({
            container: this.groupContainer_,
            data: this.propObj.intersection,
            btnAddDisplay: !0,
            btnRemoveDisplay: !0,
            disabled: sensorsdata.authority.isNormal
        }), this.groupControl_.val({
            byFields: e.by_fields,
            bucket: e.bucket_params
        }), this.filterControl_.init({
            container: this.filterContainer_,
            propertyObj: this.propObj.intersection,
            disabled: sensorsdata.authority.isNormal
        }), this.filterControl_.val({
            relation: e.filter && e.filter.relation,
            conditions: e.filter && e.filter.conditions
        }), this.initDate_(e.from_date, e.to_date), this.$tableConfig_.find('[data-method="transfer"]').toggleClass("active", "y" === e.tType), this.$tableConfig_.find('button[data-method="percent"]').toggleClass("active", "y" === e.ratio), sensorsdata.authority.isNormal && this.options.container.find("#report-ops").find("button,input,select").attr("disabled", !0)
    }, s.prototype.reCountNumber = function () {
        this.measuresContainer_.find(".measure-line").each(function (e, t) {
            var a = sensorsdata.CONSTSET.letters, s = a.length;
            $(t).find('span[data-method="line-prefix"]').html(a[e % s] + (e > s - 1 ? "'" : ""))
        })
    }, s.prototype.initEvents_ = function () {
        var e = this, t = e.paramObj;
        this.initSessionDropDown_(t.session_name), this.$btnQuery_.unbind("click").bind("click", function () {
            e.getSeg_()
        }), this.bookmarkToolbar.off("updateSampling").on("updateSampling", function (t) {
            $.extend(!0, e.paramObj, t), e.getSeg_()
        }), this.bookmarkToolbar.off("updateParams").on("updateParams", function (t) {
            t.dashboard_cache_policy ? e.paramObj.dashboard_cache_policy = t.dashboard_cache_policy : delete e.paramObj.dashboard_cache_policy
        }), this.btnAddFilter_.unbind("click").bind("click", function () {
            e.filterControl_.addFilter()
        }), this.groupControl_.bindEvent("valueChangedEvent", function () {
            e.chartByNames_ = [], e.prevQuery_()
        }), this.filterControl_.bindEvent("valueChangedEvent", sensorsdata.bind(this.prevQuery_, this));
        var a = this.$btnChartConfig_.next(".config");
        this.$btnChartConfig_.unbind("click").bind("click", function () {
            if (a.toggle().is(":visible")) {
                var t = e.paramObj, s = e.buildMeasureNames(!1), n = $.extend(!0, [], t.measures).map(function (t, a) {
                    return t.index = a, t.name = s[a], t.checked = e.chartMeasureIndexs_.indexOf(a) >= 0, t
                }), i = {items: n, isMeasure: !0, chartType: "line" === t.chartsType || "column" === t.chartsType};
                e.$chartMeasureSelector_.html(Mustache.render(e.tplChartConfigItem_, i)), e.$chartMeasureSelector_.children().find('button[data-method="config-axis"]').unbind("click.config-axis").bind("click.config-axis", function () {
                    e.chartMeasureIndexs_.splice(3);
                    var a = $.extend(!0, [], t.measures).map(function (t, a) {
                        return t.index = a, t.name = s[a], t.right = -1 !== e.axisConfig.right.indexOf(a), t.left = !t.right, t.checked = e.chartMeasureIndexs_.indexOf(a) >= 0, t
                    }), n = {
                        items: a,
                        isNormalize: e.axisConfig.isNormalize,
                        truncated: !!e.rawSegObj_.truncated,
                        rows: e.rawSegObj_.num_rows
                    };
                    e.axisConfigContainer_.html(Mustache.render(e.tplAxisConfigModal_, n)), e.axisConfigContainer_.modal("show"), e.axisConfigContainer_.on("shown.bs.modal", function () {
                        e.initAxisModalEvents_()
                    })
                });
                var r = e.$chartMeasureSelector_.find(":checkbox");
                if ("line" === t.chartsType && e.chartMeasureIndexs_.length >= 3 && r.not(":checked").prop("disabled", !0), r.bind("change", function () {
                    var t = e.paramObj, a = $(this).prop("checked"), s = parseInt($(this).val(), 10);
                    if (a) e.chartsContainer_.removeClass("no-display"), e.chartMeasureIndexs_.push(s), e.chart_ && e.chart_.show(e.getShowChartByNames_(e.chartByNames_), e.chartMeasureIndexs_, e.axisConfig); else {
                        var n = e.chartMeasureIndexs_.indexOf(s);
                        n >= 0 && (e.chartMeasureIndexs_.splice(n, 1), 0 === e.chartMeasureIndexs_.length ? (e.chartMeasureIndexs_ = [], e.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("请选择需要在图中展示的指标<!--{en}Please select the metrics you want to display in the graph-->")), e.chart_ && e.chart_.destroyAll()) : e.chart_ && e.chart_.removeMeasure(s))
                    }
                    "line" === t.chartsType && (r.filter(":checked").size() >= 3 ? r.not(":checked").prop("disabled", !0) : r.prop("disabled", !1)), e.bookmarkToolbar.setParams({measureIndexs: e.chartMeasureIndexs_})
                }), !$.isArray(t.by_fields) || 0 === t.by_fields.length) return void e.$chartBySelector_.html(sensorsdata.languages.get("无分组<!--{en}No group-->"));
                if (!$.isEmptyObject(e.segObj_)) {
                    var o = 0, d = e.segObj_.rows.map(function (t, a) {
                        var s = e.chartByNames_.indexOf(t.name) >= 0;
                        return o += s ? 1 : 0, {index: a, name: t.name, checked: s}
                    });
                    d.unshift({
                        index: -1,
                        name: sensorsdata.languages.get("全部<!--{en}Select all-->"),
                        checked: -1 !== e.chartByNames_.indexOf("saAll")
                    });
                    var l = {
                        items: $.extend(!0, [], d),
                        isMeasure: !1,
                        truncated: e.rawSegObj_.truncated,
                        rows: e.rawSegObj_.num_rows
                    };
                    e.$chartBySelector_.html(Mustache.render(e.tplChartConfigItem_, l));
                    var h = e.$chartBySelector_.find(":checkbox");
                    1 === h.size() && h.prop("disabled", !0), h.unbind("change").bind("change", function () {
                        var t = $(this).prop("checked"), a = parseInt($(this).val(), 10);
                        if (-1 === a) h.prop("checked", !1), t ? (e.chartByNames_ = ["saAll"], h.filter('[value="-1"]').prop("checked", !0)) : e.chartByNames_ = []; else {
                            var s = e.chartByNames_.indexOf("saAll");
                            -1 !== s && e.chartByNames_.splice(s, 1);
                            var n = e.segObj_.rows[a].name;
                            if (t) e.chartByNames_.push(n); else {
                                var i = e.chartByNames_.indexOf(n);
                                e.chartByNames_.splice(i, 1)
                            }
                            h.filter('[value="-1"]').prop("checked", !1)
                        }
                        e.chartsContainer_.toggleClass("no-display", 0 === e.chartByNames_.length), e.chartByNames_.length > 0 ? e.chart_.show(e.getShowChartByNames_(e.chartByNames_), e.chartMeasureIndexs_, e.axisConfig) : (e.chart_.destroyAll(), e.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("请选择需要在图中展示的分组<!--{en}Please select the groups that need to be displayed in the chart-->"))), e.bookmarkToolbar.setParams({byFields: e.chartByNames_})
                    }), 1 === t.measures.length && e.segObj_.rows.length > 1 && (a.find("ul#chart-by-selector").show().siblings("ul").hide(), a.find('[data-for="#chart-by-selector"]').addClass("selected").siblings().removeClass("selected"))
                }
            }
        }), a.find(".sa-tab div").unbind("click").bind("click", function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            var e = $(this).attr("data-for");
            $(e).show().siblings("ul").hide()
        }), this.inputUnit_.saDropdown({
            value: t.unit, onSelected: function (t) {
                var a = "hour" === t || "minute" === t, s = e.inputDate_.data("daterangepicker");
                s.setRangeLimit(sensorsdata.CONSTSET.dateRangeLimit[t]), s.setHourDisplay(a), e.prevQuery_()
            }
        }), this.chartsType_.saDropdown({
            value: t.chartsType, onSelected: function (t) {
                if (t !== e.paramObj.chartsType) {
                    if ("line" === t && e.chartMeasureIndexs_.length > 3) for (var a = e.chartMeasureIndexs_.splice(3), s = 0, n = a.length; n > s; s++) e.$chartMeasureSelector_.find(':checkbox[value="' + a[s] + '"]').prop("checked", !1);
                    e.renderCharts_(t), e.paramObj.chartsType = t;
                    var i = "#" + $.param(e.paramObj);
                    window.history.pushState(i, "", i), e.updateReportName_(e.bookmarkToolbar.bookmark)
                }
            }
        }), this.measuresContainer_.unbind("click").bind("click", sensorsdata.bind(this.measuresContainerClick_, this)), this.options.container.find('span[data-method="toggle-measures"]').unbind("click.toggle").bind("click.toggle", function () {
            $(this).toggleClass("icon-chart-collapse"), $(this).toggleClass("icon-chart-expand"), e.options.container.find("#report-ops").toggle($(this).hasClass("icon-chart-collapse"))
        }), this.options.container.delegate('a[data-method="download-all"]', "click.download-all", function () {
            e.download()
        }), $(window).off("unload.segmentation").on("unload.segmentation", sensorsdata.bind(this.savePageStatus_, this)), $(window).off("resize.segmentation").on("resize.segmentation", function () {
            e.chart_ && e.chart_.resize()
        }), $("body").unbind("click.segmentation").bind("click.segmentation", function (t) {
            var a = $(t.target || t.srcElement).parents("div.chart-config:first");
            0 === a.size() && e.$btnChartConfig_.next(".config").hide()
        }), this.$tableConfig_.find('[data-method="transfer"]').unbind("click").bind("click", function () {
            $(this).toggleClass("active"), e.paramObj.tType = $(this).hasClass("active") ? "y" : "n";
            var t = "#" + $.param(e.paramObj);
            window.history.pushState(t, "", t), e.renderTable_("y" === e.paramObj.tType)
        }), this.$tableConfig_.find('[data-method="percent"]').unbind("click").bind("click", function () {
            $(this).toggleClass("active"), e.paramObj.ratio = $(this).hasClass("active") ? "y" : "n";
            var t = "#" + $.param(e.paramObj);
            window.history.pushState(t, "", t), e.table_.toggleRatio()
        }), this.$tableConfig_.find('[data-method="export"]').tooltip().unbind("click").bind("click", function () {
            var t = $.extend(!0, {}, e.paramObj),
                a = (e.bookmarkToolbar.bookmark.id && e.bookmarkToolbar.bookmark.name + "_") + sensorsdata.languages.get("事件分析<!--{en}Event analysis-->") + "_" + e.inputDate_.val() + "_SensorsAnalytics";
            t.compare_from_date && t.compare_to_date && (a += "-" + t.compare_from_date + "-" + t.compare_to_date);
            var s = $.extend(!0, {}, e.table_.tableData_);
            s.heads.forEach(function (e) {
                e.originalTime && e.value && (e.originalTime = e.value)
            }), s.rows.forEach(function (e) {
                e.forEach(function (e) {
                    e.valueClassName && -1 !== e.valueClassName.indexOf("ratio-pos") && (e.value = "-" + e.value)
                })
            }), sensorsdata.table2csv(s, a, "y" === t.tType)
        })
    }, s.prototype.initAxisModalEvents_ = function () {
        var e = this;
        e.axisConfigContainer_.find("button.pop-is-cancel").unbind("click.cancel").bind("click.cancel", function () {
            e.axisConfigContainer_.modal("hide")
        }), e.axisConfigContainer_.find('input[name="axis-normalize"]').unbind("click.normalize").bind("click.normalize", function () {
            var t = "true" === $(this).attr("data-normalize");
            t ? (e.axisConfigContainer_.find("input[data-index]").attr("disabled", !0), e.axisConfigContainer_.find("div.measure-line").css("opacity", .6)) : (e.axisConfigContainer_.find("div.measure-line").css("opacity", 1), e.axisConfigContainer_.find("input[data-index]").attr("disabled", !1))
        }), e.axisConfigContainer_.find("button.pop-is-success").unbind("click.success").bind("click.success", function () {
            var t = e.buildAxisConfig_();
            if (JSON.stringify(t) !== JSON.stringify(e.axisConfig)) {
                var a = !1;
                e.chartMeasureIndexs_.forEach(function (s) {
                    -1 !== t.left.indexOf(s) && -1 !== e.axisConfig.left.indexOf(s) || -1 !== t.right.indexOf(s) && -1 !== e.axisConfig.right.indexOf(s) || (a = !0)
                }), t.isNormalize !== e.axisConfig.isNormalize && (a = !0), a && (e.axisConfig = t, e.chart_.show(e.getShowChartByNames_(e.chartByNames_), e.chartMeasureIndexs_, e.axisConfig))
            }
            e.paramObj.axis_config = t, e.bookmarkToolbar.setParams({data: e.paramObj});
            var s = "#" + $.param(e.paramObj);
            window.history.pushState(s, "", s), e.axisConfigContainer_.modal("hide")
        })
    }, s.prototype.buildAxisConfig_ = function () {
        var e = this.axisConfigContainer_.find('input[data-normalize="true"]').prop("checked"), t = [], a = [];
        return this.axisConfigContainer_.find("div.measure-axis-overview").children().each(function (e, s) {
            var n = $(s).find("input[name]:checked").val(),
                i = parseInt($(s).find("input[name]:checked").attr("data-index"), 10);
            "left" === n ? t.push(i) : a.push(i)
        }), {isNormalize: e, left: t, right: a}
    }, s.prototype.savePageStatus_ = function () {
        var e = {
            chartByNames: this.chartByNames_,
            byFields: (this.paramObj.by_fields || []).join(),
            tableType: this.paramObj.tType,
            ratioActive: this.paramObj.ratio
        };
        sensorsdata.localStorage.setItem(this.pageName, JSON.stringify(e))
    }, s.prototype.download = function () {
        var e = $.extend(!0, {}, this.paramObj),
            t = (this.bookmarkToolbar.bookmark.id && this.bookmarkToolbar.bookmark.name + "_") + sensorsdata.languages.get("事件分析<!--{en}Event analysis-->") + "_" + this.inputDate_.val() + "_SensorsAnalytics";
        e.compare_from_date && e.compare_to_date && (t += "-" + e.compare_from_date + "-" + e.compare_to_date);
        var a = "events/report/csv?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || ""), s = this.clearAjaxData(e);
        this.rawSegObj_.truncated && (s.download_original_format = !0);
        var n = {
            measures_name: this.buildMeasureNames(),
            fields_name: this.buildByFieldMap_(e.by_fields, this.propObj.intersection)
        };
        sensorsdata.download(a, s, t, n)
    }, s.prototype.initDate_ = function () {
        var e = this, t = this.paramObj, a = sensorsdata.CONSTSET, s = e.options.container.find(".segmentation-chart"),
            n = a.inputDateFormat, i = {};
        i.startDate = moment(t.from_date, this.timeFormat), i.endDate = moment(t.to_date, this.timeFormat), i.showCompare = !0, i.chosenLabel = t.rangeText, i.rangeLimit = sensorsdata.CONSTSET.dateRangeLimit[t.unit], i.showHour = "hour" === t.unit || "minute" === t.unit, i.allowRelative = !0, t.compare_from_date && t.compare_from_date ? (i.compareStartDate = moment(t.compare_from_date, this.timeFormat), i.compareEndDate = moment(t.compare_to_date, this.timeFormat), s.addClass("segmentation-compare"), s.find(".content").text(i.compareStartDate.format(n) + a.dateRangeSplit + i.compareEndDate.format(n))) : s.removeClass("segmentation-compare"), sensorsdata.initDateRangeInput(this.inputDate_, i), this.inputDate_.unbind("apply.daterangepicker").bind("apply.daterangepicker", function (t, i) {
            var r = moment.isMoment(i.compareStartDate) && moment.isMoment(i.compareEndDate);
            s.toggleClass("segmentation-compare", r), r && s.find(".content").text(i.compareStartDate.format(n) + a.dateRangeSplit + i.compareEndDate.format(n)), e.bookmarkToolbar.setConfig({compareKey: i.compareKey || ""}), e.prevQuery_()
        }), this.inputDate_.tooltip().unbind("truncate.daterangepicker").bind("truncate.daterangepicker", function () {
            var t = e.inputUnit_.attr("data-value"), a = sensorsdata.CONSTSET.dateRangeLimit[t];
            sensorsdata.info.show("minute" === t ? sensorsdata.util.format(sensorsdata.languages.get("按分钟查看，时间范围一次最多展示 #{limit} 天<!--{en}View by minute, display up to  #{limit} days in the time range-->"), {limit: a}) : "hour" === t ? sensorsdata.util.format(sensorsdata.languages.get("按小时查看，时间范围一次最多展示 #{limit} 天<!--{en}View by minute, display up to  #{limit} days in the time range-->"), {limit: a}) : sensorsdata.util.format(sensorsdata.languages.get("时间范围一次最多展示 #{limit} 天<!--{en}Display up to  #{limit} days in the time range-->"), {limit: a}))
        })
    }, s.prototype.filterMeasureProperties_ = function (e, t) {
        if (!e || $.isEmptyObject(this.propObj) || $.isEmptyObject(this.propObj.original[e])) return [];
        var a = this.paramObj.session_name, s = e === sensorsdata.CONSTSET.sessionGeneral.name;
        return this.propObj.original[e].event.filter(function (n) {
            if ("$user_id" === n.name) return !1;
            n.measureField = s || "$session_event_duration" === n.name ? "session." + a + "." + n.name : "event." + e + "." + n.name;
            var i = "number" === n.data_type && n.is_measure === !0;
            return t ? i : !i
        })
    }, s.prototype.prevQuery_ = function () {
        var e = this.groupControl_.getFullValue(), t = !1;
        e.map(function (e) {
            "datetime" === e.data_type && e.bucket && e.bucket.length > 1 && (t = !0)
        }), t && this.chartsType_.saDropdown("select", "pie");
        var a = this.buildParamObj_();
        if (sensorsdata.cache.config.auto_refresh) {
            var s = JSON.stringify(this.paramObj) !== JSON.stringify(a);
            s && this.getSeg_(a)
        }
    }, s.prototype.getSeg_ = function (e, t) {
        var a = (new Date).valueOf();
        this.$btnQuery_.addClass("disabled").text(sensorsdata.languages.get("查询中…<!--{en}Querying-->")), this.rawSegObj_ = {}, this.rawCompareSegObj_ = {}, this.rawRollupSegObj_ = {}, this.rawRollupCompareSegObj_ = {}, this.segObj_ = {}, this.compareSegObj_ = {}, this.rollupSegObj_ = {}, this.rollupCompareSegObj_ = {}, $.isEmptyObject(e) && (e = this.buildParamObj_()), this.paramObj = e;
        var s = "#" + $.param(e);
        window.location.hash !== s && window.history.pushState(s, "", s);
        var n = $.extend(!0, {}, e);
        n.measures && n.measures.length && n.measures.forEach(function (e) {
            if (e.expression_filters && "string" === $.type(e.expression_filters)) try {
                e.expression_filters = JSON.parse(e.expression_filters)
            } catch (t) {
                e.expression_filters = []
            }
        });
        var i = this.inputDate_.data("daterangepicker");
        i && i.compareKey && this.bookmarkToolbar.setConfig({compareKey: i.compareKey}), this.bookmarkToolbar.setParams({
            data: n,
            measureIndexs: this.chartMeasureIndexs_,
            byFields: this.chartByNames_
        });
        var r = sensorsdata.languages.get("指标<!--{en}Metrics-->");
        1 === e.measures.length && (r = this.buildMeasureNames(!0)[0]);
        var o = "events/report/?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || ""), d = this.clearAjaxData(e);
        d.detail_and_rollup = !0, this.handleLoading(e, t);
        var l = {
            success: !0,
            use_cache: !!d.use_cache,
            analytical_model: sensorsdata.languages.get("事件模型<!--{en}Event model-->")
        };
        l.analytical_model = sensorsdata.languages.get(e.session_name ? "Session模型<!--{en}Session model-->" : e.measures.filter(function (e) {
            return !!e.expression
        }).length > 0 ? "自定义指标<!--{en}Custom metrics -->" : "事件模型<!--{en}Event model-->"), d && d.measures && d.measures.length && d.measures.forEach(function (e) {
            if (e.expression_filters && "string" === $.type(e.expression_filters)) try {
                e.expression_filters = JSON.parse(e.expression_filters)
            } catch (t) {
                e.expression_filters = []
            }
        }), sensorsdata.reportAjax({
            isAsync: !0,
            queueEnable: !0,
            queueKey: "POST-" + o,
            url: o,
            method: "POST",
            data: d,
            complete: sensorsdata.bind(function () {
                this.options.closeLoading(), this.$btnQuery_.removeClass("disabled").text(sensorsdata.languages.get("查询<!--{en}Query-->")), $.isFunction(t) && t()
            }, this),
            error: function (e) {
                this.options.closeLoading(), l.success = !1, l.fail_reason = e.status, l.time_consuming = "", sensorsdata.track("event_analytics", l)
            }.bind(this),
            success: sensorsdata.bind(function (e) {
                var t = this;
                t.reportLoading.closeLoading("success"), a = 100 * Math.ceil(((new Date).valueOf() - a) / 100), l.time_consuming = a, sensorsdata.track("event_analytics", l);
                var s = function (e) {
                    return $.isEmptyObject(e) || $.isEmptyObject(e.rollup_result) || !$.isArray(e.rollup_result.rows) || 0 === e.rollup_result.rows.length || $.isEmptyObject(e.detail_result) || !$.isArray(e.detail_result.rows) || 0 === e.detail_result.rows.length
                }, n = function () {
                    t.chartsContainer_.hide(), t.setHolderPlace_(!0), t.tableContainer_.hide(), t.$tableConfig_.hide().siblings(".page-part-h-split").hide(), t.$tableConfig_.siblings(".page-data-truncated").html("").hide(), t.options.container.find("#reportName").text("")
                };
                if (!$.isArray(e) || s(e[0]) || s(e[1])) {
                    if (s(e)) return void n();
                    this.bookmarkToolbar.setRefresh(e), this.rawSegObj_ = $.extend(!0, {}, e.detail_result), this.rawRollupSegObj_ = $.extend(!0, {}, e.rollup_result), this.segObj_ = this.convertAjaxModel(e.detail_result), this.rollupSegObj_ = this.convertAjaxModel(e.rollup_result)
                } else this.bookmarkToolbar.setRefresh(e[0]), this.rawSegObj_ = $.extend(!0, {}, e[0].detail_result), this.rawRollupSegObj_ = $.extend(!0, {}, e[0].rollup_result), this.segObj_ = this.convertAjaxModel(e[0].detail_result), this.rollupSegObj_ = this.convertAjaxModel(e[0].rollup_result), this.rawRollupCompareSegObj_ = $.extend(!0, {}, e[1].rollup_result), this.rawCompareSegObj_ = $.extend(!0, {}, e[1].detail_result), this.compareSegObj_ = this.convertAjaxModel(e[1].detail_result), this.rollupCompareSegObj_ = this.convertAjaxModel(e[1].rollup_result);
                if (!this.segObj_ || !this.segObj_.rows || !this.segObj_.rows.length) return void n();
                var i = "hour" === d.unit || "minute" === d.unit ? this.timeFormat : sensorsdata.CONSTSET.dateFormat;
                if (this.inputDate_) {
                    var r = this.inputDate_.data("startDate"), o = this.inputDate_.data("endDate");
                    r && o && "function" == typeof r.format && "function" == typeof o.format && (d.from_date !== r.format(i) || d.to_date !== o.format(i)) && this.initDate_()
                }
                var h = null;
                this.updateReportName_(this.bookmarkToolbar.bookmark), this.renderHtml_(), !0 === this.rawSegObj_.truncated ? (this.$tableConfig_.siblings(".page-data-truncated").html(Mustache.render($("#tpl-page-data-truncated").html(), {
                    total: this.rawSegObj_.total_rows,
                    rows: this.rawSegObj_.num_rows
                })).show(), h = sensorsdata.languages.get("下载全量数据 csv<!--{en}Download csv-->")) : this.$tableConfig_.siblings(".page-data-truncated").html("").hide(), this.bookmarkToolbar.refreshDownloadTip(h)
            }, this)
        })
    }, s.prototype.renderHtml_ = function () {
        if (this.setHolderPlace_(!0, !1), 0 === this.chartByNames_.length) this.chartByNames_ = this.segObj_.rows.slice(0, this.defaultSeriesLimit_).map(function (e) {
            return e.name
        }); else if (1 !== this.chartByNames_.length || "saAll" !== this.chartByNames_[0]) {
            var e = [], t = this.segObj_.rows.map(function (e) {
                return e.name
            });
            this.chartByNames_.map(function (a) {
                t.indexOf(a) >= 0 && e.push(a)
            }), this.chartByNames_ = 0 === e.length ? t.slice(0, this.defaultSeriesLimit_) : e
        }
        this.renderCharts_(this.chartsType_.attr("data-value")), this.tableContainer_.show(), this.$tableConfig_.show().siblings(".page-part-h-split").show(), this.renderTable_("y" === this.paramObj.tType)
    }, s.prototype.renderTable_ = function (e) {
        var t = this, a = {
            container: this.tableContainer_,
            tableConfig: this.$tableConfig_,
            initPage: this.options.initPage,
            queryData: this.paramObj,
            measureNames: this.buildMeasureNames(!0),
            propObj: this.propObj
        };
        t.table_ && $.isFunction(t.table_.unload) && t.table_.unload(), e ? (a.rawSegObj = this.rawSegObj_, a.segObj = this.segObj_, a.compareSegObj = this.compareSegObj_, a.rollupSegObj = this.rollupSegObj_, a.rollupCompareSegObj = this.rollupCompareSegObj_, t.table_ = new sensorsdata.SegmentationOldTable(a)) : (a.segObj = this.rawSegObj_, a.compareSegObj = this.rawCompareSegObj_, a.rollupSegObj = this.rawRollupSegObj_, a.rollupCompareSegObj = this.rawRollupCompareSegObj_, t.table_ = new sensorsdata.SegmentationTable(a))
    }, s.prototype.updateReportName_ = function (e) {
        var t = [];
        this.measuresContainer_.find("div#measure-line").each(sensorsdata.bind(function (e, a) {
            var s = $(a), n = s.find("#normal-measure-line");
            if (n.is(":visible")) {
                var i = $.trim(s.find("div#select-event span.multiselect-selected-text").text()), r = [];
                s.find('div[data-method="aggregator-select"] span.selected').each(function (e, t) {
                    r.push($.trim($(t).text()))
                }), t.push(i + sensorsdata.languages.get("的<!--{en} . -->") + r.join(", "))
            } else t.push(s.find("#custom-measure-name").val())
        }, this));
        var a = t.join("，");
        e && e.id && e.name && (a = e.name), this.options.container.find("#reportName").text(a), this.bookmarkToolbar.setDialogName(a)
    }, s.prototype.renderMeasures_ = function (e, t) {
        for (var a = this, s = t.measures, n = $(""), i = "", r = 0, o = [], d = [], l = [], h = 0, u = s.length; u > h; h++) {
            var m = s[h];
            if (m.expression_filters instanceof Array) try {
                for (var c = [], p = 0, g = m.expression_filters.length; g > p; p++) {
                    var f = m.expression_filters[p];
                    c.push(f && "object" == typeof f ? f : {})
                }
                m.expression_filters = JSON.stringify(c)
            } catch (_) {
            }
            var b = $(Mustache.render(this.tplMeasureLine_, {
                sessionDisplay: !!t.session_name,
                sessions: e,
                measure: m,
                isAdmin: sensorsdata.authority.isAdmin
            }));
            t.session_name && a.renderSession_(b, t.session_name), m.expression ? (a.renderEvent_(b), n = n.add(b), d.push(m), l.push(b)) : (i = m.event_name, o.push(m), this.renderEvent_(b, i), a.options.container.find("#session-measure-line").hide(), this.renderAggregator_(b.find("#select-measures"), i, o), this.adjustAggregatorDisabled_(b), n = n.add(b), o = [], r++)
        }
        if (this.measuresContainer_.find("div#measure-line").remove(), this.measuresContainer_.prepend(n), this.measuresContainer_.find("div#measure-line").each(function (e, t) {
            s[e].expression ? a.initCustomMeasure_($(t), s[e]) : a.renderLineFilter_($(t), s[e].event_name, s[e])
        }), this.adjustEventsDisabled_(), n.find('[data-toggle="tooltip"]').tooltip(), d.length > 0) {
            var v = d.map(function (e) {
                return e.expression
            });
            this.toMeasureInputExp_(v, function (e) {
                for (var t = 0, a = e.length; a > t; t++) {
                    l[t].find("#measure-express").val(e[t].expression);
                    var s = l[t].find('a[data-value="' + e[t].format + '"]').text();
                    l[t].find("#custom-measure-format").text(s)
                }
            })
        }
    }, s.prototype.renderLineFilter_ = function (e, t, a) {
        if (t && this.propObj.original[t]) {
            var s = e.find('[data-container="single-filter"]'), n = new sensorsdata.FilterGroupControl;
            n.init({
                container: s,
                propertyObj: t === sensorsdata.CONSTSET.sessionGeneral.name ? this.propObj.intersection : this.propObj.original[t],
                disabled: sensorsdata.authority.isNormal
            }), n.val(a.filter), n.bindEvent("valueChangedEvent", sensorsdata.bind(this.prevQuery_, this)), s.data("filter", n)
        }
    }, s.prototype.renderSession_ = function (e, t) {
        e.find('button[data-method="switch-measure"]').hide();
        var a = $($("#tpl-segmentation-index-event-select").html());
        a.find("span:first").attr("class", "icon-session");
        var s = e.find(".select-session select");
        s.multiselect("destroy"), s.multiselect({
            templates: {button: a},
            includeFilterClearBtn: !1,
            filterBehavior: "both",
            enableFiltering: !0,
            filterPlaceholder: sensorsdata.languages.get("筛选 Session…<!--{en}Filter the Session...-->"),
            onChange: sensorsdata.bind(function (e) {
                var t = e.val(), a = this.sessions.filter(function (e) {
                    return e.name === t
                })[0];
                this.selectedSession_ = a, this.events = $.extend(!0, [], sensorsdata.cache.events).filter(function (e) {
                    return a.event_list.indexOf(e.name) >= 0
                }), "ALL" === sensorsdata.authority.eventPermission.type && this.events.unshift(sensorsdata.CONSTSET.everyEvent), this.events.unshift(sensorsdata.CONSTSET.sessionGeneral), this.events[0].cname = a.cname, this.paramObj.session_name = t, this.renderInputs_(!0)
            }, this)
        }), s.multiselect("select", t)
    }, s.prototype.renderEvent_ = function (e, t) {
        var a = $.extend(!0, [], this.events), s = "coolEventDropdown";
        this.paramObj.session_name && (a[0].cname = sensorsdata.languages.get("Session 总体<!--{en}Session overall-->"), s = "eventDropdown");
        var n = this;
        e.find("#select-event")[s]("destroy")[s]({
            events: a, eventName: t, onChange: function (t) {
                var a = n.getEventNames_();
                n.getProperties(a, function (a) {
                    n.propObj = $.extend(!0, {}, a);
                    var s = sensorsdata.CONSTSET.sessionGeneral.name,
                        i = n.buildMeasuresParam_(e.find("#normal-measure-line")), r = [];
                    i.map(function (e) {
                        if (!(e.by_session && t !== s && "bounce_rate" === e.aggregator || "exit_rate" === e.aggregator && t === s)) if (e.field) {
                            var a = e.field.split(".")[2], i = n.propObj.original[t].event.filter(function (e) {
                                return e.name === a
                            })[0];
                            $.isEmptyObject(i) || (e.event_name = t, "$session_event_duration" !== a && (e.field = "event." + t + "." + i.name), r.push(e))
                        } else e.event_name = t, r.push(e)
                    }), n.renderAggregator_(e.find("#select-measures").html(""), t, r), n.adjustEventsDisabled_(), n.adjustFilterControl_(t, e), n.adjustSingleFilter_(t, e), n.prevQuery_()
                })
            }
        })
    }, s.prototype.renderAggregator_ = function (e, t, a) {
        var s = e.parents("div#measure-line"), n = this.events.filter(function (e) {
            return e.name === t
        })[0];
        if (!$.isArray(a) || 0 === a.length) {
            var i = this.getNextMeasure_(s);
            a = [i]
        }
        for (var r = $(""), o = 0, d = a.length; d > o; o++) {
            var l = this.filterMeasureProperties_(t, !1), h = $(Mustache.render(this.tplMeasureItem_, {
                suffix: sensorsdata.languages.get("和<!--{en}and-->"),
                measureName: this.buildAggregatorName_(t, a[o]),
                measure: a[o],
                eventName: n.name,
                eventCname: n.cname,
                measureProperties: this.filterMeasureProperties_(t, !0),
                notMeasureProperties: l,
                isSession: !!this.paramObj.session_name,
                isSessionGeneral: n.name === sensorsdata.CONSTSET.sessionGeneral.name,
                moreMeasureDisplay: l.length > 3
            }));
            h.find('a[data-aggregator="' + a[o].aggregator + '"][data-field="' + (a[o].field || "") + '"]').parents("li").addClass("active"), r = r.add(h)
        }
        e.append(r), e.find("a").bind("click", sensorsdata.bind(function (e) {
            var t = $(e.target || e.srcElement);
            if (t.is("a") || (t = t.parent("a:first")), !t.attr("data-aggregator") && "more" === t.attr("data-method")) return t.parent().hide().nextAll().slideDown(), !1;
            if (!t.attr("data-aggregator")) return !1;
            var a = t.parents("li:first");
            if (!a.hasClass("disabled") && !a.hasClass("active")) {
                var s = t.parents("div:first").find(".selected");
                s.attr("data-aggregator", t.attr("data-aggregator")), s.attr("data-field", t.attr("data-field")), s.text(t.attr("data-cname") ? t.attr("data-cname") + sensorsdata.languages.get("的<!--{en} . -->") + t.text() : t.text()), t.parents('div[data-method="aggregator-select"]').find("li.active").removeClass("active"), t.parents("li").addClass("active"), this.adjustAggregatorDisabled_(t.parents("div#measure-line")), this.prevQuery_()
            }
        }, this)), this.adjustAggregatorDisabled_(s)
    }, s.prototype.buildAggregatorName_ = function (e, t) {
        var a = "";
        if (this.paramObj.session_name && (a = this.sessionFunction[t.aggregator]), a = a || sensorsdata.CONSTSET.measureFunctions[t.aggregator].cname, t.field) {
            var s = sensorsdata.findProperty(t.field, this.propObj.original[e]).cname;
            return s + sensorsdata.languages.get("的<!--{en} . -->") + a
        }
        return a
    }, s.prototype.adjustEventsDisabled_ = function () {
        var e = this.getEventNames_(!1);
        this.measuresContainer_.find('button[data-method="event-add"]').prop("disabled", e.length === this.events.length);
        var t = this.measuresContainer_.find(".select-session");
        t.eq(0).find(">div").is(":visible") || t.eq(0).find(">div").show();
        var a = t.filter(".select-session:visible").width();
        t.not(":first").width(a).find(">div").hide()
    }, s.prototype.getEventNames_ = function (e) {
        var t = [];
        return this.measuresContainer_.find("div#measure-line").each(function () {
            var a = $(this), s = a.find("#normal-measure-line");
            if (s.is(":visible")) {
                var n = s.find("div.select-event").data("selected-event");
                -1 === t.indexOf(n) && t.push(n)
            } else if (e !== !1) {
                var i = a.find("#measure-express").data("measure-events");
                $.isArray(i) && i.length > 0 && i.map(function (e) {
                    -1 === t.indexOf(e) && t.push(e)
                })
            }
        }), t
    }, s.prototype.adjustAggregatorDisabled_ = function (e) {
        var t = this.buildMeasuresParam_(e), a = e.find("div#select-measures");
        a.find("li.disabled").removeClass("disabled");
        for (var s = 0, n = t.length; n > s; s++) {
            var i = t[s], r = 'li a[data-aggregator="' + i.aggregator + '"][data-field="' + (i.field || "") + '"]';
            a.find(r).each(function (e, t) {
                var a = $(t).parent();
                a.hasClass("active") || a.addClass("disabled")
            })
        }
        a.find("ul ul").each(function (e, t) {
            t = $(t), t.find("li").size() === t.find("li.disabled").size() && t.parent().addClass("disabled").removeClass("active")
        });
        var o = this.getNextMeasure_(e);
        e.find('button[data-method="measure-add"]').prop("disabled", $.isEmptyObject(o)), e.find('span[data-method="suffix"]').toggle(t.length > 1).filter(":last").hide()
    }, s.prototype.measuresContainerClick_ = function (e) {
        var t = this, a = $(e.target || e.srcElement), s = a.attr("data-method");
        s || (a = a.parents("[data-method]:first"), s = a.attr("data-method"));
        var n = null, i = a.parents("div#measure-line"), r = "", o = [], d = {}, l = null;
        switch (s) {
            case"measure-save":
                this.saveCustomMeasure_(a.parents("div#measure-line")), i.find(".measure-button > button").toggleClass("disabled", !1);
                break;
            case"measure-edit":
                t.changeCustomMeasureModel_(i, !0), i.find(".measure-button > button").toggleClass("disabled", !0);
                break;
            case"switch-measure":
                r = this.getNextEvent_();
                var h = i.find("#normal-measure-line").toggle(), u = i.find("#custom-measure-line").toggle();
                if (u.is(":visible")) {
                    if (!u.find("#measure-express").data("measure-express")) {
                        var m = sensorsdata.CONSTSET, c = t.measureFunctions_,
                            p = $.trim(h.find("span.multiselect-selected-text").text()),
                            g = /^".+"$/.test(p) ? p : '"' + p + '"', f = "";
                        f = p === m.eventEmptyText ? g + "." + c.unique.cname + "/" + m.eventEmptyText + "." + c.general.cname : g + "." + c.general.cname + "/" + m.eventEmptyText + "." + c.general.cname, u.find("#measure-express").val(f), t.initCustomMeasure_(i), t.changeCustomMeasureModel_(i, !0), i.find('.measure-button > button[data-method="add-alert"], button[data-method="add-filter"]').toggleClass("disabled", !0)
                    }
                } else u.find("#measure-express").data("measure-express", null), d = t.paramObj.measures[i.index()], d && $.isArray(d.events) && d.events.length > 0 ? r = t.paramObj.measures[i.index()].events[0] : d && d.event_name && (r = d.event_name), i.find('.measure-button > button[data-method="add-alert"], button[data-method="add-filter"]').toggleClass("disabled", !1), this.getProperties([r], function () {
                    var e = t.buildMeasuresParam_(i.find("div#select-measures"));
                    0 === e.length ? (t.renderEvent_(i, r), t.renderAggregator_(i.find("#select-measures"), r)) : t.renderEvent_(i, e[0].event_name), t.adjustEventsDisabled_(), t.adjustAggregatorDisabled_(i), t.adjustFilterControl_(r, i), t.adjustSingleFilter_(r, i), t.prevQuery_()
                });
                break;
            case"event-add":
                o = this.getEventNames_(!1), r = o[o.length - 1];
                var _ = $.extend(!0, [], this.events);
                r || (r = _[0].name), this.paramObj.session_name && (_[0].cname = sensorsdata.languages.get("Session 总体<!--{en}Session overall-->")), i = $(Mustache.render(this.tplMeasureLine_, {
                    sessionDisplay: !!this.paramObj.session_name,
                    sessions: this.sessions,
                    isAdmin: sensorsdata.authority.isAdmin
                })), this.paramObj.session_name && t.renderSession_(i, this.paramObj.session_name), t.initCustomMeasure_(i), this.renderEvent_(i, r), o = this.getEventNames_(), o.push(r), this.getProperties(o, function (e) {
                    t.propObj = $.extend(!0, {}, e), t.renderAggregator_(i.find("#select-measures"), r), a.before(i), i.find('[data-toggle="tooltip"]').tooltip(), t.adjustEventsDisabled_(), t.adjustAggregatorDisabled_(i), t.adjustFilterControl_(r), t.reCountNumber(), t.prevQuery_()
                });
                break;
            case"measure-add":
                if (a.is(":disabled")) break;
                if (r = i.find("#select-event").data("selected-event"), d = this.getNextMeasure_(i), $.isEmptyObject(d)) break;
                this.renderAggregator_(i.find("#select-measures"), r, [d]), this.adjustAggregatorDisabled_(i), this.prevQuery_();
                break;
            case"custom-measure-remove":
                sensorsdata.form.removeChildrenError(a.parents("div#measure-line")), a.parents("div#measure-line").remove(), this.prevQuery_(), this.reCountNumber();
                break;
            case"measure-remove":
                a.is(":disabled") || (a.parent('div[data-method="aggregator-select"]').remove(), 0 === i.find('div[data-method="aggregator-select"]').size() ? (i.remove(), this.adjustEventsDisabled_(), o = this.getEventNames_(), this.getProperties(o, function (e) {
                    t.propObj = $.extend(!0, {}, e), t.adjustFilterControl_(), t.prevQuery_()
                })) : (this.adjustAggregatorDisabled_(i), this.prevQuery_()), this.reCountNumber());
                break;
            case"add-filter":
                var b = i.find('[data-container="single-filter"]');
                l = i.find("#normal-measure-line"), d = l.is(":visible") ? this.buildMeasuresParam_(l) : [this.buildCustomMeasure_(i.find("#custom-measure-line"))], b.data("filter") ? b.data("filter").addFilter() : (r = d.map(function (e) {
                    return e.event_name
                }), t.getProperties(r, function (e) {
                    n = new sensorsdata.FilterGroupControl, n.init({
                        container: b,
                        propertyObj: e.intersection,
                        disabled: sensorsdata.authority.isNormal
                    }), n.addFilter(), n.bindEvent("valueChangedEvent", sensorsdata.bind(t.prevQuery_, t)), b.data("filter", n)
                }));
                break;
            case"add-alert":
                l = i.find("#normal-measure-line"), d = l.is(":visible") ? this.buildMeasuresParam_(l) : [this.buildCustomMeasure_(i.find("#custom-measure-line"))], n = i.find('[data-container="single-filter"]').data("filter") ? i.find('[data-container="single-filter"]').data("filter").val() : {};
                var v = {type: this.pageName, data: {measures: d, filter: n}};
                sensorsdata.monitor.show(v)
        }
    }, s.prototype.initCustomMeasure_ = function (e, t) {
        t = t || {};
        var a = e.find("#custom-measure-name"), s = e.find("#measure-express");
        s.data("measure-express", t.expression).data("measure-events", t.events), s.is(":visible") && s.expressionInput("destroy").expressionInput(), e.find("#custom-measure-format").saDropdown(), a.unbind("focusout").bind("focusout", function () {
            sensorsdata.form.check($(this))
        }), e.find("span.icon-help").tooltip(), this.changeCustomMeasureModel_(e, !1), this.initCustomMeasureFilter(e, t)
    }, s.prototype.initCustomMeasureFilter = function (e, t, a) {
        t = t || {};
        var s = this, n = function (n) {
            s.getProperties(t.events, function (i) {
                var r = new sensorsdata.FilterGroupControl;
                r.init({
                    container: e.find('[data-container="single-filter"]'),
                    propertyObj: i.intersection,
                    authority: sensorsdata.authority.isNormal
                }), r.val(t.filter), r.bindEvent("valueChangedEvent", sensorsdata.bind(s.prevQuery_, s)), e.find('[data-container="single-filter"]').data("filter", r), $.isFunction(a) && n && a(i)
            })
        };
        !$.isEmptyObject(t) && t.events && 0 !== t.events.length && (this.getEventNames_().length >= 2 ? (n(!1), this.getProperties(this.getEventNames_(), function (e) {
            $.isFunction(a) && a(e)
        })) : n(!0))
    }, s.prototype.saveCustomMeasure_ = function (e) {
        var t = e.find("#custom-measure-name");
        if (sensorsdata.form.check(t, sensorsdata.languages.get("必填<!--{en}Required-->"), !0)) {
            var a = e.find("#measure-express"), s = e.find("#custom-measure-format").attr("data-value"), n = this;
            a.expressionInput("get", function (t) {
                if (t.error) return void a.expressionInput("error");
                a.expressionInput("onoff", !1), t.expression = t.expression.split("|")[0] + "|" + s, a.data("measure-express", t.expression).data("measure-events", t.events).data("expression-filters", t.expression_filters), n.changeCustomMeasureModel_(e, !1);
                var i = t.events, r = e.find('[data-container="single-filter"]').data("filter"),
                    o = {events: i, filter: r ? r.val() : {}};
                n.initCustomMeasureFilter(e, o, function (e) {
                    n.propObj = $.extend(!0, {}, e), n.adjustEventsDisabled_(), n.adjustFilterControl_(), n.prevQuery_()
                })
            })
        }
    }, s.prototype.changeCustomMeasureModel_ = function (e, t) {
        e.find('button[data-method="measure-save"]').toggle(t), e.find('button[data-method="measure-edit"]').toggle(!t), e.find("#measure-express").prop("readonly", !t).expressionInput("onoff", t), e.find("#custom-measure-name").prop("readonly", !t), e.find("#custom-measure-format").toggleClass("disabled", !t)
    }, s.prototype.adjustFilterControl_ = function (e) {
        var t, a = this.groupControl_.val(), s = this.filterControl_.val(), n = s.conditions || [], i = a.bucket || {},
            r = a.byFields || [], o = this.propObj.intersection, d = this.filterControl_.getPropObj(), l = 0, h = [],
            u = [], m = null, c = "",
            p = e && sensorsdata.findEventCname(e) || sensorsdata.languages.get("新选择的事件<!--{en}Newly selected events-->"),
            g = [];
        if (n.length > 0) {
            for (h = [], t = 0, l = n.length; l > t; t++) u = n[t].field.split("."), 2 !== u.length ? (m = sensorsdata.findProperty(n[t].field, [o.event]), $.isEmptyObject(m) ? (m = sensorsdata.findProperty(n[t].field, d), h.push(m.cname)) : (n[t].field = "event." + m.event_name + "." + m.name, g.push(n[t]))) : g.push(n[t]);
            h.length > 0 && (c = "『" + h.join("，") + "』", sensorsdata.info.show(c + sensorsdata.languages.get("不属于<!--{en}Not belong to-->") + p + sensorsdata.languages.get("，无法按此项筛选<!--{en}，unable to filter by this item-->")))
        }
        var f = [];
        if (r.length > 0) {
            h = [];
            var _ = "", b = "";
            for (t = 0, l = r.length; l > t; t++) _ = r[t], u = _.split("."), 2 !== u.length ? (m = sensorsdata.findProperty(_, [o.event]), $.isEmptyObject(m) ? (m = sensorsdata.findProperty(_, d), h.push(m.cname), delete i[_]) : (b = "event." + m.event_name + "." + m.name, i[b] = i[_], delete i[_], f.push(b))) : f.push(_);
            h.length > 0 && (c = "『" + h.join("，") + "』", sensorsdata.info.show(c + sensorsdata.languages.get("不属于<!--{en}Not belong to-->") + p + sensorsdata.languages.get("，无法按此项查看<!--{en}，Unable to view by this item-->")))
        }
        this.groupControl_.init({
            container: this.groupContainer_,
            data: o,
            btnAddDisplay: !0,
            btnRemoveDisplay: !0,
            disabled: sensorsdata.authority.isNormal
        }), this.groupControl_.val({
            byFields: f,
            bucket: i
        }), this.filterControl_.init({
            container: this.filterContainer_,
            propertyObj: o,
            disabled: sensorsdata.authority.isNormal
        }), this.filterControl_.val({relation: s.relation, conditions: g})
    }, s.prototype.adjustSingleFilter_ = function (e, t) {
        if (t) {
            var a = e && sensorsdata.findEventCname(e) || sensorsdata.languages.get("新选择的事件<!--{en}Newly selected events-->"),
                s = t.find('[data-container="single-filter"]'), n = s.data("filter"), i = this.propObj.original[e],
                r = null;
            if (n) {
                var o = n.getPropObj(), d = n.val().conditions || [], l = [];
                if (d.length > 0) {
                    for (var h = [], u = 0, m = d.length; m > u; u++) {
                        var c = d[u].field.split(".");
                        2 !== c.length ? (r = sensorsdata.findProperty(d[u].field, [i.event]), $.isEmptyObject(r) ? (r = sensorsdata.findProperty(d[u].field, o), h.push(r.cname)) : (d[u].field = "event." + r.event_name + "." + r.name, l.push(d[u]))) : l.push(d[u])
                    }
                    if (h.length > 0) {
                        var p = "『" + h.join("，") + "』";
                        sensorsdata.info.show(p + sensorsdata.languages.get("不属于<!--{en}Not belong to-->") + a + sensorsdata.languages.get("，无法按此项筛选<!--{en}，unable to filter by this item-->"))
                    }
                }
                n.init({
                    container: s,
                    propertyObj: this.propObj.original[e],
                    disabled: sensorsdata.authority.isNormal
                }), n.val({relation: n.relation, conditions: l})
            }
        }
    }, s.prototype.buildParamObj_ = function () {
        var e = this.groupControl_.val(), t = this.filterControl_.val(), a = {
            measures: [],
            unit: this.inputUnit_.attr("data-value"),
            filter: {relation: t.relation, conditions: t.conditions},
            by_fields: e.byFields,
            bucket_params: e.bucket,
            chartsType: this.chartsType_.attr("data-value"),
            sampling_factor: this.bookmarkToolbar.getSamplingValue(),
            axis_config: $.extend(!0, {}, this.axisConfig)
        }, s = this.measuresContainer_.find("div#select-session");
        s.is(":visible") && (a.session_name = s.find("li a :radio:checked").val()), this.measuresContainer_.find("div#measure-line").each(sensorsdata.bind(function (e, t) {
            var s = $(t).find("#normal-measure-line");
            if (s.is(":visible")) a.measures = a.measures.concat(this.buildMeasuresParam_(s)); else {
                var n = this.buildCustomMeasure_($(t).find("#custom-measure-line"));
                $.isEmptyObject(n) || a.measures.push(n)
            }
        }, this));
        var n = "hour" === a.unit || "minute" === a.unit ? this.timeFormat : sensorsdata.CONSTSET.dateFormat;
        a.rangeText = this.inputDate_.data("daterangepicker") && this.inputDate_.data("daterangepicker").chosenLabel, a.from_date = this.inputDate_.data("startDate").format(n), a.to_date = this.inputDate_.data("endDate").format(n);
        var i = this.inputDate_.data("compareStartDate"), r = this.inputDate_.data("compareEndDate");
        moment.isMoment(i) && moment.isMoment(r) ? (a.compare_from_date = i.format(sensorsdata.CONSTSET.dateFormat), a.compare_to_date = r.format(sensorsdata.CONSTSET.dateFormat)) : (delete a.compare_from_date, delete a.compare_to_date);
        var o = this.paramObj[sensorsdata.CONSTSET.bookmarkId];
        return o && (a[sensorsdata.CONSTSET.bookmarkId] = o), a.tType = this.$tableConfig_.find('[data-method="transfer"]').hasClass("active") ? "y" : "n", a.ratio = this.$tableConfig_.find('[data-method="percent"]').hasClass("active") ? "y" : "n", a.approx = this.paramObj.approx, this.dealParam(a)
    }, s.prototype.buildMeasuresParam_ = function (e) {
        var t = sensorsdata.CONSTSET.sessionGeneral.name, a = [], s = e.find("span.selected");
        return s.map(function (s, n) {
            var i = $(n),
                r = e.parents("div.measure-line:first").find('[data-container="single-filter"]').data("filter"),
                o = {event_name: i.attr("data-event-name"), aggregator: i.attr("data-aggregator")};
            i.attr("data-field") && (o.field = i.attr("data-field")), o.event_name !== t || o.field || (o.by_session = !0), r && !$.isEmptyObject(r.val()) && (o.filter = r.val());
            var d = (o.field || "").split(".");
            o.field && "session" === d[0] && "$session_event_duration" !== d[2] && (o.by_session = !0), a.push(o)
        }), a
    }, s.prototype.buildCustomMeasure_ = function (e) {
        var t = e.find("#measure-express"), a = e.parents(".measure-line:first"), s = {
            expression: t.data("measure-express"),
            expression_filters: t.data("expression-filters") || [],
            events: t.data("measure-events"),
            name: e.find("#custom-measure-name").val(),
            format: e.find("#custom-measure-format").attr("data-value")
        };
        if (s.expression && $.isArray(s.events) && s.events.length > 0 && s.name && s.format) {
            var n = a.find('[data-container="single-filter"]').data("filter");
            return n && !$.isEmptyObject(n.val()) && (s.filter = n.val()), s
        }
        return {}
    }, s.prototype.getNextEvent_ = function () {
        for (var e = this.getEventNames_(!1), t = 0, a = this.events.length; a > t; t++) if (-1 === e.indexOf(this.events[t].name)) return this.events[t].name;
        return ""
    }, s.prototype.getNextMeasure_ = function (e) {
        var t = !!this.paramObj.session_name, a = e.find("#select-event").data("selected-event"),
            s = this.filterMeasureProperties_(a, !0), n = {event_name: a, aggregator: "general", field: ""},
            i = this.buildMeasuresParam_(e.find("div#select-measures"));
        if (0 === i.length) return n;
        var r = "", o = "";
        for (var d in this.measureFunctions_) if (this.measureFunctions_.hasOwnProperty(d)) {
            var l = this.measureFunctions_[d];
            if (t || "session" !== l.type && "exit_rate" !== d) {
                var h = i.filter(function (e) {
                    return e.aggregator === d
                });
                if (0 === h.length) {
                    if (l.field === !0) {
                        if (0 === s.length) break;
                        o = "event." + a + "." + s[0].name
                    }
                    r = d;
                    break
                }
                if (l.field === !0) {
                    for (var u = 0, m = s.length; m > u; u++) {
                        var c = "event." + a + "." + s[u].name, p = h.filter(function (e) {
                            return e.aggregator === d && e.field === c
                        })[0];
                        if ($.isEmptyObject(p)) {
                            r = d, o = c;
                            break
                        }
                    }
                    if (o) break
                }
            }
        }
        return r ? (n.aggregator = r, n.field = o, n) : {}
    }, s.prototype.getShowChartByNames_ = function (e) {
        var t = e;
        return $.isArray(e) && 1 === e.length && "saAll" === e[0] && (t = this.segObj_.rows.map(function (e) {
            return e.name
        })), t
    }, s.prototype.renderCharts_ = function (e) {
        if (!$.isEmptyObject(this.segObj_)) {
            this.chartsContainer_.removeClass("no-display").show(), this.$btnChartConfig_.removeClass("disabled").tooltip("destroy");
            var t = this, a = this.paramObj, s = this.buildMeasureNames(!1), n = {
                container: this.chartsContainer_,
                queryData: a,
                segObj: this.segObj_,
                compareSegObj: this.compareSegObj_,
                measureNames: s,
                measureUnits: this.buildMeasureUnits()
            };
            if (t.chartMeasureIndexs_.length > 0) if (t.chartMeasureIndexs_ = t.chartMeasureIndexs_.filter(function (e) {
                return e < a.measures.length
            }), t.chartMeasureIndexs_.length < 3 && t.chartMeasureIndexs_.length < a.measures.length) {
                for (var i = 0; i < a.measures.length && (-1 === t.chartMeasureIndexs_.indexOf(i) && t.chartMeasureIndexs_.push(i), 3 !== t.chartMeasureIndexs_.length); i++) ;
                t.chartMeasureIndexs_.sort()
            } else "line" === e && t.chartMeasureIndexs_.splice(3); else t.chartMeasureIndexs_ = a.measures.map(function (e, t) {
                return t
            }), t.chartMeasureIndexs_.splice(3);
            switch ((this.chart_ || !this.paramObj[sensorsdata.CONSTSET.bookmarkId]) && this.bookmarkToolbar.setParams({
                data: this.buildParamObj_(),
                measureIndexs: this.chartMeasureIndexs_,
                byFields: this.chartByNames_
            }), this.chart_ && $.isFunction(this.chart_.destroyAll) && this.chart_.destroyAll(), e) {
                case"line":
                    var r = Math.ceil(this.defaultSeriesLimit_ / t.chartMeasureIndexs_.length);
                    this.chartByNames_.splice(r), this.chart_ = new sensorsdata.SegmentationLineChart(n), this.chart_.show(t.getShowChartByNames_(t.chartByNames_), t.chartMeasureIndexs_, t.axisConfig);
                    break;
                case"column":
                    this.chart_ = new sensorsdata.SegmentationColumnChart(n), this.chart_.show(t.getShowChartByNames_(t.chartByNames_), t.chartMeasureIndexs_, t.axisConfig);
                    break;
                case"pie":
                    if (!((this.paramObj.by_fields || []).length > 0)) return this.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("饼图只适用于有分组的查询<!--{en}Pie charts apply only to grouped queries-->")), void this.$btnChartConfig_.addClass("disabled");
                    n.segObj = this.rollupSegObj_, n.compareSegObj = this.rollupCompareSegObj_, this.chart_ = new sensorsdata.SegmentationPieChart(n), this.chart_.show(this.getShowChartByNames_(this.chartByNames_), this.chartMeasureIndexs_, this.axisConfig);
                    break;
                case"stack":
                    if (this.chartMeasureIndexs_.length > 1) this.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("只支持单指标累积图<!--{en}Single index cumulative graphs only-->")); else {
                        var o = n.queryData.measures[0].aggregator;
                        if ("general" !== o && "SUM" !== o) this.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("不支持当前指标累积图,只支持总次数和数值属性总和<!--{en}The current index cumulative graph is not supported, and only the total number of times and the sum of the numerical properties are supported-->")); else {
                            var d = n,
                                l = !$.isEmptyObject(d.compareSegObj) && $.isArray(d.compareSegObj.series) && d.compareSegObj.series.length > 0 && $.isArray(d.compareSegObj.rows) && d.compareSegObj.rows.length > 0;
                            if (l) return void this.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("不支持对比时间区间下的累积图<!--{en}Cumulative graphs under contrast time ranges are not supported-->"));
                            this.chart_ = new sensorsdata.SegmentationStackChart(n), this.chart_.show(this.getShowChartByNames_(this.chartByNames_), this.chartMeasureIndexs_, this.axisConfig)
                        }
                    }
                    break;
                default:
                    sensorsdata.error.show(sensorsdata.languages.get("不支持展示此类型的图<!--{en}This type of graph is not supported for display-->"))
            }
        }
    }, s.prototype.toMeasureInputExp_ = function (e, t) {
        sensorsdata.ajax({
            url: "events/custom/indicator/reverse",
            method: "POST",
            data: JSON.stringify(e),
            success: sensorsdata.bind(function (e) {
                t(e)
            }, this)
        })
    }, s.prototype.buildByFieldMap_ = function (e, t) {
        var a = {};
        return $.isArray(e) && e.length > 0 && e.map(function (e) {
            var s = sensorsdata.findProperty(e, t);
            a[e] = s.cname
        }), a
    }, s.prototype.handleLoading = function (e, t) {
        var a = parseInt(e.sampling_factor, 10) || 64;
        this.reportLoading.options.sampling_factor = a, 64 === a ? (this.reportLoading.options.quickType = "sampling_factor", this.reportLoading.options.openQuickQuery = function () {
            this.reportLoading.options.sampling_factor = e.sampling_factor = 16, this.bookmarkToolbar.samplingSlider_ && this.bookmarkToolbar.samplingSlider_.setValue(4, !0, !0), this.getSeg_(e, t)
        }.bind(this)) : this.reportLoading.options.quickType = "none", this.reportLoading.showLoading()
    }, a.exports = s
});
;
/*!pages/userAnalytics/userAnalytics.js*/
define("pages/userAnalytics/userAnalytics", function (e, t, a) {
    function s(e) {
        sensorsdata.BasePage.call(this), this.option = $.extend(!0, {}, e), this.option.container = e.container || $("body"), this.state = this.option.state || {}, this.pageName = window.location.pathname, this.tplPage_ = $("#tpl-user-analytics-index").html(), this.option.container.html(this.tplPage_), this.tplMeasureItem_ = $("#tpl-user-analytics-index-measure-item").html(), this.tplX_ = $("#tpl-user-analytics-index-x").html(), this.tplTable_ = $("#tpl-user-analytics-index-table").html(), this.tplSingleTable_ = $("#tpl-user-analytics-single-table").html(), this.tplGroup_ = $("#tpl-user-analytics-index-chart-measure-item").html(), this.userProperties_ = [], this.$btnAddFilter = this.option.container.find("#btnAddFilter"), this.$userFilterContainer_ = this.option.container.find("#user-filter"), this.userFilter_ = new sensorsdata.FilterGroupControl, this.groupControl_ = new sensorsdata.GroupControl, this.groupFilter_ = this.option.container.find("#group-hold-place"), this.userMeasure_ = this.option.container.find("#select-measures"), this.$btnQuery_ = this.option.container.find("#btn-query"), this.reportNoData_ = this.option.container.find("div.report-no-data"), this.chartsContainer_ = this.option.container.find("#chartsContainer"), this.tableContainer_ = this.option.container.find("#tableContainer"), this.tableToolbar_ = this.option.container.find("#table-toolbar"), this.chartsType_ = this.option.container.find("#chartsType"), this.xAxisDropdown_ = this.option.container.find("#xAxisDropdown"), this.config_ = this.option.container.find("header .report-config"), this.$btnConfig_ = this.option.container.find("#btn-chart-config"), this.$charBySelector = this.option.container.find("#chart-by-selector"), this.chart_ = null, this.tableData_ = null, this.bookmarkToolbar = {}, this.userRollObj_ = {}, this.measureMap_ = {
            MAX: sensorsdata.languages.get("最大值<!--{en}Max value-->"),
            MIN: sensorsdata.languages.get("最小值<!--{en}Min value-->"),
            AVG: sensorsdata.languages.get("平均值<!--{en}Average value-->"),
            SUM: sensorsdata.languages.get("总和<!--{en}Total-->"),
            uniqAvg: sensorsdata.languages.get("人均值<!--{en}Value per capita-->"),
            uniqCount: sensorsdata.languages.get("去重数<!--{en}Deduplication-->")
        }, this.groupMap_ = {}, this.groupList = ["datetime", "number", "string", "boolean"], this.chartSeriesLimit_ = 10, this.rawUserObj_ = {}, this.userObj_ = {}, this.userIdProperty_ = {}, this.page = s, this.reportLoading = new i({
            container: this.chartsContainer_,
            needHideDom: [this.chartsContainer_.next()],
            sampling_factor: "none"
        }), this.init()
    }

    var r = e("components/bookmarkToolbar/bookmarkToolbar"), i = e("components/reportLoading/reportLoading");
    sensorsdata.inherits(s, sensorsdata.BasePage), s.clearAjaxData = function (e) {
        var t = $.extend(!0, {}, e);
        return delete t.chartsType, t
    }, s.prototype.init = function () {
        this.$btnQuery_.toggle(sensorsdata.cache.config.auto_refresh === !1);
        var e = sensorsdata.unparam(window.location.hash);
        this.paramObj_ = e = this.page.dealParam(e);
        var t = "#" + $.param(e);
        window.history.replaceState(t, "", t), this.groupNames_ = this.getPageStatusItem_("groupName") || [];
        var a = this.getPageStatusItem_("byFields") || "", s = this.getPageStatusItem_("xAxis") || "";
        $.isArray(e.by_fields) && e.by_fields.length > 0 ? (e.by_fields.join() !== a || s !== (e.x_axis_field || "")) && (this.groupNames_ = []) : this.groupNames_ = [];
        var i = e[sensorsdata.CONSTSET.bookmarkId], n = this.state;
        this.bookmarkToolbar = r.create({
            dashid: n.dashid,
            fromDashboard: "dashboard" === n.from && !!n.dashid,
            showSaveAndAdd: "dashboard" === n.from && "add" === n.action && !!n.dashid,
            samplingDisplay: !1,
            onBookmarkAdded: sensorsdata.bind(function (e) {
                this.paramObj_[sensorsdata.CONSTSET.bookmarkId] = e.id
            }, this),
            onBookmarkNameChanged: sensorsdata.bind(function () {
                this.updateReportName_(this.bookmarkToolbar.bookmark)
            }, this),
            onRefreshClick: sensorsdata.bind(function (e) {
                this.getAllData_({}, e)
            }, this),
            onDownloadClick: sensorsdata.bind(function () {
                var e = $.extend(!0, {}, this.paramObj_),
                    t = (this.bookmarkToolbar.bookmark.id && this.bookmarkToolbar.bookmark.name + "_") + sensorsdata.languages.get("属性分析<!--{en}Profile analysis--->") + "_SensorsAnalytics",
                    a = "user/report/csv?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || ""),
                    s = this.page.clearAjaxData(e), r = e.by_fields || [], i = e.x_axis_field || "", n = [],
                    o = this.page.buildMeasureName(e, this.userProperties_);
                n.push(o);
                var l = {measures_name: n, fields_name: this.page.buildByFieldMap(r, this.userProperties_)};
                void 0 !== i && (l.x_axis = sensorsdata.findProperty(i, [{user: this.userProperties_}]).cname), sensorsdata.download(a, s, t, l)
            }, this),
            sessionDropdownDisplay: !1,
            container: $("#bookmark-save-bar"),
            bookmarkid: i,
            params: this.paramObj_,
            type: this.pageName
        }), this.getProperties_(sensorsdata.bind(function () {
            this.initInput_(e), this.initEvent_(), sensorsdata.cache.config.auto_refresh === !0 ? this.getAllData_(e) : this.option.closeLoading(), this.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh)
        }, this))
    }, s.buildByFieldMap = function (e, t) {
        var a = {};
        return $.isArray(e) && e.length > 0 && e.map(function (e) {
            var s = sensorsdata.findProperty(e, [{user: t}]);
            a[e] = s.cname
        }), a
    }, s.buildMeasureName = function (e, t) {
        var a = e.measures[0], s = a.aggregator, r = sensorsdata.CONSTSET.measureFunctions, i = a.field, n = "", o = "";
        if ("count" === s) n += sensorsdata.languages.get("用户数<!--{en}User Number-->"); else {
            var l = sensorsdata.findProperty(i, [{user: t}]);
            for (var h in r) if (h === s) {
                o = r[h].cname;
                break
            }
            n = n.concat(l.cname, sensorsdata.languages.get("的<!--{en} . -->"), o)
        }
        return n
    }, s.prototype.unload = function () {
        this.savePageStatus_(), $.isEmptyObject(this.bookmarkToolbar) || this.bookmarkToolbar.destroy(), $(window).off("resize.userAnalytics"), $(window).off("unload.userAnalytics")
    }, s.prototype.reload = function () {
        if (window.location.hash === this.pageName) {
            var e = sensorsdata.unparam(window.location.hash);
            this.paramObj_ = e = this.page.dealParam(e), this.getProperties_(function () {
                this.initInput_(e), sensorsdata.cache.config.auto_refresh === !0 && this.getAllData_(e), this.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh)
            })
        }
    }, s.prototype.getProperties_ = function (e) {
        sensorsdata.ajax({
            useCache: !0, url: "property/user/properties", success: sensorsdata.bind(function (t) {
                this.userProperties_ = t, e()
            }, this)
        })
    }, s.buildMeasureUnits = function (e, t) {
        var a = [], s = e.measures;
        if (!$.isArray(s) || 0 === s.length) return a;
        for (var r = sensorsdata.CONSTSET.measureFunctions, i = 0, n = s.length; n > i; i++) {
            var o = s[i];
            if ("uniqCount" !== o.aggregator) if (o.field) {
                var l = sensorsdata.findProperty(o.field, [{user: t}]);
                $.isEmptyObject(l) || a.push(l.unit || "")
            } else a.push(r[o.aggregator].unit); else a.push(sensorsdata.languages.get("个"))
        }
        return a
    }, s.prototype.getFilterProperties = function (e, t) {
        return e.filter(function (e) {
            var a = "number" === e.data_type && e.is_measure === !0;
            return t ? a : !a
        })
    }, s.prototype.initInput_ = function (e) {
        this.renderFilter_(this.userProperties_.filter(function (e) {
            return "list" !== e.data_type
        }));
        var t = $.extend(!0, [], this.userProperties_);
        $.isEmptyObject(this.userIdProperty_) || t.unshift(this.userIdProperty_), this.userFilter_.init({
            container: this.$userFilterContainer_,
            propertyObj: {user: t, event: []},
            disabled: sensorsdata.authority.isNormal,
            relative_event: !0
        }), this.userFilter_.val({
            relation: e.filter && e.filter.relation,
            conditions: e.filter && e.filter.conditions
        }), this.groupControl_.init({
            container: this.groupFilter_,
            data: {user: this.userProperties_},
            btnAddDisplay: !0,
            btnRemoveDisplay: !0,
            disabled: sensorsdata.authority.isNormal
        }), this.groupControl_.val({
            byFields: e.by_fields,
            bucket: e.bucket_params
        }), this.setXAsix_(), this.disabledGroup_(e.chartsType), this.setGroup_();
        var a = e.measures[0].aggregator, s = e.measures[0].field, r = this.measureMap_[a], i = "",
            n = sensorsdata.findProperty(s, [{user: this.userProperties_}]);
        "count" !== a ? (i = n.cname + sensorsdata.languages.get("的<!--{en} . -->") + r, this.userMeasure_.find("span.selected").attr("data-aggregator", a), this.userMeasure_.find("span.selected").attr("data-field", s)) : i = n.cname, this.userMeasure_.find("span.selected").text(i)
    }, s.prototype.disabledChartsType_ = function () {
        $.isEmptyObject(this.userObj_) || !this.userObj_
    }, s.prototype.disabledGroup_ = function (e) {
        var t = this.paramObj_, a = t.by_fields;
        return void 0 !== a ? 1 !== a.length || "line" !== e && "column" !== e ? (this.$btnConfig_.prop("disabled", !1), !1) : (this.$btnConfig_.prop("disabled", !0), this.$charBySelector.hide(), !0) : void 0
    }, s.prototype.getProp_ = function (e) {
        return sensorsdata.findProperty(e, [{user: this.userProperties_}])
    }, s.prototype.setXAsix_ = function () {
        var e, t = this.paramObj_, a = this.groupControl_.val().byFields, s = (a || []).length > 0, r = [], i = {};
        if (s) {
            this.config_.show().parent().find(".report-name-wrap").removeClass("no-config"), this.chartsContainer_.show(), this.tableToolbar_.show(), this.xAxisDropdown_.prop("disabled", 1 === a.length || "pie" === t.chartsType);
            for (var n = 0; n < a.length; n++) {
                var o = this.getProp_(a[n]);
                this.groupMap_["user." + o.name] = o.data_type, r.push(o)
            }
            var l = 0;
            if (1 === a.length) i = this.getProp_(a[0]), this.xAxisDropdown_.text(i.cname).attr("data-value", a[0]), e = $(Mustache.render(this.tplX_, {group: r})), this.xAxisDropdown_.next("ul").html(e); else {
                if (-1 === a.indexOf(t.x_axis_field) && a[0] === t.x_axis_field) for (var h = 0; h < this.groupList.length; h++) {
                    for (var d = 0; d < a.length; d++) if (i = sensorsdata.findProperty(a[d], [{user: this.userProperties_}]), i.data_type === this.groupList[h]) {
                        this.xAxisDropdown_.text(i.cname).attr("data-value", "user." + i.name), t.x_axis_field = "user." + i.name, l = 1;
                        break
                    }
                    if (1 === l) break
                } else i = this.getProp_(a[0]), this.xAxisDropdown_.text(i.cname).attr("data-value", "user." + i.name);
                e = $(Mustache.render(this.tplX_, {group: r})), this.xAxisDropdown_.next("ul").html(e)
            }
            var u = "#" + $.param(t);
            window.history.pushState(u, "", u)
        } else this.config_.hide().parent().find(".report-name-wrap").addClass("no-config"), this.chartsContainer_.hide(), this.tableToolbar_.hide()
    }, s.prototype.savePageStatus_ = function () {
        var e = {groupName: this.groupNames_}, t = this.paramObj_;
        $.isArray(t.by_fields) && t.by_fields.length > 0 && (e.groupName = this.groupNames_, e.byFields = t.by_fields.join(), e.xAxis = t.x_axis_field), sensorsdata.localStorage.setItem(this.pageName, JSON.stringify(e))
    }, s.prototype.getAllData_ = function (e, t, a) {
        a = a || sensorsdata.AJAX_CONST.reportAjaxCache;
        var s = (new Date).valueOf();
        $.isEmptyObject(e) && (e = this.buildParamObj_()), this.rawUserObj_ = {}, this.userObj_ = {}, this.paramObj_ = $.extend(!0, {}, e);
        var r = "#" + $.param(e);
        window.location.hash !== r && window.history.pushState(r, "", r), this.updateReportName_(this.bookmarkToolbar.bookmark);
        var i = this.page.validResponse, n = "user/report/?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || ""),
            o = this.page.clearAjaxData(e), l = o.by_fields || [];
        0 === l.length ? delete o.x_axis_field : o.x_axis_field && -1 === l.indexOf(o.x_axis_field) && (o.x_axis_field = l[0]), "boolean" == typeof a && (o.use_cache = a), this.reportLoading.showLoading({sampling_factor: "none"});
        var h = {success: !0, use_cache: !!e.use_cache};
        sensorsdata.reportAjax({
            isAsync: !0,
            queueEnable: !0,
            queueKey: "POST-all-" + n,
            url: n,
            method: "POST",
            error: function (e) {
                h.success = !1, h.fail_reason = e.status, s = "", h.time_consuming = s, sensorsdata.track("user_analytics", h)
            },
            complete: sensorsdata.bind(function () {
                this.reportLoading.closeLoading(), h.time_consuming = s, sensorsdata.track("user_analytics", h), this.option.closeLoading(), this.$btnQuery_.removeClass("disabled").text(sensorsdata.languages.get("查询<!--{en}Query-->")), $.isFunction(t) && t()
            }, this),
            data: o,
            success: sensorsdata.bind(function (t) {
                if (s = 100 * Math.ceil(((new Date).valueOf() - s) / 100), !i(t)) return void sensorsdata.error.show(sensorsdata.languages.get("数据格式错误，请联系技术人员<!--{en}Data in wrong format, please contact with technicians-->"));
                this.bookmarkToolbar.setRefresh(t), this.rawUserObj_ = $.extend(!0, {}, t);
                var a = this.userMeasure_.find("span.selected").text();
                this.userObj_ = this.convertAjaxModel(t, [{user: this.userProperties_}], a, e.bucket_params)
            }, this)
        }).then(sensorsdata.bind(function () {
            return this.allowPieCharts_() ? this.getRollData_(o, a) : $.Deferred().resolve()
        }, this)).done(sensorsdata.bind(function () {
            var e = this.groupControl_.val().byFields;
            0 === e.length ? (this.option.container.find("#table-pagination").html("").hide(), this.renderSingleHtml_()) : e.length > 0 && this.renderHtml_(), !0 === this.rawUserObj_.truncated && sensorsdata.info.show(sensorsdata.languages.get("查询结果过多，仅显示部分分组数据，完整数据情通过 API 获取<!--{en}Too many query results,only partial group clustering data is displayed,please obtain the full data through API-->"))
        }, this))
    }, s.prototype.getRollData_ = function (e, t) {
        this.userRollObj_ = {};
        var a = this.paramObj_.x_axis_field, s = this.page.validResponse,
            r = "user/report/?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || "");
        this.paramObj_.x_axis_field && delete this.paramObj_.x_axis_field;
        var i = this.page.clearAjaxData(this.paramObj_);
        return "boolean" == typeof t && (i.use_cache = t), sensorsdata.reportAjax({
            queueEnable: !0,
            queueKey: "POST-roll-" + r,
            url: r,
            method: "POST",
            data: i,
            success: sensorsdata.bind(function (t) {
                if (!s(t)) return void sensorsdata.error.show(sensorsdata.languages.get("数据格式错误，请联系技术人员<!--{en}Data in wrong format, please contact with technicians-->"));
                var r = this.userMeasure_.find("span.selected").text();
                this.userRollObj_ = this.converPieAjaxModel(t, [{user: this.userProperties_}], r, e.bucket_params), this.paramObj_.x_axis_field = a
            }, this)
        })
    }, s.prototype.allowPieCharts_ = function () {
        var e = this.paramObj_.by_fields || [];
        return e.length > 0
    }, s.validResponse = function (e) {
        return $.isEmptyObject(e) ? !0 : $.isArray(e.series) && $.isArray(e.rows) && e.rows.length > 0 ? e.series.length === e.rows[0].values.length : !0
    }, s.prototype.convertAjaxModel = function (e, t, a, r) {
        if (!$.isEmptyObject(e) && $.isArray(e.series) && 0 !== e.series.length && $.isArray(e.rows) && 0 !== e.rows.length) {
            var i = {series: [], rows: [], num: e.num_rows}, n = (e.by_fields || []).length, o = a;
            return e.rows.map(sensorsdata.bind(function (a) {
                n > 0 && (o = s.buildByValueText(e.by_fields, a.by_values, t, r)), i.rows.push({
                    name: o,
                    data: a.values
                })
            }, this)), $.isArray(e.series) && e.series.length > 0 && e.series.map(sensorsdata.bind(function (e) {
                var a = s.buildTableByValueText(e, this.paramObj_.x_axis_field, t, r);
                i.series.push(a)
            }, this)), i
        }
    }, s.prototype.converPieAjaxModel = function (e, t, a, r) {
        if (!$.isEmptyObject(e) && $.isArray(e.series) && 0 !== e.series.length && $.isArray(e.rows) && 0 !== e.rows.length) {
            var i = {series: [], rows: [], num: e.num_rows}, n = (e.by_fields || []).length, o = a;
            return e.rows.map(sensorsdata.bind(function (a) {
                n > 0 && (o = s.buildPieByValueText(e.by_fields, a.by_values, t, r)), i.rows.push({
                    name: o,
                    data: a.values
                })
            }, this)), i
        }
    }, s.buildByValueText = function (e, t, a, s) {
        s = s || {};
        for (var r = [], i = 0, n = t.length; n > i; i++) {
            var o = t[i], l = sensorsdata.findProperty(e[i], a) || {};
            o = sensorsdata.formatByValue(o, l.data_type, "", s[e[i]]), r.push(o)
        }
        return r.join("，")
    }, s.buildTableByValueText = function (e, t, a, s) {
        s = s || {};
        var r = sensorsdata.findProperty(t, a) || {}, i = sensorsdata.formatByValue(e, r.data_type, "", s[t]);
        return i
    }, s.buildPieByValueText = function (e, t, a, s) {
        s = s || {};
        for (var r = [], i = 0, n = t.length; n > i; i++) {
            var o = t[i], l = sensorsdata.findProperty(e[i], a) || {};
            o = sensorsdata.formatByValue(o, l.data_type, sensorsdata.CONSTSET.unknownByValueText, s[e[i]]), r.push(o)
        }
        return r.join("，")
    }, s.prototype.updateReportName_ = function (e) {
        var t = "", a = $("#select-measures").find("span.selected").text(), s = this.groupControl_.val(),
            r = s.byFields;
        if (0 === r.length) t = ""; else {
            t += sensorsdata.languages.get("按<!--{en}By-->");
            for (var i = 0; i < r.length; i++) {
                var n = r[i];
                t += sensorsdata.findProperty(n, [{user: this.userProperties_}]).cname + "，"
            }
            t = t.substring(0, t.length - 1), t += sensorsdata.languages.get("查看<!--{en}View-->")
        }
        -1 === a.indexOf(sensorsdata.languages.get("用户<!--{en}Users-->")) && (t += sensorsdata.languages.get("用户<!--{en}Users-->")), t += a.trim(), e && e.id && e.name && (t = e.name), this.option.container.find("#reportName").text(t), this.bookmarkToolbar.setDialogName(t || a)
    }, s.prototype.renderFilter_ = function (e) {
        var t = this.getFilterProperties(e, !1), a = !1;
        t.length > 3 && (a = !0);
        var s = $(Mustache.render(this.tplMeasureItem_, {
            measureProperties: this.getFilterProperties(e, !0),
            notMeasureProperties: {more: a, other: t}
        }));
        this.option.container.find("#select-measures").html(s)
    }, s.prototype.initEvent_ = function () {
        var e = this;
        this.$btnQuery_.bind("click", function () {
            e.getAllData_()
        }), this.userFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(function () {
            this.prevQuery_()
        }, this)), this.groupControl_.bindEvent("valueChangedEvent", sensorsdata.bind(function () {
            this.groupNames_ = [], this.setXAsix_(), this.prevQuery_(), this.setGroup_(), this.disabledGroup_(e.paramObj_.chartsType), this.disabledChartsType_()
        }, this)), this.$btnAddFilter.unbind("click").bind("click", function () {
            e.userFilter_.addFilter()
        }), this.userMeasure_.find("a").bind("click", sensorsdata.bind(function (e) {
            var t = $(e.target || e.srcElement);
            if (t.is("a") || (t = t.parent("a:first")), !t.attr("data-aggregator") && "more" === t.attr("data-method")) return t.parent().hide().nextAll().slideDown(), !1;
            var a = t.parents("li:first");
            if (!a.hasClass("disabled") && !a.hasClass("active")) {
                var s = t.parents("div:first").find(".selected");
                if (!t.attr("data-aggregator") && !t.attr("data-field")) return !1;
                s.attr("data-aggregator", t.attr("data-aggregator")), s.attr("data-field", t.attr("data-field")), s.text(t.attr("data-cname") ? t.attr("data-cname") + sensorsdata.languages.get("的<!--{en} . -->") + t.text() : t.text()), t.parents('div[data-method="aggregator-select"]').find("li.active").removeClass("active"), t.parents("li").addClass("active"), this.prevQuery_(), this.updateReportName_(this.bookmarkToolbar.bookmark)
            }
        }, this)), this.xAxisDropdown_.saDropdown({
            value: this.paramObj_.x_axis_field, onSelected: function () {
                this.groupNames_ = [], e.prevQuery_()
            }
        }), this.chartsType_.saDropdown({
            value: this.paramObj_.chartsType, onSelected: function (t) {
                if (e.paramObj_.chartsType !== t) {
                    e.disabledGroup_(t), e.xAxisDropdown_.prop("disabled", "pie" === t), e.paramObj_.chartsType = t;
                    var a = "#" + $.param(e.paramObj_);
                    window.history.pushState(a, "", a), !$.isEmptyObject(e.userObj_) && e.userObj_ && e.renderCharts_(t)
                }
            }
        });
        var t = this.tableToolbar_.find('input[type="text"]'), a = t.attr("data-rollup");
        t.bind("keyup", sensorsdata.bind(function () {
            var e = t.attr("data-timeout");
            e && window.clearTimeout(e);
            var s = $.trim(t.val()), r = t.attr("data-last");
            return s === r ? this.tableData_ : (e = window.setTimeout(sensorsdata.bind(function () {
                var e = this.searchTable_(s, this.tableData_);
                a === !1 ? this.renderTable_(e) : this.renderRollTable_(e), t.attr("data-last", s)
            }, this), 500), void t.attr("data-timeout", e))
        }, this)), this.tableContainer_.bind("click", sensorsdata.bind(this.tableClick_, this)), this.$btnConfig_.on("click", function () {
            e.setGroup_()
        }), $(window).off("resize.userAnalytics").on("resize.userAnalytics", function () {
            e.chart_ && e.chart_.resize()
        }), $(window).off("unload.userAnalytics").on("unload.userAnalytics", sensorsdata.bind(this.savePageStatus_, this)), this.bookmarkToolbar.on("updateParams", function (t) {
            t.dashboard_cache_policy ? e.paramObj_.dashboard_cache_policy = t.dashboard_cache_policy : delete e.paramObj_.dashboard_cache_policy
        })
    }, s.prototype.setGroup_ = function () {
        var e = this, t = this.paramObj_, a = t.by_fields, s = e.userObj_, r = e.userRollObj_,
            i = e.$btnConfig_.next("ul"), n = t.chartsType || this.chartsType_.attr("data-value");
        if (i.toggle().is(":visible")) {
            e.$btnConfig_.parent().parent().removeClass("open"), $(document).off("click.user-analytic-page").on("click.user-analytic-page", function (t) {
                var a = $(t.target || t.srcElement);
                0 === a.closest("#chart-by-selector").size() && e.$charBySelector.hide()
            });
            var o = [], l = {};
            if ($.isEmptyObject(this.userObj_) || 0 === a.length || 1 === a.length && "pie" !== n) return void e.$charBySelector.hide();
            a.length > 1 && "pie" !== n ? o = s.rows.map(function (t, a) {
                return l = {name: t.name, checked: e.groupNames_.indexOf(t.name) >= 0, index: a}
            }) : a.length > 0 && "pie" === n && (o = r.rows.map(function (t, a) {
                return l = {name: t.name, checked: e.groupNames_.indexOf(t.name) >= 0, index: a}
            })), e.$charBySelector.html(Mustache.render(e.tplGroup_, {items: o}));
            var h = e.$charBySelector.find(":checkbox");
            1 === h.size() && h.prop("disabled", !0), h.on("change", function () {
                var t = $(this).prop("checked"), i = parseInt($(this).val()), o = "";
                if (a.length > 1 && "pie" !== n ? o = s.rows[i].name : a.length > 0 && "pie" === n && (o = r.rows[i].name), t) e.chartsContainer_.removeClass("no-display"), e.groupNames_.push(o), e.renderCharts_(n); else {
                    var l = e.groupNames_.indexOf(o);
                    l >= 0 && (e.groupNames_.splice(l, 1), 0 === e.groupNames_.length ? (e.groupNames_ = [], e.chart_.destroy(), e.chartsContainer_.addClass("no-display").text(sensorsdata.languages.get("请选择需要在图中展示的分组<!--{en}Please select the groups that need to be displayed in the chart-->"))) : e.chart_.remove(o))
                }
                var h = [];
                e.$charBySelector.find(":checkbox").map(function (e, t) {
                    h.push(r.rows[$(t).val()].name)
                }), e.bookmarkToolbar.setParams({byFields: e.groupNames_})
            })
        }
    }, s.prototype.getPageStatusItem_ = function (e) {
        var t = sensorsdata.localStorage.getItem(this.pageName), a = JSON.parse(t || "{}");
        return $.isEmptyObject(a) ? null : a[e]
    }, s.prototype.prevQuery_ = function () {
        var e = this.buildParamObj_();
        if (sensorsdata.cache.config.auto_refresh) {
            var t = JSON.stringify(this.paramObj_) !== JSON.stringify(e);
            t && this.getAllData_(e)
        }
        this.bookmarkToolbar.setParams({data: e})
    }, s.prototype.buildParamObj_ = function () {
        var e = this.groupControl_.val(), t = this.userFilter_.val(), a = this.userMeasure_.find("span.selected"),
            s = a.attr("data-aggregator"), r = a.attr("data-field"), i = {
                measures: [{aggregator: s, field: r}],
                filter: {relation: t.relation, conditions: t.conditions},
                by_fields: e.byFields,
                bucket_params: e.bucket,
                chartsType: this.chartsType_.attr("data-value")
            }, n = i.by_fields.length;
        n >= 2 ? i.x_axis_field = this.xAxisDropdown_.attr("data-value") : 1 === n ? i.x_axis_field = i.by_fields[0] : delete i.by_fields;
        var o = this.paramObj_[sensorsdata.CONSTSET.bookmarkId];
        return o && (i[sensorsdata.CONSTSET.bookmarkId] = o), this.page.dealParam(i)
    }, s.dealParam = function (e) {
        var t = {
            measures: [{aggregator: "count", field: ""}],
            by_fields: [],
            filter: {conditions: [], relation: ""},
            chartsType: "pie"
        }, a = s.clearAjaxData(e);
        if ($.isEmptyObject(e) || $.isEmptyObject(a)) return t;
        if ($.isArray(e.by_fields) || delete e.by_fields, delete e.sampling_factor, e.filter = sensorsdata.FilterGroupControl.dealCompatible(e.filter), $.isEmptyObject(e.bucket_params)) delete e.bucket_params; else for (var r in e.bucket_params) if (e.bucket_params.hasOwnProperty(r)) {
            var i = e.bucket_params[r], n = sensorsdata.buildBucketPopoverValue(i);
            n.length > 0 ? e.bucket_params[r] = n : delete e.bucket_params[r]
        }
        return e.chartsType = e.chartsType || "pie", e
    }, s.prototype.searchTable_ = function (e, t) {
        if ($.isEmptyObject(t) || !$.isArray(t.rows)) return t;
        var a = (e || "").split(/[,\/， ]+/);
        a = a.filter(function (e, t) {
            return a.indexOf(e) === t
        });
        var s = RegExp(a.join("|"), "g"), r = [];
        t.rows.forEach(function (t) {
            var a = t[0].value + "";
            -1 !== a.indexOf("，") && -1 !== a.indexOf(e) && r.push(t), a.toString().match(s) && r.push(t)
        });
        var i = {};
        return i.rows = r, i.heads = t.heads, i
    }, s.prototype.renderSingleHtml_ = function () {
        this.setHolderPlace_(!0, !1), $.isEmptyObject(this.userObj_) ? (this.chartsContainer_.hide(), this.tableContainer_.parent().hide(), this.setHolderPlace_(!0), this.tableContainer_.html("")) : (this.tableContainer_.parent().show(), this.tableData_ = this.buildSingleTableData_(this.userObj_), this.renderSingleTable_(this.tableData_))
    }, s.prototype.buildSingleTableData_ = function (e) {
        if ($.isEmptyObject(e)) return {};
        e = $.extend(!0, {}, e);
        var t = {heads: [], rows: []}, a = "%2p" === this.paramObj_.measures[0].format, s = this.buildTableCell_,
            r = this.paramObj_.measures[0].aggregator, i = Object.keys(this.measureMap_), n = -1 !== i.indexOf(r),
            o = {value: e.rows[0].name.trim()};
        t.heads.push(o);
        var l = 0, h = 0 === l ? "" : e.rows[0].data[0][0], d = s(e.rows[0].data[l][0], h, l, a);
        return d.rowIndex = l, d.seriesIndex = 0, d.allow = n ? !1 : !0, t.rows.push(d), t
    }, s.prototype.renderSingleTable_ = function (e) {
        this.tableContainer_.find('[data-toggle="tooltip"]').tooltip("destroy"), this.tableContainer_.html(Mustache.render(this.tplSingleTable_, e)), this.tableContainer_.find('[data-toggle="tooltip"]').tooltip()
    }, s.prototype.renderHtml_ = function () {
        return this.setHolderPlace_(!0, !1), $.isEmptyObject(this.userObj_) ? (this.chartsContainer_.hide(), this.tableContainer_.parent().hide(), this.setHolderPlace_(!0), void this.tableContainer_.html("")) : (this.tableContainer_.parent().show(), this.tableData_ = this.buildTableData_(this.userObj_), this.renderTable_(this.tableData_), void this.renderCharts_(this.paramObj_.chartsType))
    }, s.prototype.renderTable_ = function (e) {
        var t = sensorsdata.CONSTSET.paginationSize, a = sensorsdata.bind(function (t, a) {
            t -= 1;
            var s = e.rows.slice(t, a);
            this.tableContainer_.find('[data-toggle="tooltip"]').tooltip("destroy"), this.tableContainer_.html(Mustache.render(this.tplTable_, {
                heads: e.heads,
                rows: s
            })), this.tableContainer_.find('[data-toggle="tooltip"]').tooltip()
        }, this);
        0 === e.rows.length && 0 === e.heads.length ? (this.tableContainer_.html(""), this.option.container.find("#table-pagination").html("").hide()) : e.rows.length <= t ? (this.option.container.find("#table-pagination").html("").hide(), a(1, e.rows.length)) : sensorsdata.pagination({
            tableElement: this.option.container.find("#table-pagination").show(),
            totalItems: e.rows.length,
            pageItems: t,
            clickHandle: sensorsdata.bind(function (e) {
                a(e.range[0], e.range[1])
            }, this)
        })
    }, s.prototype.buildTableData_ = function (e) {
        return 1 === this.paramObj_.measures.length ? this.buildSingleMeasureTableData_(e) : this.buildMultiMeasuresTableData_(e)
    }, s.prototype.buildSingleMeasureTableData_ = function (e) {
        if ($.isEmptyObject(e)) return {};
        var t = this;
        e = $.extend(!0, {}, e);
        var a = this.paramObj_, s = a.x_axis_field, r = "", i = "", n = {heads: [], rows: []},
            o = a.measures[0].aggregator, l = Object.keys(this.measureMap_), h = -1 !== l.indexOf(o);
        void 0 !== s && (r = s, i = this.getProp_(r), n.heads = [{
            value: i.cname,
            showSort: !0,
            sortType: "ascend"
        }], n.rows = []);
        var d = this.buildTableCell_;
        return e.series.map(function (t, a) {
            var s = [{value: t, showSort: !1, sortType: a === e.series.length - 1 ? "descend" : "", isHead: !0}];
            n.rows.push(s)
        }), e.rows.map(function (e, r) {
            var i = {value: e.name};
            n.heads.push(i), n.rows.map(function (i, n) {
                var o = {}, l = 0 === n ? "" : e.data[n - 1][0], u = "";
                "datetime" === t.getProp_(s).data_type ? (u = "%2p" === a.measures[0].format, o = d(e.data[n][0], l, n, u)) : o = {value: e.data[n][0]}, o.rowIndex = n, o.seriesIndex = r, o.allow = h ? !1 : !0, i.push(o)
            })
        }), n
    }, s.prototype.renderRollTable_ = function (e) {
        var t = sensorsdata.CONSTSET.paginationSize, a = sensorsdata.bind(function (t, a) {
            t -= 1;
            var s = e.rows.slice(t, a);
            this.tableContainer_.find('[data-toggle="tooltip"]').tooltip("destroy"), this.tableContainer_.html(Mustache.render(this.tplTable_, {
                heads: e.heads,
                rows: s
            })), this.tableContainer_.find('[data-toggle="tooltip"]').tooltip()
        }, this);
        0 === e.rows.length && 0 === e.heads.length ? (this.tableContainer_.html(""), this.option.container.find("#table-pagination").html("").hide()) : e.rows.length <= t ? (this.option.container.find("#table-pagination").html("").hide(), a(1, e.rows.length)) : sensorsdata.pagination({
            tableElement: this.option.container.find("#table-pagination").show(),
            totalItems: e.rows.length,
            pageItems: t,
            clickHandle: sensorsdata.bind(function (e) {
                a(e.range[0], e.range[1])
            }, this)
        })
    }, s.prototype.tableClick_ = function (e) {
        var t = $(e.target || e.srcElement);
        t.attr("data-method") || (t = t.parents("[data-method]:first"));
        var a = t.attr("data-method");
        if ("sort" === a) {
            var s = t.attr("data-value"), r = t.attr("data-sort");
            r = r && "descend" === r ? "ascend" : "descend", this.tableData_ = this.sortTableData_(this.tableData_, s, r), this.renderTable_(this.tableData_)
        } else if ("user-list" === a) {
            var i = parseInt(t.attr("data-row-index"), 10), n = parseInt(t.attr("data-series-index"), 10),
                o = this.rawUserObj_, l = o.rows, h = o.series, d = this.paramObj_, u = d.filter, p = d.measures,
                c = d.x_axis_field, _ = (d.by_fields || []).length > 0, b = d.by_fields, g = d.bucket_params,
                m = d.chartsType, f = {measures: p, filter: u, slice_by_values: [], bucket_params: {}};
            if (_) {
                var y = b.length;
                if (f.by_fields = b, 1 === y) {
                    var v = "" === h[i] ? sensorsdata.CONSTSET.emptyStringByValueText : h[i];
                    f.slice_by_values.push(v)
                } else y > 1 && (c && f.slice_by_values.push("" === h[i] ? sensorsdata.CONSTSET.emptyStringByValueText : h[i]), l[n].by_values.forEach(function (e) {
                    f.slice_by_values.push("" === e ? sensorsdata.CONSTSET.emptyStringByValueText : e)
                }))
            }
            c && (f.x_axis_field = c, f.series_unit = o.series_unit, b = b.filter(function (e) {
                return e !== c
            }), b.unshift(c), f.by_fields = b), g && (f.bucket_params = g), m && (f.chartsType = m), $(t).createUserListPanel({queryData: f})
        }
    }, s.prototype.sortTableData_ = function (e, t, a) {
        return e.heads[0].sortType = a, e.rows.reverse(), e
    }, s.prototype.buildTableCell_ = function (e, t, a, s) {
        var r = "", i = 0;
        return $.isNumeric(e) && 0 !== a && 0 !== t && $.isNumeric(t) && (i = e - t, r = Math.round(Math.abs(i) / t * 1e3) / 10), {
            value: $.isNumeric(e) ? sensorsdata.formatNumber(e) + (s ? "%" : "") : "--",
            showPercent: $.isNumeric(r),
            percent: r,
            style: i >= 0 ? "pos" : "neg"
        }
    }, s.prototype.buildGroupNames_ = function () {
        var e = this, t = function (t, a) {
            var s = [];
            if (0 === a.length) s = t.slice(0, e.chartSeriesLimit_).map(function (e) {
                return e.name
            }); else {
                var r = t.map(function (e) {
                    return e.name
                });
                a.map(function (e) {
                    r.indexOf(e) >= 0 && s.push(e)
                }), 0 === s.length && (s = r.slice(0, e.chartSeriesLimit_))
            }
            return s
        }, a = this.paramObj_;
        return a.by_fields.length > 0 && "pie" === a.chartsType ? t(this.userRollObj_.rows, this.groupNames_) : a.by_fields.length > 1 ? t(this.userObj_.rows, this.groupNames_) : []
    }, s.prototype.renderCharts_ = function (e) {
        this.chartsContainer_.removeClass("no-display").show();
        var t = this.paramObj_, a = {
            container: this.chartsContainer_,
            limit: this.chartSeriesLimit_,
            userObj_: this.userObj_,
            measureUnit: this.page.buildMeasureUnits(t, this.userProperties_),
            measureName: this.page.buildMeasureName(t, this.userProperties_),
            queryData: t,
            userRollObj_: this.userRollObj_
        };
        switch (this.groupNames_ = this.buildGroupNames_(), (this.chart_ || !this.paramObj_[sensorsdata.CONSTSET.bookmarkId]) && this.bookmarkToolbar.setParams({
            data: this.buildParamObj_(),
            byFields: this.groupNames_
        }), e) {
            case"line":
                this.chart_ = new sensorsdata.UserAnalyticsLineChart(a), this.chart_.show(1 === t.by_fields.length ? [this.userObj_.rows[0].name] : this.groupNames_);
                break;
            case"column":
                this.chart_ = new sensorsdata.UserAnalyticsBarChart(a), this.chart_.show(1 === t.by_fields.length ? [this.userObj_.rows[0].name] : this.groupNames_);
                break;
            case"pie":
                this.allowPieCharts_() ? (this.chart_ = new sensorsdata.UserAnalyticsPieChart(a), this.chart_.show(this.groupNames_)) : (this.chartsContainer_.addClass("no-display"), this.chartsContainer_.text(sensorsdata.languages.get("饼图只适用于有分组的查询<!--{en}Pie charts apply only to grouped queries-->")), this.$btnConfig_.prop("disabled", !0));
                break;
            default:
                sensorsdata.error.show(sensorsdata.languages.get("不支持展示此类型的图<!--{en}This type of graph is not supported for display-->"))
        }
    }, a.exports = s
});
;
/*!pages/retentionAddiction/retentionAddiction.js*/
define("pages/retentionAddiction/retentionAddiction", function (e, t, a) {
    function s(e) {
        sensorsdata.AddictionBase.call(this), this.options = e, this.options.container = e.container || $("body"), this.state = this.options.state || {}, this.pageName = window.location.pathname;
        var t = $("#tpl-retention-addiction").html();
        this.options.container.html(Mustache.render(t, {
            events: this.events,
            durations: this.durations
        })), this.tplEvent_ = $("#tpl-retention-addiction-event").html(), this.tplMeasure_ = $("#tpl-retention-addiction-measure").html(), this.tplDuration_ = $("#tpl-retention-addiction-duration").html(), this.tplTable_ = $("#tpl-retention-addiction-table").html(), this.$btnQuery_ = this.options.container.find("#btn-query"), this.$addEventFilter_ = this.options.container.find("#btn-add-event-filter"), this.$addUserFilter_ = this.options.container.find("#btn-add-user-filter"), this.$eventFilter_ = this.options.container.find("#event-filter"), this.$userFilter_ = this.options.container.find("#user-filter"), this.eventFilter_ = new sensorsdata.FilterGroupControl, this.userFilter_ = new sensorsdata.FilterGroupControl, this.groupControl_ = new sensorsdata.GroupControl, this.$events_ = this.options.container.find("#event-hold-place"), this.groupContainer_ = this.options.container.find("#group-container"), this.tableContainer_ = this.options.container.find("#tableContainer"), this.reportNoData_ = this.options.container.find("div.report-no-data"), this.inputDuration_ = this.options.container.find("#inputDuration"), this.measureContainer_ = this.options.container.find("#measure-container"), this.inputDate_ = this.options.container.find("#inputDaterangepicker"), this.rawRetentions_ = {}, this.padRetentions_ = {}, this.retentions_ = {}, this.tableHeadData_ = [], this.bookmarkToolbar = {}, this.bookmark_ = {}, this.jqXhr_ = null, this.reportLoading = new r({
            container: this.tableContainer_,
            needHideDom: [$("#table-pagination")]
        }), this.init()
    }

    var n = e("components/bookmarkToolbar/bookmarkToolbar"), r = e("components/reportLoading/reportLoading"),
        i = e("components/util/util");
    sensorsdata.inherits(s, sensorsdata.AddictionBase), s.prototype.init = function () {
        s.superClass_.init.call(this), this.$btnQuery_.toggle(sensorsdata.cache.config.auto_refresh === !1), this.paramObj = sensorsdata.unparam(window.location.hash), this.paramObj = s.dealParam(this.paramObj);
        var e = this.paramObj, t = "#" + $.param(e);
        window.history.replaceState(t, "", t);
        var a = e[sensorsdata.CONSTSET.bookmarkId], r = this.state;
        this.bookmarkToolbar = n.create({
            dashid: r.dashid,
            fromDashboard: "dashboard" === r.from && !!r.dashid,
            showSaveAndAdd: "dashboard" === r.from && "add" === r.action && !!r.dashid,
            samplingDisplay: !0,
            samplingFactor: e.sampling_factor,
            onBookmarkAdded: sensorsdata.bind(function (e) {
                this.paramObj[sensorsdata.CONSTSET.bookmarkId] = e.id
            }, this),
            onBookmarkNameChanged: sensorsdata.bind(function () {
                this.updateReportName_(this.paramObj, this.bookmarkToolbar.bookmark)
            }, this),
            onRefreshClick: sensorsdata.bind(function (e) {
                this.reviewDateRange_(), this.getRetentions_({}, e)
            }, this),
            onDownloadClick: sensorsdata.bind(function () {
                var e = $.extend(!0, {}, this.paramObj),
                    t = (this.bookmarkToolbar.bookmark.id && this.bookmarkToolbar.bookmark.name + "_") + sensorsdata.languages.get("分布分析<!--{en}RetentionAddictionAnalysis--->") + "_" + this.inputDate_.val() + "_SensorsAnalytics",
                    a = "addictions/report/csv?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || "");
                sensorsdata.download(a, e, t)
            }, this),
            sessionDropdownDisplay: !1,
            container: $("#bookmark-save-bar"),
            bookmarkid: a,
            params: this.paramObj,
            type: this.pageName
        }), this.getProperties(e.event_name, sensorsdata.bind(function () {
            this.renderInput_(e), this.initEvent_(), e = $.extend(!0, {}, e, this.getGroupVal_()), sensorsdata.cache.config.auto_refresh === !0 ? this.getRetentions_(e) : this.options.closeLoading(), this.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh)
        }, this))
    }, s.prototype.reload = function () {
        window.location.pathname === this.pageName && (this.paramObj = sensorsdata.unparam(window.location.hash), this.paramObj = s.dealParam(this.paramObj), this.renderInput_(this.paramObj), sensorsdata.cache.config.auto_refresh === !0 && this.getRetentions_(this.paramObj), this.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh))
    }, s.prototype.unload = function () {
        $(window).unbind("scroll.addiction"), this.bookmarkToolbar.destroy(), this.jqXhr_ && $.isFunction(this.jqXhr_.abort) && (this.jqXhr_.abort(), this.jqXhr_ = null), this.options.container.find("[data-toggle=tooltip]").tooltip("destroy"), this.inputDate_ && this.inputDate_.data("daterangepicker") && (this.inputDate_.tooltip("destroy"), this.inputDate_.data("daterangepicker").remove())
    }, s.prototype.renderInput_ = function (e) {
        this.renderMeasure_(e);
        var t = this.measureContainer_.next('span[data-method="bucket"]');
        t.bucketPopover({
            value: $.isArray(e.result_bucket_param) ? e.result_bucket_param : [],
            dataType: "number",
            discreteItemDisplay: !1,
            saveCallback: sensorsdata.bind(function () {
                this.prevQuery_()
            }, this)
        }), t.toggle("times" === e.measure_type), this.updateHelpTip_(e.event_name, e.unit, e.measure_type);
        var a = this;
        this.$events_.coolEventDropdown({
            events: this.events, eventName: e.event_name, onChange: function (e) {
                a.getProperties(e, sensorsdata.bind(function () {
                    var t = a.paramObj;
                    if (!$.isEmptyObject(t.measure)) {
                        var s = t.measure.field.split(".")[2], n = sensorsdata.findProperty(t.measure.field, a.propObj);
                        $.isEmptyObject(n) ? delete t.measure : t.measure.field = "event." + e + "." + s
                    }
                    a.renderMeasure_(t);
                    var r = {relation: "", conditions: []};
                    if (t.event_name !== e && !$.isEmptyObject(t.filter) && t.filter.conditions && t.filter.conditions.length > 0 && (r.relation = t.filter.relation, t.filter.conditions.map(function (t) {
                        var s = t.field.split(".")[2], n = sensorsdata.findProperty(t.field, a.propObj);
                        if (!$.isEmptyObject(n)) {
                            var i = $.extend(!0, {}, t);
                            i.field = "event." + e + "." + s, r.conditions.push(i)
                        }
                    })), t.by_field) {
                        var i = t.by_field.split(".");
                        if (3 === i.length) {
                            var o = i[1];
                            if (o !== e) {
                                var d = sensorsdata.findProperty(t.by_field, a.propObj);
                                t.by_field = $.isEmptyObject(d) ? "" : "event." + e + "." + d.name
                            }
                        }
                    }
                    a.renderGroup_(t.by_field, t.bucket_param), a.initEventFilter_(r), a.prevQuery_()
                }, a))
            }
        }), this.initEventFilter_(e.filter), this.userFilter_.init({
            container: this.$userFilter_,
            propertyObj: {user: this.userProperties},
            disabled: sensorsdata.authority.isNormal
        }), $.isEmptyObject(this.paramObj.user_filter) || this.userFilter_.val(e.user_filter), this.renderGroup_(e.by_field, e.bucket_param), this.initDate_(), sensorsdata.authority.isNormal && this.options.container.find("#retention-report-ops").find("button,input,select").attr("disabled", !0)
    }, s.prototype.renderMeasure_ = function (e) {
        var t = this.events.filter(function (t) {
            return t.name === e.event_name
        })[0], a = $(Mustache.render(this.tplMeasure_, {
            measureType: e.measure_type,
            measure: e.measure,
            measureName: this.buildMeasureName(e),
            eventName: t.name,
            measureProperties: this.filterProperties_(!0),
            notMeasureProperties: this.filterProperties_(!1)
        }));
        if (this.measureContainer_.html(a), this.measureContainer_.find('[data-aggregator="period"]').toggle(!e.rollup_date), !e.rollup_date) {
            var s = this.getDuration(e.unit);
            this.measureContainer_.find('[data-aggregator="period"]').text(s.unitCname + sensorsdata.languages.get("数<!--{en}Number-->"))
        }
        this.measureContainer_.find("a").bind("click", sensorsdata.bind(function (e) {
            var t = $(e.target || e.srcElement);
            if (t.is("a") || (t = t.parent("a:first")), !t.attr("data-aggregator") && "more" === t.attr("data-method")) return t.parent().hide().next().hide().nextAll().slideDown(), !1;
            if (!t.attr("data-aggregator")) return !1;
            var a = t.parents("li:first");
            if (!a.hasClass("disabled") && !a.hasClass("active")) {
                var s = t.attr("data-aggregator"), n = t.parents("div:first").find(".selected");
                n.attr("data-measure-type", "period" === s ? "period" : "times"), n.attr("data-aggregator", s), n.attr("data-field", t.attr("data-field")), n.text(t.attr("data-cname") ? t.attr("data-cname") + sensorsdata.languages.get("的<!--{en} . -->") + t.text() : t.text()), t.parents('div[data-method="aggregator-select"]').find("li.active").removeClass("active"), t.parents("li").addClass("active");
                var r = this.measureContainer_.parent().find('span[data-method="bucket"]');
                r.toggle("period" !== s), this.inputDuration_.find('a[data-value="rollup"]').parent().toggle("period" !== s), this.prevQuery_(), this.updateHelpTip_(this.paramObj.event_name, this.paramObj.unit, this.paramObj.measure_type)
            }
        }, this))
    }, s.prototype.filterProperties_ = function (e) {
        return this.propObj.event.filter(function (t) {
            var a = "number" === t.data_type && t.is_measure === !0;
            return e ? a : !a
        })
    }, s.prototype.initEventFilter_ = function (e) {
        e = e || {}, this.eventFilter_.init({
            container: this.$eventFilter_,
            propertyObj: this.propObj,
            disabled: sensorsdata.authority.isNormal
        }), !$.isEmptyObject(e) && e.conditions && e.conditions.length > 0 && this.eventFilter_.val(e)
    }, s.prototype.initEvent_ = function () {
        var e = this;
        this.$btnQuery_.bind("click", function () {
            e.getRetentions_()
        }), this.bookmarkToolbar.on("updateSampling", function (t) {
            $.extend(!0, e.paramObj, t), e.getRetentions_()
        }), this.bookmarkToolbar.on("updateParams", function (t) {
            t.dashboard_cache_policy ? e.paramObj.dashboard_cache_policy = t.dashboard_cache_policy : delete e.paramObj.dashboard_cache_policy
        }), this.$addEventFilter_.unbind("click").bind("click", function () {
            e.eventFilter_.addFilter()
        }), this.$addUserFilter_.unbind("click").bind("click", function () {
            e.userFilter_.addFilter()
        }), this.tableContainer_.bind("click", sensorsdata.bind(this.tableContainerClick_, this)), this.eventFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(e.prevQuery_, this)), this.userFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(e.prevQuery_, this));
        var t = this.paramObj, a = this.getDuration(t.unit);
        this.inputDuration_.find('a[data-value="rollup"]').parent().toggle("times" === t.measure_type), this.inputDuration_.find("button").saDropdown({
            value: t.rollup_date === !0 ? "rollup" : a.name,
            onSelected: function (t) {
                if ("rollup" !== t) {
                    var a = e.getDuration(t), s = a.unitCname + sensorsdata.languages.get("数<!--{en}Number-->");
                    e.measureContainer_.find('[data-measure-type="period"]').text(s), e.measureContainer_.find('[data-aggregator="period"]').text(s), e.updateHelpTip_(e.paramObj.event_name, a.name, e.paramObj.measure_type)
                }
                e.measureContainer_.find('[data-aggregator="period"]').toggle("rollup" !== t), e.prevQuery_()
            }
        })
    }, s.prototype.initDate_ = function () {
        var e = this, t = sensorsdata.CONSTSET, a = t.dateRangeLimit.day, s = this.paramObj, n = {};
        n.startDate = moment(s.from_date, t.dateFormat), n.endDate = moment(s.to_date, t.dateFormat), n.rangeLimit = a, n.chosenLabel = s.rangeText, n.allowRelative = !0, sensorsdata.initDateRangeInput(this.inputDate_, n), this.inputDate_.tooltip().unbind("apply.daterangepicker").bind("apply.daterangepicker", function () {
            e.prevQuery_()
        }), this.inputDate_.unbind("truncate.daterangepicker").bind("truncate.daterangepicker", function () {
            sensorsdata.info.show(sensorsdata.languages.get("时间范围最多<!--{en}Maximum range of time-->") + a + sensorsdata.languages.get("天<!--{en}Day-->"))
        })
    }, s.prototype.getRetentions_ = function (e, t) {
        var a = (new Date).valueOf();
        this.$btnQuery_.addClass("disabled").text(sensorsdata.languages.get("查询中…<!--{en}Querying-->")), $.isEmptyObject(e) && (e = this.buildParamObj_()), this.paramObj = e;
        var s = "#" + $.param(e);
        window.location.hash !== s && window.history.pushState(s, "", s);
        var n = "addictions/report/?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || ""), r = $.extend(!0, {}, e);
        r.rollup_date === !0 && delete r.by_field, this.handleLoading(e, t);
        var i = {success: !0, use_cache: !!e.use_cache};
        this.jqXhr_ = sensorsdata.reportAjax({
            isAsync: !0,
            queueEnable: !0,
            url: n,
            method: "POST",
            data: r,
            complete: sensorsdata.bind(function () {
                this.$btnQuery_.removeClass("disabled").text(sensorsdata.languages.get("查询<!--{en}Query-->")), this.options.closeLoading(), $.isFunction(t) && t()
            }, this),
            error: function (e) {
                this.reportLoading.closeLoading(), i.success = !1, i.fail_reason = e.status, i.time_consuming = "", sensorsdata.track("addiction_analytics", i)
            }.bind(this),
            success: sensorsdata.bind(function (t) {
                this.reportLoading.closeLoading("success"), a = 100 * Math.ceil(((new Date).valueOf() - a) / 100), i.time_consuming = a, sensorsdata.track("addiction_analytics", i), this.bookmarkToolbar.setRefresh(t), this.rawRetentions_ = $.extend(!0, {}, t);
                var s = $.isArray(t.rows) && t.rows.length > 0;
                if (this.tableContainer_.parent().toggle(s), this.setHolderPlace_(!0, !s), s) {
                    var n = sensorsdata.findProperty(e.by_field, [this.propObj, this.userProperties]);
                    this.padRetentions_ = this.padRetentions(t, this.paramObj, n), this.retentions_ = this.buildRenderRetentions_(this.padRetentions_), this.renderGroup_(this.paramObj.by_field, this.paramObj.bucket_param), this.renderTable_(this.retentions_)
                } else this.tableContainer_.find('[data-toggle="tooltip"]').tooltip("destroy"), this.tableContainer_.html("");
                this.updateReportName_(this.paramObj, this.bookmark_)
            }, this)
        })
    }, s.prototype.tableContainerClick_ = function (e) {
        var t = $(e.target || e.srcElement);
        t.attr("data-method") || (t = t.parents("[data-method]:first"));
        var a = t.attr("data-method");
        switch (a) {
            case"user-list":
                var s = parseInt(t.parents("tr:first").attr("data-index"), 10),
                    n = this.rawRetentions_.rows[s].by_value, r = t.parents("td:first").prevAll().size(),
                    i = $.extend(!0, {}, this.paramObj);
                switch (n) {
                    case null:
                        i.slice_by_value = sensorsdata.CONSTSET.unknownByValueText;
                        break;
                    case"":
                        i.slice_by_value = sensorsdata.CONSTSET.emptyStringByValueText;
                        break;
                    default:
                        i.slice_by_value = n
                }
                var o = this.padRetentions_.rows[0].cells;
                r >= 2 ? (i.slice_freq = o[r - 2].bucket_start, i.slice_max_freq = o[r - 2].bucket_end) : (i.slice_freq = 1, i.slice_max_freq = null), i.detail = !0;
                var d = "";
                if (i.by_field) {
                    var l = sensorsdata.findProperty(i.by_field, [this.propObj, this.userProperties]);
                    d = sensorsdata.formatByValue(n, l.data_type, "", i.bucket_param)
                } else {
                    var p = sensorsdata.CONSTSET;
                    d = moment(n, p.timeFormat).format(p.shortDateFormat)
                }
                $(t).createUserListPanel({queryData: i})
        }
        return !1
    }, s.prototype.buildRenderRetentions_ = function (e) {
        var t = this.paramObj, a = t.unit, s = {};
        return t.by_field && (s = sensorsdata.findProperty(t.by_field, [this.propObj, this.userProperties])), e.rows = e.rows.map(sensorsdata.bind(function (e) {
            e = $.extend(!0, {}, e), t.rollup_date === !0 ? e.by_value = sensorsdata.languages.get("全部<!--{en}All-->") : t.by_field || (e.tooltip = "week" === a ? sensorsdata.buildWeekRangeTip(e.by_value) : "", e.by_value = sensorsdata.formatTime(e.by_value, a)), e.total_people = sensorsdata.formatNumber(e.total_people);
            for (var n = 0, r = e.cells.length; r > n; n++) {
                var i = e.cells[n];
                $.isNumeric(i.people) && $.isNumeric(i.percent) && (i.people = sensorsdata.formatNumber(i.people), i.percent = Math.round(10 * i.percent) / 10, i.className = "hm-" + (Math.floor((100 - Math.ceil(i.percent)) / 10) + 1), i.tip = this.buildCellTip_(e, n, t, s.cname))
            }
            return e
        }, this)), e
    }, s.prototype.updateReportName_ = function (e, t) {
        var a = sensorsdata.findEventCname(e.event_name), s = sensorsdata.languages.get("用户<!--{en}User-->");
        s += $.trim(this.inputDuration_.find("button").text()), a && (s += sensorsdata.languages.get("进行<!--{en} has-->") + a), s += sensorsdata.languages.get("的<!--{en} . -->") + this.buildMeasureName(e), t && t.id && t.name && (s = t.name), this.options.container.find(".report-name").text(s), this.bookmarkToolbar.setDialogName(s)
    }, s.prototype.prevQuery_ = function () {
        var e = this.buildParamObj_();
        if (sensorsdata.cache.config.auto_refresh) {
            var t = JSON.stringify(this.paramObj) !== JSON.stringify(e);
            t && this.getRetentions_(e)
        }
        this.bookmarkToolbar.setParams({data: e})
    }, s.prototype.buildParamObj_ = function () {
        var e = sensorsdata.CONSTSET, t = {
            rangeText: this.inputDate_.data("daterangepicker") && this.inputDate_.data("daterangepicker").chosenLabel,
            from_date: this.inputDate_.data("startDate").format(e.dateFormat),
            to_date: this.inputDate_.data("endDate").format(e.dateFormat),
            sampling_factor: this.bookmarkToolbar.getSamplingValue()
        }, a = this.inputDuration_.find("button").attr("data-value");
        "rollup" !== a ? t.unit = a : (t.unit = "day", t.rollup_date = !0), t.event_name = this.$events_.data("selected-event"), t.event_name = t.event_name || sensorsdata.CONSTSET.eventEmptyValue;
        var s = this.measureContainer_.find("span.selected");
        t.measure_type = s.attr("data-measure-type"), "times" === t.measure_type && (t.result_bucket_param = this.measureContainer_.next().data("bucket-value"), s.attr("data-event-name") && s.attr("data-field") && s.attr("data-aggregator") && (t.measure = {
            event_name: s.attr("data-event-name"),
            field: s.attr("data-field"),
            aggregator: s.attr("data-aggregator")
        })), t.filter = this.eventFilter_.val(), t.user_filter = this.userFilter_.val();
        var n = this.groupControl_.val(), r = n.byFields || [], i = n.bucket || {};
        r.length > 0 && (t.by_field = r[0], t.bucket_param = i[r[0]]);
        var o = this.paramObj[sensorsdata.CONSTSET.bookmarkId];
        return o && (t[sensorsdata.CONSTSET.bookmarkId] = o), t
    }, s.prototype.getGroupVal_ = function () {
        var e = {}, t = this.groupControl_.val(), a = t.byFields || [], s = t.bucket || {};
        return a.length > 0 && (e.by_field = a[0], e.bucket_param = s[a[0]]), e
    }, s.prototype.renderTable_ = function (e) {
        e = $.extend(!0, {}, e);
        var t = e.rows;
        t.map(function (e, t) {
            e.rowIndex = t
        });
        var a = this, s = {
            heads: t[0].cells.map(function (e) {
                return a.buildLabel(e, !0)
            })
        };
        this.tableHeadData_ = s.heads;
        var n = sensorsdata.bind(function (e, a) {
            e -= 1, this.tableContainer_.find('[data-toggle="tooltip"]').tooltip("destroy"), s.rows = t.slice(e, a), this.tableContainer_.html(Mustache.render(this.tplTable_, s)), this.tableContainer_.find('[data-toggle="tooltip"]').tooltip({
                container: "body",
                html: !0
            }), this.tableContainer_.find("table").fixedColumn()
        }, this);
        t.length <= sensorsdata.CONSTSET.paginationSize ? (this.options.container.find("#table-pagination").html(""), n(1, t.length)) : sensorsdata.pagination({
            tableElement: this.options.container.find("#table-pagination"),
            totalItems: t.length,
            clickHandle: sensorsdata.bind(function (e) {
                n(e.range[0], e.range[1])
            }, this)
        })
    }, s.prototype.updateHelpTip_ = function (e, t, a) {
        var s = sensorsdata.findEventCname(e), n = this.getDuration(t), r = "";
        r = "times" === a ? sensorsdata.languages.get("若用户在<!--{en}Is user -->") + n.cname + sensorsdata.languages.get("进行<!--{en}did-->") + s + sensorsdata.languages.get("1 次，就记 1 次。<!--{en}1 time, then record for 1.-->") : sensorsdata.languages.get("若用户在某<!--{en}If user -->") + n.unitCname + sensorsdata.languages.get("内进行<!--{en}did in-->") + s + sensorsdata.languages.get("一次或多次，都记1次。例如，用户在<!--{en}no matter once or several times, record for 1 time. For example, when users are-->") + n.cname + sensorsdata.languages.get("的 3<!--{en}3 of -->") + n.unitCname + sensorsdata.languages.get("有<!--{en}has-->") + s + sensorsdata.languages.get("行为，记录 3 次，而不管在一<!--{en}behavior, record for 3 times,no matter in一-->") + n.unitCname + sensorsdata.languages.get("内重复多少次。<!--{en}repeat how many times.-->"), this.options.container.find("span.icon-help").attr("data-original-title", r).tooltip()
    }, s.prototype.renderGroup_ = function (e, t) {
        if (this.groupContainer_.html(""), this.groupControl_.init({
            container: this.groupContainer_,
            label: {begin: "", end: "", overAllText: sensorsdata.languages.get("用户行为日期<!--{en}Date of event-->")},
            data: {event: this.propObj.event, user: this.userProperties},
            disabled: sensorsdata.authority.isNormal
        }), e) {
            var a = {};
            a[e] = t, this.groupControl_.val({byFields: [e], bucket: a})
        }
        this.groupControl_.bindEvent("valueChangedEvent", sensorsdata.bind(this.prevQuery_, this))
    }, s.dealParam = function (e) {
        var t = $.extend(!0, [], sensorsdata.cache.events);
        "ALL" === sensorsdata.authority.eventPermission.type && t.unshift(sensorsdata.CONSTSET.everyEvent), $.isEmptyObject(e) || 0 === t.filter(function (t) {
            return t.name === e.event_name
        }).length && (sensorsdata.error.show(sensorsdata.languages.get("没有相关事件的权限或事件不存在<!--{en}There are no permissions for the relevant events or the events do not exist-->")), e = {});
        var a = sensorsdata.buildDefaultTimeRange(), s = {
            event_name: t[0].name,
            unit: "day",
            from_date: a[0].format(sensorsdata.CONSTSET.dateFormat),
            to_date: a[1].format(sensorsdata.CONSTSET.dateFormat),
            measure_type: "period"
        };
        if ($.isEmptyObject(e)) return s;
        delete e.duration, "true" === e.rollup_date ? e.rollup_date = !0 : "false" === e.rollup_date ? e.rollup_date = !1 : delete e.rollup_date;
        var n = sensorsdata.CONSTSET.dateFormat;
        moment(e.from_date, n).isValid() === !1 && delete e.from_date, moment(e.to_date, n).isValid() === !1 && delete e.to_date, $.isEmptyObject(e.first) ? e.filter = sensorsdata.FilterGroupControl.dealCompatible(e.filter) : (e.event_name = e.first.event, e.filter = sensorsdata.FilterGroupControl.dealCompatible(e.first.filter), delete e.first), e.user_filter = sensorsdata.FilterGroupControl.dealCompatible(e.user_filter), e.by && (e.by_field = e.by, delete e.by), e.sampling_factor && (e.sampling_factor = sensorsdata.BookmarkSave.dealSamplingValue(e.sampling_factor));
        var r = sensorsdata.buildBucketPopoverValue(e.bucket_param);
        r.length > 0 ? e.bucket_param = r : delete e.bucket_param, r = sensorsdata.buildBucketPopoverValue(e.result_bucket_param), r.length > 0 ? e.result_bucket_param = r : delete e.result_bucket_param, e.buckets && (e.result_bucket_param = e.buckets, delete e.buckets);
        var o = i.getTimeRange(e.rangeText, !1);
        return e.rangeText && !$.isEmptyObject(o) && (e.from_date = o.from_date, e.to_date = o.to_date), $.extend(!0, s, e)
    }, s.prototype.buildCellTip_ = function (e, t, a, s) {
        var n = sensorsdata.findEventCname(a.event_name), r = this.getDuration(a.unit), i = e.cells[t],
            o = this.buildLabel(i);
        if ("times" === a.measure_type) {
            var d = a.measure && a.measure.field ? this.buildMeasureName(a) : "";
            return a.rollup_date === !0 ? sensorsdata.languages.get("在选定时间段内有<!--{en}In the selected period of time, there is-->") + e.total_people + sensorsdata.languages.get("人进行过<!--{en}People did-->") + n + sensorsdata.languages.get("。其中，有<!--{en}.In which there are-->") + i.people + sensorsdata.languages.get("人进行了<!--{en}People did-->") + d + o + "。" : a.by_field ? sensorsdata.languages.get("在选定时间段内有<!--{en}In the selected period of time, there is-->") + e.total_people + sensorsdata.languages.get("人<!--{en}People-->") + s + sensorsdata.languages.get("是<!--{en}Yes-->") + sensorsdata.trimConstHtml(e.by_value) + sensorsdata.languages.get("的人进行过<!--{en}of people did-->") + n + sensorsdata.languages.get("。其中，有<!--{en}.In which there are-->") + i.people + sensorsdata.languages.get("人进行了<!--{en}People did-->") + d + o + "。" : sensorsdata.languages.get("在<!--{en}During-->") + sensorsdata.trimConstHtml(e.by_value) + sensorsdata.languages.get("这<!--{en}Here-->") + r.cname + sensorsdata.languages.get("进行过<!--{en}did-->") + n + sensorsdata.languages.get("的用户有<!--{en}the users are-->") + sensorsdata.formatNumber(e.total_people) + sensorsdata.languages.get("人，其中有<!--{en}people, in which there are-->") + i.people + sensorsdata.languages.get("人进行了<!--{en}People did-->") + d + o
        }
        return a.by_field ? sensorsdata.languages.get("在选定时间段内有<!--{en}In the selected period of time, there is-->") + e.total_people + sensorsdata.languages.get("位<!--{en}people-->") + s + sensorsdata.languages.get("是<!--{en}Yes-->") + sensorsdata.trimConstHtml(e.by_value) + sensorsdata.languages.get("的人进行了<!--{en}people did-->") + n + sensorsdata.languages.get("。其中，有<!--{en}.In which there are-->") + i.people + sensorsdata.languages.get("人平均每<!--{en}Average per person-->") + r.shortCname + sensorsdata.languages.get("进行了至少<!--{en}did at least-->") + (t + 2) + " " + r.unitCname + n + "。" : sensorsdata.languages.get("在<!--{en}During-->") + sensorsdata.trimConstHtml(e.by_value) + sensorsdata.languages.get("这<!--{en}Here-->") + r.cname + sensorsdata.languages.get("进行了<!--{en}did-->") + n + sensorsdata.languages.get("的<!--{en}of-->") + sensorsdata.formatNumber(e.total_people) + sensorsdata.languages.get("人中，有<!--{en}people, in which there are-->") + i.people + sensorsdata.languages.get("人在<!--{en}People in-->") + r.cname + sensorsdata.languages.get("进行了至少<!--{en}did at least-->") + (t + 2) + " " + r.unitCname + n
    }, s.prototype.handleLoading = function (e, t) {
        var a = parseInt(e.sampling_factor, 10) || 64;
        this.reportLoading.options.sampling_factor = a, 64 === a ? (this.reportLoading.options.quickType = "sampling_factor", this.reportLoading.options.openQuickQuery = function () {
            this.reportLoading.options.sampling_factor = e.sampling_factor = 16, this.bookmarkToolbar.samplingSlider_ && this.bookmarkToolbar.samplingSlider_.setValue(4, !0, !0), this.getRetentions_(e, t)
        }.bind(this)) : this.reportLoading.options.quickType = "none", this.reportLoading.showLoading()
    }, a.exports = s
});
;
/*!pages/retention/retention.js*/
define("pages/retention/retention", function (e, t, s) {
    function a(e) {
        sensorsdata.RetentionBase.call(this), this.options = e, this.options.container = e.container || $("body"), this.state = this.options.state || {}, this.pageName = window.location.pathname, this.events_ = $.extend(!0, [], this.options.events), "ALL" === sensorsdata.authority.eventPermission.type && this.events_.unshift(sensorsdata.CONSTSET.everyEvent);
        var t = $("#tpl-retention-index").html();
        this.options.container.html(Mustache.render(t, {
            events: this.events_,
            durations: this.durations_
        })), this.tplTable_ = $("#tpl-retention-index-table").html(), this.tplMeasureLine_ = $("#tpl-retention-index-measure-line").html(), this.tplMeasureItem_ = $("#tpl-retention-index-measure-item").html(), this.measureFunctions_ = sensorsdata.CONSTSET.measureFunctions, this.$btnQuery_ = this.options.container.find("#btn-query"), this.$firstEvent_ = this.options.container.find("#first-event"), this.$firstEventFilter_ = this.options.container.find("#first-event-filter"), this.$secondEvent_ = this.options.container.find("#second-event"), this.$secondEventFilter_ = this.options.container.find("#second-event-filter"), this.$userFilter_ = this.options.container.find("#user-filter"), this.$addFirstFilter_ = this.options.container.find("#btn-add-first-filter"), this.$addSecondFilter_ = this.options.container.find("#btn-add-second-filter"), this.$addUserFilter_ = this.options.container.find("#btn-add-user-filter"), this.$addLastMetrics_ = this.options.container.find("#btn-add-last-metrics"), this.measuresContainer_ = this.options.container.find("#measures-container"), this.measuresContainer_.find('[data-toggle="tooltip"]').tooltip(), this.$btnAddMeasure_ = this.options.container.find("#btn-add-measure"), this.userMeasure_ = this.options.container.find("#select-measures"), this.firstFilter_ = new sensorsdata.FilterGroupControl, this.secondFilter_ = new sensorsdata.FilterGroupControl, this.userFilter_ = new sensorsdata.FilterGroupControl, this.groupControl_ = new sensorsdata.GroupControl, this.chartsContainer_ = this.options.container.find("#chartsContainer"), this.chart_ = echarts.init(this.chartsContainer_[0]), this.groupContainer_ = this.options.container.find("#group-container"), this.tableContainer_ = this.options.container.find("#tableContainer"), this.reportNoData_ = this.options.container.find("div.report-no-data"), this.durationContainer_ = this.options.container.find("#duration-container"), this.btnDisplayChart_ = this.options.container.find("#btnDisplayChart"), this.inputDate_ = this.options.container.find("#inputDaterangepicker"), this.btnChartsType_ = this.options.container.find("button[data-charts]"), this.paramObj = {}, this.firstPropObj_ = {}, this.secondPropObj_ = {}, this.userProperties_ = [], this.rawRetentions_ = {}, this.retentions_ = {}, this.bookmarkToolbar = {}, this.bucketRemember_ = {}, this.jqXhr_ = null, this.reportLoading = new i({
            container: this.tableContainer_,
            needHideDom: [$("#table-pagination")]
        }), this.init()
    }

    var n = e("components/bookmarkToolbar/bookmarkToolbar"), i = e("components/reportLoading/reportLoading"),
        r = e("components/util/util");
    sensorsdata.inherits(a, sensorsdata.RetentionBase), a.prototype.init = function () {
        a.superClass_.init.call(this), this.$btnQuery_.toggle(sensorsdata.cache.config.auto_refresh === !1), this.paramObj = sensorsdata.unparam(window.location.hash);
        var e = this.dealParam(this.paramObj), t = r.getTimeRange(e.rangeText, !1);
        e.rangeText && !$.isEmptyObject(t) && (e.from_date = t.from_date, e.to_date = t.to_date), this.paramObj = e;
        var s = "#" + $.param(e);
        window.history.replaceState(s, "", s), this.renderEvent_(e), e.by_field && e.bucket_param && (this.bucketRemember_[e.by_field] = e.bucket_param);
        var i = e[sensorsdata.CONSTSET.bookmarkId], o = this.state;
        this.bookmarkToolbar = n.create({
            dashid: o.dashid,
            fromDashboard: "dashboard" === o.from && !!o.dashid,
            showSaveAndAdd: "dashboard" === o.from && "add" === o.action && !!o.dashid,
            samplingDisplay: !0,
            samplingFactor: e.sampling_factor,
            onBookmarkAdded: sensorsdata.bind(function (e) {
                this.paramObj[sensorsdata.CONSTSET.bookmarkId] = e.id
            }, this),
            onBookmarkNameChanged: sensorsdata.bind(function () {
                this.updateReportName_(this.paramObj, this.bookmarkToolbar.bookmark)
            }, this),
            onRefreshClick: sensorsdata.bind(function (e) {
                this.reviewDateRange_(), this.getRetentions_({}, e)
            }, this),
            onDownloadClick: sensorsdata.bind(function () {
                var e = $.extend(!0, {}, this.paramObj),
                    t = (this.bookmarkToolbar.bookmark.id && this.bookmarkToolbar.bookmark.name + "_") + sensorsdata.languages.get("留存分析<!--{en}RetentionAnalysis--->") + "_" + this.inputDate_.val() + "_SensorsAnalytics",
                    s = "retentions/report/csv?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || "");
                sensorsdata.download(s, e, t)
            }, this),
            sessionDropdownDisplay: !1,
            container: $("#bookmark-save-bar"),
            bookmarkid: i,
            params: this.paramObj,
            type: this.pageName
        });
        var d = e.first_event.event_name, l = e.second_event.event_name;
        this.prepareData_(d, l, sensorsdata.bind(function () {
            this.renderInput_(e), this.initEvent_(), sensorsdata.cache.config.auto_refresh === !0 ? this.getRetentions_(e) : this.options.closeLoading(), this.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh)
        }, this))
    }, a.prototype.reload = function () {
        window.location.pathname === this.pageName && (this.paramObj = sensorsdata.unparam(window.location.hash), this.paramObj = this.dealParam(this.paramObj), this.renderEvent_(this.paramObj), this.renderInput_(this.paramObj), sensorsdata.cache.config.auto_refresh === !0 && this.getRetentions_(this.paramObj), this.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh))
    }, a.prototype.unload = function () {
        $(window).unbind("scroll.retention"), $(window).unbind("resize.retention"), this.bookmarkToolbar.destroy(), this.jqXhr_ && $.isFunction(this.jqXhr_.abort) && (this.jqXhr_.abort(), this.jqXhr_ = null), this.options.container.find("[data-toggle=tooltip]").tooltip("destroy"), sensorsdata.form.removeChildrenError(this.measuresContainer_), this.inputDate_ && this.inputDate_.data("daterangepicker") && (this.inputDate_.tooltip("destroy"), this.inputDate_.data("daterangepicker").remove())
    }, a.prototype.renderEvent_ = function (e) {
        this.$firstEvent_.coolEventDropdown("destroy").coolEventDropdown({
            events: this.events_,
            eventName: e.first_event.event_name,
            onChange: sensorsdata.bind(this.changedEvent_, this)
        }), this.$secondEvent_.coolEventDropdown("destroy").coolEventDropdown({
            events: this.events_,
            eventName: e.second_event.event_name,
            onChange: sensorsdata.bind(this.changedEvent_, this)
        })
    }, a.prototype.renderFilter_ = function (e) {
        var t = this;
        this.initFirstFilter_(e.first_event.filter), this.firstFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(t.prevQuery_, this)), this.secondFilter_.init({
            container: this.$secondEventFilter_,
            propertyObj: this.secondPropObj_,
            disabled: sensorsdata.authority.isNormal
        }), $.isEmptyObject(e.second_event.filter) || this.secondFilter_.val(e.second_event.filter), this.initSecondFilter_(e.second_event.filter), this.secondFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(t.prevQuery_, this)), this.userFilter_.init({
            container: this.$userFilter_,
            propertyObj: {user: this.userProperties_, event: []},
            disabled: sensorsdata.authority.isNormal,
            excludeFunctions: ["relative_event_time"]
        }), $.isEmptyObject(e.user_filter) || this.userFilter_.val(e.user_filter), this.userFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(t.prevQuery_, this))
    }, a.prototype.initFirstFilter_ = function (e) {
        this.firstFilter_.init({
            container: this.$firstEventFilter_,
            propertyObj: this.firstPropObj_,
            disabled: sensorsdata.authority.isNormal
        }), !$.isEmptyObject(e) && e.conditions && e.conditions.length > 0 && this.firstFilter_.val(e)
    }, a.prototype.initSecondFilter_ = function (e) {
        this.secondFilter_.init({
            container: this.$secondEventFilter_,
            propertyObj: this.secondPropObj_,
            disabled: sensorsdata.authority.isNormal
        }), !$.isEmptyObject(e) && e.conditions && e.conditions.length > 0 && this.secondFilter_.val(e)
    }, a.prototype.renderInput_ = function (e) {
        var t = this, s = t.getEventNamesFromParam(e.measures);
        t.getProperties(s, function () {
            t.paramObj = t.removeInvalidProperties(e, t.propObj), t.renderMeasures_(t.sessions, e), t.renderFilter_(e), t.renderDuration_(e.duration, e.unit, e.is_wastage)
        }), this.btnChartsType_.removeClass("btn-primary btn-default").filter('button[data-charts="' + (e.chartsType || "raw") + '"]').addClass("btn-primary").siblings().addClass("btn-default"), this.initDate_(), sensorsdata.authority.isNormal && this.options.container.find("#retention-report-ops").find("button,input,select").attr("disabled", !0)
    }, a.prototype.renderDuration_ = function (e, t, s) {
        var a = this.getDuration(e, t), n = null;
        this.durationContainer_.find("li a").each(function () {
            var e = $(this).text();
            $(this).text(s ? e.replace(sensorsdata.languages.get("留存<!--{en}Retention-->"), sensorsdata.languages.get("流失<!--{en}Loss-->")) : e.replace(sensorsdata.languages.get("流失<!--{en}Loss-->"), sensorsdata.languages.get("留存<!--{en}Retention-->"))), $(this).attr("data-name") === a.name && (n = $(this))
        }), this.durationContainer_.find(".sa-tab div").removeClass("selected").filter('[data-type="' + (s ? "wastage" : "retention") + '"]').addClass("selected"), n.parent().addClass("active"), this.durationContainer_.find("button span:first").text(n.text())
    }, a.prototype.initEvent_ = function () {
        var e = this;
        this.$btnAddMeasure_.unbind("click").bind("click", function () {
            e.measuresContainer_.find('[data-method="event-add"]').click()
        }), this.$btnQuery_.bind("click", function () {
            e.getRetentions_()
        }), this.bookmarkToolbar.on("updateSampling", function (t) {
            $.extend(!0, e.paramObj, t), e.getRetentions_()
        }), this.bookmarkToolbar.on("updateParams", function (t) {
            t.dashboard_cache_policy ? e.paramObj.dashboard_cache_policy = t.dashboard_cache_policy : delete e.paramObj.dashboard_cache_policy
        }), this.$addFirstFilter_.unbind("click").bind("click", function () {
            e.firstFilter_.addFilter()
        }), this.$addSecondFilter_.unbind("click").bind("click", function () {
            e.secondFilter_.addFilter()
        }), this.$addUserFilter_.unbind("click").bind("click", function () {
            e.userFilter_.addFilter()
        }), this.durationContainer_.find("button").unbind("click").bind("click", function () {
            $(this).next().toggle()
        }), this.durationContainer_.find(".sa-tab div").unbind("click").bind("click", function () {
            $(this).addClass("selected").siblings().removeClass("selected"), e.renderDuration_(e.paramObj.duration, e.paramObj.unit, "wastage" === $(this).attr("data-type")), e.prevQuery_()
        }), this.durationContainer_.find("li a").unbind("click").bind("click", function () {
            $(this).parents(".config:first").hide(), e.durationContainer_.find("button span:first").text($(this).text()), $(this).parent().addClass("active").siblings().removeClass("active"), e.prevQuery_()
        }), $("body").unbind("click.retention-index").bind("click.retention-index", function (t) {
            var s = $(t.target || t.srcElement);
            0 === s.parents("#duration-container").size() && e.durationContainer_.find(".config").hide()
        }), this.tableContainer_.bind("click", sensorsdata.bind(this.tableContainerClick_, this)), this.btnChartsType_.click(sensorsdata.bind(function (e) {
            var t = $(e.target || e.srcElement);
            if (!t.hasClass("btn-primary")) {
                var s = t.attr("data-charts");
                $.isArray(this.retentions_.rows) && this.retentions_.rows.length > 0 && this.renderCharts_(this.retentions_, s);
                var a = t.attr("class");
                t.attr("class", t.siblings().attr("class")), t.siblings().attr("class", a), this.paramObj.chartsType = s;
                var n = "#" + $.param(this.paramObj);
                window.history.pushState(window.location.pathname + n, "", n)
            }
        }, this)), this.btnDisplayChart_.click(function () {
            e.renderCharts_(e.retentions_, e.paramObj.chartsType), $("html,body").animate({scrollTop: $("body")[0].scrollHeight}, 1500)
        }), $(window).off("resize.retention").on("resize.retention", function () {
            e.chart_ && e.chart_.resize()
        }), this.measuresContainer_.unbind("click").bind("click", sensorsdata.bind(this.measuresContainerClick_, this))
    }, a.prototype.measuresContainerClick_ = function (e) {
        var t = this, s = $(e.target || e.srcElement), a = s.attr("data-method");
        a || (s = s.parents("[data-method]:first"), a = s.attr("data-method"));
        var n = s.parents("div#measure-line"), i = "";
        switch (a) {
            case"measure-save":
                this.saveCustomMeasure_(s.parents("div#measure-line"));
                break;
            case"measure-edit":
                t.changeCustomMeasureModel_(n, !0);
                break;
            case"switch-measure":
                i = this.getNextEvent_();
                var r = n.find("#normal-measure-line").toggle(), o = n.find("#custom-measure-line").toggle();
                if (o.is(":visible")) {
                    if (!o.find("#measure-express").data("measure-express")) {
                        var d = sensorsdata.CONSTSET, l = t.measureFunctions_,
                            u = $.trim(r.find("span.multiselect-selected-text").text()), p = "";
                        p = u === d.eventEmptyText ? u + "." + l.unique.cname + "/" + d.eventEmptyText + "." + l.general.cname : u + "." + l.general.cname + "/" + d.eventEmptyText + "." + l.general.cname, o.find("#measure-express").val(p), t.initCustomMeasure_(n), t.changeCustomMeasureModel_(n, !0)
                    }
                } else this.getProperties(this.getEventNames_(), function () {
                    t.renderEventLine_(n, i);
                    var e = t.buildMeasuresParam_(n.find("div#select-measures"));
                    0 === e.length && t.renderAggregator_(n.find("#select-measures"), i), t.adjustEventsDisabled_(), t.adjustAggregatorDisabled_(n), t.prevQuery_()
                });
                break;
            case"event-add":
                if (i = this.getNextEvent_(), !i) break;
                var h = $.extend(!0, [], this.events);
                this.paramObj.session_name && (h[0].cname = sensorsdata.languages.get("Session 总体<!--{en}Session overall-->")), n = $(Mustache.render(this.tplMeasureLine_, {
                    sessionDisplay: !!this.paramObj.session_name,
                    sessions: this.sessions
                })), this.paramObj.session_name && t.renderSession_(n, this.paramObj.session_name), t.initCustomMeasure_(n), this.renderEventLine_(n, i);
                var m = this.getEventNames_();
                m.push(i), this.getProperties(m, function () {
                    t.renderAggregator_(n.find("#select-measures"), i), s.before(n), n.find('[data-toggle="tooltip"]').tooltip(), t.adjustEventsDisabled_(), t.adjustAggregatorDisabled_(n), t.prevQuery_()
                });
                break;
            case"measure-add":
                if (s.is(":disabled")) break;
                i = n.find("#select-event").data("selected-event");
                var c = this.getNextMeasure_(n);
                if ($.isEmptyObject(c)) break;
                this.renderAggregator_(n.find("#select-measures"), i, [c]), this.adjustAggregatorDisabled_(n), this.prevQuery_();
                break;
            case"custom-measure-remove":
                sensorsdata.form.removeChildrenError(s.parents("div#measure-line")), s.parents("div#measure-line").remove(), this.prevQuery_();
                break;
            case"measure-remove":
                s.is(":disabled") || (s.parent('div[data-method="aggregator-select"]').remove(), 0 === n.find('div[data-method="aggregator-select"]').size() ? (n.remove(), this.adjustEventsDisabled_(), m = this.getEventNames_(), this.getProperties(m, function () {
                    t.prevQuery_()
                })) : (this.adjustAggregatorDisabled_(n), this.prevQuery_()))
        }
    }, a.prototype.getNextEvent_ = function () {
        for (var e = this.getEventNames_(!1), t = 0, s = this.events_.length; s > t; t++) if (-1 === e.indexOf(this.events_[t].name)) return this.events_[t].name;
        return ""
    }, a.prototype.getEventNames_ = function (e) {
        var t = [];
        return this.measuresContainer_.find("div#measure-line").each(function () {
            var s = $(this), a = s.find("#normal-measure-line");
            if (a.is(":visible")) {
                var n = a.find("div.select-event").data("selected-event");
                -1 === t.indexOf(n) && t.push(n)
            } else if (e !== !1) {
                var i = s.find("#measure-express").data("measure-events");
                $.isArray(i) && i.length > 0 && i.map(function (e) {
                    -1 === t.indexOf(e) && t.push(e)
                })
            }
        }), t
    }, a.prototype.renderMeasures_ = function (e, t) {
        for (var s = this, a = t.measures, n = $(""), i = "", r = 0, o = [], d = [], l = [], u = 0, p = a.length; p > u; u++) {
            var h = a[u], m = $(Mustache.render(this.tplMeasureLine_, {
                sessionDisplay: !!t.session_name,
                sessions: e,
                measure: h
            }));
            t.session_name && s.renderSession_(m, t.session_name), h.expression ? (s.renderEventLine_(m), s.initCustomMeasure_(m, h), n = n.add(m), d.push(h), l.push(m)) : (i = h.event_name, o.push(h), p > u + 1 && i === a[u + 1].event_name || (this.renderEventLine_(m, i), s.options.container.find("#session-measure-line").hide(), this.renderAggregator_(m.find("#select-measures"), i, o), this.adjustAggregatorDisabled_(m), n = n.add(m), o = [], r++))
        }
        if (this.measuresContainer_.find("div#measure-line").remove(), this.measuresContainer_.prepend(n), this.adjustEventsDisabled_(), n.find('[data-toggle="tooltip"]').tooltip(), d.length > 0) {
            var c = d.map(function (e) {
                return e.expression
            });
            this.toMeasureInputExp_(c, function (e) {
                for (var t = 0, s = e.length; s > t; t++) {
                    l[t].find("#measure-express").val(e[t].expression);
                    var a = l[t].find('a[data-value="' + e[t].format + '"]').text();
                    l[t].find("#custom-measure-format").text(a)
                }
            })
        }
    }, a.prototype.changedEvent_ = function () {
        var e = this, t = this.$firstEvent_.data("selected-event"), s = this.$secondEvent_.data("selected-event"),
            a = function () {
                var a = e.paramObj;
                if (t !== a.first_event.event_name) {
                    var n = {relation: "", conditions: []};
                    $.isEmptyObject(a.first_event.filter) || (n.relation = a.first_event.filter.relation, a.first_event.filter.conditions.map(function (s) {
                        var a = s.field.split(".")[2], i = sensorsdata.findProperty(s.field, e.firstPropObj_);
                        if (!$.isEmptyObject(i)) {
                            var r = $.extend(!0, {}, s);
                            r.field = "event." + t + "." + a, n.conditions.push(r)
                        }
                    })), e.initFirstFilter_(n)
                }
                if (s !== a.second_event.event_name) {
                    var i = {relation: "", conditions: []};
                    $.isEmptyObject(a.second_event.filter) || (i.relation = a.first_event.filter.relation, a.second_event.filter.conditions.map(function (t) {
                        var a = t.field.split(".")[2], n = sensorsdata.findProperty(t.field, e.secondPropObj_);
                        if (!$.isEmptyObject(n)) {
                            var r = $.extend(!0, {}, t);
                            r.field = "event." + s + "." + a, i.conditions.push(r)
                        }
                    })), e.initSecondFilter_(i)
                }
                if (a.by_field) {
                    var r = a.by_field.split(".");
                    if (3 === r.length) {
                        var o = r[1];
                        if (o !== t && o !== s) {
                            var d = sensorsdata.findProperty(a.by_field, e.firstPropObj_);
                            $.isEmptyObject(d) ? (d = sensorsdata.findProperty(a.by_field, e.secondPropObj_), $.isEmptyObject(d) ? a.by_field = "" : (a.by_field = "event." + s + "." + d.name, e.renderGroup_())) : (a.by_field = "event." + t + "." + d.name, e.renderGroup_())
                        }
                    }
                }
                e.prevQuery_()
            };
        this.prepareData_(t, s, a)
    }, a.prototype.initDate_ = function () {
        var e = this, t = sensorsdata.CONSTSET, s = this.paramObj, a = this.getDuration(s.duration, s.unit), n = {};
        n.startDate = moment(s.from_date, t.dateFormat), n.endDate = moment(s.to_date, t.dateFormat), n.rangeLimitUnit = a.unit, n.chosenLabel = s.rangeText, n.allowRelative = !0, n.timeExtend = {
            isLimit: !s.extend_over_end_date,
            text: sensorsdata.languages.get("限制后续事件在时间区间内<!--{en}Limit subsequent events in the time range-->")
        }, sensorsdata.initDateRangeInput(this.inputDate_, n), this.inputDate_.unbind("apply.daterangepicker").bind("apply.daterangepicker", function () {
            e.prevQuery_(), e.setDateTooltip_()
        }), this.setDateTooltip_()
    }, a.prototype.setDateTooltip_ = function () {
        var e = this.paramObj, t = sensorsdata.languages.get("初始行为发生的时间区间，<!--{en}Time ranges of initial event,-->");
        if (e.extend_over_end_date) {
            var s = sensorsdata.CONSTSET.dateFormat, a = moment(e.to_date, s).add(e.duration, e.unit);
            a.isAfter(moment()) && (a = moment()), t += sensorsdata.languages.get("后续行为发生时间被延展到<!--{en}The time of subsequent behavior is extended to-->") + a.format(s)
        } else t += sensorsdata.languages.get("后续行为发生时间被限制在此时间区间<!--{en}Limit subsequent events occurrence time  in the time range-->");
        this.inputDate_.is("[data-original-title]") ? this.inputDate_.attr("data-original-title", t) : this.inputDate_.tooltip({title: t})
    }, a.prototype.prepareData_ = function (e, t, s) {
        var a = (this.paramObj.measures || []).map(function (e) {
            return e.event_name
        });
        a.push(e), a.push(t);
        var n = {};
        a = a.filter(function (e) {
            var t = e && !n[e];
            return n[e] = !0, t
        }), sensorsdata.ajax({
            useCache: !0,
            queueEnable: !0,
            url: "event/properties?events=" + a.join() + "&method=original",
            success: sensorsdata.bind(function (s) {
                this.userProperties_ = s[e].user, this.firstPropObj_ = {event: s[e].event}, this.secondPropObj_ = {event: s[t].event}
            }, this)
        }).done(s)
    }, a.prototype.handling = function (e) {
        var t = $.extend(!0, {}, e);
        return (t.is_wastage || t.by_field) && (t.measures = []), e.is_wastage || e.by_field ? $("#btn-add-measure").parents(".ops-item-single").hide() : $("#btn-add-measure").parents(".ops-item-single").show(), e.measures.length <= 0 ? $("#btn-add-measure").removeAttr("disabled") : $("#btn-add-measure").attr("disabled", "true"), t
    }, a.prototype.getRetentions_ = function (e, t) {
        var s = (new Date).valueOf();
        this.$btnQuery_.addClass("disabled").text(sensorsdata.languages.get("查询中…<!--{en}Querying-->")), $.isEmptyObject(e) && (e = this.buildParamObj_()), this.paramObj = e;
        var a = "#" + $.param(e);
        window.location.hash !== a && window.history.pushState(window.location.pathname + a, "", a), this.handleLoading(e, t);
        var n = {success: !0, use_cache: !!e.use_cache},
            i = "retentions/report/?bookmarkId=" + (e[sensorsdata.CONSTSET.bookmarkId] || "");
        this.jqXhr_ = sensorsdata.reportAjax({
            isAsync: !0,
            queueEnable: !0,
            url: i,
            method: "POST",
            data: this.handling(e),
            error: function (e) {
                this.reportLoading.closeLoading(), n.success = !1, n.fail_reason = e.status, n.time_consuming = "", sensorsdata.track("retention_analytics", n)
            }.bind(this),
            complete: sensorsdata.bind(function () {
                this.$btnQuery_.removeClass("disabled").text(sensorsdata.languages.get("查询<!--{en}Query-->")), this.options.closeLoading(), $.isFunction(t) && t()
            }, this),
            success: sensorsdata.bind(function (t) {
                this.reportLoading.closeLoading("success"), s = 100 * Math.ceil(((new Date).valueOf() - s) / 100), n.time_consuming = s, sensorsdata.track("retention_analytics", n), this.bookmarkToolbar.setRefresh(t), this.rawRetentions_ = $.extend(!0, {}, t);
                var a = $.isArray(t.rows) && t.rows.length > 0;
                if (this.tableContainer_.parent().toggle(a), this.setHolderPlace_(!0, !a), a) {
                    !0 === t.truncated && sensorsdata.info.show(sensorsdata.languages.get("分组值过多，仅显示部分分组，完整数据请通过 API 获取<!--{en}There are to many group clustering value, and only display part of the group,please get the full data through API.-->"));
                    var i = sensorsdata.findProperty(e.by_field, [this.firstPropObj_, this.secondPropObj_, this.userProperties_]);
                    t = this.padRetentions(t, this.paramObj, i), t.rows.forEach(function (t) {
                        t.cells.forEach(function (t) {
                            var s = t.values || [];
                            t.values = s.map(function (t, s) {
                                if (void 0 === t || null === t) return "未知";
                                if (e.measures[s]) {
                                    var a = sensorsdata.CONSTSET.measureFunctions[e.measures[s].aggregator];
                                    if (a && a.unit) return t + " " + a.unit
                                }
                                return t
                            })
                        })
                    }), this.retentions_ = t, this.renderGroup_(), this.renderTable_(t), this.chartsContainer_.is(":visible") && this.renderCharts_(this.retentions_, this.paramObj.chartsType)
                } else this.retentions_ = {}, this.chartsContainer_.parent().hide(), this.tableContainer_.find('[data-toggle="tooltip"]').tooltip("destroy"), this.tableContainer_.html("");
                this.updateReportName_(e, this.bookmarkToolbar.bookmark)
            }, this)
        })
    }, a.prototype.tableContainerClick_ = function (e) {
        var t = $(e.target || e.srcElement);
        t.attr("data-method") || (t = t.parents("[data-method]:first"));
        var s = t.attr("data-method");
        switch (s) {
            case"user-list":
                var a = parseInt(t.parents("tr:first").attr("data-index"), 10),
                    n = this.rawRetentions_.rows[a].by_value, i = t.parents("td:first").prevAll().size(),
                    r = $.extend(!0, {}, this.paramObj);
                switch (n) {
                    case null:
                        r.slice_by_value = sensorsdata.CONSTSET.unknownByValueText;
                        break;
                    case"":
                        r.slice_by_value = sensorsdata.CONSTSET.emptyStringByValueText;
                        break;
                    default:
                        r.slice_by_value = n
                }
                r.slice_interval = i - 2 === -1 ? null : r.is_wastage ? i - 1 : i - 2, r.detail = !0;
                var o = "";
                if (r.by_field) {
                    var d = sensorsdata.findProperty(this.paramObj.by_field, [this.firstPropObj_, this.secondPropObj_, this.userProperties_]);
                    o = sensorsdata.formatByValue(n, d.data_type, "", r.bucket_param)
                } else {
                    var l = sensorsdata.CONSTSET;
                    o = moment(n, l.timeFormat).format(l.shortDateFormat)
                }
                $(t).createUserListPanel({queryData: r})
        }
    }, a.prototype.updateReportName_ = function (e, t) {
        var s = sensorsdata.findEventCname(e.first_event.event_name),
            a = sensorsdata.findEventCname(e.second_event.event_name),
            n = sensorsdata.util.format(sensorsdata.languages.get("用户先进行 #{firstEventName}，后进行 #{secondEventName} 的 #{action} 分析<!--{en}Analysis of users first did #{firstEventName}, and then did #{secondEventName}-->"), {
                firstEventName: s,
                secondEventName: a,
                action: $.trim(this.durationContainer_.find("button span:first").text())
            });
        t && t.id && t.name && (n = t.name), this.options.container.find(".report-name").text(n), this.bookmarkToolbar.setDialogName(n)
    }, a.prototype.prevQuery_ = function () {
        var e = this.buildParamObj_();
        if (sensorsdata.cache.config.auto_refresh) {
            var t = JSON.stringify(this.paramObj) !== JSON.stringify(e);
            t && this.getRetentions_(e)
        } else this.paramObj = this.buildParamObj_();
        this.bookmarkToolbar.setParams({data: e})
    }, a.prototype.buildParamObj_ = function () {
        var e = sensorsdata.CONSTSET, t = this.durationContainer_.find("li.active a").attr("data-name"),
            s = this.getDurationByName_(t), a = {
                measures: [],
                rangeText: this.inputDate_.data("daterangepicker") && this.inputDate_.data("daterangepicker").chosenLabel,
                from_date: this.inputDate_.data("startDate").format(e.dateFormat),
                to_date: this.inputDate_.data("endDate").format(e.dateFormat),
                extend_over_end_date: !this.inputDate_.data("isLimit"),
                duration: s.value,
                unit: s.unit,
                chartsType: this.btnChartsType_.filter(".btn-primary").attr("data-charts"),
                sampling_factor: this.bookmarkToolbar.getSamplingValue(),
                first_event: {event_name: this.$firstEvent_.data("selected-event"), filter: this.firstFilter_.val()},
                second_event: {event_name: this.$secondEvent_.data("selected-event"), filter: this.secondFilter_.val()},
                user_filter: this.userFilter_.val(),
                is_wastage: 1 === this.durationContainer_.find('div.selected[data-type="wastage"]').size()
            };
        $("#btn-add-measure").parents(".ops-item-single").show(), this.measuresContainer_.find("div#measure-line").each(sensorsdata.bind(function (e, t) {
            var s = $(t).find("#normal-measure-line");
            if (s.is(":visible")) a.measures = a.measures.concat(this.buildMeasuresParam_(s)); else {
                var n = this.buildCustomMeasure_($(t).find("#custom-measure-line"));
                $.isEmptyObject(n) || a.measures.push(n)
            }
        }, this));
        var n = this.groupControl_.val(), i = n.byFields || [], r = n.bucket || {};
        if (i.length > 0) {
            var o = i[0].split(".");
            4 === o.length && (a.by_event = o.shift()), a.by_field = o.join("."), a.bucket_param = r[i[0]]
        }
        var d = this.paramObj[sensorsdata.CONSTSET.bookmarkId];
        return d && (a[sensorsdata.CONSTSET.bookmarkId] = d), a
    }, a.prototype.renderCharts_ = function (e, t) {
        if (!$.isEmptyObject(e) && $.isArray(e.rows) && 0 !== e.rows.length) {
            var s = this, a = this.paramObj, n = a.is_wastage ? 1 : 0;
            this.btnChartsType_.eq(0).text(sensorsdata.languages.get(a.is_wastage ? "流失人数<!--{en}The number of people lost-->" : "留存人数<!--{en}Retained number of users-->")), this.btnChartsType_.eq(1).text(sensorsdata.languages.get(a.is_wastage ? "流失百分比<!--{en}Percentage of loss-->" : "留存百分比<!--{en}Percentage of retention-->")), s.chartsContainer_.parent().show(), e = $.extend(!0, {}, e), this.chart_ && $.isFunction(this.chart_.dispose) && (this.chart_.dispose(), this.chart_ = null), this.chart_ = echarts.init(this.chartsContainer_[0]), a.by_field || e.rows.reverse();
            for (var i = [], r = [], o = this.getDuration(a.duration, a.unit), d = "", l = n, u = e.rows[0].cells.length; u > l; l++) {
                d = 0 === l ? sensorsdata.languages.get("第<!--{en}No.-->") + l + o.unitCname : sensorsdata.languages.get("第<!--{en}No.-->") + l + o.unitCname, r.push(d);
                for (var p = [], h = e.rows.length - 1; h >= 0; h--) {
                    var m = e.rows[h];
                    l < m.cells.length && p.push("percent" === t ? m.cells[l].percent : m.cells[l].people)
                }
                i.push({name: d, type: "line", symbol: "circle", symbolSize: 8, data: p})
            }
            for (var c = [], f = e.rows.length - 1; f >= 0; f--) c.push(a.by_field ? sensorsdata.trimConstHtml(e.rows[f].by_value) : sensorsdata.formatTime(e.rows[f].by_value, a.unit));
            var g = "percent" === t ? "%" : sensorsdata.languages.get("人<!--{en}People-->"), _ = function (e) {
                return e.seriesName + "</br>" + Mustache.escape(e.name) + "：" + e.data + g
            }, v = {
                dataZoom: {show: c.length > sensorsdata.echarts.sets.dataZoomNum, start: 0, end: 100},
                tooltip: {
                    show: !0, trigger: "axis", axisPointer: {lineStyle: {width: 0}}, formatter: function (e) {
                        return $.isArray(e) && (e = e[0]), sensorsdata.echarts.wrapTriangleTooltip(_(e))
                    }, position: function (e, t, a) {
                        return sensorsdata.echarts.lineTooltipPosition(s.chart_, e, t, a, _)
                    }
                },
                legend: {selectedMode: !0, data: r},
                xAxis: {data: c},
                yAxis: {
                    axisLabel: {
                        formatter: function (e) {
                            return sensorsdata.formatNumber(e, !0) + g
                        }
                    }
                },
                series: i
            };
            this.chart_.on("mouseover", function (e) {
                s.chart_.dispatchAction({type: "highlight", seriesIndex: e.seriesIndex})
            }), s.chart_.on("mouseout", function (e) {
                s.chart_.dispatchAction({type: "downplay", seriesIndex: e.seriesIndex})
            }), s.chart_.setOption($.extend(!0, {}, sensorsdata.echarts.option, v))
        }
    }, a.prototype.buildChartsOption_ = function (e, t) {
        for (var s = {type: t}, a = this.getDuration(this.paramObj.duration, this.paramObj.unit), n = e[0].cells.length, i = 0; n > i; i++) s.push(i + a.unitCname);
        for (var r = [], o = function (e) {
            return "percent" === t ? e.percent : e.people
        }, d = this.paramObj.unit, l = 0, u = e.length; u > l; l++) {
            var p = e[l];
            this.paramObj.by_field || (p.by_value = sensorsdata.formatTime(p.by_value, d)), r.push({
                type: "line",
                name: p.by_value,
                data: p.cells.map(o)
            })
        }
        var h = {categories: s}, m = {title: {text: ""}};
        "percent" === t && (m.labels = {
            formatter: function () {
                return this.value + "%"
            }
        });
        var c = function () {
            return '<span class="data-label">' + this.x + "<br><span>" + this.series.name + "</span>: <b>" + this.y + ("percent" === t ? "%" : "") + "</b></span>"
        };
        return {xAxis: h, yAxis: m, tooltip: {useHTML: !0, formatter: c}, series: r}
    }, a.prototype.renderTable_ = function (e) {
        e = $.extend(!0, {}, e);
        for (var t = e.rows, s = this.paramObj, a = !!s.is_wastage, n = this.getDuration(s.duration, s.unit), i = [], r = {}, o = 0, d = t[0].cells.length; d > o; o++) r = {
            name: sensorsdata.util.format(sensorsdata.languages.get("第 #{x} #{unitCname}<!--{en}No.#{x} #{unitCname}-->"), {
                x: o,
                unitCname: n.unitCname
            })
        }, 0 === o && (r.tip = sensorsdata.util.format(sensorsdata.languages.get("初始事件触发的当#{unitCname}即为第 0 #{unitCname}，第 0 #{unitCname}留存用户数表示当#{unitCname}既进行了#{firstEventName}也进行了#{secondEventName}的用户。（不分前后顺序）"), {
            x: o,
            unitCname: n.unitCname,
            firstEventName: sensorsdata.findEventCname(s.first_event.event_name),
            secondEventName: sensorsdata.findEventCname(s.second_event.event_name)
        })), i.push(r);
        for (var l = t[0].cells.length, u = 0, p = t.length; p > u; u++) {
            var h = t[u];
            h.rowIndex = u, h.total_people = sensorsdata.formatNumber(h.total_people);
            for (var m = 0, c = h.cells.length; c > m; m++) {
                var f = h.cells[m];
                if ($.isNumeric(f.people) && $.isNumeric(f.percent)) {
                    var g = Math.floor((100 - Math.ceil(f.percent)) / 10) + 1;
                    f.className = "hm-" + g, f.people = sensorsdata.formatNumber(f.people), f.tip = this.buildCellTip_(h, m, n.unitCname)
                }
            }
            s.by_field || (h.tooltip = "week" === s.unit ? sensorsdata.buildWeekRangeTip(h.by_value) : "", h.by_value = sensorsdata.formatTime(h.by_value, s.unit));
            for (var _ = l - h.cells.length, v = 0; _ > v; v++) h.cells.push({});
            a && h.cells.shift()
        }
        a && i.shift();
        var b = {heads: i, tip: ""}, y = sensorsdata.bind(function (e, s) {
            e -= 1, this.tableContainer_.find('[data-toggle="tooltip"]').tooltip("destroy"), b.rows = t.slice(e, s), this.tableContainer_.html(Mustache.render(this.tplTable_, b)), this.tableContainer_.find('[data-toggle="tooltip"]').tooltip({
                container: "body",
                html: !0
            }), this.tableContainer_.find("table").fixedColumn()
        }, this);
        t.length <= sensorsdata.CONSTSET.paginationSize ? (this.options.container.find("#table-pagination").html(""), y(1, t.length)) : sensorsdata.pagination({
            tableElement: this.options.container.find("#table-pagination"),
            totalItems: t.length,
            clickHandle: sensorsdata.bind(function (e) {
                y(e.range[0], e.range[1])
            }, this)
        })
    }, a.prototype.buildCellTip_ = function (e, t, s) {
        var a = this.paramObj, n = 0 === t, i = sensorsdata.languages.get("第<!--{en}No.-->") + t + s,
            r = sensorsdata.findEventCname(a.first_event.event_name),
            o = sensorsdata.findEventCname(a.second_event.event_name),
            d = sensorsdata.findProperty(a.by_field, [this.firstPropObj_, this.secondPropObj_, this.userProperties_]),
            l = $.isEmptyObject(d) ? "" : d.cname, u = this, p = "", h = "";
        if (l) return a.is_wastage ? sensorsdata.util.format(sensorsdata.languages.get("在选定时间段内有 #{total_people} 位 #{byName} 是 #{by_value} 的人进行了 #{firstEventName}。其中，有 #{people} 人随后最长持续 #{cellIndex} #{unit} 没有进行过 #{secondEventName}"), {
            total_people: sensorsdata.formatNumber(e.total_people),
            byName: l,
            by_value: sensorsdata.trimConstHtml(e.by_value),
            firstEventName: r,
            people: e.cells[t].people,
            cellIndex: t,
            unit: s,
            secondEventName: o
        }) : sensorsdata.languages.get("在选定时间段内有<!--{en}In the selected period of time, there is-->") + sensorsdata.formatNumber(e.total_people) + sensorsdata.languages.get("位<!--{en}people-->") + l + sensorsdata.languages.get("是<!--{en}Yes-->") + sensorsdata.trimConstHtml(e.by_value) + sensorsdata.languages.get("的人进行了<!--{en}people did-->") + r + sensorsdata.languages.get("。其中，有<!--{en}.In which there are-->") + e.cells[t].people + sensorsdata.languages.get("人在进行<!--{en}people did-->") + r + sensorsdata.languages.get("后的<!--{en}after-->") + i + sensorsdata.languages.get("进行<!--{en}did-->") + o;
        var m = sensorsdata.formatTime(sensorsdata.trimConstHtml(e.by_value), a.unit),
            c = moment(sensorsdata.trimConstHtml(e.by_value), sensorsdata.CONSTSET.dateFormat).add(t, a.unit),
            f = sensorsdata.formatTime(c, a.unit);
        if (a.is_wastage) return p = sensorsdata.languages.get("在<!--{en}During-->") + m + sensorsdata.languages.get("进行<!--{en}did-->") + r + sensorsdata.languages.get("的<!--{en}of-->") + e.total_people + sensorsdata.languages.get("人中，<!--{en}among people,-->") + sensorsdata.languages.get("有<!--{en}has-->") + e.cells[t].people + sensorsdata.languages.get("人截至到<!--{en}people by-->") + i + "(" + f + ")" + sensorsdata.languages.get("都没有进行过<!--{en}did nothing-->") + o;
        var g = "";
        return a.measures.map(function (s, a) {
            var n = sensorsdata.findEventCname(s.event_name, u.events_), i = [n],
                r = sensorsdata.findProperty(s.field, u.propObj.original[s.event_name]);
            r.cname && i.push(r.cname);
            var o = sensorsdata.CONSTSET.measureFunctions[s.aggregator].cname;
            o && i.push(o);
            var d = e.cells[t].values[a];
            "number" == typeof d && r.unit && (d = d + " " + r.unit), d && (g += "其中进行了" + i.join("的") + "为" + d + "。")
        }), p = sensorsdata.languages.get("在<!--{en}During -->") + m + sensorsdata.languages.get("进行<!--{en} did -->") + r + sensorsdata.languages.get("的<!--{en} of -->") + e.total_people + sensorsdata.languages.get("人中，有<!--{en} people, in which there are -->") + e.cells[t].people + sensorsdata.languages.get("人<!--{en} people -->"), h = sensorsdata.languages.get("在<!--{en} at -->") + i + "(" + f + ")" + sensorsdata.languages.get("进行了<!--{en} did -->") + o, n ? (h = sensorsdata.languages.get("在当<!--{en}During -->") + s + sensorsdata.languages.get("既进行了<!--{en} did -->") + r + sensorsdata.languages.get("也进行了<!--{en} and also did -->") + o, p = p + h + "。" + g + sensorsdata.languages.get("（初始和后续行为不分先后顺序）<!--{todo}-->")) : p = p + h + "。" + g, p
    }, a.prototype.renderGroup_ = function () {
        var e = [];
        e.push({
            label: sensorsdata.languages.get("初始行为事件属性<!--{en}Initial event properties-->"),
            icon: "icon-event-property",
            items: $.extend(!0, [], this.firstPropObj_.event).map(function (e) {
                return e.fullName = "first.event." + e.event_name + "." + e.name, e
            })
        }), e.push({
            label: sensorsdata.languages.get("后续行为事件属性<!--{en}Properties of subsequent events-->"),
            icon: "icon-event-property",
            items: $.extend(!0, [], this.secondPropObj_.event).map(function (e) {
                return e.fullName = "second.event." + e.event_name + "." + e.name, e
            })
        }), e = e.concat(sensorsdata.convertProperty({user: this.userProperties_})), this.groupContainer_.html(""), this.groupControl_.init({
            container: this.groupContainer_,
            label: {
                begin: "",
                end: "",
                overAllText: sensorsdata.languages.get("初始行为日期<!--{en}Date of initial event-->")
            },
            data: e,
            showPropertyHelp: !0,
            disabled: sensorsdata.authority.isNormal,
            buildPropertyHelp: function (e) {
                return !$.isEmptyObject(e) && e.fullName ? sensorsdata.languages.get("first" === e.fullName.split(".")[0] ? "按照用户在所选时段内的首次初始行为的有效属性值分组，一个用户只会出现在一个分组中<!--{en}Cluster by the valid properties of the user's first subsequent actions in the selected period of time. One user can only be clustered to one group.-->" : "按照用户在所选时段内的首次后续行为的有效属性值分组，如果没有任何后续行为则会被分到未知，一个用户只会出现在一个分组中<!--{en}Cluster by the valid properties of the user's first subsequent actions in the selected period of time.If there is no subsequent action, the user will be assigned to the unknown. One user can only be clustered to one group.-->") : ""
            }
        });
        var t = this.paramObj;
        if (t.by_field) {
            var s = (t.by_event ? t.by_event + "." : "") + t.by_field, a = {};
            a[s] = t.bucket_param, this.groupControl_.val({byFields: [s], bucket: a})
        }
        this.groupControl_.bindEvent("valueChangedEvent", sensorsdata.bind(this.prevQuery_, this))
    }, a.prototype.getDurationByName_ = function (e) {
        if (!e) return this.durations_[0];
        var t = this.durations_.filter(function (t) {
            return t.name === e.toString()
        });
        return 1 === t.length ? t[0] : null
    }, a.prototype.filterProperties_ = function (e, t) {
        return this.firstPropObj_.event.filter(function (e) {
            var s = "number" === e.data_type && e.is_measure === !0;
            return t ? s : !s
        })
    }, a.prototype.buildMeasureName = function (e) {
        if ("period" === e.measure_type) {
            var t = this.getDuration(e.unit);
            return t.unitCname + sensorsdata.languages.get("数<!--{en}Number-->")
        }
        if ("times" === e.measure_type && $.isEmptyObject(e.measure)) return sensorsdata.languages.get("次数<!--{en}Times-->");
        if (!$.isEmptyObject(e.measure)) {
            var s = sensorsdata.findProperty(e.measure.field, this.propObj).cname;
            return s + sensorsdata.languages.get("的<!--{en} . -->") + sensorsdata.CONSTSET.measureFunctions[e.measure.aggregator].cname
        }
        return ""
    }, a.prototype.adjustEventsDisabled_ = function () {
        var e = this.getEventNames_(!1);
        this.measuresContainer_.find("div.measure-line:visible div.select-event").each(function () {
            $(this).coolEventDropdown("setDisabled", e, !0)
        }), this.measuresContainer_.find('button[data-method="event-add"]').prop("disabled", e.length === this.events_.length);
        var t = this.measuresContainer_.find(".select-session");
        t.eq(0).find(">div").is(":visible") || t.eq(0).find(">div").show();
        var s = t.filter(".select-session:visible").width();
        t.not(":first").width(s).find(">div").hide()
    }, a.prototype.initCustomMeasure_ = function (e, t) {
        t = t || {};
        var s = e.find("#custom-measure-name"), a = e.find("#measure-express");
        a.data("measure-express", t.expression).data("measure-events", t.events), a.measureExpression().unbind("focusout.segmentation-index-page").bind("focusout.segmentation-index-page", function () {
            $(this).hasClass("error") || $.trim(s.val()) || s.val($(this).val())
        }), e.find("#custom-measure-format").saDropdown(), s.unbind("focusout").bind("focusout", function () {
            sensorsdata.form.check($(this))
        }), e.find("span.icon-help").tooltip(), this.changeCustomMeasureModel_(e, !1)
    }, a.prototype.changeCustomMeasureModel_ = function (e, t) {
        e.find('button[data-method="measure-save"]').toggle(t), e.find('button[data-method="measure-edit"]').toggle(!t), e.find("#measure-express").prop("readonly", !t), e.find("#custom-measure-name").prop("readonly", !t), e.find("#custom-measure-format").toggleClass("disabled", !t)
    }, a.prototype.renderEventLine_ = function (e, t) {
        var s = $.extend(!0, [], this.events_);
        this.paramObj.session_name && (s[0].cname = sensorsdata.languages.get("Session 总体<!--{en}Session overall-->"));
        var a = this;
        e.find("#select-event").coolEventDropdown("destroy").coolEventDropdown({
            events: s,
            eventName: t,
            onChange: function (t) {
                var s = a.getEventNames_();
                a.getProperties(s, function () {
                    var s = sensorsdata.CONSTSET.sessionGeneral.name,
                        n = a.buildMeasuresParam_(e.find("#normal-measure-line")), i = [];
                    n.map(function (e) {
                        if (!(e.by_session && t !== s && "bounce_rate" === e.aggregator || "exit_rate" === e.aggregator && t === s)) if (e.field) {
                            var n = e.field.split(".")[2], r = a.propObj.original[t].event.filter(function (e) {
                                return e.name === n
                            })[0];
                            $.isEmptyObject(r) || (e.event_name = t, "$session_event_duration" !== n && (e.field = "event." + t + "." + r.name), i.push(e))
                        } else e.event_name = t, i.push(e)
                    }), a.renderAggregator_(e.find("#select-measures").html(""), t, i), a.adjustEventsDisabled_(), a.prevQuery_()
                })
            }
        })
    }, a.prototype.getProperties = function (e, t) {
        e = e.filter(function (e, t, s) {
            return s.indexOf(e) === t
        });
        var s = this, a = e.filter(function (e) {
            return e !== sensorsdata.CONSTSET.sessionGeneral.name
        }), n = a.length === e.length, i = 0 === a.length;
        0 === a.length && a.push(sensorsdata.CONSTSET.eventEmptyValue), sensorsdata.ajax({
            useCache: !0,
            url: "event/properties?events=" + a.join(",") + "&method=mixed",
            success: sensorsdata.bind(function (e) {
                if ($.isEmptyObject(e)) return void sensorsdata.error.show(sensorsdata.languages.get("数据格式错误，请联系技术人员<!--{en}Data in wrong format, please contact with technicians-->"));
                if (s.propObj = $.extend(!0, {}, e), s.paramObj.session_name) {
                    for (var a in s.propObj.original) s.propObj.original.hasOwnProperty(a) && (s.propObj.original[a].event = s.propObj.intersection.session.concat(s.propObj.original[a].event));
                    var r = s.sessions.filter(function (e) {
                        return e.name === s.paramObj.session_name
                    })[0].properties.session.filter(function (e) {
                        return e.session_name = s.paramObj.session_name, "$session_id" !== e.name && "$session_position" !== e.name
                    });
                    i ? (s.propObj.intersection.session = r, s.propObj.intersection.event = []) : n ? s.propObj.intersection.session = r : (s.propObj.intersection.session = r, s.propObj.intersection.event = []), s.propObj.original[sensorsdata.CONSTSET.sessionGeneral.name] = {
                        event: r,
                        user: []
                    }
                } else delete s.propObj.intersection.session;
                t()
            }, this)
        })
    }, a.prototype.renderAggregator_ = function (e, t, s) {
        var a = e.parents("div#measure-line"), n = this.events_.filter(function (e) {
            return e.name === t
        })[0];
        if (!$.isArray(s) || 0 === s.length) {
            var i = this.getNextMeasure_(a);
            s = [i]
        }
        for (var r = $(""), o = 0, d = s.length; d > o; o++) {
            var l = [], u = $(Mustache.render(this.tplMeasureItem_, {
                suffix: sensorsdata.languages.get("和<!--{en}and-->"),
                measureName: this.buildAggregatorName_(t, s[o]),
                measure: s[o],
                eventName: n.name,
                eventCname: n.cname,
                measureProperties: this.filterMeasureProperties_(t, !0),
                notMeasureProperties: l,
                isSession: !!this.paramObj.session_name,
                isSessionGeneral: n.name === sensorsdata.CONSTSET.sessionGeneral.name,
                moreMeasureDisplay: l.length > 3
            }));
            u.find('a[data-aggregator="' + s[o].aggregator + '"][data-field="' + (s[o].field || "") + '"]').parents("li").addClass("active"), r = r.add(u)
        }
        e.append(r), e.find("a").bind("click", sensorsdata.bind(function (e) {
            var t = $(e.target || e.srcElement);
            if (t.is("a") || (t = t.parent("a:first")), !t.attr("data-aggregator") && "more" === t.attr("data-method")) return t.parent().hide().nextAll().slideDown(), !1;
            if (!t.attr("data-aggregator")) return !1;
            var s = t.parents("li:first");
            if (!s.hasClass("disabled") && !s.hasClass("active")) {
                var a = t.parents("div:first").find(".selected");
                a.attr("data-aggregator", t.attr("data-aggregator")), a.attr("data-field", t.attr("data-field")), a.text(t.attr("data-cname") ? t.attr("data-cname") + sensorsdata.languages.get("的<!--{en} . -->") + t.text() : t.text()), t.parents('div[data-method="aggregator-select"]').find("li.active").removeClass("active"), t.parents("li").addClass("active"), this.adjustAggregatorDisabled_(t.parents("div#measure-line")), this.prevQuery_()
            }
        }, this)), this.adjustAggregatorDisabled_(a)
    }, a.prototype.getNextMeasure_ = function (e) {
        var t = !!this.paramObj.session_name, s = e.find("#select-event").data("selected-event"),
            a = this.filterMeasureProperties_(s, !0), n = {event_name: s, aggregator: "general", field: ""},
            i = this.buildMeasuresParam_(e.find("div#select-measures"));
        if (0 === i.length) return n;
        var r = "", o = "";
        for (var d in this.measureFunctions_) if (this.measureFunctions_.hasOwnProperty(d)) {
            var l = this.measureFunctions_[d];
            if (t || "session" !== l.type && "exit_rate" !== d) {
                var u = i.filter(function (e) {
                    return e.aggregator === d
                });
                if (0 === u.length) {
                    if (l.field === !0) {
                        if (0 === a.length) break;
                        o = "event." + s + "." + a[0].name
                    }
                    r = d;
                    break
                }
                if (l.field === !0) {
                    for (var p = 0, h = a.length; h > p; p++) {
                        var m = "event." + s + "." + a[p].name, c = u.filter(function (e) {
                            return e.aggregator === d && e.field === m
                        })[0];
                        if ($.isEmptyObject(c)) {
                            r = d, o = m;
                            break
                        }
                    }
                    if (o) break
                }
            }
        }
        return r ? (n.aggregator = r, n.field = o, n) : {}
    }, a.prototype.filterMeasureProperties_ = function (e, t) {
        if (!e || $.isEmptyObject(this.propObj) || $.isEmptyObject(this.propObj.original[e])) return [];
        var s = this.paramObj.session_name, a = e === sensorsdata.CONSTSET.sessionGeneral.name;
        return this.propObj.original[e].event.filter(function (n) {
            if ("$user_id" === n.name) return !1;
            n.measureField = a || "$session_event_duration" === n.name ? "session." + s + "." + n.name : "event." + e + "." + n.name;
            var i = "number" === n.data_type && n.is_measure === !0;
            return t ? i : !i
        })
    }, a.prototype.buildMeasuresParam_ = function (e) {
        var t = sensorsdata.CONSTSET.sessionGeneral.name, s = [], a = e.find("span.selected");
        return a.map(function (e, a) {
            var n = $(a), i = {event_name: n.attr("data-event-name"), aggregator: n.attr("data-aggregator")};
            n.attr("data-field") && (i.field = n.attr("data-field")), i.event_name !== t || i.field || (i.by_session = !0);
            var r = (i.field || "").split(".");
            i.field && "session" === r[0] && "$session_event_duration" !== r[2] && (i.by_session = !0), s.push(i)
        }), s
    }, a.prototype.buildAggregatorName_ = function (e, t) {
        var s = "";
        if (this.paramObj.session_name && (s = this.sessionFunction[t.aggregator]), s = s || sensorsdata.CONSTSET.measureFunctions[t.aggregator].cname, t.field && this.propObj) {
            var a = sensorsdata.findProperty(t.field, this.propObj.original[e]).cname;
            return a + sensorsdata.languages.get("的<!--{en} . -->") + s
        }
        return s
    }, a.prototype.adjustAggregatorDisabled_ = function (e) {
        var t = this.buildMeasuresParam_(e), s = e.find("div#select-measures");
        s.find("li.disabled").removeClass("disabled");
        for (var a = 0, n = t.length; n > a; a++) {
            var i = t[a], r = 'li a[data-aggregator="' + i.aggregator + '"][data-field="' + (i.field || "") + '"]';
            s.find(r).each(function (e, t) {
                var s = $(t).parent();
                s.hasClass("active") || s.addClass("disabled")
            })
        }
        s.find("ul ul").each(function (e, t) {
            t = $(t), t.find("li").size() === t.find("li.disabled").size() && t.parent().addClass("disabled").removeClass("active")
        });
        var o = this.getNextMeasure_(e);
        e.find('button[data-method="measure-add"]').prop("disabled", $.isEmptyObject(o)), e.find('span[data-method="suffix"]').toggle(t.length > 1).filter(":last").hide()
    }, a.prototype.saveCustomMeasure_ = function (e) {
        var t = e.find("#custom-measure-name");
        if (sensorsdata.form.check(t, sensorsdata.languages.get("必填<!--{en}Required-->"), !0)) {
            var s = e.find("#measure-express"), a = e.find("#custom-measure-format").attr("data-value"), n = this,
                i = {expression: s.val(), format: a};
            sensorsdata.ajax({
                url: "events/custom/indicator/transform",
                method: "POST",
                data: JSON.stringify([i]),
                showLoader: !1,
                customErrorStatusCode: 400,
                error: function (e) {
                    var t = parseInt(e.status, 10);
                    400 === t && sensorsdata.form.addError(s, sensorsdata.languages.get("表达式不完整或不合法<!--{en}The expression is incomplete or illegal-->"), !0)
                },
                success: function (t) {
                    sensorsdata.form.removeError(s), n.changeCustomMeasureModel_(e, !1), s.data("measure-express", t[0].expression).data("measure-events", t[0].events);
                    var a = n.getEventNames_();
                    n.getProperties(a, function () {
                        n.adjustEventsDisabled_(), n.prevQuery_()
                    })
                }
            })
        }
    }, a.prototype.buildCustomMeasure_ = function (e) {
        var t = e.find("#measure-express"), s = {
            expression: t.data("measure-express"),
            events: t.data("measure-events"),
            name: e.find("#custom-measure-name").val(),
            format: e.find("#custom-measure-format").attr("data-value")
        };
        return s.expression && $.isArray(s.events) && s.events.length > 0 && s.name && s.format ? s : {}
    }, a.prototype.toMeasureInputExp_ = function (e, t) {
        sensorsdata.ajax({
            url: "events/custom/indicator/reverse",
            method: "POST",
            data: JSON.stringify(e),
            success: sensorsdata.bind(function (e) {
                t(e)
            }, this)
        })
    }, a.prototype.getEventNamesFromParam = function (e) {
        var t = [];
        return e.map(function (e) {
            e.event_name ? -1 === t.indexOf(e.event_name) && t.push(e.event_name) : $.isArray(e.events) && e.events.map(function (e) {
                -1 === t.indexOf(e) && t.push(e)
            })
        }), t
    }, a.prototype.removeInvalidProperties = function (e, t, s) {
        if ($.isArray(e.by_fields) && e.by_fields.length > 0) {
            var a = [], n = [];
            e.by_fields.map(function (e) {
                var s = sensorsdata.findProperty(e, t.intersection);
                $.isEmptyObject(s) ? n.push(e.split(".").pop()) : a.push(e)
            }), n.length > 0 && (e.by_fields = a, s !== !1 && sensorsdata.info.show(sensorsdata.languages.get("属性<!--{en}Property-->") + n.join("、") + sensorsdata.languages.get("不存在或已被隐藏，已从查询中去掉<!--{en}Does not exist or has been hided.Has been removed from the query.-->")))
        }
        return e
    }, a.prototype.handleLoading = function (e, t) {
        var s = parseInt(e.sampling_factor, 10) || 64;
        this.reportLoading.options.sampling_factor = s, 64 === s ? (this.reportLoading.options.quickType = "sampling_factor", this.reportLoading.options.openQuickQuery = function () {
            this.reportLoading.options.sampling_factor = e.sampling_factor = 16, this.bookmarkToolbar.samplingSlider_ && this.bookmarkToolbar.samplingSlider_.setValue(4, !0, !0), this.getRetentions_(e, t)
        }.bind(this)) : this.reportLoading.options.quickType = "none", this.reportLoading.showLoading()
    }, s.exports = a
});
;
/*!pages/oldClustering/oldClustering.js*/
define("pages/oldClustering/oldClustering", function (e, t, s) {
    function n(e) {
        sensorsdata.BasePage.call(this), this.options = $.extend(!0, {}, e), this.options.container = e.container || $("body");
        var t = this.options.container;
        this.pageName = window.location.pathname, this.tplPage_ = $("#tpl-clustering-index").html(), t.html(this.tplPage_), this.tplTasks_ = $("#tpl-clustering-tasks").html(), this.tplPopover_ = $("#tpl-clustering-index-popover-delete").html(), this.tplPredict_ = $("#tpl-clustering-index-predict").html(), this.$btnAddClustering_ = t.find("#btn-add-clustering"), this.$tasksFilter_ = t.find("#tasks-filter"), this.$tasksContainer_ = t.find("#clustering-tasks"), this.$inputName_ = t.find("#input-name"), this.$inputCName_ = t.find("#input-cname"), this.$inputTypes_ = t.find('[name="input-type"]'), this.$inputTypes_ = t.find('[name="input-type"]'), this.$inputPushConfig_ = t.find("#push-config"), this.$clusteringResult_ = t.find(".clustering-result"), this.$btnSave_ = t.find('#clustering-toolbar button[data-method="save"]'), this.$btnExec_ = t.find('#clustering-toolbar button[data-method="execute"]'), this.$btnDelete_ = t.find('#clustering-toolbar button[data-method="delete"]'), this.$btnAddUserFilter_ = t.find("#add-user-filter"), this.$btnAddEventFilter_ = t.find("#add-event-filter"), this.$btnAddEventSeq_ = t.find("#add-event-seq"), this.$filterExpand_ = t.find('[data-method="filter-expand"]'), this.$predictContainer_ = t.find('[data-define-category="predict"]'), this.$btnRelation_ = t.find(".relation-container div.left button"), this.$eventFilterContainer_ = t.find("#container-condition-event"), this.$eventSeqContainer_ = t.find("#container-condition-event-seq"), this.$userFilterContainer_ = t.find("#container-condition-user"), this.tasks_ = [], this.userFilter_ = null, this.eventFilters_ = [], this.eventSeqs_ = [], this.activeTask_ = {}, this.isExecuting_ = !1, this.statusClass_ = {
            running: "iconc-running btn-icon",
            "new": "icon-new btn-icon",
            failed: "icon-failed btn-icon",
            finish: "icon-finish btn-icon"
        }
    }

    var i = e("components/model/simpleClustering");
    sensorsdata.inherits(n, sensorsdata.BasePage), n.prototype.init = function () {
        n.superClass_.init.call(this);
        var e = sensorsdata.unparam(window.location.hash), t = $.isNumeric(e.id) ? parseInt(e.id, 10) : -1;
        this.initEvents_();
        var s = this;
        sensorsdata.ajax({
            url: "app_push_config", showLoader: !1, success: function (e) {
                sensorsdata.cache.appPushConfigs = $.isArray(e) && e.length > 0 ? e : [], s.renderPushConfigs_($.extend(!0, [], sensorsdata.cache.appPushConfigs))
            }
        }), this.getClusteringTasks_(function (e) {
            if (0 === e.length) return s.filterTasks_("clustering"), void s.addClustering_();
            var n = s.buildEmptyTask_();
            -1 === t || 0 === e.length ? n.category = "clustering" : (n = e.filter(function (e) {
                return e.id === t
            })[0], n || (n = e[0], sensorsdata.info.show(sensorsdata.languages.get("用户分群不存在，已切换到第一个用户分群任务<!--{en}User clustering does not exist.Has been switched to the first user clustering task-->")))), s.$tasksContainer_.html(Mustache.render(s.tplTasks_, {tasks: e})), s.filterTasks_(n.category), s.renderTaskDetail_(n), s.refreshTasks_()
        }), sensorsdata.authority.isAdmin || sensorsdata.authority.isAnalyst && sensorsdata.cache.config.allow_analyst_higher_privilege || this.options.container.find("button,input").prop("disabled", !0)
    }, n.prototype.reload = function () {
        this.init()
    }, n.prototype.unload = function () {
        this.$btnDelete_.popover("destroy"), sensorsdata.form.removeChildrenError(this.options.container)
    }, n.prototype.renderPushConfigs_ = function (e) {
        var t = this.$inputPushConfig_.find("select"), s = "";
        e.map(function (e) {
            s += '<option value="' + e.id + '">' + e.cname + "</option>"
        });
        var n = this;
        if (t.html(s).multiselect("destroy").multiselect({
            nonSelectedText: sensorsdata.languages.get("选择推送配置<!--{en}Select the Push Configuration-->"),
            allSelectedText: sensorsdata.languages.get("全选<!--Select all-->"),
            numberDisplayed: 1,
            enableCaseInsensitiveFiltering: !1,
            onChange: function () {
                n.checkInputs_(), n.$btnSave_.prop("disabled", !1)
            },
            buttonText: function (e) {
                return 0 === e.length ? sensorsdata.languages.get("选择推送配置<!--{en}Select the Push Configuration-->") : sensorsdata.util.format(sensorsdata.languages.get("推送配置(#{length})<!--{en}Push Configuration(#{length})-->"), e)
            }
        }), !$.isEmptyObject(this.activeTask_)) {
            var i = this.activeTask_.app_push_config_id_list || [];
            4 !== this.activeTask_.type && i.length > 0 && this.$inputPushConfig_.find("select").multiselect("select", i)
        }
        this.$inputPushConfig_.find("button").off("mouseenter.clustering").on("mouseenter.clustering", function () {
            var t = sensorsdata.cache.appPushConfigs, s = t.length !== e.length;
            if (!s) for (var i = 0, a = e.length; a > i; i++) {
                var r = t.filter(function (t) {
                    return t.id === e[i].id
                })[0];
                if (!r || r.cname !== e[i].cname) {
                    s = !0;
                    break
                }
            }
            s && n.renderPushConfigs_(t);
            var o = sensorsdata.languages.get('请先在“推送管理”中添加推送配置<!--{en}Please add the push configuration in the "Push management"-->');
            if (e.length > 0) {
                var l = n.$inputName_.val();
                l = l ? "“" + l + "”" : "", o = sensorsdata.languages.get("执行成功后在推送平台使用标签<!--{en}After successful execution, use labels on the push platform-->") + l + sensorsdata.languages.get("进行推送<!--{en}Push-->")
            }
            $(this).tooltip({title: o, trigger: "manual", container: "body", placement: "left"}).tooltip("show")
        }), this.$inputPushConfig_.find("button").off("mouseleave.clustering").on("mouseleave.clustering", function () {
            $(this).tooltip("destroy")
        })
    }, n.prototype.renderResult_ = function (e) {
        if ("failed" !== e.status && "finish" !== e.status) return void this.$clusteringResult_.hide();
        var t = moment(e.success_time, sensorsdata.CONSTSET.timeFormat);
        if (!t.isValid()) return void this.$clusteringResult_.hide();
        if (this.$clusteringResult_.find("#success-time").text(t.format(sensorsdata.CONSTSET.timeFormat)), this.$clusteringResult_.find("#source").toggle(2 === e.type), 2 === e.type) {
            var s = /^(\/.+?\/)/, n = s.exec(e.content.queryUrl);
            if ($.isArray(n) && 0 !== n.length) {
                var i = sensorsdata.CONSTSET.urlMap[n[0]];
                this.$clusteringResult_.find("a").html(i)
            } else sensorsdata.error.show(sensorsdata.languages.get("分群来源链接有误，请联系值班同学<!--{en}The source links of the clustering are incorrect. Please contact the staff on duty.-->"))
        }
        this.$clusteringResult_.find("#category").html(this.$tasksFilter_.find("span.active").html());
        var a = this.$clusteringResult_.find("#success-people");
        a.text(sensorsdata.formatNumber(e.num_values)), this.$predictContainer_.filter(".predict-failed-info").toggle(4 === e.type && "failed" === e.status), a.attr("data-method", "user-list").prev().toggle(4 !== e.type), 4 === e.type && a.text(sensorsdata.languages.get("查看预测结果<!--{en}View the forecast results-->")).attr("data-method", "user-analytics"), this.$clusteringResult_.show()
    }, n.prototype.initEvents_ = function () {
        var e = this;
        this.$btnRelation_.unbind("click").bind("click", function () {
            var t = $(this);
            "and" === t.attr("data-relation") ? t.attr("data-relation", "or").text(sensorsdata.languages.get("或<!--{en}or-->")) : t.attr("data-relation", "and").text(sensorsdata.languages.get("且<!--{en}and-->")), e.checkInputs_()
        }), this.$btnAddUserFilter_.unbind("click").bind("click", function () {
            e.addUserFilter_()
        }), this.$btnAddEventFilter_.unbind("click").bind("click", function () {
            e.addEventFilter_(), e.checkInputs_()
        }), this.$btnAddEventSeq_.unbind("click").bind("click", function () {
            e.addEventSeq_()
        }), this.$filterExpand_.unbind("click").bind("click", function () {
            e.expandFilter_($(this))
        }), this.$btnAddClustering_.unbind("click").bind("click", sensorsdata.bind(this.addClustering_, this)), this.$tasksFilter_.unbind("click").bind("click", sensorsdata.bind(this.tasksFilterClick_, this)), this.$tasksContainer_.unbind("click").bind("click", sensorsdata.bind(this.tasksContainerClick_, this)), this.$btnSave_.unbind("click").bind("click", function () {
            e.saveTask_()
        }), this.$btnExec_.unbind("click").bind("click", function () {
            e.$btnSave_.prop("disabled") ? e.execTask_() : e.saveTask_(sensorsdata.bind(e.execTask_, e))
        }), this.$inputName_.unbind("focusout.clustering").bind("focusout.clustering", function () {
            var t = $.trim($(this).val());
            t && e.checkRepeatedName_() === !0 && (sensorsdata.form.check(e.$inputName_, !0), e.checkInputs_())
        }).unbind("keyup.clustering").bind("keyup.clustering", function () {
            var t = $(this), s = t.attr("data-error-reg-exp"), n = t.val().trim();
            !n || RegExp(s, "g").test(n) ? (sensorsdata.form.removeError(t), e.checkInputs_()) : sensorsdata.form.addError(t, t.attr("data-error-text"), !0)
        }), this.$inputCName_.unbind("focusout.clustering").bind("focusout.clustering", function () {
            var t = $.trim($(this).val());
            t && e.checkRepeatedCName_() === !0 && (sensorsdata.form.check(e.$inputCName_, !0), e.checkInputs_())
        }).unbind("keyup.clustering").bind("keyup.clustering", function () {
            if (e.checkInputs_(), !(e.activeTask_.id > 0)) {
                var t = e.$inputName_.val().trim(), s = e.$inputName_.attr("data-old-name");
                if (!t || !s || s === t) {
                    var n = {items: [e.$inputCName_.val().trim()]};
                    sensorsdata.ajax({
                        queueEnable: !0,
                        method: "POST",
                        url: "common/pinyin",
                        showLoader: !1,
                        data: JSON.stringify(n),
                        success: function (t) {
                            var s = t[0].replace(/^\d+/, "").replace(/\W/g, "_");
                            e.$inputName_.val(s), e.$inputName_.attr("data-old-name", s)
                        }
                    })
                }
            }
        }), this.$inputTypes_.unbind("change").bind("change", function () {
            e.inputTypeChange_()
        }), this.$clusteringResult_.unbind("click").bind("click", function (t) {
            var s = $(t.target || t.srcElement).attr("data-method"), n = {}, i = "user." + e.activeTask_.name;
            "analytic-result" === s ? e.options.initPage(e.activeTask_.content.queryUrl) : "user-analytics" === s ? (n = {
                measures: [{
                    aggregator: "count",
                    field: ""
                }], by_fields: [i], x_axis_field: i
            }, e.options.initPage("/user_analytics/#" + $.param(n))) : "user-list" === s && (n = {
                filter: {
                    conditions: [{
                        field: i,
                        "function": "isTrue"
                    }], relation: "and"
                }, type: e.activeTask_.type
            }, e.options.initPage("/clustering/users/#" + $.param(n)))
        }), this.$predictContainer_.filter(".predict-tips.predict-loss").find(".icon-remove").unbind("click").bind("click", function () {
            e.$predictContainer_.filter(".predict-tips.predict-loss").remove()
        })
    }, n.prototype.getClusteringTasks_ = function (e) {
        var t = this;
        sensorsdata.ajax({
            queueEnable: !0, url: "segmenter/rule/all", success: function (s) {
                $.isArray(s) ? (t.tasks_ = s.map(function (e) {
                    return e.category = 0 === e.type || 1 === e.type ? "clustering" : 2 === e.type ? "result" : "predict", e = t.mergeStatus_(e), e.statusClass = t.statusClass_[e.status], e
                }), e(t.tasks_)) : sensorsdata.error.show(sensorsdata.languages.get("数据格式错误，请联系技术人员<!--{en}Data in wrong format, please contact with technicians-->")), t.options.closeLoading()
            }
        })
    }, n.prototype.mergeStatus_ = function (e) {
        return e.status ? (e.status = "preparing" === e.status || "computing" === e.status ? "running" : e.status, e) : e
    }, n.prototype.convertType_ = function (e) {
        return 1 === e ? 1 : 0
    }, n.prototype.renderTaskDetail_ = function (e) {
        if (this.$tasksContainer_.find("li.active").removeClass("active"), this.$tasksContainer_.find('li[data-id="' + e.id + '"]').addClass("active"), "result" !== e.category && (e = this.checkEventPermission_(e)), sensorsdata.form.removeChildrenError(this.options.container), e.id < 0) {
            var t = this.$tasksFilter_.find("span.active");
            e.category = t.attr("data-category"), e.type = parseInt(t.attr("data-type"), 10), this.$inputName_.attr("data-old-name", e.name)
        }
        this.activeTask_ = e, this.$inputName_.val(e.name), this.$inputCName_.val(e.cname);
        var s = this.options.container.find("span.icon-card");
        e.update_time ? s.data("bs.popover") ? s.attr("data-content", Mustache.render($("#tpl-creator-info-content").html(), e)) : sensorsdata.popover({
            ele: s.toggle(!0),
            template: $("#tpl-creator-info-tip").html(),
            html: !0,
            content: Mustache.render($("#tpl-creator-info-content").html(), e),
            placement: "right",
            container: s.parent(),
            trigger: "hover"
        }) : s.hide().popover("destroy"), this.$inputTypes_.prop("disabled", e.id > 0 || 0 !== e.type && 1 !== e.type).filter('[value="' + this.convertType_(e.type) + '"]').prop("checked", !0);
        var n = e.app_push_config_id_list || [];
        if (this.$inputPushConfig_.find("button").prop("disabled", 4 === e.type), 4 !== e.type && n.length > 0 ? this.$inputPushConfig_.find("select").multiselect("select", n) : this.$inputPushConfig_.find("select").multiselect("deselectAll", !1).multiselect("updateButtonText"), this.$inputName_.prop("readonly", e.id > 0 && "new" !== e.status), this.$btnSave_.prop("disabled", e.id > 0), this.$btnExec_.prop("disabled", "running" === e.status).find("span:last").text(sensorsdata.languages.get("running" === e.status ? "执行中…<!--{en}Running...-->" : e.id > 0 ? "执行<!--{en}Run-->" : "保存并执行<!--{en}Save & Run-->")), this.$btnDelete_.prop("disabled", "running" === e.status), this.renderResult_(e), this.options.container.find("[data-define-category]").hide().filter('[data-define-category="' + e.category + '"]').show(), 0 === e.type || 1 === e.type ? (this.renderClustering_(e), e.id < 0 && this.addEventFilter_()) : 4 === e.type && this.renderPredict_(e), e.id > 0) {
            var i = "#" + $.param({id: e.id});
            window.location.hash !== i && window.history.pushState(i, "", i)
        }
        var a = sensorsdata.languages.get("确认删除分群“<!--{en}Are you sure to delete the group clustering-->") + e.cname + '”吗？<div class="remark">本操作无法撤销</div>',
            r = this.$btnDelete_.data("bs.popover");
        r ? r.options.content = a : sensorsdata.popover({
            ele: this.$btnDelete_,
            footer: $("#tpl_popover_footer_state_3").html(),
            content: a,
            successAfter: sensorsdata.bind(this.deleteClustering_, this)
        }), sensorsdata.authority.isAdmin || sensorsdata.authority.isAnalyst && sensorsdata.cache.config.allow_analyst_higher_privilege || this.options.container.find("button,input").prop("disabled", !0), sensorsdata.languages.update()
    }, n.prototype.renderPredict_ = function (e) {
        var t = (e.content || [])[0] || {}, s = "least", n = "", i = "";
        $.isEmptyObject(t) || (t.min_repeated_times > 0 && 0 === t.max_repeated_times ? (s = "least", n = t.min_repeated_times) : 0 === t.min_repeated_times && t.max_repeated_times >= 0 ? (s = "most", n = t.max_repeated_times) : t.min_repeated_times > 0 && t.max_repeated_times > 0 && (s = "between", n = t.min_repeated_times, i = t.max_repeated_times));
        var a = this.$predictContainer_.filter(".predict-failed-info").toggle("failed" === e.status), r = "";
        switch (e.error_code) {
            case 10:
                r = sensorsdata.languages.get("用户数不足<!--{en}The number of users is insufficient -->");
                break;
            case 11:
                r = sensorsdata.languages.get("满足条件的用户数不足<!--{en}The number of users that meet the condition is insufficient -->");
                break;
            case 12:
                r = sensorsdata.languages.get("不满足条件的用户数不足<!--{en}The number of users that don not meet the condition is insufficient -->");
                break;
            default:
                r = sensorsdata.languages.get("失败原因未知，请联系值班同学<!--{en}The reason for the failure is unknown.Please contact the staff on duty.-->")
        }
        a.find("p span:last-child").text(r), this.$predictContainer_.filter(".predict-loss").toggle(-1 === e.id);
        var o = this.$predictContainer_.filter(".container-condition");
        o.html(Mustache.render(this.tplPredict_, {
            isBetween: "between" === s,
            leftValue: n,
            rightValue: i,
            leftValueDisplay: n >= 0
        })), o.find("#filter-time-range").saDropdown({
            onSelected: sensorsdata.bind(this.checkInputs_, this),
            value: t.relative_time_range ? t.relative_time_range : void 0
        });
        var l = this, d = sensorsdata.CONSTSET.eventEmptyValue;
        $.isEmptyObject(t.event_filter) || (d = t.event_filter.event_name);
        var u = sensorsdata.cache.events.filter(function (e) {
            return !e.virtual
        });
        u.unshift(sensorsdata.CONSTSET.everyEvent), o.find("#filter-events").eventDropdown("destroy").eventDropdown({
            events: u,
            virtualDisplay: !1,
            eventName: d,
            onChange: sensorsdata.bind(this.checkInputs_, this)
        });
        var c = o.find("input.input-times");
        o.find("#filter-repeated-times-type").saDropdown({
            onSelected: function (e) {
                var t = "between" === e;
                c.eq(1).toggle(t), o.find('[data-type="repeated-times-split"]').toggle(t), l.checkInputs_()
            }, value: s
        }), c.unbind("focusout").bind("focusout", function () {
            l.checkInputs_()
        })
    }, n.prototype.renderClustering_ = function (e) {
        this.userFilter_ = null, this.eventFilters_ = [], this.eventSeqs_ = [], this.$eventFilterContainer_.hide().html("").parent().addClass("empty"), this.$eventSeqContainer_.html(""), this.$userFilterContainer_.html(""), this.toggleRelation_(!1);
        for (var t = e.content || [], s = 0, n = t.length; n > s; s++) {
            var i = t[s];
            0 === i.type && this.addUserFilter_(i.profile_filter.filter), 1 === i.type && this.addEventFilter_(i), 2 === i.type && this.addEventSeq_(i)
        }
    }, n.prototype.refreshTasks_ = function () {
        var e = this, t = function () {
            var t = [];
            return e.tasks_.map(function (e) {
                "running" === e.status && t.push(e.id)
            }), t
        }, s = t();
        s.length > 0 && i.getClusterStatus(s, function (t) {
            t = e.mergeStatus_(t), t.statusClass = e.statusClass_[t.status];
            var s = sensorsdata.findIndex(e.tasks_, function (e) {
                return e.id === t.id
            });
            if ("failed" === t.status || "finish" === t.status || t.success_time !== e.tasks_[s].success_time) {
                $.extend(!0, e.tasks_[s], t);
                var n = e.tasks_[s],
                    i = sensorsdata.languages.get("用户分群 “<!--{en}User clustering-->") + n.cname + sensorsdata.languages.get("” 执行<!--{en}” Execute-->") + sensorsdata.languages.get("finish" === t.status ? "成功<!--{en}Success-->" : "失败<!--{en}Fail-->");
                if ("finish" === t.status && (n.app_push_config_id_list || []).length > 0) {
                    var a = n.app_push_config_id_list.map(function (e) {
                        return "“" + sensorsdata.cache.appPushConfigs.filter(function (t) {
                            return t.id === e
                        })[0].cname + "”"
                    });
                    i += sensorsdata.languages.get("，请在推送平台<!--{en}，please in the push platform-->") + a.join("、") + sensorsdata.languages.get("中使用标签<!--{en}use the tag in-->") + n.name + sensorsdata.languages.get("进行推送<!--{en}Push-->")
                }
                "finish" === t.status ? sensorsdata.success.show(i) : sensorsdata.error.show(i), t.id === e.activeTask_.id && (e.renderResult_(e.activeTask_), e.$btnExec_.prop("disabled", !1).find("span:last").text(sensorsdata.languages.get("执行<!--{en}Run-->")), e.$btnDelete_.prop("disabled", !1), e.checkInputs_()), e.$tasksContainer_.find('li[data-id="' + t.id + '"] span[class^="icon"]:first').attr("class", t.statusClass), sensorsdata.cache.ajax = {}
            }
        })
    }, n.prototype.addClustering_ = function () {
        if (this.isExecuting_ === !0) return void sensorsdata.info.show(sensorsdata.languages.get("正在发起执行，请稍后<!--{en}Initiating execution.Please wait-->"));
        var e = this.buildEmptyTask_(), t = 1 === this.$tasksContainer_.find('li[data-id="' + e.id + '"]').size();
        if (!t) {
            var s = Mustache.render(this.tplTasks_, {tasks: [e]});
            this.$tasksContainer_.append(s)
        }
        this.renderTaskDetail_(e), this.$inputName_.focus()
    }, n.prototype.tasksFilterClick_ = function (e) {
        var t = $(e.target || e.srcElement).not(".active"), s = t.attr("data-category");
        if (s) {
            this.$tasksContainer_.find('li[data-id="-1"]').remove(), this.filterTasks_(s);
            var n = this.$tasksContainer_.find('li[data-id][data-category="' + s + '"]:first'),
                i = parseInt(n.attr("data-id"), 10), a = null;
            i > 0 ? a = this.tasks_.filter(function (e) {
                return e.id === i
            })[0] : (a = this.buildEmptyTask_(), a.category = s, a.type = parseInt(t.attr("data-type"), 10)), this.renderTaskDetail_(a)
        }
    }, n.prototype.filterTasks_ = function (e) {
        this.$btnAddClustering_.prop("disabled", "result" === e), this.$tasksContainer_.find("li").hide().filter('[data-category="' + e + '"]').show(), this.$tasksFilter_.find('span[data-category="' + e + '"]').toggleClass("active").siblings().removeClass("active")
    }, n.prototype.tasksContainerClick_ = function (e) {
        if (this.isExecuting_ === !0) return void sensorsdata.info.show(sensorsdata.languages.get("正在发起执行，请稍后切换<!--{en}Initiating execution.Please switch later-->"));
        var t = $(e.target || e.srcElement);
        t.attr("data-id") || (t = t.parents("li[data-id]:first"));
        var s = t.attr("data-id") - 0, n = this.tasks_.filter(function (e) {
            return e.id === s
        })[0] || this.buildEmptyTask_();
        this.renderTaskDetail_(n)
    }, n.prototype.inputTypeChange_ = function () {
        var e = parseInt(this.$inputTypes_.filter(":checked").val(), 10);
        this.eventFilters_.map(function (t) {
            t.changeProfileType(e)
        }), this.eventSeqs_.map(function (t) {
            t.changeProfileType(e)
        }), this.userFilter_ && this.userFilter_.changeTimeType(0 === e ? "absolute" : "")
    }, n.prototype.saveTask_ = function (e) {
        var t = this, s = function (s) {
            var n = {success: !0, clustering_type: t.$tasksFilter_.find("span.active").text()};
            sensorsdata.ajax({
                method: "POST",
                url: "segmenter/rule" + (s.id ? "/" + s.id : ""),
                data: JSON.stringify(s),
                error: function (e) {
                    s.id || (n.success = !1, n.fail_reason = e.status, sensorsdata.track("create_clustering", n))
                },
                success: function (i) {
                    if (s.id) {
                        var a = sensorsdata.findIndex(t.tasks_, function (e) {
                            return e.id === s.id
                        });
                        2 === s.type ? (t.tasks_[a].name = s.name, t.tasks_[a].cname = s.cname) : t.tasks_[a] = s, t.activeTask_ = t.tasks_[a], $.isFunction(e) || sensorsdata.info.show(sensorsdata.languages.get("保存成功<!--{en}Saved successfully-->"))
                    } else {
                        sensorsdata.track("create_clustering", n), s.id = i.id, s.category = 0 === s.type || 1 === s.type ? "clustering" : 2 === s.type ? "result" : "predict", t.tasks_.push(s), t.activeTask_ = s, t.$inputTypes_.prop("disabled", !0), sensorsdata.form.removeError(t.$inputCName_), sensorsdata.form.removeError(t.$inputName_);
                        var r = "#" + $.param({id: s.id});
                        window.history.pushState(r, "", r), $.isFunction(e) || sensorsdata.info.show(sensorsdata.languages.get("新增成功<!--{en}Successfully added-->"))
                    }
                    t.$btnSave_.prop("disabled", !0), t.$btnDelete_.prop("disabled", !1), t.$btnExec_.prop("disabled", !1).find("span:last").text(sensorsdata.languages.get("执行<!--{en}Run-->"));
                    var o = t.$tasksContainer_.find("li.active");
                    0 === o.size() ? t.$tasksContainer_.append(Mustache.render(t.tplTasks_, {tasks: [s]})) : (o.attr("data-id", s.id).attr("data-category", s.category), o.find("a").text(s.cname)), $.isFunction(e) && e()
                }
            })
        }, n = this.buildTask_();
        $.isEmptyObject(n) || sensorsdata.form.check(t.$inputName_, !0) !== !1 && sensorsdata.form.check(t.$inputCName_, !0) !== !1 && this.checkRepeatedName_() !== !1 && this.checkRepeatedCName_() !== !1 && sensorsdata.ajax({
            useCache: !0,
            url: "property/user/properties?show_all=true",
            success: function (e) {
                for (var i = $.trim(t.$inputName_.val()), a = $.trim(t.$inputCName_.val()), r = !0, o = 0, l = e.length; l > o; o++) e[o].name !== i || e[o].is_segmenter || (sensorsdata.form.addError(t.$inputName_, sensorsdata.languages.get("分群名与用户属性名重复<!--{en}The group clustering name is repeated with the user property name-->"), !0), r = !1), e[o].cname !== a || e[o].is_segmenter || e[o].name === i || (sensorsdata.form.addError(t.$inputCName_, sensorsdata.languages.get("显示名与用户属性显示名重复<!--{en}The display name is repeated with the user property name-->"), !0), r = !1);
                r === !0 && s(n)
            }
        })
    }, n.prototype.checkRepeatedName_ = function () {
        for (var e = this.activeTask_.id, t = $.trim(this.$inputName_.val()), s = !0, n = 0, i = this.tasks_.length; i > n; n++) {
            var a = this.tasks_[n];
            if (e !== a.id && a.name === t) {
                s = !1;
                break
            }
        }
        return !0 === s ? sensorsdata.form.removeError(this.$inputName_) : sensorsdata.form.addError(this.$inputName_, sensorsdata.languages.get("分群名重复<!--{en}Repetition of cluster name-->"), !0), s
    }, n.prototype.checkRepeatedCName_ = function () {
        for (var e = this.activeTask_.id, t = $.trim(this.$inputCName_.val()), s = !0, n = 0, i = this.tasks_.length; i > n; n++) {
            var a = this.tasks_[n];
            if (e !== a.id && a.cname === t) {
                s = !1;
                break
            }
        }
        return !0 === s ? sensorsdata.form.removeError(this.$inputCName_) : sensorsdata.form.addError(this.$inputCName_, sensorsdata.languages.get("显示名重复<!--{en}The display name is repeated-->"), !0), s
    }, n.prototype.buildEmptyTask_ = function () {
        var e = {id: -1, name: "", cname: "", type: 0, status: "new", statusClass: "icon-new", content: []},
            t = this.$tasksFilter_.find("span.active"), s = t.attr("data-category"),
            n = this.tasks_.filter(function (e) {
                return e.category === s
            }).length + 1;
        return "clustering" === s ? (e.cname = sensorsdata.languages.get("分群<!--{en}Cluster-->") + n, e.name = "fenqun" + n) : "predict" === s && (e.cname = sensorsdata.languages.get("预测<!--{en}Predict-->") + n, e.name = "yuce" + n), e
    }, n.prototype.buildTask_ = function (e) {
        if (e !== !1 && this.options.container.find(".error").length > 0) return {};
        var t = parseInt(this.$tasksContainer_.find("li.active").attr("data-id"), 10),
            s = this.tasks_.filter(function (e) {
                return e.id === t
            })[0], n = {};
        s && $.extend(!0, n, s), n.name = $.trim(this.$inputName_.val()), n.cname = $.trim(this.$inputCName_.val()), $.isEmptyObject(s) && (n.status = "new", n.statusClass = this.statusClass_["new"]), 4 !== n.type && (n.app_push_config_id_list = [], this.$inputPushConfig_.find(":checkbox:checked").each(function (e, t) {
            var s = $(t).val();
            $.isNumeric(s) && n.app_push_config_id_list.push(parseInt(s, 10))
        }));
        var i = this.$tasksFilter_.find("span.active").attr("data-category");
        if ("result" === i) return n.type = 2, n.content = null, n;
        if ("predict" === i) {
            var a = this.buildPredict_();
            return $.isEmptyObject(a) ? {} : (n.type = 4, n.content = [a], n)
        }
        var r = [], o = null;
        if (this.userFilter_) {
            var l = this.userFilter_.val();
            $.isArray(l.conditions) && l.conditions.length > 0 && (o = {
                type: 0,
                profile_filter: {filter: l}
            }, r.push(o))
        }
        var d = [], u = this.$btnRelation_.attr("data-relation");
        this.eventFilters_.map(function (e) {
            var t = e.val();
            $.isEmptyObject(t) || (t.relation = u, d.push(t), r.push(t))
        });
        var c = this.$eventFilterContainer_.children().size();
        0 === c && this.$eventFilterContainer_.html("").parent().addClass("empty").find(".left,.right").hide(), this.toggleRelation_(c > 1);
        for (var p = [], h = 0, _ = this.eventSeqs_.length; _ > h; h++) {
            var f = this.eventSeqs_[h].val();
            if (!$.isEmptyObject(f) && f.event_filter_sequence.length > 0) {
                if (1 === f.event_filter_sequence.length) {
                    if (e === !1) continue;
                    return sensorsdata.info.show(sensorsdata.languages.get("事件序列中至少要包含两个事件<!--{en}The event sequence must contain at least two events-->")), {}
                }
                p.push(f), r.push(f)
            }
        }
        return e !== !1 && 0 === r.length ? (sensorsdata.info.show(sensorsdata.languages.get("请添加分群条件<!--{en}Please add group clustering conditions-->")), {}) : (n.type = parseInt(this.$inputTypes_.filter(":checked").val(), 10), n.content = r, n)
    }, n.prototype.buildPredict_ = function () {
        var e = this.$predictContainer_.filter(".container-condition"),
            t = e.find("#filter-events").data("selected-event"), s = e.find("#filter-time-range").attr("data-value"),
            n = {
                type: 1,
                event_filter: {event_name: t},
                relative_time_range: s,
                absolute_time_range: [],
                max_repeated_times: 0,
                min_repeated_times: 0
            }, i = e.find("input.input-times"), a = e.find("#filter-repeated-times-type").attr("data-value"),
            r = parseInt(i.eq(0).val(), 10), o = parseInt(i.eq(1).val(), 10);
        if (!$.isNumeric(r)) return {};
        if ("least" === a) n.min_repeated_times = r, n.max_repeated_times = 0; else if ("most" === a) n.min_repeated_times = 0, n.max_repeated_times = r; else {
            if (!$.isNumeric(o)) return {};
            if (r > o) return sensorsdata.form.addError(i.eq(1), sensorsdata.languages.get("必须大于左侧数字<!--{en}Must be greater than the number on the left-->"), !0), {};
            sensorsdata.form.removeError(i.eq(1)), n.min_repeated_times = r, n.max_repeated_times = o
        }
        return n
    }, n.prototype.execTask_ = function () {
        var e = this;
        e.$btnAddClustering_.prop("disabled", !0), e.$btnExec_.prop("disabled", !0).find("span:last").text(sensorsdata.languages.get("执行中…<!--{en}Running...-->")), e.$btnDelete_.prop("disabled", !0), e.$btnSave_.prop("disabled", !0), e.$inputName_.prop("readonly", !0), e.isExecuting_ = !0, sensorsdata.ajax({
            method: "POST",
            url: "segmenter/execute/" + this.activeTask_.id,
            complete: function () {
                e.isExecuting_ = !1, e.checkInputs_(), e.$btnAddClustering_.prop("disabled", !1)
            },
            error: function () {
                e.$btnExec_.prop("disabled", !1).find("span:last").text(sensorsdata.languages.get("执行<!--{en}Run-->")), e.$btnDelete_.prop("disabled", !1)
            },
            success: function () {
                sensorsdata.info.show(e.activeTask_.success_time ? sensorsdata.languages.get("已发起执行，待执行成功后，会整体覆盖之前数据<!--{en}Execution has been initiated and the prior data will be covered after successful execution-->") : sensorsdata.languages.get("已发起执行，待执行成功后方可使用<!--{en}Group has been initiated to run and can be used when the initiation succeed.-->")), e.activeTask_.status = "running", e.activeTask_.statusClass = e.statusClass_.running, e.$tasksContainer_.find('li.active span[class^="icon"]:first').attr("class", e.activeTask_.statusClass), e.$btnSave_.prop("disabled", !0), e.$inputName_.prop("readonly", !0), e.refreshTasks_()
            }
        })
    }, n.prototype.deleteClustering_ = function () {
        var e = this.$tasksContainer_.find("li.active"), t = parseInt(e.attr("data-id"), 10);
        -1 === t ? e.remove() : sensorsdata.ajax({
            method: "DELETE",
            url: "segmenter/rule/" + t,
            success: sensorsdata.bind(function () {
                sensorsdata.info.show(sensorsdata.languages.get("删除分群 “<!--{en}Delete the group clustering-->") + this.activeTask_.cname + sensorsdata.languages.get("” 成功<!--{en}” Success-->"));
                var s = sensorsdata.findIndex(this.tasks_, function (e) {
                    return e.id === t
                });
                this.tasks_.splice(s, 1), e.remove(), this.renderTaskDetail_(this.buildEmptyTask_())
            }, this)
        })
    }, n.prototype.addEventFilter_ = function (e) {
        var t = this, s = function (e) {
            for (var s = 0, n = t.eventFilters_.length; n > s; s++) if (t.eventFilters_[s] === e) {
                t.eventFilters_.splice(s, 1);
                break
            }
        };
        this.expandFilter_(this.$eventFilterContainer_.prev().find('[data-method="filter-expand"]'), !0), this.$eventFilterContainer_.parent().removeClass("empty");
        var n = new sensorsdata.ClusteringEventFilter({
            container: this.$eventFilterContainer_.show(),
            value: e || {},
            profileType: parseInt(this.$inputTypes_.filter(":checked").val(), 10),
            valueChangedFunc: sensorsdata.bind(this.checkInputs_, this),
            removedEventFilter: s
        });
        this.eventFilters_.push(n);
        var i = (e || {}).relation || "and";
        this.eventFilters_.length > 1 ? (this.toggleRelation_(!0), this.$btnRelation_.attr("data-relation", i).text(sensorsdata.languages.get("and" === i ? "且<!--{en}and-->" : "或<!--{en}or-->"))) : 1 === this.eventFilters_.length && (this.toggleRelation_(!1), this.$btnRelation_.attr("data-relation", i).text(sensorsdata.languages.get("and" === i ? "且<!--{en}and-->" : "或<!--{en}or-->")))
    }, n.prototype.addEventSeq_ = function (e) {
        this.expandFilter_(this.$eventSeqContainer_.prev().find('[data-method="filter-expand"]'), !0), this.eventSeqs_.push(new sensorsdata.ClusteringEventSeq({
            container: this.$eventSeqContainer_,
            value: e,
            profileType: parseInt(this.$inputTypes_.filter(":checked").val(), 10),
            valueChangedFunc: sensorsdata.bind(this.checkInputs_, this)
        }))
    }, n.prototype.expandFilter_ = function (e, t) {
        var s = e.parent().next();
        t !== !0 && t !== !1 && (t = !s.is(":visible")), !0 === t ? (e.removeClass("icon-expand-down-single").addClass("icon-collapse-up-single"), s.is(":visible") || s.slideDown()) : (e.removeClass("icon-collapse-up-single").addClass("icon-expand-down-single"), s.is(":visible") && s.slideUp())
    }, n.prototype.addUserFilter_ = function (e) {
        return this.expandFilter_(this.$userFilterContainer_.prev().find('[data-method="filter-expand"]'), !0), null !== this.userFilter_ ? void this.userFilter_.addFilter() : void sensorsdata.ajax({
            useCache: !0,
            url: "property/user/properties",
            success: sensorsdata.bind(function (t) {
                var s = this.tasks_.map(function (e) {
                    return $.trim(e.name)
                }), n = t.filter(function (e) {
                    return -1 === s.indexOf(e.name) && "$id" !== e.name
                });
                if (!$.isEmptyObject(e) && $.isArray(e.conditions)) {
                    for (var i = [], a = [], r = n.map(function (e) {
                        return e.name
                    }), o = 0, l = e.conditions.length; l > o; o++) {
                        var d = e.conditions[o].field.split(".")[1];
                        -1 !== r.indexOf(d) ? i.push(e.conditions[o]) : a.push(d)
                    }
                    if (a.length > 0 && sensorsdata.info.show(sensorsdata.util.format(sensorsdata.languages.get("用户属性 #{missNames} 不存在或被隐藏，已过滤掉相关条件<!--{en}User property#{missNames} does not exist or has been hided.The relevant conditions have been filtered out-->"), {missNames: a})), 0 === i.length) return;
                    e.conditions = i
                }
                var u = parseInt(this.$inputTypes_.filter(":checked").val(), 10);
                this.userFilter_ = new sensorsdata.FilterGroupControl, this.userFilter_.init({
                    container: this.$userFilterContainer_,
                    propertyObj: {user: n},
                    timeType: 0 === u ? "absolute" : "",
                    disabled: !(sensorsdata.authority.isAdmin || sensorsdata.authority.isAnalyst && sensorsdata.cache.config.allow_analyst_higher_privilege),
                    excludeFunctions: ["notSet"],
                    relative_event: !0
                }), this.userFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(this.checkInputs_, this)), this.userFilter_.bindEvent("inputKeyupEvent", sensorsdata.bind(this.checkInputs_, this)), $.isEmptyObject(e) ? this.userFilter_.addFilter() : this.userFilter_.val({
                    relation: e.relation,
                    conditions: e.conditions
                })
            }, this)
        })
    }, n.prototype.checkNeverEvent_ = function (e) {
        if (0 !== e.type && 1 !== e.type) return !0;
        var t = e.content || [];
        if (0 === t.length) return !1;
        var s = [], n = 0, i = 0, a = !1;
        for (n = 0, i = t.length; i > n; n++) 0 === t[n].type || 2 === t[n].type ? a = !0 : (s.push(t[n]), this.eventFilters_[s.length - 1].toggleNeverError(!1));
        if (!a && 1 === s.length && "and" === s[0].relation && (s[0].min_repeated_times > 0 || s[0].max_repeated_times > 0) && (a = !0), !a) for (n = 0, i = s.length; i > n; n++) "and" === s[n].relation && (s[n].min_repeated_times > 0 || s[n].max_repeated_times > 0) && (a = !0);
        var r = !0;
        for (n = 0, i = s.length; i > n; n++) 0 === s[n].min_repeated_times && 0 === s[n].max_repeated_times ? this.eventFilters_[n].toggleNeverError(!a) : r = !1;
        return r ? a : !0
    }, n.prototype.checkInputs_ = function () {
        var e = this.activeTask_;
        if ("running" !== e.status) {
            var t = this.buildTask_(!1);
            if (!$.isEmptyObject(t) && sensorsdata.form.checkChildren(this.options.container, !0) && this.checkNeverEvent_(t)) {
                var s = [], n = [], i = e.name !== t.name || e.cname !== t.cname || e.type !== t.type;
                if (2 === t.type) return this.$btnSave_.prop("disabled", !i), void(this.activeTask_.id > 0 && this.$btnExec_.find("span:last").text(sensorsdata.languages.get(i ? "保存并执行<!--{en}Save & Run-->" : "执行<!--{en}Run-->")));
                if (!i && (s = e.content.filter(function (e) {
                    return 0 === e.type
                }) || [], n = t.content.filter(function (e) {
                    return 0 === e.type
                }) || [], i = s.length !== n.length, !i && s.length > 0)) {
                    var a = s[0].profile_filter.filter, r = n[0].profile_filter.filter;
                    i = JSON.stringify(a) !== JSON.stringify(r)
                }
                if (i || (s = e.content.filter(function (e) {
                    return 1 === e.type
                }) || [], n = t.content.filter(function (e) {
                    return 1 === e.type
                }) || [], i = s.length !== n.length, !i && s.length > 0 && (i = JSON.stringify(s) !== JSON.stringify(n))), !i && (s = e.content.filter(function (e) {
                    return 2 === e.type
                }) || [], n = t.content.filter(function (e) {
                    return 2 === e.type
                }) || [], i = s.length !== n.length, !i && s.length > 0)) for (var o = 0, l = s.length; l > o; o++) {
                    var d = s[o], u = n[o];
                    if (i = d.relative_time_range !== u.relative_time_range || JSON.stringify(d.absolute_time_range) !== JSON.stringify(u.absolute_time_range) || d.event_filter_sequence.length !== u.event_filter_sequence.length || JSON.stringify(d.event_filter_sequence) !== JSON.stringify(u.event_filter_sequence)) break
                }
                this.$btnSave_.prop("disabled", !i), this.activeTask_.id > 0 && this.$btnExec_.find("span:last").text(sensorsdata.languages.get(i ? "保存并执行<!--{en}Save & Run-->" : "执行<!--{en}Run-->"))
            }
        }
    }, n.prototype.checkEventPermission_ = function (e) {
        for (var t = sensorsdata.cache.events.map(function (e) {
            return e.name
        }), s = e.content || [], n = "", i = "", a = sensorsdata.CONSTSET.eventEmptyValue, r = [], o = [], l = 0, d = s.length; d > l; l++) {
            var u = s[l];
            if (1 === u.type) {
                if (n = u.event_filter.event_name, n !== a && n !== t.indexOf(n) === -1) {
                    -1 === o.indexOf(n) && o.push(n);
                    continue
                }
            } else if (2 === u.type) {
                for (var c = [], p = 0, h = u.event_filter_sequence.length; h > p; p++) n = u.event_filter_sequence[p].event_name, n === a || n !== t.indexOf(n) !== -1 ? c.push(u.event_filter_sequence[p]) : -1 === o.indexOf(n) && o.push(n);
                if (0 === c.length) continue;
                u.event_filter_sequence = c
            }
            r.push(u)
        }
        return o.length > 0 && (i = sensorsdata.util.format(sensorsdata.languages.get("事件 #{missEvents} 不存在或没此事件权限，已过滤掉相关条件<!--{en}Event #{missEvents} does not exist or no permission for this event.The relevant conditions have been filtered out-->"), {missEvents: o}), sensorsdata.info.show(i)), e.content = r, e
    }, n.prototype.toggleRelation_ = function (e) {
        this.$btnRelation_.parent().toggle(e).parent().toggleClass("condition-relation-line", e)
    }, s.exports = n
});
;
/*!pages/interval/interval.js*/
define("pages/interval/interval", function (t, o, n) {
    var i = {
            content: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<div id="bookmark-save-bar" class="fixed-top-bar"></div>\n<div class="interval" id="interval-container">\n  <section id="conditionContainer">\n\n  </section>\n\n  <section class="chart-container" id="chartContainer">\n\n  </section>\n  <section class="table-container" id="tableContainer">\n\n  </section>\n</div>\n'
                }, useData: !0
            })
        }, a = t("components/boxPlot/boxPlot"), e = t("components/model/intervalCondition"),
        r = t("components/model/intervalResult"), s = t("components/intervalCondition/intervalCondition"),
        d = t("components/intervalTable/intervalTable"), c = t("components/bookmarkToolbar/bookmarkToolbar"),
        h = t("components/reportLoading/reportLoading"), l = function (t) {
            sensorsdata.BasePage.call(this), this.options = $.extend(!0, {}, t), this.options.container = t.container || $("body"), this.bookmarkToolbar = {}, this.state = this.options.state || {}, this.options.container.html(i.content()), this.inputDate_ = this.options.container.find("#inputDate"), this.chartContainer_ = this.options.container.find("#chartContainer"), this.tableContainer_ = this.options.container.find("#tableContainer"), this.reportLoading = new h({
                container: this.chartContainer_,
                needHideDom: this.tableContainer_,
                hideType: "hidden"
            }), this.init()
        };
    l.prototype.init = function () {
        this.initCondition_();
        var t = $.extend(!0, {}, e.get()), o = "#" + $.param(t);
        window.history.replaceState(o, "", o);
        var n = t[sensorsdata.CONSTSET.bookmarkId], i = this.state;
        this.bookmarkToolbar = c.create({
            dashboardDisplay: !1,
            dashid: i.dashid,
            fromDashboard: "dashboard" === i.from && !!i.dashid,
            showSaveAndAdd: "dashboard" === i.from && "add" === i.action && !!i.dashid,
            samplingDisplay: !0,
            samplingFactor: t.sampling_factor,
            onBookmarkAdded: sensorsdata.bind(function (t) {
                e.set("bookmarkid", t.id)
            }, this),
            onRefreshClick: sensorsdata.bind(function (t) {
                var o = $.extend(!0, {}, e.get());
                this.handleLoading(o, t), r.request(o, function (t) {
                    this.reportLoading.closeLoading(t)
                }.bind(this)), $.isFunction(t) && t()
            }, this),
            onDownloadClick: sensorsdata.bind(function () {
                var t = "interval/report/csv?bookmarkId=" + (e.get("bookmarkid") || ""),
                    o = (this.bookmarkToolbar.bookmark.id && this.bookmarkToolbar.bookmark.name + "_") + sensorsdata.languages.get("间隔分析<!--{en}Interval Analytics -->") + "_" + e.get("from_date") + sensorsdata.CONSTSET.dateRangeSplit + e.get("to_date") + "_SensorsAnalytics";
                sensorsdata.download(t, $.extend(!0, {}, e.get(), {use_cache: !1}), o)
            }, this),
            sessionDropdownDisplay: !1,
            container: $("#bookmark-save-bar"),
            bookmarkid: n,
            params: t,
            type: "/interval/"
        }), this.initEvent_();
        var a = e.get();
        this.handleLoading(a), r.request(a, function (t) {
            this.reportLoading.closeLoading(t)
        }.bind(this)), this.options.closeLoading()
    }, l.prototype.initCondition_ = function () {
        this.condition = s.create({
            container: this.options.container.find("#conditionContainer"),
            reportLoading: this.reportLoading
        })
    }, l.prototype.initTable_ = function (t) {
        this.table_ = d.create({container: t.container || this.tableContainer_, data: t.data})
    }, l.prototype.initEvent_ = function () {
        var t = this;
        r.on("update", function (o) {
            t.initBoxPlot({
                container: t.chartContainer_,
                data: o.chartData_,
                selected: e.get("selected")
            }), t.initTable_({container: t.tableContainer_, data: o.tableData_})
        }), e.on("changeChartGroup", function () {
            t.chart_.show(e.get("selected"));
            var o = $.extend(!0, {}, e.get()), n = "#" + $.param(o);
            window.history.pushState(n, "", n)
        }), this.bookmarkToolbar.on("updateSampling", function (o) {
            e.set("sampling_factor", o.sampling_factor);
            var n = e.get();
            t.handleLoading(n), r.request(n, function (o) {
                t.reportLoading.closeLoading(o)
            })
        }), this.bookmarkToolbar.on("updateParams", function (t) {
            t.dashboard_cache_policy && e.set("dashboard_cache_policy", t.dashboard_cache_policy)
        })
    }, l.prototype.initBoxPlot = function (t) {
        var o = $.extend(!0, {container: "", data: null}, t);
        this.chart_ = a.create(o)
    }, l.prototype.unload = function () {
        $.isEmptyObject(this.bookmarkToolbar) || this.bookmarkToolbar.destroy(), this.condition && $.isFunction(this.condition.destroy) && this.condition.destroy(), this.chart_ && $.isFunction(this.chart_.destroy) && this.chart_.destroy(), r.off("update")
    }, l.prototype.handleLoading = function (t, o) {
        var n = this.bookmarkToolbar.getSamplingValue();
        this.reportLoading.options.sampling_factor = n, 64 === n ? (this.reportLoading.options.quickType = "sampling_factor", this.reportLoading.options.openQuickQuery = function () {
            this.reportLoading.options.sampling_factor = t.sampling_factor = 16, this.bookmarkToolbar && this.bookmarkToolbar.samplingSlider_.setValue(4, !0, !0), this.handleLoading(t), r.request(t, o)
        }.bind(this)) : this.reportLoading.options.quickType = "none", this.reportLoading.showLoading()
    }, n.exports = l
});
;
/*!pages/profiling/profiling.js*/
define("pages/profiling/profiling", function (i, n, o) {
    var t = i("components/profilingTable/profilingTable"), e = function (i) {
        var n = this;
        sensorsdata.BasePage.call(n), n.options = $.extend(!0, {}, i), n.options.container = i.container || $("body"), n.init(n.options)
    };
    e.prototype.init = function (i) {
        this.initTable(i)
    }, e.prototype.initTable = function (i) {
        var n = i.container;
        t.create(n, i), this.options.closeLoading()
    }, o.exports = e
});
;
/*!pages/userBehaviorPath/userBehaviorPath.js*/
define("pages/userBehaviorPath/userBehaviorPath", function (e, t, n) {
    function a(e) {
        sensorsdata.BasePage.call(this), this.options = e, this.options.container = e.container || $("body"), this.pageName = window.location.pathname, this.tplPage_ = $("#tpl-user-behavior-path").html(), this.options.container.html(this.tplPage_), this.state = this.options.state || {}, this.bookmarkToolbar = {}, this.eventsFilterControl_ = new sensorsdata.FilterGroupControl, this.userFilterControl_ = new sensorsdata.FilterGroupControl, this.eventsGroupControl_ = [], this.saveBar_ = this.options.container.find("#bookmark-save-bar"), this.btnAddEventFilter_ = this.options.container.find("#btn-add-event-filter"), this.btnAddUserFilter_ = this.options.container.find("#btn-add-user-filter"), this.paramObj_ = null, this.conditionsContainer_ = this.options.container.find("#conditions-select"), this.eventsFilterContainer_ = this.options.container.find("#event-filter-container"), this.eventsGroupContainer_ = this.options.container.find("#eventsGroupContainer"), this.userFilterContainer_ = this.options.container.find("#user-filter-container"), this.inputTargetType_ = this.options.container.find("#target-event-type"), this.inputTargetEvent_ = this.options.container.find("#selected-event"), this.inputSessionSection_ = this.options.container.find("#session-unit"), this.inputDate_ = this.options.container.find("#inputDate"), this.eventsEditList_ = this.options.container.find("#events-edit-list"), this.btnAddEvent_ = this.options.container.find("#btn-add-event"), this.tplNodeContextMenu_ = this.options.container.find("#tpl-node-context-menu").html(), this.tplEventsGroupSelect_ = $("#tpl-event-group-select").html(), this.selectedEvents = [], this.eventProps_ = null, this.userProps_ = null, this.sankeyContainer_ = this.options.container.find("#d3-sankey"), this.eventType = {
            initial_event: sensorsdata.languages.get("起始事件<!--{en}Initial event-->"),
            termination_event: sensorsdata.languages.get("结束事件<!--{en}End event-->")
        }, this.CONST = {
            domSize: 160,
            defaultLayers: 4,
            opacity: {transStrokeOpacity: 0, lightStrokeOpacity: .3, darkStrokeOpacity: 1, midStrokeOpacity: .8},
            color: {
                link_light_color: "#E1EBF7",
                link_dark_color: "#BBCDE3",
                link_light_rgb: "rgb(225, 235, 247)",
                link_dark_rgb: "rgb(187, 205, 227)"
            },
            screen: {width: 1400, height: 300, margin: {top: 25, right: 25, bottom: 25, left: 25}},
            colors: [],
            inEmptyNode: {
                event_cname: sensorsdata.languages.get("起始<!--{en}Start-->"),
                event_name: "start",
                sourceLinks: [],
                targetLinks: [],
                isStart: !0
            }
        }, this.currentLayer = this.CONST.defaultLayers, this.originalGraphData_ = {}, this.MAX_LAYERS = 0, this.withBucketEvent_ = {}, this.allEvents_ = [], this.flag = !1, this.isMenuShow = !1, this.nodeDetailModal_ = $("#node-detail"), this.tplNodeDetail_ = $("#tpl-node-detail").html(), this.reportLoading = new r({container: this.sankeyContainer_}), this.init()
    }

    var i = e("components/bookmarkToolbar/bookmarkToolbar"), r = e("components/reportLoading/reportLoading");
    sensorsdata.inherits(a, sensorsdata.BasePage), a.prototype.init = function () {
        a.superClass_.init.call(this), this.paramObj_ = sensorsdata.unparam(window.location.hash), this.paramObj_ = this.dealParam_(this.paramObj_);
        var e = "#" + $.param(this.paramObj_);
        window.history.replaceState(e, "", e);
        var t = this, n = this.paramObj_[sensorsdata.CONSTSET.bookmarkId], r = this.state;
        this.bookmarkToolbar = i.create({
            dashboardDisplay: !1,
            dashid: r.dashid,
            fromDashboard: "dashboard" === r.from && !!r.dashid,
            showSaveAndAdd: "dashboard" === r.from && "add" === r.action && !!r.dashid,
            refreshDisplay: !1,
            downloadDisplay: !1,
            samplingDisplay: !0,
            samplingFactor: this.paramObj_.sampling_factor,
            onBookmarkAdded: sensorsdata.bind(function (e) {
                this.paramObj_[sensorsdata.CONSTSET.bookmarkId] = e.id
            }, this),
            onBookmarkNameChanged: sensorsdata.bind(function () {
                this.updateReportName_(this.bookmarkToolbar.bookmark)
            }, this),
            sessionDropdownDisplay: !1,
            container: $("#bookmark-save-bar"),
            bookmarkid: n,
            params: this.paramObj_,
            type: this.pageName
        }), t.getEventProps_().then(0 === t.selectedEvents.length ? function () {
            t.getUserProps_().then(function () {
                t.initInputDate_(), t.renderEvent_(), t.renderLayerControl_(), t.adjustByStatus_(), t.sankeyContainer_.html($("#tpl_no_sankey").html()), t.initEvents(), t.options.closeLoading()
            })
        } : function () {
            t.getUserProps_().then(function () {
                t.initInputDate_(), t.renderEvent_(), t.getOriginalData_(t.paramObj_, !0, function () {
                    t.sankeyContainer_.html(""), t.initSankey("d3-sankey", t.formatSankeyData_(t.currentLayer)), t.initEvents(), t.renderLayerControl_(), window.history.pushState("changed", "", "#" + $.param(t.paramObj_)), t.options.closeLoading()
                })
            })
        })
    }, a.prototype.renderEvent_ = function () {
        this.renderEventsEdit_(), this.renderInputTargetEvent_(), this.renderInputSession_(), this.updateReportName_(this.bookmarkToolbar.bookmark)
    }, a.prototype.updateReportName_ = function (e) {
        var t = sensorsdata.findEventCname(this.paramObj_.source_event.event_name, sensorsdata.cache.events),
            n = this.eventType[this.paramObj_.source_type] + "为" + t + "的用户行为路径";
        e && e.id && e.name && (n = e.name), this.options.container.find("#reportName").text(n), this.bookmarkToolbar.setDialogName(n)
    }, a.prototype.renderEventsEdit_ = function () {
        var e = this;
        if (this.eventsEditList_.eventDropdown("destroy").eventDropdown({
            events: this.allEvents_,
            multiple: !0,
            virtualDisplay: !0,
            eventNames: this.selectedEvents.map(function (e) {
                return e.name
            }),
            multiselectOption: {includeSelectAllOption: !0},
            onChange: sensorsdata.bind(function () {
                var t = e.eventsEditList_.data("selected-event");
                e.selectedEvents = e.allEvents_.filter(function (e) {
                    return t.indexOf(e.name) >= 0
                }), e.eventsGroupControl_ = [], e.eventsFilterContainer_.html(""), e.withBucketEvent_ = {}, e.adjustByStatus_()
            }, this)
        }), this.paramObj_.hasOwnProperty("by_fields") && this.paramObj_.by_fields.length > 0) {
            e.eventsGroupContainer_.css("display", "block"), e.eventsGroupControl_ = [], e.eventsGroupContainer_.html("");
            var t = [], n = [];
            this.paramObj_.by_fields.forEach(function (a) {
                var i = a.split(".");
                e.eventsGroupContainer_.append(Mustache.render(e.tplEventsGroupSelect_));
                var r = e.eventsGroupContainer_.children(":last").find('[data-id="selected-events-hold-place"]');
                r.eventDropdown("destroy").eventDropdown({
                    eventName: i[1],
                    events: e.selectedEvents,
                    virtualDisplay: !0,
                    onChange: function (t, n) {
                        var a = n.parents("div[data-id]").eq(0).parent();
                        e.getProperties_([t], function () {
                            var t = a.find('[data-id="behavior-group-hold-place"]').html(""),
                                n = new sensorsdata.GroupControl;
                            n.init({
                                container: t,
                                data: {event: e.propObj_.intersection.event},
                                disabled: sensorsdata.authority.isNormal,
                                enableAdd: !0,
                                enableOverAll: !1
                            }), e.eventsGroupControl_[a.index()] = n, e.refreshEventsGroupControl_()
                        })
                    }
                }), t.push(i[1]), n.push(a), $(this).attr("disabled", e.selectedEvents.length === e.eventsGroupContainer_.children().length)
            }), t.length > 0 && e.getProperties_(t, function () {
                for (var a = 0; a < t.length; a++) {
                    var i = e.eventsGroupContainer_.children(":nth-child(" + (a + 1) + ")").find('[data-id="behavior-group-hold-place"]'),
                        r = new sensorsdata.GroupControl, s = {};
                    e.paramObj_.bucket_params[n[a]] && (s[n[a]] = e.paramObj_.bucket_params[n[a]]), r.init({
                        container: i,
                        data: {event: e.propObj_.original[t[a]].event},
                        disabled: sensorsdata.authority.isNormal,
                        enableAdd: !1,
                        enableOverAll: !1
                    }), r.val({
                        byFields: [e.paramObj_.by_fields[a]],
                        bucket: s
                    }), e.eventsGroupControl_.push(r), e.refreshEventsGroupControl_()
                }
            })
        }
    }, a.prototype.renderLayerControl_ = function () {
        var e = this, t = this.options.container.find("#layer-control"), n = e.formatSankeyData_(e.currentLayer),
            a = "initial_event" === this.paramObj_.source_type;
        return 0 === e.selectedEvents.length || 0 === n.nodes.length || 0 === n.links.length ? void t.html("") : (t.html(Mustache.render($("#tpl-layer-control").html(), {isInitial: a})), t.find('button[data-method="prev"]').attr("disabled", e.currentLayer <= e.CONST.defaultLayers), t.find('button[data-method="next"]').attr("disabled", e.currentLayer === e.MAX_LAYERS), t.find('button[data-method="prev"]').unbind("click.prev").bind("click.prev", function () {
            t.find('button[data-method="next"]').removeAttr("disabled"), e.currentLayer = e.currentLayer - 1;
            var n = document.body.scrollTop;
            e.sankeyContainer_.html(""), e.initSankey("d3-sankey", e.formatSankeyData_(e.currentLayer)), e.initSankeyEvents("d3-sankey");
            var a = e.inputTargetType_.attr("data-value"), i = e.CONST.screen.width;
            "termination_event" === a && (i = -i), e.sankeyContainer_.scrollLeft(i), $(window).scrollTop(n), e.currentLayer === e.CONST.defaultLayers && $(this).attr("disabled", !0)
        }), void t.find('button[data-method="next"]').unbind("click.next").bind("click.next", function () {
            t.find('button[data-method="prev"]').removeAttr("disabled"), e.currentLayer = e.currentLayer + 1;
            var n = document.body.scrollTop;
            e.sankeyContainer_.html(""), e.initSankey("d3-sankey", e.formatSankeyData_(e.currentLayer)), e.initSankeyEvents("d3-sankey");
            var a = e.inputTargetType_.attr("data-value"), i = e.CONST.screen.width;
            "termination_event" === a && (i = -i), e.sankeyContainer_.scrollLeft(i), $(window).scrollTop(n), e.currentLayer === e.MAX_LAYERS && $(this).attr("disabled", !0)
        }))
    }, a.prototype.renderInputTargetEvent_ = function () {
        var e = this, t = e.paramObj_.source_event.event_name;
        !t && this.selectedEvents.length > 0 && (t = this.selectedEvents[0].name), this.inputTargetEvent_.eventDropdown("destroy").eventDropdown({
            virtualDisplay: !0,
            events: this.selectedEvents,
            eventName: t,
            onChange: function (t) {
                e.getProperties_([t], e.adjustByFilter)
            }
        }), e.selectedEvents.length > 0 && e.getProperties_([this.inputTargetEvent_.data("selected-event")], e.adjustByFilter)
    }, a.prototype.adjustByStatus_ = function () {
        this.eventsGroupContainer_.hide().html(""), this.eventsFilterContainer_.html(""), this.btnAddEvent_.attr("disabled", 0 === this.selectedEvents.length), this.btnAddEventFilter_.attr("disabled", 0 === this.selectedEvents.length), this.btnAddUserFilter_.attr("disabled", 0 === this.selectedEvents.length), this.renderInputTargetEvent_()
    }, a.prototype.initInputDate_ = function () {
        var e = this;
        this.inputDate_.tooltip().unbind("apply.daterangepicker").bind("apply.daterangepicker", function () {
            return 0 === e.selectedEvents.length ? void sensorsdata.info.show(sensorsdata.languages.get("请先选择分析事件组<!--{en}Please first select analyze event groups-->")) : void e.prevQuery_(e.CONST.defaultLayers, !1)
        });
        var t = sensorsdata.CONSTSET, n = this.paramObj_, a = {};
        a.startDate = moment(n.from_date, t.dateFormat), a.endDate = moment(n.to_date, t.dateFormat), a.allowRelative = !0, sensorsdata.initDateRangeInput(this.inputDate_, a)
    }, a.prototype.initEvents = function () {
        var e = this;
        e.btnAddEventFilter_.on("click", function () {
            e.eventsFilterControl_.addFilter()
        }), e.btnAddUserFilter_.on("click", function () {
            e.userFilterControl_.addFilter()
        }), e.options.container.find('[data-method="refresh"]').unbind("click.refresh").bind("click.refresh", function () {
            if (0 === e.selectedEvents.length) return void sensorsdata.info.show(sensorsdata.languages.get("请先选择分析事件组<!--{en}Please first select analyze event groups-->"));
            var t = e.buildParamObj_();
            e.paramObj_ = t, e.updateReportName_(e.bookmarkToolbar.bookmark), window.history.pushState("changed", "", "#" + $.param(t)), e.getOriginalData_(t, !1, function () {
                e.sankeyContainer_.html(""), e.initSankey("d3-sankey", e.formatSankeyData_(e.currentLayer)), e.initSankeyEvents("d3-sankey"), e.renderLayerControl_(), sensorsdata.info.show(sensorsdata.languages.get("刷新完成<!--{en}Refresh done-->"))
            })
        }), e.inputTargetType_.saDropdown({value: e.paramObj_.source_type}), e.inputSessionSection_.saDropdown(), e.initSankeyEvents("d3-sankey"), this.btnAddEvent_.unbind("click.add-event").bind("click.add-event", function () {
            if (0 === e.selectedEvents.length) return void sensorsdata.error.show(sensorsdata.languages.get("请先选择事件<!--{en}Please first select event-->"));
            for (var t = null, n = 0; n < e.selectedEvents.length; n++) if (!e.withBucketEvent_.hasOwnProperty(e.selectedEvents[n].name)) {
                t = e.selectedEvents[n].name;
                break
            }
            e.eventsGroupContainer_.append(Mustache.render(e.tplEventsGroupSelect_)).show();
            var a = e.eventsGroupContainer_.find('[data-id="selected-events-hold-place"]:last');
            a.eventDropdown("destroy").eventDropdown({
                eventName: t,
                events: e.selectedEvents,
                virtualDisplay: !0,
                onChange: function (t, n) {
                    var a = n.parents("div[data-id]").eq(0).parent();
                    e.getProperties_([t], function () {
                        var t = a.find('[data-id="behavior-group-hold-place"]');
                        t.html("");
                        var n = new sensorsdata.GroupControl;
                        n.init({
                            container: t,
                            data: {event: e.propObj_.intersection.event},
                            disabled: sensorsdata.authority.isNormal,
                            enableAdd: !0,
                            enableOverAll: !1
                        }), e.eventsGroupControl_[a.index()] = n, e.refreshEventsGroupControl_()
                    })
                }
            }), e.renderEventBucket_([t]), e.selectedEvents.length === e.eventsGroupContainer_.children().length && $(this).attr("disabled", "true")
        }), e.options.container.find("#query-submit").unbind("click.querySubmit").bind("click.querySubmit", function () {
            return 0 === e.selectedEvents.length ? void sensorsdata.info.show(sensorsdata.languages.get("请先选择分析事件组<!--{en}Please first select analyze event groups-->")) : void e.prevQuery_(e.CONST.defaultLayers, !0)
        }), this.bookmarkToolbar.on("updateSampling", function () {
            return 0 === e.selectedEvents.length ? void sensorsdata.info.show(sensorsdata.languages.get("请先选择分析事件组<!--{en}Please first select analyze event groups-->")) : void e.prevQuery_(e.CONST.defaultLayers, !0)
        }), this.bookmarkToolbar.on("updateParams", function (t) {
            t.dashboard_cache_policy ? e.paramObj_.dashboard_cache_policy = t.dashboard_cache_policy : delete e.paramObj_.dashboard_cache_policy
        }), $(window).on("resize.path", function () {
            e.sankeyContainer_.html(""), e.CONST.screen.height = $("#sa-main").height(), e.initSankey("d3-sankey", e.formatSankeyData_(e.currentLayer)), e.initSankeyEvents("d3-sankey")
        })
    }, a.prototype.adjustByFilter = function () {
        this.initInputs_(this.propObj_)
    }, a.prototype.renderEventBucket_ = function (e) {
        if (!(e instanceof Array)) throw new Error("not a array");
        var t = this;
        e.length > 0 && t.getProperties_(e, function () {
            var e = t.eventsGroupContainer_.children(":last").find('[data-id="behavior-group-hold-place"]');
            e.html("");
            var n = new sensorsdata.GroupControl;
            n.init({
                container: e,
                data: {event: t.propObj_.intersection.event},
                disabled: sensorsdata.authority.isNormal,
                enableAdd: !0,
                enableOverAll: !1
            }), t.withBucketEvent_[name] = !0, t.eventsGroupControl_.push(n), t.refreshEventsGroupControl_()
        })
    }, a.prototype.refreshEventsGroupControl_ = function () {
        var e = this;
        e.eventsGroupContainer_.children().length === e.selectedEvents.length && e.btnAddEvent_.attr("disabled", !0), e.withBucketEvent_ = {}, e.eventsGroupContainer_.children().each(function (t, n) {
            var a = $(n).find('[data-id="selected-events-hold-place"]').data("selected-event");
            e.withBucketEvent_[a] = !0
        }), e.adjustBucketStatus_(), this.eventsGroupContainer_.find('button[data-method="group-remove"]').unbind("click.remove-group").bind("click.remove-group", function () {
            var t = $(this).parent().index(),
                n = $(this).parent().find('[data-id="selected-events-hold-place"]').data("selected-event");
            delete e.withBucketEvent_[n], $(this).parent().remove(), e.eventsGroupControl_ = e.eventsGroupControl_.filter(function (e, n) {
                return n !== t
            }), e.adjustBucketStatus_(), 0 === e.eventsGroupControl_.length && (e.eventsGroupContainer_.css("display", "none"), e.withBucketEvent_ = {}), e.selectedEvents.length > e.eventsGroupContainer_.children().length && e.btnAddEvent_.removeAttr("disabled")
        })
    }, a.prototype.adjustBucketStatus_ = function () {
        var e = this, t = [], n = e.eventsGroupContainer_.find('[data-id="selected-events-hold-place"]');
        n.each(function () {
            t.push($(this).data("selected-event"))
        }), n.each(function () {
            $(this).eventDropdown("setDisabled", t, !0)
        })
    }, a.prototype.renderInputSession_ = function () {
        var e = null, t = "", n = parseInt(this.paramObj_.session_interval, 10);
        parseInt(this.paramObj_.session_interval, 10) > 3600 ? (e = "hour", t = sensorsdata.languages.get("小时<!--{en}Hour-->"), n /= 3600) : parseInt(this.paramObj_.session_interval, 10) > 60 ? (e = "minute", t = sensorsdata.languages.get("分钟<!--{en}Minute-->"), n /= 60) : (e = "second", t = sensorsdata.languages.get("秒<!--{en}second-->")), this.conditionsContainer_.find("#session-section").val(n), this.inputSessionSection_.html(t).attr("data-value", e)
    }, a.prototype.initInputs_ = function (e) {
        this.eventsFilterControl_.init({
            container: this.eventsFilterContainer_,
            propertyObj: {event: e.intersection.event},
            disabled: sensorsdata.authority.isNormal
        }), this.eventsFilterControl_.val({
            relation: this.paramObj_.source_event.filter && this.paramObj_.source_event.filter.relation,
            conditions: this.paramObj_.source_event.filter && this.paramObj_.source_event.filter.conditions
        }), this.userFilterControl_.init({
            container: this.userFilterContainer_,
            propertyObj: {user: e.intersection.user},
            disabled: sensorsdata.authority.isNormal
        }), this.userFilterControl_.val({
            relation: this.paramObj_.user_filter && this.paramObj_.user_filter.relation,
            conditions: this.paramObj_.user_filter && this.paramObj_.user_filter.conditions
        })
    }, a.prototype.buildParamObj_ = function () {
        var e = sensorsdata.CONSTSET.dateFormat, t = this.eventsFilterControl_.val(), n = {
            source_type: this.inputTargetType_.attr("data-value"),
            source_event: {event_name: this.inputTargetEvent_.data("selected-event"), filter: t},
            event_names: [],
            by_fields: [],
            col_limit: 20,
            row_limit: 7,
            from_date: this.inputDate_.data("startDate").format(e),
            to_date: this.inputDate_.data("endDate").format(e),
            user_filter: this.userFilterControl_.val(),
            bucket_params: {},
            sampling_factor: this.bookmarkToolbar.getSamplingValue()
        };
        this.selectedEvents.forEach(function (e) {
            n.event_names.push(e.name)
        }), this.eventsGroupControl_.forEach(function (e) {
            n.by_fields.push(e.val().byFields[0]), n.bucket_params = $.extend(!0, {}, n.bucket_params, e.val().bucket)
        });
        var a = this.inputSessionSection_.attr("data-value"),
            i = this.conditionsContainer_.find("#session-section").val(), r = 1;
        switch (a) {
            case"second":
                r = 1;
                break;
            case"minute":
                r = 60;
                break;
            case"hour":
                r = 3600
        }
        return n.session_interval = i * r, n
    }, a.prototype.prevQuery_ = function (e, t, n) {
        if (isNaN(e)) throw new Error(sensorsdata.languages.get("参数错误<!--{en}Parameter error-->"));
        var a = this.buildParamObj_(), i = JSON.stringify(this.paramObj_) !== JSON.stringify(a);
        if (i) {
            var r = this;
            r.paramObj_ = a, r.updateReportName_(r.bookmarkToolbar.bookmark), window.history.pushState("changed", "", "#" + $.param(a)), this.getOriginalData_(a, t, function () {
                r.sankeyContainer_.html(""), r.initSankey("d3-sankey", r.formatSankeyData_(e)), r.initSankeyEvents("d3-sankey"), r.renderLayerControl_(), $.isFunction(n) && n()
            })
        }
    }, a.prototype.getUserProps_ = function () {
        var e = this;
        return sensorsdata.ajax({
            url: "property/user/properties", useCache: !0, success: function (t) {
                e.userProps_ = t
            }
        })
    }, a.prototype.getEventProps_ = function () {
        return sensorsdata.ajax({
            url: "property/all", useCache: !0, success: sensorsdata.bind(function (e) {
                this.eventProps_ = e
            }, this)
        })
    }, a.prototype.unload = function () {
        this.options.container.find('[data-toggle="tooltip"]').tooltip("destroy"), $(window).off("resize.path"), this.inputDate_ && this.inputDate_.data("daterangepicker") && this.inputDate_.data("daterangepicker").remove()
    }, a.prototype.getOriginalData_ = function (e, t, n) {
        var a = (new Date).valueOf(), i = this;
        t = "boolean" == typeof t ? t : !0;
        var r = $.extend(!0, {}, e);
        r.use_cache = t, this.handleLoading(r, t, n);
        var s = {success: !0, use_cache: r.use_cache}, o = "path/analytics/report";
        return sensorsdata.reportAjax({
            isAsync: !0,
            url: o,
            type: "post",
            useCache: t,
            data: r,
            queueEnable: !0,
            queueKey: "POST-path-" + o,
            success: sensorsdata.bind(function (e) {
                this.reportLoading.closeLoading(),
                    a = 100 * Math.ceil(((new Date).valueOf() - a) / 100),
                    s.time_consuming = a, sensorsdata.track("user_behavior_analytics", s),
                    sensorsdata.BookmarkSave.setRefreshButton(this.options.container.find('[data-method="refresh"]'), e), i.originalGraphData_ = e, i.originalGraphData_.hasOwnProperty("links") || (i.originalGraphData_.links = []), i.originalGraphData_.nodes || (i.originalGraphData_.nodes = []), i.originalGraphData_.links.forEach(function (e) {
                    for (var t = 0; t < e.length; t++) if (e[t].is_wastage === !0) {
                        var n = e[t];
                        e[t] = e[e.length - 1], e[e.length - 1] = n
                    }
                }), i.MAX_LAYERS = i.originalGraphData_.nodes.length, i.currentLayer = i.MAX_LAYERS > i.CONST.defaultLayers ? i.CONST.defaultLayers : i.MAX_LAYERS, i.updateReportName_(i.bookmarkToolbar), $.isFunction(n) && n()
            }, this),
            error: function (e) {
                s.success = !1, s.fail_reason = e.status, s.time_consuming = "", sensorsdata.track("user_behavior_analytics", s)
            }
        })
    }, a.prototype.initSankey = function (e, t) {
        function n() {
            for (var e = d3.select(this), t = e.node().getComputedTextLength(), n = e.text(); t > 100 && n.length > 0;) n = n.slice(0, -1), e.text(n + "..."), t = e.node().getComputedTextLength()
        }

        var a = this;
        if (!e) return void sensorsdata.error.show(sensorsdata.languages.get("图像ID未指定<!--{en}The image ID is not specified-->"));
        if ($.isEmptyObject(t) || !$.isArray(t.nodes) || 0 === t.nodes.length) return void this.sankeyContainer_.html($("#tpl_no_sankey").html());
        var i = t, r = a.CONST.screen.margin, s = a.CONST.screen.width - r.left - r.right,
            o = a.CONST.screen.height - r.top - r.bottom,
            l = "initial_event" === this.inputTargetType_.attr("data-value") ? "ltr" : "rtl",
            d = d3.select("#" + e).append("svg").attr("width", s + r.left + r.right).attr("height", o + r.top + r.bottom).append("g").attr("transform", "translate(" + r.left + "," + r.top + ")"),
            c = d.append("defs").append("linearGradient").attr("id", "gradient").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%").attr("spreadMethod", "pad").attr("gradientUnits", "objectBoundingBox");
        c.append("stop").attr("offset", "0%").attr("stop-color", "#bfdcff").attr("stop-opacity", 1), c.append("stop").attr("offset", "100%").attr("stop-color", "#96bcea").attr("stop-opacity", 1);
        var p = d.append("defs").append("linearGradient").attr("id", "waste_gradient").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%").attr("spreadMethod", "pad").attr("gradientUnits", "objectBoundingBox");
        p.append("stop").attr("offset", "0%").attr("stop-color", "#F9C6C6").attr("stop-opacity", 1), p.append("stop").attr("offset", "100%").attr("stop-color", "white").attr("stop-opacity", 1);
        var u = d.append("defs").append("linearGradient").attr("id", "start_gradient").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%").attr("spreadMethod", "pad").attr("gradientUnits", "objectBoundingBox");
        u.append("stop").attr("offset", "0%").attr("stop-color", "#A9E3D1").attr("stop-opacity", 1), u.append("stop").attr("offset", "100%").attr("stop-color", "white").attr("stop-opacity", 1);
        var h = d3.sankey().nodeWidth(a.CONST.domSize).size([s, o]).graphType(l), _ = h.link();
        h.nodes(i.nodes).links(i.links).layout(20);
        var v = d.append("g").selectAll(".link").data(i.links).enter().append("path");
        v.attr("class", function (e) {
            return e.is_wastage ? "link wastage" : e.isStart ? "link start" : "link"
        }).attr("d", _).attr("link-id", function (e, t) {
            return e.id = t, "link-" + t
        }).style("stroke-width", function (e) {
            return e.hasOwnProperty("is_wastage") && e.is_wastage === !0 ? Math.min(Math.max(5, e.dy / 8), 10) : e.hasOwnProperty("isStart") && e.isStart === !0 ? Math.min(Math.max(5, e.dy / 8), 10) : void 0
        }).style("stroke", function (e) {
            return e.hasOwnProperty("is_wastage") && e.is_wastage === !0 ? "url(#waste_gradient)" : e.hasOwnProperty("isStart") && e.isStart === !0 ? "url(#start_gradient)" : void 0
        }).sort(function (e, t) {
            return t.dy - e.dy
        });
        var y = d.append("g").selectAll(".node").data(i.nodes).enter().append("g").attr("class", "node").attr("data-id", function (e) {
            return e.event_name
        }).attr("transform", function (e) {
            return "translate(" + e.x + "," + e.y + ")"
        }).sort(function (e, t) {
            return t.dy - e.dy
        });
        y.append("rect").attr("height", function (e) {
            return Math.max(e.dy / 2, 1)
        }).attr("width", h.nodeWidth()).style("fill", function () {
            return "url(#gradient)"
        }).attr("rx", 2).attr("ry", 2).attr("data-id", function (e) {
            return e.id
        }).attr("data-cname", function (e) {
            return e.event_cname
        }).style("transform", function (e) {
            return "translate(0," + e.dy / 2 + ")"
        }).style("stroke", function () {
            return "rgba(0,0,0,0.2)"
        }), y.append("text").attr("x", "12px").attr("y", "12px").attr("dy", ".35em").text(function (e) {
            return e.event_cname
        }).style("font-weight", "400").each(n), y.append("text").attr("x", "12px").attr("y", function (e) {
            return e.by_values ? "2.5em" : "2em"
        }).text(function (e) {
            return e.by_values
        }).style("font-size", "13px").style("fill", "rgba(0,0,0,0.54)").each(n), y.append("text").attr("x", "12px").attr("y", function (e) {
            return e.by_values ? "3.5em" : "2em"
        }).attr("dy", ".35em").text(function (e) {
            return e.value
        });
        var f = null, m = this.inputTargetType_.attr("data-value"), g = [];
        switch (m) {
            case"termination_event":
                g = a.originalGraphData_.nodes[a.originalGraphData_.nodes.length - 1], f = g[g.length - 1].event_name;
                break;
            case"initial_event":
                g = a.originalGraphData_.nodes[0], f = g[g.length - 1].event_name
        }
        d3.select('[data-id="' + f + '"]').append("svg:foreignObject").attr("width", 100).attr("height", "2em").attr("y", function (e) {
            return e.dy / 2 - 40
        }).attr("x", "1.5em").append("xhtml:div").attr("class", "label_event").html(function () {
            return "<span>" + a.inputTargetType_.html() + "</span><span class='icon-event-direction'></span>"
        })
    }, a.prototype.initSankeyEvents = function (e) {
        var t = this,
            n = d3.select("#" + e).append("div").attr("class", "d3-node-tooltip").style("z-index", 1e3).style("display", "none"),
            a = d3.select("#" + e).append("div").attr("class", "d3-link-tooltip").style("z-index", 1e3).style("display", "none"),
            i = d3.select("#" + e).append("div").attr("class", "d3-context-menu").style("z-index", 1200).style("display", "none"),
            r = function (e, t) {
                if (!(e instanceof Array)) throw new Error(sensorsdata.languages.get("arr 不是数组类型<!--{en}arr is not array type-->"));
                if (0 === e.size) return !1;
                var n = !1;
                return e.forEach(function (e) {
                    e === t && (n = !0)
                }), n
            }, s = function (e) {
                var n = this, a = d3.selectAll("rect");
                d3.selectAll(".link").style("stroke", t.CONST.color.link_light_color).style("fill", t.CONST.color.link_light_color).style("stroke-opacity", t.CONST.opacity.midStrokeOpacity).style("fill-opacity", t.CONST.opacity.midStrokeOpacity);
                var i = [], s = [], l = t.CONST.opacity.transStrokeOpacity, d = t.CONST.opacity.transStrokeOpacity,
                    c = null;
                "1" === d3.select(n).attr("data-clicked") ? (t.flag = !1, d3.select(n).attr("data-clicked", "0"), c = t.CONST.color.link_light_color, d = t.CONST.opacity.midStrokeOpacity, l = t.CONST.opacity.darkStrokeOpacity, a.filter(function () {
                    return n !== this
                }).transition().style("opacity", function (e) {
                    return $('[data-id="' + e.id + '"]').siblings().css("opacity", t.CONST.opacity.darkStrokeOpacity), t.CONST.opacity.darkStrokeOpacity
                })) : (d3.select(n).attr("data-clicked", "1"), t.flag = !0, c = t.CONST.color.link_dark_color, d = t.CONST.opacity.midStrokeOpacity, l = t.CONST.opacity.darkStrokeOpacity, a.filter(function () {
                    return n !== this
                }).transition().style("opacity", function (e) {
                    return $('[data-id="' + e.id + '"]').siblings().css("opacity", t.CONST.opacity.lightStrokeOpacity), t.CONST.opacity.lightStrokeOpacity
                })), d3.selectAll("g.node").filter(function () {
                    return n !== this
                }).attr("data-clicked", null), o(e.id, l);
                var p = [{linkType: "sourceLinks", nodeType: "target"}, {linkType: "targetLinks", nodeType: "source"}],
                    u = [];
                p.forEach(function (n) {
                    for (e[n.linkType].forEach(function (e) {
                        i = t.mergeArray(i, [e[n.nodeType]]), o(e[n.nodeType].id, l), d3.select('[link-id="link-' + e.id + '"]').transition().style("stroke-opacity", d).style("stroke", c).style("fill-opacity", d).style("fill", c), u.push(e.id)
                    }); i.length;) s = [], i.forEach(function (e) {
                        e[n.linkType].forEach(function (e) {
                            s = t.mergeArray(s, [e[n.nodeType]]), o(e[n.nodeType].id, l), u.push(e.id), d3.select('[link-id="link-' + e.id + '"]').transition().style("stroke-opacity", d).style("stroke", c).style("fill-opacity", d).style("fill", c)
                        })
                    }), i = s
                }), t.flag ? d3.selectAll(".link").filter(function (e) {
                    return !r(u, e.id)
                }).transition().style("stroke-opacity", function () {
                    return t.CONST.opacity.lightStrokeOpacity
                }).style("fill-opacity", function () {
                    return t.CONST.opacity.lightStrokeOpacity
                }) : d3.selectAll(".link").filter(function (e) {
                    return !r(u, e.id)
                }).transition().style("stroke-opacity", function () {
                    return t.CONST.opacity.midStrokeOpacity
                }).style("fill-opacity", function () {
                    return t.CONST.opacity.midStrokeOpacity
                })
            }, o = function (e, t) {
                d3.select('[data-id="' + e + '"]').transition().style("opacity", t), $('[data-id="' + e + '"]').siblings().css("opacity", t)
            }, l = d3.selectAll(".link"), d = d3.selectAll("g.node"), c = function (e, n) {
                i.selectAll("div[data-method]").on("click", function () {
                    var a = $(this).attr("data-method");
                    switch (a) {
                        case"toggle-current-path":
                            s.apply(n, [e]);
                            break;
                        case"cancel-current-path":
                            t.flag = !1, d3.selectAll("rect").transition().style("opacity", function (e) {
                                return $('[data-id="' + e.id + '"]').siblings().animate({opacity: t.CONST.opacity.darkStrokeOpacity}), t.CONST.opacity.darkStrokeOpacity
                            }), d3.selectAll(".link").transition().style("stroke-opacity", t.CONST.opacity.midStrokeOpacity).style("stroke", t.CONST.color.link_light_color).style("fill-opacity", t.CONST.opacity.midStrokeOpacity).style("fill", t.CONST.color.link_light_color), d3.selectAll("g.node").attr("data-clicked", null);
                            break;
                        case"detail":
                            e.isInitialEvent = "initial_event" === t.paramObj_.source_type, e.isEnd = !e.sourceLinks.length, e.sourceLinks.forEach(function (n, a) {
                                var i = e.sourceLinks[a].target, r = n.value / e.remain;
                                if (e.sourceLinks[a].percent = sensorsdata.isFloat(r) ? (100 * r).toFixed(2) : r, i.hasOwnProperty("by_values")) {
                                    var s = i.event_name, o = i.id.slice(s.length + 1 + i.id.indexOf("_")),
                                        l = o.slice(1, o.lastIndexOf("_")), d = t.eventProps_.filter(function (e) {
                                            return e.name === l
                                        }), c = d.length > 0 ? d[0].cname : sensorsdata.languages.get("未知<!--{en}Unknown-->");
                                    e.sourceLinks[a].target.by_value_key = c
                                }
                            }), e.targetLinks.forEach(function (n, a) {
                                var i = e.targetLinks[a].source, r = n.value / e.remain;
                                if (e.targetLinks[a].percent = sensorsdata.isFloat(r) ? (100 * r).toFixed(2) : r, i.hasOwnProperty("by_values")) {
                                    var s = i.event_name, o = i.id.slice(s.length + 1 + i.id.indexOf("_")),
                                        l = o.slice(1, o.lastIndexOf("_")), d = t.eventProps_.filter(function (e) {
                                            return e.name === l
                                        }), c = d.length > 0 ? d[0].cname : sensorsdata.languages.get("未知<!--{en}Unknown-->");
                                    e.targetLinks[a].source.by_value_key = c
                                }
                            }), t.nodeDetailModal_.html(Mustache.render(t.tplNodeDetail_, e)), t.nodeDetailModal_.modal("show"), t.nodeDetailModal_.on("shown.bs.modal", function () {
                                t.nodeDetailModal_.find('span[data-method="user-list"]').tooltip({
                                    placement: "bottom",
                                    title: sensorsdata.languages.get("打开用户列表<!--{en}Open user list-->"),
                                    trigger: "hover",
                                    container: "body"
                                }), t.nodeDetailModal_.find('span[data-method="user-list"]').unbind("click.user-list").bind("click.user-list", function () {
                                    var n = $(this), a = {
                                            slice_element_filter: [],
                                            next_slice_element_filter: [],
                                            session_level: null,
                                            source_type: "initial_event",
                                            source_event: {event_name: t.inputTargetEvent_.data("selected-event")},
                                            event_names: t.selectedEvents,
                                            by_fields: [],
                                            bucket_params: {},
                                            user_filter: {},
                                            session_interval: 0,
                                            from_date: null,
                                            to_date: null,
                                            detail: !0
                                        }, i = $.extend(!0, {}, t.paramObj_), r = "initial_event" !== t.paramObj_.source_type,
                                        s = null, o = null, l = null;
                                    switch (delete i.slice_element_filter, delete i.next_slice_element_filter, delete i.edge_type, delete i.is_node, delete i.is_next_aggregate, delete i.is_aggregate, delete i.is_wastage, a = $.extend(!0, {}, a, i), a.session_level = parseInt(e.id.split("_")[0], 10), r && (a.session_level = parseInt(e.id.split("_")[0], 10) - 1), r ? e.hasOwnProperty("event_name") && "more" === e.event_name ? (s = a.session_level, a.session_level = length - 1 - a.session_level, t.originalGraphData_.nodes[s].forEach(function (e) {
                                        if ("more" !== e.event_name) {
                                            var t = {slice_event_name: e.event_name, slice_by_value: e.by_values || null};
                                            a.next_slice_element_filter.push(t)
                                        }
                                    }), a.is_next_aggregate = !0) : (o = {
                                        slice_event_name: e.event_name,
                                        slice_by_value: e.by_values || null
                                    }, a.next_slice_element_filter.push(o), a.is_next_aggregate = !1) : e.hasOwnProperty("event_name") && "more" === e.event_name ? (t.originalGraphData_.nodes[a.session_level].forEach(function (e) {
                                        if ("more" !== e.event_name) {
                                            var t = {slice_event_name: e.event_name, slice_by_value: e.by_values || null};
                                            a.slice_element_filter.push(t)
                                        }
                                    }), a.is_aggregate = !0) : (l = {
                                        slice_event_name: e.event_name,
                                        slice_by_value: e.by_values || null
                                    }, a.slice_element_filter.push(l), a.is_aggregate = !1), n.attr("data-info")) {
                                        case"all":
                                            delete a.next_slice_element_filter, a.slice_element_filter.push({
                                                slice_event_name: e.event_name,
                                                slice_by_value: e.by_values || null
                                            });
                                            break;
                                        case"event":
                                            a.is_node = !1, r ? "more" === n.attr("data-event") ? (s = a.session_level - 1, t.originalGraphData_.nodes[s].forEach(function (e) {
                                                if ("more" !== e.event_name) {
                                                    var t = {
                                                        slice_event_name: e.event_name,
                                                        slice_by_value: e.by_values || null
                                                    };
                                                    a.slice_element_filter.push(t)
                                                }
                                            }), a.is_aggregate = !0) : (l = {
                                                slice_event_name: n.attr("data-event"),
                                                slice_by_value: n.attr("data-field") === sensorsdata.languages.get("无<!--{en}None-->") ? null : n.attr("data-field")
                                            }, a.slice_element_filter.push(l), a.is_aggregate = !1) : "more" === n.attr("data-event") ? (s = a.session_level + 1, t.originalGraphData_.nodes[s].forEach(function (e) {
                                                if ("more" !== e.event_name) {
                                                    var t = {
                                                        slice_event_name: e.event_name,
                                                        slice_by_value: e.by_values || null
                                                    };
                                                    a.next_slice_element_filter.push(t)
                                                }
                                            }), a.is_next_aggregate = !0) : (o = {
                                                slice_event_name: n.attr("data-event"),
                                                slice_by_value: n.attr("data-field") === sensorsdata.languages.get("无<!--{en}None-->") ? null : n.attr("data-field")
                                            }, a.next_slice_element_filter.push(o), a.is_next_aggregate = !1);
                                            break;
                                        case"retention":
                                            a.edge_type = "RETENTION", a.is_wastage = !1;
                                            break;
                                        case"wastage":
                                            a.edge_type = "WASTAGE"
                                    }
                                    t.nodeDetailModal_.tooltip("destroy"), t.nodeDetailModal_.modal("hide"), t.options.initPage("/behavior-path/users/#" + $.param(a))
                                })
                            });
                            break;
                        case"more":
                    }
                    i.style("display", "none"), t.isMenuShow = !1
                })
            };
        d.on("click", function (e) {
            var a = d3.event.pageX, r = d3.event.pageY;
            n.style("display", "none");
            var s = "more" === $(this).data("id"), o = "1" === $(this).attr("data-clicked");
            i.html(Mustache.render($("#tpl-node-context-menu").html(), {
                more: s,
                clicked: o
            })).style("left", a + "px").style("top", r + 20 + "px").style("display", "block"), t.isMenuShow = !0, c(e, this)
        }), l.on("mouseover", function (e) {
            var n = parseFloat(d3.select(this).style("stroke-opacity")), i = d3.select(this).style("stroke");
            if (n !== t.CONST.opacity.lightStrokeOpacity && !t.isMenuShow) {
                var r = d3.event.pageX, s = d3.event.pageY;
                e.percentage = e.isStart === !0 ? Math.round(e.value / e.target.value * 1e4) / 100 : Math.round(e.value / e.source.value * 1e4) / 100, a.html(Mustache.render($("#tpl-d3-link-tooltip").html(), e)).style("left", r + "px").style("top", s + 20 + "px").style("display", "block").style("font-size", 10).style("box-shadow", "box-shadow: 0px 0px 211px 111px rgba(0,0,0,0.7)"), i === t.CONST.color.link_light_rgb && d3.select(this).style("stroke", t.CONST.color.link_dark_color).style("fill", t.CONST.color.link_dark_color)
            }
        }).on("mousemove", function () {
            var e = d3.event.pageX, n = d3.event.pageY, i = t.sankeyContainer_.find("div.d3-link-tooltip");
            e + i.width() > $(window).scrollLeft() + $(window).width() && (e -= i.width()), a.style("left", e + "px").style("top", n + 20 + "px")
        }).on("mouseout", function () {
            a.style("display", "none");
            var e = parseFloat(d3.select(this).style("stroke-opacity"));
            e !== t.CONST.opacity.midStrokeOpacity || t.flag || d3.select(this).style("stroke", t.CONST.color.link_light_color).style("fill", t.CONST.color.link_light_color)
        }), d.on("mouseover", function (e) {
            0 === e.sourceLinks.length ? e.isEnd = !0 : (e.remain = e.value - e.waste, e.wastage_percent = Math.round(e.waste / e.value * 1e4) / 100, e.remain_percent = Math.round(e.remain / e.value * 1e4) / 100);
            var a = parseFloat(d3.select('[data-id="' + e.id + '"]').style("opacity"));
            a === t.CONST.opacity.lightStrokeOpacity || t.isMenuShow || (e.isInitialEvent = "initial_event" === t.paramObj_.source_type, n.html(Mustache.render($("#tpl-d3-node-tooltip").html(), e)).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + 20 + "px").style("display", "block").style("font-size", 10).style("box-shadow", "box-shadow: 0px 0px 211px 111px rgba(0,0,0,0.7)"))
        }).on("mousemove", function () {
            var e = d3.event.pageX, a = d3.event.pageY, i = t.sankeyContainer_.find("div.d3-node-tooltip");
            e + i.width() > $(window).scrollLeft() + $(window).width() && (e -= i.width()), n.style("left", e + "px").style("top", a + 20 + "px")
        }).on("mouseout", function () {
            n.style("display", "none")
        }), $.fn.slider = function () {
            return this.each(function () {
                var e = $(this), n = !1, a = 0;
                e.mousedown(function (e) {
                    n = !0, a = e.clientX;
                    var r = t.sankeyContainer_.scrollLeft(), s = !1;
                    $(this).unbind("mousemove").bind("mousemove", function (e) {
                        if (n) {
                            var i = e.clientX - a;
                            t.sankeyContainer_.scrollLeft(r - i), s = !0
                        }
                    }), $(this).unbind("mouseup").bind("mouseup", function (e) {
                        if (n = !1, !s) {
                            var a = $(e.target || e.srcElement);
                            (a.is("svg") || 1 === a.parents("svg").length) && t.isMenuShow && (i.style("display", "none"), t.isMenuShow = !1)
                        }
                        s = !1
                    })
                })
            })
        }, t.sankeyContainer_.slider()
    }, a.prototype.formatSankeyData_ = function (e) {
        var t = {nodes: [], links: []};
        if (0 === this.selectedEvents.length) return t;
        if ($.isEmptyObject(this.originalGraphData_)) return {};
        if ((!e || e > this.originalGraphData_.nodes.length) && (e = this.originalGraphData_.nodes.length, this.MAX_LAYERS = this.originalGraphData_.nodes.length), 0 === this.originalGraphData_.nodes.length || 0 === this.originalGraphData_.links.length) return this.originalGraphData_;
        var n = 130 * (e - 1) + 130 * e;
        this.CONST.screen.width = this.sankeyContainer_.width() > n ? this.sankeyContainer_.width() : n, this.CONST.screen.height = 1.5 * $("#sa-main").height();
        var a, i = this.originalGraphData_;
        switch (this.paramObj_.source_type) {
            case"initial_event":
                for (a = 0; e - 1 > a; a++) t.nodes = t.nodes.concat(i.nodes[a]), t.links = t.links.concat(i.links[a]);
                t.nodes = t.nodes.concat(i.nodes[a]), 1 === t.nodes.length && (t.links = t.links.concat(i.links[0]));
                break;
            case"termination_event":
                var r = i.nodes.length;
                for (a = r - e; r - 1 > a; a++) t.nodes = t.nodes.concat(i.nodes[a]), t.links = t.links.concat(i.links[a]);
                t.nodes = t.nodes.concat(i.nodes[r - 1]), 0 === t.links.length && t.links.push({
                    isStart: !0,
                    source: "1_start",
                    target: t.nodes[0].id,
                    times: t.nodes[0].value
                })
        }
        this.nodeMap = {};
        var s = this;
        return t.nodes.forEach(function (e) {
            s.nodeMap[e.id] = e, e.event_cname = "more" === e.event_name ? sensorsdata.languages.get("更多<!--{en}More-->") : sensorsdata.findEventCname(e.event_name, s.allEvents_) || "未知"
        }), t.links = t.links.map(function (e) {
            var t = {source: s.nodeMap[e.source], target: s.nodeMap[e.target], value: e.times};
            return e.hasOwnProperty("is_wastage") && e.is_wastage === !0 ? (t.is_wastage = !0, s.nodeMap[e.source].waste = e.times) : e.hasOwnProperty("isStart") ? e.hasOwnProperty("isStart") && (t.is_wastage = !1, t.isStart = !0) : (t.is_wastage = !1, s.nodeMap[e.source].waste = 0), t
        }), t
    }, a.prototype.dealParam_ = function (e) {
        var t = $.extend(!0, {}, e), n = ["initial_event", "termination_event"], a = this;
        a.allEvents_ = $.extend(!0, [], sensorsdata.cache.events), this.selectedEvents = [], t.hasOwnProperty("event_names") && t.event_names.length > 0 ? t.event_names.forEach(function (e) {
            a.selectedEvents.push({name: e, cname: sensorsdata.findEventCname(e, a.allEvents_)})
        }) : (t.event_names = [], a.selectedEvents = []);
        var i = sensorsdata.buildDefaultTimeRange();
        if (t.hasOwnProperty("user_filter") || (t.user_filter = {}), t.hasOwnProperty("from_date") || (t.from_date = moment(i[0]).format(sensorsdata.CONSTSET.dateFormat)), t.hasOwnProperty("to_date") || (t.to_date = moment(i[1]).format(sensorsdata.CONSTSET.dateFormat)), t.hasOwnProperty("source_event") && t.source_event.event_name || (t.source_event = {}, t.source_event.event_name = "", t.source_event.filter = {}), t.source_event.hasOwnProperty("filter") || (t.source_event.filter = {}), t.hasOwnProperty("source_type") && -1 !== n.indexOf(t.source_type) || (t.source_type = n[0]), t.sampling_factor = t.sampling_factor ? sensorsdata.BookmarkSave.dealSamplingValue(t.sampling_factor) : 64, t.by_fields = t.hasOwnProperty("by_fields") ? t.by_fields.filter(function (e) {
            return "" !== e
        }) : [], $.isEmptyObject(t.bucket_params)) t.bucket_params = {}; else for (var r in t.bucket_params) if (t.bucket_params.hasOwnProperty(r)) {
            var s = t.bucket_params[r], o = sensorsdata.buildBucketPopoverValue(s);
            o.length > 0 ? t.bucket_params[r] = o : delete t.bucket_params[r]
        }
        return t.session_interval = !t.hasOwnProperty("session_interval") || isNaN(t.session_interval) ? 1200 : parseInt(t.session_interval, 10), t.row_limit = 7, t.col_limit = 20, t
    }, a.prototype.getProperties_ = function (e, t) {
        if (!$.isArray(e) || 0 === e.length) throw console.info(e), sensorsdata.languages.get("获取事件属性的参数错误<!--{en}The parameter of obtaining event property  error-->");
        var n = e.filter(function (e, t, n) {
            return n.indexOf(e) === t
        });
        sensorsdata.ajax({
            useCache: !0,
            url: "event/properties?events=" + n.join(",") + "&method=mixed",
            success: sensorsdata.bind(function (e) {
                if ($.isEmptyObject(e)) throw sensorsdata.error.show(sensorsdata.languages.get("数据格式错误，请联系技术人员<!--{en}Data in wrong format, please contact with technicians-->")), console.info(e), "ajax return error json.";
                this.propObj_ = e, t.call(this)
            }, this)
        })
    }, a.prototype.reload = function () {
        this.init()
    }, a.prototype.mergeArray = function (e, t) {
        for (var n = e.concat(t), a = 0; a < n.length; ++a) for (var i = a + 1; i < n.length; ++i) n[a].id === n[i].id && n.splice(i--, 1);
        return n
    }, a.prototype.handleLoading = function (e, t, n) {
        var a = parseInt(e.sampling_factor, 10) || 64;
        this.reportLoading.options.sampling_factor = a, 64 === a ? (this.reportLoading.options.quickType = "sampling_factor", this.reportLoading.options.openQuickQuery = function () {
            this.reportLoading.options.sampling_factor = e.sampling_factor = 16, this.bookmarkToolbar && this.bookmarkToolbar.samplingSlider_.setValue(4, !0, !0), this.getOriginalData_(e, t, n)
        }.bind(this)) : this.reportLoading.options.quickType = "none", this.reportLoading.showLoading()
    }, n.exports = a
});
;
/*!pages/webClick/webClick.js*/
define("pages/webClick/webClick", function (e, t, a) {
    function s(e) {
        sensorsdata.BasePage.call(this), this.pageName = window.location.pathname, this.options = e, this.options.container = e.container || $("body"), this.options.container.html($("#tpl-web-click").html()), this.state = this.options.state || {}, this.bookmarkToolbar = {}, this.tplTable_ = $("#tpl-web-click-table").html(), this.tplPageGroup_ = $("#tpl-web-click-page-group").html(), this.paramObj_ = {}, this.eventProps_ = {}, this.userProps_ = [], this.pageGroupProps_ = [], this.$btnRefresh_ = this.options.container.find('button[data-method="refresh"]'), this.$linkDownload_ = this.options.container.find('a[data-method="download"]').data("table-update", !0), this.$inputPageType_ = this.options.container.find("#input-page-type"), this.$btnQuery_ = this.options.container.find("#btn-query"), this.$btnAddGroup_ = this.options.container.find("#btn-add-page-group"), this.$addEventFilter_ = this.options.container.find("#btn-add-event-filter"), this.$addUserFilter_ = this.options.container.find("#btn-add-user-filter"), this.$eventFilter_ = this.options.container.find("#event-filter"), this.$userFilter_ = this.options.container.find("#user-filter"), this.$inputDate_ = this.options.container.find("#input-date-range"), this.$tableContainer_ = this.options.container.find("#table-container"), this.$paginationContainer_ = this.options.container.find("#table-pagination"), this.reportNoData_ = this.options.container.find("div.report-no-data"), this.$pageGroupContainer_ = this.options.container.find("#page-group-container"), this.eventFilter_ = new sensorsdata.FilterGroupControl, this.userFilter_ = new sensorsdata.FilterGroupControl, this.pageGroupFilter_ = null, this.segObj_ = {}, this.pageGroups_ = [], this.tableSortIndex_ = 1, this.tableSortType_ = "descend", this.tableRows_ = [], this.floatLayer_ = null, this.reportLoading = new r({
            container: this.options.container.find(".report-chart").eq(0),
            needHideDom: [this.options.container.find(".report-chart").eq(1), this.options.container.find(".report-chart").eq(0).find("header")],
            sampling_factor: "none"
        }), this.init()
    }

    var n = e("components/bookmarkToolbar/bookmarkToolbar"), r = e("components/reportLoading/reportLoading");
    sensorsdata.inherits(s, sensorsdata.BasePage), s.prototype.init = function () {
        s.superClass_.init.call(this), this.$btnQuery_.toggle(sensorsdata.cache.config.auto_refresh === !1), this.paramObj_ = s.dealParam(sensorsdata.unparam(location.hash));
        var e = "#" + $.param(this.paramObj_);
        window.history.replaceState(e, "", e);
        var t = function (e) {
            return "$WebClick" === e.name || "$pageview" === e.name
        }, a = this.options.events, r = 2 === a.filter(t).length;
        if (r || sensorsdata.ajax({
            url: "events/all", async: !1, success: function (e) {
                $.isArray(e) && e.length > 0 && (r = 2 === e.filter(t).length)
            }
        }), !r) {
            var i = "https://www.sensorsdata.cn/manual/js_sdk.html#143-%E7%82%B9%E5%87%BB%E5%9B%BE%E5%8F%82%E6%95%B0%E5%A4%A7%E4%BA%8E-17-%E7%89%88%E6%9C%AC%E5%8F%AF%E7%94%A8";
            return sensorsdata.info.show(sensorsdata.util.format(sensorsdata.languages.get('未启用网页热力分析功能，请参照 <a target="_blank" href="#{url}">点击图参数</a> 开启此功能'), {url: i})), this.setHolderPlace_(!0, !0, sensorsdata.languages.get("未启用网页热力分析功能<!--{en}Web page thermal analysis function not enabled-->"), sensorsdata.util.format(sensorsdata.languages.get('参照 <a target="_blank" href="#{url}">点击图参数</a> 开启此功能'), {url: i})), void this.options.closeLoading()
        }
        var o = this, d = this.paramObj_;
        sensorsdata.ajax({
            useCache: !0,
            url: "event/properties?events=$WebClick,$pageview&method=mixed",
            success: function (e) {
                o.eventProps_ = $.extend(!0, [], e.intersection.event), o.eventProps_.map(function (e) {
                    e.event_id = -1, e.event_name = sensorsdata.CONSTSET.eventEmptyValue
                }), o.userProps_ = e.intersection.user, e.original && e.original.$WebClick && $.isArray(e.original.$WebClick.event) && (o.pageGroupProps_ = e.original.$WebClick.event.filter(function (e) {
                    return "$url" === e.name || "$url_path" === e.name
                })), o.renderInput_(d), o.initEvent_(), sensorsdata.cache.config.auto_refresh === !0 ? o.getPages_(d) : o.options.closeLoading(), o.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh)
            }
        });
        var l = this.state;
        this.bookmarkToolbar = n.create({
            bookmarkDisplay: !1,
            dashid: l.dashid,
            fromDashboard: "dashboard" === l.from && !!l.dashid,
            showSaveAndAdd: "dashboard" === l.from && "add" === l.action && !!l.dashid,
            samplingDisplay: !1,
            onRefreshClick: sensorsdata.bind(function (e) {
                o.getPages_({}, e)
            }, this),
            onDownloadClick: sensorsdata.bind(function () {
                var e = [{value: sensorsdata.languages.get("没有查找到数据<!--{en}No data was found-->")}], t = [];
                if (o.tableRows_.length > 0) {
                    var a = "group" === o.paramObj_.page_type;
                    e = [{
                        isHead: !0,
                        value: sensorsdata.languages.get(a ? "分组名<!--{en}Clustering name-->" : "页面名<!--{en}Page name-->")
                    }, {value: sensorsdata.languages.get(a ? "背景页面地址<!--{en}URL of the background page-->" : "页面地址<!--{en}URL of the page-->")}, {value: sensorsdata.languages.get("浏览量<!--{en}Pageviews-->")}, {value: sensorsdata.languages.get("用户数<!--{en}User Number-->")}, {value: sensorsdata.languages.get("点击次数<!--{en}Number of clicks-->")}], o.tableRows_.map(function (e) {
                        var a = [];
                        a.push({value: e[0].value}), a.push({value: e[0].url});
                        for (var s = 1, n = e.length; n > s; s++) a.push({value: e[s].value});
                        t.push(a)
                    })
                }
                var s = {heads: e, rows: t},
                    n = sensorsdata.languages.get("网页热力分析_<!--{en}Web Click analysis_-->") + o.$inputDate_.val();
                return sensorsdata.table2csv(s, n), !0
            }, this),
            sessionDropdownDisplay: !1,
            container: $("#bookmark-save-bar"),
            params: this.paramObj_,
            type: this.pageName
        })
    }, s.prototype.reload = function () {
        window.location.pathname === this.pageName && (this.paramObj_ = s.dealParam(sensorsdata.unparam(location.hash)), this.renderInput_(this.paramObj_), sensorsdata.cache.config.auto_refresh === !0 && this.getPages_(this.paramObj_), this.setHolderPlace_(sensorsdata.cache.config.auto_refresh, !sensorsdata.cache.config.auto_refresh))
    }, s.prototype.unload = function () {
        $.isEmptyObject(this.bookmarkToolbar) || this.bookmarkToolbar.destroy(), this.options.container.find("[data-toggle=tooltip]").tooltip("destroy")
    }, s.prototype.renderInput_ = function (e) {
        var t = this;
        this.$btnAddGroup_.toggle("group" === e.page_type), this.$inputPageType_.saDropdown({
            value: e.page_type,
            onSelected: function (e) {
                t.$btnAddGroup_.toggle("group" === e), t.getPages_()
            }
        }), this.eventFilter_.init({
            container: this.$eventFilter_,
            propertyObj: {event: this.eventProps_},
            disabled: sensorsdata.authority.isNormal
        }), this.eventFilter_.val(e.filter), this.userFilter_.init({
            container: this.$userFilter_,
            propertyObj: {user: this.userProps_},
            disabled: sensorsdata.authority.isNormal
        }), this.userFilter_.val(e.user_filter), this.initDate_(), sensorsdata.authority.isNormal && this.options.container.find("button,input,select").attr("disabled", !0)
    }, s.prototype.initEvent_ = function () {
        var e = this;
        this.$linkDownload_.unbind("click").bind("click", function () {
            if (!e.$linkDownload_.data("table-update")) return !0;
            var t = [{value: sensorsdata.languages.get("没有查找到数据<!--{en}No data was found-->")}], a = [];
            if (e.tableRows_.length > 0) {
                var s = "group" === e.paramObj_.page_type;
                t = [{
                    isHead: !0,
                    value: sensorsdata.languages.get(s ? "分组名<!--{en}Clustering name-->" : "页面名<!--{en}Page name-->")
                }, {value: sensorsdata.languages.get(s ? "背景页面地址<!--{en}URL of the background page-->" : "页面地址<!--{en}URL of the page-->")}, {value: sensorsdata.languages.get("浏览量<!--{en}Pageviews-->")}, {value: sensorsdata.languages.get("用户数<!--{en}User Number-->")}, {value: sensorsdata.languages.get("点击次数<!--{en}Number of clicks-->")}], e.tableRows_.map(function (e) {
                    var t = [];
                    t.push({value: e[0].value}), t.push({value: e[0].url});
                    for (var s = 1, n = e.length; n > s; s++) t.push({value: e[s].value});
                    a.push(t)
                })
            }
            var n = {heads: t, rows: a},
                r = sensorsdata.languages.get("网页热力分析-<!--{en}Web Click analysis-->") + e.$inputDate_.val();
            return sensorsdata.table2csv(n, r), !0
        }), this.$btnAddGroup_.unbind("click").bind("click", function () {
            e.editPageGroup_()
        }), this.$btnQuery_.unbind("click").bind("click", function () {
            e.getPages_()
        }), this.$addEventFilter_.unbind("click").bind("click", function () {
            e.eventFilter_.addFilter()
        }), this.$addUserFilter_.unbind("click").bind("click", function () {
            e.userFilter_.addFilter()
        }), this.eventFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(e.prevQuery_, this)), this.userFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(e.prevQuery_, this)), this.$tableContainer_.unbind("click").bind("click", sensorsdata.bind(this.tableContainerClick_, this)), this.$pageGroupContainer_.unbind("click").bind("click", sensorsdata.bind(this.pageGroupContainerClick_, this)), this.options.container.find('[data-toggle="tooltip"]').tooltip(), "function" == typeof this.bookmarkToolbar.on && this.bookmarkToolbar.on("updateParams", function (t) {
            t.dashboard_cache_policy ? e.paramObj_.dashboard_cache_policy = t.dashboard_cache_policy : delete e.paramObj_.dashboard_cache_policy
        })
    }, s.prototype.initDate_ = function () {
        var e = sensorsdata.CONSTSET.dateRangeLimit.day, t = this.paramObj_, a = {};
        a.startDate = moment(t.from_date, sensorsdata.CONSTSET.dateFormat), a.endDate = moment(t.to_date, sensorsdata.CONSTSET.dateFormat), a.rangeLimit = e, a.allowRelative = !0, sensorsdata.initDateRangeInput(this.$inputDate_, a), this.$inputDate_.unbind("apply.daterangepicker").bind("apply.daterangepicker", sensorsdata.bind(this.prevQuery_, this)), this.$inputDate_.unbind("truncate.daterangepicker").bind("truncate.daterangepicker", function () {
            sensorsdata.info.show(sensorsdata.languages.get("时间范围最多<!--{en}Maximum range of time-->") + e + sensorsdata.languages.get("天<!--{en}Day-->"))
        })
    }, s.prototype.getPages_ = function (e, t) {
        $.isEmptyObject(e) && (e = this.buildParamObj_()), this.paramObj_ = e, "group" === e.page_type ? sensorsdata.ajax({
            queueEnable: !0,
            url: "page_group",
            useCache: !1,
            complete: sensorsdata.bind(function () {
                $.isFunction(t) && t()
            }, this),
            success: sensorsdata.bind(function (a) {
                this.pageGroups_ = $.extend(!0, [], a);
                var s = !$.isArray(a) || 0 === a.length;
                this.$tableContainer_.parent().toggle(!s), this.setHolderPlace_(!0, s), s ? (this.segObj_ = {}, this.$tableContainer_.html(""), this.setHolderPlace_(!0, !0, sensorsdata.languages.get("没有页面组<!--{en}No page groups-->"), sensorsdata.languages.get("请先点击“+添加页面组”添加页面组<!--{en}Please first click“+add page group” to add the group-->")), this.$btnQuery_.removeClass("disabled").text(sensorsdata.languages.get("查询<!--{en}Query-->")), this.options.closeLoading()) : this.getPageItems_(e, t)
            }, this)
        }) : this.getPageItems_(e, t)
    }, s.prototype.getPageItems_ = function (e, t) {
        this.reportLoading.showLoading(), this.$btnQuery_.addClass("disabled").text(sensorsdata.languages.get("查询中…<!--{en}Querying-->")), $.isEmptyObject(e) && (e = this.buildParamObj_()), this.paramObj_ = e;
        var a = "#" + $.param(e);
        window.location.hash !== a && window.history.pushState(a, "", a), this.$linkDownload_.data("table-update", !0);
        var s = {success: !0, use_cache: !!e.use_cache};
        this.reportLoading.options.quickType = "none", e.use_cache = sensorsdata.AJAX_CONST.reportAjaxCache, e.limit = 1e3, sensorsdata.reportAjax({
            isAsync: !0,
            queueEnable: !0,
            url: "events/report/",
            method: "POST",
            data: this.clearAjaxParam_(e),
            complete: sensorsdata.bind(function () {
                sensorsdata.enableReportAjaxCache(), this.$btnQuery_.removeClass("disabled").text(sensorsdata.languages.get("查询<!--{en}Query-->")), this.options.closeLoading(), $.isFunction(t) && t()
            }, this),
            error: function (e) {
                this.reportLoading.closeLoading(), s.success = !1, s.fail_reason = e.status, sensorsdata.track("web_click_analytics", s)
            }.bind(this),
            success: sensorsdata.bind(function (t) {
                sensorsdata.track("web_click_analytics", s), this.reportLoading.closeLoading("success"), this.segObj_ = $.extend(!0, {}, t);
                var a = !$.isArray(t.rows) || 0 === t.rows.length;
                this.$tableContainer_.parent().toggle(!a), this.setHolderPlace_(!0, a), a ? (this.segObj_ = {}, this.tableRows_ = [], this.$tableContainer_.html(""), "group" === e.page_type && $.isEmptyObject(e.filter) && $.isEmptyObject(e.user_filter) && this.setHolderPlace_(!0, !0, sensorsdata.languages.get("没有页面组<!--{en}No page groups-->"), sensorsdata.languages.get("请先点击“+添加页面组”添加页面组<!--{en}Please first click“+add page group” to add the group-->"))) : (this.tableRows_ = this.buildTableData_(this.segObj_), (1 !== this.tableSortIndex_ || "descend" !== this.tableSortType_) && (this.tableRows_ = this.sortTableRows_(this.tableSortIndex_, this.tableSortType_)), this.renderTable_())
            }, this)
        })
    }, s.prototype.tableContainerClick_ = function (e) {
        var t = $(e.target || e.srcElement);
        t.attr("data-method") || (t = t.parents("[data-method]:first"));
        var a = this, s = null, n = function () {
            var e = parseInt(t.parents("tr:first").attr("data-id"), 10);
            return a.pageGroups_.filter(function (t) {
                return t.id === e
            })[0]
        }, r = t.attr("data-method");
        switch (r) {
            case"sort":
                this.tableSortIndex_ = t.index(), this.tableSortType_ = "descend" === t.attr("data-sort") ? "ascend" : "descend", this.tableRows_ = this.sortTableRows_(this.tableSortIndex_, this.tableSortType_), this.renderTable_();
                break;
            case"edit-group":
                s = n(), this.editPageGroup_(s);
                break;
            case"show-map":
                var i = $.extend(!0, {}, this.paramObj_);
                if ("group" === i.page_type) s = n(), i.page_group_id = s.id; else {
                    var o = t.parents("tr:first").find('div[data-method="show-map"]').next().attr("data-url");
                    i.page_url = encodeURIComponent(o)
                }
                this.options.initPage("/web-click/web-click-map/#" + $.param(i))
        }
    }, s.prototype.pageGroupContainerClick_ = function (e) {
        var t = $(e.target || e.srcElement);
        t.attr("data-method") || (t = t.parents("[data-method]:first"));
        var a = this, s = parseInt(this.$pageGroupContainer_.find("#name").attr("data-id"), 10),
            n = t.attr("data-method");
        switch (n) {
            case"hide":
                this.floatLayer_.hideView();
                break;
            case"save":
                var r = this.buildPageGroup_();
                if ($.isEmptyObject(r)) return;
                sensorsdata.ajax({
                    method: "POST",
                    url: "page_group" + (s > 0 ? "/" + s : ""),
                    data: JSON.stringify(r),
                    success: function () {
                        sensorsdata.disableReportAjaxCache(), a.getPages_(a.paramObj_), a.floatLayer_.hideView()
                    }
                });
                break;
            case"delete":
                sensorsdata.popover({
                    ele: t,
                    showNow: !0,
                    footer: $("#tpl_popover_footer_state_3").html(),
                    content: '确认删除页面组吗？<div class="remark">本操作无法撤销</div>',
                    successAfter: function () {
                        sensorsdata.ajax({
                            method: "DELETE", url: "page_group/" + s, success: function () {
                                for (var e = 0, t = a.pageGroups_.length; t > e; e++) if (a.pageGroups_[e].id === s) {
                                    a.pageGroups_.splice(e, 1);
                                    break
                                }
                                for (var n = 0, r = a.segObj_.rows.length; r > n; n++) if (a.segObj_.rows[n].id === s) {
                                    a.segObj_.rows.splice(n, 1);
                                    break
                                }
                                a.$tableContainer_.find('tr[data-id="' + s + '"]').remove(), a.floatLayer_.hideView(), sensorsdata.info.show(sensorsdata.languages.get("删除成功<!--{en}Delete successfully-->"))
                            }
                        })
                    }
                });
                break;
            case"add-page-item":
                this.pageGroupFilter_ && this.pageGroupFilter_.addFilter()
        }
    }, s.prototype.buildPageGroup_ = function () {
        var e = sensorsdata.form.checkChildren(this.$pageGroupContainer_, !0, 1, {container: this.$pageGroupContainer_});
        if (e === !1) return {};
        for (var t = this.$pageGroupContainer_.find("#name"), a = this.$pageGroupContainer_.find("#background-page"), s = $.trim(t.val()), n = parseInt(t.attr("data-id"), 10), r = 0, i = this.pageGroups_.length; i > r; r++) if (this.pageGroups_[r].id !== n && this.pageGroups_[r].name === s) return sensorsdata.form.addError(t, sensorsdata.languages.get("名称重复<!--{en}Name repetition-->"), !0, {container: this.$pageGroupContainer_}), {};
        sensorsdata.form.removeError(t);
        var o = {init_page: $.trim(a.val()), filter: this.pageGroupFilter_.val()};
        return $.isEmptyObject(o.filter) || !$.isArray(o.filter.conditions) || 0 === o.filter.conditions.length ? (sensorsdata.info.show(sensorsdata.languages.get("请添加页面<!--{en}Please add the page-->")), {}) : {
            name: s,
            config: JSON.stringify(o)
        }
    }, s.prototype.editPageGroup_ = function (e) {
        var t = this, a = {}, s = {};
        if (!$.isEmptyObject(e)) {
            var n = JSON.parse(e.config);
            s.isEdit = !0, s.title = sensorsdata.languages.get("编辑页面分组<!--{en}Edit the page groups-->"), s.id = e.id, s.name = e.name, s.background_page = n.init_page, a = n.filter
        }
        this.$pageGroupContainer_.html(Mustache.render(this.tplPageGroup_, s)).find('[data-toggle="tooltip"]').tooltip(), this.pageGroupFilter_ = new sensorsdata.FilterGroupControl, this.pageGroupFilter_.init({
            container: this.$pageGroupContainer_.find("div.url-wrap"),
            propertyObj: {event: this.pageGroupProps_},
            functions: {
                string: [{
                    name: "equal",
                    cname: sensorsdata.languages.get("等于<!--{en}equals to-->")
                }, {name: "contain", cname: sensorsdata.languages.get("包含<!--{en}includes-->")}, {
                    name: "rlike",
                    cname: sensorsdata.languages.get("正则匹配<!--{en}Regular matches-->")
                }]
            }
        }), $.isEmptyObject(a) ? this.pageGroupFilter_.addFilter() : this.pageGroupFilter_.val(a), this.floatLayer_ = new sensorsdata.floatLayerRight({
            ele: t.$pageGroupContainer_,
            width: 800
        }), this.floatLayer_.showView()
    }, s.prototype.prevQuery_ = function () {
        if (sensorsdata.cache.config.auto_refresh) {
            var e = this.buildParamObj_(), t = JSON.stringify(this.paramObj_) !== JSON.stringify(e);
            t && this.getPages_(e)
        }
    }, s.prototype.clearAjaxParam_ = function (e) {
        var t = $.extend(!0, {}, e);
        return t.measures = [{event_name: "$pageview", aggregator: "general"}, {
            event_name: "$WebClick",
            aggregator: "unique"
        }, {event_name: "$WebClick", aggregator: "general"}, {
            event_name: "$pageview",
            field: "event.$pageview.$title",
            aggregator: "max",
            is_number: !1
        }], t.space = 10, t.by_fields = ["group" === t.page_type ? "event.$Anything.$page_group" : "event.$Anything.$url"], t.unit = "day", t.rollup_date = !0, t
    }, s.prototype.buildParamObj_ = function () {
        var e = sensorsdata.CONSTSET, t = {
            page_type: this.$inputPageType_.attr("data-value"),
            rangeText: this.$inputDate_.data("daterangepicker") && this.$inputDate_.data("daterangepicker").chosenLabel,
            from_date: this.$inputDate_.data("startDate").format(e.dateFormat),
            to_date: this.$inputDate_.data("endDate").format(e.dateFormat)
        };
        return t.filter = this.eventFilter_.val(), t.user_filter = this.userFilter_.val(), t
    }, s.prototype.sortTableRows_ = function (e, t) {
        return this.tableRows_.sort(function (a, s) {
            var n = sensorsdata.toNumber(a[e].value), r = sensorsdata.toNumber(s[e].value);
            if (!sensorsdata.isNumeric(n) && !sensorsdata.isNumeric(r)) return 0;
            var i = 0;
            return i = sensorsdata.isNumeric(n) ? sensorsdata.isNumeric(r) ? sensorsdata.toNumber(n) - sensorsdata.toNumber(r) : 1 : -1, "ascend" === t ? i : -i
        }), this.tableRows_
    }, s.prototype.buildTableData_ = function (e) {
        var t = "group" === this.paramObj_.page_type, a = this, s = [];
        return e.rows.map(function (e) {
            var n = [];
            if (t) {
                var r = a.pageGroups_.filter(function (t) {
                    return t.id === e.by_values[0]
                })[0];
                if (!r) return;
                var i = JSON.parse(r.config);
                n.push({id: e.by_values[0], url: i.init_page, value: r.name, isHead: !0})
            } else n.push({
                url: sensorsdata.formatByValue(e.by_values[0], "string"),
                value: $.trim(e.values[0][3] || ""),
                isHead: !0
            });
            n.push({value: sensorsdata.formatNumber(e.values[0][0])}), n.push({value: sensorsdata.formatNumber(e.values[0][1])}), n.push({value: sensorsdata.formatNumber(e.values[0][2])}), s.push(n)
        }), s
    }, s.prototype.renderTable_ = function () {
        this.$paginationContainer_.html("");
        var e = this, t = function (t, a) {
            var s = {isGroup: "group" === e.paramObj_.page_type, rows: e.tableRows_.slice(t, a)};
            e.$tableContainer_.html(Mustache.render(e.tplTable_, s)), e.$tableContainer_.find("table thead th").attr("data-sort", "").eq(e.tableSortIndex_).attr("data-sort", e.tableSortType_)
        }, a = e.tableRows_.length;
        a <= sensorsdata.CONSTSET.paginationSize ? t(0, a) : sensorsdata.pagination({
            tableElement: this.$paginationContainer_,
            totalItems: a,
            clickHandle: sensorsdata.bind(function (e) {
                t(e.range[0] - 1, e.range[1])
            }, this)
        })
    }, s.dealParam = function (e) {
        var t = sensorsdata.buildDefaultTimeRange(), a = {
            page_type: "original",
            from_date: t[0].format(sensorsdata.CONSTSET.dateFormat),
            to_date: t[1].format(sensorsdata.CONSTSET.dateFormat)
        };
        return $.isEmptyObject(e) ? a : $.extend(!0, a, e)
    }, a.exports = s
});
;
/*!pages/webClick/webClickMap.js*/
define("pages/webClick/webClickMap", function (e, t, a) {
    function i(e) {
        sensorsdata.BasePage.call(this), this.pageName = window.location.pathname, this.options = e, this.options.container = e.container || $("body"), this.options.container.html($("#tpl-web-click-map").html()), this.paramObj_ = {}, this.eventProps_ = {}, this.userProps_ = [], this.$webClick_ = this.options.container.find('[data-href="web-click"]'), this.$inputPage_ = this.options.container.find("#input-page"), this.$btnRefresh_ = this.options.container.find('button[data-method="refresh"]'), this.$btnQuery_ = this.options.container.find("#btn-query"), this.$addEventFilter_ = this.options.container.find("#btn-add-event-filter"), this.$addUserFilter_ = this.options.container.find("#btn-add-user-filter"), this.$eventFilter_ = this.options.container.find("#event-filter"), this.$userFilter_ = this.options.container.find("#user-filter"), this.$inputDate_ = this.options.container.find("#input-date-range"), this.$mapSlider_ = this.options.container.find("#map-slider"), this.$mapContainer_ = this.options.container.find("#heat-map-container"), this.$iframe_ = this.options.container.find("#heat-map-container iframe"), this.$iframeHoldplace_ = this.options.container.find("#heat-map-container .report-no-data"), this.$mapDisplay_ = this.options.container.find("#map-display"), this.$linkBlankMap_ = this.options.container.find('a[data-method="link-blank-map"]'), this.$slider_ = this.options.container.find("#sampling-factor-slider"), this.$sliderLabel_ = this.options.container.find("#sampling-factor-label"), this.$linkBack = this.options.container.find("#heat-map-container .link-back"), this.eventFilter_ = new sensorsdata.FilterGroupControl, this.userFilter_ = new sensorsdata.FilterGroupControl, this.pageGroup_ = {}, this.requestParam_ = "", this.init()
    }

    sensorsdata.inherits(i, sensorsdata.BasePage), i.prototype.init = function () {
        i.superClass_.init.call(this), this.$btnQuery_.toggle(sensorsdata.cache.config.auto_refresh === !1), this.paramObj_ = i.dealParam(sensorsdata.unparam(location.hash));
        var e = this.paramObj_, t = "#" + $.param(e);
        window.history.replaceState(t, "", t);
        var a = this, s = function () {
            a.renderInput_(e), a.initEvent_(), sensorsdata.cache.config.auto_refresh === !0 ? a.getClickData_(e) : a.options.closeLoading()
        }, r = "event/properties?events=$WebClick&method=mixed";
        sensorsdata.cache && sensorsdata.cache.eventsMap && "$WebStay" in sensorsdata.cache.eventsMap && (r = "event/properties?events=$WebClick,$WebStay&method=mixed"), sensorsdata.ajax({
            useCache: !0,
            url: r,
            success: function (t) {
                if (a.eventProps_ = t.intersection.event, a.userProps_ = t.intersection.user, e.page_group_id) {
                    var i = parseInt(e.page_group_id, 10);
                    sensorsdata.ajax({
                        useCache: !0, url: "page_group/" + i, success: function (e) {
                            a.pageGroup_ = $.extend(!0, {}, e), a.pageGroup_.config = JSON.parse(a.pageGroup_.config), s()
                        }
                    })
                } else s()
            }
        })
    }, i.prototype.initSampleSlider_ = function () {
        var e = this.paramObj_, t = sensorsdata.BookmarkSave.dealSamplingValue(e.sampling_factor),
            a = Math.log(t) / Math.log(2), i = function (e) {
                return 64 === e ? sensorsdata.languages.get("全量<!--{en}Total-->") : "1/" + 64 / e
            };
        this.$sliderLabel_.text(i(t)), this.$slider_.val(a), this.samplingSlider_ = new Slider(this.$slider_.selector, {
            value: a,
            tooltip_position: "bottom",
            formatter: function (e) {
                return 6 === e ? sensorsdata.languages.get("对全量数据计算<!--{en}Total data calculation-->") : (e = Math.pow(2, e), sensorsdata.util.format(sensorsdata.languages.get("对全量数据抽样 1/#{value} 计算<!--{en}Sampling calculations for 1/#{value} of full quantity data-->"), {value: 64 / e}))
            }
        }), sensorsdata.authority.isNormal && this.samplingSlider_.disable();
        var s = this;
        this.$slider_.on("change", function () {
            var e = Math.pow(2, s.$slider_.val());
            s.$sliderLabel_.text(i(e)), sensorsdata.track("sampling")
        })
    }, i.prototype.reload = function () {
        window.location.pathname === this.pageName && this.init()
    }, i.prototype.unload = function () {
        this.options.container.find('[data-toggle="tooltip"]').tooltip("destroy")
    }, i.prototype.renderSelectorCondition = function (e) {
        e = e || "1";
        var t = {1: this.eventProps_}, a = this.paramObj_;
        this.eventFilter_.init({
            container: this.$eventFilter_,
            propertyObj: {event: t[e]},
            disabled: sensorsdata.authority.isNormal
        }), this.eventFilter_.val(a.filter), this.eventFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(this.prevQuery_, this))
    }, i.prototype.renderInput_ = function (e) {
        var t = this, a = sensorsdata.CONSTSET, i = function () {
            var e = t.$inputPage_.val().trim();
            if (e === t.paramObj_.page_url) return void sensorsdata.form.removeError(t.$inputPage_);
            var i = {
                from_date: t.$inputDate_.data("startDate").format(a.dateFormat),
                to_date: t.$inputDate_.data("endDate").format(a.dateFormat),
                filter: {conditions: [{field: "event.$Anything.$url", "function": "equal", params: [e]}]},
                use_cache: !1,
                measures: [{event_name: "$pageview", aggregator: "general"}, {
                    event_name: "$WebClick",
                    aggregator: "unique"
                }, {event_name: "$WebClick", aggregator: "general"}, {
                    event_name: "$pageview",
                    field: "event.$pageview.$title",
                    aggregator: "max",
                    is_number: !1
                }],
                by_fields: ["event.$Anything.$url"],
                unit: "day",
                rollup_date: !0
            };
            sensorsdata.reportAjax({
                queueEnable: !0,
                url: "events/report/",
                method: "POST",
                data: i,
                error: function () {
                    sensorsdata.form.removeError(t.$inputPage_)
                },
                success: function (e) {
                    !$.isArray(e) && e.rows.length > 0 ? (sensorsdata.form.removeError(t.$inputPage_), t.prevQuery_()) : sensorsdata.form.addError(t.$inputPage_, sensorsdata.languages.get("没收到此页面数据<!--{en}No data received from this page-->"), !0)
                }
            })
        };
        this.$inputPage_.val(e.page_group_id ? this.pageGroup_.config.init_page : e.page_url), this.$inputPage_.off("focusout").on("focusout", sensorsdata.bind(i, this)), this.$inputPage_.off("keypres").on("keypress", function (e) {
            13 === e.keyCode && i()
        }), this.renderSelectorCondition(), this.userFilter_.init({
            container: this.$userFilter_,
            propertyObj: {user: this.userProps_},
            disabled: sensorsdata.authority.isNormal
        }), this.userFilter_.val(e.user_filter), this.userFilter_.bindEvent("valueChangedEvent", sensorsdata.bind(this.prevQuery_, this)), this.initDate_(), sensorsdata.authority.isNormal && this.options.container.find("button,input,select").attr("disabled", !0), this.options.container.find('[data-toggle="tooltip"]').tooltip(), this.initSampleSlider_(this.paramObj_)
    }, i.prototype.renderIframe_ = function (e) {
        function t(e, t) {
            return e = -1 !== e.indexOf("sa-request-id=") ? e.replace(/sa-request-id=[^#&]+/, "sa-request-id=" + t) : -1 !== e.indexOf("?") ? e.replace(/&*$/, "&sa-request-id=" + t) : e + "?sa-request-id=" + t
        }

        var a = $.trim(this.$inputPage_.val()), i = a,
            s = 0 === location.protocol.indexOf("https") && 0 !== a.indexOf("https");
        this.$iframe_.toggle(!s), this.$iframeHoldplace_.toggle(s), this.resizeIframeHeight_(), e && (-1 !== a.indexOf("#") ? (a = a.split("#"), i = t(a[0], e) + "#" + a[1]) : i = t(a, e));
        var r = location.protocol + "//" + location.host + "/?project=" + (sensorsdata.cache.project.name || "default");
        i = i.replace(/(sa-request-id=[^&#]+)/, "$1&sa-request-url=" + encodeURIComponent(r)), this.$linkBlankMap_.attr("href", i), s || (this.$iframe_.attr("data-url", a), this.$iframe_.attr("src", i), this.iframeURL = i)
    }, i.prototype.initEvent_ = function () {
        var e = this;
        this.$webClick_.unbind("click").bind("click", function () {
            e.options.initPage("/web-click/")
        }), this.$btnRefresh_.unbind("click").bind("click", function () {
            sensorsdata.disableReportAjaxCache(), e.getClickData_(), sensorsdata.enableReportAjaxCache()
        }), this.$btnQuery_.unbind("click").bind("click", function () {
            e.getClickData_()
        }), this.$addEventFilter_.unbind("click").bind("click", function () {
            e.eventFilter_.addFilter()
        }), this.$addUserFilter_.unbind("click").bind("click", function () {
            e.userFilter_.addFilter()
        }), this.$mapDisplay_.unbind("click").bind("click", function () {
            if ($(this).toggleClass("off").toggleClass("on"), e.$mapDisplay_.hasClass("on")) {
                var t = e.buildParamObj_(), a = JSON.stringify(e.paramObj_) !== JSON.stringify(t);
                if (a) return void e.getClickData_(t)
            }
            e.postMessage_({
                method: "setDisplay",
                params: {display: e.$mapDisplay_.hasClass("on"), percent: e.$mapSlider_.next().attr("data-value") - 0}
            })
        }), $(window).off("message.web-click-map").on("message.web-click-map", function (t) {
            var a = t.data || t.originalEvent.data || {};
            switch (a.method) {
                case"setHeight":
                    a.params && a.params.height && e.$iframe_.height(a.params.height);
                    break;
                case"setUrl":
                    if (!a.params || !a.params.url) return;
                    a.params.url && a.params.url === e.iframeURL ? e.$linkBack.addClass("disabled").off("click") : e.$linkBack.removeClass("disabled").on("click", function () {
                        history.back()
                    });
                    var i = a.params.url.replace(/sa-request-id[^&#]*&*/, "").replace(/sa-request-type[^&#]*&*/, "").replace(/sa-request-url[^&#]*&*/, "").replace(/&#/, "#").replace("?&", "?").replace(/[\?&]$/, "");
                    if (e.$inputPage_.val(i), e.$inputPage_.val().trim() === i) return;
                    delete e.paramObj_.page_group_id, e.paramObj_.page_type = "original", e.paramObj_.page_url = encodeURIComponent(i), e.$linkBlankMap_.attr("href", a.params.url);
                    var s = "#" + $.param(e.paramObj_);
                    window.location.hash !== s && window.history.replaceState(s, "", s)
            }
        })
    }, i.prototype.initDate_ = function () {
        var e = sensorsdata.CONSTSET.dateRangeLimit.day, t = this.paramObj_, a = {};
        a.startDate = moment(t.from_date, sensorsdata.CONSTSET.dateFormat), a.endDate = moment(t.to_date, sensorsdata.CONSTSET.dateFormat), a.rangeLimit = e, a.allowRelative = !0, sensorsdata.initDateRangeInput(this.$inputDate_, a), this.$inputDate_.unbind("apply.daterangepicker").bind("apply.daterangepicker", sensorsdata.bind(this.prevQuery_, this)), this.$inputDate_.unbind("truncate.daterangepicker").bind("truncate.daterangepicker", function () {
            sensorsdata.info.show(sensorsdata.languages.get("时间范围最多<!--{en}Maximum range of time-->") + e + sensorsdata.languages.get("天<!--{en}Day-->"))
        })
    }, i.prototype.resizeIframeHeight_ = function () {
        if (window.postMessage) {
            var e = $("body");
            e.css("height", "initial");
            var t = $("body").height() + 58;
            e.css("height", "");
            var a = $("body")[0].scrollHeight;
            t > a || (this.$iframe_.is(":visible") && this.$iframe_.height(this.$iframe_.height() + a - t), this.$iframeHoldplace_.is(":visible") && this.$iframeHoldplace_.height(this.$iframeHoldplace_.height() + a - t))
        }
    }, i.prototype.renderSlider_ = function () {
        var e = function (e) {
            return e -= 0, e >= 1 && 2 > e ? e = 1 + 4 * (e - 1) : e >= 2 && 3 > e ? e = 5 + 5 * (e - 2) : e >= 3 && 4 > e ? e = 10 + 5 * (e - 3) : e >= 4 && (e = 15 + 85 * (e - 4)), Math.round(10 * e) / 10
        };
        this.$mapSlider_.slider({value: 0});
        var t = this;
        this.$mapSlider_.on("change", function (a) {
            var i = e(a.value.newValue);
            if (t.$mapSlider_.next().attr("data-value", i).text(i + "%"), t.$mapDisplay_.hasClass("on")) {
                var s = {method: "setPercent", params: {percent: this.$mapSlider_.next().attr("data-value") - 0}};
                t.postMessage_(s)
            }
        })
    }, i.prototype.prevQuery_ = function () {
        if (sensorsdata.cache.config.auto_refresh) {
            var e = this.buildParamObj_(), t = JSON.stringify(this.paramObj_) !== JSON.stringify(e);
            t && this.getClickData_(e)
        }
    }, i.prototype.getClickData_ = function (e, t) {
        $.isEmptyObject(e) && (this.paramObj_ = e = this.buildParamObj_());
        var a = this;
        this.$btnQuery_.addClass("disabled").text(sensorsdata.languages.get("查询中…<!--{en}Querying-->"));
        var i = "#" + $.param(e);
        window.location.hash !== i && window.history.pushState(i, "", i), e.use_cache = sensorsdata.AJAX_CONST.reportAjaxCache;
        var s = {success: !0, use_cache: !!e.use_cache};
        sensorsdata.reportAjax({
            queueEnable: !0,
            url: "heat_map/report/",
            method: "POST",
            data: this.clearAjaxParam_(e),
            complete: sensorsdata.bind(function () {
                this.$btnQuery_.removeClass("disabled").text(sensorsdata.languages.get("查询<!--{en}Query-->")), this.options.closeLoading(), $.isFunction(t) && t()
            }, this),
            error: function (e) {
                s.success = !1, s.fail_reason = e.status, sensorsdata.track("web_click_heatmap", s)
            },
            success: function (e) {
                sensorsdata.track("web_click_heatmap", s), a.renderIframe_(e.heat_map_id)
            }
        })
    }, i.prototype.postMessage_ = function (e) {
        var t = $.trim(this.$inputPage_.val()),
            a = 0 === location.protocol.indexOf("https") && 0 !== t.indexOf("https");
        window.postMessage && !a && this.$iframe_[0].contentWindow.postMessage(e, "*")
    }, i.prototype.clearAjaxParam_ = function (e) {
        var t = $.extend(!0, {}, e);
        return t.measures = [{
            event_name: "$WebClick",
            aggregator: "general"
        }], t.space = 10, t.by_fields = ["event.$WebClick.$element_selector"], t.unit = "day", t.rollup_date = !0, t.top_property = "event.$WebClick.$element_content", t.page_group_id || delete t.page_group_id, t
    }, i.prototype.buildParamObj_ = function () {
        var e = sensorsdata.CONSTSET, t = {
            rangeText: this.$inputDate_.data("daterangepicker") && this.$inputDate_.data("daterangepicker").chosenLabel,
            from_date: this.$inputDate_.data("startDate").format(e.dateFormat),
            to_date: this.$inputDate_.data("endDate").format(e.dateFormat)
        };
        t.filter = this.eventFilter_.val(), t.user_filter = this.userFilter_.val(), t.page_group_id = this.paramObj_.page_group_id, this.paramObj_.page_url && (t.page_url = $.trim(this.$inputPage_.val()));
        var a = parseInt(this.$slider_.val(), 10);
        return a && (t.sampling_factor = Math.pow(2, a)), t
    }, i.dealParam = function (e) {
        var t = sensorsdata.buildDefaultTimeRange(), a = {
            from_date: t[0].format(sensorsdata.CONSTSET.dateFormat),
            to_date: t[1].format(sensorsdata.CONSTSET.dateFormat)
        };
        return $.isEmptyObject(e) ? a : (e.page_url && (e.page_url = decodeURIComponent(e.page_url)), e.sampling_factor && (e.sampling_factor = parseInt(e.sampling_factor, 10)), $.extend(!0, a, e))
    }, a.exports = i
});
;
/*!pages/noresult/noresult.js*/
define("pages/noresult/noresult", function (n, e, t) {
    function i(n) {
        this.container = n.container, this.closeLoading = n.closeLoading, this.preprocess()
    }

    var a = n("components/router/router"), o = n("components/model/dashboards").dashboardModel, r = {
        container: Handlebars.template({
            compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                return '<div id="noResult"><div class="inner">\n  <svg width="79px" height="79px" viewBox="0 0 79 79" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <desc>Created with Sketch.</desc>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n          <g id="noresult" transform="translate(-714.000000, -285.000000)">\n              <g id="Group-13" transform="translate(714.000000, 285.000000)" fill="#FFFFFF">\n                  <circle id="Oval-8" cx="39.5" cy="39.5" r="39.5"></circle>\n              </g>\n              <g id="teamwork" transform="translate(729.000000, 306.000000)" fill-rule="nonzero">\n                  <path d="M16.5,32 L1.5,32 C0.6709,32 0,31.3291 0,30.5 L0,23 C0,18.0371 4.0371,14 9,14 C13.9629,14 18,18.0371 18,23 L18,30.5 C18,31.3291 17.3291,32 16.5,32 Z" id="Shape" fill="#68D9B1"></path>\n                  <path d="M48.5,32 L33.5,32 C32.6709,32 32,31.3291 32,30.5 L32,23 C32,18.0371 36.0371,14 41,14 C45.9629,14 50,18.0371 50,23 L50,30.5 C50,31.3291 49.3291,32 48.5,32 Z" id="Shape" fill="#68D9B1"></path>\n                  <path d="M33.5714286,32 L16.4285714,32 C15.6389524,32 15,31.3610476 15,30.5714286 L15,22 C15,16.4865714 19.4865714,12 25,12 C30.5134286,12 35,16.4865714 35,22 L35,30.5714286 C35,31.3610476 34.3610476,32 33.5714286,32 Z" id="Shape" fill="#84B6ED"></path>\n                  <path d="M33.5714286,32 C34.3610476,32 35,31.3610476 35,30.5714286 L35,22 C35,16.4865714 30.5134286,12 25,12 L25,32 L33.5714286,32 Z" id="Shape" fill="#559FF0"></path>\n                  <path d="M25.5,14 C21.3647,14 18,10.8596133 18,7 C18,3.14038667 21.3647,0 25.5,0 C29.6353,0 33,3.14038667 33,7 C33,10.8596133 29.6353,14 25.5,14 Z" id="Shape" fill="#68D9B1"></path>\n                  <path d="M33,7 C33,3.14038667 29.8596133,0 26,0 L26,14 C29.8596133,14 33,10.8596133 33,7 Z" id="Shape" fill="#2DCA93"></path>\n                  <path d="M9,18 C5.6909,18 3,15.3091 3,12 C3,8.6909 5.6909,6 9,6 C12.3091,6 15,8.6909 15,12 C15,15.3091 12.3091,18 9,18 Z" id="Shape" fill="#C1DBE8"></path>\n                  <path d="M41,18 C37.6909,18 35,15.3091 35,12 C35,8.6909 37.6909,6 41,6 C44.3091,6 47,8.6909 47,12 C47,15.3091 44.3091,18 41,18 Z" id="Shape" fill="#C1DBE8"></path>\n              </g>\n          </g>\n      </g>\n  </svg>\n  <h3>访问权限限制</h3>\n  <p>请联系账号管理员</p>\n</div></div>'
            }, useData: !0
        })
    };
    i.prototype = {
        preprocess: function () {
            var n = this;
            return 2 !== sensorsdata.authority.role ? void a.nav("/segmentation/") : void o.get(function (e) {
                return e && e.length ? void a.nav("/dashboard/#dashid" + e[0].id) : void n.render()
            })
        }, render: function () {
            this.container.html(r.container()), this.closeLoading()
        }
    }, t.exports = i
});
;
/*!pages/legoDash/dashboard.js*/
define("pages/legoDash/dashboard", function (t, i, e) {
    function s(t) {
        if ("/lego/" === location.pathname) {
            b[this.__id__ = a.guid()] = {}, this.queryParams = sensorsdata.unparam(window.location.hash), this.container = t.container, this.dashboardCount = 0, this.isEmail_ = !!t.isEmail_, this.$legoNav = $("#legosNav .active");
            var i = this;
            t.closeLoading();
            var e = i.initLayout();
            if (this.toolbar.setDashActive(e), !e) return void this.container.find(".bd").html(f.noTrack());
            "App" === e && (this.queryParams.id = this.$legoNav.attr("data-id").split(";")[1]), i.initModel()
        }
    }

    var a = t("components/util/util"), d = t("components/model/bookmarks"), o = t("components/model/dashboardWidget"),
        n = t("components/model/dashboard.chart"), r = t("components/charts/normal/normal"),
        h = t("components/legoboardTopbar/legoboardTopbar"), l = {"/behavior-path/": !0, "/interval/": !0},
        c = t("components/dashboardNoResult/dashboardNoResult"),
        g = t("components/dashboardConfigPanel/dashboardConfigPanel"),
        u = {"/utm/": t("components/widgetUTMConfig/container/container")}, f = {
            container: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<div id="dashboard">\n  <div class="dashboard-toolbar"></div>\n  <div class="bd"></div>\n</div>'
                }, useData: !0
            }), error: Handlebars.template({
                1: function (t, i, e, s) {
                    var a;
                    return '  <p class="no-has">不存在 ID 为 <strong>' + this.escapeExpression((a = null != (a = i.dashid || (null != t ? t.dashid : t)) ? a : i.helperMissing, "function" == typeof a ? a.call(t, {
                        name: "dashid",
                        hash: {},
                        data: s
                    }) : a)) + "</strong> 的概览页</p>\n"
                }, compiler: [6, ">= 2.0.0-beta.1"], main: function (t, i, e, s) {
                    var a;
                    return null != (a = i["if"].call(t, null != t ? t.isNoHas : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(1, s, 0),
                        inverse: this.noop,
                        data: s
                    })) ? a : ""
                }, useData: !0
            }), noTrack: Handlebars.template({
                compiler: [6, ">= 2.0.0-beta.1"], main: function () {
                    return '<div class="no-track">\n  <img src="../../../res/img/lego/noTrack.png">\n  <p class="describe">该看板数据需要全埋点采集数据支持</p>\n  <p><a target="_blank" href="https://www.sensorsdata.cn/manual/data_import.html">全埋点数据接入方法</a></p>\n</div>'
                }, useData: !0
            })
        }, b = {};
    s.prototype = {
        renderError: function (t) {
            switch (t) {
                case 1:
                    this.container(f.error({isNoHas: !0, dashid: this.queryParams.dashid}))
            }
        }, initLayout: function (t) {
            this.container.html(f.container()), this.$bd = this.container.find(".bd");
            var i = this;
            return this.toolbar = h.create({
                id: this.queryParams.dashid,
                placeholder: this.container.find(".dashboard-toolbar"),
                onRefresh: a.bind(function () {
                    this.refreshWidgets(!1, !1)
                }, this),
                onSetTime: a.bind(this.refreshWidgets, this),
                onRemoveConfig: a.bind(this.resetWidgets, this),
                onAddWidget: a.bind(this.addWidget, this),
                getAddableBookmarks: a.bind(this.getAddableBookmarks, this),
                isEmail_: this.isEmail_,
                callback: function () {
                    var e = $("#legosNav").find(".active"), s = e.attr("data-mul-id");
                    if (!s) return void $("#dashboard").find(".pull-right").hide();
                    var a = s.split(";"), d = $("#dashboard").find(".pull-right button");
                    d.removeClass("active").eq(t || 0).addClass("active"), a.forEach(function (t, i) {
                        d.eq(i).attr("data-id", t)
                    }), d.off("click").on("click", function () {
                        var t = $(this), e = t.attr("data-id");
                        t.hasClass("active") || (i.queryParams.dashid = e, i.initLayout(t.index()), i.initModel())
                    })
                }
            }), $(window).off("resize.dashboard").on("resize.dashboard", a.bind(function () {
                var t = b[this.__id__].widgets;
                (b[this.__id__].widgetIds || []).forEach(function (i) {
                    var e = t[i].view || {};
                    $.isFunction(e.resize) && e.resize()
                })
            }, this)), this.checkLegoType()
        }, checkLegoType: function () {
            for (var t, i = sensorsdata.cache.events, e = 0, s = i.length; s > e; e++) {
                var a = i[e];
                "$pageview" === a.name && (t = t ? "both" : "Web"), "$AppStart" === a.name && (t = t ? "both" : "App")
            }
            var d = $("#legosNav").find(".active"), o = d.attr("data-mul-id");
            return o || $("#dashboard").find(".pull-right").hide(), t
        }, initLoaderFinishLog: function (t) {
            if (-1 !== window.location.search.indexOf("f=email")) var i = this, e = window.setInterval(function () {
                t === i.dashboardCount && (console.log("==Sensors Analytics Email Render Success=="), window.clearInterval(e))
            }, 1e3)
        }, initModel: function () {
            b[this.__id__].widgets = {}, b[this.__id__].widgetIds = [], this.widgetModel = o.createProxy(this.queryParams.dashid), this.widgetModel.getList(a.bind(function (t) {
                b[this.__id__] && (this.isShareDash = sensorsdata.authority.userId !== t.user_id, this.isShareDash && this.destroySortable(), this.toolbar.setShare(this.isShareDash), b[this.__id__].widgetMetas = t.items, this.initWidgets(t.items), this.widgetModel.on("add", a.bind(this.handleAddWidget, this)), this.widgetModel.on("del", a.bind(this.handleDelWidget, this)), this.widgetModel.on("set", a.bind(this.handleSetWidget, this)))
            }, this), !1)
        }, initWidgets: function (t) {
            if (this.toolbar.setContainWidget(!!t.length), !t.length) return void(this.noResult = c.create(this.$bd, this.queryParams.dashid, this.isShareDash, this.toolbar.options.onAddWidget));
            var i = b[this.__id__].widgets, e = b[this.__id__].widgetIds;
            t.forEach(a.bind(function (t) {
                var s = this.createWidget(t);
                i[t.bookmark.id] = s, e.push(t.bookmark.id)
            }, this)), this.initLoaderFinishLog(t.length)
        }, createWidget: function (t) {
            var i = this, e = n.create({bookmark: t.bookmark, config: t.config}), s = Number(this.queryParams.dashid),
                a = r.create({
                    isShareDash: !0,
                    dashid: s,
                    container: this.$bd,
                    meta: e.getMeta(),
                    onMessage: sensorsdata.bind(this.handleWidgetMessage, this)
                });
            return e.get(this.lastRefreshOptions, function (t) {
                a.update(t)
            }), e.on("update", function (t) {
                a.update(t)
            }), e.on("error", function (t) {
                a.update({error: t})
            }), e.on("clean", function () {
                a.clean()
            }), e.on("destroy", function () {
                a.destroy()
            }), a.on("done", function () {
                i.dashboardCount++
            }), {model: e, view: a}
        }, handleWidgetMessage: function (t) {
            if (t && t.data) switch (t.action) {
                case"del":
                    this.delWidget(t.data.id);
                    break;
                case"set":
                    this.setWidget(t.data.id);
                    break;
                case"set-size":
                    this.setWidgetSize(t.data.id, t.data.size);
                    break;
                case"filter":
                    this.widgetDataFilter(t.data);
                    break;
                case"changeTab":
                    this.widgetChangeTab(t.data.id, t.tabName, t.isShareDash)
            }
        }, addWidget: function (t) {
            if ($.isNumeric(t)) {
                var i = this;
                return void d.get(t, function (t) {
                    i.addWidget(t)
                })
            }
            if ("/segmentation/" !== t.type) return void this.widgetModel.add({bookmark: t});
            var e = this.widgetModel;
            (u[t.type] || g).show({widget: {bookmark: t}}, function (t) {
                e.add(t)
            })
        }, delWidget: function (t) {
            this.widgetModel.del(t)
        }, setWidget: function (t) {
            var i = this.widgetModel;
            i.get(t, function (t) {
                (u[t.bookmark.type] || g).show({widget: t}, function (t) {
                    i.set(t)
                })
            })
        }, setWidgetSize: function (t, i) {
            var e = b[this.__id__].widgets[t];
            e && (this.widgetModel.set({
                id: t,
                config: {size: i}
            }, {isTrigger: !1}), e.model.update({config: {size: i}}, !1), e.view.update({size: i}))
        }, widgetDataFilter: function (t) {
            var i = b[this.__id__].widgets[t.id];
            if (i) {
                var e = {filter: t};
                i.model.update(this.lastRefreshOptions ? $.extend(!0, {}, this.lastRefreshOptions, e) : e)
            }
        }, widgetChangeTab: function (t, i, e) {
            var s = b[this.__id__].widgets[t];
            s && (e || (this.widgetModel.set({
                id: t,
                config: {tab_name: i}
            }, {isTrigger: !1}), s.model.update({config: {tab_name: i}}, !1)), s.view.update({tab_name: i}))
        }, handleAddWidget: function (t) {
            this.addPreprocess();
            var i = b[this.__id__].widgets, e = b[this.__id__].widgetIds, s = this.createWidget(t.widget),
                a = t.widget.bookmark.id;
            i[a] = s, e.push(a), document.documentElement.scrollTop = document.body.scrollHeight
        }, addPreprocess: function () {
            !b[this.__id__].widgetIds.length && this.noResult && (this.noResult.destroy(), this.noResult = null, this.toolbar.setContainWidget(!0))
        }, handleDelWidget: function (t) {
            var i = b[this.__id__].widgets[t.widget.id], e = b[this.__id__].widgetIds;
            delete b[this.__id__].widgets[t.widget.id], b[this.__id__].widgetIds = e.filter(function (i) {
                return i !== t.widget.id
            }), i.model.destroy(), this.delPostprocess()
        }, delPostprocess: function () {
            b[this.__id__].widgetIds.length || this.noResult || (this.noResult = c.create(this.$bd, null, !1, this.toolbar.options.onAddWidget), this.toolbar.setContainWidget(!1))
        }, handleSetWidget: function (t) {
            var i = b[this.__id__].widgets[t.widget.id];
            i.model.update(this.lastRefreshOptions ? $.extend(!0, {}, this.lastRefreshOptions, t.widget) : t.widget)
        }, createSortable: function () {
            var t = this;
            this.sortable = Sortable.create($("#dashboard .bd")[0], {
                animation: 300,
                handle: ".widget-topbar",
                scrollSensitivity: 200,
                scrollSpeed: 10,
                scroll: !0,
                onEnd: function () {
                    t.updateOrders()
                }
            })
        }, destroySortable: function () {
            this.sortables && this.sortable.destroy()
        }, updateOrders: function () {
            var t = this.widgetModel, i = [];
            $("#dashboard .bd").find(">.widget-container").each(function (t, e) {
                i.push($(e).data("widgetid"))
            }), t.sort(i, function (t) {
                console.log("更新 widget 顺序", t)
            })
        }, refreshWidgets: function (t, i) {
            var e = b[this.__id__].widgets;
            "object" === $.type(t) && (this.lastRefreshOptions = t);
            var s = $.extend(!0, {}, this.lastRefreshOptions, i === !1 ? {useCache: !1} : {});
            for (var a in e) e.hasOwnProperty(a) && e[a].model.refresh(s)
        }, resetWidgets: function () {
            this.lastRefreshOptions = null, this.refreshWidgets()
        }, getAddableBookmarks: function (t) {
            var i = this;
            d.getList(function (e) {
                i.widgetModel.getList(function (i) {
                    var s = [], a = i.items, d = {};
                    $.isArray(a) && a.length > 0 && $.each(a, function (t, i) {
                        "object" == typeof i && i.bookmark.id && (d[i.bookmark.id] = !0)
                    }), $.each(e, function (t, i) {
                        if (!l[t]) {
                            var e = {};
                            e.glistType = sensorsdata.CONSTSET.urlMap[t], e.glistOrder = sensorsdata.CONSTSET.urlMapOrder[t], e.glistRows = i, $.each(i, function (t, e) {
                                e.timeFix = sensorsdata.BookmarkSave.buildTimeText(e), e.id in d && delete i[t]
                            }), e.glistRows = $.map(i, function (t) {
                                return t
                            }), $.isArray(e.glistRows) && e.glistRows.length > 0 && s.push(e)
                        }
                    }), s = sensorsdata.seniorSort(s, "glistOrder").reverse(), t(s)
                })
            })
        }, unload: function () {
            var t = b[this.__id__];
            if (t) {
                var i = t.widgets;
                if ($(window).off("resize.dashboard"), this.destroySortable(), i) for (var e in i) i[e].model.destroy();
                delete b[this.__id__], this.widgetModel && this.widgetModel.destroy(), this.toolbar.destroy(), $(window).off("resize.dashboard")
            }
        }
    }, e.exports = s
});
;
/*!pages/index/index.js*/
define("pages/index/index", function (e) {
    e("components/coolEventDropdown/coolEventDropdown"), e("components/createUserListPanel/createUserListPanel"), e("components/expressionInput/expressionInput");
    var a = {
            ChannelManagePage: e("pages/channelManage/channelManage"),
            DashboardPage: e("pages/dashboard/dashboard"),
            Segmentation: e("pages/segmentation/segmentation"),
            AppClick: e("pages/appClick/appClick"),
            UserAnalytics: e("pages/userAnalytics/userAnalytics"),
            RetentionAddiction: e("pages/retentionAddiction/retentionAddiction"),
            Retention: e("pages/retention/retention"),
            Funnel: e("pages/funnel/funnel"),
            Clustering: e("pages/clustering/clustering"),
            ClusteringDetail: e("pages/clustering/detail"),
            OldClustering: e("pages/oldClustering/oldClustering"),
            Interval: e("pages/interval/interval"),
            Profiling: e("pages/profiling/profiling"),
            AuthManage: e("pages/authManage/authManage"),
            UserBehaviorPath: e("pages/userBehaviorPath/userBehaviorPath"),
            WebClick: e("pages/webClick/webClick"),
            WebClickMap: e("pages/webClick/webClickMap"),
            NoResult: e("pages/noresult/noresult"),
            LegoDashPage: e("pages/legoDash/dashboard"),
            ImportPage: e("pages/import/import")
        }, s = e("components/model/dashboards").dashboardModel, t = e("components/dashboardsNav/dashboardsNav"),
        n = e("components/model/legos").legoModel, o = e("components/searchTool/searchTool").createSearchTool,
        r = e("components/queryChannelManage/queryChannelManage").popQueryChannel,
        i = e("components/lego/legosNav/legosNav"), d = e("components/keyLog/keyLog"), c = e("components/util/util"),
        l = e("components/qrCodeModal/qrCodeModal");
    sensorsdata.IndexPage = function () {
        this.sideBar_ = $("#sa_sidebar"), this.saMainDom_ = $("#sa-main"), this.loadingBar_ = $("#sa-loading-bar"), this.$headNav_ = $("nav.sa-head"), this.urlRememberObj = {}, this.events_ = [], this.bookmarkList_ = null, this.licenseFreshIntervalId = -1, this.partitionRefreshIntervalId = -2, this.licenseItems_ = [], this.config_ = {}, this.aboutModal_ = null, this.dashControl_ = null, this.dashboardTemplateList_ = [], this.search_ = window.location.search, this.isEmail_ = this.search_.indexOf("f=email") >= 0, this.init()
    }, sensorsdata.IndexPage.prototype.init = function () {
        var e = sensorsdata.getLocationSearch(), a = this.getCurrentProject_(e.project || "");
        if (!a) return window.location.href = sensorsdata.buildLoginUrl(!0, e.project), !1;
        if (this.isEmail_ && e.base_time && $.isNumeric(e.base_time) && (moment.fixedUnixTimestamp = parseInt(e.base_time)), e.project = a.project, this.search_ = "?" + $.param(e), sensorsdata.cache.project = {
            id: 0,
            name: a.project,
            cname: ""
        }, a && a.userName) sensorsdata.authority = new sensorsdata.Authority(a); else if ("oauth" !== e.oauth_type) return window.location.href = sensorsdata.buildLoginUrl(), !1;
        this.$headNav_.find(".username span:last-child").text(sensorsdata.authority.userName), $('li[data-for="open-customer-service"]').toggle(window.location.host.indexOf("demo.cloud.sensorsdata.cn") < 0), window.location.host.indexOf("demo.cloud.sensorsdata.cn") > 0 && $.cookie("sensorsdata-username", sensorsdata.authority.userName, {
            path: "/",
            expires: 365
        });
        var s = $("[data-authorization]");
        s.filter('[data-authorization="normal"]').show(), s.filter('[data-authorization!="normal"]').toggle(!sensorsdata.authority.isNormal), s.filter('[data-authorization="admin"]').toggle(sensorsdata.authority.isAdmin), a.project && (this.sideBar_.find("a#hue-query").attr("href", "/query/?project=" + a.project), this.sideBar_.find(".fix-url li[data-nav] a").each(function (e, s) {
            var t = $(s).attr("href"), n = c.setURLParams(t, {project: a.project});
            $(s).attr("href", n)
        }));
        var n = sensorsdata.localStorage.getItem(sensorsdata.CONSTSET.urlRememberKey);
        n && (this.urlRememberObj = JSON.parse(n) || {});
        var o = this, r = "";
        "undefined" != typeof document.hidden ? r = "hidden" : "undefined" != typeof document.msHidden ? r = "msHidden" : "undefined" != typeof document.webkitHidden && (r = "webkitHidden"), this.licenseFreshIntervalId = window.setInterval(function () {
            document[r] !== !1 && r || o.getConfig_(sensorsdata.bind(o.checkLicense_, o))
        }, 6e5), this.partitionRefreshIntervalId = window.setInterval(function () {
            document[r] !== !1 && r || o.refreshPartiotion()
        }, 6e5), this.initEvent_(), this.getConfig_().then(function () {
            return o.getProject_(a.project)
        }).then(function () {
            return "/lego/" === location.pathname ? (t.init(), i.init()) : (i.init(), t.init())
        }).done(function () {
            o.setDefaultUrl_(), o.initCEIP_(), o.initPage(), o.getProjectList_(), o.checkLicense_()
        }), this.sideBar_.width() < 50 && this.sideBar_.find("a[title]").tooltip({
            container: "body",
            placement: "right"
        });
        var d = sensorsdata.localStorage.getItem(sensorsdata.CONSTSET.indexPageSidebarStatus);
        d = JSON.parse(d) || {};
        for (var l in d) {
            var u = this.sideBar_.find('h4[data-category="' + l + '"]'), m = "expand" === d[l];
            u.find(".action-onoff span").toggleClass("icon-collapse-up", m).toggleClass("icon-expand-down", !m), u.next().toggle(m)
        }
        this.bookmarkList_ = new sensorsdata.BookMarkList(sensorsdata.bind(this.initPage, this)), $.isArray(sensorsdata.theme.modules) && sensorsdata.theme.modules.map(function (e) {
            $(e.selector).toggle(e.display)
        }), $.isArray(sensorsdata.theme.moduleReplacements) && sensorsdata.theme.moduleReplacements.map(function (e) {
            $(e.selector).attr(e.attribute, e.value)
        }), this.isEmail_ ? $("body").addClass("sa-email") : new sensorsdata.DemoDataImport
    }, sensorsdata.IndexPage.prototype.getCurrentProject_ = function (e) {
        var a = [];
        this.isEmail_ || (a = JSON.parse(sensorsdata.localStorage.getItem(sensorsdata.CONSTSET.projectKey)) || []), sensorsdata.ajax({
            url: "account/my?project=" + e,
            async: !1,
            showLoader: !1,
            success: function (s) {
                $.isEmptyObject(s) || a[0] && a[0].userId === s.user_id || a.unshift({
                    project: e,
                    userId: s.user_id,
                    userName: s.username,
                    role: s.role,
                    eventPermission: s.event_permission
                })
            }
        });
        var s = null;
        return e && (s = a.filter(function (a) {
            return (a.project || "default") === e
        })[0], !s) ? s : (s || (s = a.filter(function (e) {
            return e.active === !0
        })[0]), s || (s = a.filter(function (e) {
            return !e.project || "default" === e.project
        })[0]), s || (s = a[0]), $.isEmptyObject(s) || (s.project = s.project || "default", a.map(function (e) {
            e.active = e.project === s.project
        }), sensorsdata.localStorage.setItem(sensorsdata.CONSTSET.projectKey, JSON.stringify(a))), s)
    }, sensorsdata.IndexPage.prototype.initEvent_ = function () {
        this.$headNav_.find("#signout").on("click", sensorsdata.bind(this.signoutClick_, this)), this.sideBar_.on("click", ".sidebar-links li[data-nav], #dashboardsNav li[data-nav], #legosNav li[data-nav]", sensorsdata.bind(this.sidebarLinksClick_, this)), $(".sa-sidebar-scroll-wrap").scrollUnique();
        var e = this;
        this.sideBar_.find("a#hue-query").on("click", function () {
            sensorsdata.track("custom_query")
        }), $("#events_management_btn").on("click", function () {
            $("#sidebar-toggle").is(":visible") && (e.sideBar_.removeClass("shown"), $("#sa_head_nav, #sa-main, #sa-head-data-import-tip-phone").removeClass("shown")), e.sideBar_.find(".sidebar-section li.active").removeClass("active"), $("#sidebar-bottom a.active").removeClass("active"), $(this).addClass("active"), "/events/" !== window.pageName && e.initPage("/events/#type=meta")
        }), $("#vtrack_manager_btn").on("click", function () {
            $("#sidebar-toggle").is(":visible") && (e.sideBar_.removeClass("shown"), $("#sa_head_nav, #sa-main, #sa-head-data-import-tip-phone").removeClass("shown")), e.sideBar_.find(".sidebar-section li.active").removeClass("active"), $("#sidebar-bottom a.active").removeClass("active");
            var a = $(this).addClass("active").attr("data-href");
            window.pageName !== a && e.initPage(a)
        }), $("#bookmark_list_btn").on("click.active", function () {
            $(this).addClass("active")
        }), $("#sidebar-toggle").on("click", function () {
            e.sideBar_.find("a[title]").tooltip("destroy"), e.sideBar_.hasClass("shown") ? (e.sideBar_.removeClass("shown"), $("#sa_head_nav, #sa-main, #sa-head-data-import-tip-phone").removeClass("shown")) : (e.sideBar_.addClass("shown"), $("#sa_head_nav, #sa-main, #sa-head-data-import-tip-phone").addClass("shown"), $(".sa-sidebar-scroll-wrap").off("mousewheel"), $(".sa-sidebar-scroll-wrap").find(".bd").scrollUnique())
        }), e.sideBar_.attr("data-packup", "unpacked"), $(window).width() <= 1050 && (e.sideBar_.attr("data-packup", "ispacked"), $(".sa-sidebar-scroll-wrap").off("mousewheel"), $(".sa-sidebar-scroll-wrap").find(".bd").scrollUnique()), $("#sidebar-pack").on("click", function () {
            var a = 1050, s = 70, t = $(window).width();
            a >= t ? (e.sideBar_.attr("data-packup", "ispacked"), e.sideBar_.addClass("sidebar-pack-up").toggleClass("sidebar-pack-down"), e.sideBar_.parent().children(".sa-main, .sa-head#sa_head_nav, .bookmarkshow-out").addClass("sidebar-pack-up").toggleClass("sidebar-pack-down")) : (e.sideBar_.removeClass("sidebar-pack-down"), e.sideBar_.parent().children(".sa-main, .sa-head#sa_head_nav, .bookmarkshow-out").removeClass("sidebar-pack-down"));
            var n = "ispacked" === e.sideBar_.attr("data-packup");
            if (e.sideBar_.toggleClass("sidebar-pack-up").attr("data-packup", n ? "unpacked" : "ispacked"), e.sideBar_.parent().children(".sa-main, .sa-head#sa_head_nav, .bookmarkshow-out").toggleClass("sidebar-pack-up"), e.sideBar_.find("a[title]").tooltip("destroy"), e.sideBar_.find("sidebar-section").removeClass("sidebar-hover"), $("#sa-main-container").off("transitionend webkitTransitionEnd oTransitionEnd").on("transitionend webkitTransitionEnd oTransitionEnd", function (e) {
                var a = $(e.srcElement || e.target);
                a.is($(this)) && (e.stopPropagation(), $(window).resize(), $("#sa-main-container").off("transitionend webkitTransitionEnd oTransitionEnd"))
            }), $(".sa-sidebar-scroll-wrap").length > 0) {
                var o = $("#sa_sidebar").width();
                o > s ? ($(".sa-sidebar-scroll-wrap").off("mousewheel"), $(".sa-sidebar-scroll-wrap").find(".bd").scrollUnique()) : ($(".sa-sidebar-scroll-wrap").find(".bd").off("mousewheel"), $(".sa-sidebar-scroll-wrap").scrollUnique())
            }
        });
        var a = 240;
        e.sideBar_.find(".sidebar-section").off("mouseover.sidebar").on("mouseover.sidebar", function () {
            $("#sa_sidebar").width() < a && ($(this).parent().find(".sidebar-section.sidebar-hover").removeClass("sidebar-hover"), $(this).addClass("sidebar-hover").parent().find('.sidebar-section:not(".sidebar-hover")').children(".popover").popover("hide"))
        }), e.sideBar_.find(".sidebar-section").off("mouseout.sidebar").on("mouseout.sidebar", function () {
            $("#sa_sidebar").width() < a && $(this).removeClass("sidebar-hover")
        }), $("#sa-head-r .login-qr-code").on("click", function () {
            l.show()
        }), $("#sa-head-r .search-tool").on("click", function () {
            o()
        }), $(document).on("keydown", function (e) {
            var a = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
            e.metaKey && 75 === a && o(), 27 === a && $("#searchTool .shadows").trigger("click")
        }), $("#user-dropdown li a").on("click", function () {
            var a = $(this);
            if (a.attr("data-nav")) return e.initPage(a.attr("data-nav")), void e.sideBar_.find("li.active,a.active").removeClass("active");
            var s = a.attr("data-method");
            switch (s) {
                case"push-manage":
                    e.popPushManagement_();
                    break;
                case"change-pwd":
                    e.popChangePass_();
                    break;
                case"sa-share":
                    var t = {
                        utm_campaign: sensorsdata.cache.config.license.customer_id,
                        utm_medium: sensorsdata.cache.project.name,
                        utm_source: sensorsdata.authority.userName
                    };
                    a.attr("href", "https://www.sensorsdata.cn/share/share.html?" + $.param(t));
                    break;
                case"diagnosis-tool":
                    var n = a.attr("href");
                    n.indexOf("{{project}}") > -1 && a.attr("href", n.replace("{{project}}", sensorsdata.cache.project.name));
                    break;
                case"query-channel-tool":
                    r();
                    break;
                case"open-customer-service":
                    var o = sensorsdata.cache.config.license || {},
                        i = "https://sensorsdata.cn/g/sc/" + o.customer_id + "/" + sensorsdata.cache.project.name + "/" + sensorsdata.authority.userName;
                    a.attr("href", i)
            }
        }), $("#sa_head_about").on("click", sensorsdata.bind(this.popAbout_, this)), $("#btn-viewport-warning-close").on("click", function () {
            $(this).parents("div.viewport-warning:first").hide()
        }), $(window).off("hashchange.index-page").on("hashchange.index-page", sensorsdata.bind(function () {
            this.rememberUrl_()
        }, this)), $(window).off("popstate").on("popstate", sensorsdata.bind(function () {
            e.isEmail_ || (window.pageName && window.pageName !== window.location.pathname ? this.initPage() : window.page && $.isFunction(window.page.reload) && (this.setSideActive_() ? window.page.reload() : (this.setDefaultUrl_(), this.initPage())))
        }, this)), $(window).off("unload").on("unload", sensorsdata.bind(function () {
            this.rememberUrl_(), sensorsdata.clearReportAjax(), window.clearInterval(this.licenseFreshIntervalId), window.clearInterval(this.partitionRefreshIntervalId), window.page && $.isFunction(window.page.unload) && window.page.unload()
        }, this)), this.sideBar_.off("click.onoff").on("click.onoff", "h4[data-category] .action-onoff", function (a) {
            var s = $(a.target || a.srcElement).closest("button");
            if (!s.hasClass("sa-sidebar-dashboard-add")) {
                var t = $(this).parent(), n = t.find(".action-onoff span");
                n.toggleClass("icon-collapse-up").toggleClass("icon-expand-down"), t.next().toggle(n.hasClass("icon-collapse-up"));
                var o = {};
                e.sideBar_.find("h4[data-category]").each(function () {
                    o[t.attr("data-category")] = t.find(".action-onoff span").hasClass("icon-collapse-up") ? "expand" : "collapse"
                }), sensorsdata.localStorage.setItem(sensorsdata.CONSTSET.indexPageSidebarStatus, JSON.stringify(o)), a.preventDefault()
            }
        })
    }, sensorsdata.IndexPage.prototype.popPushManagement_ = function () {
        var e = $(Mustache.render($("#tpl-common-modal").html(), {
            title: sensorsdata.languages.get("推送管理<!--{en}Push manage-->"),
            content: $("#tpl-push-management").html()
        })).modal("show").on("hidden.bs.modal", function () {
            e.remove()
        });
        e.find(".form-hold-place").show().next().hide(), sensorsdata.form.removeChildrenError(e);
        var a = e.find(".push-item-list ul").html(""), s = e.find("#btn-ok"), t = e.find("#cname").val(""),
            n = e.find("#appKey").val(""), o = e.find("#appId").val(""), r = e.find("#appSecretKey").val(""),
            i = e.find("#masterSecret").val(""), d = e.find("#pushId").val(""), c = e.find("#push-service").saDropdown({
                onSelected: function (e) {
                    n.parent().toggle("2" !== e), o.parent().toggle("4" === e), r.parent().toggle("4" !== e), i.parent().toggle("4" === e)
                }
            }), l = {}, u = function () {
                if (!e.find("form").is(":visible") || !sensorsdata.form.checkChildren(e.find("form"), !0, 1, {container: e})) return {};
                for (var a = sensorsdata.cache.appPushConfigs, s = 0, u = a.length; u > s; s++) if (l.id !== a[s].id && a[s].cname === t.val()) return sensorsdata.form.addError(t, sensorsdata.languages.get("配置名称重复<!--{en}Configuration name is repeated-->"), !0, {container: e}), {};
                var m = parseInt(c.attr("data-value"), 10), h = n.val(), p = r.val();
                return 4 === m && (h = o.val() + "," + h, p = i.val()), {
                    project_id: sensorsdata.cache.project.id,
                    push_service: m,
                    cname: t.val(),
                    app_key: h,
                    app_secret_key: p,
                    profile_of_push_id: d.val()
                }
            }, m = function (s) {
                var u = s.push_service || "", m = s.app_key || "", h = "";
                if (l = s, e.find(".form-hold-place").hide().next().show(), a.find("li.selected").removeClass("selected"), a.find('li[data-value="' + (s.id || -1) + '"]').addClass("selected"), c.data("saDropdown").select(u), t.val(s.cname || ""), r.val(s.app_secret_key || ""), i.val(s.app_secret_key || ""), d.val(s.profile_of_push_id || ""), 4 === u && 2 === m.split(",").length) {
                    var p = m.split(",");
                    h = p[0], m = p[1]
                }
                n.val(m), o.val(h), n.parent().toggle(2 !== u), o.parent().toggle(4 === u), r.parent().toggle(4 !== u), i.parent().toggle(4 === u)
            }, h = function (s, t) {
                return sensorsdata.ajax({
                    url: "app_push_config" + (s.id ? "/" + s.id : ""),
                    method: "POST",
                    data: JSON.stringify(s),
                    success: function (n) {
                        if (s.id) for (var o = 0, r = sensorsdata.cache.appPushConfigs.length; r > o; o++) sensorsdata.cache.appPushConfigs[o].id === s.id && (sensorsdata.cache.appPushConfigs[o] = s); else s.id = n.id, sensorsdata.cache.appPushConfigs.push(s), a.find("li.selected").attr("data-value", n.id).text(s.cname);
                        t && e.modal("hide")
                    }
                })
            };
        sensorsdata.ajax({
            url: "app_push_config", showLoader: !1, success: function (e) {
                if ($.isArray(e) && e.length > 0) {
                    sensorsdata.cache.appPushConfigs = e;
                    var s = "";
                    e.map(function (e) {
                        s += '<li data-value="' + e.id + '">' + e.cname + "</li>"
                    }), a.html(s), m(e[0])
                } else sensorsdata.cache.appPushConfigs = []
            }
        }), e.find('form input[type="text"]').off("keyup").on("keyup", function () {
            $(this).val() && sensorsdata.form.removeError($(this))
        }), a.off("click").on("click", function (a) {
            var s = $(a.target || a.srcElement), t = parseInt(s.attr("data-value"), 10);
            t > 0 ? (l = sensorsdata.cache.appPushConfigs.filter(function (e) {
                return e.id === t
            })[0], m(l), sensorsdata.form.removeChildrenError(e)) : m({cname: sensorsdata.languages.get("新建配置<!--{en}Add new configuration-->")})
        }), e.find("span.icon-new").off("click").on("click", function () {
            if (!l.id && 0 === a.find("li.selected").length) return e.find(".form-hold-place").hide().next().show(), a.find("li.selected").removeClass("selected"), a.append('<li class="selected" data-value="-1">新建配置</li>'), void t.val(sensorsdata.languages.get("新建配置<!--{en}Add new configuration-->"));
            var s = u();
            $.isEmptyObject(s) || ($.extend(!0, l, s), h(l).then(function () {
                t.val(""), n.val(""), r.val(""), d.val(""), a.find("li.selected").text(l.cname).removeClass("selected"), a.append('<li class="selected" data-value="-1">新建配置</li>'), t.val(sensorsdata.languages.get("新建配置<!--{en}Add new configuration-->")), l = {}, sensorsdata.form.removeChildrenError(e)
            }))
        }), e.find("span.icon-delete").off("click").on("click", function () {
            return sensorsdata.form.removeChildrenError(e), l.id ? void sensorsdata.ajax({
                url: "app_push_config/" + l.id,
                method: "DELETE",
                success: function () {
                    a.find('li[data-value="' + l.id + '"]').remove(), t.val(""), n.val(""), r.val(""), d.val("");
                    for (var s = 0, o = sensorsdata.cache.appPushConfigs.length; o > s; s++) if (sensorsdata.cache.appPushConfigs[s].id === l.id) {
                        sensorsdata.cache.appPushConfigs.splice(s, 1);
                        break
                    }
                    l = {}, 0 === sensorsdata.cache.appPushConfigs.length ? e.find(".form-hold-place").show().next().hide() : m(sensorsdata.cache.appPushConfigs[0])
                }
            }) : (a.find("li.selected").remove(), void(0 === sensorsdata.cache.appPushConfigs.length ? e.find(".form-hold-place").show().next().hide() : m(sensorsdata.cache.appPushConfigs[0])))
        });
        var p = e.find('input[data-method="connect-param"]'), g = function () {
            var e = !0;
            p.filter(":visible").each(function () {
                $.trim($(this).val()) || (e = !1)
            })
        };
        p.off("keyup").on("keyup", g).off("focusout").on("focusout", g), s.unbind("click").bind("click", function () {
            0 === a.find("li.selected").length && e.modal("hide");
            var s = u();
            $.isEmptyObject(s) || ($.extend(!0, l, s), h(l, !0))
        })
    }, sensorsdata.IndexPage.prototype.popChangePass_ = function () {
        var e = $("#changePassword"), a = e.find("#changeOk"), s = e.find(".close");
        e.modal("show");
        var t = $("#newPass"), n = $("#renewPass"), o = $("#oldPass"), r = function () {
            o.val(""), t.val(""), n.val("")
        }, i = function (a) {
            var s = sensorsdata.form.checkChildren(a, !0, 0, {container: e});
            if (s) {
                var o = $.trim(n.val()), r = $.trim(t.val());
                return o !== r ? (sensorsdata.form.addError(t, t.attr("data-error-text-re"), !1, {container: e}), sensorsdata.form.addError(n, n.attr("data-error-text-re"), !0, {container: e}), !1) : (sensorsdata.form.removeError(a), !0)
            }
            return !1
        };
        t.on("focusout", function () {
            sensorsdata.form.check($(this), !0, 1, {container: e})
        }), n.on("focusout", function () {
            sensorsdata.form.check($(this), !0, 1, {container: e})
        }), s.on("click", function () {
            r(), sensorsdata.form.removeError(o), sensorsdata.form.removeError(t), sensorsdata.form.removeError(n)
        }), a.click(function () {
            if (i(e) !== !1) {
                var a = {password: $.trim(t.val()), old_password: $.trim(o.val())};
                sensorsdata.ajax({
                    type: "post",
                    url: "account/password",
                    data: JSON.stringify(a),
                    customErrorStatusCode: 403,
                    isEncrypt: !0,
                    error: function (a) {
                        r(), 403 === a.status && sensorsdata.form.addError(o, o.attr("data-error-text"), !0, {container: e}), 400 === a.status && sensorsdata.form.addError(o, o.attr("data-error-text-test1"), !0, {container: e})
                    },
                    success: function () {
                        sensorsdata.form.removeError(o), e.modal("hide"), r();
                        var a = sensorsdata.buildLoginUrl(), s = '修改密码成功，请<a href="' + a + '">重新登录</a>';
                        window.setTimeout(function () {
                            window.location.href = a
                        }, 3e3), sensorsdata.info.show(s)
                    }
                })
            }
        })
    }, sensorsdata.IndexPage.prototype.popAbout_ = function () {
        if (-1 === window.location.search.indexOf("f=email")) {
            var e = function (e) {
                    var a = Mustache.render($("#tpl-common-modal").html(), {
                        title: sensorsdata.languages.get("正在重置“<!--{en}is resetting“-->") + e + sensorsdata.languages.get("”，请勿关闭网页<!--{en}”，Please don't close the page-->"),
                        closeButtonText: sensorsdata.languages.get("关闭<!--{en}Close-->")
                    }), s = $(a);
                    s.find(".modal-dialog").addClass("modal-lg"), s.find(".modal-body").html($("#tpl-reset-project-progress").html());
                    var t = s.find(".modal-body .progress-bar"), n = 40, o = 0, r = function () {
                        var e = 0;
                        o = setInterval(function () {
                            if (e > 40) return void clearInterval(o);
                            var a = Math.round(e / n * 100) + "%";
                            t.css("width", a).text(a), e += .5
                        }, 500)
                    };
                    s.modal({
                        backdrop: "static",
                        keyboard: !1,
                        show: !0
                    }), r(), $(window).bind("beforeunload.reset-project", function () {
                        return confirm(sensorsdata.languages.get("确定关闭浏览器吗？重置会发生意想不到的结果。<!--{en}Are you sure you want to close the browser?Reset will result in unexpected results.-->"))
                    });
                    var i = sensorsdata.cache.project.name;
                    sensorsdata.ajax({
                        method: "PUT",
                        url: "project/" + (i || "default"),
                        customErrorStatusCode: 422,
                        timeout: 4e4,
                        complete: function () {
                            $(window).unbind("beforeunload.reset-project"), clearInterval(o), t.css("width", "100%").text("100%")
                        },
                        error: function (e) {
                            var a = parseInt(e.status, 10);
                            s.find(".alert").toggle(422 === a), s.find("#btn-cancel").show()
                        },
                        success: sensorsdata.bind(function () {
                            window.location.href = sensorsdata.buildLoginUrl(!1)
                        }, this)
                    })
                }, a = Mustache.render($("#tpl-common-modal").html(), {
                    title: sensorsdata.languages.get("关于<!--{en}About-->"),
                    closeButtonText: sensorsdata.languages.get("关闭<!--{en}Close-->"),
                    okButtonHide: !0
                }), s = moment(sensorsdata.cache.config.build_time), t = moment(this.config_.build_time), n = $(a),
                o = Mustache.render($("#tpl-sa-about").html(), {
                    buildVersion: sensorsdata.cache.config.build_version,
                    buildTime: sensorsdata.cache.config.build_time,
                    isExpire: s.isValid() && t.isValid() && s.isAfter(t),
                    project: sensorsdata.cache.project.cname || sensorsdata.cache.project.name,
                    licenseItems: this.licenseItems_,
                    denyReset: "admin" !== sensorsdata.authority.userName
                }), r = this;
            n.find(".modal-body").html(o).find("#btn-reset-project").unbind("click").bind("click", function () {
                r.aboutModal_.modal("hide");
                var a = Mustache.render($("#tpl-common-modal").html(), {
                    title: sensorsdata.languages.get("信息确认<!--{en}Information validation-->"),
                    defaultCloseHide: !0
                }), s = $(a);
                s.find(".modal-body").html($("#tpl-reset-project-confirm").html());
                var t = s.find("#btn-ok");
                t.toggleClass("disabled", !0), s.find("#confirm-checkbox").unbind("change").bind("change", function () {
                    t.toggleClass("disabled", !$(this).prop("checked"))
                }), t.unbind("click").bind("click", function () {
                    if (sensorsdata.form.checkChildren(s, !0, 1, {container: s})) {
                        var a = s.find("#project-name"), t = $.trim(a.val()), n = $.trim(s.find("#reset-reason").val());
                        if (sensorsdata.cache.project.name && t !== sensorsdata.cache.project.cname || !sensorsdata.cache.project.name && t !== sensorsdata.languages.get("默认项目<!--{en}default project-->")) return void sensorsdata.form.addError(a, sensorsdata.languages.get("项目名称不正确<!--{en}The project name is incorrect-->"), !0, {container: s});
                        var o = new Image;
                        o.src = "/err.gif?method=reset-project&project=" + encodeURIComponent(t) + "&reason=" + encodeURIComponent(n), s.modal("hide"), e(t)
                    }
                }), s.modal("show")
            }), this.aboutModal_ && this.aboutModal_.modal("hide"), this.aboutModal_ = n.modal("show"), n.find('[data-authorization="admin"]').toggle(sensorsdata.authority.isAdmin)
        }
    }, sensorsdata.IndexPage.prototype.rememberUrl_ = function () {
        var e = window.location.pathname, a = window.location.hash;
        -1 === a.indexOf(sensorsdata.CONSTSET.bookmarkId) && this.checkUrl_(e) && (sensorsdata.cache.errors[e + a] ? delete this.urlRememberObj[e] : (this.urlRememberObj[e] = a, this.urlRememberObj.lastPathname = e), sensorsdata.localStorage.setItem(sensorsdata.CONSTSET.urlRememberKey, JSON.stringify(this.urlRememberObj)))
    }, sensorsdata.IndexPage.prototype.sidebarLinksClick_ = function (e) {
        if (!d.checkFunctionKey(navigator.userAgent.match(/mac os/i) ? [91, 93] : 17)) {
            e.preventDefault(), $("#sidebar-toggle").is(":visible") && (this.sideBar_.removeClass("shown"), $("#sa_head_nav, #sa-main, #sa-head-data-import-tip-phone").removeClass("shown"));
            var a = $(e.target || e.srcElement), s = a.attr("data-nav");
            s || (a = a.parents("li:first"), s = a.attr("data-nav")), $("#sidebar-bottom a.active").removeClass("active"), this.initPage(a.find("a").attr("data-href"))
        }
    }, sensorsdata.IndexPage.prototype.signoutClick_ = function () {
        sensorsdata.ajax({
            method: "POST", url: "auth/logout", success: sensorsdata.bind(function () {
                window.location.href = sensorsdata.buildLoginUrl(!1)
            }, this), error: sensorsdata.bind(function (e) {
                503 === parseInt(e.status, 10) && (sensorsdata.cache.project = {}, window.location.href = sensorsdata.buildLoginUrl(!1))
            }, this)
        })
    }, sensorsdata.IndexPage.prototype.refresh = function () {
        var e = window.location.pathname + window.location.search + window.location.hash;
        this.initPage(e)
    }, sensorsdata.IndexPage.prototype.initCEIP_ = function () {
        var e = sensorsdata.cache.config.license || {}, a = {
            role: sensorsdata.authority.roleName,
            customer_id: e.customer_id,
            user_name: sensorsdata.authority.userName,
            install_time: e.install_time,
            expire_time: e.expire_time,
            project_id: sensorsdata.cache.project.id,
            project_name: sensorsdata.cache.project.name || "default",
            project_cname: sensorsdata.cache.project.cname,
            last_login_time: moment().format(sensorsdata.CONSTSET.timeFormat)
        }, s = function (a) {
            !function (e) {
                var a = e.sdk_url, s = e.name, t = window, n = document, o = "script", r = null, i = null;
                t.sensorsDataAnalytic201505 = s, t[s] = t[s] || function (e) {
                    return function () {
                        (t[s]._q = t[s]._q || []).push([e, arguments])
                    }
                };
                for (var d = ["track", "quick", "register", "registerPage", "registerOnce", "registerSession", "registerSessionOnce", "trackSignup", "trackAbtest", "setProfile", "setOnceProfile", "appendProfile", "incrementProfile", "deleteProfile", "unsetProfile", "identify", "login", "logout"], c = 0; c < d.length; c++) t[s][d[c]] = t[s].call(null, d[c]);
                t[s]._t || (r = n.createElement(o), i = n.getElementsByTagName(o)[0], r.async = 1, r.src = a, i.parentNode.insertBefore(r, i), t[s].para = e)
            }({
                sdk_url: "https://static.sensorsdata.cn/sdk/1.6.21/sensorsdata.min.js",
                name: "saCEIP",
                server_url: "https://sa.cloud.sensorsdata.cn:4006/sa?token=2b881680023a0e5b&project=production",
                show_log: !1,
                cross_subdomain: !1
            }), saCEIP.identify(e.customer_id + ":" + sensorsdata.authority.userId), saCEIP.setOnceProfile({first_login_time: moment().format(sensorsdata.CONSTSET.timeFormat)}), saCEIP.register({
                customer_id: e.customer_id,
                project_name: sensorsdata.cache.project.name || "default"
            }), saCEIP.setProfile(a)
        };
        sensorsdata.ajax({
            showLoader: !1, url: "events/all?cache=false&invisible=true", complete: function (e) {
                var s = new Date(e.getResponseHeader("Date")),
                    t = s.getTime() + 1e3 * s.getTimezoneOffset() * 60 + 288e5;
                a.last_login_time = moment(t).format(sensorsdata.CONSTSET.timeFormat)
            }, success: function (e) {
                a.import_event_num = e.length
            }
        }).then(function () {
            return sensorsdata.ajax({
                showLoader: !1, url: "property/all", success: function (e) {
                    for (var s = sensorsdata.cache.eventPropertiesMap = {}, t = 0, n = e.length; n > t; t++) s[e[t].name] = e[t];
                    sensorsdata.cache.eventProperties = e, a.import_event_property_num = e.length
                }
            })
        }).then(function () {
            sensorsdata.ajax({
                showLoader: !1, url: "property/user/properties", success: function (e) {
                    sensorsdata.cache.userProperties = e;
                    for (var t = sensorsdata.cache.userPropertiesMap = {}, n = 0, o = e.length; o > n; n++) t[e[n].name] = e[n];
                    sensorsdata.cache.userProperties = e, a.import_user_property_num = e.length, sensorsdata.cache.config.customer_experience_improvement_program && s(a)
                }
            })
        })
    }, sensorsdata.IndexPage.prototype.setSideActive_ = function (e, a) {
        e = e || window.location.pathname, a = a || window.location.hash;
        var s = null;
        if ("/dashboard/" === e) {
            var t = sensorsdata.unparam(a).dashid;
            s = this.sideBar_.find('[data-nav="/dashboard/#dashid=' + t + '"]')
        } else if ("/lego/" === e) {
            var n = sensorsdata.unparam(a).dashid;
            s = this.sideBar_.find('#legosNav [data-nav="/lego/#dashid=' + n + '"]')
        } else {
            var o = /^\/(\S+?)\//.exec(e);
            $.isArray(o) && o.length > 1 && (s = this.sideBar_.find('[data-nav="' + o[1] + '"]'))
        }
        return this.sideBar_.find("[data-nav].active").removeClass("active"), s && 1 === s.length ? (s.addClass("active"), !0) : !1
    }, sensorsdata.IndexPage.prototype.initPage = function (e, a) {
        var s = window.location.pathname, t = window.location.hash;
        if (e) {
            var n = /(\/.+\/)(\?[^#]+)?(#.+)?/.exec(e);
            $.isArray(n) && n.length > 1 && n[1] && (s = n[1], t = n[3] || this.urlRememberObj[s] || "")
        }
        if (this.setSideActive_(s, t), location.pathname !== s || location.search !== this.search_ || location.hash !== t) {
            this.rememberUrl_();
            var o = s + this.search_ + t;
            window.history.pushState(o, "", o)
        }
        var r = this, i = this.formatPageName_(s);
        sensorsdata.clearReportAjax(), sensorsdata.ajax({
            url: "events/all", success: function (e) {
                $.isArray(e) || sensorsdata.error.show(sensorsdata.languages.get("数据格式错误，请联系技术人员<!--{en}Data in wrong format, please contact with technicians-->"));
                var a = Object.keys(sensorsdata.CONSTSET.urlNoEvents), n = sensorsdata.CONSTSET.urlNoEvents[s],
                    o = a.indexOf(s) >= 0 && (!n || "#" + n === t);
                if (e.length > 0) {
                    for (var d = sensorsdata.cache.eventsMap = {}, c = 0, l = e.length; l > c; c++) d[e[c].name] = e[c];
                    sensorsdata.cache.events = e, sensorsdata.cache.eventsUpdateTime = Date.now(), r.events_ = $.extend(!0, [], sensorsdata.cache.events)
                }
                0 === e.length && o === !1 && (s = i = "/import/")
            }
        }).then(function () {
            return sensorsdata.ajax({
                url: "partitions/list?extremum=true", success: function (e) {
                    $.isArray(e) && e.length > 0 && (sensorsdata.cache.partitions = $.extend(!0, [], e))
                }
            })
        }).then(function () {
            var e = $.Deferred();
            if (!$.isArray(r.events_) || 0 === r.events_.length) return e.reject(), e;
            var a = sensorsdata.unparam(window.location.hash), t = a[sensorsdata.CONSTSET.bookmarkId];
            return $.isNumeric(t) ? sensorsdata.ajax({
                customErrorStatusCode: 410,
                url: "bookmarks/bookmark/" + t,
                error: function () {
                    var e = sensorsdata.unparam(window.location.hash);
                    delete e[sensorsdata.CONSTSET.bookmarkId];
                    var a = "#" + $.param(e), t = s + (a ? a : "");
                    window.history.pushState(t, "", t)
                }
            }) : (e.resolve(), e)
        }).always(function () {
            sensorsdata.authority.isAdmin && sensorsdata.monitorModel.updateList(), r.renderPage_(i, a)
        })
    }, sensorsdata.IndexPage.prototype.formatPageName_ = function (e) {
        if (!e) return "";
        var a = e.split("/").filter(function (e) {
            return "" !== e
        });
        return a.length > 0 ? "/" + a[a.length - 1] + "/" : ""
    }, sensorsdata.IndexPage.prototype.renderPage_ = function (e, s) {
        window.page && $.isFunction(window.page.unload) && (sensorsdata.clearReportAjax(), window.page.unload()), window.pageName = window.location.pathname, $(document.body).attr("data-page", e.replace(/\//g, "")), $("title").text(sensorsdata.CONSTSET.urlMap[e] + "-" + sensorsdata.theme.label.titleSuffix), this.renderViewPortWarning_(e);
        var t = {
            container: this.saMainDom_,
            events: this.events_,
            initPage: sensorsdata.bind(this.initPage, this),
            closeLoading: sensorsdata.bind(this.closeLoading, this),
            state: s,
            isEmail_: this.isEmail_
        };
        switch (this.showLoading(), e) {
            case"/behavior-path/":
                window.page = new a.UserBehaviorPath(t);
                break;
            case"/data-stream/":
                window.page = new sensorsdata.DataStreamPage(t);
                break;
            case"/track-manager/":
                window.page = new sensorsdata.TrackManager(t);
                break;
            case"/import-status/":
                window.page = new sensorsdata.ImportStatus(t);
                break;
            case"/users/":
                window.page = new sensorsdata.UsersListPage(t);
                break;
            case"/sequence/":
                window.page = new sensorsdata.UserEventsPage(t);
                break;
            case"/segmentation/":
                window.page = new a.Segmentation(t);
                break;
            case"/funnel/":
                window.page = new a.Funnel(t);
                break;
            case"/retention/":
                window.page = new a.Retention(t);
                break;
            case"/addiction/":
                window.page = new a.RetentionAddiction(t);
                break;
            case"/web-click/":
                window.page = new a.WebClick(t);
                break;
            case"/app-click/":
                window.page = new a.AppClick(t);
                break;
            case"/web-click-map/":
                window.page = new a.WebClickMap(t);
                break;
            case"/import/":
                window.page = new a.ImportPage(t);
                break;
            case"/clustering/":
                window.page = new a.Clustering(t);
                break;
            case"/cluster-detail/":
                window.page = new a.ClusteringDetail(t);
                break;
            case"/old-clustering/":
                window.page = new a.OldClustering(t);
                break;
            case"/user_analytics/":
                window.page = new a.UserAnalytics(t);
                break;
            case"/dashboard/":
                window.page = new a.DashboardPage(t);
                break;
            case"/channel-manage/":
                window.page = new a.ChannelManagePage(t);
                break;
            case"/lego/":
                sensorsdata.authority.isAdmin || 0 !== $("#legosNav .bd .groups").length ? window.page = new a.LegoDashPage(t) : location.replace("/segmentation/");
                break;
            case"/events/":
                window.page = new sensorsdata.MetaManager(t);
                break;
            case"/auth/":
                window.page = new a.AuthManage(t);
                break;
            case"/simulator/":
                window.page = new sensorsdata.DataSimulator(t);
                break;
            case"/vtrack/":
                window.page = new sensorsdata.VisualTrackingManager(t);
                break;
            case"/monitor-manager/":
                sensorsdata.authority.isAdmin ? window.page = new sensorsdata.MonitorManage(t) : location.replace("/segmentation/");
                break;
            case"/interval/":
                window.page = new a.Interval(t);
                break;
            case"/profiling/":
                window.page = new a.Profiling(t);
                break;
            case"/no-result/":
                window.page = new a.NoResult(t);
                break;
            default:
                this.closeLoading()
        }
        s && s.from ? $(document.body).attr("data-from", s.from) : $(document.body).removeAttr("data-from")
    }, sensorsdata.IndexPage.prototype.renderViewPortWarning_ = function (e) {
        var a = sensorsdata.CONSTSET, s = -1 === a.mobilePages.indexOf(e) && $("body").width() < a.minBodyWidth;
        $("div.viewport-warning:first").toggle(s)
    }, sensorsdata.IndexPage.prototype.checkUrl_ = function (e) {
        var a = this.formatPageName_(e);
        return e && "/" !== e && sensorsdata.CONSTSET.urlMap[a] && sensorsdata.authority.checkPageAuth(a)
    }, sensorsdata.IndexPage.prototype.setDefaultUrl_ = function () {
        for (var e = this, a = window.location.pathname || "", t = window.location.search || "", o = window.location.hash || "", r = sensorsdata.unparam(o), i = "/no-result/", d = [function () {
            return 2 !== sensorsdata.authority.role ? !1 : (s.get(function (e) {
                var s = function () {
                    if (e && e.length) {
                        var s = "/dashboard/" === a && void 0 !== r.dashid && Number(r.dashid);
                        if (s) for (var t = 0, n = e.length; n > t; t++) if (e[t].id === s) return s;
                        return e[0].id
                    }
                }(), n = s ? "/dashboard/" + t + "#dashid=" + s : i;
                window.history.replaceState(n, "", n)
            }), !0)
        }, function () {
            return "/dashboard/" !== a && "/lego/" !== a ? !1 : ("/dashboard/" === a ? s.checkId(Number(r.dashid), function (s) {
                var n = s ? a + t + o : "/segmentation/" + t + (e.urlRememberObj["/segmentation/"] || "");
                window.history.replaceState(n, "", n)
            }) : "/lego/" === a && n.checkId(Number(r.dashid), function (s) {
                var n = s ? a + t + o : "/segmentation/" + t + (e.urlRememberObj["/segmentation/"] || "");
                window.history.replaceState(n, "", n)
            }), !0)
        }, sensorsdata.bind(function () {
            this.checkUrl_(a) ? o && "#" !== o || (o = this.urlRememberObj[a] || "") : (a = this.checkUrl_(this.urlRememberObj.lastPathname) ? this.urlRememberObj.lastPathname : "/segmentation/", o = this.urlRememberObj[a] || "");
            var e = a + t + o;
            window.history.replaceState(e, "", e)
        }, this)], c = 0, l = d.length; l > c; c++) if (d[c]()) return
    }, sensorsdata.IndexPage.prototype.refreshPartiotion = function () {
        return sensorsdata.ajax({
            url: "partitions/list?extremum=true",
            showCommonError: !1,
            showLoader: !1,
            success: function (e) {
                $.isArray(e) && e.length > 0 && (sensorsdata.cache.partitions = e)
            }
        })
    }, sensorsdata.IndexPage.prototype.getConfig_ = function (e) {
        var a = this;
        return sensorsdata.ajax({
            showLoader: !1, url: "config", success: function (s) {
                $.isEmptyObject(s) || ($('#user-dropdown li a[data-method="build-channel-link"]').parent().toggle(s.enable_short_url_service === !0).toggle(sensorsdata.authority.isAdmin || sensorsdata.authority.isAnalyst && s.allow_analyst_short_url), $("#app-click-menu").toggle(s.allow_app_click_heat_map === !0), $('a[data-method="switch-lang"]').parent("li:first").toggle(!!s.enable_multi_language), sensorsdata.cache.config = s, $.isEmptyObject(a.config_) && (a.config_ = s), $.isFunction(e) && e(s))
            }
        })
    }, sensorsdata.IndexPage.prototype.getProject_ = function (e) {
        return sensorsdata.ajax({
            showCommonError: !1,
            showLoader: !1,
            url: "project/" + (e || "default"),
            success: function (e) {
                $.isEmptyObject(e) ? sensorsdata.info.show(sensorsdata.languages.get("无效的项目，请确保输入正确的链接<!--{en}Invalid item. Please make sure to enter the correct link.-->")) : sensorsdata.cache.project = {
                    id: e.id,
                    name: e.name,
                    cname: e.cname
                }
            }
        })
    }, sensorsdata.IndexPage.prototype.getProjectList_ = function () {
        var e = this;
        return sensorsdata.ajax({
            showCommonError: !1, showLoader: !1, url: "project", success: function (a) {
                if ($.isEmptyObject(a)) sensorsdata.info.show(sensorsdata.languages.get("无效的项目，请确保输入正确的链接<!--{en}Invalid item. Please make sure to enter the correct link.-->")); else {
                    var s = e.$headNav_.find(".sa_head_project"),
                        t = e.$headNav_.find(".sa_head_project").find(".selector");
                    if (s.find(".default_project").remove(), $.isEmptyObject(a) || $.isEmptyObject(a[0])) t.show().replaceWith("<span>" + sensorsdata.languages.get("默认项目<!--{en}default project-->") + "</span>"); else if (1 === a.length) t.show().replaceWith("<span>" + sensorsdata.languages.get(a[0].cname + "<!--{en}name-->") + "</span>"); else {
                        e.$headNav_.removeClass("single-project");
                        var n = Handlebars.template({
                            1: function (e, a, s, t) {
                                var n, o = a.helperMissing, r = "function", i = this.escapeExpression;
                                return '    <option value="' + i((n = null != (n = a.name || (null != e ? e.name : e)) ? n : o, typeof n === r ? n.call(e, {
                                    name: "name",
                                    hash: {},
                                    data: t
                                }) : n)) + '" data-value="' + i((n = null != (n = a.name || (null != e ? e.name : e)) ? n : o, typeof n === r ? n.call(e, {
                                    name: "name",
                                    hash: {},
                                    data: t
                                }) : n)) + '">' + i((n = null != (n = a.cname || (null != e ? e.cname : e)) ? n : o, typeof n === r ? n.call(e, {
                                    name: "cname",
                                    hash: {},
                                    data: t
                                }) : n)) + "</option>\n"
                            }, compiler: [6, ">= 2.0.0-beta.1"], main: function (e, a, s, t) {
                                var n;
                                return '<select name="" id="">\n' + (null != (n = a.each.call(e, null != e ? e.projects : e, {
                                    name: "each",
                                    hash: {},
                                    fn: this.program(1, t, 0),
                                    inverse: this.noop,
                                    data: t
                                })) ? n : "") + "</select>"
                            }, useData: !0
                        });
                        t.show().html(n({projects: a})), t.addClass("selector-customize"), s.find("select").multiselect("destroy").multiselect({
                            enableFiltering: !0,
                            onDropdownShow: function () {
                                this.$filter.find(".multiselect-search").val(""), this.$filter.find("span").hasClass("icon-search") || this.$filter.append('<span class="icon-search"></span>'), $(this.$ul.children("li"), this.$ul).show().removeClass("filter-hidden"), this.updateSelectAll()
                            },
                            onChange: function (e) {
                                s.find("select").multiselect("select", sensorsdata.cache.project.name), window.open(window.location.origin + window.location.pathname + "?project=" + e.val(), window.location.host + e.val())
                            }
                        }), s.find("select").multiselect("select", sensorsdata.cache.project.name)
                    }
                }
            }
        })
    }, sensorsdata.IndexPage.prototype.checkLicense_ = function () {
        var e = moment(sensorsdata.cache.config.build_time), a = moment(this.config_.build_time);
        if (e.isValid() && a.isValid() && e.isAfter(a)) {
            $("#sa_head_about").addClass("new-version-pointer");
            var s = sensorsdata.localStorage.getJSON("sensorsdata-status", "cxTipsUpdate");
            (!s || new Date - s > 864e5) && sensorsdata.info.show({
                content: sensorsdata.util.format(sensorsdata.languages.get('当前版本已更新为#{build_version}，请刷新后使用 <a href="javascript:void(0)" data-action="reload" data-id="{{id}}">刷新页面</a><!--{en}The current version has been updated to #{build_version}, please refresh the page<a href="javascript:void(0)" data-action="reload" data-id="{{id}}">刷新页面</a>-->'), {build_version: sensorsdata.cache.config.build_version}),
                isclose: !0,
                autohide: !1,
                marker: "versionUpdated",
                onclose: function () {
                    sensorsdata.localStorage.setJSON("sensorsdata-status", "cxTipsUpdate", (new Date).getTime())
                },
                onreload: function () {
                    sensorsdata.localStorage.setJSON("sensorsdata-status", "reloadUpdate", !0)
                }
            })
        } else sensorsdata.localStorage.getJSON("sensorsdata-status", "reloadUpdate") && (sensorsdata.localStorage.removeJSON("sensorsdata-status", "reloadUpdate"), sensorsdata.success.show(sensorsdata.languages.get("更新完成，可正常使用<!--{en}The update is completed and can be used normally.-->")));
        var t = sensorsdata.cache.config.loader_info;
        if (t && t.latency >= 1e5 && new Date - t.earliest_nginx_log_time >= 6e5) {
            var n = sensorsdata.localStorage.getJSON("sensorsdata-status", "cxTipsLatency");
            if (!n || new Date - n > 864e5) {
                var o = moment(t.earliest_nginx_log_time), r = moment(new Date).startOf("day"), i = "YYYY-MM-DD HH:mm";
                o.isAfter(r) ? i = sensorsdata.languages.get("今天 HH:mm<!--{en}Today HH:mm-->") : o.isAfter(r.clone().subtract(1, "day")) && (i = sensorsdata.languages.get("昨天 HH:mm<!--{en}Yesterday HH:mm-->")), sensorsdata.warning.show({
                    content: sensorsdata.util.format(sensorsdata.languages.get("正在导入 #{date} 后的数据，请等待<!--{en}Importing the data after  #{date}, please wait-->"), {date: o.format(i)}),
                    isclose: !0,
                    autohide: !1,
                    marker: "importingTheData",
                    onclose: function () {
                        sensorsdata.localStorage.setJSON("sensorsdata-status", "cxTipsLatency", (new Date).getTime())
                    }
                })
            }
        }
        var d = sensorsdata.cache.config.license || {}, c = sensorsdata.CONSTSET, l = moment().startOf("day"),
            u = moment(d.install_time, c.timeFormat), m = moment(d.remind_time, c.timeFormat),
            h = moment(d.expire_time, c.timeFormat), p = moment(d.dead_time, c.timeFormat);
        if (u.isValid() && m.isValid() && h.isValid() && p.isValid()) {
            var g = h.clone().subtract(1, "day"), f = p.clone().subtract(1, "day");
            this.licenseItems_ = [], this.licenseItems_.push({
                name: sensorsdata.languages.get("安装时间<!--{en}Installation time-->"),
                value: u.format(c.dateFormat),
                desc: sensorsdata.languages.get("系统部署的时间。<!--{en}System deployment time.-->")
            });
            var v = l.diff(h) >= 0, w = g.format(c.dateFormat);
            this.licenseItems_.push({
                name: sensorsdata.languages.get("到期时间<!--{en}Expiration time-->"),
                value: w,
                desc: sensorsdata.languages.get("您购买的服务的截止日期，到期后暂时无法导入数据。<!--{en}The expiration date of the service you purchased, which the data cannot be imported for the time being.-->"),
                isMatch: v,
                matchText: sensorsdata.util.format(sensorsdata.languages.get("已停止导入数据，您购买的服务已于 #{value} 到期。<!--{en}The data importing has been stopped, the service you purchased has been expired by #{value}-->"), {value: w})
            }), v = l.diff(p) >= 0, w = f.format(c.dateFormat), this.licenseItems_.push({
                name: sensorsdata.languages.get("停止时间<!--{en}End time-->"),
                value: w,
                desc: sensorsdata.languages.get("到期后，您的服务将无法使用。<!--{en}Your service will not be available after expiration .-->"),
                isMatch: v,
                matchText: sensorsdata.util.format(sensorsdata.languages.get("已暂停服务，您购买的服务已于 #{expireTime} 到期。<!--{en}The service has been suspended.The service you purchased has been expired by  #{expireTime}-->"), {expireTime: g.format(c.dateFormat)})
            }), w = d.project_num + "/" + (d.max_project_num > 0 ? d.max_project_num : sensorsdata.languages.get("无限制<!--{en}Unlimited-->")), this.licenseItems_.push({
                name: sensorsdata.languages.get("项目限额<!--{en}Project quota-->"),
                value: w,
                desc: sensorsdata.languages.get("您购买的最大项目个数。<!--{en}The maximum number of items you have purchased。-->"),
                isMatch: d.max_project_num > 0 && d.project_num > d.max_project_num,
                matchText: sensorsdata.languages.get("已停止导入数据，当前项目数已超过您购买的最大限额。<!--{en}Data importing has been stopped.The current amount of items has exceeded the maximum amount you purchased.-->")
            }), w = sensorsdata.formatNumber(d.message_num) + "/" + (d.max_message_num > 0 ? sensorsdata.formatNumber(d.max_message_num) : sensorsdata.languages.get("无限制<!--{en}Unlimited-->"));
            var b = {
                name: sensorsdata.languages.get("数据限额<!--{en}Data quota-->"),
                value: w,
                desc: sensorsdata.languages.get("您购买的最大数据接入量条数。<!--{en}The maximum amount of data access you have purchased。-->"),
                isMatch: !1,
                matchText: "",
                redText: ""
            };
            d.max_message_num > 0 && (b.isMatch = d.message_num > Math.floor(.95 * d.max_message_num), b.isMatch && (d.message_num >= d.max_message_num ? b.matchText = sensorsdata.languages.get("已停止导入数据，当前数据量已超过您购买的最大数据接入量限额。<!--{en}Data importing has been stopped.The current amount of data has exceeded the maximum amount of data access you purchased.-->") : (b.matchText = sensorsdata.languages.get("当前数据量即将超过您购买的最大数据接入量限额，超过后会停止导入数据。<!--{en}The current amount of data is about to exceed the maximum amount of data access you purchased.The data importing will be stopped after exceeding.-->"), b.redText = sensorsdata.languages.get("即将超出，超出后停止导入数据。<!--{en}Is about to exceed the maximum amount.The data importing will be stopped after exceeding.-->")))), this.licenseItems_.push(b), w = d.node_num + "/" + (d.max_node_num > 0 ? d.max_node_num : sensorsdata.languages.get("无限制<!--{en}Unlimited-->")), this.licenseItems_.push({
                name: sensorsdata.languages.get("节点限额<!--{en}Node limit-->"),
                value: w,
                desc: sensorsdata.languages.get("您购买的最大节点数限额。<!--{en}Maximum number of nodes you purchase.-->"),
                isMatch: d.max_node_num > 0 && d.node_num > d.max_node_num,
                matchText: sensorsdata.languages.get("已停止导入数据，当前节点数已超过您购买的最大节点个数。<!--{en}The data importing has been stopped. The current number of nodes exceeds the maximum number of nodes you have purchased.-->")
            }), w = d.core_num + "/" + (d.max_core_num > 0 ? d.max_core_num : sensorsdata.languages.get("无限制<!--{en}Unlimited-->")), this.licenseItems_.push({
                name: sensorsdata.languages.get("核数限额<!--{en}CPU quota-->"),
                value: w,
                desc: sensorsdata.languages.get("您购买的单节点最大核数限额。<!--{en}The maximum  CPU quota you have purchased for a single node.-->"),
                isMatch: d.max_core_num > 0 && d.core_num > d.max_core_num,
                matchText: sensorsdata.languages.get("已停止导入数据，当前单节点最大核数已超过您购买的单节点最大核数。<!--{en}The data importing has been stopped.The current CPU core number of single nodes exceeds the maximum  CPU core number of single nodes you purchased.-->")
            }), w = d.memory_gb + "/" + (d.max_memory_gb > 0 ? d.max_memory_gb + "G" : sensorsdata.languages.get("无限制<!--{en}Unlimited-->")), this.licenseItems_.push({
                name: sensorsdata.languages.get("内存限额<!--{en}Memory limit-->"),
                value: w,
                desc: sensorsdata.languages.get("您购买的单节点最大内存限额。<!--{en}The maximum memory limit you have purchased for a single node.-->"),
                isMatch: d.max_memory_gb > 0 && d.memory_gb > d.max_memory_gb,
                matchText: sensorsdata.languages.get("已停止导入数据，当前单节点最大内存已超过您购买的单节点最大内存。<!--{en}The data importing has been stopped. The current maximum memory per node exceeds the maximum memory you purchased.-->")
            }), sensorsdata.cache.licenseItems = this.licenseItems_, $('li[data-for="sa_head_about"]').show();
            var _ = $(".sa-expire-remind"), y = this.licenseItems_.filter(function (e) {
                return e.isMatch === !0
            }), k = "";
            if (y.length > 0 ? (k = y[0].matchText, _.removeClass("green").addClass("red")) : l.diff(m) >= 0 && (_.removeClass("red").addClass("green"), k = sensorsdata.util.format(sensorsdata.languages.get("系统授权将于 #{expireTime} 到期，到期后暂时无法导入数据。<!--{en}System authorization will expire at #{expireTime} and will not be able to import data when expired.-->"), {expireTime: g.format(c.dateFormat)})), k) {
                _.show().tooltip({container: "body", placement: "right", title: k, trigger: "hover", viewport: "body"});
                var x = this;
                sensorsdata.authority.getSetting(function (e) {
                    e.licenseRemind || (x.popAbout_(), sensorsdata.authority.updateSetting({licenseRemind: !0}))
                })
            } else sensorsdata.authority.setting.licenseRemind && (sensorsdata.authority.updateSetting({licenseRemind: !1}), _.hide())
        }
    }, sensorsdata.IndexPage.prototype.checkVersionFeatures_ = function () {
        var e = this;
        sensorsdata.authority.getSetting(function (a) {
            var s = "1.7";
            "over" !== a[s] && (e.$headNav_.find('.username span:last-child,[data-method="version-features"]').addClass("new-version-pointer"), !a[s] && e.$headNav_.find(".username span:last-child").is(":visible") && e.popVersionFeatures_(s))
        })
    }, sensorsdata.IndexPage.prototype.popVersionFeatures_ = function (e) {
        var a = {
            background: "1.7-bg.png",
            features: [{
                isActive: !0,
                img: "1.7-web-click.png",
                title: sensorsdata.languages.get("点击分析<!--{en}Click analysis-->"),
                desc: sensorsdata.languages.get("基于真实页面的点击效果展示，让你更加直观的看出页面中的点击分布情况。<!--{en}Display based on the real page click effect which provides a more intuitive page click distribution.-->"),
                link: "https://sensorsdata.cn/blog/ru-he-yun-yong-dian-ji-fen-xi-you-hua-chan-pin-ti-yan/"
            }, {
                img: "1.7-new-funnel.png",
                title: sensorsdata.languages.get("漏斗分析<!--{en}Funnel analysis-->"),
                desc: sensorsdata.languages.get("漏斗分析全新改版！让你可以按天查看漏斗的变化趋势，还可以进行漏斗的对比。<!--{en}Funnel analysis, new revision! Support to view the funnel trend by day and compare the funnels.-->"),
                link: "https://www.sensorsdata.cn/manual/funnel.html"
            }]
        }, s = $($("#tpl-new-version-tip-modal").html());
        s.html(Mustache.render(s.html(), a));
        var t = {}, n = function (a) {
            if (!$.isEmptyObject(t)) {
                if (a === t[e]) return;
                if ("doing" === a && t[e]) return
            }
            sensorsdata.authority.getSetting(function (s) {
                t = s || {}, a !== t[e] && ("doing" === a && t[e] || (t[e] = a, sensorsdata.authority.updateSetting(t)))
            })
        }, o = s.find(".version-slider"), r = this;
        s.find(".right").off("click").on("click", function () {
            var e = s.find(".navigator .active").next();
            if (0 === e.length) o.animate({left: 0}), s.find(".navigator .active").removeClass("active"), s.find(".navigator span:first").addClass("active"); else {
                var a = parseInt(o.css("left"), 10) || 0;
                o.animate({left: a - 700}), s.find(".navigator .active").removeClass("active"), e.addClass("active")
            }
            0 === e.next().length ? (n("over"), r.$headNav_.find('.username span:last-child,[data-method="version-features"]').removeClass("new-version-pointer")) : n("doing")
        }), s.find(".left").off("click").on("click", function () {
            var e = s.find(".navigator .active").prev();
            if (0 === e.length) o.animate({left: -700 * (a.features.length - 1)}), s.find(".navigator .active").removeClass("active"), s.find(".navigator span:last").addClass("active"); else {
                var t = parseInt(o.css("left"), 10) || 0;
                o.animate({left: t + 700}), s.find(".navigator .active").removeClass("active"), e.addClass("active")
            }
        }), s.find(".navigator span").off("click").on("click", function () {
            var e = $(this);
            e.addClass("active").siblings(".active").removeClass("active"), o.animate({left: -700 * e.prevAll().length})
        }), s.modal({backdrop: "static", keyboard: !1}), s.off("hidden.bs.modal").on("hidden.bs.modal", function () {
            n("doing")
        })
    }, sensorsdata.IndexPage.prototype.showLoading = function () {
        $("body").addClass("sa-loading"), this.loadingBar_.show()
    }, sensorsdata.IndexPage.prototype.closeLoading = function () {
        $("body").removeClass("sa-loading"), this.loadingBar_.hide()
    }, $(function () {
        sensorsdata.indexPage = new sensorsdata.IndexPage
    })
});