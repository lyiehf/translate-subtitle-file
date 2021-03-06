const $ = require('jquery')  // jQuery now loaded and assigned to $
const common = require('./src/common.js');
const { translate } = require('./src/translate.js');

var droppedFiles = '';
$(function () {
  // animate border
  $('.dropzone-wrapper').on('mouseenter', function () {
    $(this).addClass('animate');
  }).on('mouseleave', function () {
    $(this).removeClass('animate');
  });

  // support drag & drop
  $dragzone = $('.dropzone-wrapper');
  $dragzone.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
  }).on('dragover dragenter', function () {
    $dragzone.addClass('is-dragover');
  })
  .on('dragleave dragend drop', function () {
    $dragzone.removeClass('is-dragover');
  })
  .on('drop', function (e) {
    // console.log(e);
    droppedFiles = e.originalEvent.dataTransfer.files;

    // 检查后缀
    Array.from(droppedFiles).forEach(file => { 
      var suffix = get_suffix(file.name);
      if (suffix != 'srt' && suffix != 'ass') {
        alert('错误：您选择了后缀不为 .srt/.ass 的文件，请重新选择');
      }
    });

    // 只有一个文件
    if (droppedFiles.length == 1){
      var file = droppedFiles[0];
      app.file_name = file.name;
      app.file_size = common.properFileSize(file.size);
      app.selectedFile = droppedFiles;
        // 界面切换
      $('#selected-file-area').show();
      $('.dropzone-wrapper').hide();
      return
    }else{
      // 多个文件
      app.selectedFile = droppedFiles;
    }
  });

  // 点击"提示区"，选择文件
  $('#hint').click(function () {
    $('#file-input').click();
  })

  // click "开始翻译"按钮
  $('#button-area').click(function () {
    var selectedFile = app.selectedFile; // from vue
    if (selectedFile == null) {
      alert('请先选择文件');
      return false;
    }

    console.log('到这里了');
    console.log(selectedFile);
    if(selectedFile.length == 1){
      console.log('1');
      // translate(selectedFile[0]);
    }else{
      console.log('many');
      Array.from(selectedFile).forEach(file => { 
        translate(file);
      });
    }
  })
});