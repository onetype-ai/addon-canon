// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'placement',
        description: 'Every registration lives in the folder its placement item names.',
        check: (file, tree, walk, report) =>
        {
            const calls = tree.body
                .filter((node) => node.type === 'ExpressionStatement')
                .map((node) => node.expression)
                .filter((node) =>
                {
                    return node.type === 'CallExpression'
                        && node.callee.type === 'MemberExpression';
                });

            for(const node of calls)
            {
                const entry = Object.values(onetype.AddonGet('canon.placements').Items()).find((candidate) =>
                {
                    if(candidate.Get('method') !== node.callee.property.name)
                    {
                        return false;
                    }

                    const receiver = candidate.Get('receiver');

                    return receiver ? receiver === node.callee.object.name : true;
                });

                if(entry && !file.includes(entry.Get('home')))
                {
                    report(node.loc.start.line, entry.Get('method') + ' lives in ' + entry.Get('home') + ', this file sits elsewhere.');
                }
            }
        }
    });
});
