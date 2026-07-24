// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'endings',
        description: 'Lines end with LF alone, never CRLF, and the file closes with exactly one newline.',
        check: (source, lines, report) =>
        {
            lines.forEach((line, index) =>
            {
                if(line.includes('\r'))
                {
                    report(index + 1, 'Carriage return found, lines end with LF alone.');
                }
            });

            if(source.length && !source.endsWith('\n'))
            {
                report(lines.length, 'The file closes without a newline.');
            }

            if(source.endsWith('\n\n'))
            {
                report(lines.length, 'The file closes with blank lines, one newline ends it.');
            }
        }
    });
});
