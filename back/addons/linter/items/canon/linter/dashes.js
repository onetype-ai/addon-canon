// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'dashes',
        description: 'No em dash and no en dash anywhere, a sentence breaks on a comma and a range reads with the word to.',
        check: (source, lines, report) =>
        {
            const named = {
                ['\u2013']: 'en dash',
                ['\u2014']: 'em dash'
            };

            lines.forEach((line, index) =>
            {
                const found = line.match(/[\u2013\u2014]/);

                if(found)
                {
                    report(index + 1, 'An ' + named[found[0]] + ' found, the canon writes a comma where it breaks and the word to where it spans.');
                }
            });
        }
    });
});
