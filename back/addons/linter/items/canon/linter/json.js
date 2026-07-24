// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'json',
        description: 'An object value opens on the property line, the brace rides the colon. Allman is for blocks, not for data.',
        check: (source, lines, report) =>
        {
            lines.forEach((line, index) =>
            {
                const clean = line.replace(/'[^']*'/g, "''").replace(/"[^"]*"/g, '""').replace(/`[^`]*`/g, '``');
                const next = lines[index + 1];

                if(/^\s*['"\w]+\s*:\s*$/.test(clean) && next !== undefined && /^\s*\{/.test(next))
                {
                    report(index + 2, 'The brace of a data object rides the property line, not its own.');
                }

                if(/[\[]\s*$/.test(clean) && next !== undefined && /^\s*[{\[]\s*$/.test(next.replace(/'[^']*'/g, "''")))
                {
                    report(index + 2, 'The row of an array rides the bracket, not its own line.');
                }

                if(/^\s*\},\s*$/.test(clean) && next !== undefined && /^\s*\{\s*$/.test(next))
                {
                    report(index + 2, 'The next row rides the comma, like }, {.');
                }
            });
        }
    });
});
