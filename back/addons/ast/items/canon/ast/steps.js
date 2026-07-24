// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'steps',
        description: 'Every named step stands at the top of its function, the work that calls them follows, so a reader meets the parts before the story.',
        check: function(tree, walk, report)
        {
            this.kinds = () =>
            {
                return ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'];
            };

            this.step = (statement) =>
            {
                if(statement.type === 'VariableDeclaration')
                {
                    return statement.declarations.every((declaration) =>
                    {
                        return !!declaration.init
                            && this.kinds().includes(declaration.init.type);
                    });
                }

                return statement.type === 'ExpressionStatement'
                    && statement.expression.type === 'AssignmentExpression'
                    && statement.expression.left.type === 'MemberExpression'
                    && statement.expression.left.object.type === 'ThisExpression'
                    && this.kinds().includes(statement.expression.right.type);
            };

            this.carried = (statement) =>
            {
                return statement.type === 'ExpressionStatement'
                    && statement.expression.type === 'AssignmentExpression'
                    && statement.expression.left.object.type === 'ThisExpression';
            };

            this.loose = (node) =>
            {
                if(node.type === 'ArrowFunctionExpression')
                {
                    return null;
                }

                return node.body.body.find((statement) =>
                {
                    return this.step(statement)
                        && !this.carried(statement);
                });
            };

            this.late = (body) =>
            {
                let work = null;

                for(const statement of body)
                {
                    if(this.step(statement) && work)
                    {
                        return { statement, work };
                    }

                    if(!this.step(statement))
                    {
                        work = work ? work : statement;
                    }
                }

                return null;
            };

            this.order = (found) =>
            {
                if(found)
                {
                    report(
                        found.statement.loc.start.line,
                        'This step is named after the work on line ' + found.work.loc.start.line + ' already began. '
                            + 'Every step moves above it, the function names all its parts first and only then tells the story.'
                    );
                }
            };

            this.carrier = (loose) =>
            {
                if(loose)
                {
                    report(
                        loose.loc.start.line,
                        'This function carries its own this, so the step goes on it, this.name = () => {}. '
                            + 'A const step belongs to an arrow, which has no this of its own.'
                    );
                }
            };

            walk((node) =>
            {
                if(!this.kinds().includes(node.type) || !node.body || node.body.type !== 'BlockStatement')
                {
                    return;
                }

                this.order(this.late(node.body.body));
                this.carrier(this.loose(node));
            });
        }
    });
});
