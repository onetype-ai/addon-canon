// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'objects',
        description: 'Object literals with more than one property spread over multiple lines.',
        check: (source, lines, report) =>
        {
            const masked = (line) =>
            {
                const quoted = line.replace(/'(?:\\.|[^'\\])*'/g, "''").replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/`(?:\\.|[^`\\])*`/g, '``');

                return quoted.replace(/\/(?:\\.|\[[^\]]*\]|[^/\\])+\/[a-z]*/g, '::');
            };

            const inline = (line) =>
            {
                let clean = masked(line);
                let previous = null;

                while(previous !== clean)
                {
                    previous = clean;
                    clean = clean.replace(/\[[^\[\]{}]*\]/g, '').replace(/\([^(){}]*\)/g, '');

                    if(/\{[^{}]*:[^{}]*,[^{}]*:[^{}]*\}/.test(clean))
                    {
                        return true;
                    }

                    clean = clean.replace(/\{[^{}]*\}/g, '');
                }

                return false;
            };

            lines.forEach((line, index) =>
            {
                if(inline(line))
                {
                    report(index + 1, 'Inline object with several properties, spread it over lines.');
                }
            });
        }
    });
});
