/* ============================================================ */
/* FIL: scripts/print-assembler.js                              */
/* Uppdaterad med korrekt fillista och logik för auto-utskrift. */
/* ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
    // Hämta referenser till HTML-elementen vi ska arbeta med.
    const loader = document.getElementById('loader');
    const dossierContent = document.getElementById('dossier-content');

    // ============================================================
    // KORRIGERAD FILLISTA: Matchar nu din projektstruktur exakt.
    // ============================================================
    const documentPaths = [
        'docs/00-portada.html',
        'docs/01-innehallsforteckning.html',
        'docs/02-legal-cover.html',
        'docs/03-dokument1.html',
        'docs/04-dokument2.html',
        'docs/05-anexos-cover.html',
        'docs/06-bilaga1.html',
        'docs/07-bilaga2.html',
        'docs/08-bilaga3.html',
        'docs/09-bilaga4.html',
        'docs/10-bilaga5.html',
        'docs/11-bilaga6.html',
        'docs/12-bilaga7.html',
        'docs/13-bilaga8.html',
        'docs/14-bilaga9.html',
        'docs/15-bilaga10.html',
        'docs/16-bilaga11.html',
        'docs/17-bilaga12.html',
        'docs/18-bilaga13.html',
        'docs/19-bilaga14.html',
        'docs/20-bilaga15.html',
        'docs/21-bilaga16.html'
    ];

    // Använd en DOMParser för att kunna extrahera innehållet från <body> i varje fil.
    // Detta förhindrar att vi får dubbla <head>- eller <html>-taggar.
    const parser = new DOMParser();

    // Loopa igenom varje sökväg i listan och hämta innehållet.
    for (const path of documentPaths) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Kunde inte ladda filen: ${path} (Status: ${response.status})`);
            
            const htmlText = await response.text();
            const doc = parser.parseFromString(htmlText, 'text/html');
            
            // Hämta allt innehåll inuti <body>-taggen från den inlästa filen.
            const content = doc.body.innerHTML;

            // Skapa en <section> för varje dokument. Klassen 'print-section' används
            // i CSS för att tvinga fram en sidbrytning före varje nytt dokument.
            const section = document.createElement('section');
            section.className = 'print-section';
            section.innerHTML = content;
            
            // Lägg till den nya sektionen i vår huvudsakliga innehålls-div.
            dossierContent.appendChild(section);

        } catch (error) {
            console.error(error);
            // Om en fil inte kan laddas, visa ett tydligt felmeddelande på sidan.
            const errorElement = document.createElement('div');
            errorElement.className = 'print-section';
            errorElement.innerHTML = `<p style="color:red; text-align:center; font-family: sans-serif; font-weight: bold; border: 2px solid red; padding: 2em;">FEL: Kunde inte ladda dokumentet från sökvägen "${path}".</p>`;
            dossierContent.appendChild(errorElement);
        }
    }

    // ==============================================================================
    // VIKTIGT: Dölj laddningsmeddelandet när alla filer har processats.
    // Detta kommer att signalera till skriptet i `print-all.html` att det är dags
    // att öppna utskriftsdialogen automatiskt.
    // ==============================================================================
    loader.style.display = 'none';
});