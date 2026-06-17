import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const srcDir = path.join(process.cwd(), 'src');

const convertedFiles = new Map();

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
            const ext = path.extname(file);
            const basename = path.basename(file, ext);
            const newFile = `${basename}.webp`;
            const newPath = path.join(dir, newFile);
            
            console.log(`Converting ${file} to ${newFile}...`);
            try {
                await sharp(fullPath)
                    .webp({ quality: 80 })
                    .toFile(newPath);
                
                // Store mapping from old relative path to new relative path
                const relativeOld = fullPath.substring(publicDir.length).replace(/\\/g, '/');
                const relativeNew = newPath.substring(publicDir.length).replace(/\\/g, '/');
                convertedFiles.set(relativeOld, relativeNew);
                
                // Delete original to save space
                fs.unlinkSync(fullPath);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
}

function updateReferences(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            updateReferences(fullPath);
        } else if (/\.(js|jsx|css)$/i.test(file)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;
            
            for (const [oldRef, newRef] of convertedFiles.entries()) {
                // oldRef looks like /image.jpg
                // escape regex
                const regex = new RegExp(oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                if (regex.test(content)) {
                    content = content.replace(regex, newRef);
                    updated = true;
                }
            }
            
            if (updated) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated references in ${file}`);
            }
        }
    }
}

async function run() {
    console.log('Starting image optimization...');
    await processDirectory(publicDir);
    console.log('Images converted. Updating references in src directory...');
    updateReferences(srcDir);
    console.log('Optimization complete!');
}

run();
