// ============================================================
// ARCHIVO: scripts/compiler.js
// URL COMPLETA: https://greesapien.github.io/monica/scripts/compiler.js
// ============================================================

// Este script se encarga de compilar todo el repositorio en un único archivo .txt para facilitar su uso con IA.
// NO es una GitHub Action. Se ejecuta 100% en el navegador del cliente.

document.addEventListener('DOMContentLoaded', () => {
    const compileBtn = document.getElementById('compileBtn');
    if (!compileBtn) return;

    // Lista completa de archivos del repositorio a compilar.
    const fileList = [
        { path: 'index.html' },
        { path: 'docs/00-portada.html' },
        { path: 'docs/01-legal-cover.html' }, // <-- ARCHIVO AÑADIDO
        { path: 'docs/02-dokument1.html' },
        { path: 'docs/03-dokument2.html' },
        { path: 'docs/04-anexos-cover.html' },
        { path: 'docs/05-bilaga1.html' },
        { path: 'docs/06-bilaga2.html' },
        { path: 'docs/07-bilaga3.html' },
        { path: 'docs/08-bilaga4.html' },
        { path: 'docs/09-bilaga5.html' },
        { path: 'docs/10-bilaga6.html' },
        { path: 'docs/11-bilaga7.html' },
        { path: 'docs/12-bilaga8.html' },
        { path: 'docs/13-bilaga9.html' },
        { path: 'docs/14-bilaga10.html' },
        { path: 'docs/15-bilaga11.html' },
        { path: 'docs/16-bilaga12.html' },
        { path: 'docs/17-bilaga13.html' },
        { path: 'docs/18-bilaga14.html' },
        { path: 'docs/19-bilaga15.html' },
        { path: 'docs/20-bilaga16.html' },
        { path: 'css/main.css' },
        { path: 'css/unique-styles.css' },
        { path: 'scripts/compiler.js' }
    ];

    compileBtn.addEventListener('click', async () => {
        alert('Iniciando kompilering av repot. En .txt-fil kommer att laddas ner automatiskt när det är klart.');

        let fullContent = `
# ============================================================
# SAMMANSTÄLLNING AV HELA REPOT
# Ärende: Mónica L. González Estrada
# DATUM: ${new Date().toISOString()}
# ============================================================
# Denna fil innehåller källkoden från hela repot för snabb
# och kontextuell interaktion med en AI.
# Varje filsektion inkluderar dess sökväg och fullständiga URL.
# ============================================================
`;

        for (const file of fileList) {
            try {
                const response = await fetch(file.path);
                if (!response.ok) throw new Error(`HTTP-fel! Status: ${response.status}`);
                const content = await response.text();
                
                fullContent += `\n\n\n`;
                fullContent += `// ============================================================\n`;
                fullContent += `// FIL: ${file.path}\n`;
                fullContent += `// FULLSTÄNDIG URL: ${new URL(file.path, window.location.href).href}\n`;
                fullContent += `// ============================================================\n\n`;
                fullContent += content;

            } catch (error) {
                console.error(`Fel vid laddning av filen ${file.path}:`, error);
                fullContent += `\n\n// --- FEL VID LADDNING AV FIL: ${file.path} ---\n// Orsak: ${error.message}\n\n`;
            }
        }

        const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `repo-dossier-monica_${new Date().getTime()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});