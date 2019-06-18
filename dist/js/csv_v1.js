alert("hello world!");

var downloadCsv = (function() {

    var tableToCsvString = function(table) {
        var str = '\uFEFF';
        for (var i = 0, imax = table.length - 1; i <= imax; ++i) {
            var row = table[i];
            for (var j = 0, jmax = row.length - 1; j <= jmax; ++j) {
                str += '"' + row[j].replace('"', '""') + '"';
                if (j !== jmax) {
                    str += ',';
                }
            }
            str += '\n';
        }
        return str;
    };

    var createDataUriFromString = function(str) {
        return 'data:text/csv,' + encodeURIComponent(str);
    }

    var downloadDataUri = function(uri, filename) {
        var link = document.createElement('a');
        link.download = filename;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return function(table, filename) {
        if (!filename) {
            filename = 'output.csv';
        }
        var uri = createDataUriFromString(tableToCsvString(table));
        downloadDataUri(uri, filename);
    };

})();





//データを配列に代入
  var table = [['あ', 'い'], ['a', 'i']];




//ボタンがクリックされた時の処理
document.getElementById("btn").onclick = function() {
  downloadCsv(table);
  }








//
//
// function kakunin(btnNo){
//   if (btnNo == 1){
//     link = "Yahoo!Japan";
//     href = "http://www.yahoo.co.jp/";
//   }else{
//     link = "Google";
//     href = "http://www.google.co.jp/";
//   }
//
//   ret = confirm(link + "へ飛びます。宜しいですか？");
//   if (ret == true){
//     location.href = href;
//   }
// }
