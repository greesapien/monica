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
        { path: 'docs/01-legal-cover.html' },
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
        { path: 'docs/16-bilaga12.html' }, // <-- NUEVO
        { path: 'docs/17-bilaga13.html' }, // <-- NUEVO
        { path: 'docs/18-bilaga14.html' }, // <-- RE-NUMERADO
        { path: 'docs/19-bilaga15.html' }, // <-- RE-NUMERADO
        { path: 'docs/20-bilaga16.html' }, // <-- RE-NUMERADO
        { path: 'css/main.css' },
        { path: 'css/unique-styles.css' },
        { path: 'scripts/compiler.js' }
    ];

    compileBtn.addEventListener('click', async () => {
        alert('Iniciando compilación del repositorio. El archivo .txt se descargará automáticamente al finalizar.');

        let fullContent = `
# ============================================================
# COMPILACIÓN DEL REPOSITORIO COMPLETO
# CASO: Mónica L. González Estrada
# FECHA: ${new Date().toISOString()}
# ============================================================
# Este archivo contiene el código fuente de todo el repositorio 
# para una iteración rápida y contextualizada con una IA.
# Cada sección de archivo incluye su ruta y URL completa.
# ============================================================
`;

        for (const file of fileList) {
            try {
                const response = await fetch(file.path);
                if (!response.ok) throw new Error(`Error HTTP! Estado: ${response.status}`);
                const content = await response.text();
                
                fullContent += `\n\n\n`;
                fullContent += `// ============================================================\n`;
                fullContent += `// ARCHIVO: ${file.path}\n`;
                fullContent += `// URL COMPLETA: ${new URL(file.path, window.location.href).href}\n`;
                fullContent += `// ============================================================\n\n`;
                fullContent += content;

            } catch (error) {
                console.error(`Error al cargar el archivo ${file.path}:`, error);
                fullContent += `\n\n// --- ERROR AL CARGAR EL ARCHIVO: ${file.path} ---\n// Causa: ${error.message}\n\n`;
            }
        }

        const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `repositorio-dossier-monica_${new Date().getTime()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});