// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'arrows',
        description: 'A function bound to a name opens a block, Allman all the way, only a callback riding an argument may stay an expression.',
        check: (tree, walk, report) =>
        {
            const holder = (node) =>
            {
                if(node.type === 'Property')
                {
                    return node.value;
                }

                if(node.type === 'AssignmentExpression')
                {
                    return node.right;
                }

                return node.type === 'VariableDeclarator' ? node.init : null;
            };

            walk((node) =>
            {
                const value = holder(node);

                if(!value || value.type !== 'ArrowFunctionExpression')
                {
                    return;
                }

                if(value.body.type !== 'BlockStatement')
                {
                    report(value.loc.start.line, 'The function is bound to a name, its body opens a block on its own lines.');
                }
            });
        }
    });
});
