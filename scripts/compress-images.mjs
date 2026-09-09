/**
 * Cocora Valley — 站点图片压缩脚本（一次性/可重复运行）
 * ------------------------------------------------------------------
 * 说明：
 *  - 将 public/gallery 下的 JPG 统一重采样到合理尺寸并压缩质量；
 *  - 保留原文件名（含空格与括号），页面中的 <img> 引用无需改动；
 *  - 移除多余 EXIF 元数据，进一步减小体积；
 *  - 首图（Hero / og:image）质量略高，保证社交分享清晰度。
 *
 * 使用：npm run compress:images
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const galleryDir = path.resolve('public/gallery');
const MAX_DIMENSION = 2000;
const HERO_FILE = 'cocora-valley (1).jpg';

const files = fs
  .readdirSync(galleryDir)
  .filter((f) => /\.jpe?g$/i.test(f))
  .sort();

let totalBefore = 0;
let totalAfter = 0;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 用优化文件覆盖原文件；处理 Windows 上文件被短暂占用导致的 EPERM */
async function replaceFile(tmp, dest) {
  // 1) 直接重命名（最快路径）
  try {
    fs.renameSync(tmp, dest);
    return true;
  } catch {}

  // 2) 重试几次（文件监视器/索引服务可能瞬时占用）
  for (let i = 0; i < 6; i++) {
    await sleep(250);
    try {
      fs.renameSync(tmp, dest);
      return true;
    } catch {}
  }

  // 3) 删除后重命名
  try {
    fs.unlinkSync(dest);
    fs.renameSync(tmp, dest);
    return true;
  } catch {}

  // 4) 复制覆盖回退
  try {
    fs.copyFileSync(tmp, dest);
    fs.unlinkSync(tmp);
    return true;
  } catch {}

  // 5) 原地直写：处理“允许读写但不允许删除/重命名”的占用场景（Windows）
  try {
    const data = fs.readFileSync(tmp);
    const fd = fs.openSync(dest, 'r+');
    try {
      fs.ftruncateSync(fd, 0);
      fs.writeSync(fd, data, 0, data.length);
    } finally {
      fs.closeSync(fd);
    }
    fs.unlinkSync(tmp);
    return true;
  } catch {}

  try { fs.unlinkSync(tmp); } catch {}
  return false;
}

for (const file of files) {
  const src = path.join(galleryDir, file);
  const tmp = `${src}.tmp`;
  const before = fs.statSync(src).size;
  totalBefore += before;

  const quality = file === HERO_FILE ? 85 : 80;

  await sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toFile(tmp);

  const after = fs.statSync(tmp).size;
  if (after <= 0 || after >= before) {
    fs.unlinkSync(tmp); // 压缩后无收益则保留原图
    console.log(`- skipped (no gain): ${file}`);
    continue;
  }

  const replaced = await replaceFile(tmp, src);
  if (!replaced) {
    console.log(`! blocked: ${file}`);
    continue;
  }
  totalAfter += after;
  const saved = (((before - after) / before) * 100).toFixed(1);
  console.log(`ok ${file}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB (-${saved}%)`);
}

console.log('\n--- summary ---');
console.log(`before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`after : ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
console.log(`saved : ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB`);
