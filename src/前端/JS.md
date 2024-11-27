# JS

```javascript
获取iframe的dom对象
iframeRep.contentWindow && iframeRep.contentWindow.document
|| iframeRep.window && iframeRep.window.document
|| iframeRep.contentDocument
|| iframeRep.document
|| document.frames && document.frames['iframeRep'].document

获取iframe的window对象
iframeRep.contentWindow || iframeRep.window

iframe自适应高度：iframeRep（iframe元素）、domRep（iframe DOM对象）
$(iframeRep).css('height', Math.max(domRep.body.clientHeight, domRep.documentElement.clientHeight, domRep.body.scrollHeight, domRep.documentElement.scrollHeight))

                // 日期相关方法BEGIN
           function getNow() {
            return formatDate(new Date());
        }
           
           function getYesterday() {
            return formatDate(calDate(new Date(), {d: -1}));
        }
        
        function getLastMonth() {
            return formatDate(calDate(new Date(), {M: -1, d: -1}));
        }
        
        function calDate(date, delta) {
            var obj = $dp.$DV(formatDate(date), delta);
            return new Date(obj.y, obj.M - 1, obj.d, obj.H, obj.m, obj.s);
        }
        
        function calDateById(id, delta) {
            var obj = $dp.$D(id, delta);
            return new Date(obj.y, obj.M - 1, obj.d, obj.H, obj.m, obj.s);
        }
        
        // 设置星期，0-6 === 星期日-星期六
        function setWeek(date, week = 0) {
            return new Date(date.getTime() - (date.getDay() - week) * 86400000)
        }
        
        function formatDateYM(date) {
            return formatDate(date).substr(0, 6);
        }
        
        function formatDate(date) {
            var year = String(date.getFullYear()); 
            var month = String(date.getMonth() + 1);
            var day = String(date.getDate());
            if (month.length === 1) {
                month = '0' + month;
            }
            if (day.length === 1) {
                day = '0' + day;
            }
            return year + month + day;
        }
        
        function formatDateBar(date) {
            var year = String(date.getFullYear()); 
            var month = String(date.getMonth() + 1);
            var day = String(date.getDate());
            if (month.length === 1) {
                month = '0' + month;
            }
            if (day.length === 1) {
                day = '0' + day;
            }
            return year + '-' + month + '-' + day;
        }
           // 日期相关方法END
        
                //获取日期参数
                var getDateParam = function () {
            let dateParam=[];
            // 上周六 yyyyMMdd
            dateParam.push(formatDate(calDate(setWeek(new Date(), 6), {d: -7})));
            // 前一天 yyyyMMdd
            dateParam.push(getYesterday());
            // 上个月 yyyyMM
            dateParam.push(formatDateYM(calDate(new Date(), {M: -1})));    
            return dateParam;
        }
```

