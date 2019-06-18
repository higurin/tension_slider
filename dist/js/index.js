//$はjQueryのオブジェクトを意味。varで変数宣言。この場合は初期値代入
var $element = $('input[type="range"]');
var $output = $('output');

function updateOutput(el, val) {
  el.textContent = val;
}


var music_start = new Date();//曲の始まり時刻を取得
var start = "false";//音楽が再生されているかどうか
var end_value = 0;//曲が終わった瞬間のスライダ値

//カウントダウン
var countdownArea;
//カウントダウンを表示するエリアのオブジェクトを取得しておく
window.onload = function () {
  countdownArea = document.querySelector("#countdown");
};
document.getElementById("countdown_btn").onclick = function () {

  var x = 5;
  var id = setInterval(function () {
    if (x > 0) {
      //カウントダウンをプリント
      console.log(x);
      countdownArea.innerHTML = x;

      //１秒後にループ回す
      // setTimeout(print_timer(x-1),1000);//この書き方だと１秒後にまとめて５回分呼ばれるため、カウントダウンに常に１が表示される？
    } else if (x == 0) {
      clearInterval(id);
    }
    x--;
  }, 1000);

  //５秒後に音楽再生
  setTimeout(function () {
    countdownArea.innerHTML = "PLAY NOW";
    document.getElementById('sound-file').play();

    // $("#countdown").css({
    //   "font-size": "20px"
    //
    //
    // });


    //曲の始まり時刻を取得
    music_start = new Date();
    table.push(["0", "20"]);//スライダの初期値

    start = "true";
    // console.log(music_start);
  }, 6000);//カウントダウンが５秒だったら、PLAY表示は６秒目になる

}






// エレメントを取得。htmlの要素をjsでいじる時はこれを書く.id=edit_04_resultの内容
var element_result = document.getElementById("edit_04_result");
//$elementにはjQueryのスライダのオブジェクトが入っている
$element
  .rangeslider({
    polyfill: false,
    onInit: function () {
      updateOutput($output[0], this.value);
      //こっちのthis.valueは初期値っぽい
    }
  })
  .on('input', function () {
    updateOutput($output[0], this.value);
    //こっちのthis.valueはinputされた現在の値っぽい
    // console.log("スライダの値:" + this.value);
    //webサイト検証：コンソールにスライダの値を出力

    //時・分・秒を取得する
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var m_second = time.getMilliseconds();

    // 昇順か降順か
    // element_result.value = element_result.value + "スライダの値：" + this.value + "\n";
    // element_result.value = "スライダの値：" + this.value + "-----現在時刻：" + minute + "分" + second + "秒" + m_second + "\n" + element_result.value;
    //スライダの値を配列に代入
    var msec = time.getTime() - music_start.getTime();
    // todayとtoday1の差が何秒か
    console.log(msec, start, this.value);
    //
    // getMdTime();
    if (getMdTime() < msec) {//曲の再生が完了した時
      console.log("完了したよ");
      countdownArea.innerHTML = "END";
      start = "false";
    }


    if (start.toString() == "true") {//音楽が再生している間だけ実行
      console.log("OKOKOKOKOK");
      table.push([msec.toString(), this.value]);
      end_value = this.value;

    }


    //
    // table.push([minute.toString(),second.toString(),m_second.toString(),this.value]);
    // aiueo.push([second,this.value]);
    // console.log(typeof(minute.toString()));
    // c++;
  });






//




//被験者名取得
function name() {
  var name = document.getElementById("name");
  //テキストボックスのオブジェクトを格納
  // console.log(name.value);
  //name.valueで入力された被験者名
  return name.value;
}
//何曲目か取得
function take() {
  var take = document.getElementById("take");
  return take.value;
}

//試行回数取得
function trial() {
  var str = "";
  var trial = document.form3.trial;
  for (var i = 0; i < trial.length; i++) {
    if (trial[i].checked) //(color1[i].checked === true)と同じ
      str = trial[i].value;
  }
  return str;
}


//評価値取得
function btn1_click() {
  var str = "";
  var evaluation = document.form1.evaluation;
  for (var i = 0; i < evaluation.length; i++) {
    if (evaluation[i].checked) //(color1[i].checked === true)と同じ
      str = evaluation[i].value;
  }
  return str;
}


//曲名取得
function song_name() {
  var song = document.getElementById("sound-file");
  var src = song.src;
  return src;
}
//


//曲の長さ
//audioオブジェクトの取得 ▼
var media = document.getElementById("sound-file");
//長さと再生時間を取得する関数 ▼
function getMdTime() {
  var song_time = Math.floor(media.duration * 1000);
  //曲の長さが何ミリ秒か。小数点以下切り捨て
  console.log("曲の長さ：" + song_time);
  return song_time;
}



//

//書き出した時刻取得
function write_time() {
  var dt = new Date();
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);

  var result = y + m + d;
  // var result = y + m + d;

  return result;
}





//csv保存処理
var downloadCsv = (function () {
  var tableToCsvString = function (table) {
    var str = '\uFEFF';//ファイルの始まり
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

  var createDataUriFromString = function (str) {
    return 'data:text/csv,' + encodeURIComponent(str);
  }

  var downloadDataUri = function (uri, filename) {
    var link = document.createElement('a');
    link.download = filename;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return function (table, filename) {
    if (!filename) {
      filename = write_time() + '__musicNo.' + take() + '__trial-' + trial() + '__' + name() + '.csv';
    }
    var uri = createDataUriFromString(tableToCsvString(table));
    downloadDataUri(uri, filename);
  };

})();
//データを配列に代入
var table = [["%Farbood実験２"], ["%被験者名："], ["%評価値："], ["%曲名："], ["%書き出し日："], ['time', 'value']];
//ボタンがクリックされた時の処理
document.getElementById("btn").onclick = function () {


  //評価値を配列に代入
  table[1][1] = name();
  console.log(table[1]);
  table[2][1] = btn1_click();
  console.log(table[2]);
  table[3][1] = song_name();
  console.log(table[3]);
  table[4][1] = write_time();
  console.log(table[4]);

  table.push([getMdTime().toString(), end_value.toString()]);//スライダの初期値
  console.log(table[6]);


  //一番最後にCSV保存を呼び出す
  downloadCsv(table);
}
