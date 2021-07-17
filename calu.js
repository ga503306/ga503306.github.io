var Calu = {
    init: function () {
        Calu.getCurrect();
    },
    getCurrect: function () {
        $.get("https://raw.githubusercontent.com/ga503306/TEST/main/config", function (data) {
            var config = JSON.parse(data);
            console.log(config);
            price_low = config.price_low;
            price_high = config.price_high;
            tempo_price_low = config.tempo_price_low;
            tempo_price_high = config.tempo_price_high;
        });
    },
    check: function () {
        var width = $('#width').val();
        var height = $('#height').val();
        if (width * 3 < height) {
            alert('高度不可超過寬度三倍');
            return false;
        }
        switch ($("#type").val()) {
            case '1':
                //進位到整數 = 幅數 = 寬度2（兩倍用布量）/30.3（換算成尺）/5（5呎，一幅是五尺）=
                var vu = Math.ceil(width * 2 / 30.3 / 5);
                //進位到小數第一位數 = 碼數 =（高度/30.3）+1（上下反摺30公分左右）｝幅數/3（一碼3尺）
                var ma = Math.ceil((((height / 30.3) + 1) * vu / 3) * 10) / 10;
                //布價 = 折數 * 單價 * 碼數
                //最高價 最低價
                var amt_low = 1 * price_low * ma;
                var amt_high = 1 * price_high * ma;
                $('#amt_low').val(amt_low);
                $('#amt_high').val(amt_high);
                //軌道 (寬度/30.3)*100=軌道前
                var rail = Math.ceil(width / 30.3) * 100
                //如果低於500，軌道價就等於500
                if (rail < 500) {
                    rail = 500;
                }
                $('#rail').val(rail);
                //車工 = 幅數 * 250
                var turner = vu * 250;
                $('#turner').val(turner);
                //安裝費 50一尺
                var install = Math.ceil(width / 30.3) * 50;
                //如果低於500，安裝費就等於500
                if (install < 500) {
                    install = 500;
                }
                $('#install').val(install);

                //總金額
                var total_low = Math.ceil(amt_low * 2.5 + turner + rail + install);
                var total_high = Math.ceil(amt_high * 2.5 + turner + rail + install);
                $('#total_low').val(total_low);
                $('#total_high').val(total_high);
                break;
            case '2':
                //寬度2.5/30.3/3=碼數
                var ma = width * 2.5 / 30.3 / 3
                //布價 = 折數 * 單價 * 碼數
                //最高價 最低價
                var amt_low = 1 * tempo_price_low * ma;
                var amt_high = 1 * tempo_price_high * ma;
                $('#amt_low').val(amt_low);
                $('#amt_high').val(amt_high);
                //軌道 (寬度/30.3)*100=軌道前
                var rail = Math.ceil(width / 30.3) * 200
                //如果低於500，軌道價就等於500
                if (rail < 500) {
                    rail = 500;
                }
                $('#rail').val(rail);
                //車工 = 寬度/30.3 * 120
                var turner = Math.ceil(width / 30.3 * 10) / 10 * 120;
                $('#turner').val(turner);
                //安裝費 50一尺
                var install = Math.ceil(width / 30.3) * 50;
                //如果低於500，安裝費就等於500
                if (install < 500) {
                    install = 500;
                }
                $('#install').val(install);

                //總金額
                var total_low = Math.ceil(amt_low * 2.5 + turner + rail + install);
                var total_high = Math.ceil(amt_high * 2.5 + turner + rail + install);
                $('#total_low').val(total_low);
                $('#total_high').val(total_high);
                break;
            case '3':
                break;
            default:
                alert('請選擇種類');
                return false;
        }


    }
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}
