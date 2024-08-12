const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

app.get("/data", (req, res) => {
  res.type('html2').send(data));
});



const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));





server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>

`
const data = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Upload PDF</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        form {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 500px;
            width: 100%;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        td {
            padding: 10px;
            text-align: left;
        }
        tr:nth-child(odd) {
            background-color: #e0f7fa;
        }
        tr:nth-child(even) {
            background-color: #c8e6c9;
        }
        h1 {
            margin: 0;
            color: #00796b;
        }
        input[type="file"], input[type="text"], input[type="submit"] {
            width: 100%;
            box-sizing: border-box;
        }
        input[type="submit"] {
            background-color: #00796b;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            font-size: 16px;
        }
        input[type="submit"]:hover {
            background-color: #004d40;
        }
        #file-info {
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            max-width: 500px;
            width: 100%;
            text-align: center;
        }
        #uploaded-files {
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            max-width: 500px;
            width: 100%;
            margin-top: 20px;
        }
        #uploaded-files ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        #uploaded-files li {
            padding: 5px;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #uploaded-files button {
            background-color: #e53935;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 14px;
        }
        #uploaded-files button:hover {
            background-color: #b71c1c;
        }
    </style>
</head>
<body>
    <form id="upload-form" action="fileupload" method="post" enctype="multipart/form-data">
        <table border="1">
            <tr><td><h1>上傳PDF檔案</h1></td></tr>
            <tr><td><input type="file" name="filetoupload" accept=".pdf" required></td></tr>
            <tr><td>備註: <input type="text" name="memo" value="說明"></td></tr>
            <tr><td><input type="submit" value="上傳"></td></tr>
        </table>
    </form>
    <div id="file-info">
        <p id="file-name">檔案名稱將顯示在這裡</p>
    </div>
    <div id="uploaded-files">
        <h2>已上傳檔案列表</h2>
        <ul id="file-list">
            <!-- 已上傳的檔案列表將顯示在這裡 -->
        </ul>
    </div>

    <script>
        document.getElementById('upload-form').addEventListener('submit', function(event) {
            event.preventDefault(); // 防止表單的默認提交行為

            const formData = new FormData(this);
            const fileInput = document.querySelector('input[type="file"]');
            const fileName = fileInput.files[0] ? fileInput.files[0].name : '未選擇檔案';

            // 顯示文件名稱
            document.getElementById('file-name').textContent = "上傳的檔案名稱: ${fileName}";

            fetch('fileupload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // 上傳成功後更新文件列表
                    updateFileList();
                } else {
                    alert('上傳失敗: ' + (data.error || '未知錯誤'));
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('上傳失敗，請稍後再試。');
            });
        });

        function updateFileList() {
            fetch('/filelist')
                .then(response => response.json())
                .then(data => {
                    const fileList = document.getElementById('file-list');
                    fileList.innerHTML = ''; // 清空之前的列表

                    if (data.files && Array.isArray(data.files)) {
                        data.files.forEach(fileName => {
                            const li = document.createElement('li');
                            li.textContent = fileName;

                            // Create and add delete button
                            const deleteButton = document.createElement('button');
                            deleteButton.textContent = '刪除';
                            deleteButton.onclick = () => deleteFile(fileName);

                            li.appendChild(deleteButton);
                            fileList.appendChild(li);
                        });
                    } else {
                        console.error('Unexpected data format:', data);
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }

        function deleteFile(fileName) {
            fetch(`/deletefile?name=${encodeURIComponent(fileName)}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // 刪除成功後更新文件列表
                    updateFileList();
                } else {
                    alert('刪除失敗: ' + (data.error || '未知錯誤'));
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('刪除失敗，請稍後再試。');
            });
        }

        // 初始加載文件列表
        updateFileList();
    </script>
</body>
</html>

`