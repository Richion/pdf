const http = require('http');
const fs = require('fs');
const path = require('path');
const { IncomingForm } = require('formidable');

const server = http.createServer((req, res) => {
    if (req.url === '/fileupload') {
        const form = new IncomingForm();
        form.uploadDir = path.join(__dirname, 'uploads');
        form.keepExtensions = true; // 保留文件扩展名

        // 确保上传目录存在
        if (!fs.existsSync(form.uploadDir)) {
            fs.mkdirSync(form.uploadDir);
        }

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error uploading file: ' + err.message }));
                return;
            }

            const uploadedFile = files.filetoupload[0];
            if (uploadedFile.mimetype !== 'application/pdf') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Only PDF files are allowed.' }));
                return;
            }

            const oldPath = uploadedFile.filepath;
            const newPath = path.join(form.uploadDir, uploadedFile.originalFilename);

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Failed to save file' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            });
        });
    } else if (req.url === '/filelist') {
        fs.readdir('.', (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to list files' }));
                return;
            }

            // 仅列出 PDF 文件
            const pdfFiles = files.filter(file => file.endsWith('.pdf'));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ files: pdfFiles }));
        });
    } else if (req.url.startsWith('/deletefile')) {
        const fileName = new URL(req.url, `http://${req.headers.host}`).searchParams.get('name');
        const filePath = path.join('.', fileName);

        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'File not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
    } else {
        fs.readFile('data.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Error loading page');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});

server.listen(8080, () => {
    console.log('Server started on http://localhost:8080/');
});
