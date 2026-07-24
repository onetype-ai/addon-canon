// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'functions.name',
        description: 'An item function carries the registered name after the item prefix, item.do.join lives in do.join.js.',
        check: (file, tree, walk, report) =>
        {
            if(!file.includes('/item/functions/'))
            {
                return;
            }

            const base = file.split('/').pop().replace(/\.js$/, '');
            const name = 'item.' + base;

            walk((node) =>
            {
                if(node.type === 'CallExpression'
                    && node.callee.type === 'MemberExpression'
                    && node.callee.property.name === 'Fn'
                    && node.arguments.length >= 2
                    && node.arguments[0].type === 'Literal'
                    && ['FunctionExpression', 'ArrowFunctionExpression'].includes(node.arguments[1].type)
                    && node.arguments[0].value !== name)
                {
                    report(node.loc.start.line, 'Registered as ' + node.arguments[0].value + ' but the file is ' + base + '.js, the name reads ' + name + '.');
                }
            });
        }
    });
});
