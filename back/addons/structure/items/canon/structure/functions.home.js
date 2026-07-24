// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'functions.home',
        description: 'A function registration, a Fn call carrying a function body, lives in the functions folder and nowhere else.',
        check: (file, tree, walk, report) =>
        {
            if(file.includes('/functions/') || file.includes('/item/functions/'))
            {
                return;
            }

            walk((node) =>
            {
                if(node.type === 'CallExpression'
                    && node.callee.type === 'MemberExpression'
                    && node.callee.property.name === 'Fn'
                    && node.arguments.length >= 2
                    && node.arguments[0].type === 'Literal'
                    && ['FunctionExpression', 'ArrowFunctionExpression'].includes(node.arguments[1].type))
                {
                    report(node.loc.start.line, 'Function ' + node.arguments[0].value + ' registers outside functions, it moves there.');
                }
            });
        }
    });
});
