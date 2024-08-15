const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 設定存儲引擎
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // 保存檔案的目錄
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// 確保 uploads 目錄存在
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// 服務靜態文件 (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 處理文件上傳
app.post('/fileupload', upload.single('filetoupload'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    res.json({ success: true });
});

// 獲取文件列表
app.get('/filelist', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Unable to read directory' });
        }
        res.json({ files });
    });
});

// 刪除文件
app.delete('/deletefile', (req, res) => {
    const fileName = req.query.name;
    const filePath = path.join('uploads', fileName);
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Unable to delete file' });
        }
        res.json({ success: true });
    });
});

// 服務根路徑的 HTML 文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
