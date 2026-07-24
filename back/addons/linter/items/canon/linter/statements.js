// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'statements',
        description: 'One statement per line, the semicolon ends the line it stands on.',
        check: (source, lines, report) =>
        {
            lines.forEach((line, index) =>
            {
                let clean = line.replace(/'(?:\\.|[^'\\])*'/g, "''").replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/`(?:\\.|[^`\\])*`/g, '``');

                clean = clean.replace(/\/(?:\\.|\[[^\]]*\]|[^/\\])+\/[a-z]*/g, '::');

                let previous = null;

                while(previous !== clean)
                {
                    previous = clean;
                    clean = clean.replace(/\([^()]*\)/g, '');
                }

                if(/;\s*\S/.test(clean))
                {
                    report(index + 1, 'More than one statement on the line, the semicolon ends it.');
                }
            });
        }
    });
});
