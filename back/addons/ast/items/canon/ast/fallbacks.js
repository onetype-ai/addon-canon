// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'fallbacks',
        description: 'An or-chain in a value position opens every branch on its own line, an inline fallback hides a default the schema owns.',
        check: (tree, walk, report) =>
        {
            const mark = (node) =>
            {
                if(!node || typeof node !== 'object')
                {
                    return;
                }

                if(Array.isArray(node))
                {
                    return node.forEach(mark);
                }

                if(node.type === 'LogicalExpression')
                {
                    allowed.add(node);
                }

                Object.keys(node)
                    .filter((key) => !['loc', 'start', 'end'].includes(key))
                    .forEach((key) => mark(node[key]));
            };

            const allowed = new Set();

            walk((node) =>
            {
                if(['IfStatement', 'WhileStatement', 'DoWhileStatement', 'ForStatement', 'ConditionalExpression'].includes(node.type))
                {
                    mark(node.test);
                }

                if(node.type === 'ExpressionStatement' && node.expression.type === 'LogicalExpression')
                {
                    mark(node.expression);
                }
            });

            walk((node) =>
            {
                if(node.type !== 'LogicalExpression' || allowed.has(node))
                {
                    return;
                }

                if(node.right.loc.start.line > node.left.loc.end.line)
                {
                    return;
                }

                report(
                    node.loc.start.line,
                    'The ' + node.operator + ' rides inline in a value position. '
                        + 'It opens its own line, or the schema carries the default.'
                );
            });
        }
    });
});
