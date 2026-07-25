// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.reach', (reach) =>
{
    reach.Item({
        id: 'dead',
        description: 'Every back file is reachable from the back load.js, a file no barrel imports is dead weight.',
        check: (root, alias, report, reach) =>
        {
            const base = reach.Fn('get.base', root, 'back');

            if(!base)
            {
                return;
            }

            const reached = reach.Fn('get.reached', root, alias, 'back');

            for(const file of onetype.assets.read(base))
            {
                if(!reached.has(file))
                {
                    report(file, 'Nothing imports this file, the back load.js barrel never reaches it.');
                }
            }
        }
    });
});
