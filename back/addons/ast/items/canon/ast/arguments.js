// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'arguments',
        description: 'No arguments object, the rest parameter names what arrives.',
        check: (tree, walk, report) =>
        {
            const key = (node, parent) =>
            {
                if(!parent || parent.computed)
                {
                    return false;
                }

                if(parent.type === 'MemberExpression')
                {
                    return parent.property === node;
                }

                return parent.type === 'Property'
                    && parent.key === node;
            };

            const visit = (node, parent) =>
            {
                if(Array.isArray(node))
                {
                    node.forEach((part) => visit(part, parent));

                    return;
                }

                if(!node || typeof node !== 'object' || !node.type)
                {
                    return;
                }

                reach(node, parent);
                walkers(node);
            };

            const reach = (node, parent) =>
            {
                if(node.type !== 'Identifier' || node.name !== 'arguments')
                {
                    return;
                }

                if(!key(node, parent))
                {
                    report(node.loc.start.line, 'Arguments object found, a rest parameter names what arrives.');
                }
            };

            const walkers = (node) =>
            {
                for(const name of Object.keys(node))
                {
                    if(!['loc', 'start', 'end'].includes(name))
                    {
                        visit(node[name], node);
                    }
                }
            };

            visit(tree.body, null);
        }
    });
});
