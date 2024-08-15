const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

// 設定 Multer 用來處理文件上傳
const upload = multer({ dest: 'uploads/' });

// GitHub 配置
const GITHUB_TOKEN = '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'; // 替換為你的 GitHub 個人訪問令牌
const GITHUB_REPO = 'Richion/pdf'; // 替換為你的 GitHub 倉庫
const GITHUB_BRANCH = 'main'; // 替換為你的 GitHub 分支名

app.use(express.static('public')); // 提供靜態文件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 上傳文件的 API
app.post('/fileupload', upload.single('filetoupload'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, error: '未上傳檔案' });
        }

        // 將文件上傳到 GitHub
        const filePath = path.join(__dirname, file.path);
        const fileContent = fs.readFileSync(filePath);
        const base64Content = fileContent.toString('base64');

        await axios.put(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/uploads/${file.originalname}`,
            {
                message: `Add ${file.originalname}`,
                content: base64Content,
                branch: GITHUB_BRANCH
            },
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        // 刪除本地上傳的文件
        fs.unlinkSync(filePath);

        res.json({ success: true });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: '上傳到 GitHub 失敗' });
    }
});

// 列出上傳的文件
app.get('/filelist', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            return res.status(500).json({ success: false, error: '無法讀取檔案列表' });
        }
        res.json({ files });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
