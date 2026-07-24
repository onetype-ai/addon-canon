// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'spacing',
        description: 'No trailing whitespace and no runs of blank lines.',
        check: (source, lines, report) =>
        {
            if(source.trim() && lines[0] !== undefined && lines[0].trim() === '')
            {
                report(1, 'The file opens with a blank line.');
            }

            lines.forEach((line, index) =>
            {
                if(/[ \t]+$/.test(line))
                {
                    report(index + 1, 'Trailing whitespace.');
                }

                if(line.trim() === '' && lines[index + 1] !== undefined && lines[index + 1].trim() === '')
                {
                    report(index + 2, 'More than one blank line in a row.');
                }
            });
        }
    });
});
