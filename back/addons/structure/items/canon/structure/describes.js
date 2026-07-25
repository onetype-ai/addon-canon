// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'describes',
        description: 'An addon says in one sentence what it is for, through addon.Description, so nothing registers itself without saying why.',
        check: function(file, tree, walk, report)
        {
            this.declares = (node) =>
            {
                return node.type === 'CallExpression'
                    && node.callee.type === 'MemberExpression'
                    && node.callee.object.name === 'onetype'
                    && node.callee.property.name === 'Addon'
                    && node.arguments.length > 0;
            };

            this.describes = (node) =>
            {
                return node.type === 'CallExpression'
                    && node.callee.type === 'MemberExpression'
                    && node.callee.property.name === 'Description';
            };

            this.named = (node) =>
            {
                const first = node.arguments[0];

                return first && first.type === 'Literal' ? first.value : 'the addon';
            };

            const declared = [];
            let described = false;

            walk((node) =>
            {
                this.declares(node) && declared.push(node);
                this.describes(node) && (described = true);
            });

            declared.forEach((node) =>
            {
                described || report(node.loc.start.line, 'The addon ' + this.named(node)
                    + ' says nothing about itself, addon.Description() opens the declaration.');
            });
        }
    });
});
