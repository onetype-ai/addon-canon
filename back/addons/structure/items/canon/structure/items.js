// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'items',
        description: 'An items file registers one Item into the addon its folders name, dots become folders, and the id spells the owning addon and the file.',
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

            this.ready = (first) =>
            {
                return !!first
                    && first.type === 'ExpressionStatement'
                    && first.expression.type === 'CallExpression'
                    && first.expression.callee.type === 'MemberExpression'
                    && first.expression.callee.object.name === 'onetype'
                    && first.expression.callee.property.name === 'AddonReady';
            };

            this.alone = (statements, ready) =>
            {
                if(statements.length === 1)
                {
                    return;
                }

                const stray = statements[ready ? 1 : 0];

                report(stray ? stray.loc.start.line : 1, 'An items file holds imports and one registration, nothing else lives here.');
            };

            this.registered = () =>
            {
                const items = [];

                walk((node) =>
                {
                    if(node.type === 'CallExpression'
                        && node.callee.type === 'MemberExpression'
                        && ['Item', 'ItemAdd'].includes(node.callee.property.name)
                        && node.arguments[0]
                        && node.arguments[0].type === 'ObjectExpression')
                    {
                        items.push(node);
                    }
                });

                return items;
            };

            this.chained = (item) =>
            {
                const chain = [];
                let node = item.callee.object;

                while(node && node.type === 'MemberExpression')
                {
                    chain.unshift(node.property.name);
                    node = node.object;
                }

                node && node.type === 'Identifier' && chain.unshift(node.name);

                return chain.join('.');
            };

            this.target = (first, ready, items) =>
            {
                const carried = ready ? first.expression.arguments[0] : null;

                if(carried && typeof carried.value === 'string')
                {
                    return carried.value;
                }

                return items.length ? this.chained(items[0]) : null;
            };

            this.nest = (segments, target) =>
            {
                if(!target)
                {
                    return segments;
                }

                const parts = target.split('.');

                if(segments.slice(0, parts.length).join('.') !== parts.join('.'))
                {
                    report(1, 'The block targets ' + target + ' but the folders spell ' + segments.join('/') + ', dots become folders.');
                }

                return segments.slice(parts.length);
            };

            this.block = (items) =>
            {
                const statements = tree.body.filter((node) => node.type !== 'ImportDeclaration');
                const first = statements[0];
                const ready = this.ready(first);

                this.alone(statements, ready);

                return this.target(first, ready, items);
            };

            const match = file.match(/\/(back|front)\/((?:addons\/[^/]+\/)*)items\/(.+)\.js$/);

            if(!match || this.claimed())
            {
                return;
            }

            const segments = match[3].split('/');
            const name = segments.pop();
            const owner = structure.Fn('get.owner', file, match[1]);

            const items = this.registered();
            const nest = this.nest(segments, this.block(items));

            if(items.length !== 1)
            {
                return report(1, 'An items file registers one Item, ' + items.length + ' found, one file carries one.');
            }

            structure.Fn('assert.spelling', items, report, { nest, name, owner });
        }
    });
});
