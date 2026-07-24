// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'depth',
        description: 'Control flow nests at most two levels inside a function, deeper wants an early return.',
        check: (tree, walk, report) =>
        {
            const blocks = () =>
            {
                return [
                    'IfStatement', 'ForStatement', 'ForOfStatement', 'ForInStatement',
                    'WhileStatement', 'DoWhileStatement', 'SwitchStatement', 'TryStatement'
                ];
            };

            const functions = () =>
            {
                return ['FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'];
            };

            const visit = (node, depth) =>
            {
                if(Array.isArray(node))
                {
                    return node.forEach((part) => visit(part, depth));
                }

                if(!node || typeof node !== 'object' || !node.type)
                {
                    return;
                }

                const next = level(node, depth);

                if(next > 2)
                {
                    return flag(node, next);
                }

                deeper(node, depth, next);
            };

            const flag = (node, next) =>
            {
                report(
                    node.loc.start.line,
                    'Control flow ' + next + ' levels deep, the canon stops at two. '
                        + 'Return early or lift the inner branch into a named step, flat reads honest.'
                );
            };

            const level = (node, depth) =>
            {
                if(functions().includes(node.type))
                {
                    return 0;
                }

                return depth + (blocks().includes(node.type) ? 1 : 0);
            };

            const deeper = (node, depth, next) =>
            {
                for(const key of Object.keys(node))
                {
                    if(!['loc', 'start', 'end'].includes(key))
                    {
                        const chain = node.type === 'IfStatement'
                            && key === 'alternate';

                        visit(node[key], chain ? depth : next);
                    }
                }
            };

            visit(tree.body, 0);
        }
    });
});
