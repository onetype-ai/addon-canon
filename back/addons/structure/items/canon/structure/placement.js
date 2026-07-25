// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'placement',
        description: 'Every registration lives in one of the folders its placement item names, unless a pattern claims the file it sits in.',
        check: function(file, tree, walk, report)
        {
            this.claimed = () =>
            {
                return Object.values(onetype.AddonGet('canon.patterns').Items())
                    .some((entry) =>
                    {
                        const claims = entry.Get('claims');

                        return claims ? file.includes(claims) : false;
                    });
            };

            this.registers = (node) =>
            {
                return node.type === 'CallExpression'
                    && node.callee.type === 'MemberExpression'
                    && !!node.callee.property;
            };

            this.placement = (node) =>
            {
                return Object.values(onetype.AddonGet('canon.placements').Items()).find((candidate) =>
                {
                    if(candidate.Get('method') !== node.callee.property.name)
                    {
                        return false;
                    }

                    const receiver = candidate.Get('receiver');

                    return receiver ? receiver === node.callee.object.name : true;
                });
            };

            this.homes = (entry) =>
            {
                return [].concat(entry.Get('home'));
            };

            this.astray = (entry) =>
            {
                return !this.homes(entry).some((home) => file.includes(home));
            };

            this.told = (entry) =>
            {
                const homes = this.homes(entry);
                const named = homes.length > 1 ? homes.slice(0, -1).join(', ') + ' or ' + homes[homes.length - 1] : homes[0];

                return entry.Get('method') + ' lives in ' + named + ', this file sits elsewhere.';
            };

            if(this.claimed())
            {
                return;
            }

            walk((node) =>
            {
                if(!this.registers(node))
                {
                    return;
                }

                const entry = this.placement(node);

                entry && this.astray(entry) && report(node.loc.start.line, this.told(entry));
            });
        }
    });
});
