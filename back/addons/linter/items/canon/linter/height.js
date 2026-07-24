// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'height',
        description: 'A file holds at most one hundred and sixty lines, longer means the work wants splitting.',
        check: (source, lines, report) =>
        {
            const count = source.endsWith('\n') ? lines.length - 1 : lines.length;

            if(count > 160)
            {
                report(
                    161,
                    'File of ' + count + ' lines, the canon stops at 160. '
                        + 'This one is about the file, not the function, so naming more steps on this will not shorten it. '
                        + 'Find the part that stands on its own, give it its own file, and call it from here.'
                );
            }
        }
    });
});
