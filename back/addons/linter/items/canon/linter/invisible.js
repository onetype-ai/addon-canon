// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'invisible',
        description: 'No byte order mark and no invisible unicode, the zero width space and its family stay out of the code.',
        check: (source, lines, report) =>
        {
            if(source.charCodeAt(0) === 0xFEFF)
            {
                report(1, 'The file opens with a byte order mark, plain UTF-8 needs none.');
            }

            lines.forEach((line, index) =>
            {
                const invisible = line.match(/[\u00A0\u200B\u200C\u200D\u2060\uFEFF]/);

                if(invisible)
                {
                    const code = invisible[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');

                    report(index + 1, 'Invisible unicode character U+' + code + ' found, only plain spaces belong here.');
                }
            });
        }
    });
});
