// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'catches',
        description: 'A catch takes the error in hand, it reads it or throws it on, a silent swallow is a decision nobody sees.',
        check: (tree, walk, report) =>
        {
            const deeper = (node, name) =>
            {
                return Object.keys(node)
                    .filter((key) => !['loc', 'start', 'end'].includes(key))
                    .some((key) => touches(node[key], name));
            };

            const touches = (node, name) =>
            {
                if(!node || typeof node !== 'object')
                {
                    return false;
                }

                if(Array.isArray(node))
                {
                    return node.some((part) => touches(part, name));
                }

                if(node.type === 'ThrowStatement')
                {
                    return true;
                }

                return node.type === 'Identifier' ? node.name === name : deeper(node, name);
            };

            const clause = (node) =>
            {
                if(!node.body.body.length)
                {
                    return report(node.loc.start.line, 'An empty catch swallows the error, read it or throw it on.');
                }

                if(!touches(node.body, node.param ? node.param.name : null))
                {
                    report(node.loc.start.line, 'The catch never touches its error, read it or throw it on.');
                }
            };

            const hollow = (node) =>
            {
                return node.type === 'CallExpression'
                    && node.callee.type === 'MemberExpression'
                    && node.callee.property.name === 'catch'
                    && !!node.arguments[0]
                    && ['FunctionExpression', 'ArrowFunctionExpression'].includes(node.arguments[0].type)
                    && node.arguments[0].body.type === 'BlockStatement'
                    && !node.arguments[0].body.body.length;
            };

            walk((node) =>
            {
                node.type === 'CatchClause' && clause(node);

                if(hollow(node))
                {
                    report(node.loc.start.line, 'An empty promise catch swallows the error, read it or throw it on.');
                }
            });
        }
    });
});
