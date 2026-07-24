// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'branches',
        description: 'Else, catch and finally open on their own line below the closing brace, Allman all the way down.',
        check: (source, lines, report) =>
        {
            lines.forEach((line, index) =>
            {
                const clean = line.replace(/'[^']*'/g, "''").replace(/"[^"]*"/g, '""').replace(/`[^`]*`/g, '``');

                if(/\}\s*(else|catch|finally)\b/.test(clean))
                {
                    report(index + 1, 'The branch rides the closing brace, it opens on its own line.');
                }

                if(/\b(else|finally|try|do)\s*\{\s*$/.test(clean))
                {
                    report(index + 1, 'Opening brace rides the branch, move it to its own line.');
                }
            });
        }
    });
});
