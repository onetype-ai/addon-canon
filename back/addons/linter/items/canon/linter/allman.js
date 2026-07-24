// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'allman',
        description: 'Every block brace opens on its own line, never at the end of a statement.',
        check: (source, lines, report) =>
        {
            lines.forEach((line, index) =>
            {
                const clean = line.replace(/'[^']*'/g, "''").replace(/"[^"]*"/g, '""').replace(/`[^`]*`/g, '``');

                if(/\)\s*\{\s*$/.test(clean) && !/^\s*\}/.test(clean))
                {
                    report(index + 1, 'Opening brace rides the statement, move it to its own line.');
                }
            });
        }
    });
});
