/* ============================================================ */
/* FIL: scripts/compiler.js                                     */
/* Uppdaterad med korrekt fillista och förbättrad feedback.     */
/* ============================================================ */

// Det här skriptet sammanställer hela repot i en enda .txt-fil för att underlätta interaktion med en AI.
// Det körs helt i användarens webbläsare.

document.addEventListener('DOMContentLoaded', () => {
    const compileBtn = document.getElementById('compileBtn');
    if (!compileBtn) return;

    // ============================================================
    // KORRIGERAD FILLISTA: Matchar nu din projektstruktur exakt.
    // ============================================================
    const fileList = [
        // Rotfiler
        { path: 'index.html' },
        
        // CSS-filer
        { path: 'css/main.css' },
        { path: 'css/unique-styles.css' },
        
        // Dokumentfiler
        { path: 'docs/00-portada.html' },
        { path: 'docs/01-innehallsforteckning.html' },
        { path: 'docs/02-legal-cover.html' },
        { path: 'docs/03-dokument1.html' },
        { path: 'docs/04-dokument2.html' },
        { path: 'docs/05-anexos-cover.html' },
        { path: 'docs/06-bilaga1.html' },
        { path: 'docs/07-bilaga2.html' },
        { path: 'docs/08-bilaga3.html' },
        { path: 'docs/09-bilaga4.html' },
        { path: 'docs/10-bilaga5.html' },
        { path: 'docs/11-bilaga6.html' },
        { path: 'docs/12-bilaga7.html' },
        { path: 'docs/13-bilaga8.html' },
        { path: 'docs/14-bilaga9.html' },
        { path: 'docs/15-bilaga10.html' },
        { path: 'docs/16-bilaga11.html' },
        { path: 'docs/17-bilaga12.html' },
        { path: 'docs/18-bilaga13.html' },
        { path: 'docs/19-bilaga14.html' },
        { path: 'docs/20-bilaga15.html' },
        { path: 'docs/21-bilaga16.html' },
        
        // Skript-filer
        { path: 'scripts/compiler.js' },
        { path: 'scripts/print-assembler.js' }
    ];

    compileBtn.addEventListener('click', async () => {
        const originalButtonText = compileBtn.textContent;
        compileBtn.textContent = 'Sammanställer...';
        compileBtn.disabled = true;

        let hasErrors = false;
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
                hasErrors = true;
            }
        }

        // Skapa och ladda ner textfilen
        const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `repo-dossier-monica_${new Date().getTime()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Meddela om fel och återställ knappen
        if (hasErrors) {
            alert('Sammanställningen är klar, men en eller flera filer kunde inte laddas. Kontrollera webbläsarens konsol (F12) för mer information.');
        } else {
            alert('Sammanställningen är klar! En .txt-fil har laddats ner.');
        }
        
        compileBtn.textContent = originalButtonText;
        compileBtn.disabled = false;
    });
});