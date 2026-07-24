// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'methods',
        description: 'A function tells its story in fifteen own lines, and it shortens by naming its steps in place, on this inside a Fn callback.',
        check: (tree, walk, report) =>
        {
            const functions = () =>
            {
                return ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'];
            };

            const literals = () =>
            {
                return ['ObjectExpression', 'ArrayExpression', 'TemplateLiteral'];
            };

            const nested = (node) =>
            {
                return functions().includes(node.type)
                    || literals().includes(node.type);
            };

            const hidden = (root) =>
            {
                const spans = (node) =>
                {
                    total += node.loc.end.line - node.loc.start.line;
                };

                const visit = (node) =>
                {
                    if(Array.isArray(node))
                    {
                        return node.forEach(visit);
                    }

                    if(!node || typeof node !== 'object')
                    {
                        return;
                    }

                    if(node.type && node !== root && nested(node))
                    {
                        return spans(node);
                    }

                    Object.keys(node)
                        .filter((key) => !['loc', 'start', 'end'].includes(key))
                        .forEach((key) => visit(node[key]));
                };

                let total = 0;

                visit(root);

                return total;
            };

            const carried = (statement) =>
            {
                return statement.type === 'ExpressionStatement'
                    && statement.expression.type === 'AssignmentExpression'
                    && statement.expression.left.type === 'MemberExpression'
                    && statement.expression.left.object.type === 'ThisExpression'
                    && functions().includes(statement.expression.right.type);
            };

            const named = (statement) =>
            {
                return statement.type === 'VariableDeclaration'
                    && statement.declarations.every((declaration) =>
                    {
                        return !!declaration.init
                            && functions().includes(declaration.init.type);
                    });
            };

            const step = (statement) =>
            {
                return carried(statement)
                    || named(statement);
            };

            const plain = (statement) =>
            {
                return statement.type === 'ExpressionStatement'
                    && statement.expression.type === 'CallExpression';
            };

            const grouped = (node) =>
            {
                return node.type === 'MemberExpression'
                    && node.object.type === 'ThisExpression'
                    && node.property.name === 'methods';
            };

            const counted = (node) =>
            {
                const own = node.body.body.filter((statement) => !step(statement));

                if(own.every(plain))
                {
                    return 0;
                }

                return own.reduce((sum, statement) =>
                {
                    return sum + statement.loc.end.line - statement.loc.start.line + 1 - hidden(statement);
                }, 0);
            };

            const flag = (node, lines) =>
            {
                report(
                    node.loc.start.line,
                    'The function runs ' + lines + ' lines of its own, the canon stops at fifteen. '
                        + 'Name the steps inside this same function and close with the few lines that call them. '
                        + 'The step goes on this, this.parse = () => {}, wherever the caller hands one over. '
                        + 'Where it does not, a const arrow names the step just as well. Either way the step costs no lines. '
                        + 'A new file is for work another file also calls, not for making this one shorter.'
                );
            };

            walk((node) =>
            {
                if(grouped(node))
                {
                    report(node.loc.start.line, 'this.methods is gone, the step lives on this directly, this.scan not this.methods.scan.');
                }

                if(!functions().includes(node.type) || node.body.type !== 'BlockStatement')
                {
                    return;
                }

                const lines = counted(node);

                lines > 15 && flag(node, lines);
            });
        }
    });
});
