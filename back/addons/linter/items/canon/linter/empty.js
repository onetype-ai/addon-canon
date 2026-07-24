// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'empty',
        description: 'A file holds something or it does not exist, blank files go away.',
        check: (source, lines, report) =>
        {
            if(!source.trim())
            {
                report(1, 'The file holds nothing, it goes away.');
            }
        }
    });
});
