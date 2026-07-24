// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'names',
        description: 'A declared name carries at least three letters, a variable, a parameter or a function alike. Id is the one canonical exception.',
        check: (tree, walk, report) =>
        {
            const spread = (node, found) =>
            {
                if(node.type === 'ObjectPattern')
                {
                    return node.properties.forEach((property) =>
                    {
                        gather(property.value ? property.value : property.argument, found);
                    });
                }

                if(node.type === 'ArrayPattern')
                {
                    return node.elements.forEach((element) => gather(element, found));
                }

                if(['RestElement', 'SpreadElement'].includes(node.type))
                {
                    return gather(node.argument, found);
                }

                node.type === 'AssignmentPattern' && gather(node.left, found);
            };

            const gather = (node, found) =>
            {
                if(!node)
                {
                    return found;
                }

                node.type === 'Identifier' && found.push(node);

                spread(node, found);

                return found;
            };

            const targets = (node) =>
            {
                const found = [];

                if(['FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type))
                {
                    gather(node.id, found);
                    node.params.forEach((param) => gather(param, found));
                }

                node.type === 'VariableDeclarator' && gather(node.id, found);
                node.type === 'CatchClause' && gather(node.param, found);

                return found;
            };

            walk((node) =>
            {
                targets(node).forEach((target) =>
                {
                    if(target.name.length < 3 && target.name !== 'id')
                    {
                        report(target.loc.start.line, 'Name ' + target.name + ' carries ' + target.name.length + ' letters, the canon starts at three.');
                    }
                });
            });
        }
    });
});
