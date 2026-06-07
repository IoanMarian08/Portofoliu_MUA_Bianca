import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import heicConvert from 'heic-convert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../src/assets/images');
const OUTPUT_DIR = path.resolve(__dirname, '../public/generated/images');
const MANIFEST_PATH = path.resolve(__dirname, '../src/data/generatedPortfolioImages.json');

const HEIC_EXTENSIONS = new Set(['.heic', '.heif']);
const BROWSER_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const OUTPUT_PREFERENCE = ['.webp', '.avif', '.jpg', '.jpeg', '.png'];

function normalizeExtension(filePath) {
  return path.extname(filePath).toLowerCase();
}

function toPublicImagePath(relativePath) {
  const normalized = relativePath.split(path.sep).join('/');
  return `/generated/images/${encodeURI(normalized)}`;
}

async function ensureDirectory(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function getFileStats(targetPath) {
  try {
    return await fs.stat(targetPath);
  } catch {
    return null;
  }
}

async function shouldRegenerate(sourcePath, outputPath) {
  const [sourceStats, outputStats] = await Promise.all([getFileStats(sourcePath), getFileStats(outputPath)]);
  if (!sourceStats) {
    return false;
  }

  if (!outputStats) {
    return true;
  }

  return sourceStats.mtimeMs > outputStats.mtimeMs;
}

async function walkDirectory(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        return walkDirectory(fullPath);
      }

      return fullPath;
    })
  );

  return files.flat();
}

async function convertHeicToWebp(sourcePath, outputPath) {
  const sourceBuffer = await fs.readFile(sourcePath);
  const decodedBuffer = await heicConvert({
    buffer: sourceBuffer,
    format: 'JPEG',
    quality: 0.92
  });

  await sharp(decodedBuffer).rotate().webp({ quality: 88 }).toFile(outputPath);
}

async function copyBrowserImage(sourcePath, outputPath) {
  await fs.copyFile(sourcePath, outputPath);
}

async function processFile(sourcePath, manifestCandidates, failures) {
  const extension = normalizeExtension(sourcePath);
  const relativeSourcePath = path.relative(SOURCE_DIR, sourcePath);
  const parsedPath = path.parse(relativeSourcePath);
  const outputRelativePath = HEIC_EXTENSIONS.has(extension)
    ? path.join(parsedPath.dir, `${parsedPath.name}.webp`)
    : path.join(parsedPath.dir, parsedPath.base);
  const outputPath = path.join(OUTPUT_DIR, outputRelativePath);

  await ensureDirectory(path.dirname(outputPath));

  try {
    const needsUpdate = await shouldRegenerate(sourcePath, outputPath);
    if (needsUpdate) {
      if (HEIC_EXTENSIONS.has(extension)) {
        await convertHeicToWebp(sourcePath, outputPath);
        console.log(`Converted: ${relativeSourcePath} -> ${path.relative(OUTPUT_DIR, outputPath)}`);
      } else {
        await copyBrowserImage(sourcePath, outputPath);
        console.log(`Copied: ${relativeSourcePath}`);
      }
    } else {
      console.log(`Skipped up-to-date: ${relativeSourcePath}`);
    }

    const categoryName = relativeSourcePath.split(path.sep)[0];
    if (!categoryName) {
      return;
    }

    const baseName = path.basename(outputPath, path.extname(outputPath)).toLowerCase();
    if (!manifestCandidates.has(categoryName)) {
      manifestCandidates.set(categoryName, new Map());
    }

    manifestCandidates.get(categoryName).set(baseName, {
      extension: normalizeExtension(outputPath),
      publicPath: toPublicImagePath(outputRelativePath)
    });
  } catch (error) {
    failures.push({
      file: relativeSourcePath,
      reason: error.message
    });
    console.error(`Failed processing ${relativeSourcePath}: ${error.message}`);
  }
}

function buildManifest(manifestCandidates) {
  const manifest = {};

  for (const [categoryName, imagesByBaseName] of manifestCandidates.entries()) {
    const preferredImages = [...imagesByBaseName.entries()]
      .map(([baseName, value]) => ({ baseName, ...value }))
      .sort((left, right) => {
        const extensionDiff =
          OUTPUT_PREFERENCE.indexOf(left.extension) - OUTPUT_PREFERENCE.indexOf(right.extension);
        if (extensionDiff !== 0) {
          return extensionDiff;
        }

        return left.baseName.localeCompare(right.baseName);
      });

    const deduplicated = new Map();
    for (const image of preferredImages) {
      if (!deduplicated.has(image.baseName)) {
        deduplicated.set(image.baseName, image.publicPath);
      }
    }

    manifest[categoryName] = [...deduplicated.entries()]
      .sort((left, right) => left[0].localeCompare(right[0]))
      .map(([, publicPath]) => publicPath);
  }

  return manifest;
}

async function writeManifest(manifest) {
  await ensureDirectory(path.dirname(MANIFEST_PATH));
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

async function main() {
  await ensureDirectory(OUTPUT_DIR);

  if (!(await pathExists(SOURCE_DIR))) {
    console.warn(`Source folder not found: ${SOURCE_DIR}`);
    await writeManifest({});
    return;
  }

  const sourceFiles = (await walkDirectory(SOURCE_DIR)).filter((filePath) => {
    const extension = normalizeExtension(filePath);
    return HEIC_EXTENSIONS.has(extension) || BROWSER_EXTENSIONS.has(extension);
  });

  const manifestCandidates = new Map();
  const failures = [];

  for (const sourceFile of sourceFiles) {
    await processFile(sourceFile, manifestCandidates, failures);
  }

  const manifest = buildManifest(manifestCandidates);
  await writeManifest(manifest);

  console.log(`Generated manifest with ${Object.keys(manifest).length} categories.`);

  if (failures.length > 0) {
    console.warn(`Completed with ${failures.length} failed file(s).`);
    failures.forEach((failure) => {
      console.warn(`- ${failure.file}: ${failure.reason}`);
    });
  }
}

main().catch((error) => {
  console.error(`Image conversion script failed: ${error.message}`);
  process.exitCode = 1;
});
