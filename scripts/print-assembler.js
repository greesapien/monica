// scripts/print-assembler.js
document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    const dossierContent = document.getElementById('dossier-content');

    // Lista ordenada de los documentos a ensamblar.
    const documentPaths = [
        'docs/00-portada.html',
        'docs/01-legal-cover.html',
        'docs/02-dokument1.html',
        'docs/03-dokument2.html',
        'docs/04-anexos-cover.html',
        'docs/05-bilaga1.html',
        'docs/06-bilaga2.html',
        'docs/07-bilaga3.html',
        'docs/08-bilaga4.html',
        'docs/09-bilaga5.html',
        'docs/10-bilaga6.html',
        'docs/11-bilaga7.html',
        'docs/12-bilaga8.html',
        'docs/13-bilaga9.html',
        'docs/14-bilaga10.html',
        'docs/15-bilaga11.html',
        'docs/16-bilaga12.html',
        'docs/17-bilaga13.html',
        'docs/18-bilaga14.html',
        'docs/19-bilaga15.html'
    ];

    // Usamos un parser para extraer solo el contenido del <body> de cada archivo
    const parser = new DOMParser();

    for (const path of documentPaths) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`No se pudo cargar: ${path}`);
            
            const htmlText = await response.text();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const content = doc.body.innerHTML;

            // Creamos una sección para cada documento para controlar los saltos de página
            const section = document.createElement('section');
            section.className = 'print-section';
            section.innerHTML = content;
            dossierContent.appendChild(section);

        } catch (error) {
            console.error(error);
            dossierContent.innerHTML += `<p style="color:red; text-align:center;">Error al cargar ${path}</p>`;
        }
    }

    // Ocultamos el mensaje de carga y notificamos al usuario
    loader.innerHTML = `
        <h2>✅ Dossier completo ensamblado.</h2>
        <p>Ahora puede imprimir la página completa con <strong>Ctrl+P</strong> o <strong>Cmd+P</strong>.</p>
        <p>Cada documento comenzará en una nueva página.</p>
    `;
});
