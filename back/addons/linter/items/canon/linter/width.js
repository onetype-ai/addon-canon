// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'width',
        description: 'A line holds at most one hundred and sixty characters, longer means something wants splitting.',
        check: (source, lines, report) =>
        {
            lines.forEach((line, index) =>
            {
                if(line.length > 160)
                {
                    report(
                        index + 1,
                        'Line of ' + line.length + ' characters, the canon stops at 160. '
                            + 'A line carries one thought, name the parts and compose them.'
                    );
                }
            });
        }
    });
});
