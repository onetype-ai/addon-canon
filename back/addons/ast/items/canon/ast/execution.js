// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'execution',
        description: 'No code born from strings, eval, the Function constructor and string timers stay out, the canon reads only what is written.',
        check: (tree, walk, report) =>
        {
            walk((node) =>
            {
                if(node.type === 'CallExpression' && node.callee.name === 'eval')
                {
                    report(node.loc.start.line, 'Eval found, no code runs from a string.');
                }

                if(node.type === 'NewExpression' && node.callee.name === 'Function')
                {
                    report(node.loc.start.line, 'Function constructor found, no code runs from a string.');
                }

                if(node.type === 'CallExpression'
                    && ['setTimeout', 'setInterval'].includes(node.callee.name)
                    && node.arguments[0]
                    && node.arguments[0].type === 'Literal')
                {
                    report(node.loc.start.line, 'A timer holds a string, it takes a function.');
                }
            });
        }
    });
});
