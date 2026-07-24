// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.reach', (reach) =>
{
    reach.Item({
        id: 'stale',
        description: 'Every import in the back barrel resolves to a real file, an import to nothing is stale.',
        check: (root, alias, report, reach) =>
        {
            if(!reach.Fn('get.base', root, 'back'))
            {
                return;
            }

            const missing = [];

            reach.Fn('get.reached', root, alias, 'back', missing);

            for(const entry of missing)
            {
                report(entry.file, 'The barrel imports ' + entry.specifier + ' but no such file exists, the import is stale.');
            }
        }
    });
});
