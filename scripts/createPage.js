import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Tentukan __filename dan __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ambil nama modul dari argumen baris perintah
const moduleName = process.argv[2];

if (!moduleName) {
    console.error('Please provide a module name.');
    process.exit(1);
}

// Tentukan path folder `pages`
const pagesPath = path.join(__dirname, '..', 'src', 'pages');

// Cek apakah folder `pages` sudah ada, jika belum buat foldernya
if (!fs.existsSync(pagesPath)) {
    fs.mkdirSync(pagesPath, { recursive: true });
    console.log('Folder `pages` created successfully.');
}

// Tentukan path folder untuk modul di dalam folder `pages`
const modulePath = path.join(pagesPath, moduleName);

// Cek apakah folder modul sudah ada
if (fs.existsSync(modulePath)) {
    console.error(`Folder ${moduleName} already exists in the pages directory.`);
    process.exit(1);
}

// Buat folder modul
fs.mkdirSync(modulePath);

// Isi template untuk setiap file
const files = {
    [`${moduleName}Page.tsx`]: `
import React from 'react';

const ${moduleName}Page = () => {
    return (
        <div>
            <h1>${moduleName} Page</h1>
        </div>
    );
};

export default ${moduleName}Page;
`,
    [`use${moduleName}.tsx`]: `
import { useState } from 'react';

export const use${moduleName} = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return { step, nextStep, prevStep };
};
`,
    [`${moduleName}Splice.ts`]: `
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step: 0,
};

const ${moduleName}Slice = createSlice({
    name: '${moduleName.toLowerCase()}',
    initialState,
    reducers: {
        nextStep(state) {
            state.step += 1;
        },
        prevStep(state) {
            state.step -= 1;
        },
    },
});

export const { nextStep, prevStep } = ${moduleName}Slice.actions;

export default ${moduleName}Slice.reducer;
`,
    'index.ts': `
export { default as ${moduleName}Page } from './${moduleName}Page';
export { use${moduleName} } from './use${moduleName}';
export { default as ${moduleName}Reducer } from './${moduleName}Splice';
`
};

// Buat file di dalam folder modul
Object.entries(files).forEach(([filename, content]) => {
    const filePath = path.join(modulePath, filename);
    fs.writeFileSync(filePath, content.trim());
});

console.log(`${moduleName} module created successfully at ${modulePath}`);
